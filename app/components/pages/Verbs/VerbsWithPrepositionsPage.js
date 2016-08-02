import React, { Component } from 'react';
import VerbBasePage from './VerbsBasePage';
import presentVerbExercises from './presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

export default class VerbsWithPrepositionsPage extends Component {
    render () {
        const props = {
            exercises: presentVerbExercises(verbsWithPrepositions)
        };
        return (<VerbBasePage { ...props } />);
    }
}
