import { createAction, handleActions } from 'redux-actions';
import randomPhrase from './../../src/grammar/Phrase/randomPhrase.js';
import _ from 'underscore';

export const TYPES = {
    CREATE : 'tracks:create'
};

// Actions
const create = createAction(TYPES.CREATE);
export { create };

// Reducer
const initialState = {
    collection: []
};

const DIE_KASUS = [
    'nominative',
    'accusative'
];

const KATEGORIEN = [
    'menschen',
    'familie',
    'tiere'
];

function getRandomCasus () {
    const kasusIndex = _.random(0, DIE_KASUS.length - 1);
    const kasus = DIE_KASUS[kasusIndex];
    return kasus;
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
        const kategorieIsValid = KATEGORIEN.includes(kategorie);

        const collection = _
            .range(amount)
            .map(() => {
                const methodName = kasusIsValid ? kasus : getRandomCasus();
                const phrase = randomPhrase[methodName](kategorie);
                return phrase;
            });

        return extendState(state, { collection });
    }

}, initialState);

export default reducer;