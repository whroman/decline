let uid = 0;

const categories = [
    ['Menschen'],         // 0
    ['Familie'],          // 1
    ['Tiere'],            // 2
    ['Körper'],           // 3
    ['Kinder aufziehen'], // 4
    ['Essen ausgehen'],   // 5
    ['In der Küche'],     // 6
    ['Obst'],             // 7
    ['Fahrrad fahren']    // 8
].map((translationsList) => {
    const translations = {
        deu: translationsList[0]
    };
    const category = { translations, uid: String(uid) };
    uid++;
    return category;
});

export default categories;