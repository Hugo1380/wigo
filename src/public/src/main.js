import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Bootstrap CSS et JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';

// Styles personnalisés
import './assets/styles/variables.css';
import './assets/styles/main.css';
import './assets/styles/components.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
