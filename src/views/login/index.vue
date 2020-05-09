<template>
  <div class="login-container">
    <van-nav-bar class="app-nav-bar"
                 title="注册/登录"
                 left-arrow
                 @click-left="$router.back()" />
    <van-cell-group>
      <van-field v-model="user.mobile"
                 icon-prefix="toutiao"
                 left-icon="shouji"
                 placeholder="请输入手机号" />
      <van-field v-model="user.code"
                 clearable
                 icon-prefix="toutiao"
                 left-icon="yanzhengma"
                 placeholder="请输入验证码">
        <template #button>
          <van-button size="mini"
                      class="send-btn"
                      round>发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-warp">
        <van-button type="info"
                    class="login-btn"
                    block
                    @click="onLogin">登录</van-button>
      </div>

    </van-cell-group>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onLogin () {
      // 1.找到数据接口
      // 2.封装请求方法
      // 3.请求调用登录
      // 4.处理相应结果
      try {
        const res = await login(this.user)
        console.log(res)
      } catch (err) {
        console.log(err)
        console.log('登录失败', err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 12px;
      color: #919191;
    }
  }
  .login-btn-warp {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
