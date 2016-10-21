import React from 'react';
import BasePage from '../BasePage';

const tags = [
    'geworden',
    'gewesen'
];

export default function () {
    const props = {
        title: '"gewesen" vs "geworden"',
        subtitle: 'or "has been" vs "has become"',
        tags: tags.reduce((arr, text) => {
            return arr.concat(text, `-${text}`);
        }, [])
    };
    return (<BasePage { ...props } />);
}
