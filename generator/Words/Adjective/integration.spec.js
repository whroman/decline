import { assert } from 'chai';
import Adjective from './Adjective';

const adjSuffixes = [
//  Arguments
/*
    adjective suffix
            objectGender
               articleType
                  grammarCase
*/
    // Nominative
    ['e',    '0', '0', '0'],
    ['e',    '1', '0', '0'],
    ['e',    '2', '0', '0'],
    ['en',   '3', '0', '0'],

    ['er',   '0', '1', '0'],
    ['e',    '1', '1', '0'],
    ['es',   '2', '1', '0'],
    [null,   '3', '1', '0'],

    ['er',   '0', '2', '0'],
    ['e',    '1', '2', '0'],
    ['es',   '2', '2', '0'],
    ['e',    '3', '2', '0'],

    ['er',   '0', '3', '0'],
    ['e',    '1', '3', '0'],
    ['es',   '2', '3', '0'],
    ['en',   '3', '3', '0'],

    // Accusative
    ['en',   '0', '0', '1'],
    ['e',    '1', '0', '1'],
    ['e',    '2', '0', '1'],
    ['en',   '3', '0', '1'],

    ['en',   '0', '1', '1'],
    ['e',    '1', '1', '1'],
    ['es',   '2', '1', '1'],
    [null,   '3', '1', '1'],

    ['en',   '0', '2', '1'],
    ['e',    '1', '2', '1'],
    ['es',   '2', '2', '1'],
    ['e',    '3', '2', '1'],

    ['en',   '0', '3', '1'],
    ['e',    '1', '3', '1'],
    ['es',   '2', '3', '1'],
    ['en',   '3', '3', '1'],

    // Dative
    ['en',   '0', '0', '2'],
    ['en',   '1', '0', '2'],
    ['en',   '2', '0', '2'],
    ['en',   '3', '0', '2'],

    ['en',   '0', '1', '2'],
    ['en',   '1', '1', '2'],
    ['en',   '2', '1', '2'],
    [null,   '3', '1', '2'],

    ['em',   '0', '2', '2'],
    ['er',   '1', '2', '2'],
    ['em',   '2', '2', '2'],
    ['en',   '3', '2', '2'],

    ['en',   '0', '3', '2'],
    ['en',   '1', '3', '2'],
    ['en',   '2', '3', '2'],
    ['en',   '3', '3', '2'],

    // Genitive
    ['en',   '0', '0', '3'],
    ['en',   '1', '0', '3'],
    ['en',   '2', '0', '3'],
    ['en',   '3', '0', '3'],

    ['en',   '0', '1', '3'],
    ['en',   '1', '1', '3'],
    ['en',   '2', '1', '3'],
    [null,   '3', '1', '3'],

    ['en',   '0', '2', '3'],
    ['er',   '1', '2', '3'],
    ['en',   '2', '2', '3'],
    ['er',   '3', '2', '3'],

    ['en',   '0', '3', '3'],
    ['en',   '1', '3', '3'],
    ['en',   '2', '3', '3'],
    ['en',   '3', '3', '3']
];

describe('Generator', () =>
describe('Adjective', () => {
    describe('#getSuffix', () => {
        it('returns correct suffix', () => {
            adjSuffixes.forEach( (testCase) => {

                // describe(` - ${grammarCaseName} cases -`, () => {
                    // tests.forEach( (test) => {
                const findSuffix = () => {
                    const { text } = new Adjective({
                        root: 'fakeRoot'
                    }).getSuffix(
                        testCase[1],
                        testCase[2],
                        testCase[3]
                    );

                    return text;
                };

                if (testCase[0] === null) {
                    assert.throws(findSuffix);
                } else {
                    assert.equal(findSuffix(), testCase[0]);
                }

            });
        });
    });
}));
