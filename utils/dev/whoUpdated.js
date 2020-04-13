/* eslint-disable */
export const whoUpdated = (name, props) => {
  if (!process.browser) {
    return;
  }
  window.val = window.val || {};
  Object.keys(props).forEach((prop) => {
    if (window.val[prop] !== props[prop]) {
      console.groupCollapsed(`[${name}] Prop changed : ${prop}`);
      console.log('Previous : ', window.val[prop])
      console.log('New : ', props[prop])
      console.groupEnd();
      window.val[prop] = props[prop];
    }
  })
};

export default whoUpdated
