import React, { Component } from 'react';
import VerbBasePage from './VerbsBasePage';
import presentVerbExercises from './presentVerbExercises';
import verbsWithPrepositions from 'tables/rawExercises/verbsWithPrepositions';

const reflexiveVerbExercises = verbsWithPrepositions
    .filter((exercise) => exercise.tags.includes('sich'));

console.log(verbsWithPrepositions);
console.log(reflexiveVerbExercises);

export default class ReflexiveVerbsPage extends Component {
    render () {
        const props = {
            exercises: presentVerbExercises(reflexiveVerbExercises)
        };
        return (<VerbBasePage { ...props } />);
    }
}
