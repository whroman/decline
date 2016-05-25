class Gender {
    uid : Integer
    text : String
    translations: {
        language: [ String ]
    }
}

class Noun {
    text : String
    translations : {
        language : [ String ]
    }
    gender : Integer
    categories : [ Integer ]

    article: Article
    attributiveAdjectives : [ AttributiveAdjetive ]
}

class Adjective {
    text : String
    translations: {
        language : [ String ]
    }

    conjugateAsAttribute : function ({
        grammarCase : Integer
        nounGender  : Integer
        articleType : Integer
    }) {

    }
}

class Article {
    text : String
    translations: {
        language : [ String ]
    }
}

class ConjugatedVerb {
    text: String,
    translations: {
        language: [ String ]
    }
}

class Verb {
    conjugations : [
        ich : ConjugatedVerb,
        du : ConjugatedVerb,
        er_sie_es : ConjugatedVerb,
        sie : ConjugatedVerb,
        ihr : ConjugatedVerb
    ]
}

class Statement {
    order: [
        'subject',
        'verb',
        'object'
    ]

    subject: Noun
    verb: Verb
    object: Noun

}