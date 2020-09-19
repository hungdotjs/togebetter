import Vue from 'vue';
// eslint-disable-next-line object-curly-newline
import { Button, Input, Select, Option, Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';

// CSS
import '@/assets/scss/all.scss';

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Button);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
