import AdjectiveModel from './../AdjectiveModel.js';
import adjectives from './adjectives.js';
import bykiAdjectives from './bykiAdjectives.js';

const data = adjectives.concat(bykiAdjectives);
const instances = data.map((adj) => {
    return new AdjectiveModel(...adj);
});

export default instances;