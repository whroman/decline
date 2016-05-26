import { createAction, handleActions } from 'redux-actions';
import randomPhrase from 'sentenceGenerator/randomPhrase/randomPhrase';
import { range, random } from 'lodash';

import kasusArray from './../data/kasus';

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
    kategorie: null,
    gender: null
}, loadState());


function getRandomKasus () {
    const kasusIndex = random(0, kasusArray.length - 1);
    const kasus = kasusArray[kasusIndex];
    return kasus;
}

function storeState (state) {
    const { kasus, kategorie, gender } = state;
    const toStore = { kasus, kategorie, gender };
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
        const { amount, kasus, kategorie, gender } = action.payload;

        const newState = Object.assign({}, state);
        if (typeof kasus === 'string') newState.kasus = kasus;
        if (typeof kategorie === 'string') newState.kategorie = kategorie;
        if (typeof gender === 'string') newState.gender = gender;

        const getPhraseParams = Object.assign({ amount }, newState);
        const collection = getRandomPhrases(getPhraseParams);
        Object.assign(newState, { collection });
        storeState(newState);
        return newState;
    },

    [TYPES.REPLACE]: (state, action) => {
        const amount = action.payload;
        const { collection, kasus, kategorie, gender } = state;
        const replacementItems = getRandomPhrases({ amount, kasus, kategorie, gender });
        const newCollection = collection.slice(amount).concat(replacementItems);

        return extendState(state, { collection: newCollection });
    }

}, initialState);

function getRandomPhrases({ amount, kasus, kategorie, gender }) {
    const kasusIsValid = kasusArray.includes(kasus);

    const phrases = range(amount).map(() => {
        const methodName = kasusIsValid ? kasus : getRandomKasus();
        const phrase = randomPhrase[methodName]({ category: kategorie, gender });
        return phrase;
    });

    return phrases;
}

export default reducer;