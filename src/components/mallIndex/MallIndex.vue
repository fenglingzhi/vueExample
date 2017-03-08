<template>
	<div class="mall-index">
    <mall-header :swipe="swipe" :areaInfo="areaInfo" :userInfo="userInfo" :activityOption="activityOption"></mall-header>
    <mt-cell title="热门商品" to="./goodsList" is-link value="更多">
    </mt-cell>
    <hot-goods-list class="products" :goodsList="products" @chooseProduct="goDetail"></hot-goods-list>
	</div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import HotGoodsList from './HotGoodsList'
  import MallHeader from './MallHeader'
	export default{
	    data(){
	        return {
            activityOption:{
                autoplay: 4000,
                pagination: '.swiper-pagination',
                loop: true
            },
            areaInfo:{},
            swipe:{},
            userInfo:{},
            products:[]
          }
      },
      components:{
        HotGoodsList,
        MallHeader
      },
      computed:{
        ...mapGetters([
            'activemallIndexGoodsList',
            'activemallHeaderInfo'
        ])
      },
      methods:{
        goDetail(item){
            let vm=this;
            console.log(item);
            vm.$router.push({ name: 'GoodsDetail', params: { goods: item }})
        },
        loadInfo(){
          this.loadHeaderInfo()
          this.loadMallIndexInfo()
        },
        // 根据地里位置获取首页信息
        loadHeaderInfo(){
          let vm = this 
          var headerInfo = vm.$store.getters.activemallHeaderInfo
          if(vm.isEmptyObject(headerInfo)){
              vm.$store.dispatch('FETCH_MALL_HEADER_INFO').then(()=>{
                  vm.setHeaderInfo()
              })
          }else{
            vm.setHeaderInfo()
          }
          
        },
        // 根据地里位置获取首页热门商品
        loadMallIndexInfo(){
            let vm = this
            vm.$store.dispatch('FETCH_MALL_INDEX_GOODSLIST').then(()=>{
              vm.setProduct()
            })
        },
        setProduct(){
            let vm = this
            vm.products = vm.$store.getters.activemallIndexGoodsList
        },
        setHeaderInfo(){
            let vm = this
            let info = vm.$store.getters.activemallHeaderInfo
            // 1.保存地区信息
            vm.areaInfo = info.areaInfo
            // 2.保存轮播图
            vm.swipe = info.swipe
            vm.activityOption.autoplay = info.swipe.switch_time
            // 3.保存用户信息
            vm.userInfo = info.userInfo
            vm.setMsg('bankIndex',"userInfo",info.userInfo)
        },
          

      },
      created(){
        this.loadInfo()
        // 返回顶部方法在vue.ext.js
        // this.backToTop()
      }

	}
</script>
<style lang='scss'>
  
  @import '../../../static/lib/base/config.scss';
  .mall-index{
    
    .mint-header{
      background-color: $primary-color !important;
      color: #fff !important;
      .icon-wode{
        font-size: 0.586667rem;
      }
      .icon-xia1{
        font-size: 0.32rem;
      }
      .mint-button-text{
        font-size: 0.4rem;
        font-family: "Microsoft Yahei";
      }
    }
    .swiper-container{
      height: 3.826667rem;
      margin-top: -0.133333rem;
      .swiper-slide{
        img{
          width: 100%;
          display: block;
        }
      }
    }
    
    .mint-cell{
      background-color: #fff;
      min-height: 1.28rem;
      .mint-cell-wrapper{
        font-size: 0.426667rem;
        padding: 0 0.266667rem 0 0;
        .mint-cell-title{
          border-left: 0.106667rem solid $primary-color;
          padding-left: 0.266667rem;
          height:0.64rem;
          line-height: 0.586667rem;
        }
      }
      .mint-cell-allow-right::after{
        width: 10px;
        height: 10px;
      }
    }
    .products{
      padding-bottom: 63px;
    }
    
    
    
  }
  
  

</style>
