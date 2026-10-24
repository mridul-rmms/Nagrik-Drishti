import { api } from '../api.js';
import { escapeHtml, titleCase } from '../components/format.js';
import { showToast } from '../components/toast.js';

export const monitoringView = {
  title: 'Monitoring inbox',
  eyebrow: 'COMPLAINT INGESTION & AI TRIAGE',
  render() {
    return `
      <section class="dashboard-grid">
        <article class="panel">
          <div class="panel-heading">
            <div>
              <p class="eyebrow">INPUT</p>
              <h2>Analyse a public complaint</h2>
            </div>
          </div>
          <form id="complaintForm" class="toolbar" style="display:block">
            <div class="form-grid">
              <label class="form-field full">
                Complaint text (Hindi, Hinglish, or English)
                <textarea name="content" required placeholder="Describe the issue with landmarks, details, or hashtags...">भिखना पहाड़ी स्कूल के पास सड़क में बड़ा गड्ढा है। बच्चों को आने-जाने में खतरा है, कृपया जल्द ठीक करें। #BiharRoadProblem</textarea>
              </label>
              <label class="form-field">
                Source channel
                <select name="sourcePlatform">
                  <option>Manual review</option>
                  <option>Facebook</option>
                  <option>X</option>
                  <option>Instagram</option>
                  <option>YouTube</option>
                </select>
              </label>
              <label class="form-field">
                Language
                <select name="language">
                  <option value="hi">Hindi</option>
                  <option value="hinglish">Hinglish</option>
                  <option value="en">English</option>
                </select>
              </label>
              <label class="form-field">
                Locality / District
                <input name="locality" value="Patna, Bhikhna Pahari" placeholder="e.g. Patna, Gaya, Saharsa..." />
              </label>
              <label class="form-field">
                Attached visual evidence
                <select name="mediaLabel">
                  <option>Road-damage image</option>
                  <option>Garbage image</option>
                  <option>Waterlogging image</option>
                  <option>Streetlight image</option>
                  <option>Hospital-crowd image</option>
                  <option>Flood-water image</option>
                  <option>Damaged-bridge image</option>
                  <option>Electric-pole image</option>
                  <option>No media</option>
                </select>
              </label>
              <label class="form-field">
                Public engagement count
                <input name="engagement" type="number" min="0" value="18" />
              </label>
              <label class="form-field">
                External ID / Reference URL
                <input name="sourceReference" placeholder="Optional; safe UUID generated if blank" />
              </label>
            </div>
            <div class="form-actions">
              <button class="button button-primary" type="submit">Run triage analysis</button>
            </div>
          </form>
          <div id="analysisResult"></div>
        </article>

        <aside class="panel">
          <div class="panel-heading">
            <div>
              <p class="eyebrow">GOVERNANCE</p>
              <h2>Processing boundaries</h2>
            </div>
          </div>
          <div class="toolbar" style="display:block">
            <div class="notice">
              <b>Human-in-the-loop:</b> AI outputs provide routing recommendations and risk priority scores. Actionable clusters require verification by an authorized officer.
            </div>
            <div class="notice">
              <b>Geospatial clustering:</b> Complaints within 1.5 km sharing category signals are automatically clustered into a single parent issue.
            </div>
            <div class="notice">
              <b>Data safety:</b> Operates on authorized complaint imports without scraping or accessing private user profiles.
            </div>
          </div>
        </aside>
      </section>
    `;
  },
  bind(context) {
    document.querySelector('#complaintForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(event.currentTarget));
      const resultNode = document.querySelector('#analysisResult');
      resultNode.innerHTML = '<div class="toolbar"><div class="notice">Analysing relevance, sentiment, location, and duplicate clusters…</div></div>';
      try {
        const result = await api.createPost(values);
        const cluster = result.cluster;
        resultNode.innerHTML = `
          <div class="toolbar analysis-result">
            <h3>Triage Recommendation Generated</h3>
            <div class="result-grid">
              <span>Category<strong>${titleCase(result.analysis.category)}</strong></span>
              <span>Routing<strong>${escapeHtml(cluster?.department_name || result.analysis.recommended_department)}</strong></span>
              <span>Priority<strong>${cluster ? `${cluster.priority_level} · ${cluster.priority_score}` : 'No cluster'}</strong></span>
              <span>Location<strong>${escapeHtml(result.post.locality || 'Pending')}</strong></span>
              <span>Cluster Match<strong>${result.duplicate ? `${Math.round(result.duplicate.score * 100)}% related` : 'New cluster'}</strong></span>
              <span>Confidence<strong>${Math.round(result.analysis.confidence * 100)}%</strong></span>
            </div>
            <p class="notice info">${escapeHtml(result.analysis.explanation)}</p>
            ${cluster ? `<button class="button button-primary" data-open-cluster="${cluster.id}">Open Issue Cluster</button>` : ''}
          </div>
        `;
        await context.refreshData();
        showToast('Complaint successfully triaged and recorded.');
      } catch (caught) {
        resultNode.innerHTML = `<div class="toolbar"><div class="notice" style="color:var(--critical)">${escapeHtml(caught.message)}</div></div>`;
      }
    });
  }
};
