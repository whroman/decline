import { assert } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
const Adjective = proxyquire('./Adjective', {
    './../WordChunk/WordChunk.js': () => 'fakeWordChunk'
}).default;

const ROOT = 'fakeRoot';
const SUFFIX_TEXT = 'fakeSuffixText';

describe.only('Generator', () => describe('Adjective', () => {
    describe('#constructor', () => {
        it('declares `root` property', () => {
            const adjective = new Adjective(ROOT);
            assert.deepEqual(adjective, { root: ROOT });
        });
    });

    describe('#compose', () => {
        it('returns a `composition` object', () => {
            const adjective = new Adjective(ROOT);
            const getSuffixStub = sinon.stub(adjective, 'getSuffix', () => ({
                text: SUFFIX_TEXT
            }));
            assert.deepEqual(adjective.compose('fakeArg1', 'fakeArg2'), [
                {
                    text: ROOT,
                    stub: ROOT.replace(/./gi, '_')
                },
                {
                    text: SUFFIX_TEXT,
                    stub: SUFFIX_TEXT.replace(/./gi, '_')
                }

            ]);

            getSuffixStub.restore();
        });
    });
}));
