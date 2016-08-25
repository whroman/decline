import React from 'react';
import BasePage from '../BasePage';

const tags = [', article'];



export default function () {
    const props = {
        title: 'Clauses Begun By an Article',
        tags
    };
    return (<BasePage { ...props } />);
}
