import { assert } from 'chai';
import sinon from 'sinon';
import Article from './Article';

const PROPS = {
    root: 'fakeRoot',
    type: 'fakeType'
};

const SUFFIX_TEXT = 'fakeSuffixText';

describe('Generator', () =>
describe('Article', () => {
    describe('#constructor', () => {
        it('declares `root` and `type` properties', () => {
            const article = new Article(PROPS);
            assert.equal(article.root, PROPS.root);
            assert.equal(article.type, PROPS.type);
        });
    });

    describe('#compose', () => {
        it('returns a `composition` object', () => {
            const article = new Article(PROPS);
            const getSuffixStub = sinon.stub(
                article,
                'getSuffix',
                () => ({ text: SUFFIX_TEXT })
            );

            assert.deepEqual(article.compose('fakeArg1', 'fakeArg2').chunks, [
                {
                    text: PROPS.root,
                    stub: PROPS.root.replace(/./gi, '_')
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
