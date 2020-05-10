<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar"
                 title="注册/登录"
                 left-arrow
                 @click-left="$router.back()" />
    <van-form @submit="onLogin"
              :show-error="false"
              :show-error-message="false"
              validate-first
              @failed="onFailed">
      <van-field v-model="user.mobile"
                 icon-prefix="toutiao"
                 left-icon="shouji"
                 :rules="formRules.mobile"
                 placeholder="请输入手机号" />
      <van-field v-model="user.code"
                 clearable
                 icon-prefix="toutiao"
                 left-icon="yanzhengma"
                 :rules="formRules.code"
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
                    block>登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
// import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      formRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' }],
        code: [
          { required: true, message: '不能为验证码空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onLogin () {
      this.$toast.loading({
        // 提示文本
        message: '登录中...',
        // 禁止背景点击
        forbidClick: true,
        // 展示时长
        duration: 0
      })
      try {
        const res = await login(this.user)
        console.log(res)
        this.$toast.success('登录成功')
      } catch (err) {
        console.log(err)
        // console.log('登录失败', err)
        this.$toast.fail('登录失败, 手机号或验证码错误')
      }
    },
    onFailed (error) {
      // console.log('验证失败', error)
      if (error.error[0]) {
        this.$toast({
          message: error.error[0].message,
          position: 'top'
        })
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
