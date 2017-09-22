const createSelector = suffix => `cc-${suffix}`;

export const addClass = (el, className) => el.classList.add(createSelector(className));
export const removeClass = (el, className) => el.classList.remove(createSelector(className));

export const createSvgElement = (type, className) => {
  const el = document.createElementNS('http://www.w3.org/2000/svg', type);
  addClass(el, className);
  return el;
};

const createElement = (type, className) => {
  const el = document.createElement(type);
  addClass(el, className);
  return el;
};

export default createElement;
