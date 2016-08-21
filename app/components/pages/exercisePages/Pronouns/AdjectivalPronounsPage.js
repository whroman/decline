import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

const pronouns = [
    'all',
    'dies',
    'jed',
    'jen',
    'manch',
    'solch',
    'welch'
];

const exercises = verbsWithPrepositions.filter((exercise) => pronouns.some(
        (item) => exercise.tags.includes(item)
    ));

export default function () {
    const props = {
        title: 'Adjectival Pronouns',
        exercises: presentVerbExercises(exercises)
    };
    return (<VerbBasePage { ...props } />);
}
