import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

const verbs = ['werden', 'worden', 'wurden', 'geworden', 'war', 'gewesen'];

const exercises = verbsWithPrepositions.filter(
    (exercise) => verbs.some(
        (item) => exercise.tags.includes(item)
    )
);

export default function () {
    const props = {
        title: 'Werden, Worden, Wurden, Geworden, Gewesen, War',
        exercises: presentVerbExercises(exercises)
    };
    return (<VerbBasePage { ...props } />);
}
