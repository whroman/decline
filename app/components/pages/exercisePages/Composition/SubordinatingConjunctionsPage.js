import React from 'react';
import BasePage from '../BasePage';

const tags = [
    ', als',
    ', als ob',
    ', damit',
    ', dass',
    ', indem',
    ', nachdem',
    ', obwohl',
    ', sobald',
    ', sodass',
    ', um zu',
    ', während',
    ', was',
    ', wie',
    ', wo',
    ', woher',
    ', wohin',
    ', warum',
    ', weil',
    ', wenn'
];



export default function () {
    const props = {
        title: 'Subordinating Conjunctions',
        tags
    };
    return (<BasePage { ...props } />);
}
