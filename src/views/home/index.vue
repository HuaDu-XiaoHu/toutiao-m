<template>
  <div class="home-container">
    <van-nav-bar class="app-nav-bar">
      <van-button slot="title"
                  class="search-btn"
                  icon="search"
                  type="info"
                  round
                  size="small">搜索</van-button>
    </van-nav-bar>
    <van-tabs v-model="active">
      <van-tab :title="channel.name"
               v-for="channel in channels"
               :key="channel.id">{{channel.name}}的内容</van-tab>
    </van-tabs>
  </div>

</template>

<script>
import { getUserChannels } from '@/api/user'
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () { },
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      // console.log(data)
      this.channels = data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-icon {
      color: #ffffff;
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
}
</style>
