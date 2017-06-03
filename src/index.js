import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './components/App/'

const initialState = {
  round: 0,
  status: 'idle',
}

// TODO: move
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        round: 1,
        status: 'working',
      };
    case 'END_ITERATION':
      return {
        ...state,
        round: state.status === 'relaxing' ? state.round + 1 : state.round, // after relax on a new round
        status: state.status === 'idle' || state.status === 'relaxing' ? 'working' : 'relaxing',
      };
    case 'TERMINATE':
    case 'STOP':
      return {
        ...state,
        round: 0,
        status: 'idle',
      };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

class TabataAndroid extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default TabataAndroid;









