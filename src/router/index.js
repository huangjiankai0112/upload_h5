import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

let isHistory = process.env.NODE_ENV !== 'production';
isHistory = true;

import uploadPage from '../pages/uploadPage';
import uploadDoneInput from '../pages/uploadDoneInput';
import testDownLoad from '../pages/testDownLoad';

/**
 * 页面组件与路由地址的对应关系
 * @type {*[]}
 */
const routes = [
  {
    path: '/',
    name: 'uploadPage',
    component: uploadPage,
    meta: {
      title: 'upload your like!'
    }
  },
  
  {
    path: '/down-info',
    name: 'downInfo',
    component: uploadDoneInput,
    meta: {
      title: 'upload your like!'
    }
  },
  {
    path: '/test',
    name: 'testDownLoad',
    component: testDownLoad,
    meta: {
      title: 'upload your like!'
    }
  },
];

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  // linkActiveClass: 'page-active',
  history: isHistory,
  base: __dirname,
  // base: '/palmstore/index/h5',
  routes: routes,
  srcollBehavior: function (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
        // y: to.meta.scrollTop
      };
    }
  }
});
/**
 * 当一个导航触发时，全局的 before 钩子按照创建顺序调用。钩子是异步解析执行，此时导航在所有钩子 resolve 完之前一直处于 等待中。
 *  to: Route: 即将要进入的目标 路由对象
 *  from: Route: 当前导航正要离开的路由
 *  next: Function: 一定要调用该方法来 resolve 这个钩子。
 */
router.beforeEach((to, from, next) => {
  let scrollTop = window.pageXOffse || document.documentElement.scrollTop || document.body.scrollTop;
  // to来自  from  去哪
  if(to.meta.title) {
    document.title = to.meta.title
  }
  from.meta.scrollTop = scrollTop;
  // to.meta.keepAlive = true
  next();
});

router.afterEach(route => {
});

export default router;
