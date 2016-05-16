import { createAction, handleActions } from 'redux-actions';
import randomPhrase from './../../src/grammar/Phrase/randomPhrase.js';
import { range, random } from 'lodash';

export const TYPES = {
    CREATE : 'tracks:create'
};

// Actions
const create = createAction(TYPES.CREATE);
export { create };


// Reducer
const initialState = Object.assign({
    collection: [],
    kasus: null,
    kategorie: null
}, loadState());

const DIE_KASUS = [
    'nominative',
    'accusative'
];

const DIE_KATEGORIEN = [
    'menschen',
    'familie',
    'tiere'
];

function getRandomKasus () {
    const kasusIndex = random(0, DIE_KASUS.length - 1);
    const kasus = DIE_KASUS[kasusIndex];
    return kasus;
}

const LS_KEY = 'conjugate';

function storeState (state) {
    const { kasus, familie } = state;
    window.localStorage.setItem(
        LS_KEY,
        JSON.stringify({ kasus, familie })
    );
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

        const kasusIsValid = DIE_KASUS.includes(kasus);
        const kategorieIsValid = DIE_KATEGORIEN.includes(kategorie);

        const collection = range(amount)
            .map(() => {
                const methodName = kasusIsValid ? kasus : getRandomKasus();
                const phrase = randomPhrase[methodName](kategorie);
                return phrase;
            });

        const newState = extendState(state, {
            collection,
            kasus,
            kategorie
        });

        storeState(newState);

        return newState;
    }

}, initialState);

export default reducer;