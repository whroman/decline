import { createAction, handleActions } from 'redux-actions';
import randomPhrase from './../../src/grammar/Phrase/randomPhrase.js';
import { range, random } from 'lodash';

import kasusArray from './../data/kasus';
import kategorieArray from './../data/kategorie';

export const TYPES = {
    CREATE : 'tracks:create',
    REPLACE : 'tracks:replace'
};

// Actions
const create = createAction(TYPES.CREATE);
const replace = createAction(TYPES.REPLACE);
export { create, replace };


// Reducer
const initialState = Object.assign({
    collection: [],
    kasus: null,
    kategorie: null
}, loadState());


function getRandomKasus () {
    const kasusIndex = random(0, kasusArray.length - 1);
    const kasus = kasusArray[kasusIndex];
    return kasus;
}

function storeState (state) {
    const { kasus, kategorie } = state;
    const toStore = { kasus, kategorie };
    const stringState = JSON.stringify(toStore);
    window.localStorage.setItem('conjugate', stringState);
}

function loadState () {
    const state = window.localStorage.getItem('conjugate');
    return state ? JSON.parse(state) : {};
}

const extendState = (state, obj) => Object.assign({}, state, obj);

const reducer = handleActions({

    [TYPES.CREATE]: (state, action) => {
        const {
            amount,
            kasus,
            kategorie
        } = action.payload;

        const collection = getRandomPhrases(amount, kasus, kategorie);
        const newState = extendState(state, { collection });

        if (kasus !== undefined) newState.kasus = kasus;
        if (kategorie !== undefined) newState.kategorie = kategorie;

        storeState(newState);
        return newState;
    },

    [TYPES.REPLACE]: (state, action) => {
        const amount = action.payload
        const { collection, kasus, kategorie } = state;
        const replacementItems = getRandomPhrases(amount, kasus, kategorie);
        const newCollection = collection.slice(amount).concat(replacementItems);

        return extendState(state, { collection: newCollection });
    }

}, initialState);

function getRandomPhrases (amount, kasus, kategorie) {
    const kasusIsValid = kasusArray.includes(kasus);

    const phrases = range(amount).map(() => {
        const methodName = kasusIsValid ? kasus : getRandomKasus();
        const phrase = randomPhrase[methodName](kategorie);
        return phrase;
    });

    return phrases;
}

export default reducer;