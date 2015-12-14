"use strict";

const Adjective = require("./../Classes/Models/Adjective.js");

const adjectives = [
    "schlimm",
    "schmutzig",
    "kurz",
    "schwach",
    "schnell",
    "gut",
    "niedrig",
    "sicher",
    "gern",
    "eng",
    "dick",
    "warm",
    "wenig",
    "sparsam",
    "modisch",
    "langsam",
    "blass",
    "beliebt",
    "kühl",
    "groß",
    "kalt",
    "viel",
    "weit",
    "dumm",
    "lang",
    "klug",
    "ungedulgig",
    "klein",
    "arm",
    "unabhängig",
    "teuer",
    "wütend",
    "dunkel",
    "interessant",
    "hart",
    "hoch",
    "intelligent",
    "billig",
    "gesund",
    "stark",
    "jung",
    "ordentlich",
    "alt",
    "verliebt",
    "schlank",
    "komisch",
    "sympathisch",
    "hell",
    "männlichen"
];

const instances = adjectives.map((adj) => {
    return new Adjective(adj);
});

module.exports = instances;