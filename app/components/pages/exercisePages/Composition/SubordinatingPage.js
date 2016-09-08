import React from 'react';
import BasePage from '../BasePage';

const tags = [
    ', dass',
    ', weil',
    ', aber',
    ', sodass',
    ', als',
    ', obwohl',
    ', während',
    ', damit',
    ', sobald',
    ', indem'
];



export default function () {
    const props = {
        title: 'Subordinating Conjunctions',
        tags
    };
    return (<BasePage { ...props } />);
}
