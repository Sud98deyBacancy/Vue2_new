import {createRouter,createWebHistory} from 'vue-router';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsRecieved from './pages/requests/RequestsRecieved.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/UserAuth.vue';
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/',redirect:'/coaches'},
        {path:'/coaches',component:CoachesList},
        {path:'/coaches/:id',component:CoachDetails,props:true,
        children:[{path:'contact',component:ContactCoach}] },
        {path:'/register',component:CoachRegistration},
        {path:'/requests',component:RequestsRecieved},
        {path:'/auth',component:UserAuth},
        {path:'/:notFound(.*)',component:NotFound}
    ]
});
export default router;