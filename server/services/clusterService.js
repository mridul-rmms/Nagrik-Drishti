import { CATEGORY_META } from '../domain/constants.js';
import { calculatePriority } from '../domain/priority.js';
import { scoreDuplicate } from '../domain/duplicate.js';
import { clusterRepository } from '../database/repositories/clusterRepository.js';
import { auditRepository } from '../database/repositories/auditRepository.js';

const severityRank = { low: 1, medium: 2, high: 3, critical: 4 };
const urgencyRank = { low: 1, medium: 2, high: 3, critical: 4 };

function containsSensitiveLocation(posts) {
  return posts.some((post) => /(school|hospital|bus stand|स्कूल|अस्पताल|बस स्टैंड)/i.test(post.content));
}

function highest(posts, key, rank) {
  return posts.reduce((winner, post) => rank[post[key]] > rank[winner] ? post[key] : winner, 'low');
}

function makeAggregate(cluster, analysis, posts) {
  const reportCount = posts.length;
  const totalEngagement = posts.reduce((sum, post) => sum + Number(post.engagement || 0), 0);
  const severity = highest(posts, 'severity', severityRank);
  const urgency = highest(posts, 'urgency', urgencyRank);
  const sentiment = posts.some((post) => post.sentiment === 'negative') ? 'negative' : analysis.sentiment;
  const priority = calculatePriority({ severity, urgency, sentiment, reportCount, engagement: totalEngagement, sensitiveLocation: containsSensitiveLocation(posts) });
  const locality = cluster.locality || analysis.location.locality;
  const title = `${CATEGORY_META[analysis.category].label} reported in ${locality}`;
  const firstTwo = posts.slice(0, 2).map((post) => post.content.replace(/\s+/g, ' ').trim()).join(' ');
  return {
    title,
    summary: `${reportCount} linked public-style report${reportCount === 1 ? '' : 's'}. ${firstTwo.slice(0, 240)}`,
    signature: posts.map((post) => post.content).join(' ').slice(0, 1600),
    departmentCode: analysis.routing.code,
    priority,
    status: cluster.status === 'Detected' ? 'Needs Review' : cluster.status,
    reportCount,
    totalEngagement,
    confidence: Math.max(...posts.map((post) => Number(post.analysis_confidence || analysis.confidence))),
    mediaLabel: posts.find((post) => post.media_label)?.media_label || cluster.media_label,
    suggestedAction: analysis.action,
    updatedAt: new Date().toISOString()
  };
}

export const clusterService = {
  findDuplicate(post, analysis) {
    const candidate = { ...post, category: analysis.category, createdAt: post.created_at || post.createdAt, mediaLabel: post.media_label || post.mediaLabel };
    const matches = clusterRepository.listCandidates()
      .map((cluster) => ({ cluster, result: scoreDuplicate(candidate, { ...cluster, updatedAt: cluster.latest_post_at || cluster.updated_at, mediaLabel: cluster.media_label }) }))
      .filter(({ result }) => result.matched)
      .sort((a, b) => b.result.score - a.result.score);
    return matches[0] || null;
  },
  createOrUpdate(post, analysis) {
    const duplicateMatch = this.findDuplicate(post, analysis);
    const now = new Date().toISOString();
    let cluster;
    if (duplicateMatch) {
      cluster = duplicateMatch.cluster;
      clusterRepository.linkPost(cluster.id, post.id, duplicateMatch.result);
    } else {
      const priority = calculatePriority({ severity: analysis.severity, urgency: analysis.urgency, sentiment: analysis.sentiment, reportCount: 1, engagement: post.engagement, sensitiveLocation: /(school|hospital|bus stand|स्कूल|अस्पताल|बस स्टैंड)/i.test(post.content) });
      cluster = clusterRepository.create({
        title: `${CATEGORY_META[analysis.category].label} reported in ${analysis.location.locality}`,
        summary: post.content.slice(0, 240),
        signature: post.content,
        category: analysis.category,
        departmentCode: analysis.routing.code,
        priority,
        status: 'Needs Review',
        locality: analysis.location.locality,
        district: analysis.location.district,
        latitude: analysis.location.latitude,
        longitude: analysis.location.longitude,
        locationConfidence: analysis.location.confidence,
        reportCount: 1,
        totalEngagement: Number(post.engagement || 0),
        confidence: analysis.confidence,
        mediaLabel: post.media_label || null,
        suggestedAction: analysis.action,
        createdAt: now,
        updatedAt: now
      });
      clusterRepository.linkPost(cluster.id, post.id, null);
      auditRepository.record(cluster.id, 'cluster.created', 'Nagrik Drishti AI', 'Created as a new issue cluster. Human verification is required.');
    }
    const linkedPosts = clusterRepository.linkedPosts(cluster.id);
    cluster = clusterRepository.refresh(cluster.id, makeAggregate(cluster, analysis, linkedPosts));
    auditRepository.record(cluster.id, duplicateMatch ? 'cluster.matched' : 'cluster.analysed', 'Nagrik Drishti AI', duplicateMatch ? duplicateMatch.result.explanation : 'Initial AI analysis completed.');
    return { cluster: clusterRepository.detail(cluster.id), duplicate: duplicateMatch?.result || null };
  }
};
