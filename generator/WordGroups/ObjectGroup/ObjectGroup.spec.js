import { assert } from 'chai';

import ObjectGroup from './ObjectGroup';

describe('Generator', () =>
describe('ObjectGroup', () => {
    describe('#constructor', () => {
        it('binds given properties to `this`', () => {
            const props = {
                article: 0,
                adjective: 1,
                noun: 2
            };
            assert.deepEqual(new ObjectGroup(props), props);
        });
    });

    describe('#compose', () => {
        it('returns an Array of `composition` objects', () => {
            const adjective = {
                compose: () => 'composedAdjective'
            };

            const article = {
                compose: () => 'composedArticle',
                type: 'fakeArticleType'
            };
            const noun = {
                compose: () => 'composedDO',
                gender: 'fakeGender'
            };

            const oGroup = new ObjectGroup({
                adjective,
                article,
                noun
            });

            assert.deepEqual(oGroup.compose(), {
                article: 'composedArticle',
                adjective: 'composedAdjective',
                noun: 'composedDO'
            });
        });
    });
}));
