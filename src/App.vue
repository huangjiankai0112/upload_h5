<template>
  <div id="app">
    <!-- 头部导航 -->
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->

    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->

    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  data: function () {
    return {
    };
  },
  created: function () {
  },
  methods: {
    getUrlParam (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  },
  computed: {
  },
  mounted () {
  }
};
</script>
<style lang="scss" type="text/css" src="@/styles/index.scss"></style>
