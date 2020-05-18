<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search v-model="searchText"
                  placeholder="请输入搜索关键词"
                  show-action
                  @search="onSearch"
                  @cancel="$router.back()"
                  @focus="isResultshow=false" />
      <!-- 搜索结果 -->
      <search-result v-if="isResultshow"
                     :search-text="searchText" />
      <!-- 联想建议 -->
      <search-suggestion v-else-if="searchText"
                         :search-text="searchText" />
      <!-- 历史记录 -->
      <search-history v-else />

    </form>
  </div>

</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
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
      isResultshow: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    // 回车搜索
    onSearch () {
      // 展示搜索结果
      this.isResultshow = true
    }
  }
}
</script>

<style scoped lang="less">
</style>
