import React from 'react';
import BasePage from '../BasePage';

const tags = ['future-simple'];



export default function () {
    const props = {
        title: 'Future Imperfect Tense',
        tags
    };
    return (<BasePage { ...props } />);
}
