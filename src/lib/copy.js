import createElement from './createElement';

const createTextarea = () => createElement('textarea', 'textarea-hidden');

async function copy(str) {
  if ('clipboard' in navigator) {
    await navigator.clipboard.writeText(str);
  } else {
    const textarea = createTextarea();
    textarea.value = str;
    document.body.append(textarea);
    textarea.select();

    const success = document.execCommand('Copy');
    document.body.removeChild(textarea);

    if (!success) throw new Error('Could not copy string');
  }
}

export { copy as default };
