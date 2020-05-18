<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search v-model="searchText"
                  placeholder="请输入搜索关键词"
                  show-action
                  @search="onSearch"
                  @cancel="onCancel" />
      <!-- 联想建议 -->
      <search-suggestion />
      <!-- 历史记录 -->
      <search-history />
      <!-- 搜索结果 -->
      <search-result />
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
      searchText: ''
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    // 回车搜索
    onSearch () {
    },
    // 取消
    onCancel () { }
  }
}
</script>

<style scoped lang="less"></style>
