import { createApp } from 'vue';
import router from './router.js';
import store from './store/index.js';
import app from './App.vue';
import BaseCard from './UI/BaseCard.vue';
import BaseButton from './UI/BaseButton.vue';
import BaseBadge from './UI/BaseBadge.vue';
const CoachFinder=createApp(app);
CoachFinder.component('base-card',BaseCard);
CoachFinder.component('base-button',BaseButton);
CoachFinder.component('base-badge',BaseBadge);
CoachFinder.use(router);
CoachFinder.use(store);
CoachFinder.mount('#app');