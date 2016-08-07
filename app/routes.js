import PageWrapper from './components/pages/PageWrapper';
import ExerciseItemDetailPage from './components/pages/exercisePages/AdjectiveDeclension/ExerciseItemDetail/ExerciseItemDetailPage';
import ExerciseCreationPage from './components/pages/exercisePages/AdjectiveDeclension/ExerciseCreation/ExerciseCreationPage';
import PracticePage from './components/pages/Practice/PracticePage';
import AboutPage from './components/pages/About/AboutPage';
import exercisePages from './exercisePages';

const defaultPath = '/practice';
const indexRoute = {
    onEnter: (nextState, replace) => replace(defaultPath)
};

const wildCardRoute = Object.assign({ path: '*' }, indexRoute);

const childRoutes = [
    {
        component: PracticePage,
        path: defaultPath
    },
    {
        component: AboutPage,
        path: '/about'
    },
    {
        component: ExerciseItemDetailPage,
        path: '/practice/adjective-declension/detail/:id'
    },
    {
        component: ExerciseCreationPage,
        path: '/practice/adjective-declension/settings'
    }
].concat(exercisePages)
.concat([wildCardRoute])

console.log(exercisePages, childRoutes)

export default {
    path: '/',
    component: PageWrapper,
    indexRoute,
    childRoutes
};
