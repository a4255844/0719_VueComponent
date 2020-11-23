<template>
  <div>
    <ul>
      <li v-for="m in messages" :key="m.id">
        <!-- 声明式路由导航 -->
        <router-link :to="'/home/message/detail/' + m.id"
          >{{ m.title }}
        </router-link>
        -- <button @click="pushShow(m.id)">push查看</button> --
        <button @click="replaceShow(m.id)">replace查看</button>
      </li>
    </ul>
    <button @click="$router.back()">返回</button>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      messages: [],
    };
  },
  mounted() {
    setTimeout(() => {
      const messages = [
        {
          id: 1,
          title: "message001",
        },
        {
          id: 3,
          title: "message003",
        },
        {
          id: 5,
          title: "message005",
        },
      ];
      this.messages = messages;
    }, 1000);
  },
  methods: {
    //编程式路由导航
    pushShow(id) {
      console.log(this.$router);
      this.$router.push(`/home/message/detail/${id}`);
    },
    replaceShow(id) {
      this.$router.replace(`/home/message/detail/${id}`);
    },
  },
};
</script>

<style scoped>
</style>
