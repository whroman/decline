import React from 'react';
import BasePage from '../BasePage';

const tags = ['present-simple'];

export default function () {
    const props = {
        title: 'Present Simple Tense',
        subtitle: '"Das Präsens"',
        tags
    };
    return (<BasePage { ...props } />);
}
