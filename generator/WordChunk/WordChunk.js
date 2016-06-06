export default class WordChunk {

    constructor (text) {
        Object.assign(this, {
            text,
            stub: text.replace(/./gi, '_')
        });
    }
}