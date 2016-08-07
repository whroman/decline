import React, { Component } from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

const verbs = ['da-'];

const exercises = verbsWithPrepositions.filter(
    (exercise) => verbs.some(
        (item) => exercise.tags.includes(item)
    )
);

export default class daPage extends Component {
    render () {
        const props = {
            title: '"da-" Words',
            exercises: presentVerbExercises(exercises)
        };
        return (<VerbBasePage { ...props } />);
    }
}
