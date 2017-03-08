<template>
  <div class="mall_order">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">全部</mt-tab-item>
      <mt-tab-item id="2">待支付</mt-tab-item>
      <mt-tab-item id="3">已支付</mt-tab-item>
      <mt-tab-item id="4">已提货</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container  v-model="selected">
      <mt-tab-container-item id="1">
        <mt-cell v-for="n in 10" :title="'content ' + n"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell v-for="n in 4" :title="'content ' + n"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell v-for="n in 6" :title="'content ' + n"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <mt-cell v-for="n in 8" :title="'content ' + n"/>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return {
        selected: '1'
      }
    },
    computed: {},
    methods: {},
    mounted(){
    }

  }
</script>
<style lang='scss'>
  .mall_order{
    .mint-navbar{
      .mint-tab-item .mint-tab-item-label{font-size: 0.346667rem;}
    }
  }
  .mint-navbar .mint-tab-item.is-selected {
     margin-bottom: 0;
  }
</style>
