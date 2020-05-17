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
                     :class="{active: index===active}"
                     :icon="(isEdit && index !==0) ? 'clear' :''"
                     v-for="(channel,index) in userChannel"
                     :key="index"
                     :text="channel.name"
                     @click="onUserChannelClick(channel,index)" />
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
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
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
    ...mapState(['user']),
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
    async onAdd (channel) {
      this.userChannel.push(channel)
      // 数据持久化
      // 登录，存到线上
      if (this.user) {
        await addUserChannel({
          channels: [
            { id: channel.id, seq: this.userChannel.length }
          ]
        })
      } else {
        // 没有登录，存到本地
        setItem('user-channels', this.userChannel)
      }
    },
    onUserChannelClick (channel, index) {
      // Edit为true编辑状态
      // Edit为false删除状态
      if (this.isEdit && index !== 0) {
        // 编辑状态，删除频道
        this.deleteChannel(channel, index)
      } else {
        // 非编辑状态，切换频道
        this.swithChannel(index)
      }
    },
    async deleteChannel (channel, index) {
      // console.log('删除')
      if (index <= this.active) {
        // 更新激活的频道索引
        this.$emit('update-active', this.active - 1)
      }
      this.userChannel.splice(index, 1)
      // 删除数据持久化
      if (this.user) {
        // 登录，持久化到线上
        await deleteUserChannel(channel.id)
      } else {
        // 没有登录，持久化到本地
        setItem('user-channels', this.userChannel)
      }
    },
    swithChannel (index) {
      // 切换频道
      this.$emit('update-active', index)
      //  关闭弹出层
      this.$emit('close')
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
  .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>
