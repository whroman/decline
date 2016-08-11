import AdjectivesTrainerPage from './components/pages/exercisePages/AdjectiveDeclension/AdjectivesTrainer/AdjectivesTrainerPage';
import VerbsWithPrepositionsPage from './components/pages/exercisePages/Verbs/VerbsWithPrepositionsPage';
import TwoWayPrepositionsPage from './components/pages/exercisePages/Verbs/TwoWayPrepositionsPage';
import DativePrepositionsPage from './components/pages/exercisePages/Verbs/DativePrepositionsPage';
import ReflexiveVerbsPage from './components/pages/exercisePages/Verbs/ReflexiveVerbsPage';
import WerdenPage from './components/pages/exercisePages/Verbs/WerdenPage';
import SeinHabenVerbsPage from './components/pages/exercisePages/Verbs/SeinHabenVerbsPage';
import SubordinatingPage from './components/pages/exercisePages/Conjunctions/SubordinatingPage';
import DaAdverbsPage from './components/pages/exercisePages/Adverbs/DaAdverbsPage';
import WieAlsPage from './components/pages/exercisePages/Adverbs/WieAlsPage';
import LassenPage from './components/pages/exercisePages/Verbs/LassenPage';
import CristinaVocabPage from './components/pages/exercisePages/Vocab/CristinaVocabPage';

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
        name: 'Subordinating Conjunctions',
        path: '/practice/conjugations/subordinating',
        component: SubordinatingPage
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
        name: 'Vocab for Cristina',
        path: '/vocab/cristina',
        component: CristinaVocabPage
    }
];
