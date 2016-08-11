import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

const verbs = ['werden', 'worden', 'geworden', 'war'];

const exercises = verbsWithPrepositions.filter(
    (exercise) => verbs.some(
        (item) => exercise.tags.includes(item)
    )
);

export default function () {
    const props = {
        title: 'Werden, Worden, Geworden, War',
        exercises: presentVerbExercises(exercises)
    };
    return (<VerbBasePage { ...props } />);
}