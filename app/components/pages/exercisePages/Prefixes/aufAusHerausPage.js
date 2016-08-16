import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

const prefixes = ['auf-', 'aus-', 'heraus-'];

const exercises = verbsWithPrepositions.filter((exercise) => prefixes.some(
        (item) => exercise.tags.includes(item)
    ));

export default function () {
    const props = {
        title: '"auf", "aus", "heraus" Prefixes',
        exercises: presentVerbExercises(exercises)
    };
    return (<VerbBasePage { ...props } />);
}
