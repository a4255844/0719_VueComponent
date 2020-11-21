<template>
  <div>
    <section class="jumbotron">
      <h3 class="jumbotron-heading">Search Github Users</h3>
      <div>
        <input
          type="text"
          placeholder="enter the name you search"
          v-model="searchName"
        />
        <button @click="search">Search</button>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      searchName: "",
    };
  },
  methods: {
    search() {
      if (!this.searchName.trim()) return;
      this.$globalEventBus.$emit("searchUser", this.searchName);
    },
  },
};
</script>

<style scoped>
</style>
