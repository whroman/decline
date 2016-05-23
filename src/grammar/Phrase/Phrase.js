class Phrase {

    constructor (nounInstance, adjInstance, articleInstance) {
        Object.assign(this, {
            noun: nounInstance
        });

        this.noun.setArticle(articleInstance)
        this.noun.setAdjective(adjInstance)
    }


    conjugate (grammarCase) {
        const statement = this.noun.conjugate(grammarCase);

        return Object.assign({}, this, { statement });
    }

}

module.exports = Phrase;