import React, { Component } from 'react';
import { Link } from 'react-router';
import Tooltip from 'app/components/Tooltip//Tooltip';

import exercisePages from '../../../exercisePages';
import './PracticePage.scss';

export class Practice extends Component {

    render() {
        return (
            <div className='Practice'>
                <div className='row'>
                    <div className='modal column small-10 small-centered  '>
                        <br />
                        <div className='row'>
                            <div className="column small-11 small-centered">
                                <h1>{ 'Practice' }</h1>
                                <hr />
                                <div className='row'>
                                    { this.renderLinks() }
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        );
    }

    renderLinks() {
        return exercisePages.map(({ path, name }) => (
            <div key={ path } className='column small-6'>
                <Link to={ path } className='button' >{ name }</Link>
                <br/><br/>
            </div>
        ));
    }

}

export default Practice;
