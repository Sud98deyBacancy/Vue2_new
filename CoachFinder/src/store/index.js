import { createStore } from 'vuex';
import coachesModule from './modules/coaches.js';
import request from './modules/request.js';
const store=createStore({
    modules:{coaches:coachesModule,request},
      state(){  return { userId:'c5' }; }, 
      getters:{  userId(state){ return state.userId; }}
});
export default store;