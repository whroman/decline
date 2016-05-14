import { createAction, handleActions } from 'redux-actions';
import randomPhrase from './../../src/grammar/Phrase/randomPhrase.js';

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

const extendState = (state, obj) => Object.assign({}, state, obj);

const reducer = handleActions({

    [TYPES.CREATE]: (state, action) => {
        const collection = [];
        while (action.payload--) {
            collection.push(randomPhrase.nominative());
        }

        return extendState(state, { collection });
    }

}, initialState);

export default reducer;