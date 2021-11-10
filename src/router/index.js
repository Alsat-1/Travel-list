import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import AddTravel from '@/views/AddTravel.vue';
import EditTravel from '@/views/EditTravel.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/add',
    name: 'AddTravel',
    component: AddTravel,
  },
  {
    path: '/edit/:id',
    name: 'EditTravel',
    component: EditTravel,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
