import AdjectivesTrainerPage from './components/pages/exercisePages/AdjectiveDeclension/AdjectivesTrainer/AdjectivesTrainerPage';

import VerbsWithPrepositionsPage from './components/pages/exercisePages/Verbs/VerbsWithPrepositionsPage';
import TwoWayPrepositionsPage   from './components/pages/exercisePages/Verbs/TwoWayPrepositionsPage';
import DativePrepositionsPage   from './components/pages/exercisePages/Verbs/DativePrepositionsPage';
import ReflexiveVerbsPage       from './components/pages/exercisePages/Verbs/ReflexiveVerbsPage';
import WerdenPage               from './components/pages/exercisePages/Verbs/WerdenPage';
import SeinHabenVerbsPage       from './components/pages/exercisePages/Verbs/SeinHabenVerbsPage';

import DaAdverbsPage    from './components/pages/exercisePages/Adverbs/DaAdverbsPage';
import WieAlsPage       from './components/pages/exercisePages/Adverbs/WieAlsPage';

import LassenPage       from './components/pages/exercisePages/Verbs/LassenPage';
import SpeechPage       from './components/pages/exercisePages/Verbs/SpeechPage';
import KnowledgePage    from './components/pages/exercisePages/Verbs/KnowledgePage';
import StellenPage      from './components/pages/exercisePages/Verbs/StellenPage';

import ErVerVorPage     from './components/pages/exercisePages/Prefixes/ErVerVorPage';
import AufAusHerausPage from './components/pages/exercisePages/Prefixes/AufAusHerausPage';
import BeEinErPage      from './components/pages/exercisePages/Prefixes/BeEinErPage';

import CristinaVocabPage from './components/pages/exercisePages/Vocab/CristinaVocabPage';

import AkkDatPage               from './components/pages/exercisePages/Pronouns/AkkDatPage';
import AdjectivalPronounsPage   from './components/pages/exercisePages/Pronouns/AdjectivalPronounsPage';

import SubordinatingPage            from './components/pages/exercisePages/Composition/SubordinatingPage';
import ArticleClausesPage           from './components/pages/exercisePages/Composition/ArticleClausesPage';
import RelativePronounClausesPage   from './components/pages/exercisePages/Composition/RelativePronounClausesPage';

import FuturePerfectPage    from './components/pages/exercisePages/Tenses/FuturePerfectPage';
import FutureSimplePage     from './components/pages/exercisePages/Tenses/FutureSimplePage';
import PastSimplePage       from './components/pages/exercisePages/Tenses/PastSimplePage';
import PastPerfectPage      from './components/pages/exercisePages/Tenses/PastPerfectPage';
import PresentSimplePage    from './components/pages/exercisePages/Tenses/PresentSimplePage';
import PresentPerfectPage   from './components/pages/exercisePages/Tenses/PresentPerfectPage';

export default [
    {
        name: 'Adjective Declension',
        path: '/practice/adjective-declension',
        component: AdjectivesTrainerPage,
        tags: ['adjective']
    },
    {
        name: 'Verbs & Prepositions',
        path: '/practice/verbs/prepositions',
        component: VerbsWithPrepositionsPage,
        tags: ['preposition']
    },
    {
        name: 'Two-Way Prepositions',
        path: '/practice/verbs/two-way-prepositions',
        component: TwoWayPrepositionsPage,
        tags: ['preposition']
    },
    {
        name: 'Dative Prepositions',
        path: '/practice/verbs/dative-prepositions',
        component: DativePrepositionsPage,
        tags: ['preposition']
    },
    {
        name: 'Reflexive Verbs',
        path: '/practice/verbs/reflexive',
        component: ReflexiveVerbsPage,
        tags: ['verb']
    },
    {
        name: 'Speech Verbs',
        path: '/practice/verbs/speech',
        component: SpeechPage,
        tags: ['verb']
    },
    {
        name: 'Knowledge Verbs',
        path: '/practice/verbs/knowledge',
        component: KnowledgePage,
        tags: ['verb']
    },
    {
        name: 'Sein & Haben Verbs',
        path: '/practice/verbs/sein-haben',
        component: SeinHabenVerbsPage,
        tags: ['verb']
    },
    {
        name: 'Uses of "lassen"',
        path: '/practice/verbs/lassen',
        component: LassenPage,
        tags: ['verb']
    },
    {
        name: 'Stellen, Stehen, Legen, Liegen',
        path: '/practice/verbs/stellen-stehen-legen-liegen',
        component: StellenPage,
        tags: ['verb']
    },
    {
        name: 'Subordinating Conjunctions',
        path: '/practice/composition/subordinating-conjunctions',
        component: SubordinatingPage,
        tags: ['composition']
    },
    {
        name: 'Relative Pronoun Clauses',
        path: '/practice/composition/relative-pronoun-clauses',
        component: RelativePronounClausesPage,
        tags: ['composition']
    },
    {
        name: 'Present Perfect Tense',
        path: '/practice/composition/present-perfect',
        component: PresentPerfectPage,
        tags: ['composition']
    },
    {
        name: 'Clauses Begun By An Article',
        path: '/practice/composition/article',
        component: ArticleClausesPage,
        tags: ['composition']
    },
    {
        name: 'Future Perfect Tense',
        path: '/practice/tenses/future-perfect',
        component: FuturePerfectPage,
        tags: ['tenses']
    },
    {
        name: 'Future Imperfect Tense',
        path: '/practice/tenses/future-imperfect',
        component: FutureSimplePage,
        tags: ['tenses']
    },
    {
        name: 'Simple Present Tense',
        path: '/practice/tenses/present-simple',
        component: PresentSimplePage,
        tags: ['tenses']
    },
    {
        name: 'Present Perfect Tense',
        path: '/practice/tenses/present-perfect',
        component: PresentPerfectPage,
        tags: ['tenses']
    },
    {
        name: 'Simple Past Tense',
        path: '/practice/tenses/past-simple',
        component: PastSimplePage,
        tags: ['tenses']
    },
    {
        name: 'Past Perfect Tense',
        path: '/practice/tenses/past-perfect',
        component: PastPerfectPage,
        tags: ['tenses']
    },
    {
        name: '"da-" Adverbs',
        path: '/practice/adverbs/da-words',
        component: DaAdverbsPage,
        tags: ['adverb']
    },
    {
        name: 'Wie & Als',
        path: '/practice/adverbs/wie-als',
        component: WieAlsPage,
        tags: ['adverb']
    },
    {
        name: 'Werden, Worden, Wurden, War',
        path: '/vocab/verbs/werden',
        component: WerdenPage,
        tags: ['verb']
    },
    {
        name: '"er", "vor", "ver" Prefixes',
        path: '/vocab/prefixes/er-ver-vor',
        component: ErVerVorPage,
        tags: ['prefix']
    },
    {
        name: '"be", "ein", "er" Prefixes',
        path: '/vocab/prefixes/be-ein-er',
        component: BeEinErPage,
        tags: ['prefix']
    },
    {
        name: '"auf", "aus", "heraus" Prefixes',
        path: '/vocab/prefixes/auf-aus-heraus',
        component: AufAusHerausPage,
        tags: ['prefix']
    },
    {
        name: 'Accusative & Dative Pronouns',
        path: '/vocab/pronouns/akk-dat',
        component: AkkDatPage,
        tags: ['pronoun']
    },
    {
        name: 'Adjectival Pronouns',
        path: '/vocab/pronouns/adjectival',
        component: AdjectivalPronounsPage,
        tags: ['pronoun']
    },
    {
        name: 'Vocab for Cristina',
        path: '/vocab/cristina',
        component: CristinaVocabPage,
        tags: ['vocab']
    }
];
