import { api } from './api.js';
import { store } from './store.js';
import { dashboardView } from './views/dashboard.js';
import { monitoringView } from './views/monitoring.js';
import { clustersView } from './views/clusters.js';
import { insightsView } from './views/insights.js';
import { openClusterDrawer } from './components/drawer.js';
import { showToast } from './components/toast.js';

const views = Object.freeze({ dashboard: dashboardView, monitoring: monitoringView, clusters: clustersView, insights: insightsView });
const appRoot = document.querySelector('#app');

function updateHeader(view) {
  document.querySelector('#pageTitle').textContent = view.title;
  document.querySelector('#pageEyebrow').textContent = view.eyebrow;
  document.querySelectorAll('[data-view-link]').forEach((node) => node.classList.toggle('is-active', node.dataset.viewLink === store.view));
  document.querySelector('#navClusterCount').textContent = store.dashboard?.metrics.activeClusters ?? '—';
}

function bindClusterRows() {
  document.querySelectorAll('[data-cluster-id]').forEach((node) => node.addEventListener('click', () => openClusterDrawer(node.dataset.clusterId, refreshAndRender)));
}

async function render() {
  const view = views[store.view];
  updateHeader(view);
  appRoot.innerHTML = view.render(store);
  bindClusterRows();
  view.bind?.({ store, refresh: refreshAndRender, refreshData: () => store.refresh(), bindClusterRows });
  document.querySelectorAll('[data-open-cluster]').forEach((node) => node.addEventListener('click', () => openClusterDrawer(node.dataset.openCluster, refreshAndRender)));
}

async function refreshAndRender() {
  await store.refresh();
  await render();
}

async function navigate(viewName) {
  if (!views[viewName]) return;
  store.view = viewName;
  history.replaceState(null, '', `#${viewName}`);
  document.querySelector('.sidebar').classList.remove('is-open');
  await render();
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('[data-view-link]');
  if (link) { event.preventDefault(); navigate(link.dataset.viewLink); }
  if (event.target.closest('[data-action="open-monitoring"]')) navigate('monitoring');
  const clusterLink = event.target.closest('[data-open-cluster]');
  if (clusterLink) openClusterDrawer(clusterLink.dataset.openCluster, refreshAndRender);
});
document.querySelector('#menuButton').addEventListener('click', () => document.querySelector('.sidebar').classList.toggle('is-open'));

async function boot() {
  try {
    await api.health();
    document.querySelector('#syncStatus').innerHTML = '<i></i>Local API connected';
    const requestedView = location.hash.slice(1);
    if (views[requestedView]) store.view = requestedView;
    await refreshAndRender();
  } catch (caught) {
    document.querySelector('#syncStatus').textContent = 'API unavailable';
    appRoot.innerHTML = `<div class="panel empty-state"><strong>Nagrik Drishti API is unavailable</strong>${caught.message}<br/><br/>Run <code>npm start</code> inside the project folder.</div>`;
    showToast('Unable to connect to the local API.');
  }
}

boot();
