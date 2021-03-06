<template>
  <div class="container-box">
    <!--<div class="container-left">
      <el-input
        size="mini"
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>

      <el-tree
        class="filter-tree"
        :data="data"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree">
      </el-tree>

    </div>-->
    <div class="container-right">
      <div class="form-box">

        <el-row class="input-box" :gutter="20">
          <!-- <el-col :span="5" class="input-label">
             <el-col :span="6" class="label">仓库名称：</el-col>
             <el-col :span="16">
               <el-select size="mini" v-model="value" placeholder="请选择仓库名称">
                 <el-option
                   v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value"
                 ></el-option>
               </el-select>
             </el-col>
           </el-col>-->
          <el-col :span="5" class="input-label">
            <el-col :span="6" class="label">规格名称：</el-col>
            <el-col :span="16">
              <el-select size="mini" v-model="value" placeholder="请选择分区">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="5" class="input-label">
            <el-col :span="6" class="label">分类：</el-col>
            <el-col :span="16">
              <el-select size="mini" v-model="value" placeholder="请选择货架">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <!--<el-col :span="5" class="input-label">
            <el-col :span="6" class="label">货位：</el-col>
            <el-col :span="16">
              <el-select size="mini" v-model="value" placeholder="请选择货位">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>-->
        </el-row>
        <el-row class="input-box" :gutter="20">
          <el-col :span="6" class="input-label">
            <el-button type="primary" icon="el-icon-plus" size="mini" >新增</el-button>
            <el-button type="primary" icon="el-icon-delete" size="mini" >删除</el-button>
          </el-col>
          <!--<el-col :span="6" class="input-label">
            <el-col :span="8" class="label">推送日期：</el-col>
            <el-col :span="16">
              <el-date-picker
                v-model="DateValue"
                size="mini"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy 年 MM 月 dd 日 HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                align="right"
              ></el-date-picker>
            </el-col>
          </el-col>-->
        </el-row>
        <!--  <el-row class="input-box" :gutter="20">
            <el-col :span="6" class="input-label">
              <el-col :span="8" class="label">运单号：</el-col>
              <el-col :span="16">
                <el-input placeholder="请输入运单号" size="mini" v-model="input2"></el-input>
              </el-col>
            </el-col>
            <el-col :span="6" class="input-label">
              <el-col :span="8" class="label">推送日期：</el-col>
              <el-col :span="16">
                <el-date-picker
                  v-model="DateValue"
                  size="mini"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy 年 MM 月 dd 日 HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  align="right"
                ></el-date-picker>
              </el-col>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6" class="input-label">
              <el-col :span="8" class="label">订单编号：</el-col>
              <el-col :span="16">
                <el-input
                  type="textarea"
                  :rows="1"
                  placeholder="请输入运单号，多个订单号之间用逗号隔开"
                  size="mini"
                  v-model="input2"
                  style="width:500px"
                ></el-input>
              </el-col>
            </el-col>
          </el-row>-->
      </div>
      <div class="table-box">
        <el-table
          class="table-box-content"
          :data="tableData"
          size="mini"
          border
        >
          <el-table-column prop="companyId" label="公司名称" width="180"></el-table-column>
          <el-table-column prop="image" label="图片" width="180"></el-table-column>
          <el-table-column prop="name" label="商品名称"></el-table-column>
          <el-table-column prop="description" label="描述"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
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
    </div>

  </div>
</template>
<script>
  import {getProducts} from '../../api/goods'
  import pagination from "common/pagination";
  export default {
    data() {
      return {
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        totalPage: 300,
        tableData: [],
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
      getProductsList() {
        getProducts().then(res =>{
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
      pagination
    },
    mounted(){
      this.getProductsList()
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
        height: 80px;
        padding: 10px 20px;
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
        height: calc(100% - 145px);
        padding: 20px;
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
