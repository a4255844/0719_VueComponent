<template>
  <div>
    <div data-v-1169805f="" class="col-xs-offset-2 col-xs-8">
      <div data-v-1169805f="" class="page-header">
        <h2 data-v-1169805f="">Router Basic - 01</h2>
      </div>
    </div>
    <div data-v-1169805f="" class="row">
      <div data-v-1169805f="" class="col-xs-2 col-xs-offset-2">
        <div data-v-1169805f="" class="list-group">
          <!-- 路由链接 -->
          <router-link class="list-group-item" to="/about">About</router-link>
          <router-link class="list-group-item" to="/home">Home</router-link>
        </div>
      </div>
      <div data-v-1169805f="" class="col-xs-6">
        <div data-v-1169805f="" class="panel">
          <div data-v-1169805f="" class="panel-body">
            <!-- 在此显示当前路由组件
                 当前：与请求的路径匹配的路由
             -->
            <keep-alive exclude="About">
              <!-- 对指定的路由组件不做缓存处理 -->
              <router-view></router-view>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {};
</script>

<style scoped>
</style>

