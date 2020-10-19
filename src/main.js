import Vue from 'vue';
import {
  Avatar,
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
  Row,
  Col,
  Image,
} from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';

// CSS
import '@/assets/scss/all.scss';
// iconfont
import '@/assets/fonts/iconfont.css';

Vue.prototype.$ELEMENT = { size: 'medium', zIndex: 3000 };
Vue.use(Avatar);
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
Vue.use(Row);
Vue.use(Col);
Vue.use(Image);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
