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
                const wordConstruct = presentWord(word);

                if (stubs.includes(index)) {
                    wordConstruct.text = word.replace(/./gi, '_')
                }

                if (index > 0) memo.push(presentWord(' '));
                memo.push(wordConstruct);

                return memo;
            }, [])
            .concat([presentWord(punctuation)])


        return Object.assign(sentence, { wordList });
    });
    return shuffle(presentedVerbs);
}