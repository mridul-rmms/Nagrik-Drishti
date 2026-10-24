const escapeMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };

export const iconFor = Object.freeze({
  roads: '🕳',
  water: '💧',
  sanitation: '♻',
  electricity: '⚡',
  drainage: '≋',
  infrastructure: '▣',
  flood: '🌊',
  healthcare: '🏥',
  education: '🎓',
  ration: '🍚',
  pension: '👴',
  housing: '🏠',
  agriculture: '🌾',
  traffic: '🚦',
  lighting: '💡',
  schemes: '📜',
  encroachment: '🚧',
  grievance: '📢'
});
export const labelFor = Object.freeze({
  roads: 'Roads & potholes',
  water: 'Water supply & Nal-Jal',
  sanitation: 'Sanitation & garbage',
  electricity: 'Electricity & power cuts',
  drainage: 'Drainage & waterlogging',
  infrastructure: 'Bridges & assets',
  flood: 'Flood relief & rescue',
  healthcare: 'Hospitals & health',
  education: 'Schools & education',
  ration: 'Ration & PDS',
  pension: 'Pensions & welfare',
  housing: 'Housing & Awas Yojana',
  agriculture: 'Farmers & agriculture',
  traffic: 'Traffic & congestion',
  lighting: 'Street lighting',
  schemes: 'Government schemes & DBT',
  encroachment: 'Encroachments',
  grievance: 'Public grievance'
});
export function escapeHtml(value = '') { return String(value).replace(/[&<>"']/g, (character) => escapeMap[character]); }
export function niceDate(value) { return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }).format(new Date(value)); }
export function titleCase(value = '') { return value.replace(/\b\w/g, (letter) => letter.toUpperCase()); }
