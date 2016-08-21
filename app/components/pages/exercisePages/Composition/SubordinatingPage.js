import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

const verbs = ['dass', 'weil', ', dass', ', weil', ', aber', ', sodass', ', als'];

const exercises = verbsWithPrepositions.filter(
    (exercise) => verbs.some(
        (item) => exercise.tags.includes(item)
    )
);

export default function () {
    const props = {
        title: 'Subordinating Conjunctions',
        exercises: presentVerbExercises(exercises)
    };
    return (<VerbBasePage { ...props } />);
}