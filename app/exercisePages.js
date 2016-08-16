import AdjectivesTrainerPage from './components/pages/exercisePages/AdjectiveDeclension/AdjectivesTrainer/AdjectivesTrainerPage';
import VerbsWithPrepositionsPage from './components/pages/exercisePages/Verbs/VerbsWithPrepositionsPage';
import TwoWayPrepositionsPage from './components/pages/exercisePages/Verbs/TwoWayPrepositionsPage';
import DativePrepositionsPage from './components/pages/exercisePages/Verbs/DativePrepositionsPage';
import ReflexiveVerbsPage from './components/pages/exercisePages/Verbs/ReflexiveVerbsPage';
import WerdenPage from './components/pages/exercisePages/Verbs/WerdenPage';
import SeinHabenVerbsPage from './components/pages/exercisePages/Verbs/SeinHabenVerbsPage';
import DaAdverbsPage from './components/pages/exercisePages/Adverbs/DaAdverbsPage';
import WieAlsPage from './components/pages/exercisePages/Adverbs/WieAlsPage';
import LassenPage from './components/pages/exercisePages/Verbs/LassenPage';
import SpeechPage from './components/pages/exercisePages/Verbs/SpeechPage';
import StellenPage from './components/pages/exercisePages/Verbs/StellenPage';
import ErVerVorPage from './components/pages/exercisePages/Prefixes/ErVerVorPage';
import AufAusHerausPage from './components/pages/exercisePages/Prefixes/AufAusHerausPage';
import CristinaVocabPage from './components/pages/exercisePages/Vocab/CristinaVocabPage';
import AkkDatPage from './components/pages/exercisePages/Pronouns/AkkDatPage';
import SubordinatingPage from './components/pages/exercisePages/Clauses/SubordinatingPage';
import RelativeClausesPage from './components/pages/exercisePages/Clauses/RelativeClausesPage';
import ArticleClausesPage from './components/pages/exercisePages/Clauses/ArticleClausesPage';
import PastParticiplePage from './components/pages/exercisePages/Clauses/PastParticiplePage';

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
        path: '/practice/clauses/subordinating-conjunctions',
        component: SubordinatingPage,
        tags: ['structure']
    },
    {
        name: 'Relative Clauses',
        path: '/practice/clauses/relative',
        component: RelativeClausesPage,
        tags: ['structure']
    },
    {
        name: 'Past Participle',
        path: '/practice/clauses/past-participle',
        component: PastParticiplePage,
        tags: ['structure']
    },
    {
        name: 'Clauses Begun By An Article',
        path: '/practice/clauses/article',
        component: ArticleClausesPage,
        tags: ['structure']
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
        name: 'Werden, Worden, Geworden, War',
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
        name: 'Vocab for Cristina',
        path: '/vocab/cristina',
        component: CristinaVocabPage,
        tags: ['vocab']
    }
];
