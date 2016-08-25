import React from 'react';
import BasePage from '../BasePage';

const tags = ['present-perfect'];



export default function () {
    const props = {
        title: 'Present Perfect Tense',
        tags
    };
    return (<BasePage { ...props } />);
}
