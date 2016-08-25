import React from 'react';
import BasePage from '../BasePage';

const tags = [', wer', ', wo', ', was', ', wovon', ', womit', ',worauf'];



export default function () {
    const props = {
        title: 'Relative Pronoun Clauses',
        tags
    };
    return (<BasePage { ...props } />);
}
