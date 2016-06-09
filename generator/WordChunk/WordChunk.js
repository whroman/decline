import assertStringsDefined from './../util/assertStringsDefined';

export default class WordChunk {

    constructor (text) {
        assertStringsDefined({ text });
        Object.assign(this, {
            text,
            stub: text.replace(/./gi, '_')
        });
    }
}