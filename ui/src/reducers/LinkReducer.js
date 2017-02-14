// Link Reducer
const LinkReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_LINK_SUCCESS':
      return action.link;
    default:
      return state;
  }
};

export default LinkReducer;
