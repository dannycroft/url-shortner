// Thunk Middleware
// See: https://github.com/gaearon/redux-thunk/blob/master/src/index.js
function thunk(store) {
  return (next) => {
    return (action) => {
      if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
      }
      return next(action);
    };
  };
}

export default thunk;
