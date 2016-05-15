import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import presentPhrases from './../presenters/phrases';
import { create } from './../dux/adjectiveTrainer';

class Sentence extends Component {

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
    const { untilStub, afterStub, stub } = this.props.phrase
    const numOfChars = stub.length;

    let inputState = '';
    if (this.state.isFilled) inputState = this.state.isCorrect ? 'correct' : 'incorrect';

    return (
      <li className="Phrase" >
        <span>{ untilStub }</span>
        <span className={`input-wrapper ${inputState}`}>
          <input
            type="text"
            maxLength={ numOfChars }
            size={ numOfChars }
            onChange={ this.handleChange.bind(this) }
          />
          <div className="placeholder">{ Array(numOfChars + 1).join('_') }</div>
        </span>
        <span>{ afterStub }</span>
      </li>
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

export class AdjectivesTrainer extends Component {

  static get propTypes() {
    return {
      phrases: PropTypes.arrayOf(PropTypes.shape),
    };
  }

  componentWillMount () {
    this.props.create(10);
  }

  renderPhrases () {
    return this.props.phrases.map((phrase, index) => {
      return (
        <Sentence
          key={ index }
          phrase={ phrase }
        />
      );
    });

  }

  render () {
    return (
      <div>
        <ul>
          { this.renderPhrases() }
        </ul>
      </div>
    );
  }
}

export function mapStateToProps(state, ownProps) {
  const phrases = presentPhrases(state.adjectiveTrainer.collection);
  return { phrases };
}

const mapDispatchToProps = {
  create
};

export default connect(mapStateToProps, mapDispatchToProps)(AdjectivesTrainer);
