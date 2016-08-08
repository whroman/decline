import AdjectivesTrainerPage from './components/pages/exercisePages/AdjectiveDeclension/AdjectivesTrainer/AdjectivesTrainerPage';
import VerbsWithPrepositionsPage from './components/pages/exercisePages/Verbs/VerbsWithPrepositionsPage';
import ReflexiveVerbsPage from './components/pages/exercisePages/Verbs/ReflexiveVerbsPage';
import SeinHabenVerbsPage from './components/pages/exercisePages/Verbs/SeinHabenVerbsPage';
import DassAndWeilPage from './components/pages/exercisePages/Conjunctions/DassAndWeilPage';
import DaAdverbsPage from './components/pages/exercisePages/Adverbs/DaAdverbsPage';
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
        name: 'Dass and Weil Clauses',
        path: '/practice/conjugations/dass-weil',
        component: DassAndWeilPage
    },
    {
        name: '"da-" Adverbs',
        path: '/practice/adverbs/da-words',
        component: DaAdverbsPage
    },
    {
        name: 'Vocab for Cristina',
        path: '/vocab/cristina',
        component: CristinaVocabPage
    }
];
