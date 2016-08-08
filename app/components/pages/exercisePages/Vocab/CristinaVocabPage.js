import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

const exercises = verbsWithPrepositions
    .filter((exercise) => exercise.tags.includes('vocab-cristina'));

export default function () {
    const props = {
        title: 'Vocab for Cristina',
        exercises: presentVerbExercises(exercises)
    };
    return (<VerbBasePage { ...props } />);
}
