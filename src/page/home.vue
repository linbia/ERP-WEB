<template lang="html">
<div class="home-container">
  <el-row class="container">
    <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="'logo-width'">
              <el-col class="logo-img"></el-col>
              <el-col class="logo-title">{{sysName}}</el-col>
            </el-col>
            <el-col :span="5" class="breadcrumb-container">
              <el-breadcrumb separator="/" class="breadcrumb-inner">
                <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name }}</el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
            <el-col :span="1" class="userinfo">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner">{{sysUserName}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logoutFun">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>

            <el-col :span="3" class="company">
              <el-select size="mini" v-model="wareId" placeholder="请选择仓库">
                <el-option
                  v-for="item in wareList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <i class="el-icon-plus" @click="addAction('ware')"></i>
            </el-col>
            <el-col :span="3" class="company">
              <el-select size="mini" v-model="companyId" placeholder="请选择公司">
                <el-option
                  v-for="item in companyList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <i class="el-icon-plus" @click="addAction('company')"></i>
            </el-col>
        </el-col>
    <el-col :span="24" class="main">
      <aside :class="'menu-expanded'">
        <!--导航菜单-->
       <el-menu :default-active="$route.path" ref="bigmenu" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" unique-opened router>
         <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden && checkContains(item.name)">
           <el-submenu :index="index+''" v-if="!item.single">
             <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
             <el-menu-item v-for="child in item.children" @click="addRouter(child, item.path +'/'+ child.path)" :index="item.path +'/'+ child.path" :key="item.path +'/'+ child.path" v-if="!child.hidden && checkContains(child.name)">{{child.name}}</el-menu-item>
           </el-submenu>
           <router-link v-else v-for="child in item.children" :index="child.path" :key="child.path" :to="child.path">
              <div @click="addRouter(child)" class="single-menu">{{child.name}}</div>
           </router-link>
         </template>
       </el-menu>
     </aside>
     <section class="content-container">
       <div class="grid-content bg-purple-light" >
         <el-row class="nav-tabs">
          <el-col :span="24">
            <el-tag  v-for="(option, index) in arry" class="cus-tab-box" :class="activepath==option.path?'activeTab':''" :key="option.path">
              <div @click="changeRouter(index)">
                <span>{{option.name}}</span>
                <span @click.stop="arry.length!=1 && removeTab(index)"><i class="fa fa-times close-icon" aria-hidden="true"></i></span>
              </div>
            </el-tag>
          </el-col>
         </el-row>
         <el-col :span="24" class="content-wrapper">
           <transition name="fade" mode="out-in">
             <router-view></router-view>
           </transition>
         </el-col>
       </div>
     </section>
   </el-col>
 </el-row>
  <addWareDialog ref="addWareDialog" @getWareList="getWareList" @getCompanyList="getCompanyList" :title="title" :type="type"></addWareDialog>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import * as types from "../store/mutation-types";
import {getWareHousesList} from '../api/wareConfig'
import {getCompanyList} from '../api/company'
import addWareDialog from './compoent/addWareDialog'

export default {
  components: {addWareDialog},
  data() {
    return {
      wareList:[],
      companyList:[],
      companyId: "",
      wareId: "",
      sysName: "管理系统",
      sysUserName: "",
      activepath: "",
      arry: [],
      treeArry: [],
      parm : {
        pageNum:1,
        pageSize:10000,
        paging:false,
      },
      title:'',
      type:'',
    };
  },
  watch: {
    $route(to, from) {
      this.activepath = to.path;
    },
    wareId(newdata, olddata){
      if (newdata) {
        localStorage.setItem('wareId', newdata)
      }
    },
    companyId(newdata, olddata){
      if (newdata) {
        localStorage.setItem('companyId', newdata)
      }
    },
  },
  methods: {
    //添加仓库
    addAction(type){
      if (type === 'ware') {
        this.title = "添加仓库"
        this.type = "ware"
      }else {
        this.title = "添加公司"
        this.type = "company"
      }
      this.$refs.addWareDialog.dialogVisible = true
    },
    //获取仓库列表
    getWareList() {
      getWareHousesList(this.parm).then(res =>{
        this.wareList =  [...res.data.data]
        this.wareId =  this.wareList[0].id
      })
    },
    //获取公司列表
    getCompanyList() {
      getCompanyList(this.parm).then(res =>{
        this.companyList =  [...res.data.data]
        this.companyId =  this.companyList[0].id
      })
    },
    //退出登录
    logoutFun: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem("user");
          _this.$router.push("/login");
        })
        .catch(() => {});
    },
    // 往tab页添加router
    addRouter(data, path) {
      const obj = Object.assign({}, data);
      obj.path = path;
      let add = true;
      for (let i = 0; i < this.arry.length; i++) {
        if (this.arry[i].path == obj.path) {
          add = false;
        }
      }
      if (add) {
        this.arry.push(obj);
      }
      add = true;
      sessionStorage.setItem("tabData", JSON.stringify(this.arry));
    },
    // 操作tab
    changeRouter(index) {
      this.$router.push(this.arry[index].path);
    },
    // 检查树结构是否包含当前节点
    checkContains(name) {
      return true;
      // return this.treeArry.includes(name);
    },
    // 遍历后台返回权限树节点数据
    checkTreeNode(tree) {
      for (var i = 0; i < tree.length; i++) {
        this.treeArry.push(tree[i].name)
        if (tree[i].child && tree[i].child.length > 0) {
          this.checkTreeNode(tree[i].child);
        }
      }
    },
    // remove Tab
    removeTab(index) {
      this.arry.splice(index, 1);
      if (index == 0) {
        this.$router.push(this.arry[0].path);
      } else {
        this.$router.push(this.arry[index - 1].path);
      }
      sessionStorage.setItem("tabData", JSON.stringify(this.arry));
    },
    ...mapMutations({
      setTabData: types.SET_TABDATA
    })
  },
  created() {
    this.checkTreeNode(this.treeData);
    if (JSON.parse(sessionStorage.getItem("tabData"))) {
      this.arry = JSON.parse(sessionStorage.getItem("tabData"));
      this.activepath = this.$route.path;
    } else {
      let obj = {};
      obj.path = this.$route.path;
      obj.name = this.$route.name;
      this.activepath = this.$route.path;
      this.arry.push(obj);
    }
    if (this.userName) {
      this.sysUserName = this.userName;
    } else {
      this.sysUserName = "admin";
    }
  },
  computed: {
    ...mapGetters(["username", "password", "treeData"])
  },
  mounted() {
    this.getWareList()
    this.getCompanyList()
    var user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.userName || "";
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/them.scss";
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .header {
    height: 50px;
    line-height: 50px;
    background: $globalColor;
    color: #fff;

    .company{
      text-align: right;
      float: right;
    }
    .userinfo {
      float: right;
      text-align: right;
      padding-right: 20px;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
      }
    }
    .logo {
      height: 50px;
      font-size: 22px;
      padding-left: 20px;
      border-color: $borderColor;
      border-right-width: 1px;
      border-right-style: solid;
    }
    .logo-width {
      text-align: right;
      width: 180px;
      color: $baseColor;
      .logo-img {
        display: inline-block;
        width: 40px;
        height: 40px;
        margin-top: 5px;
        background-image: url("../assets/img/element-ui.svg");
        background-size: cover;
      }
      .logo-title {
        display: inline-block;
        line-height: 50px;
        width: 100px;
        height: 50px;
      }
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 50px;
    bottom: 0;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 60px;
        background: $globalColor;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 180px;
      width: 230px;
    }
    .single-menu {
      height: 40px;
      line-height: 40px;
      padding-left: 45px;
      color: #fff;
      background-color: $baseColor;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
      .grid-content{
        height: 100%;
      }
      .nav-tabs {
        font-size: 12px;
        border-bottom: 1px solid #e4e7ed;
        .cus-tab-box {
          display: inline-block;
          margin: 5px 0px 5px 5px;
          padding: 3px 10px;
          border: 1px solid #ccc;
          border-radius: 2px;
          cursor: pointer;
        }
        .activeTab {
          background-color: $baseColor;
          color: #fff;
          border-color: #fff;
        }
        .close-icon {
          transform: rotate(0deg);
          transition: transform 1s;
        }
        .close-icon:hover {
          transform: rotate(180deg);
        }
      }
      .content-wrapper {
        height: calc(100% - 43px);
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
  .breadcrumb-container {
    margin-top: 20px;
    margin-left: 20px;
  }
}
</style>
