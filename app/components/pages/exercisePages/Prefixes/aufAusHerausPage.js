import React from 'react';
import BasePage from '../BasePage';

const tags = ['auf-', 'aus-', 'heraus-'];



export default function () {
    const props = {
        title: '"auf", "aus", "heraus" Prefixes',
        tags
    };
    return (<BasePage { ...props } />);
}
