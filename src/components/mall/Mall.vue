<template>
  <div class="mall">
    <router-view></router-view>
    <mt-tabbar v-model="selected" :fixed="fixed">
      <mt-tab-item id="MallIndex" v-tap="{methods:changeTab,tabName:'MallIndex'}">
        <i slot="icon" class="icon iconfont icon-shouyeshouye"></i>
        首页
      </mt-tab-item>
      <!-- <mt-tab-item id="MallClassify" v-tap="{methods:changeTab,tabName:'MallClassify'}">
        <i slot="icon" class="icon iconfont icon-all"></i>
        分类
      </mt-tab-item> -->
      <mt-tab-item id="MallOrder" v-tap="{methods:changeTab,tabName:'MallOrder'}">
        <i slot="icon" class="icon iconfont icon-icon"></i>
        订单
      </mt-tab-item>
      <mt-tab-item id="MallMine" v-tap="{methods:changeTab,tabName:'MallMine'}">
        <i slot="icon" class="icon iconfont icon-wo"></i>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  export default{
      data(){
          return{
            selected:'MallIndex',
            swipeable:true,
            fixed:true
          }
      },
      methods:{
        changeTab(params){
          let vm = this
          vm.selected = params.tabName
          vm.$router.push({name:params.tabName})
        },
        // 初始化tab栏状态并且修改标题名称
        init(){
          document.title = "微商盟"
          this.selected = this.$route.name
        }

      },
      mounted(){
        this.init();
      }
  }
</script>
<style scoped lang='scss'>
  @import '../../../static/lib/base/config.scss';
  .mall{
    height: 100%;
    .mint-tabbar {
        .mint-tab-item-icon{
          position: relative;
          .iconfont{
            font-size: 25px;
          }
        }
        
        .mint-tab-item{
          color: rgb(87,86,86);
          padding: 6px 0;
          background-color: #fff;
        }
        .mint-tab-item.is-selected{
          color: $primary-color;
          background-color: #fff;
        }
        .mint-tab-item-label{
          font-size: 14px;
        }
    }
  }
  
</style>
