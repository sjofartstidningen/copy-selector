import { createSvgElement } from './createElement';

const createSvg = () => {
  const svg = createSvgElement('svg', 'icon');
  svg.setAttribute('width', 24);
  svg.setAttribute('height', 24);
  svg.setAttribute('viewBox', '0 0 24 24');

  return svg;
};

const createRect = () => {
  const rect = createSvgElement('rect', 'icon-rect');
  rect.setAttribute('x', 9);
  rect.setAttribute('y', 9);
  rect.setAttribute('width', 13);
  rect.setAttribute('height', 13);
  rect.setAttribute('rx', 2);
  rect.setAttribute('ry', 2);

  return rect;
};

const createPath = () => {
  const path = createSvgElement('path', 'icon-path');
  path.setAttribute(
    'd',
    'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1',
  );

  return path;
};

export default () => {
  const svg = createSvg();
  const rect = createRect();
  const path = createPath();

  svg.appendChild(rect);
  svg.appendChild(path);
  return svg;
};
