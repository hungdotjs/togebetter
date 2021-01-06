import Vue from 'vue';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import {
  Alert,
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
  Radio,
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
  Collapse,
  CollapseItem,
} from 'element-ui';
// collapse
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import infiniteScroll from 'vue-infinite-scroll';
import VueSocialSharing from 'vue-social-sharing';
import VueI18n from 'vue-i18n';
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
Vue.use(VueSocialSharing);
Vue.use(VueI18n);
Vue.use(infiniteScroll);

Vue.use(Alert);
Vue.use(Autocomplete);
Vue.use(Avatar);
Vue.use(Button);
Vue.use(Badge);
Vue.use(Checkbox);
Vue.use(Collapse);
Vue.use(CollapseItem);
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
Vue.use(Radio);
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

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: require('./locales/en.json'),
    vi: require('./locales/vi.json'),
  },
});

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
