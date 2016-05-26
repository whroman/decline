import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import presentPhrases from './../../../presenters/phrases';
import { create } from './../../../dux/adjectiveTrainer';

import CreationForm from './CreationForm';

export class ExerciseCreationPage extends Component {

  static get propTypes() {
    return {
      create: PropTypes.func,
    };
  }

  render () {
    const { create, kasus, kategorie } = this.props;

    return (
      <div>
        <div className='row'>
          <div className='modal column small-10 small-centered  '>
            <br/>
            <div className='row'>
              <div className='column small-11 small-centered'>
                <CreationForm
                  create={ create }
                  kasus={ kasus }
                  kategorie={ kategorie }
                />
              </div>
            </div>
            <br/>
          </div>
        </div>
        <br/>
      </div>
    );
  }

}

function mapStateToProps(state, ownProps) {
  const { kasus, kategorie } = state.adjectiveTrainer;
  return { kasus, kategorie };
}

const mapDispatchToProps = {
  create
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseCreationPage);
