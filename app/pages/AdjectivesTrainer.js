import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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

  renderPhrase (phrase) {
    return (
      <li>
        <span>{phrase.stubbedSuffix}</span>
      </li>
    );
  }

  render () {
    return (
      <ul>
        { this.props.phrases.map(this.renderPhrase) }
      </ul>
    );
  }
}

export function mapStateToProps(state, ownProps) {
  return { phrases: state.adjectiveTrainer.collection };
}

const mapDispatchToProps = {
  create
};

export default connect(mapStateToProps, mapDispatchToProps)(AdjectivesTrainer);
