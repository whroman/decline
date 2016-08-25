import React from 'react';
import BasePage from '../BasePage';
import twoWayPrepositions from './twoWayPrepositions'
import accusativePrepositions from './accusativePrepositions'
import dativePrepositions from './dativePrepositions'

const tags = twoWayPrepositions
    .concat(accusativePrepositions)
    .concat(dativePrepositions);




export default function () {
    const props = {
        title: 'Verbs & Prepositions',
        tags
    };
    return (<BasePage { ...props } />);
}
