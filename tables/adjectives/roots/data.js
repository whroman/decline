import AdjectiveModel from './../AdjectiveModel.js';
import adjectives from './adjectives.js';
import bykiAdjectives from './bykiAdjectives.js';
import quizletAdjectives from './quizletAdjectives.js';

const data = adjectives
    .concat(bykiAdjectives)
    .concat(quizletAdjectives);
const instances = data.map((adj) => {
    return new AdjectiveModel(...adj);
});

export default instances;