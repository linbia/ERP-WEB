<template>
  <div>
    <div class="container-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <div class="container-action">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="addAction">新增</el-button>
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
              <el-table-column prop="name" label="分区编号"></el-table-column>
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
          <div class="action-type">
            <label>分区名称：</label>
            <el-select size="mini" v-model="areaId" placeholder="请选择分区">
              <el-option
                v-for="item in fenqTableData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
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
            <el-table-column prop="name" label="货架编号"></el-table-column>
            <el-table-column prop="areaId" label="分区编号"></el-table-column>
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
          <div class="action-type">
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
            <el-table-column prop="name" label="货位编号"></el-table-column>
            <el-table-column prop="areaId" label="分区编号"></el-table-column>
            <el-table-column prop="shelvesId" label="货架编号"></el-table-column>
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
    <areaDialog ref="areaDialog" :title="title" :type="type" @getAreasList="getWareAreasList" :fenqTableData="fenqTableData" :huojiaTableData="huojiaTableData"
    @getShelvesesList="getWareShelvesesList" @getWareLocationsList="getWareLocationsList"></areaDialog>
  </div>
</template>

<script>
  import {getWareHousesAreasList, getWareHousesShelvesesList, getWareHousesLocationsList} from '../../api/wareConfig'
  import tableList from './wareConfigCompoent/tableList'
  import areaDialog from '../compoent/areaDialog'
    export default {
        name: "wareConfig",
        components:{
          tableList,
          areaDialog
        },
        data() {
          return {
            totalPage: 300,
            type: '',
            title: '',
            value: '',
            options: [{
              value:'1',
              label:''
            }],
            fenqTableData: [],
            areaId: '',
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
          //新增
          addAction() {
            switch (this.activeName) {
              case 'second':
                this.title = "添加分区"
                this.type = "area"
                break;
              case "third":
                this.title = "添加货架"
                this.type = "shelveses"
                break;
              case "fourth":
                this.title = "添加货位"
                this.type = "location"
                break;
            }
            this.$refs.areaDialog.dialogVisible = true
          },
          //获取仓库分区列表
          getWareAreasList() {
            let parm = {
              pageNum:1,
              pageSize:10000,
              paging:false,
            }
            getWareHousesAreasList(parm).then(res =>{
              this.fenqTableData =  [...res.data.data]
            })
          },
          //获取货架列表
          getWareShelvesesList() {
            let parm = {
              pageNum:1,
              pageSize:10000,
              paging:false,
            }
            getWareHousesShelvesesList(parm).then(res =>{
              this.huojiaTableData =  [...res.data.data]
            })
          },
          //获取货位列表
          getWareLocationsList() {
            let parm = {
              pageNum:1,
              pageSize:10000,
              paging:false,
            }
            getWareHousesLocationsList(parm).then(res =>{
              this.huowTableData =  [...res.data.data]
            })
          },
        },
        mounted(){
          this.getWareAreasList()
          this.getWareShelvesesList()
          this.getWareLocationsList()
        }
    }
</script>

<style scoped lang="scss">
.container-box{
  padding: 10px;
  .container-action{
    margin-bottom: 10px;
  }
  .action-type{
    margin-bottom: 10px;
  }
  .table-box{
    overflow: auto;
    .table-box-content{
      height: calc(100% - 30px);
    }
    .table-box-footer{
      height: auto;
    }
  }
}
</style>
