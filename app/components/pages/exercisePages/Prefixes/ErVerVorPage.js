import React from 'react';
import BasePage from '../BasePage';

const tags = ['er-', 'ver-', 'vor-'];



export default function () {
    const props = {
        title: '"er", "ver", "vor" Prefixes',
        tags
    };
    return (<BasePage { ...props } />);
}
