import Adjective from './Adjective.js';
import adjectives from './adjectives.js';
import bykiAdjectives from './bykiAdjectives.js';

const data = adjectives.concat(bykiAdjectives);
const instances = data.map((adj) => {
    return new Adjective(...adj);
});

export default instances;