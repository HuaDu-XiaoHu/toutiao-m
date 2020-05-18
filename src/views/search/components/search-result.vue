<template>
  <div class="search-result">
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <van-cell v-for="(article,index) in list"
                :key="index"
                :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 页码
      perPage: 20 // 每页大小
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onLoad () {
      // 请求获取参数
      const { data } = await getSearchResult({
        page: this.page,
        per_page: this.perPage,
        q: this.searchText
      })
      // console.log(data)
      // 2.讲数据放到数据列表中
      const { results } = data.data
      this.list.push(...results)
      // 3.关闭loading
      this.loading = false
      // 4.判断是否还有数据
      if (results.length) {
        // 有数据
        this.page++
      } else {
        // 没有数据
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-result {
  position: fixed;
  left: 0;
  top: 54px;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>
