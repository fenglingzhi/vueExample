<template>
	<div class="mall-index">
    <mall-header :swipe="swipe" :areaInfo="areaInfo" :userInfo="userInfo" :activityOption="activityOption"></mall-header>
    <bank-head-info :infoHeadLine="infoHeadLine" :infoLineOption="infoLineOption"></bank-head-info>
    </mt-cell>
    <div v-for="item in floor">
      <template-one v-if="item.type === '1'" :floorData="item" @getMore="getMore"></template-one>
      <template-two v-if="item.type === '2'" :floorData="item" @getMore="getMore"></template-two>
      <template-three v-if="item.type === '3'" :floorData="item" @getMore="getMore"></template-three>
    </div>
	</div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import MallHeader from './MallHeader'
  import BankHeadInfo from '../bank/bankIndex/BankHeadInfo'
  import TemplateOne from '../bank/bankIndex/TemplateOne'
  import TemplateTwo from '../bank/bankIndex/TemplateTwo'
  import TemplateThree from '../bank/bankIndex/TemplateThree'
	export default{
	    data(){
	        return {
            activityOption:{
                autoplay: 4000,
                pagination: '.swiper-pagination',
                loop: true
            },
            infoLineOption:{
                autoplay: 4000,
                direction: 'vertical',
                loop:true
            },
            areaInfo:{},
            infoHeadLine:{},
            swipe:{},
            userInfo:{},
            floor:[]
          }
      },
      components:{
        MallHeader,
        BankHeadInfo,
        TemplateOne,
        TemplateTwo,
        TemplateThree
      },
      computed:{
        ...mapGetters([
            'activemallHeaderInfo',
            'activemallBusiness'
        ])
      },
      methods:{
        
        loadInfo(){
          this.getMallBusiness()
          this.loadHeaderInfo()
        },
        setHeaderInfo(){
            let vm = this
            let info = vm.$store.getters.activemallHeaderInfo
            // 3.保存用户信息
            vm.userInfo = info.userInfo
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
        getMallBusiness(){
          let vm = this
          var business = vm.$store.getters.activemallBusiness
          if(vm.isEmptyObject(business)){
            vm.chooseCity()
          }else{
            vm.assignment(business)
          } 
        },
        //根据默认城市获取定位，之后获取当前地理位置
        chooseCity(){
              let vm = this
              // let wx_info = JSON.parse(sessionStorage.getItem('wx_info'))
              // let body = {
              //   city:wx_info.defAreaCode
              // }
              vm.$store.dispatch('FETCH_MALL_BUSINESS').then(()=>{
                let business = vm.$store.getters.activemallBusiness
                vm.assignment(business)
              // vm.getWxArea()
            })
        },

        //配置微商盟的首页信息
        assignment(business){
          let vm = this
          //1.地区信息
          vm.areaInfo = business.areaInfo
          vm.setMsg('bankIndex',"areaInfo",business.areaInfo)
          //2.活动轮播图
          console.log(business)
          vm.swipe = business.swipe
          vm.activityOption.autoplay = vm.swipe.switch_time
          //3.头条资讯
          vm.infoHeadLine = business.infoHeadLine
          vm.infoLineOption.autoplay = vm.infoHeadLine.switch_time
          //4.常用业务
          // vm.bankActivity = business.commonBus
          //5.楼层活动
          vm.floor = business.floor
          //6.工具
          // vm.bankTool = business.tool
        },
        getMore(id){
          console.log(id)
          this.$router.push({ name: 'FloorMore'})
        },
        update_wx_title(title) {
          document.title = title;
          var mobile = navigator.userAgent.toLowerCase();
          if (/iphone|ipad|ipod/.test(mobile)) {
              var iframe = document.createElement('iframe');
              iframe.style.visibility = 'hidden';
              iframe.setAttribute('src', 'http://www.95599.cn/jiangsu/intro/jsweixintest/ABCWeJS/dist/static/img/1.jpg');
              var iframeCallback = function() {
                  setTimeout(function() {
                      iframe.removeEventListener('load', iframeCallback);
                      document.body.removeChild(iframe);
                  }, 0);
              };
              iframe.addEventListener('load', iframeCallback);
              document.body.appendChild(iframe);
          }
      }

      },
      created(){
        this.loadInfo()
        this.update_wx_title("微商盟")
        // 返回顶部方法在vue.ext.js
        // this.backToTop()
      }

	}
</script>
<style lang='scss'>
  
  @import '../../../static/lib/base/config.scss';
  .mall-index{
      background: #fff;
      padding-bottom: 58px;
      .swiper-container{
        height: 3.826667rem;
        .swiper-slide{
          img{
            width: 100%;
            display: block;
          }
        }
      } 
    .card1{
        .title{
          width: 4.626667rem;
          height: 100%;
          right: 0;
          top: 0;
          .main_title,.sub_title{
            font-size: 0.373333rem;
          }
          .main_title{
            top: 1.013333rem;
          }
          .sub_title{
            top: 1.586667rem;
          }
        }
    }
    .card2{
      .title{
        width: 100%;
        top: 0;
        height: 1.4rem;
        .main_title,.sub_title{
          left: 0.2rem;
        }
        .main_title{
          top: 0.4rem;
          font-size: 0.373333rem;
        }
        .sub_title{
          top: 0.933333rem;
          font-size: 0.293333rem;
          color: #727272;
        }
      }
    }
    .card3{
      .title{
        width: 3.333333rem;
        top: 0;
        height: 100%;
        .main_title,.sub_title{
          left: 0.4rem;
        }
        .main_title{
          top: 0.466667rem;
          font-size: 0.373333rem;
        }
        .sub_title{
          top: 0.986667rem;
          font-size: 0.213333rem;
        }
      }
    }
    .floor{
      padding-bottom: 0.08rem;
      header{
        padding: 0.44rem 0.346667rem 0;
        position: relative;
        .title{
          font-size: 0.4rem;
          color: rgb(2,2,2);
        }
        .more{
          font-size: 0.346667rem;
          color: rgb(95,95,95);
          position: absolute;
          right: 0.24rem;
          bottom: 0;
          padding: 0.133333rem 0.106667rem 0;
        }
      }
      .wrapper{
        margin:0.08rem 0.346667rem 0;
        .first_floor{
          margin-bottom: 0.133333rem;
        }
      }
    }
    .bank_floor{  
      padding-bottom: 65px;   
    }
  }
  
  

</style>
