export function showToast(message) {
  const root = document.querySelector('#toastRoot');
  const node = document.createElement('div');
  node.className = 'toast';
  node.textContent = message;
  root.append(node);
  setTimeout(() => node.remove(), 3600);
}
