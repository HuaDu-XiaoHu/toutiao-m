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
      <div slot="nav-right"
           class="wap-nav-placeholder"></div>
      <div slot="nav-right"
           @click="isChannelEditShow=true"
           class="warp-nav-warp">
        <van-icon name="wap-nav"></van-icon>
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup v-model="isChannelEditShow"
               position="bottom"
               class="channel-edit-popup"
               closeable
               close-icon-position="top-left"
               get-container="body"
               style="height:100%">
      <channel-edit :user-channel="channels"
                    :active="active"
                    @close="isChannelEditShow=false"
                    @update-active="onUpdateAcitve" />
    </van-popup>
  </div>

</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () { },
  methods: {
    async loadChannels () {
      let channels = []
      // const { data } = await getUserChannels()
      // // console.log(data)
      // this.channels = data.data.channels
      if (this.user) {
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        const loadChannels = getItem('user-channels')
        if (loadChannels) {
          channels = loadChannels
        } else {
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      this.channels = channels
    },
    onUpdateAcitve (index) {
      this.active = index
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
  /deep/ .van-tabs__nav {
    margin-right: 33px;
  }
  .wap-nav-placeholder {
    width: 33px;
    flex-shrink: 0;
  }
  .warp-nav-warp {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    height: 44px;
    width: 33px;
    background-color: #ffffff;
    opacity: 0.9;
    .van-icon {
      font-size: 24px;
    }
    &:before {
      content: "";
      width: 1px;
      height: 30px;
      line-height: 30px;
      background: url("./line.png") no-repeat;
      background-size: contain;
      position: absolute;
      left: 0px;
      top: 6px;
    }
  }
}
</style>
