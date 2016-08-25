import React from 'react';
import BasePage from '../BasePage';

const tags = ['werden', 'worden', 'wurden', 'geworden', 'war', 'gewesen'];



export default function () {
    const props = {
        title: 'Werden, Worden, Wurden, Geworden, Gewesen, War',
        tags
    };
    return (<BasePage { ...props } />);
}
