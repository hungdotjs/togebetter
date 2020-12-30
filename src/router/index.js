/* eslint-disable implicit-arrow-linebreak */
import Vue from 'vue';
import store from '@/store';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/questions',
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
    path: '/questions-type',
    name: 'questions-type',
    component: () => import(/* webpackChunkName: "questions-type" */ '@/views/QuestionsType.vue'),
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
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue'),
  },
  {
    path: '/users/:id/edit',
    name: 'edit-profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/EditProfile.vue'),
  },
  {
    path: '/tags',
    name: 'tags',
    component: () => import(/* webpackChunkName: "tags" */ '@/views/Tags.vue'),
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import(/* webpackChunkName: "posts" */ '@/views/Posts/index.vue'),
  },
  {
    path: '/posts/:id',
    name: 'post-detail',
    component: () => import(/* webpackChunkName: "posts" */ '@/views/Posts/PostDetail.vue'),
  },
  {
    path: '/posts/edit/:id',
    name: 'edit-post',
    component: () => import(/* webpackChunkName: "posts" */ '@/views/Posts/EditPost.vue'),
  },
  {
    path: '/posts/create',
    name: 'create-post',
    component: () => import(/* webpackChunkName: "posts" */ '@/views/Posts/CreatePost.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/Search.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue'),
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    component: () => import(/* webpackChunkName: "bookmarks" */ '@/views/Bookmarks.vue'),
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: () => import(/* webpackChunkName: "notifications" */ '@/views/Notifications.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '@/views/Users.vue'),
  },
  {
    path: '/account-recovery',
    name: 'account-recovery',
    component: () => import(/* webpackChunkName: "users" */ '@/views/ForgotPassword.vue'),
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
  {
    path: '*',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0, behavior: 'smooth' };
  },
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
  } else {
    next();
  }
});

export default router;
