import { assert } from 'chai';
import sinon from 'sinon';
import Adjective from './Adjective';

const ROOT = 'fakeRoot';
const SUFFIX_TEXT = 'fakeSuffixText';

describe.only('Generator', () => describe('Adjective', () => {
    describe('#constructor', () => {
        it('declares `root` property', () => {
            const article = new Adjective(ROOT);
            assert.deepEqual(article, { root: ROOT });
        });
    });

    describe('#compose', () => {
        it('returns a `composition` object', () => {
            const article = new Adjective(ROOT);
            const getSuffixStub = sinon.stub(article, 'getSuffix', () => ({
                text: SUFFIX_TEXT
            }));
            assert.deepEqual(article.compose('fakeArg1', 'fakeArg2'), {
                root: ROOT,
                suffix: SUFFIX_TEXT,
                fullText: ROOT + SUFFIX_TEXT
            });

            getSuffixStub.restore();
        });
    });
}));
