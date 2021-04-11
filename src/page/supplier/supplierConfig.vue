<template>
  <div class="container-box">
    <div class="container-right">
      <div class="form-box">
        <el-row class="input-box" :gutter="20">
          <el-col :span="6" class="input-label">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="addAction">新增</el-button>
            <el-button type="primary" icon="el-icon-delete" size="mini" >删除</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table-box">
        <el-table
          class="table-box-content"
          :data="tableData"
          size="mini"
          border
        >
          <el-table-column label="客户类型" width="180">
            <template slot-scope="scope">
              <span> {{scope.row.category ? "个人" : '公司'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" ></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column label="地址">
            <template slot-scope="scope">
              <span> {{scope.row.province + scope.row.city + scope.row.area + scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small" icon="el-icon-edit">编辑</el-button>
              <el-popconfirm
                confirm-button-text='确定'
                cancel-button-text='取消'
                icon="el-icon-info"
                @confirm="deleteSuppiler(scope.row)"
                icon-color="red"
                title="确定删除该供应商吗？"
              >
                <el-button slot="reference" type="text" size="small" icon="el-icon-delete">删除</el-button>
              </el-popconfirm>
             <!-- <el-popover
                placement="top"
                trigger="click"
                width="160"
                v-model="visible">
                <p>确定删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteSuppiler(scope.row)">确定</el-button>
                </div>
                <el-button slot="reference" type="text" size="small" icon="el-icon-delete">删除</el-button>
              </el-popover>-->
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
    </div>
    <suppiler-dialog ref="suppilerDialog" :title="title" :type="type" @getSupplierList="getSupplierList" ></suppiler-dialog>
  </div>
</template>
<script>
  import {getSupplyList, deleteSupplyList} from '../../api/supplier'
  import suppilerDialog from "../compoent/suppilerDialog";
  import pagination from "common/pagination";
  export default {
    data() {
      return {
        visible: false,
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        totalPage: 30,
        pageNum: 1,
        pageSize: 20,
        type: '',
        title: '',
        tableData:[],
        value: "",
        input2: "",
        DateValue: ""
      };
    },
    methods: {
      //查询供应商
      getSupplierList() {
        let param = {
          pageNum : this.pageNum,
          pageSize : this.pageSize,
          paging : true,
        }
        getSupplyList(param).then(res =>{
          this.tableData =  [...res.data.data]
          this.totalPage = res.data.totalCount
        })
      },
      //新增
      addAction() {
        this.title = "添加供应商"
        this.type = "supplier"
        this.$refs.suppilerDialog.dialogVisible = true
      },
      //删除
      deleteSuppiler(row){
        deleteSupplyList(row.id).then(res =>{
          this.getSupplierList()
        })
      },
      receivePageSize(val) {
        this.pageNum = val
        console.log(val);
      },
      receiveCurrentPage(val) {
        this.pageSize = val
        console.log(val);
      },
      // 修改table header的背景色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return "background-color: #F7F6Fd;color: #B6B5C2;font-weight: 500;";
        }
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    },
    watch: {
      DateValue(newval, oldval) {
        console.log(newval);
        console.log(oldval);
      },
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    components: {
      suppilerDialog,
      pagination
    },
    mounted(){
      this.getSupplierList()
    }
  };
</script>

<style scoped lang="scss">
  @import "../../assets/css/them";
  .container-box {
    height: 100%;
    display: flex;
    .container-left{
      height: 100%;
      width: 200px;
      padding: 15px;
      border-right:1px solid  #ccc;
      overflow: auto;
    }
    .container-right{
      height: 100%;
      width:   100%;
      .form-box {
        height: 35px;
        padding: 10px;
        border-bottom: 1px solid #ccc;
        .input-box {
          margin-bottom: 20px;
        }
        .input-label div {
          padding: 0px !important;
        }
        .input-label .label {
          margin-top: 4px;
        }
      }
      .table-box{
        height: calc(100% - 80px);
        overflow: auto;
        padding: 10px;
        .table-box-content{
          height: calc(100% - 45px);
        }
        .table-box-footer{
          height: auto;
        }
      }
      .button-box {
        margin: 50px;
      }
    }

  }
</style>
