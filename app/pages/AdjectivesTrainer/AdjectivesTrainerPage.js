import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import presentPhrases from './../../presenters/phrases';
import { create, replace } from './../../dux/adjectiveTrainer';

import AdjectivesExercise from './AdjectivesExercise';

export class AdjectivesTrainer extends Component {

  static get propTypes() {
    return {
      phrases: PropTypes.arrayOf(PropTypes.shape),
    };
  }

  componentWillMount () {
    if (this.props.phrases.length > 0) return;

    this.handleClick();
  }

  handleClick () {
    this.props.create({ amount: 8 });
  }

  render () {
    const { create, replace, phrases } = this.props;

    return (
      <div className='row'>
        <div className='modal column small-10 small-centered  '>
          <br/>
          <div className='row'>
            <div className='column small-11 small-centered'>
              <h1>Practice</h1>
              <hr/>
            </div>
          </div>
          <div className='row'>
            <div className='column small-12'>
              <AdjectivesExercise
                phrases={ phrases }
                replace={ replace }
              />
            </div>
          </div>
          <br/>
        </div>
      </div>
    );
  }

}

export function mapStateToProps(state, ownProps) {
  const phrases = presentPhrases(state.adjectiveTrainer.collection);
  return { phrases };
}

const mapDispatchToProps = {
  create, replace
};

export default connect(mapStateToProps, mapDispatchToProps)(AdjectivesTrainer);
