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
    <van-tabs class="channel-tabs"
              v-model="active">
      <van-tab class="tab-item"
               :title="channel.name"
               v-for="channel in channels"
               :key="channel.id">
        <!-- 文章列表 -->
        <article-list :channel=channel />
      </van-tab>
    </van-tabs>
  </div>

</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
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
  .channel-tabs {
    /deep/ .van-tab {
      border-bottom: 1px solid #edeff3;
      border-right: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      width: 15px !important;
      height: 3px;
      background-color: #3296fa;
      bottom: 20px;
    }
  }
}
</style>
