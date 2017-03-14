<template>
  <div class="mall_order">
    <mt-navbar :fixed="true" v-model="selected">
      <mt-tab-item id="all"  v-tap="{ methods : changeOrderList , type:'all'}">全部</mt-tab-item>
      <mt-tab-item id="unpaid" v-tap="{ methods : changeOrderList , type:'unpaid'}">待支付</mt-tab-item>
      <mt-tab-item id="paid" v-tap="{ methods : changeOrderList , type:'paid'}">已支付</mt-tab-item>
      <mt-tab-item id="received" v-tap="{ methods : changeOrderList , type:'received'}">已提货</mt-tab-item>
    </mt-navbar>
    <order-list :listData="orderList"></order-list>
    
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import OrderList from './OrderList'
  import * as api from '../../api/mallApi'
  export default{
    data(){
      return {
        selected: 'all',
        number:'1',
        orderList:[]
      }
    },
    components:{
        OrderList
    },
    methods: {
      loadList(){
        this.getOrderList(this.selected,this.number)
      },
      getOrderList(type,number){
        api.getOrderList(type,number).then((resp)=>{
          if(resp.data.result === 0){
            this.orderList = resp.data.data
          }
        })
      },
      // 切换订单列表
      changeOrderList(params){
        let vm = this
        if(params.type!=vm.selected){
          api.getOrderList(params.type,'1').then((resp)=>{
          if(resp.data.result === 0){
            this.orderList = resp.data.data
          }
        })
          vm.selected = params.type
        }
        
      }
    },
    created(){
      this.loadList()
    }

  }
</script>
<style lang='scss'>
  .mall_order{
    .mint-navbar{
      .mint-tab-item .mint-tab-item-label{
        font-size: 0.346667rem;
      }
    }
  }
  .mint-navbar .mint-tab-item.is-selected {
     margin-bottom: 0;
     color: #fd655a;
     border-color: #fd655a;
  }
</style>
