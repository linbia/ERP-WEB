<template>
<div class="container-box">
  <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
  import {warehouses} from '../../api/common.js'
export default {
  data() {
    return {
        activeName: 'second'
    };
  },
  methods: {
    handleClick(tab, event) {
      let parm = {
        pageNum:1,
        pageSize:1,
        paging:true,
      }
      warehouses(parm).then()
        console.log(tab, event);
    }
  }
};
</script>

<style lang="css">
</style>
