import React from 'react';
import BasePage from '../BasePage';

const tags = ['active-voice'];

export default function () {
    const props = {
        title: 'Active Voice',
        tags
    };
    return (<BasePage { ...props } />);
}
