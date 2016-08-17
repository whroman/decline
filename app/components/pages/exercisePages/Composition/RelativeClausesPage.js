import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

const item = ', article';

const exercises = verbsWithPrepositions.filter((exercise) => exercise.tags.includes(item));

export default function () {
    const props = {
        title: 'Relative Clauses',
        exercises: presentVerbExercises(exercises)
    };
    return (<VerbBasePage { ...props } />);
}
