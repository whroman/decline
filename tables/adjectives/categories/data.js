let uid = 0;

const categories = [
    ['99 Most Common'],     // 0
].map((translationsList) => {
    const translations = {
        eng: translationsList[0]
    };
    const category = { translations, uid: String(uid) };
    uid++;
    return category;
});

export default categories;