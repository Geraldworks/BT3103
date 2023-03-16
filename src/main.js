import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import NavBar from './components/views/NavBar.vue';
import CoreuiVue from '@coreui/vue';
import store from './store';
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

createApp(App).use(router).use(store).use(CoreuiVue).use(VueChartkick).component('NavBar', NavBar).mount('#app')
