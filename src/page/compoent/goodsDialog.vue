<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="type === 'product' ? '50%' : '30%'">
    <el-form :model="form" label-position="right" >
      <el-form-item :label="nameLabel" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
        <!--<el-select v-model="form.areaId" placeholder="请选择分区">
          <el-option :label="item.name" :value="item.id"  :key="item.id" v-for="(item, index) in fenqTableData"></el-option>
        </el-select>-->
      </el-form-item>
      <el-form-item  v-if="type === 'product'"  label="产品编号" :label-width="formLabelWidth">
        <el-input v-model="form.identifier" autocomplete="off"></el-input>
        <!--<el-select v-model="form.areaId" placeholder="请选择分区">
          <el-option :label="item.name" :value="item.id"  :key="item.id" v-for="(item, index) in fenqTableData"></el-option>
        </el-select>-->
      </el-form-item>

      <el-form-item  v-if="type === 'product'"  label="产品分类" :label-width="formLabelWidth">
        <el-select v-model="form.areaId" placeholder="请选择分区">
          <el-option :label="item.name" :value="item.id"  :key="item.id" v-for="(item, index) in fenqTableData"></el-option>
        </el-select>
      </el-form-item>
      <div></div>
      <el-form-item  v-if="type === 'product'"  label="产品规格" :label-width="formLabelWidth">
        <el-select v-model="form.areaId" placeholder="请选择规格">
          <el-option :label="item.name" :value="item.id"  :key="item.id" v-for="(item, index) in fenqTableData"></el-option>
        </el-select>
        <el-checkbox-group
          v-model="checkedCities"
          :min="1"
          :max="2">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item  v-if="type === 'product'"  label="产品规格" :label-width="formLabelWidth">
        <el-select v-model="form.areaId" placeholder="请选择规格">
          <el-option :label="item.name" :value="item.id"  :key="item.id" v-for="(item, index) in fenqTableData"></el-option>
        </el-select>
        <el-checkbox-group
          v-model="checkedCities"
          :min="1"
          :max="2">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="type === 'specifcation'" label="规格类型" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.specNameList" placeholder="规格类型请用空格逗号分隔，例如（红色  蓝色 ....）"></el-input>
      </el-form-item>
     <!-- <el-form-item v-if="type !== 'area'" label="分区" :label-width="formLabelWidth">
        <el-select v-model="form.areaId" placeholder="请选择分区">
          <el-option :label="item.name" :value="item.id"  :key="item.id" v-for="(item, index) in fenqTableData"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="type === 'location'" label="货位" :label-width="formLabelWidth">
        <el-select v-model="form.shelvesId" placeholder="请选择货位">
          <el-option :label="item.name" :value="item.id"  :key="item.id" v-for="(item, index) in huojiaTableData"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="type === 'area' ? '分区编号': type === 'shelveses' ? '货架编号': '货位编号'" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="type === 'area' ? '分区名称': type === 'shelveses' ? '货架名称': '货位名称'" :label-width="formLabelWidth">
        <el-input v-model="form.areaName" autocomplete="off"></el-input>
      </el-form-item>-->

      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input  type="textarea"  v-model="form.description" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addButton">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {addClassifications,addSpecs,addProducts,addSpecsGroups} from '../../api/goods'
  export default {
    name: "goodsDialog",
    props:{
      title:'',
      type:'',
      fenqTableData:[],
      huojiaTableData:[],
    },
    data() {
      return {
        dialogVisible: false,
        form: {},
        formLabelWidth: '80px',
        checkedCities: ['上海', '北京'],
        cities:['上海', '北京', '广州', '深圳','红色','红色','红色']
      };
    },
    computed:{
      nameLabel (){
        if (this.type === 'type') {
          return '类型名称'
        }else if(this.type === 'specifcation'){
          return '规格组名称'
        }else if(this.type === 'product'){
          return '产品名称'
        }
      },
    },
    methods: {
      //添加仓库
      addButton(){
        console.log(this.form)
        let param =  {
          ...this.form,
          companyId : Number(localStorage.getItem("companyId")),
          warehouseId : Number(localStorage.getItem("warehouseId"))
        }
        if (this.type === 'type') {
          addClassifications({ productClassification:param}).then(res =>{
            this.dialogVisible =  false
            this.$emit('getClassificationsList')
          })
        } else if(this.type === 'specifcation'){
          let productSpecGroup = {
            name: this.form.name,
            specNameList:this.form.specNameList.split(" ").filter(item => item)
          }
          addSpecsGroups({ productSpecGroup:productSpecGroup}).then(res =>{
            this.dialogVisible =  false
            this.$emit('getSpecsGroupsList')
          })
        }else if(this.type === 'product'){
          addProducts({ warehouseLocation:param}).then(res =>{
            this.dialogVisible =  false
            this.$emit('getWareLocationsList')
          })
        }
        this.form = {}
      },
    }

  }
</script>

<style scoped>

</style>
