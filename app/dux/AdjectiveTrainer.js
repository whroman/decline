import { createAction, handleActions } from 'redux-actions';
import randomPhrase from 'generator/randomPhrase/randomPhrase';
import { find, range, random } from 'lodash';
import kasusData from './../data/kasus';

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
    nounKategorie: null,
    adjectiveKategorie: null,
    gender: null
};

export function localStorageExists () {
    return (window && window.localStorage);
}

export function getRandomKasusName () {
    const kasusIndex = random(0, kasusData.length - 1);
    const kasus = kasusData[kasusIndex].name;
    return kasus;
}

export function getRandomPhrases({ amount, kasus, nounKategorie, adjectiveKategorie, gender }) {
    const kasusIsValid = find(kasusData, { name: kasus });
    const phrases = range(amount).map(() => {
        const methodName = kasusIsValid ? kasus : getRandomKasusName();
        const phrase = randomPhrase[methodName]({
            gender,
            adjectiveCategory: adjectiveKategorie,
            nounCategory: nounKategorie
        });
        return phrase;
    });

    return phrases;
}

export function saveState (state) {
    const { kasus, nounKategorie, adjectiveKategorie, gender } = state;
    const stateToSave = { kasus, nounKategorie, adjectiveKategorie, gender };
    const stringState = JSON.stringify(stateToSave);
    if (localStorageExists()) window.localStorage.setItem('conjugate', stringState);
    return stateToSave;
}

export function loadState () {
    if (!localStorageExists()) return {};
    return JSON.parse(window.localStorage.getItem('conjugate'));
}

export function mergeCreationParams (state, payload) {
    const { amount, kasus, nounKategorie, adjectiveKategorie, gender } = payload;
    // Undefined payload values should be overwritten by default values. A payload value for "no filter" is `null`.
    return {
        amount,
        kasus: kasus === undefined ? state.kasus : kasus,
        nounKategorie: nounKategorie === undefined ? state.nounKategorie : nounKategorie,
        adjectiveKategorie: adjectiveKategorie === undefined ? state.adjectiveKategorie : adjectiveKategorie,
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
        const { collection, kasus, nounKategorie, adjectiveKategorie, gender } = state;
        const replacementItems = getRandomPhrases({ amount, kasus, nounKategorie, adjectiveKategorie, gender });
        const newState = Object.assign({}, state, {
            collection: collection
                .slice(amount)
                .concat(replacementItems)
        });
        return newState;
    }

}, initialState);

export default reducer;