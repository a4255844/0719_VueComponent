<template>
  <div class="todo-container">
    <h1>todoList</h1>
    <!-- 自定义事件的方式，子组件向父组件进行通信 -->
    <!-- <Header @addTodo="addTodo" /> -->
    <Header ref="header" />
    <List :todos="todos" />
    <Footer
      :todos="todos"
      :removeCompletedTodos="removeCompletedTodos"
      :checkAll="checkAll"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import Header from "@/components/Header";
import List from "./components/List";
import Footer from "@/components/Footer";
import PubSub from "pubsub-js";
import { saveTodos, readTodos } from "@/utils/storageUtils.js";
export default {
  data() {
    return {
      todos: [],
    };
  },
  mounted() {
    setTimeout(() => {
      // this.todos = JSON.parse(localStorage.getItem("todos_key")) || [];  //两种方式
      // this.todos = JSON.parse(localStorage.getItem("todos_key") || "[]");
      this.todos = readTodos();
    }, 1000);
    //通过ref标识ID来绑定事件监听
    this.$refs.header.$on("addTodo", this.addTodo);
    //通过全局事件总线绑定事件监听
    this.$globalEventBus.$on("deleteTodo", this.deleteTodo);
    PubSub.subscribe("updateTodo", (msg, { todo, isCheck }) => {
      // this.updateTodo(todo, isCheck);
      todo.completed = isCheck;
    });
  },
  components: {
    Header,
    List,
    Footer,
  },

  methods: {
    //   函数方法写在methods内
    addTodo(todo) {
      this.todos.unshift(todo);
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
    removeCompletedTodos() {
      this.todos = this.todos.filter((todo) => todo.completed === false);
    },
    checkAll(isCheckAll) {
      this.todos.forEach((todo) => (todo.completed = isCheckAll));
    },
    //  updateTodo(todo, isCheck) {
    //    todo.completed = isCheck;
    //  },
  },
  watch: {
    //监视todos数组内全部层次的数据，如果发生变化，就保存到local
    todos: {
      deep: true, //开启监视全部层次的数据（深度监视）
      // handler(value) {
      //   //最新的todos值
      //   //将todos保存到local中(以json的形式)
      //   //   localStorage.setItem("todos_key", JSON.stringify(value));
      //   saveTodos(value);
      // },
      handler: saveTodos,
    },
  },
  beforeDestroy() {
    //在组建销毁前，移除绑定事件监听
    this.$refs.header.$off("addTodo");
    this.$globalEventBus.$off("deleteTodo");
  },
};
</script>

<style scoped>
.todo-container {
  width: 590px;
  margin: 50px auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
