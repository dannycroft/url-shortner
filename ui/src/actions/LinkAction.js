// Action creator
const linkSuccess = (link) => {
  return {
    type: 'LOAD_LINK_SUCCESS',
    link,
  };
};

export default linkSuccess;
