import { clusterTable } from '../components/clusterTable.js';

export const clustersView = {
  title: 'Issue clusters',
  eyebrow: 'HUMAN-VERIFIED CIVIC WORK QUEUE',
  render(store) {
    const categoryOptions = ['all', ...new Set(store.clusters.map((cluster) => cluster.category))];
    const departmentOptions = ['all', ...store.departments.map((department) => department.code)];
    return `<section class="panel"><div class="panel-heading"><div><p class="eyebrow">FILTER, VERIFY, ASSIGN</p><h2>Cluster workspace</h2></div><button class="button button-primary" data-view-link="monitoring">＋ Add complaint</button></div><div class="toolbar"><input id="clusterSearch" class="field" placeholder="Search locality, issue, or department" /><select id="categoryFilter" class="select">${categoryOptions.map((option) => `<option value="${option}">${option === 'all' ? 'All categories' : option}</option>`).join('')}</select><select id="departmentFilter" class="select">${departmentOptions.map((option) => `<option value="${option}">${option === 'all' ? 'All departments' : option}</option>`).join('')}</select><select id="priorityFilter" class="select"><option value="all">All priorities</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></div><div id="clusterTableRoot">${clusterTable(store.clusters)}</div><div class="table-footer">${store.clusters.length} clusters are loaded from the persistent local database.</div></section>`;
  },
  bind(context) {
    const applyFilters = () => {
      const search = document.querySelector('#clusterSearch').value.toLowerCase();
      const category = document.querySelector('#categoryFilter').value;
      const department = document.querySelector('#departmentFilter').value;
      const priority = document.querySelector('#priorityFilter').value;
      const visible = context.store.clusters.filter((cluster) => {
        const query = `${cluster.title} ${cluster.locality} ${cluster.department_name}`.toLowerCase();
        return (!search || query.includes(search)) && (category === 'all' || cluster.category === category) && (department === 'all' || cluster.department_code === department) && (priority === 'all' || cluster.priority_level === priority);
      });
      document.querySelector('#clusterTableRoot').innerHTML = clusterTable(visible);
      context.bindClusterRows();
    };
    ['#clusterSearch', '#categoryFilter', '#departmentFilter', '#priorityFilter'].forEach((selector) => document.querySelector(selector).addEventListener(selector === '#clusterSearch' ? 'input' : 'change', applyFilters));
  }
};
