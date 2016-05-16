import Adjective from "./../../src/grammar/Adjective/Adjective.js";

const adjectives = [
    "kurz",
    "lang",
    "hoch",

    "groß",
    "klein",

    "dunkel",
    "hell",

    "langsam",
    "schnell",

    "gut",
    "schlimm",

    "stark",
    "schwach",

    "kühl",
    "warm",
    "kalt",

    "teuer",
    "billig",

    "jung",
    "alt",

    "intelligent",
    "dumm",
    "klug",

    "dick",
    "schlank",

    "wenig",
    "viel",

    "männlichen",
    "feminin",

    "schmutzig",
    "niedrig",
    "sicher",
    "eng",
    "sparsam",
    "modisch",
    "blass",
    "beliebt",
    "weit",
    "ungedulgig",
    "arm",
    "unabhängig",
    "wütend",
    "interessant",
    "hart",
    "gesund",
    "ordentlich",
    "verliebt",
    "komisch",
    "sympathisch"
];

const instances = adjectives.map((adj) => {
    return new Adjective(adj);
});

export default instances;