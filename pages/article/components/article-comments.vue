<template>
  <div>
    <form class="card comment-form" @submit.prevent="onSubmit">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="comment.body"
        ></textarea>
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>&nbsp;
        <nuxt-link
          class="comment-author"
          :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }"
        >{{ comment.author.username }}</nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComments } from "@/api/article";

export default {
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      comment: {
        body: ""
      },
      comments: [] // 文章列表
    };
  },
  async mounted() {
    const { data } = await getComments(this.article.slug);
    this.comments = data.comments;
  },
  methods: {
    async onSubmit() {
      if (!this.comment) return;
      const { data } = await addComments(this.article.slug, {
        comment: this.comment
      });
      this.comments.unshift(data)
    }
  }
};
</script>

<style>
</style>
