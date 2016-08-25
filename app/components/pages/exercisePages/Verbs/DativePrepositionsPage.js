import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';
import dativePrepositions from './dativePrepositions'

const tags = dativePrepositions;

const exercises = verbsWithPrepositions.filter(
    (exercise) => tags.some(
        (item) => exercise.tags.includes(item)
    )
);
export default function () {
    const props = {
        title: 'Dative Prepositions',
        exercises: presentVerbExercises(exercises)
    };
    return (<VerbBasePage { ...props } />);
}
