import React, { Component } from 'react';
import { Link } from 'react-router';
import Tooltip from 'app/components/Tooltip//Tooltip';

import exercisePages from '../../../exercisePages';
import './PracticePage.scss';

const groups = [
    {
        tag: 'verb',
        title: 'Verbs'
    },
    {
        tag: 'composition',
        title: 'Composition'
    },
    {
        tag: 'adverb',
        title: 'Adverbs'
    },
    {
        tag: 'prefix',
        title: 'Prefixes'
    },
    {
        tag: 'pronoun',
        title: 'Pronouns'
    },
    {
        tag: 'adjective',
        title: 'Adjective'
    },
    {
        tag: 'vocab',
        title: 'Vocabulary'
    }
].map(group => Object.assign(group, { pages: [] }));

const groupIndexes = groups.reduce((memo, group, index) => {
    memo[group.tag] = index;
    return memo;
}, {});

const pageGroups = exercisePages.reduce((memo, page) => {
    page.tags.forEach((tag) => {
        const index = groupIndexes[tag];
        if (index >= 0) memo[index].pages.push(page);
    });
    return memo;
}, groups);

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
                                { this.renderLinks() }
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        );
    }

    renderLinks() {
        let elements = [];
        return pageGroups.map(({ tag, title, pages }) => (
            <div key={ tag }>
                <br/>
                <h3>{ title }</h3>
                <div className='row'>
                    { pages.map(({ path, name }) => (
                        <div key={ path } className='column small-6 float-left'>
                            <Link to={ path } className='button' >{ name }</Link>
                            <br/><br/>
                        </div>
                    )) }
                </div>
                <br/>
            </div>
        ));
    }

}

export default Practice;
