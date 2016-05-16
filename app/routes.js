import PageWrapper from './pages/PageWrapper';
import AdjectivesTrainerPage from './pages/AdjectivesTrainer/AdjectivesTrainerPage';
import ExerciseItemDetailPage from './pages/ExerciseItemDetail/ExerciseItemDetailPage';
import ExerciseCreationPage from './pages/ExerciseCreation/ExerciseCreationPage';

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
  ]
};
