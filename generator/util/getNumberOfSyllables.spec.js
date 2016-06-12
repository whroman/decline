import { assert } from 'chai';
import getNumberOfSyllables from './getNumberOfSyllables';

const testCases = [
    [ '', 0 ],
    [ 't', 0 ],
    [ 'a', 1 ],
    [ 'e', 1 ],
    [ 'i', 1 ],
    [ 'o', 1 ],
    [ 'u', 1 ],
    [ 'y', 1 ],
    [ 'ä', 1 ],
    [ 'ö', 1 ],
    [ 'ü', 1 ],
    [ 'ab', 1 ],
    [ 'ai', 1 ],
    [ 'au', 1 ],
    [ 'äu', 1 ],
    [ 'ei', 1 ],
    [ 'eu', 1 ],
    [ 'ie', 1 ],
    [ 'ia', 2 ],
    [ 'aba', 2 ],
    [ 'ababa', 3 ],
    [ 'AbAbA', 3 ]
];

describe('getNumberOfSyllables()', () => {
    testCases.forEach((testCase) => {
        const text = testCase[0];
        const val = testCase[1];
        it(`should return number of syllables in ${text}`, () => {
            assert.equal(getNumberOfSyllables(text), val);
        });
    });
});