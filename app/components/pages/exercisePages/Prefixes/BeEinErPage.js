import React from 'react';
import BasePage from '../BasePage';

const tags = ['er-', 'ein-', 'be-'];



export default function () {
    const props = {
        title: '"be", "ein", "er" Prefixes',
        tags
    };
    return (<BasePage { ...props } />);
}
