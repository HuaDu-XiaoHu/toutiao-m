<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- /子路由出口 -->
    <!-- 底部导航栏 -->
    <van-tabbar v-model="active">
      <van-tabbar-item name="home"
                       icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="search"
                       icon="search">问答</van-tabbar-item>
      <van-tabbar-item name="friends"
                       icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item name="setting"
                       icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
    <!-- /底部导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less"></style>
