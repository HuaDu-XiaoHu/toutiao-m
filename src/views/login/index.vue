<template>
  <div class="login0container">
    <van-nav-bar title="登录"
                 left-arrow
                 @click-left="$router.back()" />
    <van-cell-group>
      <van-field v-model="user.mobile"
                 left-icon="smile-o"
                 placeholder="请输入手机号" />
      <van-field v-model="user.code"
                 clearable
                 left-icon="music-o"
                 placeholder="请输入验证码">
        <template #button>
          <van-button size="small"
                      round>发送验证码</van-button>
        </template>
      </van-field>
      <van-button type="info"
                  block>信息按钮</van-button>
    </van-cell-group>
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped lang="less"></style>
