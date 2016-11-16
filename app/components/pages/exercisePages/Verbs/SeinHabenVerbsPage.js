import React from 'react';
import BasePage from '../BasePage';

const tags = ['sein', 'haben'];



export default function () {
    const props = {
        title: 'Sein & Haben Verbs',
        tags
    };
    return (<BasePage { ...props } />);
}
