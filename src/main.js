import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Navbar from './components/client/Navbar.vue';
import CoreuiVue from '@coreui/vue';
import store from './store';
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import "vue-cal/dist/vuecal.css";

createApp(App).use(router).use(store).use(CoreuiVue).use(VueChartkick).component('Navbar', Navbar).mount('#app')
