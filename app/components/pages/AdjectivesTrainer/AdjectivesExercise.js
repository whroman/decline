import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import AdjectivesExerciseItem from './AdjectivesExerciseItem';
import './AdjectivesExercise.scss';

export default class AdjectivesExercise extends Component {

  static get propTypes() {
    return {
      phrases: PropTypes.arrayOf(PropTypes.shape),
      replace: PropTypes.func
    };
  }

  constructor () {
    super();
    this.state = {
      focusedKey: 0
    }
  }

  renderPhrase (phrase, index) {
    const { replace } = this.props;
    return (
      <AdjectivesExerciseItem
        uid={ index }
        phrase={ phrase }
        shouldFocus={ this.state.focusedKey === phrase.key }
        key={ phrase.key }
        setFocusedItem={ this.setFocusedItem.bind(this) }
        replace={ replace }
      />
    );
  }

  render () {
    return (
      <div className='AdjectivesExercise'>
          <ReactCSSTransitionGroup
            transitionName="example"
            component='ul'
            transitionEnterTimeout={ 300 }
            transitionLeaveTimeout={ 300 }
          >
            { this.props.phrases.map(this.renderPhrase.bind(this)) }
          </ReactCSSTransitionGroup>
      </div>
    );
  }

  setFocusedItem (uid) {
    this.setState({
      focusedKey: uid
    });
  }

}
