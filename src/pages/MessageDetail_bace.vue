<template>
  <div>
    <ul>
      <li>id:{{ $route.params.id }}</li>
      <li>title: {{ detail.title }}</li>
      <li>content: {{ detail.content }}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
const allMessage = [
  {
    id: 1,
    title: "message001",
    content: "message001 content001",
  },
  {
    id: 3,
    title: "message003",
    content: "message002 content002",
  },
  {
    id: 5,
    title: "message005",
    content: "message003 content003",
  },
];
export default {
  props: ["id"],
  data() {
    return {
      detail: {},
    };
  },
  mounted() {
    //此方法，同一个组件对象只执行一次
    //路由组件对象是在第一次请求对应路径时才创建
    //当在同一个路由路径上做切换（只是改了参数），当前路由组件对象被直接复用
    //mounted() 只执行一次
    setTimeout(() => {
      //找到当前Id
      const id = this.$route.params.id * 1; //转换字符串为数值
      this.detail = allMessage.find((item) => item.id === id);
    }, 1000);
  },
  watch: {
    //使用监视语法来解决上面的问题
    $route(to, from) {
      const id = to.params.id * 1; //转换字符串为数值
      this.detail = allMessage.find((item) => item.id === id);
    },
  },
};
</script>

<style scoped>
</style>
