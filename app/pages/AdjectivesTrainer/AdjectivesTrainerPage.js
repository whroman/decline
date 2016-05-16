import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import presentPhrases from './../../presenters/phrases';
import { create } from './../../dux/adjectiveTrainer';

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
    this.props.create({
      amount: 8
    });
  }

  render () {
    const { create, phrases } = this.props;

    return (
      <div className='row'>
        <div className='modal column small-10 small-centered  '>
          <br/>
          <div className='row'>
            <div className='column small-11 small-centered'>
              <div className='float-left'>
                <h1 className='float-left'>Practice</h1>
              </div>
              <hr/>
              <AdjectivesExercise phrases={ phrases } />
              <br/>
              <div
                className='button small'
                onClick={ this.handleClick.bind(this) }
              >More Exercises</div>
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
  create
};

export default connect(mapStateToProps, mapDispatchToProps)(AdjectivesTrainer);
