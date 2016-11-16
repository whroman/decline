import React from 'react';
import BasePage from '../BasePage';

const tags = ['vocab-cristina'];

export default function () {
    const props = {
        title: 'Vocab for Cristina',
        tags
    };
    return (<BasePage { ...props } />);
}
