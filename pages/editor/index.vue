<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tag"
                  @keyup.enter="addTag"
                />
                <div class="tag-list">
                  <div class="tag-list">
                    <!-- ngRepeat: tag in $ctrl.article.tagList -->
                    <span
                      class="tag-default tag-pill ng-binding ng-scope"
                      v-for="(tags,idx) in article.tagList"
                      :key="idx"
                    >
                      <i class="ion-close-round" @click="removeTag(tags)"></i>
                      {{tags}}
                    </span>
                    <!-- end ngRepeat: tag in $ctrl.article.tagList -->
                  </div>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onSubmit"
              >Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, getArticle, updateArticle } from "@/api/article";
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: "authenticated",
  name: "EditorIndex",
  data() {
    return {
      tag: "",
      article: {
        title: "",
        description: "",
        body: "",
        tagList: []
      }
    };
  },
  async mounted() {
    const slug = this.$route.params.slug;
    if (slug) {
      const { data } = await getArticle(slug);
      this.article = data.article;
    }
  },
  methods: {
    async onSubmit() {
      const slug = this.$route.params.slug;
      const fn = slug ? updateArticle : createArticle;
      const params = {
        slug,
        article: this.article
      };
      const { data } = await fn(params);
      if (data) {
        this.$router.push(`/article/${data.article.slug}`);
      }
    },
    removeTag(tag) {
      let newArr = this.article.tagList;
      this.article.tagList = newArr.filter(item => item !== tag);
    },
    addTag() {
      this.article.tagList.unshift(this.tag);
      this.tag = "";
    }
  }
};
</script>

<style>
</style>
