import React, { PropTypes } from 'react';
import { Button } from 'react-native';

import styles from './styles';

export default class ToggleButton extends React.Component {
  static propTypes = {
    start: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
  };

  render() {
    const isIdle = this.props.status === 'idle';
    return  (
      <Button onPress={isIdle ? this.props.start : this.props.stop} title={isIdle ? 'Start' : 'Stop'} />
    )
  }
}
