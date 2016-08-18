import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

const prefixes = ['er-', 'ein-', 'be-'];

const exercises = verbsWithPrepositions.filter((exercise) => prefixes.some(
        (item) => exercise.tags.includes(item)
    ));

export default function () {
    const props = {
        title: '"be", "ein", "er" Prefixes',
        exercises: presentVerbExercises(exercises)
    };
    return (<VerbBasePage { ...props } />);
}
