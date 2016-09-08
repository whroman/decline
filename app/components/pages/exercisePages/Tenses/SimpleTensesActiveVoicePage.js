import React from 'react';
import BasePage from '../BasePage';

const tags = [
    ['present-simple', 'active-voice'],
    ['past-simple', 'active-voice'],
    ['future-simple', 'active-voice'],
];

export default function () {
    const props = {
        title: 'Simple Tenses in the Active Voice',
        tags
    };
    return (<BasePage { ...props } />);
}
