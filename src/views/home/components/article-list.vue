<template>
  <div class="article-list">

    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <van-cell v-for="(article,index) in articles"
                :key="index"
                :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  components: {},
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      // 获取下一页数据的时间戳
      timestamp: null
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      //  1.请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        //  时间戳
        timestamp: this.timestamp || Date.now(),
        //  是否包含置顶
        with_top: 1
      })
      // console.log(data)
      // 2.把数据放到list数组中
      const { results } = data.data
      this.articles.push(...results)
      // 3.加载状态结束
      this.loading = false
      // 4.数据全部加载完成
      // 判断是否还有数据，如果邮，更新获取下一页数据，如果没有，把加载状态设置结束
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow: auto;
}
</style>
