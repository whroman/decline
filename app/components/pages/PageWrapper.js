import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { get } from 'axios';

export default class PageWrapper extends Component {

    static get propTypes() {
        return {
            children: PropTypes.element.isRequired
        };
    }

    componentWillMount () {
        get('https://natgeoapi.herokuapp.com/api/dailyphoto')
            .then((response) => {
                document.body.style.backgroundImage = `url('${response.data.src}')`;
            });
    }

    renderRight () {
        return (
            <div className='right-links'>
                <Link to='#/practice'>{ 'Practice' }</Link>
                <Link to='#/create'>{ 'Configure' }</Link>
                <Link to='#/about'>{ 'About' }</Link>
            </div>
        );
    }

    render () {
        return (
            <div>
                <div className='header'>
                    <div className='row collapse'>
                        <div className='column small-12'>
                            <h1 className='float-left header-title'>{ 'Tägliches Deutsch' }</h1>
                            { this.renderRight() }
                        </div>
                    </div>
                </div>
                <br/>

                { this.props.children }
                <br/>
                <br/>

            </div>
        );
    }

}