import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ToggleButton from '../ToggleButton';
import Timer from '../Timer';

import styles from './styles';

const TabataActions = {
  start: function () {
    return {
      type: 'START',
    }
  },
  stop: function () {
    return {
      type: 'STOP',
    }
  },
  endIteration: function () {
    return (dispatch, getState) => {
      if (getState().round === 8) {
        return dispatch({ type: 'TERMINATE' });
      }

      return dispatch({ type: 'END_ITERATION' });
    }
  },
}

const App = ({state, actions}) => {
  return (
    <View style={styles.app} >
      <View>
        <View><Text>{state.status !== 'idle' ? (state.status === 'working' ? '💪' : '💤') : ''}</Text></View>
        <View><Text>{state.round} out of 8</Text></View>
      </View>
      <Timer
        endIteration={actions.endIteration}
        status={state.status}
        active={state.status !== 'idle'}
      />
      <View>
        <ToggleButton start={actions.start} stop={actions.stop} status={state.status} />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  state: {
    round: state.round,
    status: state.status,
  },
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TabataActions, dispatch),
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppContainer;