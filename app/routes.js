import PageWrapper from './components/pages/PageWrapper';
import AdjectivesTrainerPage from './components/pages/AdjectivesTrainer/AdjectivesTrainerPage';
import ExerciseItemDetailPage from './components/pages/ExerciseItemDetail/ExerciseItemDetailPage';
import ExerciseCreationPage from './components/pages/ExerciseCreation/ExerciseCreationPage';
import AboutPage from './components/pages/About/AboutPage';

export default {
    component: PageWrapper,
    childRoutes: [
        {
            component: AdjectivesTrainerPage,
            path: '/'
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
    ]
};
