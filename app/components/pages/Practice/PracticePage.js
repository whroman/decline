import React, { Component } from 'react';
import { Link } from 'react-router';
import Tooltip from 'app/components/Tooltip//Tooltip';

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
                                <Link
                                    to='/practice/adjective-declension'
                                    className='button'
                                >
                                    { 'Adjective Declension' }
                                </Link>
                                <br/><br/>
                                <Link
                                    to='/practice/verbs/prepositions'
                                    className='button'
                                >
                                    { 'Verbs & Prepositions' }
                                </Link>
                                <br/><br/>
                                <Link
                                    to='/practice/verbs/reflexive'
                                    className='button'
                                >
                                    { 'Reflexive Verbs' }
                                </Link>
                                <br/><br/>
                                <Link
                                    to='/practice/verbs/sein-haben'
                                    className='button'
                                >
                                    { 'Sein & Haben Verbs' }
                                </Link>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        );
    }

}

export default Practice;
