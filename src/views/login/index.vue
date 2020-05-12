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
              ref="login-form"
              @failed="onFailed">
      <van-field v-model="user.mobile"
                 icon-prefix="toutiao"
                 left-icon="shouji"
                 center
                 name="mobile"
                 :rules="formRules.mobile"
                 placeholder="请输入手机号" />
      <van-field v-model="user.code"
                 clearable
                 icon-prefix="toutiao"
                 left-icon="yanzhengma"
                 center
                 name="code"
                 :rules="formRules.code"
                 placeholder="请输入验证码">
        <template #button>
          <van-count-down :time="1000*60"
                          v-if="isCountDownShow"
                          format="ss s"
                          @finish="isCountDownShow=false" />
          <van-button size="mini"
                      v-else
                      class="send-btn"
                      :loading="isSendSmsloading"
                      @click.prevent="onSendSms"
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
import { login, sendSms } from '@/api/user'
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
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      // 倒计时和验证码显示状态
      isCountDownShow: false,
      isSendSmsloading: false
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
        const { data } = await login(this.user)
        // console.log(res)
        this.$toast.success('登录成功')
        // 登录成功跳转到页面
        this.$router.back()
        // 将后端返回的用户登录状态token放到vuex容器中
        this.$store.commit('setUser', data.data)
      } catch (err) {
        console.log(err)
        // console.log('登录失败', err)
        this.$toast.fail('登录失败, 手机号或验证码错误')
      }
    },
    onFailed (error) {
      console.log(error)
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    async onSendSms () {
      // console.log('onSendSms')
      // 校验手机号是否格式正确
      // 验证通过，请求发送验证码，显示倒计时
      try {
        // 校验手机号是否格式正确
        await this.$refs['login-form'].validate('mobile')
        // console.log(123)
        // 点击发送验证码时显示loading状态
        this.isSendSmsloading = true
        // const res = await sendSms(this.user.mobile)
        // console.log(123)
        await sendSms(this.user.mobile)
        // console.log(res)
        // 点击发送验证码显示倒计时
        this.isCountDownShow = true
        // 倒计时结束重新显示发送按钮
      } catch (err) {
        // console.log(err)
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的错误
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          // 失败错误提示
          message = err.message
        } else {
          message = '发送失败，请稍后重试'
        }
        // 提示用户
        this.$toast({
          message,
          position: 'top'
        })
      }
      // 关闭loading状态
      this.isSendSmsloading = false
    }
  }
}
// end
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
