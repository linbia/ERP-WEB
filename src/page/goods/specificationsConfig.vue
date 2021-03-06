
<template>
  <div class="container-box">
    <div class="container-right">
      <div class="form-box">

        <el-row class="input-box" :gutter="20">
          <el-col :span="6" class="input-label">
            <el-button type="primary" icon="el-icon-plus" size="mini" >新增</el-button>
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
          <el-table-column prop="identifier" label="公司" width="180"></el-table-column>
          <el-table-column prop="name" label="规格组" ></el-table-column>
          <el-table-column prop="description" label="规格组描述"></el-table-column>
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
        <!-- <pagination
           class="table-box-footer"
           @sendPageSize="receivePageSize"
           @sendCurrentPage="receiveCurrentPage"
           :totalPage="totalPage"
         ></pagination>-->
      </div>
    </div>

  </div>
</template>
<script>
  import {getSpecs} from '../../api/goods'
  //import pagination from "common/pagination";
  export default {
    data() {
      return {
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        totalPage: 300,
        tableData:[],
        options: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          },
          {
            value: "选项3",
            label: "蚵仔煎"
          },
          {
            value: "选项4",
            label: "龙须面"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ],
        value: "",
        input2: "",
        DateValue: ""
      };
    },
    methods: {
      //查询产品规格
      getSpecsList() {
        getSpecs().then(res =>{
          this.tableData =  [...res.data.data]
        })
      },
      receivePageSize(val) {
        console.log(val);
      },
      receiveCurrentPage(val) {
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
    },
    mounted(){
      this.getSpecsList()
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
        height: calc(100% - 100px);
        overflow: auto;
        padding: 10px;
        .table-box-content{
          height: calc(100% - 30px);
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
