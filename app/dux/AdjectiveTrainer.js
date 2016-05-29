import { createAction, handleActions } from 'redux-actions';
import randomPhrase from 'sentenceGenerator/randomPhrase/randomPhrase';
import { range, random } from 'lodash';

import kasusArray from './../data/kasus';

// Action Types
export const TRACKS_CREATE = 'TRACKS_CREATE';
export const TRACKS_REPLACE = 'TRACKS_REPLACE';
export const TRACKS_LOAD = 'TRACKS_LOAD';


// Actions
export const create = createAction(TRACKS_CREATE);
export const replace = createAction(TRACKS_REPLACE);
export const load = createAction(TRACKS_LOAD);


// Reducer
const initialState = {
    collection: [],
    kasus: undefined,
    kategorie: undefined,
    gender: undefined
};


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

    [TRACKS_LOAD]: (state) => {
        return extendState(state, loadState());
    },


    [TRACKS_CREATE]: (state, action) => {
        const { amount, kasus, kategorie, gender } = action.payload;
        const newState = Object.assign({}, state);
        if (typeof kasus === 'string') newState.kasus = kasus;
        if (typeof kategorie === 'string') newState.kategorie = kategorie;
        if (typeof gender === 'string') newState.gender = gender;

        const randomPhraseParams = {
            amount,
            kasus: newState.kasus === initialState.kasus ? undefined : newState.kasus,
            kategorie: newState.kategorie === initialState.kategorie ? undefined : newState.kategorie,
            gender: newState.gender === initialState.gender ? undefined : newState.gender,
        };
        const collection = getRandomPhrases(randomPhraseParams);
        Object.assign(newState, { collection });
        storeState(newState);
        return newState;
    },

    [TRACKS_REPLACE]: (state, action) => {
        const amount = action.payload;
        const { collection, kasus, kategorie, gender } = state;
        const replacementItems = getRandomPhrases({ amount, kasus, kategorie, gender });
        const newState = extendState(state, {
            collection: collection.slice(amount).concat(replacementItems)
        });
        return newState;
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