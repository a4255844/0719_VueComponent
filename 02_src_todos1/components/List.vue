<template>
  <div>
    <ul class="todo-main">
      <Item
        v-for="(todo, index) in todos"
        :key="todo.id"
        :todo="todo"
        :deleteTodo="deleteTodo"
        :index="index"
        :updateTodo="updateTodo"
      />
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import Item from "./Item";
//声明接收数据props
export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
    deleteTodo: {
      type: Function,
    },
    updateTodo: {
      type: Function,
    },
  },
  components: {
    Item,
  },
};
</script>

<style scoped>
</style>
