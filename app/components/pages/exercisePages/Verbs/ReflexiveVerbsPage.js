import React from 'react';
import BasePage from '../BasePage';

const tags = ['reflexive'];



export default function () {
    const props = {
        title: 'Reflexive Verbs',
        tags
    };
    return (<BasePage { ...props } />);
}
