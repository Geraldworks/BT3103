import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Navbar from './components/views/Navbar.vue';
import CoreuiVue from '@coreui/vue';
import store from './store';
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

createApp(App).use(router).use(store).use(CoreuiVue).use(VueChartkick).component('Navbar', Navbar).mount('#app')
