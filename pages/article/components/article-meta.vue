<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }"
      >{{ article.author.username }}</nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <!-- 编辑 -->
    <template v-if="isMine">
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{
        active: article.author.following
      }"
        @click="editArticle"
      >
        <i class="ion-edit"></i>
        &nbsp;
        Edit Article
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-danger"
        :class="{
        active: article.favorited
      }"
      >
        <i class="ion-trash-a"></i>
        &nbsp;
        Delete Article
      </button>
    </template>
    <template v-else>
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{
        active: article.author.following
      }"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        Follow Eric Simons
        <span class="counter">({{article.favoritesCount}})</span>
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{
        active: article.favorited
      }"
      >
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post
        <span
          class="counter"
        >({{article.favoritesCount}})</span>
      </button>
    </template>
  </div>
</template>

<script>
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    isMine() {
      const username = this.$store.state.user.username;
      return this.article.author.username === username;
    }
  },
  methods: {
    editArticle() {
      this.$router.push(`/editor/${this.article.slug}`)
    }
  }
};
</script>

<style>
</style>
