<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%">
    <el-form :model="form" label-position="right" >
      <el-form-item :label="type === 'ware' ? '仓库名称': '公司名称'" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="城市" :label-width="formLabelWidth">
        <el-cascader
          v-model="cityValue"
          :options="cityList"
          ></el-cascader>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="form.address" autocomplete="off"></el-input>
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
  import {addWareHousesList} from '../../api/wareConfig'
  import {addCompanyList} from '../../api/company'
  import cityList from '../../../static/json/city'
    export default {
        name: "addWareDialog",
        props:{
          title:'',
          type:''
        },
        data() {
          return {
            dialogVisible: false,
            cityValue:'',
            cityList:cityList.city,
            form: {},
            formLabelWidth: '80px'
          };
          },
        methods: {
          //添加仓库
          addButton(){
            console.log(this.cityValue)
            console.log(this.form)
            let param =  {
                ...this.form,
                "type": "",
                "area": this.cityValue[2],
                "city": this.cityValue[1],
                "province": this.cityValue[0],
            }
            if (this.type === 'ware') {
              param.companyId = 0
              addWareHousesList({ warehouse:param}).then(res =>{
                this.dialogVisible =  false
                this.$emit('getWareList')
              })
            } else {
              param.adminId = 1
              addCompanyList({ company:param}).then(res =>{
                this.dialogVisible =  false
                this.$emit('getCompanyList')
              })
            }
          },
        }
    }
</script>

<style scoped>

</style>
