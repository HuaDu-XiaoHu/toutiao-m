<template>
  <van-cell class="article-item">
    <div slot="title"
         class="title van-multi-ellipsis--l3">{{article.title}}</div>
    <div slot="label">
      <div class="cover-warp"
           v-if="article.cover.type===3">
        <div class="cover-warp.item"
             v-for="(img,index) in article.cover.images"
             :key="index">
          <van-image height="73"
                     fit="cover"
                     class="cover-image"
                     :src="img" />
        </div>
      </div>
      <div class="label-warp">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{article.pubdate|relativeTime}}</span>
      </div>
    </div>
    <van-image v-if="article.cover.type===1"
               class="reight-cover"
               height="73"
               fit="cover"
               :src="article.cover.images[0]" />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/ .van-cell-value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .reight-cover {
    width: 116px;
    height: 73px;
  }
  .cover-warp {
    padding: 15px 0;
    display: flex;
    .cover-warp-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-image {
        width: 100%;
        height: 73px;
      }
    }
  }
}
.label-warp {
  font-size: 11px;
  color: #b4b4b4;
}
.label-warp span {
  margin-right: 15px;
}
</style>
