/*
    Scraped from:
        https://quizlet.com/4776451/100-most-frequent-german-adjectives-flash-cards/

    Manual cleansing is visible by commented-out code
*/

/*
    Manual scraping code (enter in the browser console)
    ====================

    NodeList.prototype.map = Array.prototype.map;

    JSON.stringify(document.querySelectorAll('.term').map((node) => {
      const adj = node.querySelector('.word').innerText;
      const def = node.querySelector('.definition').innerText;
      return [adj, def.split(', ')]
    }))
*/


export default [
    ["ganz", [
        "whole",
        // "all the"
    ]],
    ["groß", ["big", "large", "great"]],
    ["gut", ["good"]],
    ["neu", ["new"]],
    ["erste", ["first"]],
    ["lang", ["long"]],
    ["deutsch", ["German"]],
    ["klein", ["small", "little"]],
    ["alt", ["old"]],
    ["hoch", ["high", "tall"]],
    ["einfach", ["simple", "easy"]],
    ["letzte", ["last"]],
    ["gleich", ["same", "right away", "just"]],
    ["möglich", ["possible"]],
    ["eigen", ["own"]],
    ["schön", ["beautiful", "good", "pleasant"]],
    ["spät", ["late"]],
    ["wichtig", ["important"]],
    ["weitere", ["additional"]],
    ["genau", ["exactly"]],
    ["jung", ["young"]],
    ["kurz", ["short"]],
    ["stark", ["strong"]],
    ["richtig", ["correct"]],
    ["verschieden", ["different", "diverse"]],
    ["bestimmt", ["special", "certain"]],
    ["besser", ["better"]],
    ["schnell", ["fast"]],
    ["sicher", ["safe", "secure", "certain"]],
    ["nächste", ["next"]],
    ["politisch", ["political"]],
    ["klar", ["clear"]],
    ["schwer", ["difficult", "heavy"]],
    ["einzeln", ["individual"]],
    ["bekannt", ["well-known"]],
    ["leicht", ["light", "easy"]],
    ["rund", ["round"]],
    ["frei", ["free"]],
    ["früh", ["early"]],
    ["unterschiedlich", ["different", "variable"]],
    ["schlecht", ["bad"]],
    ["deutlich", ["clear"]],
    ["allgemein", ["general"]],
    ["einzig", ["only", "single"]],
    ["gemeinsam", ["common", "mutal"]],
    ["nahe, nah", ["near", "close"]],
    ["voll", ["full"]],
    ["direkt", ["direct", "straight"]],
    ["international", ["international"]],
    ["sozial", ["social"]],
    ["beste", ["best"]],
    ["rot", ["red"]],
    ["offen", ["open"]],
    ["meiste", ["most"]],
    ["besondere", ["special"]],
    ["gewiss", ["certain"]],
    ["öffentlich", ["public"]],
    ["wahrscheinlich", ["probably"]],
    ["europäisch", ["European"]],
    ["wesentlich", ["essential", "fundamental"]],
    ["ähnlich", ["similar"]],
    ["häufig", ["frequent"]],
    ["schwarz", ["black"]],
    ["völlig", ["complete"]],
    ["gering", ["small", "low"]],
    ["schwierig", ["difficult"]],
    ["praktisch", ["practical"]],
    ["persönlich", ["personal"]],
    // ["-jährig", ["years (old)"]],
    ["modern", ["modern"]],
    ["tief", ["deep"]],
    ["tatsächlich", ["real", "actual"]],
    ["zusätzlich", ["additional"]],
    ["amerikanisch", ["American"]],
    ["wirtschaftlich", ["economic", "financial"]],
    ["interessant", ["interesting"]],
    ["relativ", ["relative"]],
    ["gleichzeitig", ["simultaneous"]],
    ["grün", ["green"]],
    ["weiß", ["white"]],
    ["gesamt", ["whole", "entire"]],
    ["speziell", ["special", "specific"]],
    ["entscheidend", ["decisive"]],
    ["eng", ["narrow", "close"]],
    ["technisch", ["technical"]],
    ["langsam", ["slow"]],
    ["ständig", ["constant"]],
    ["notwendig", ["necessary"]],
    ["rein", ["pure", "clean", "clear"]],
    ["englisch", ["English"]],
    ["wissenschaftlich", ["scientific", "scholarly"]],
    ["falsch", ["false", "wrong"]],
    ["fremd", ["foreign", "strange"]],
    ["französisch", ["French"]],
    ["selten", ["rare"]],
    ["normal", ["normal"]],
    ["wahr", ["true"]],
    ["privat", ["private"]],
    ["tot", ["dead"]],
    ["halb", ["half"]]
];