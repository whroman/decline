import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';
import twoWayPrepositions from './twoWayPrepositions'

const exercises = verbsWithPrepositions.filter((exercise) => twoWayPrepositions.some(
        (item) => exercise.tags.includes(item)
    ));

export default function () {
    const props = {
        title: 'Two-Way Prepositions',
        exercises: presentVerbExercises(exercises)
    };
    return (<VerbBasePage { ...props } />);
}
