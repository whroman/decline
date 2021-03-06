import { assert } from 'chai';
import Noun from './Noun';

describe('Generator', () =>
describe('Noun', () =>
describe('#constructor', () => {
    it('returns default values when none are passed', () => {
        assert.deepEqual(new Noun({}), {
            root: undefined,
            gender: undefined,
            translations: {},
            categories: []
        });
    });
})));