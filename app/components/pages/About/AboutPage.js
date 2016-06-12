import React, { Component } from 'react';
import './AboutPage.scss';

export class About extends Component {

    render() {
        return (
            <div className='About'>
                <div className='row'>
                    <div className='modal column small-10 small-centered  '>
                        <br />
                        <div className='row'>
                            { this.renderContent() }
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        );
    }

    renderContent() {
        return (
            <div className='column small-11 small-centered'>
                <h1>{ 'About' }</h1>
                <hr />
                <span>{ 'This is a German declension trainer. All sentences are randomly generated. Learn more about how this works by looking at ' }</span>
                <a href='https://github.com/whroman/conjugate/blob/gh-pages/README.md'>
                    { 'this project\'s open-source codebase' }
                </a>
                <span>{ '.' }</span>
                <br />
                <br />
                <span>{'The daily background image is NatGeo\'s '}<a href="http://photography.nationalgeographic.com/photography/photo-of-the-day/">{'photo of the day'}</a>{'.'}</span>
                <br />
                <br />
                <span>{ 'Questions? Comments? Feedback? Send a note to ' }</span>
                <a href='mailto:me@walterroman.com'>{ 'me@walterroman.com' }</a>
                <span>{ '.' }</span>
            </div>
        );
    }

}

export default About;
