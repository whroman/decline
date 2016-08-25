import React from 'react';
import BasePage from '../BasePage';

const tags = ['past-perfect'];

export default function () {
    const props = {
        title: 'Past Perfect Tense',
        subtitle: '"Das Plusquamperfekt"',
        tags
    };
    return (<BasePage { ...props } />);
}
