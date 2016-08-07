import React from 'react';
import VerbBasePage from '../VerbsBasePage';
import presentVerbExercises from '../presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

const exercises = verbsWithPrepositions.filter((exercise) => [
        'bis',
        'aus',
        'während',
        'an',
        'durch',
        'außer',
        'trotz',
        'auf',
        'entlang',
        'bei',
        'statt',
        'anstatt',
        'hinter',
        'für',
        'mit',
        'wegen',
        'in',
        'gegen',
        'nach',
        'innerhalb',
        'neben',
        'ohne',
        'seit',
        'außerhalb',
        'über',
        'um',
        'von',
        'jenseits',
        'unter',
        'wider',
        'zu',
        'diesseits',
        'vor',
        'gegenüber',
        'zwischen',
        'ab'
    ].some(
        (item) => exercise.tags.includes(item)
    ));

export default function () {
    const props = {
        title: 'Verbs & Prepositions',
        exercises: presentVerbExercises(exercises)
    };
    return (<VerbBasePage { ...props } />);
}
