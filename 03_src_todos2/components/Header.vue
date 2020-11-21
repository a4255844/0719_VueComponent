<template>
  <div class="todoheader">
    <input
      type="text"
      placeholder="请输入内容，按回车键确认"
      v-model="title"
      @keyup.enter="add"
    />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  //   props: {
  //     addTodo: Function,
  //   },
  data() {
    return {
      title: "",
    };
  },
  methods: {
    add() {
      /* 根据输入的title封装一个todo对象 */
      const todo = {
        id: Date.now(),
        title: this.title.trim(),
        completed: false,
      };
      if (!todo.title) return;
      //分发自定义事件，触发事件时传递参数
      this.$emit("addTodo", todo);
      // 清除输入框
      this.title = "";
    },
  },
};
</script>

<style scoped>
.todo-container .todoheader input {
  height: 30px;
  width: 580px;
  padding-left: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
}
</style>
