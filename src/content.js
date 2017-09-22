import createElement from './lib/createElement';
import createIcon from './lib/createIcon';
import Messanger from './lib/Messanger';
import Selection from './lib/Selection';

const selectorToCopy = process.env.SELECTOR;
const elToCopy = document.querySelector(selectorToCopy);

const createContainer = () => createElement('div', 'container');
const createButton = () => createElement('button', 'button');
const createMessage = () => createElement('span', 'message');
const createSelection = () => createElement('div', 'selection');
const createTextarea = () => createElement('textarea', 'textarea-hidden');

const messenger = new Messanger();
const selectionOverlay = new Selection();

const onClick = () => {
  try {
    if (!elToCopy) throw new Error('Could not find element to copy');

    const textarea = createTextarea();
    const html = elToCopy.outerHTML;

    textarea.value = html.trim();
    document.body.append(textarea);
    textarea.select();

    const success = document.execCommand('Copy');

    window.requestAnimationFrame(() => {
      messenger.show(
        success ? 'Copied' : 'Could not copy',
        success ? 'success' : 'warning',
      );
    });

    document.body.removeChild(textarea);
  } catch (e) {
    console.error(e);
    window.requestAnimationFrame(() => {
      messenger.show('An error occured, see log', 'warning');
    });
  }
};

const onEnter = () => {
  window.requestAnimationFrame(() => {
    const box = elToCopy.getBoundingClientRect();
    selectionOverlay.show(box);
  });
};

const onLeave = () => {
  window.requestAnimationFrame(() => {
    selectionOverlay.hide();
  });
}

function init() {
  const container = createContainer();
  const button = createButton();
  const icon = createIcon();
  const message = createMessage();
  const selection = createSelection();

  messenger.addEl(message);
  selectionOverlay.addEl(selection)

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
