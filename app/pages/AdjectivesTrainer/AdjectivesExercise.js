import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

import AdjectivesExerciseItem from './AdjectivesExerciseItem';
import './AdjectivesExercise.scss';

export default class AdjectivesExercise extends Component {

  static get propTypes() {
    return {
      phrases: PropTypes.arrayOf(PropTypes.shape),
    };
  }

  renderPhrase (phrase, index) {
    return (
      <tr key={ phrase.key } >
        <AdjectivesExerciseItem number={ index } phrase={ phrase } />
        { this.renderExerciseActions(index) }
      </tr>
    );
  }

  render () {
    return (
      <table className='AdjectivesExercise'>
        <tbody>
          { this.props.phrases.map(this.renderPhrase.bind(this)) }
        </tbody>
      </table>
    );
  }

  renderExerciseActions (number) {
    return (
      <td>
        <Link
          to={`detail/${number}`}
          className='detail-link'
        >
          <i className='wr-ico wr-ico-info-circle wr-ico-fw' />
        </Link>
      </td>
    );
  }

}
