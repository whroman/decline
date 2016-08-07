import React, { Component } from 'react';
import { Link } from 'react-router';
import Tooltip from 'app/components/Tooltip//Tooltip';
import './PracticePage.scss';

const links = [
    {
        to: '/practice/adjective-declension',
        name: 'Adjective Declension'
    },
    {
        to: '/practice/verbs/prepositions',
        name: 'Verbs & Prepositions'
    },
    {
        to: '/practice/verbs/reflexive',
        name: 'Reflexive Verbs'
    },
    {
        to: '/practice/verbs/sein-haben',
        name: 'Sein & Haben Verbs'
    },
    {
        to: '/practice/conjugations/dass-weil',
        name: 'Dass and Weil Clauses'
    },
    {
        to: '/practice/adverbs/da-words',
        name: '"da-" Words'
    }
];

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

                                    { links.map(({ to, name }) => {
                                        const props  = {
                                            to,
                                            className: 'button',
                                        };

                                        return (
                                            <div key={ to } className='column small-6'>
                                                <Link { ...props } >{ name }</Link>
                                                <br/><br/>
                                            </div>
                                        );
                                    })}
                                </div>
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
