import { createAction, handleActions } from 'redux-actions';
import randomPhrase from './../../src/grammar/Phrase/randomPhrase.js';
import { range, random } from 'lodash';

import kasusArray from './../data/kasus';
import kategorieArray from './../data/kategorie';

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

        const kasusIsValid = kasusArray.includes(kasus);

        const collection = range(amount)
            .map(() => {
                const methodName = kasusIsValid ? kasus : getRandomKasus();
                const phrase = randomPhrase[methodName](kategorie);
                return phrase;
            });

        const newState = extendState(state, { collection });
        if (kasus !== undefined) newState.kasus = kasus;
        if (kategorie !== undefined) newState.kategorie = kategorie;

        storeState(newState);
        return newState;
    }

}, initialState);

export default reducer;