import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router'
import { connect } from 'react-redux';
import { get } from 'axios';

import { create } from 'app/dux/adjectiveTrainer';
import exerciseDetail from 'app/presenters/exerciseDetail';
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
    const {
      objectGender, articleType, adjEnglish, objectEnglish, categories
    } = this.props.exercise;
    return (
      <table>
        <tbody>
          <tr>
            <td>Adj. auf english</td>
            <td>{ adjEnglish }</td>
          </tr>
          <tr>
            <td>Object auf english</td>
            <td>{ objectEnglish }</td>
          </tr>
          <tr>
            <td>Objekt genus</td>
            <td>{ objectGender }</td>
          </tr>
          <tr>
            <td>Objekt Kategorien</td>
            <td>{ categories }</td>
          </tr>
          <tr>
            <td>Artikel typ</td>
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
                <br />
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
