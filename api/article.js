import { request } from "@/plugins/request";

// 获取公共文章列表
export const getArticles = params => {
  return request({
    method: "GET",
    url: "/api/articles",
    params
  });
};

// 获取公共文章列表
export const getYourFeedArticles = params => {
  return request({
    method: "GET",
    url: "/api/articles/feed",
    params
    // headers: {
    //   // 添加用户身份，数据格式：Token空格Token数据
    //   Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmMxNzI4ZTAwYjI1MjhiMmJmZDYzNyIsInVzZXJuYW1lIjoiZmFueGlhbmd5dTY2IiwiZXhwIjoxNjE1NjIzMjY5LCJpYXQiOjE2MTA0MzkyNjl9.v2MttH5Qd3W0_ssnFtcXOeTPMSDHr6YBM06106Fh1yg`
    // }
  });
};

// 添加点赞
export const addFavorite = slug => {
  return request({
    method: "POST",
    url: `/api/articles/${slug}/favorite`
  });
};

// 取消点赞
export const deleteFavorite = slug => {
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}/favorite`
  });
};

// 获取文章详情
export const getArticle = slug => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}`
  });
};

// 获取文章评论
export const getComments = slug => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}/comments`
  });
};
// 评论文章
export const addComments = (slug, data) => {
  return request({
    method: "POST",
    url: `/api/articles/${slug}/comments`,
    data
  });
};
// 添加文章
export const createArticle = data => {
  return request({
    method: "POST",
    url: `/api/articles`,
    data
  });
};
// 编辑文章
export const updateArticle = (data) => {
  return request({
    method: "PUT",
    url: `/api/articles/${data.slug}`,
    data
  });
};
