import React, { Component, PropTypes } from 'react';

import AdjectivesExerciseItem from './AdjectivesExerciseItem';
import './AdjectivesExercise.scss';

export default class AdjectivesExercise extends Component {

  static get propTypes() {
    return {
      phrases: PropTypes.arrayOf(PropTypes.shape),
    };
  }

  renderPhrase (phrase, index) {
    return (
      <AdjectivesExerciseItem
        number={ index }
        phrase={ phrase }
        key={ phrase.key }
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

}
