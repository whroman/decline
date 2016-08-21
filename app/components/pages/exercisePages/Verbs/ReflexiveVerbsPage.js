import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

const reflexiveVerbExercises = verbsWithPrepositions
    .filter((exercise) => exercise.tags.includes('reflexive'));

export default function () {
    const props = {
        title: 'Reflexive Verbs',
        exercises: presentVerbExercises(reflexiveVerbExercises)
    };
    return (<VerbBasePage { ...props } />);
}
