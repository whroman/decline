const nouns = [
    /* Format

        DE singular
                DE plural
                        EN singular
                                    EN plural
        singular Gender
            Categories
    */
    // People
    [
        'Mann', 'Männer', ['man'], ['men'],
        0, [0]
    ],
    [
        'Frau', 'Frauen', ['woman'], ['women'],
        1, [0]
    ],
    [
        'Kind', 'Kinder', ['child'], ['children'],
        2, [0, 1]
    ],
    [
        'Tante', 'Tanten', ['aunt'], ['aunts'],
        1, [0, 1]
    ],
    [
        'Onkel', 'Onkels', ['uncle'], ['uncles'],
        0, [0, 1]
    ],
    [
        'Nichte', 'Nichten', ['niece'], ['nieces'],
        1, [0, 1]
    ],
    [
        'Neffe', 'Neffen', ['nephew'], ['nephews'],
        0, [0, 1]
    ],
    [
        'Schwager', 'Schwäger', ['brother-in-law'], ['brothers-in-law'],
        0, [0, 1]
    ],
    [
        'Schwägerin', 'Schwägerinnen', ['sister-in-law'], ['sisters-in-law'],
        1, [0, 1]
    ],
    [
        'Opa', 'Opas', ['grandpa'], ['grandpas'],
        0, [0, 1]
    ],
    [
        'Oma', 'Omas', ['grandma'], ['grandmas'],
        1, [0, 1]
    ],
    [
        'Vater', 'Väter', ['father'], ['fathers'],
        0, [0, 1]
    ],
    [
        'Mutter', 'Mütter', ['mother'], ['mothers'],
        1, [0, 1]
    ],

    // Animals
    [
        'Hund', 'Hunde', ['dog'], ['dogs'],
        0, [2]
    ],
    [
        'Hündin', 'Hunde', ['dog'], ['dogs'],
        1, [2]
    ],
    [
        'Kater', 'Katzen', ['cat'], ['cats'],
        0, [2]
    ],
    [
        'Katze', 'Katzen', ['cat'], ['cats'],
        1, [2]
    ],
    [
        'Maus', 'Mäuse', ['mouse'], ['mice'],
        1, [2]
    ],
    [
        'Vogel', 'Vögel', ['bird'], ['birds'],
        0, [2]
    ],
    [
        'Taube', 'Tauben', ['pigeon'], ['pigeons'],
        1, [2]
    ],
    [
        'Krähe', 'Krähen', ['crow'], ['crows'],
        1, [2]
    ],

    // Body Parts
    [
        'Arm', 'Arme', ['arm'], ['arms'],
        0, [3]
    ],
    [
        'Bein', 'Beine', ['leg'], ['legs'],
        2, [3]
    ],
    [
        'Fuß', 'Füße', ['foot'], ['feet'],
        0, [3]
    ],
    [
        'Hand', 'Hände', ['hand'], ['hands'],
        1, [3]
    ],
    [
        'Mund', 'Münder', ['mouth'], ['mouths'],
        0, [3]
    ],
    [
        'Auge', 'Augen', ['eye'], ['eyes'],
        2, [3]
    ],
    [
        'Finger', 'Finger', ['finger'], ['fingers'],
        0, [3]
    ],
    [
        'Knie', 'Knie', ['knee'], ['knees'],
        2, [3]
    ],

    // 'Kinder aufziehen'
    [
        'Spielplatz', 'Spielplätze', ['playground'], ['playgrounds'],
        0, [4]
    ],
    [
        'Laufrad', 'Laufräder', ['training bike'], ['training bikes'],
        2, [4]
    ],
    [
        'Schaukel', 'Schaukeln', ['swingset'], ['swingsets'],
        1, [4]
    ],
    [
        'Zahnfee', 'Zahnfeen', ['toothfairy'], ['toothfairies'],
        1, [4]
    ],
    [
        'Buntstift', 'Buntstifte', ['crayon'], ['crayons'],
        0, [4]
    ],

    // Eating Out
    [
        'Speisekarte', 'Speisekarten', ['menu'], ['menus'],
        1, [5]
    ],
    [
        'Menü', 'Menüs', ['menu'], ['menus'],
        2, [5]
    ],
    [
        'Getränk', 'Getränke', ['beverage', 'drink'], ['beverages', 'drinks'],
        2, [5]
    ],

    // In der Küche
    [
        'Küche', 'Küchen', ['kitchen'], ['kitchens'],
        1, [6]
    ],
    [
        'Gabel', 'Gabeln', ['fork'], ['forks'],
        1, [5, 6]
    ],
    [
        'Löffel', 'Löffel', ['spoon'], ['spoons'],
        0, [5, 6]
    ],
    [
        'Teelöffel', 'Teelöffel', ['teaspoon'], ['teaspoons'],
        0, [5, 6]
    ],
    [
        'Esslöffel', 'Esslöffel', ['tablespoon'], ['tablespoons'],
        0, [5, 6]
    ],
    [
        'Messer', 'Messer', ['knife'], ['knives'],
        2, [5, 6]
    ],
    [
        'Teller', 'Teller', ['plate'], ['plates'],
        0, [5, 6]
    ],
    [
        'Serviette', 'Servietten', ['napkin'], ['napkins'],
        1, [5, 6]
    ]

];

class Noun {
    constructor (text, eng, gender, categories) {
        Object.assign(this, {
            text, gender, categories,
            translations: { eng }
        });
    }
}

const instances = [];
nouns.forEach(([
    deSingular, dePlural, enSingular, enPlural, gender, categories
]) => {
    instances.push(new Noun(deSingular, enSingular, gender, categories));
    instances.push(new Noun(dePlural, enPlural, 3, categories));
});

export default instances;