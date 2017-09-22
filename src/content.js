import createElement from './lib/createElement';
import createIcon from './lib/createIcon';
import Messanger from './lib/Messanger';

const selectorToCopy = process.env.SELECTOR;

const createContainer = () => createElement('div', 'container');
const createButton = () => createElement('button', 'button');
const createMessage = () => createElement('span', 'message');
const createTextarea = () => createElement('textarea', 'textarea-hidden');

const messenger = new Messanger();

const onClick = () => {
  try {
    const textarea = createTextarea();
    const elToCopy = document.querySelector(selectorToCopy);

    if (!elToCopy) throw new Error('Could not find element to copy');

    const html = elToCopy.outerHTML;

    textarea.value = html.trim();
    document.body.append(textarea);
    textarea.select();

    const success = document.execCommand('Copy');
    messenger.show(
      success ? 'Copied' : 'Could not copy',
      success ? 'success' : 'warning',
    );
    document.body.removeChild(textarea);
  } catch (e) {
    messenger.show('An error occured, see log', 'warning');
    console.error(e);
  }
};

function init() {
  const container = createContainer();
  const button = createButton();
  const icon = createIcon();
  const message = createMessage();
  messenger.addEl(message);

  button.addEventListener('click', onClick);

  button.appendChild(icon);
  container.appendChild(button);
  container.appendChild(message);
  document.body.appendChild(container);
}

init();
