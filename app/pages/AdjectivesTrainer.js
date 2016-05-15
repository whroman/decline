import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import presentPhrases from './../presenters/phrases';
import { create } from './../dux/adjectiveTrainer';

class Sentence {

}

export class AdjectivesTrainer extends Component {

  static get propTypes() {
    return {
      tracks: PropTypes.arrayOf(PropTypes.shape),
      isLoading: PropTypes.bool,
      locale: PropTypes.string,
      learningLanguage: PropTypes.string,
      _fetchGraphWithCompletions: PropTypes.func
    };
  }

  componentWillMount () {
    this.props.create(10);
  }

  renderPhrase (phrase, index) {
    const numOfChars = phrase.stub.length;
    return (
      <li className="Phrase" key={ index }>
        <span>{phrase.untilStub}</span>
        <span className="input-wrapper">
          <input
            type="text"
            maxLength={ numOfChars }
            size={ numOfChars }
          />
          <div className="placeholder">{ Array(numOfChars + 1).join('_') }</div>
        </span>
        <span>{phrase.afterStub}</span>
      </li>
    );
  }

  render () {
    return (
      <div>
        <ul>
          { this.props.phrases.map(this.renderPhrase.bind(this)) }
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
