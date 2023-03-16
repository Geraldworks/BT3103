import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import NavBar from './components/views/NavBar.vue';
import CoreuiVue from '@coreui/vue';
import store from './store';

createApp(App).use(router).use(store).use(CoreuiVue).component('NavBar', NavBar).mount('#app')
