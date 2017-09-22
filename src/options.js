function saveOptions() {
  const selector = document.getElementById('cc-selector').value;

  chrome.storage.sync.set({ selector }, () => {
    const status = document.getElementById('cc-status');
    status.textContent = '(options saved)';

    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    selector: process.env.SELECTOR,
  }, ({ selector }) => {
    document.getElementById('cc-selector').value = selector;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('cc-save').addEventListener('click', saveOptions);
