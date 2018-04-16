import createElement from './lib/createElement';
import createIcon from './lib/createIcon';
import Messenger from './lib/Messenger';
import Selection from './lib/Selection';
import * as chromeSync from './lib/chromeSync';
import copy from './lib/copy';

const createContainer = () => createElement('div', 'container');
const createButton = () => createElement('button', 'button');
const createMessage = () => createElement('span', 'message');
const createSelection = () => createElement('div', 'selection');

const messenger = new Messenger();
const selectionOverlay = new Selection();

const getElToCopy = async () => {
  const { selector } = await chromeSync.get({ selector: process.env.SELECTOR });
  return document.querySelector(selector);
};

const onClick = async () => {
  try {
    const elToCopy = await getElToCopy();
    if (!elToCopy) throw new Error('Could not find element to copy');

    const html = elToCopy.outerHTML.trim();
    await copy(html);

    messenger.show('Copied', 'success');
  } catch (e) {
    messenger.show(e.message, 'warning');
  }
};

const onEnter = async () => {
  const elToCopy = await getElToCopy();

  const box = elToCopy.getBoundingClientRect();
  selectionOverlay.show(box);
};

const onLeave = () => {
  selectionOverlay.hide();
};

function init() {
  const container = createContainer();
  const button = createButton();
  const icon = createIcon();
  const message = createMessage();
  const selection = createSelection();

  messenger.addEl(message);
  selectionOverlay.addEl(selection);

  button.addEventListener('click', onClick);
  button.addEventListener('mouseenter', onEnter);
  button.addEventListener('mouseleave', onLeave);

  button.appendChild(icon);
  container.appendChild(button);
  container.appendChild(message);
  document.body.appendChild(container);
  document.body.appendChild(selection);
}

init();
