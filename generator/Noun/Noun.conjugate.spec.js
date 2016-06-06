import { expect } from 'chai';
import sinon from 'sinon';
import Noun from './Noun';

describe('Generator', () =>
describe('Noun', () =>
describe('#conjugate', () => {
    it('returns conjugated text', () => {
        const ROOT = 'Foo';
        const CONJUGATION = 'asdf';
        const testCases = [
            // Maskulin
            {
                gender: '0',
                grammarCase: '0'
            },
            {
                gender: '0',
                grammarCase: '1'
            },
            {
                gender: '0',
                grammarCase: '2'
            },
            {
                gender: '0',
                grammarCase: '3'
            },
            {
                gender: '0',
                grammarCase: '0',
                root: 'Fe',
                conjugation: 'Fe'
            },
            {
                gender: '0',
                grammarCase: '1',
                root: 'Fe',
                conjugation: 'Fen'

            },
            {
                gender: '0',
                grammarCase: '2',
                root: 'Fe',
                conjugation: 'Fen'

            },
            {
                gender: '0',
                grammarCase: '3',
                root: 'Fe',
                conjugation: 'Fen'
            },
            // Feminin
            {
                gender: '1',
                grammarCase: '0'
            },
            {
                gender: '1',
                grammarCase: '1'
            },
            {
                gender: '1',
                grammarCase: '2'
            },
            {
                gender: '1',
                grammarCase: '3'
            },
            // Neutrum
            {
                gender: '2',
                grammarCase: '0'
            },
            {
                gender: '2',
                grammarCase: '1'
            },
            {
                gender: '2',
                grammarCase: '2'
            },
            {
                gender: '2',
                grammarCase: '3'
            },
            // Plural
            {
                gender: '3',
                grammarCase: '0'
            },
            {
                gender: '3',
                grammarCase: '1'
            },
            {
                gender: '3',
                grammarCase: '2'
            },
            {
                gender: '3',
                grammarCase: '3'
            }
        ];

        testCases.forEach(({
            gender, grammarCase,
            conjugation = ROOT,
            root = ROOT
        }) => {
            const props = { gender, root };
            const noun = new Noun(props);
            const actual = noun.conjugate(grammarCase);
            expect(actual).to.equal(conjugation, JSON.stringify(props));
        });
    });
})));