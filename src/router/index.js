import { createRouter, createWebHistory } from 'vue-router';
import SignUp from '../components/views/SignUp.vue';
import SignIn from '../components/views/SignIn.vue';
import HomePage from '../components/views/HomePage.vue';
import LandingPage from '../components/views/LandingPage.vue';
// import PerformancePage from '../components/views/PerformancePage.vue';


const routes = [
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: SignIn
    },
    {
        path: '/',
        name: 'Landing',
        component: LandingPage
    },
    {
        path: '/home',
        name: 'Home',
        component: HomePage
    },
    // {
    //     path: '/performance',
    //     name: 'Performance',
    //     component: PerformancePage
    // }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;