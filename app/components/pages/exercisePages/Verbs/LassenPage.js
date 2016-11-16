import React from 'react';
import BasePage from '../BasePage';

const tags = ['lassen', '-lassen'];


export default function () {
    const props = {
        title: 'Uses of "lassen"',
        tags
    };
    return (<BasePage { ...props } />);
}
