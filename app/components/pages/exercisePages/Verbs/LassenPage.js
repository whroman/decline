import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

const exercises = verbsWithPrepositions
    .filter((exercise) => (
        exercise.tags.includes('lassen') ||
        exercise.tags.includes('-lassen')
    ));

export default function () {
    const props = {
        title: 'Uses of "lassen"',
        exercises: presentVerbExercises(exercises)
    };
    return (<VerbBasePage { ...props } />);
}
