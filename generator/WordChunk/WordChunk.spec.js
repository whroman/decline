import { assert } from 'chai';

import WordChunk from './WordChunk';

describe('Generator', () => describe('WordChunk', () => {
    describe('#constructor', () => {
        context('when `text` is a String', () => {
            const TEXT = 'fakeText';
            let wordChunk;

            before(() => {
                wordChunk = new WordChunk(TEXT);
            })

            it('binds `text', () => {
                assert.equal(wordChunk.text, TEXT);
            });


            it('binds `text', () => {
                const stubLength = wordChunk.stub
                    .split('')
                    .filter((letter) => letter === '_')
                    .length;

                assert.equal(stubLength, TEXT.length);
            });
        });

        context('when `text` is not a String', () => {
            it('throws an Error', () => {
                assert.throws(() => new WordChunk(null));
            });
        });
    });
}));
