import { assert } from 'chai';
import exercises from './verbsWithPrepositions';

describe('exercises', () => {
    describe('a list of valid exercise objects', () => {
        it('should have a string declared for `text` in each exercise', () => {
            exercises.forEach((exercise) => {
                assert.equal(typeof exercise.text, 'string');
            });
        });

        it('each `text` string should have punctuation as the final character', () => {
            exercises.forEach((exercise) => {
                const { text } = exercise;
                const assertion = ['.', '!', '?'].includes(text[text.length - 1]);
                assert.equal(assertion, true, JSON.stringify(exercise));
            });
        });

        it('should have a populated array declared for `stubs` in each exercise', () => {
            exercises.forEach((exercise) => {
                const { stubs } = exercise;
                assert.equal(stubs instanceof Array, true);
                assert.isAtLeast(stubs.length, 1);
            });
        });

        it('should have an object declared for `translations` in each exercise', () => {
            exercises.forEach((exercise) => {
                assert.equal(typeof exercise.translations, 'object');
            });
        });

        it('should have a string declared for `translation.eng` in each exercise', () => {
            exercises.forEach((exercise) => {
                assert.equal(typeof exercise.translations.eng, 'string');
            });
        });

        it('should have a populated array declared for `tags` in each exercise', () => {
            exercises.forEach((exercise) => {
                assert.equal(exercise.tags instanceof Array, true, JSON.stringify(exercise));
                assert.isAtLeast(exercise.tags.length, 1);
            });
        });
    });
})