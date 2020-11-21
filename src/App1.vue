<template>
  <div>
    <h1 v-if="!repoName">loading...</h1>
    <h2 v-else>
      most star repo is
      <a :href="repoUrl">{{ repoName }}</a>
    </h2>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
export default {
  data() {
    return {
      repoName: "",
      repoUrl: "",
    };
  },
  mounted() {
    //利用axios发送ajax请求
    axios
      .get("https://api.github.com/search/repositories?q=v&sort=stars")
      /*  params:{    参数对象的形式
             q: 'v',
             sort: 'stars'
      } 
       
      */
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          const { name, html_url } = response.data.items[0];
          this.repoName = name;
          this.repoUrl = html_url;
        }
      })
      .catch((err) => alert(err));
  },
};
</script>

<style scoped>
</style>
