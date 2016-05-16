import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import { get } from 'axios';

export default class PageWrapper extends Component {

  componentWillMount () {
    get('https://natgeoapi.herokuapp.com/api/dailyphoto')
      .then((response) => {
          document.body.style.backgroundImage = `url('${response.data.src}')`;
      });
  }

  renderRight () {
    return (
      <div className='float-right'>
        <Link to='create'>Praktizieren</Link>
      </div>
    );
  }

  render () {
    return (
      <div>
        <div className='header'>
          <div className='row collapse'>
            <div className='column small-10 small-centered'>
              <h1 className='float-left header-title'>Täglich Deutsch</h1>
              { this.renderRight() }
            </div>
          </div>
        </div>
        <br/>

        { this.props.children }

        <br/>
      </div>
    );
  }

}