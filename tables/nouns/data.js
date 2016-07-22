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
        '0', ['0']
    ],
    [
        'Frau', 'Frauen', ['woman'], ['women'],
        '1', ['0']
    ],
    [
        'Kind', 'Kinder', ['child'], ['children'],
        '2', ['0', '1']
    ],
    [
        'Tante', 'Tanten', ['aunt'], ['aunts'],
        '1', ['0', '1']
    ],
    [
        'Onkel', 'Onkels', ['uncle'], ['uncles'],
        '0', ['0', '1']
    ],
    [
        'Nichte', 'Nichten', ['niece'], ['nieces'],
        '1', ['0', '1']
    ],
    [
        'Neffe', 'Neffen', ['nephew'], ['nephews'],
        '0', ['0', '1']
    ],
    [
        'Schwager', 'Schwäger', ['brother-in-law'], ['brothers-in-law'],
        '0', ['0', '1']
    ],
    [
        'Schwägerin', 'Schwägerinnen', ['sister-in-law'], ['sisters-in-law'],
        '1', ['0', '1']
    ],
    [
        'Opa', 'Opas', ['grandpa'], ['grandpas'],
        '0', ['0', '1']
    ],
    [
        'Oma', 'Omas', ['grandma'], ['grandmas'],
        '1', ['0', '1']
    ],
    [
        'Vater', 'Väter', ['father'], ['fathers'],
        '0', ['0', '1']
    ],
    [
        'Mutter', 'Mütter', ['mother'], ['mothers'],
        '1', ['0', '1']
    ],

    // Animals
    [
        'Hund', 'Hunde', ['dog'], ['dogs'],
        '0', ['2']
    ],
    [
        'Hündin', 'Hunde', ['dog'], ['dogs'],
        '1', ['2']
    ],
    [
        'Kater', 'Katzen', ['cat'], ['cats'],
        '0', ['2']
    ],
    [
        'Katze', 'Katzen', ['cat'], ['cats'],
        '1', ['2']
    ],
    [
        'Maus', 'Mäuse', ['mouse'], ['mice'],
        '1', ['2']
    ],
    [
        'Vogel', 'Vögel', ['bird'], ['birds'],
        '0', ['2']
    ],
    [
        'Taube', 'Tauben', ['pigeon'], ['pigeons'],
        '1', ['2']
    ],
    [
        'Krähe', 'Krähen', ['crow'], ['crows'],
        '1', ['2']
    ],

    // Human Anatomy
    // Organs
    [
        'Lunge', 'Lungen', ['lung'], ['lungs'],
        '1', ['3']
    ],
    [
        'Haut', 'Häute', ['skin'], ['skins'],
        '1', ['3']
    ],

    // Core
    [
        'Bauch', 'Bäuche', ['stomach'], ['stomachs'],
        '0', ['3']
    ],
    [
        'Brust', 'Brüste', ['breast', 'chest'], ['breasts', 'chests'],
        '1', ['3']
    ],
    [
        'Brustwarze', 'Brustwarzen', ['nipple'], ['nipples'],
        '1', ['3']
    ],
    [
        'Nippel', 'Nippel', ['nipple'], ['nipples'],
        '0', ['3']
    ],

    // Legs
    [
        'Bein', 'Beine', ['leg'], ['legs'],
        '2', ['3']
    ],
    [
        'Fuß', 'Füße', ['foot'], ['feet'],
        '0', ['3']
    ],
    [
        'Knie', 'Knie', ['knee'], ['knees'],
        '2', ['3']
    ],

    // Arms
    [
        'Hand', 'Hände', ['hand'], ['hands'],
        '1', ['3']
    ],
    [
        'Finger', 'Finger', ['finger'], ['fingers'],
        '0', ['3']
    ],
    [
        'Arm', 'Arme', ['arm'], ['arms'],
        '0', ['3']
    ],
    [
        'Handgelenk', 'Handgelenke', ['wrist'], ['wrists'],
        '2', ['3']
    ],
    [
        'Unterarm', 'Unterarme', ['forearm'], ['forearms'],
        '0', ['3']
    ],
    [
        'Ellbogen', 'Ellbogen', ['elbow'], ['elbows'],
        '0', ['3']
    ],
    // Head
    [
        'Mund', 'Münder', ['mouth'], ['mouths'],
        '0', ['3']
    ],
    [
        'Auge', 'Augen', ['eye'], ['eyes'],
        '2', ['3']
    ],
    [
        'Gesicht', 'Gesichter', ['face'], ['faces'],
        '2', ['3']
    ],
    [
        'Hals', 'Hälse', ['throat', 'neck'], ['throats', 'necks'],
        '0', ['3']
    ],

    // 'Kinder aufziehen'
    [
        'Spielplatz', 'Spielplätze', ['playground'], ['playgrounds'],
        '0', ['4']
    ],
    [
        'Laufrad', 'Laufräder', ['training bike'], ['training bikes'],
        '2', ['4']
    ],
    [
        'Schaukel', 'Schaukeln', ['swingset'], ['swingsets'],
        '1', ['4']
    ],
    [
        'Zahnfee', 'Zahnfeen', ['toothfairy'], ['toothfairies'],
        '1', ['4']
    ],
    [
        'Buntstift', 'Buntstifte', ['crayon'], ['crayons'],
        '0', ['4']
    ],

    // Eating Out
    [
        'Speisekarte', 'Speisekarten', ['menu'], ['menus'],
        '1', ['5']
    ],
    [
        'Menü', 'Menüs', ['menu'], ['menus'],
        '2', ['5']
    ],
    [
        'Getränk', 'Getränke', ['beverage', 'drink'], ['beverages', 'drinks'],
        '2', ['5']
    ],

    // In der Küche
    [
        'Küche', 'Küchen', ['kitchen'], ['kitchens'],
        '1', ['6']
    ],
    [
        'Gabel', 'Gabeln', ['fork'], ['forks'],
        '1', ['5', '6']
    ],
    [
        'Löffel', 'Löffel', ['spoon'], ['spoons'],
        '0', ['5', '6']
    ],
    [
        'Teelöffel', 'Teelöffel', ['teaspoon'], ['teaspoons'],
        '0', ['5', '6']
    ],
    [
        'Esslöffel', 'Esslöffel', ['tablespoon'], ['tablespoons'],
        '0', ['5', '6']
    ],
    [
        'Messer', 'Messer', ['knife'], ['knives'],
        '2', ['5', '6']
    ],
    [
        'Teller', 'Teller', ['plate'], ['plates'],
        '0', ['5', '6']
    ],
    [
        'Serviette', 'Servietten', ['napkin'], ['napkins'],
        '1', ['5', '6']
    ],
    [
        'Pfanne', 'Pfannen', ['frying pan'], ['frying pans'],
        '1', ['6']
    ],
    [
        'Topf', 'Töpfe', ['saucepan'], ['saucepans'],
        '0', ['6']
    ],
    [
        'Schneidbrett', 'Schneidbretter', ['cutting board'], ['cutting boards'],
        '2', ['6']
    ],
    [
        'Backofen', 'Backöfen', ['baking oven'], ['baking oven'],
        '0', ['6']
    ],
    [
        'Mikrowelle', 'Mikrowellen', ['microwave'], ['microwaves'],
        '1', ['6']
    ],
    [
        'Kühlschrank', 'Kühlschränke', ['refrigerator'], ['refrigerators'],
        '2', ['6']
    ],
    [
        'Wasserkocher', 'Wasserkocher', ['electric kettle'], ['electric kettles'],
        '0', ['6']
    ],

    // Obst
    [
        'Kiwi', 'Kiwis', ['kiwi'], ['kiwis'],
        '1', ['7']
    ],
    [
        'Kirsche', 'Kirschen', ['cherry'], ['cherries'],
        '1', ['7']
    ],
    [
        'Aprikose', 'Aprikosen', ['apricot'], ['apricots'],
        '1', ['7']
    ],
    [
        'Persimone', 'Persimonen', ['persimmon'], ['persimmons'],
        '1', ['7']
    ],
    [
        'Melone', 'Melonen', ['melon'], ['melons'],
        '1', ['7']
    ],
    [
        'Wassermelone', 'Wassermelonen', ['watermelon'], ['watermelons'],
        '1', ['7']
    ],
    [
        'Nektarine', 'Nektarinen', ['nectarine'], ['nectarines'],
        '1', ['7']
    ],
    [
        'Erdbeere', 'Erdbeeren', ['strawberry'], ['strawberries'],
        '1', ['7']
    ],
    [
        'Blaubeere', 'Blaubeeren', ['blueberry'], ['blueberries'],
        '1', ['7']
    ],
    [
        'Brombeere', 'Brombeeren', ['blackberry'], ['blackberries'],
        '1', ['7']
    ],
    [
        'Himbeere', 'Himbeeren', ['raspberry'], ['raspberries'],
        '1', ['7']
    ],
    [
        'Persimone', 'Persimonen', ['persimmon'], ['persimmons'],
        '1', ['7']
    ],
    [
        'Zitron', 'Zitronen', ['lemon'], ['lemons'],
        '1', ['7']
    ],
    [
        'Limette', 'Limetten', ['lime'], ['limes'],
        '1', ['7']
    ],
    [
        'Pfirsich', 'Pfirsiche', ['peach'], ['peaches'],
        '0', ['7']
    ],
    [
        'Apfel', 'Äpfel', ['apple'], ['apples'],
        '0', ['7']
    ],

    // Riding a Bike
    [
        'Fahrrad', 'Fahrräder', ['bicycle'], ['bicycles'],
        '2', ['8']
    ],
    [
        'Schaltwerk', 'Schaltwerke', ['rear derailleur'], ['rear derailleurs'],
        '2', ['8']
    ],
    [
        'Pedal', 'Pedale', ['pedal'], ['pedals'],
        '2', ['8']
    ],
    [
        'Fahrradschloss', 'Fahrradschlösser', ['bike lock'], ['bike locks'],
        '2', ['8']
    ],
    [
        'Schloss', 'Schlösser', ['castle', 'palace', 'lock'], ['castles', 'palaces', 'locks'],
        '2', ['8']
    ],
    [
        'Ampel', 'Ampeln', ['traffic light'], ['traffic lights'],
        '1', ['8']
    ],
    [
        'Fahrradtasche', 'Fahrradtaschen', ['pannier'], ['panniers'],
        '1', ['8']
    ],
    [
        'Kette', 'Ketten', ['chain'], ['chains'],
        '1', ['8']
    ],
    [
        'Scheibe', 'Scheiben', ['disk', 'slice', 'pane'], ['disks', 'slices', 'panes'],
        '1', ['8']
    ],
    [
        'Bremse', 'Bremsen', ['brake'], ['brakes'],
        '1', ['8']
    ],
    [
        'Scheibenbremse', 'Scheibenbremsen', ['disk brake'], ['disk brakes'],
        '1', ['8']
    ],
    [
        'Helm', 'Helme', ['helmet'], ['helmets'],
        '0', ['8']
    ],
    [
        'Fahrradweg', 'Fahrradwege', ['bike path'], ['bike paths'],
        '0', ['8']
    ],
    [
        'Sattel', 'Sattele', ['saddle'], ['saddles'],
        '0', ['8']
    ],
    [
        'Rahmen', 'Rahmene', ['frame'], ['frames'],
        '0', ['8']
    ],
    [
        'Gepäckträger', 'Gepäckträger', ['bike rack'], ['bike racks'],
        '0', ['8']
    ],
    [
        'Lenker', 'Lenker', ['handlebar'], ['handlebars'],
        '0', ['8']
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
    instances.push(new Noun(dePlural, enPlural, '3', categories));
});

export default instances;