<template>
  <div>
    <h2>blog列表</h2>
    <ul>
      <Blog v-for="blog in blogs" :key="blog.id" :blog="blog" />
    </ul>
  </div>
</template>

<script>
import Blog from "./Blog";
export default {
  data() {
    return {
      blogs: [
        { id: 1, title: "Blog111" },
        { id: 3, title: "Blog333" },
        { id: 5, title: "Blog555" },
      ],
    };
  },
  components: {
    //注册局部组件，只能当前组件使用
    Blog,
  },
};
</script>

/* 
 scoped : 限制样式只对当前组件有效
 */
<style scoped>
h2 {
  color: red;
}
</style>
