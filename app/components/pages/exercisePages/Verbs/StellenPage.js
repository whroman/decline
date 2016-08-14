import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

const exercises = verbsWithPrepositions
    .filter((exercise) => (
        exercise.tags.includes('stellen') ||
        exercise.tags.includes('-stellen') ||
        exercise.tags.includes('liegen') ||
        exercise.tags.includes('-liegen')
    ));

export default function () {
    const props = {
        title: 'Uses of "stellen" & "liegen"',
        exercises: presentVerbExercises(exercises)
    };
    return (<VerbBasePage { ...props } />);
}
