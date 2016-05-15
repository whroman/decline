import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router'
import { connect } from 'react-redux';
import { get } from 'axios';

import { create } from './../../dux/adjectiveTrainer';
import exerciseDetail from './../../presenters/exerciseDetail';
import './ExerciseItemDetail.scss';

export class ExerciseItemDetail extends Component {

  static get propTypes() {
    return {
      phrases: PropTypes.arrayOf(PropTypes.shape),
    };
  }

  componentDidMount () {
    if (!this.props.exercise) hashHistory.replace('#');
  }

  renderAnswer () {
    const { answer } = this.props.exercise;
    return (
      <strong>„{ answer }“</strong>
    );
  }

  renderTable () {
    const { objectGender, articleType } = this.props.exercise;
    return (
      <table>
        <tbody>
          <tr>
            <td>Objekt Genus</td>
            <td>{ objectGender }</td>
          </tr>
          <tr>
            <td>Artikel Typ</td>
            <td>{ articleType }</td>
          </tr>
        </tbody>
      </table>
    );
  }

  render () {
    if (!this.props.exercise) return null; // Required for routing redirect to work

    return (
      <div className='ExerciseItemDetail'>
        <div className='row'>
          <div className='modal column small-10 small-centered  '>
            <br />
            <div className='row'>
              <div className='column small-11 small-centered'>
                { this.renderAnswer() }
                <hr />
                <br />
                { this.renderTable() }
                <br />
                <Link className='button' to='#'>Züruck</Link>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }

}

export function mapStateToProps(state, ownProps) {
  const exercise = state.adjectiveTrainer.collection[ownProps.params.id];
  if (!exercise) return {};
  return { exercise: exerciseDetail(exercise) };
}

const mapDispatchToProps = {
  create
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseItemDetail);
