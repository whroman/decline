import React, { Component, PropTypes } from 'react';

import './AdjectivesExercise.scss';

export default class AdjectivesExercise extends Component {

  static get propTypes() {
    return {
      phrases: PropTypes.arrayOf(PropTypes.shape),
    };
  }

  renderPhrase (phrase, index) {
    return (
      <li key={ index } >
        <AdjectivesExerciseItem number={ index } phrase={ phrase } />
      </li>
    );
  }

  render () {
    return (
      <ul className='AdjectivesExercise'>
        { this.props.phrases.map(this.renderPhrase) }
      </ul>
    );
  }

}

class AdjectivesExerciseItem extends Component {

  static get propTypes() {
    return {
      phrase: PropTypes.shape(),
    };
  }

  constructor () {
    super();

    this.state = {
      isCorrect: false,
      isFilled: false
    };
  }

  render () {
    const { phrase, number } = this.props;
    const { untilStub, afterStub, stub } = phrase
    const numOfChars = stub.length;

    let inputState = '';
    if (this.state.isFilled) inputState = this.state.isCorrect ? 'correct' : 'incorrect';

    return (
      <div className="AdjectivesExerciseItem" >
        <span>{ untilStub }</span>
        <span className={`input-wrapper ${inputState}`}>
          <input
          autoFocus= { number === 0 ? true : false }
            type="text"
            maxLength={ numOfChars }
            size={ numOfChars }
            onChange={ this.handleChange.bind(this) }
          />
          <div className="placeholder">{ Array(numOfChars + 1).join('_') }</div>
        </span>
        <span>{ afterStub }</span>
      </div>
    );
  }

  handleChange (event) {
    const { value } = event.target;
    const { stubbedValue } = this.props.phrase;

    const isCorrect = value.toLowerCase() === stubbedValue.toLowerCase();
    const isFilled = value.length === stubbedValue.length;
    this.setState({ isCorrect, isFilled });
  }

}
