import React, { Component, PropTypes } from 'react';

import './AboutPage.scss';

export class About extends Component {

  render () {
    return (
      <div className='About'>
        <div className='row'>
          <div className='modal column small-10 small-centered  '>
            <br />
            <div className='row'>
              <div className='column small-11 small-centered'>
                <h1>About</h1>
                <hr/>
                Every sentence you see if being randomly, programmatically generated in roughly 1 milliscond before you see it. If it speaks poorly about your mother, I will ask it to apologize.
                <br/>
                <br/>
                Learn more about how this works by looking at <a href='https://github.com/whroman/conjugate/blob/gh-pages/README.md'>the README of this project's open-source codebase</a>.
                <br/>
                <br/>
                The daily background image is National Geographic's photo of the day.
                <br/>
                <br/>
                Questions? Comments? Email <a href='mailto:me@walterroman.com'>me@walterroman.com</a>.
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }

}

export default About;
