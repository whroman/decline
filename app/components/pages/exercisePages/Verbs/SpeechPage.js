import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

const tags = [
    'sprechen',
    '-sprechen',
    'erklären',
    'erzählen',
    '-rufen',
    'sagen',
    '-sagen',
    'nennen'
]

const exercises = verbsWithPrepositions.filter((exercise) =>
    tags.some((item) => exercise.tags.includes(item))
);

export default function () {
    const props = {
        title: 'Speech Verbs',
        exercises: presentVerbExercises(exercises)
    };
    return (<VerbBasePage { ...props } />);
}
