<template>
  <div class="row">
    <h1 v-if="firstView">请输入关键字进行搜索</h1>
    <h2 v-else-if="isLoding">Loding...</h2>
    <div
      class="card"
      v-else-if="users"
      v-for="user in users"
      :key="user.userName"
    >
      <a :href="user.html_url" target="_blank">
        <img :src="user.avatar_url" style="width: 100px" />
      </a>
      <p class="card-text">{{ user.userName }}</p>
    </div>
    <h1 v-else>{{ isErr }}</h1>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
export default {
  data() {
    return {
      firstView: true,
      isLoding: false,
      users: "",
      isErr: "",
    };
  },
  mounted() {
    this.$globalEventBus.$on("searchUser", async (searchName) => {
      this.firstView = false;
      this.isLoding = true;
      try {
        const response = await axios("/api/search/users", {
          params: { q: searchName },
        });
        let result = response.data;
        this.isLoding = false;
        this.users = result.items.map((item) => ({
          html_url: item.html_url,
          avatar_url: item.avatar_url,
          userName: item.login,
        }));
      } catch (error) {
        this.isLoding = false;
        this.isErr = error.message;
      }
    });
  },
  beforeDestroy() {
    this.$globalEventBus.$off("searchUser");
  },
};
</script>

<style scoped>
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>
