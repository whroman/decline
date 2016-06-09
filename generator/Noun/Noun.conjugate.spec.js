import { expect } from 'chai';
import sinon from 'sinon';
import Noun from './Noun';

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
        grammarCase: '3',
        conjugation: 'Fooes'
    },
// Maskulin with `e` ending
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
        grammarCase: '3',
        conjugation: 'Fooes'
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
    // Dative
    {
        gender: '3',
        grammarCase: '2',
        conjugation: 'Foon'
    },
    {
        gender: '3',
        grammarCase: '2',
        root: 'Foos',
        conjugation: 'Foos'
    },
    {
        gender: '3',
        grammarCase: '2',
        root: 'Foon',
        conjugation: 'Foon'
    },
    {
        gender: '3',
        grammarCase: '3'
    }
];

describe('Generator', () =>
describe('Noun', () =>
describe.only('#conjugate', () => {
    testCases.forEach(({
        gender, grammarCase,
        conjugation = ROOT,
        root = ROOT
    }) => {
        const props = { gender, grammarCase, root };
        const noun = new Noun(props);
        const actual = noun.conjugate(grammarCase);
        it('returns conjugated text', () => {
            expect(actual).to.equal(conjugation, JSON.stringify(props));
        });
    });
})));