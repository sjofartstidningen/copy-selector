const selectorToCopy = '.container';

const createSelector = suffix => `cc-${suffix}`;
const createElement = (type, className) => {
  const el = document.createElement(type);
  el.classList.add(createSelector(className));
  return el;
};

const createContainer = () => createElement('div', 'container');
const createButton = () => createElement('button', 'button');

const showMessage = message => console.log(message);

const onClick = () => {
  const textarea = createElement('textarea', 'textarea-hidden');
  const elToCopy = document.querySelector(selectorToCopy);
  const html = elToCopy.innerHTML;

  textarea.value = html;

  document.body.append(textarea);

  try {
    const success = document.executeCommand('copy');
    showMessage(success ? 'Copied' : 'Could not copy');
  } catch (e) {
    showMessage('Could not copy');
  }
};

function init() {
  const container = createContainer();
  const button = createButton();

  button.addEventListener('click', onClick);
  container.appendChild(button);
  document.body.appendChild(container);
}

init();
