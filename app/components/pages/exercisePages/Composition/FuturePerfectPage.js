import React from 'react';
import BasePage from '../BasePage';

const tags = ['future-perfect'];



export default function () {
    const props = {
        title: 'Future Perfect Tense',
        tags
    };
    return (<BasePage { ...props } />);
}
