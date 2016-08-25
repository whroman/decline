import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';
import twoWayPrepositions from './twoWayPrepositions'
import accusativePrepositions from './accusativePrepositions'
import dativePrepositions from './dativePrepositions'

const tags = twoWayPrepositions
    .concat(accusativePrepositions)
    .concat(dativePrepositions);

const exercises = verbsWithPrepositions.filter(
    (exercise) => tags.some(
        (item) => exercise.tags.includes(item)
    )
);


export default function () {
    const props = {
        title: 'Verbs & Prepositions',
        exercises: presentVerbExercises(exercises)
    };
    return (<VerbBasePage { ...props } />);
}
