<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheckAll" />
    </label>
    <span>
      <span>已完成{{ count }}</span> / 全部{{ todos.length }}
    </span>
    <button class="btn" v-show="count > 0" @click="removeCompletedTodos">
      清除已完成任务
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    todos: Array, //data数据
    removeCompletedTodos: Function, //删除已完成的todos
    checkAll: Function, //改变总复选框对应的状态
  },
  computed: {
    count() {
      // let num = null;
      // this.todos.forEach((item) => {
      //   if (item.completed) num++;
      // });
      // return num;
      return this.todos.reduce(
        (preTotal, todo, index) => preTotal + (todo.completed ? 1 : 0),
        0
      );
    },
    isCheckAll: {
      //如果list复选框被全选中则总全选也选中
      get() {
        return this.todos.length === this.count && this.count > 0;
      },
      //如果总全选框未选中或选中，改变List复选框的状态
      set(value) {
        this.checkAll(value);
      },
    },
  },
};
</script>

<style scoped>
.todo-footer input {
  margin-left: 10px;
  margin-right: 20px;
}

.todo-footer .btn {
  float: right;
}
</style>
