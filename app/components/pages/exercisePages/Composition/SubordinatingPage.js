import React from 'react';
import BasePage from '../BasePage';

const tags = ['dass', 'weil', ', dass', ', weil', ', aber', ', sodass', ', als'];



export default function () {
    const props = {
        title: 'Subordinating Conjunctions',
        tags
    };
    return (<BasePage { ...props } />);
}
