import { escapeHtml } from './format.js';

function position(latitude, longitude) {
  const x = ((longitude - 84.5) / 4) * 100;
  const y = 100 - ((latitude - 24) / 3) * 100;
  return { left: Math.max(8, Math.min(90, x)), top: Math.max(12, Math.min(82, y)) };
}

export function hotspotMap(hotspots) {
  const pins = hotspots.map((hotspot) => {
    const point = position(hotspot.latitude, hotspot.longitude);
    const level = hotspot.maxPriority >= 80 ? 'Critical' : hotspot.maxPriority >= 60 ? 'High' : hotspot.maxPriority >= 35 ? 'Medium' : 'Low';
    return `<button class="map-pin ${level}" data-cluster-id="${hotspot.clusterIds[0]}" style="left:${point.left}%;top:${point.top}%" title="${escapeHtml(hotspot.locality)}: ${hotspot.reports} linked reports">${hotspot.reports}</button><span class="map-label" style="left:${point.left}%;top:${point.top}%">${escapeHtml(hotspot.locality)}</span>`;
  }).join('');
  return `<div class="map-wrap" aria-label="Bihar civic issue hotspot map"><div class="map-grid"></div><svg class="map-shape" viewBox="0 0 560 310" role="img" aria-label="Stylised Bihar boundary"><path d="M61 110 L91 72 L158 55 L222 65 L268 45 L330 63 L372 54 L430 77 L491 74 L520 111 L497 139 L518 167 L485 193 L452 185 L427 219 L370 221 L329 249 L280 238 L239 263 L193 250 L145 264 L109 238 L72 234 L50 205 L66 175 L44 145 Z"/><path class="river" d="M57 145 C125 116,181 152,226 139 S333 111,395 130 S456 160,513 145"/><path class="road" d="M90 214 C153 183,215 196,270 169 S361 117,475 112"/></svg>${pins}<div class="map-legend"><span><i style="background:#dc4e5e"></i>Critical</span><span><i style="background:#d68a1e"></i>High</span><span><i style="background:#5b73de"></i>Medium</span></div></div>`;
}
