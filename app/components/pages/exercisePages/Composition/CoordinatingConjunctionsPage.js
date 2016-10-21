import React from 'react';
import BasePage from '../BasePage';

const tags = [
    ', aber',
    ', sondern',
    ', denn',
    ', oder'
];

export default function () {
    const props = {
        title: 'Coordinating Conjunctions',
        tags
    };
    return (<BasePage { ...props } />);
}
