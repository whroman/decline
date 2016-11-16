import React from 'react';
import BasePage from '../BasePage';

const tags = ['wie', 'als'];

export default function () {
    const props = {
        title: 'Wie & Als',
        tags
    };
    return (<BasePage { ...props } />);
}
