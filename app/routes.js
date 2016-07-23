import PageWrapper from './components/pages/PageWrapper';
import AdjectivesTrainerPage from './components/pages/AdjectivesTrainer/AdjectivesTrainerPage';
import ExerciseItemDetailPage from './components/pages/ExerciseItemDetail/ExerciseItemDetailPage';
import ExerciseCreationPage from './components/pages/ExerciseCreation/ExerciseCreationPage';
import AboutPage from './components/pages/About/AboutPage';
import VerbsPage from './components/pages/Verbs/VerbsPage';

const defaultRoute = '/adjectives';

export default {
    path: '/',
    component: PageWrapper,
    indexRoute: {
        onEnter: (nextState, replace) => replace(defaultRoute)
    },
    childRoutes: [
        {
            component: AdjectivesTrainerPage,
            path: defaultRoute
        },
        {
            component: ExerciseItemDetailPage,
            path: '/detail/:id'
        },
        {
            component: ExerciseCreationPage,
            path: '/create'
        },
        {
            component: AboutPage,
            path: '/about'
        },
        {
            component: VerbsPage,
            path: '/verbs'
        }
    ]
};
