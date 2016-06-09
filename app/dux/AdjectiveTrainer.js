import { createAction, handleActions } from 'redux-actions';
import randomPhrase from 'generator/randomPhrase/randomPhrase';
import { range, random } from 'lodash';
import kasusArray from './../data/kasus';

// window is declared here for testing purposes.
const window = global.window;


// Action Types
export const TRACKS_CREATE = 'TRACKS_CREATE';
export const TRACKS_REPLACE = 'TRACKS_REPLACE';
export const TRACKS_LOAD = 'TRACKS_LOAD';


// Actions
export const create = createAction(TRACKS_CREATE);
export const replace = createAction(TRACKS_REPLACE);
export const load = createAction(TRACKS_LOAD);


// Reducer
export const initialState = {
    collection: [],
    kasus: null,
    kategorie: null,
    gender: null
};

export function localStorageExists () {
    return (window && window.localStorage);
}

export function getRandomKasus () {
    const kasusIndex = random(0, kasusArray.length - 1);
    const kasus = kasusArray[kasusIndex];
    return kasus;
}

export function getRandomPhrases({ amount, kasus, kategorie, gender }) {
    const kasusIsValid = kasusArray.includes(kasus);

    const phrases = range(amount).map(() => {
        const methodName = kasusIsValid ? kasus : getRandomKasus();
        const phrase = randomPhrase[methodName]({ category: kategorie, gender });
        return phrase;
    });

    return phrases;
}

export function saveState (state) {
    const { kasus, kategorie, gender } = state;
    const stateToSave = { kasus, kategorie, gender };
    const stringState = JSON.stringify(stateToSave);
    if (localStorageExists()) window.localStorage.setItem('conjugate', stringState);
    return stateToSave;
}

export function loadState () {
    if (!localStorageExists()) return {};
    return JSON.parse(window.localStorage.getItem('conjugate'));
}

export function mergeCreationParams (state, payload) {
    const { amount, kasus, kategorie, gender } = payload;
    // Undefined payload values should be overwritten by default values. A payload value for "no filter" is `null`.
    return {
        amount,
        kasus: kasus === undefined ? state.kasus : kasus,
        kategorie: kategorie === undefined ? state.kategorie : kategorie,
        gender: gender === undefined ? state.gender : gender
    };
}

const reducer = handleActions({

    [TRACKS_LOAD]: (state) => {
        return Object.assign({}, state, loadState());
    },

    [TRACKS_CREATE]: (state, action) => {
        const randomPhraseParams = mergeCreationParams(state, action.payload);
        const newState = Object.assign({}, randomPhraseParams, {
            collection: getRandomPhrases(randomPhraseParams)
        });

        saveState(newState);
        return newState;
    },

    [TRACKS_REPLACE]: (state, action) => {
        const amount = action.payload;
        const { collection, kasus, kategorie, gender } = state;
        const replacementItems = getRandomPhrases({ amount, kasus, kategorie, gender });
        const newState = Object.assign({}, state, {
            collection: collection.slice(amount).concat(replacementItems)
        });
        return newState;
    }

}, initialState);

export default reducer;