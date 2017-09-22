export const get = props =>
  new Promise(resolve => {
    chrome.storage.sync.get(props, items => resolve(items));
  });

export const set = props =>
  new Promise(resolve => {
    chrome.storage.sync.set(props, () => resolve());
  });
