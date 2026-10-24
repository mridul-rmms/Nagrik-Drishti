const severityWeights = Object.freeze({ low: 8, medium: 16, high: 24, critical: 30 });
const urgencyWeights = Object.freeze({ low: 5, medium: 13, high: 20, critical: 25 });

export function calculatePriority(input) {
  const severity = severityWeights[input.severity] ?? severityWeights.medium;
  const urgency = urgencyWeights[input.urgency] ?? urgencyWeights.medium;
  const sentiment = input.sentiment === 'negative' ? 3 : input.sentiment === 'neutral' ? 1 : 0;
  const volume = Math.min(20, Math.max(0, (Number(input.reportCount || 1) - 1) * 5));
  const engagement = Math.min(15, Math.round(Math.log10(Number(input.engagement || 0) + 1) * 7));
  const sensitiveLocation = input.sensitiveLocation ? 10 : 0;
  const score = Math.min(100, severity + Math.min(25, urgency + sentiment) + volume + engagement + sensitiveLocation);

  return {
    score,
    level: score >= 80 ? 'Critical' : score >= 60 ? 'High' : score >= 35 ? 'Medium' : 'Low',
    breakdown: { severity, urgencyAndSentiment: Math.min(25, urgency + sentiment), reportVolume: volume, engagement, sensitiveLocation }
  };
}
