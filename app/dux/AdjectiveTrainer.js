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

const CASES = [
    'nominative',
    'accusative'
];

function getRandomCasus () {
    const casusIndex = _.random(0, CASES.length - 1);
    const casus = CASES[casusIndex];
    return casus;
}

const extendState = (state, obj) => Object.assign({}, state, obj);

const reducer = handleActions({

    [TYPES.CREATE]: (state, action) => {
        const { amount, casus } = action.payload;
        const casusIsValid = CASES.includes(casus);

        const collection = _
            .range(amount)
            .map(() => {
                const methodName = casusIsValid ? casus : getRandomCasus();
                const phrase = randomPhrase[methodName]();
                return phrase;
            });

        return extendState(state, { collection });
    }

}, initialState);

export default reducer;