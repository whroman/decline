import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import presentPhrases from './../../presenters/phrases';
import { create } from './../../dux/adjectiveTrainer';

import CreationForm from './CreationForm';
import AdjectivesExercise from './AdjectivesExercise';

export class AdjectivesTrainer extends Component {

  static get propTypes() {
    return {
      phrases: PropTypes.arrayOf(PropTypes.shape),
    };
  }

  componentWillMount () {
    this.props.create({
      amount: 10
    });
  }

  render () {
    const { create, phrases } = this.props;

    return (
      <div>
        <div className='row'>
          <div className='modal column small-10 small-centered  '>
            <div className='row'>
              <div className='column small-11 small-centered'>
                <CreationForm create={ create } />
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div className='row'>
          <div className='modal column small-10 small-centered  '>
            <div className='row'>
              <div className='column small-11 small-centered'>
                <br/>
                <AdjectivesExercise phrases={ phrases } />
                <br/>
              </div>
            </div>
          </div>
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
