import React from 'react';
import BasePage from '../BasePage';

const tags = ['da-'];

export default function () {
    const props = {
        title: '"da-" Words',
        tags
    };
    return (<BasePage { ...props } />);
}
