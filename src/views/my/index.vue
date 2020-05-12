<template>
  <div class="my-container">
    <van-cell-group v-if="user"
                    class="my-info">
      <van-cell class="base-info"
                title="单元格"
                value="内容"
                center
                :border="false">
        <van-image class="avatar"
                   slot="icon"
                   round
                   fit="cover"
                   src="https://img.yzcdn.cn/vant/cat.jpeg" />

        <div slot="title"
             class="name">昵称</div>
        <van-button size="small"
                    class="update-btn"
                    round>编辑资料</van-button>
      </van-cell>
      <van-grid class="data-info"
                :border="false">
        <van-grid-item class="data-info-item">
          <div slot="text"
               class="text-warp">
            <div class="count">123</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text"
               class="text-warp">
            <div class="count">123</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text"
               class="text-warp">
            <div class="count">123</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text"
               class="text-warp">
            <div class="count">123</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>

      </van-grid>
    </van-cell-group>
    <div v-else
         class="not-login">
      <div @click="$router.push('./login')"><img src="./shouji.png"
             class="mobile"></div>

      <div class="text">登录/注册</div>
    </div>
    <van-grid class="nav-grid mb-4"
              :column-num="2">
      <van-grid-item icon-prefix="toutiao"
                     class="nav-grid-item"
                     icon="shoucang"
                     text="收藏" />
      <van-grid-item icon-prefix="toutiao"
                     class="nav-grid-item"
                     icon="lishi"
                     text="历史" />

    </van-grid>
    <van-cell title="消息通知"
              is-link
              to="/" />
    <van-cell title="小智同学"
              class="mb-4"
              is-link
              to="/" />
    <van-cell class="logout-cell"
              v-if="user"
              @click="onLogout"
              title="退出登录" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
    onLogout () {
      // 提示是否要退出
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          // 清除用户登录状态
          this.$store.commit('setUser', null)
          // this.$router.push('./login')
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  height: 667px;
  background-color: #f5f7f9;
  .my-info {
    background: url("./banner.png") no-repeat;
    background-size: cover;
    .base-info {
      background-color: unset;
      box-sizing: border-box;
      height: 115px;
      padding-top: 40px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        columns: #ffffff;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        columns: #666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        // color: #ffffff;
        .text-warp {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
            color: black;
          }
          .text {
            font-size: 11px;
            color: black;
          }
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }
  .not-login {
    height: 180px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      height: 66px;
      width: 66px;
      .text {
        font-size: 14px;
        color: #fff;
      }
    }
    /deep/ .nav-grid {
      .nav-grid-item {
        height: 70px;
        .toutiao-lishi {
          font-size: 22px;
          color: #ff9b1d;
        }
        .toutiao-shoucang {
          font-size: 22px;
          color: #eb5253;
        }
        .van-grid-item__text {
          font-size: 14px;
          color: #333333;
        }
      }
    }
  }
  .logout-cell {
    height: 45px;
    text-align: center;
    color: #d86253;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
