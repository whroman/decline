import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

const items = [', article', ', wo'];

const exercises = verbsWithPrepositions.filter(
    (exercise) => items.some(
        (item) => exercise.tags.includes(item)
    )
);

export default function () {
    const props = {
        title: 'Relative Clauses',
        exercises: presentVerbExercises(exercises)
    };
    return (<VerbBasePage { ...props } />);
}
