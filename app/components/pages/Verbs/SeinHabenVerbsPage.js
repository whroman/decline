import React, { Component } from 'react';
import VerbBasePage from './VerbsBasePage';
import presentVerbExercises from './presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

const verbs = ['sein', 'haben'];

const exercises = verbsWithPrepositions.filter(
    (exercise) => verbs.some(
        (item) => exercise.tags.includes(item)
    )
);

export default class ReflexiveVerbsPage extends Component {
    render () {
        const props = {
            title: 'Sein & Haben Verbs',
            exercises: presentVerbExercises(exercises)
        };
        return (<VerbBasePage { ...props } />);
    }
}
