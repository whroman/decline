import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

const tags = [
    'erfahren',
    'wissen',
    'wussten',
    'glauben',
    'glaubten',
    'denken'
];

const exercises = verbsWithPrepositions.filter((exercise) =>
    tags.some((item) => exercise.tags.includes(item))
);

export default function () {
    const props = {
        title: 'Knowledge Verbs',
        subtitle: tags.map((text) => `"${text}"`).join(', '),
        exercises: presentVerbExercises(exercises)
    };
    return (<VerbBasePage { ...props } />);
}
