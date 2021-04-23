// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './prototype'

import Vue from 'vue'
import Api from 'axios'
import 'amfe-flexible';
import 'babel-polyfill'

// import VueAwesomeSwiper from 'vue-awesome-swiper'
// // import style
// import 'swiper/css/swiper.css'
// Vue.use(VueAwesomeSwiper)

import router from './router'

import config from './config'

import iG from './core/iosApi';
import dateUtil from './core/date'
import cookie from './core/cookie'

import animated from 'animate.css' ;

// mint-ui组件样式
import 'mint-ui/lib/message-box/style.css';
import 'mint-ui/lib/spinner/style.css';
import 'mint-ui/lib/indicator/style.css';
import 'mint-ui/lib/toast/style.css';
import 'mint-ui/lib/button/style.css';
import 'mint-ui/lib/font/style.css';

import {
  Spinner,
  Indicator,
  MessageBox,
  Toast,
  Button,
} from 'mint-ui';
import * as filters from './filters';
Vue.component(Spinner.name, Spinner);

Vue.component(MessageBox.name, MessageBox);
Vue.component(Toast.name, Toast);
Vue.component(Button.name, Button);


// 注册全局过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

window.$messageBox = MessageBox;
window.$Toast = Toast;
window.$Indicator = Indicator;


import App from './App'
// 添加Vue的原型链(只读)
Object.defineProperty(Vue.prototype, 'Config', { value: config });
Object.defineProperty(Vue.prototype, '$Api', { value: Api });

Object.defineProperty(Vue.prototype, '$filters', { value: filters });

Object.defineProperty(Vue.prototype, '$iG', { value: iG });
Object.defineProperty(Vue.prototype, '$dateUtil', { value: dateUtil });
Object.defineProperty(Vue.prototype, '$cookie', { value: cookie });
Object.defineProperty(Vue.prototype, '$messageBox', {
  value: MessageBox
});
Object.defineProperty(Vue.prototype, '$Spinner', {
  value: Spinner
});
Object.defineProperty(Vue.prototype, '$Indicator', {
  value: Indicator
});
Object.defineProperty(Vue.prototype, '$Toast', {
  value: Toast
});

Vue.use(animated)
/* eslint-disable no-new */
new Vue({
  router,
  components: { App },
  render: h => h(App)
}).$mount("#app");

