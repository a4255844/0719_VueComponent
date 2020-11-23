<template>
  <div>
    <Button type="danger" @click="test">mint-ui 测试</Button>
  </div>
</template>

<script type="text/ecmascript-6">
import { Button, Toast } from "mint-ui";
export default {
  components: {
    Button,
  },
  methods: {
    test() {
      Toast({
        message: "提示", //提示文本
        position: "bottom", //位置
        duration: 1000, //显示时间
      });
    },
  },
};
</script>

<style scoped>
</style>

