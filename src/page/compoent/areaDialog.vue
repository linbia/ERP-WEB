<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%">
    <el-form :model="form" label-position="right" >
      <el-form-item v-if="type !== 'area'" label="分区" :label-width="formLabelWidth">
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
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input v-model="form.description" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addButton">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {addWareHousesAreas, addWareHousesShelveses, addWareHousesLocations} from '../../api/wareConfig'
    export default {
      name: "areaDialog",
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
          formLabelWidth: '80px'
        };
      },
      methods: {
        //添加仓库
        addButton(){
          console.log(this.form)
          let param =  {
            ...this.form,
            companyId : Number(localStorage.getItem("companyId")),
            warehouseId : Number(localStorage.getItem("wareId"))
          }
          if (this.type === 'area') {
            addWareHousesAreas({ warehouseArea:param}).then(res =>{
              this.dialogVisible =  false
              this.$emit('getAreasList')
            })
          } else if(this.type === 'shelveses'){
            addWareHousesShelveses({ warehouseShelves:param}).then(res =>{
              this.dialogVisible =  false
              this.$emit('getShelvesesList')
            })
          }else if(this.type === 'location'){
            addWareHousesLocations({ warehouseLocation:param}).then(res =>{
              this.dialogVisible =  false
              this.$emit('getWareLocationsList')
            })
          }
        },
      }

    }
</script>

<style scoped>

</style>
