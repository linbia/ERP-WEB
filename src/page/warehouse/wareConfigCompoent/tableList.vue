<template>
  <div>
    <el-table
      class="table-box-content"
      :data="tableData"
      size="mini"
      border
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column :prop="item.data" :label="item.label" width="180" v-for="(item, index) in tableColumn" :key="item.data"></el-table-column>
     <!-- <el-table-column prop="name" label="仓库" width="180"></el-table-column>
      <el-table-column prop="address" label="分区名称"></el-table-column>-->
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button type="text" size="small" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      class="table-box-footer"
      @sendPageSize="receivePageSize"
      @sendCurrentPage="receiveCurrentPage"
      :totalPage="totalPage"
    ></pagination>
  </div>
</template>

<script>
    export default {
        name: "tableList",
        props:{
          tableData:[],
          tableColumn:[],
        },
        methods:{
          handleClick(row) {
            console.log(row);
          }
        }
    }
</script>

<style scoped>

</style>
