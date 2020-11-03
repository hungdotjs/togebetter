/* eslint-disable implicit-arrow-linebreak */
import Vue from 'vue';
import store from '@/store';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/',
    name: 'landing-page',
    component: () => import(/* webpackChunkName: "landing-page" */ '@/views/LandingPage.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '@/views/Signup.vue'),
  },
  {
    path: '/questions/type',
    name: 'questions-type',
    component: () => import(/* webpackChunkName: "questions" */ '@/views/QuestionsType.vue'),
  },
  {
    path: '/questions/new/:type',
    name: 'questions-new',
    component: () => import(/* webpackChunkName: "questions-new" */ '@/views/QuestionNew.vue'),
  },
  {
    path: '/questions/:id',
    name: 'questions-detail',
    component: () =>
      import(/* webpackChunkName: "questions-detail" */ '@/views/QuestionDetail.vue'),
  },
  {
    path: '/users/:id',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '@/views/Profile.vue'),
  },
  {
    path: '/tags',
    name: 'tags',
    component: () => import(/* webpackChunkName: "tags" */ '@/views/Tags.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '@/views/Users.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (store.state.auth.user) {
    switch (to.name) {
      case 'login':
      case 'signup':
        next({ name: 'home' });
        break;
      default:
        next();
    }
  }
  next();
});

export default router;
