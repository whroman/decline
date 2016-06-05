import { assert } from 'chai';

import ObjectGroup from './ObjectGroup';

describe('Generator', () => describe('ObjectGroup', () => {
    describe('#constructor', () => {
        it('binds given properties to `this`', () => {
            const props = {
                article: 0,
                adjective: 1,
                directObject: 2
            };
            assert.deepEqual(new ObjectGroup(props), props)
        })
    });

    describe('#compose', () => {
        it('returns an Array of `composition` objects', () => {
            const adjective = { compose: () => 'composedAdjective' };

            const article = {
                compose: () => 'composedArticle',
                type: 'fakeArticleType'
            };
            const directObject = {
                compose: () => 'composedDO',
                gender: 'fakeGender'
            };

            const oGroup = new ObjectGroup({
                adjective,
                article,
                directObject
            });

            assert.deepEqual(oGroup.compose(), [
                'composedArticle',
                'composedAdjective',
                'composedDO'
            ]);
        })
    });
}));
