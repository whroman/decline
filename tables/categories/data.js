let uid = 0;

const categories = [
    ['Menschen'],
    ['Familie'],
    ['Tiere'],
    ['Körper'],
    ['Kinder aufziehen'],
    ['Essen ausgehen'],
    ['In der Küche'],
].map((translationsList) => {
    const translations = {
        deu: translationsList[0]
    };
    const category = { translations, uid: String(uid) };
    uid++;
    return category;
});

export default categories;