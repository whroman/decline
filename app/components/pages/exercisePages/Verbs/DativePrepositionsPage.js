import React from 'react';
import BasePage from '../BasePage';
import dativePrepositions from './dativePrepositions'

const tags = dativePrepositions;


export default function () {
    const props = {
        title: 'Dative Prepositions',
        tags
    };
    return (<BasePage { ...props } />);
}
