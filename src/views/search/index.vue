<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search v-model="searchText"
                  placeholder="请输入搜索关键词"
                  show-action
                  @search="onSearch(searchText)"
                  @cancel="$router.back()"
                  @focus="isResultshow=false" />
      <!-- 搜索结果 -->
      <search-result v-if="isResultshow"
                     :search-text="searchText" />
      <!-- 联想建议 -->
      <search-suggestion v-else-if="searchText"
                         :search-text="searchText"
                         @search="onSearch" />
      <!-- 历史记录 -->
      <search-history v-else
                      :search-histories="searchHistories"
                      @search="onSearch"
                      @update-histories="searchHistories = $event" />

    </form>
  </div>

</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
// import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'
export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '',
      isResultshow: false,
      searchHistories: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    // 监视搜索历史记录
    searchHistories () {
      setItem('search-histories', this.searchHistories)
    }
  },
  created () {
    this.loadSearchHistories()
  },
  mounted () { },
  methods: {
    // 回车搜索
    onSearch (searchText) {
      // 输入框设置为搜索内容
      this.searchText = searchText
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        // 删除重复项
        this.searchHistories.splice(index, 1)
      }
      // 吧最新数据放到顶部
      this.searchHistories.unshift(searchText)
      // 持久化
      // 如果用户登录,数据放到线上
      // 如果没有登录，放到本地存储
      // setItem('search-history', this.searchHistories)

      // 展示搜索结果
      this.isResultshow = true
    },

    async loadSearchHistories () {
      const searchHistories = getItem('search-histories') || []
      // if (this.user) {
      //   // 已登录，存储到线上
      //   const { data } = await getSearchHistories()
      //   // 数组去重
      //   this.searchHistories = [...new Set([
      //     ...searchHistories,
      //     ...data.data.keywords
      //   ])]
      //   // console.log(data.data.keywords)
      // }
      // 未登录，存储到本地
      // console.log(searchHistories)
      this.searchHistories = searchHistories
    }
  }
}
</script>

<style scoped lang="less">
</style>
