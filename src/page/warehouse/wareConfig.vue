<template>
  <div class="container-box">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <div class="container-action">
        <el-button type="primary" icon="el-icon-plus" size="mini" >新增</el-button>
        <el-button type="primary" icon="el-icon-delete" size="mini" >删除</el-button>
      </div>

      <el-tab-pane label="分区管理" name="second" style="height: 100%">
        <div class="table-box">
          <el-table
            class="table-box-content"
            :data="fenqTableData"
            size="mini"
            border
          >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column prop="address" label="分区编号"></el-table-column>
            <el-table-column prop="number" label="启用数量" width="80"></el-table-column>
            <el-table-column prop="number" label="货架数量" width="80"></el-table-column>
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
      </el-tab-pane>
      <el-tab-pane label="货架管理" name="third">
        <div>
          <label>分区名称：</label>
          <el-select size="mini" v-model="value" placeholder="请选择分区">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-table
          class="table-box-content"
          :data="huojiaTableData"
          size="mini"
          border
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column prop="address" label="货架编号"></el-table-column>
          <el-table-column prop="address" label="分区编号"></el-table-column>
          <el-table-column prop="number" label="启用数量" width="80"></el-table-column>
          <el-table-column prop="address" label="货位数量"></el-table-column>
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
      </el-tab-pane>
      <el-tab-pane label="货位管理" name="fourth">
        <div>
          <label>分区名称：</label>
          <el-select size="mini" v-model="value" placeholder="请选择分区">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <label>货架名称：</label>
          <el-select size="mini" v-model="value" placeholder="请选择货架">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <el-table
          class="table-box-content"
          :data="huowTableData"
          size="mini"
          border
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column prop="address" label="货位编号"></el-table-column>
          <el-table-column prop="address" label="分区编号"></el-table-column>
          <el-table-column prop="address" label="货架编号"></el-table-column>
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import tableList from './wareConfigCompoent/tableList'
    export default {
        name: "wareConfig",
      comments:{
        tableList
      },
        data() {
          return {
            totalPage: 300,
            fenqTableData: [],
            huojiaTableData: [],
            huowTableData: [],
            activeName: 'second'
          };
        },
        methods:{
          handleClick(row) {
            console.log(row);
          },
          receivePageSize(val) {
            console.log(val);
          },
          receiveCurrentPage(val) {
            console.log(val);
          },
        }
    }
</script>

<style scoped lang="scss">
.container-box{
  padding: 10px;
  .container-action{
    margin-bottom: 10px;
  }
  .table-box{

  }
  .table-box-content{
    margin-top: 15px;
    height: calc(100% - 30px);
  }
  .table-box-footer{
    height: 50px;
  }
}
</style>
