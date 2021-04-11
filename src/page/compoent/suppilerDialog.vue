<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%">
    <el-form :model="form" label-position="right" >
      <el-form-item label="供应商名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="城市" :label-width="formLabelWidth">
        <el-cascader
          v-model="form.cityValue"
          :options="cityList"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item   label="类型" :label-width="formLabelWidth">
        <el-select v-model="form.category" placeholder="请选择类型">
          <el-option :label="item.name" :value="item.id"  :key="item.id" v-for="(item, index) in typeData"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input  type="remark"  v-model="form.description" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addButton">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import cityList from '../../../static/json/city'
  import cityCodetoLabel from '../../../static/json/cityCodetoLabel'
  import {addSupplyList} from '../../api/supplier'
  export default {
    name: "suppilerDialog",
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
        typeData: [{
          name:'个人',
          id:1
        },{
          name:'公司',
          id:2
        }],
        cities:['上海', '北京', '广州', '深圳','红色','红色','红色'],
        cityList:cityList.city,
        cityCodetoLabel:cityCodetoLabel.cityArr,
        cityValue:'',
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
      //添加供应商
      addButton(){
        console.log(this.form)
        let param =  {
          ...this.form,
          type:1,
          area:this.cityCodetoLabel.filter(item => item.value === this.form.cityValue[2])[0].label,
          city:this.cityCodetoLabel.filter(item => item.value === this.form.cityValue[1])[0].label,
          province:this.cityCodetoLabel.filter(item => item.value === this.form.cityValue[0])[0].label,
        }
        addSupplyList({ supplyDemand:param}).then(res =>{
          this.dialogVisible =  false
          this.$emit('getSupplierList')
        })
        this.form = {}
      },
    },
    mounted(){
    /*  let cityList = this.cityList
      debugger
      let list = []
      cityList.forEach(item => {
        list.push({
          "value": item.value,
          "label": item.label,
        })
        item.children && item.children.forEach(li => {
            list.push({
              "value": li.value,
              "label": li.label,
            })
          li.children && li.children.forEach(aa => {
              list.push({
                "value": aa.value,
                "label": aa.label,
              })
            })
          })
      })
      console.log(JSON.stringify(list))
      debugger*/
    }

  }
</script>

<style scoped>

</style>
