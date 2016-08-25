import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';
import twoWayPrepositions from './twoWayPrepositions'

const tags = twoWayPrepositions;
const exercises = verbsWithPrepositions.filter(
    (exercise) => tags.some(
        (item) => exercise.tags.includes(item)
    )
);

export default function () {
    const props = {
        title: 'Two-Way Prepositions',
        subtitle: twoWayPrepositions.map((text) => `"${text}"`).join(', '),
        exercises: presentVerbExercises(exercises)
    };
    return (<VerbBasePage { ...props } />);
}
