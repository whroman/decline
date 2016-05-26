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
                <span>{ 'Each sentence that appears is randomly generated 1 milliscond before you see it. If it speaks poorly about your mother, I will ask it to apologize.' }</span>
                <br />
                <br />
                <span>{ 'Learn more about how this works by looking at ' }</span>
                <a href='https://github.com/whroman/conjugate/blob/gh-pages/README.md'>
                    { 'the README of this project\'s open-source codebase' }
                </a>
                <span>{ '.' }</span>
                <br />
                <br />
                <span>{ 'The daily background image is National Geographic\'s photo of the day.' }</span>
                <br />
                <br />
                <span>{ 'Questions? Comments? Email' }</span>
                <a href='mailto:me@walterroman.com'>{ 'me@walterroman.com' }</a>
                <span>{ '.' }</span>
            </div>
        );
    }

}

export default About;
