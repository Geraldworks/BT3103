import { createRouter, createWebHistory } from 'vue-router';
import SignUp from '../components/views/SignUp.vue';
import SignIn from '../components/views/SignIn.vue';
import LandingPage from '../components/views/LandingPage.vue';
import PerformancePage from '../components/views/PerformancePage.vue';
import BookingPage from '../components/views/BookingPage.vue';
import CalendarPage from '../components/views/CalendarPage.vue';
import RoutinesPage from '../components/views/RoutinesPage.vue';
import store from '../store';

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
        path: '/performance',
        name: 'Performance',
        component: PerformancePage
    },
    {
        path: '/booking',
        name: 'Booking',
        component: BookingPage
    },
    {
        path: '/calendar',
        name: 'Calendar',
        component: CalendarPage
    },
    {
        path: '/routines',
        name: 'Routines',
        component: RoutinesPage
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from) => {
    if (!store.state.user.loggedIn && (to.name !== 'SignIn' && to.name !== 'Landing' && to.name !== 'SignUp')) {
        return { name: 'SignIn' };
    } else if (store.state.user.loggedIn && (to.name == 'Landing' || to.name == 'SignUp' || to.name == 'SignIn')) {
        return { name: 'Performance'};
    }
})

export default router;