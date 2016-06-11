import getRandomItem from './../util/getRandomItem';

// Tables
import articleRoots from 'tables/articles/data.js';
import articleTypes from 'tables/articleTypes/data.js';

// Models
import Article from './../Words/Article/Article';

function byType (type) {
    const root = getRandomItem(articleRoots[type]);
    return new Article({ root, type });
}

export default function byGender (genderUID) {
    let articleTypeUID;
    let isInvalid = true;
    const nounIsPlural = genderUID === '3';

    do {
        articleTypeUID = getRandomItem(articleTypes).uid;
        const articleIsIndef = articleTypeUID === '1';
        const articleIsOhne = articleTypeUID === '2';
        isInvalid = (
            (nounIsPlural && articleIsIndef) ||
            (!nounIsPlural && articleIsOhne)
        );
    } while (isInvalid);

    const article = byType(articleTypeUID);
    return article;
}
