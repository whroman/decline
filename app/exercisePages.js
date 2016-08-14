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
import StellenPage from './components/pages/exercisePages/Verbs/StellenPage';
import ErVerPage from './components/pages/exercisePages/Prefixes/ErVerPage';
import CristinaVocabPage from './components/pages/exercisePages/Vocab/CristinaVocabPage';
import AkkDatPage from './components/pages/exercisePages/Pronouns/AkkDatPage';
import SubordinatingPage from './components/pages/exercisePages/Clauses/SubordinatingPage';
import RelativeClausesPage from './components/pages/exercisePages/Clauses/RelativeClausesPage';

export default [
    {
        name: 'Adjective Declension',
        path: '/practice/adjective-declension',
        component: AdjectivesTrainerPage
    },
    {
        name: 'Verbs & Prepositions',
        path: '/practice/verbs/prepositions',
        component: VerbsWithPrepositionsPage
    },
    {
        name: 'Two-Way Prepositions',
        path: '/practice/verbs/two-way-prepositions',
        component: TwoWayPrepositionsPage
    },
    {
        name: 'Dative Prepositions',
        path: '/practice/verbs/dative-prepositions',
        component: DativePrepositionsPage
    },
    {
        name: 'Reflexive Verbs',
        path: '/practice/verbs/reflexive',
        component: ReflexiveVerbsPage
    },
    {
        name: 'Sein & Haben Verbs',
        path: '/practice/verbs/sein-haben',
        component: SeinHabenVerbsPage
    },
    {
        name: 'Uses of "lassen"',
        path: '/practice/verbs/lassen',
        component: LassenPage
    },
    {
        name: 'Stellen, Stehen, Liegen, Legen',
        path: '/practice/verbs/stellen-liegen',
        component: StellenPage
    },
    {
        name: 'Subordinating Conjunctions',
        path: '/practice/clauses/subordinating-conjunctions',
        component: SubordinatingPage
    },
    {
        name: 'Relative Clauses',
        path: '/practice/clauses/relative',
        component: RelativeClausesPage
    },
    {
        name: '"da-" Adverbs',
        path: '/practice/adverbs/da-words',
        component: DaAdverbsPage
    },
    {
        name: 'Wie & Als',
        path: '/practice/adverbs/wie-als',
        component: WieAlsPage
    },
    {
        name: 'Werden, Worden, Geworden, War',
        path: '/vocab/verbs/werden',
        component: WerdenPage
    },
    {
        name: '"er-", "vor-", "ver-" Prefixes',
        path: '/vocab/prefixes/er-ver',
        component: ErVerPage
    },
    {
        name: 'Accusative & Dative Pronouns',
        path: '/vocab/pronouns/akk-dat',
        component: AkkDatPage
    },
    {
        name: 'Vocab for Cristina',
        path: '/vocab/cristina',
        component: CristinaVocabPage
    }
];
