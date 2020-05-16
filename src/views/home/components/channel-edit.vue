<template>
  <div class="channel-edit">
    <van-cell center
              :border="false">
      <div slot="title"
           class="channel-title"> 我的频道</div>
      <van-button type="danger"
                  plain
                  round
                  size="mini"
                  @click="isEdit=!isEdit">{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item class="grit-item"
                     :icon="(isEdit && index !==0) ? 'clear' :''"
                     v-for="(channel,index) in userChannel"
                     :key="index"
                     :text="channel.name"
                     @click="onUserChannelClick(index)" />
    </van-grid>
    <van-cell center
              :border="false">
      <div slot="title"
           class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item class="grit-item"
                     v-for="(channel,index) in recommendChannels"
                     :key="index"
                     :text="channel.name"
                     @click="onAdd(channel)" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannel: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  computed: {
    // 推荐的频道列表
    // 计算属性
    recommendChannels () {
      return this.allChannels.filter(channel => {
        // 判断是都属于我的频道里
        return !this.userChannel.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
    }
  },
  watch: {},
  created () {
    this.loadallChannels()
  },
  mounted () { },
  methods: {
    async loadallChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    onAdd (channel) {
      this.userChannel.push(channel)
    },
    onUserChannelClick (index) {
      // Edit为true编辑状态
      // Edit为false删除状态
      if (this.isEdit && index !== 0) {
        this.deleteChannel(index)
      } else {
        this.swithChannel(index)
      }
    },
    deleteChannel (index) {
      console.log('删除')
      this.userChannel.splice(index, 1)
    },
    swithChannel (index) {
      console.log('编辑')
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 55px;
  .channel-title {
    font-size: 16px;
    color: #333;
  }
  .grit-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
    }
    /deep/ .van-grid-item__icon {
      position: absolute;
      top: -5px;
      right: -5px;
      font-size: 20px;
      color: #cccccc;
    }
    .van-grid-item__text {
      font-size: 14px;
      color: #222;
    }
    /deep/.van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
