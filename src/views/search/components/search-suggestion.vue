<template>
  <div class="search-suggestion">
    <van-cell icon="search"
              v-for="(str,index) in suggestions"
              :key="index"
              :title="str">
      <div slot="title"
           v-html="highlight(str)"> </div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [],
      htmlStr: 'Hello<span style="color:red">Word</span>'
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText)
        // console.log(data)
        this.suggestions = data.data.options
      }, 1000),
      // console.log(111)

      immediate: true
    }
  },
  created () { },
  mounted () { },
  methods: {
    highlight (str) {
      // 正则表达式
      return str.replace(
        new RegExp(this.searchText, 'gi'),
        `<span style="color:red">${this.searchText}</span>`
      )
    }
  }
}
</script>

<style scoped lang="less"></style>
