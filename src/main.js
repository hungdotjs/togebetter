import Vue from 'vue';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import {
  Autocomplete,
  Avatar,
  Button,
  Badge,
  Input,
  Select,
  Option,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Drawer,
  FormItem,
  Form,
  Checkbox,
  Divider,
  Link,
  Tag,
  Tabs,
  TabPane,
  RadioGroup,
  RadioButton,
  Dialog,
  Row,
  Col,
  Image,
  Upload,
  Pagination,
  PageHeader,
  Popconfirm,
  Tooltip,
  Loading,
  Popover,
  MessageBox,
  Message,
} from 'element-ui';
// collapse
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import infiniteScroll from 'vue-infinite-scroll';
import languages from '@/data/languages';
import countries from '@/data/countries';
import App from './App.vue';
import router from './router';
import store from './store';

// CSS
import '@/assets/scss/all.scss';
// iconfont
import '@/assets/fonts/iconfont.css';

// configure language
locale.use(lang);

Vue.prototype.$ELEMENT = { size: 'medium', zIndex: 3000 };
Vue.use(infiniteScroll);

Vue.use(Autocomplete);
Vue.use(Avatar);
Vue.use(Button);
Vue.use(Badge);
Vue.use(Checkbox);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Drawer);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Divider);
Vue.use(Link);
Vue.use(Tag);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Dialog);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(PageHeader);
Vue.use(Pagination);
Vue.use(Popconfirm);
Vue.use(Tooltip);
Vue.use(Image);
Vue.use(Loading);
Vue.use(Popover);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.component(CollapseTransition.name, CollapseTransition);

Vue.config.productionTip = false;

Vue.filter('countryName', (value) => {
  if (!value) return '';
  return countries.find((item) => item.code === value).name || '';
});

Vue.filter('languageName', (value) => {
  if (!value) return '';
  return languages.find((item) => item.code === value).name || '';
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
