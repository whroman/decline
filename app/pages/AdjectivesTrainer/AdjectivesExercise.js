import React, { Component, PropTypes } from 'react';

import AdjectivesExerciseItem from './AdjectivesExerciseItem';
import './AdjectivesExercise.scss';

export default class AdjectivesExercise extends Component {

  static get propTypes() {
    return {
      phrases: PropTypes.arrayOf(PropTypes.shape),
    };
  }

  constructor () {
    super();
    this.state = {
      focusedItem: 0
    }
  }

  renderPhrase (phrase, index) {

    return (
      <AdjectivesExerciseItem
        uid={ index }
        phrase={ phrase }
        shouldFocus={ this.state.focusedItem === index }
        key={ phrase.key }
        setFocusedItem={ this.setFocusedItem.bind(this) }
      />
    );
  }

  render () {
    return (
      <table className='AdjectivesExercise'>
        <tbody>
          { this.props.phrases.map(this.renderPhrase.bind(this)) }
        </tbody>
      </table>
    );
  }

  setFocusedItem (uid) {
    console.log(uid)
    this.setState({
      focusedItem: uid
    });
  }

}
