<template>
  <div>
    <li
      :style="{ background: bgColor }"
      @mouseenter="handleEnter(true)"
      @mouseleave="handleEnter(false)"
    >
      <label>
        <input type="checkbox" v-model="isCompleted" />
        <span>{{ todo.title }}</span>
        <button class="btn" v-show="isShow" @click="delTodo">删除</button>
      </label>
    </li>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    todo: Object,
    deleteTodo: Function,
    index: Number,
    updateTodo: Function,
  },
  data() {
    return {
      isShow: false,
      bgColor: "#ffffff",
    };
  },
  computed: {
    isCompleted: {
      get() {
        return this.todo.completed;
      },
      set(value) {
        this.updateTodo(this.todo, value);
      },
    },
  },
  methods: {
    handleEnter(isEnter) {
      if (isEnter) {
        this.bgColor = "#aaaaaa";
        this.isShow = true;
      } else {
        this.bgColor = "#ffffff";
        this.isShow = !this.isShow;
      }
    },
    delTodo() {
      if (window.confirm("确认删除吗?")) {
        this.deleteTodo(this.index);
      }
    },
  },
};
</script>

<style scoped>
.todo-main input {
  margin-left: 10px;
}

li {
  list-style: none;
  height: 36px;
  width: 100%;
  line-height: 36px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
}
li button {
  float: right;
  margin: 6px 10px 0 0;
}
</style>
