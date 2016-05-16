import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

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
    this.props.create({ amount: 8 });
  }

  render () {
    const { create, phrases } = this.props;

    return (
      <div className='row'>
        <div className='modal column small-10 small-centered  '>
          <br/>
          <div className='row'>
            <div className='column small-11 small-centered'>
              <h1>Practice</h1>
              <hr/>
              <AdjectivesExercise phrases={ phrases } />
              <br/>
              <div class="row">
                <div
                  className='button'
                  onClick={ this.handleClick.bind(this) }
                >Continue Practicing</div>

                <div className='button warning float-right'>
                  <Link to='create'>Configure Exercises</Link>
                </div>
              </div>
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
