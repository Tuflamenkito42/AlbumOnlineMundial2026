import { createApp } from 'vue';
import { IonicVue } from '@ionic/vue';
import App from './App.vue';

import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import './styles/global.css';

const app = createApp(App);

app.use(IonicVue);
app.mount('#app');

if ('serviceWorker' in navigator && import.meta.env.PROD) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {
			// Ignore registration failures so the app still works as a normal web app.
		});
	});
}