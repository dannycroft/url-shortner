import React, { Component } from 'react';
import { applyMiddleware, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import LinkForm from '../components/LinkForm';
import LinkReducer from '../reducers/LinkReducer';
import LinkAction from '../actions/LinkAction';
import thunk from '../middleware/thunk';
import API from '../helpers/api';

const middleware = [thunk];

// Fetch link thunk
const fetchLink = link => (dispatch) => {
  return API(link).then((response) => {
    dispatch(LinkAction(response));
  })
  .catch((error) => { throw error; });
};

// Setup store
const store = createStore(
  LinkReducer,
  applyMiddleware(...middleware),
);

// Wrap action creator with dispatch method
const mapStateToProps = state => ({ link: state });
const mapDispatchToProps = dispatch => ({
  fetchLink: link => dispatch(fetchLink(link)),
});

// Connect react component to redux store
const LinkDetailPage = connect(mapStateToProps, mapDispatchToProps)(LinkForm);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LinkDetailPage />
      </Provider>
    );
  }
}

export default App;
