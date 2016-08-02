import PageWrapper from './components/pages/PageWrapper';
import AdjectivesTrainerPage from './components/pages/AdjectivesTrainer/AdjectivesTrainerPage';
import ExerciseItemDetailPage from './components/pages/ExerciseItemDetail/ExerciseItemDetailPage';
import ExerciseCreationPage from './components/pages/ExerciseCreation/ExerciseCreationPage';
import PracticePage from './components/pages/Practice/PracticePage';
import AboutPage from './components/pages/About/AboutPage';
import VerbsWithPrepositionsPage from './components/pages/Verbs/VerbsWithPrepositionsPage';
import ReflexiveVerbsPage from './components/pages/Verbs/ReflexiveVerbsPage';
import SeinHabenVerbsPage from './components/pages/Verbs/SeinHabenVerbsPage';

const defaultRoute = '/practice/adjective-declension';

export default {
    path: '/',
    component: PageWrapper,
    indexRoute: {
        onEnter: (nextState, replace) => replace(defaultRoute)
    },
    childRoutes: [
        {
            component: AboutPage,
            path: '/about'
        },
        {
            component: PracticePage,
            path: '/practice'
        },
        {
            component: AdjectivesTrainerPage,
            path: defaultRoute
        },
        {
            component: ExerciseItemDetailPage,
            path: '/practice/adjective-declension/detail/:id'
        },
        {
            component: ExerciseCreationPage,
            path: '/practice/adjective-declension/settings'
        },
        {
            component: VerbsWithPrepositionsPage,
            path: '/practice/verbs/prepositions'
        },
        {
            component: ReflexiveVerbsPage,
            path: '/practice/verbs/reflexive'
        },
        {
            component: SeinHabenVerbsPage,
            path: '/practice/verbs/sein-haben'
        }
    ]
};
