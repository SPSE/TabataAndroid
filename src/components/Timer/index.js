import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';

const MEASUREMENT_ERROR = 20; // ms
const WORK_TIME = 20000;
const REST_TIME = 10000;

export default class Timer extends React.Component {
  static propTypes = {
    status: PropTypes.string.isRequired,
    endIteration: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      secondsLeft: 0,
    }

    this.tick = this.tick.bind(this);
  }

  // updating
  componentWillReceiveProps(nextProps) {
    if (nextProps.active && nextProps.status !== this.props.status) { // iteration is changing
      this.finishTime = Date.now() + (nextProps.status === 'working' ? WORK_TIME : REST_TIME);
      this.tick();
      if (this.props.status === 'idle' && nextProps.status === 'working') {
        this.setState({
          secondsLeft: 20,
        });
      }
    }
    else { // force terminate
      clearInterval(this.runner);
      this.setState({
        secondsLeft: 0,
      });
    }
  }

  tick() {
    this.runner = setInterval(() => {
      const currentTime = Date.now() - MEASUREMENT_ERROR;

      if (currentTime > this.finishTime) {
        clearInterval(this.runner);
        this.props.endIteration();
      }

      const timeLeft = Math.round((this.finishTime - currentTime) / 1000);

      this.setState({
        secondsLeft: timeLeft >= 0 ? timeLeft : 0,
      })
    }, 1000);
  }

  render() {
    return (
      <View><Text>00:{('0' + this.state.secondsLeft).slice(-2)}</Text></View>
    );
  }
}
