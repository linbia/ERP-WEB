<template>
  <div class="container-box">
    <div  class="echarts-div" :class="setClass(item)" v-for="(item, index) in list"></div>
  </div>
</template>

<script>
    export default {
        name: "index",
      data(){
          return{
            list:[1,2,3]
          }
      },
      methods:{
        setClass(key) {
          let obj = {}
          obj[`echarts-div${key}`] = true
          return obj
        },

        //初始化图标
        initEcharts()
        {
          var option = {
            title: {
              text: 'xxx公司仓库A',
              subtext: '食品仓库A',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
            },
            series: [
              {
                name: '当前库存',
                type: 'pie',
                radius: '50%',
                data: [
                  {value: 1048, name: '货架A'},
                  {value: 735, name: '货架B'},
                  {value: 580, name: '货架C'},
                  {value: 484, name: '货架D'},
                  {value: 300, name: '货架E'}
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          this.list.map (item => {
            let className = '.echarts-div'+item
            let myChart = echarts.init(document.querySelector(className));
            myChart.setOption(option);
          })

        }
      },
        mounted(){
          this.$nextTick(() => {
            this.initEcharts()
          })
        },
    }
</script>

<style scoped lang="scss">
.container-box{
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 15px;
  .echarts-div{
    width: 50vw;
    height: 50vh;
  }
}
</style>
