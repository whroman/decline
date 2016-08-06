import { shuffle } from 'lodash';

const presentWord = (text) => ({
    text, answer: text,
});

export default function (verbExercises) {
    const presentedVerbs = verbExercises.map((sentence) => {
        const { text, stubs } = sentence;
        const finalCharacterIndex = text.length - 1;
        const punctuation = text[finalCharacterIndex];
        const wordList = text
            .slice(0, finalCharacterIndex)
            .split(' ')
            .reduce((memo, word, index) => {
                const toPush = [];
                const lastCharacter = word[word.length - 1];

                if (lastCharacter === ',') {
                    word = word.slice(0, word.length - 1);
                    toPush.push(presentWord(lastCharacter));
                }

                const wordConstruct = presentWord(word);

                if (stubs.includes(index)) {
                    wordConstruct.text = word.replace(/./gi, '_')
                }

                toPush.unshift(wordConstruct);
                if (index > 0) toPush.unshift(presentWord(' '));

                return memo.concat(toPush);
            }, [])
            .concat([presentWord(punctuation)])


        return Object.assign(sentence, { wordList });
    });
    return shuffle(presentedVerbs);
}