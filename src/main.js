import Vue from 'vue';
import {
  Button,
  Input,
  Select,
  Option,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  FormItem,
  Form,
  Checkbox,
  Divider,
  Link,
  Tag,
  RadioGroup,
  RadioButton,
  Dialog,
} from 'element-ui';
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
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Checkbox);
Vue.use(Divider);
Vue.use(Link);
Vue.use(Tag);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Dialog);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
