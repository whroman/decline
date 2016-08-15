import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

const verbs = [
    'stellen',
    '-stellen',
    'stehen',
    '-stehen',
    'liegen',
    '-liegen',
    'legen',
    '-legen'
];

const exercises = verbsWithPrepositions.filter((exercise) => verbs.some(
        (item) => exercise.tags.includes(item)
    ));

export default function () {
    const props = {
        title: 'Uses of "stellen", "stehen", "legen", "liegen"',
        exercises: presentVerbExercises(exercises)
    };
    return (<VerbBasePage { ...props } />);
}
