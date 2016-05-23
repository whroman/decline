function compose (adj, noun) {
    const sentence = [ adj, noun]
        .filter((item) => item)
        .join(" ");

    return sentence;
}

class Phrase {

    constructor (nounInstance, adjInstance, articleInstance) {
        Object.assign(this, {
            noun: nounInstance
        });

        this.noun.setArticle(articleInstance)
        this.noun.setAdjective(adjInstance)
    }

    getAdjective (grammarCase, articleType) {
        const adj = this.adjective.conjugate(
            this.noun.gender,
            articleType,
            grammarCase
        );

        return adj;
    }

    conjugate (grammarCase) {
        const statement = this.noun.conjugate(grammarCase);

        return Object.assign({}, this, { statement });
    }

}

module.exports = Phrase;