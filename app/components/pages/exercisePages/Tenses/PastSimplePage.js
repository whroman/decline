import React from 'react';
import BasePage from '../BasePage';

const tags = ['past-simple'];

export default function () {
    const props = {
        title: 'Simple Past Tense',
        subtitle: '"Das Präteritum"',
        tags
    };
    return (<BasePage { ...props } />);
}
