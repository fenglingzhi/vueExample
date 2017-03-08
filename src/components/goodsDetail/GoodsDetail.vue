<!-- 商品详情页模板 -->
<template>
	<div class="goods_detail" :class="{'goods_fix':fixedkey}" :style="{top:-pos_top+'px'}">
    <mt-header title="商品详情">
      <span v-tap="{methods:back}" slot="left">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div v-if="fixedkey"></div>
    <good-swipe :swipe="swipe" :activityOption="activityOption"></good-swipe>
    <good-info :detailInfo="detailInfo"></good-info>
    <div class="pro_detail"  @click="GraphicDetail">
          <mt-cell  title="查看图文详情"  is-link value="">
          </mt-cell>
    </div>
    <div class="pro_sku"  @click="chooseType">
        <mt-cell v-if="skuNullNum>0" title="选择" is-link value="">
             <span>
                <span v-for="item in detailInfo.sku">
                    <span v-if="item.chooseCode==''">&nbsp;{{item.name}}  </span>
                    </span>
            </span>
            <span v-if="skuNullNum==0">
                <span v-for="item in detailInfo.sku">
                    <span v-if="item.chooseCode!=''">&nbsp;{{item.chooseCode}}  </span>
                </span>
            </span>
        </mt-cell>
        <mt-cell v-if="skuNullNum==0" title="已选" is-link value="">
                <span v-for="item in detailInfo.sku">
                    <span v-if="item.chooseCode!=''">&nbsp;{{item.chooseCode}}  </span>
                </span>
        </mt-cell>
    </div>
    <mt-popup v-model="sku" position="bottom" >
        <div class="cur_sku">
          <div class="ratain-box thumbnail">
            <img :src=detailInfo.thumb_url alt="">
          </div>
          <span v-tap.prevent="{methods:closeSkuTab}" class="icon iconfont icon-plus"></span>
          <div class="cur_info">
            <div class="pro_deposit" >
              <span v-show="deposit!=''">
                ￥{{deposit-depfree | tofixtwo}}
                <span class="allprice" v-show="depfree>0">￥{{deposit | tofixtwo}}</span>
              </span>
            </div>
            <div class="qty">库存{{depqty}}件</div>
            <div class="selected-prop" v-if="skuNullNum>0">
                请选择<span v-for="item in detailInfo.sku">
                    <span v-if="item.chooseCode==''">&nbsp;{{item.name}}  </span>
                    </span>
            </div>
            <div v-if="skuNullNum==0" class="chooseInfo">
                已选：
                "<span v-for="item in detailInfo.sku">
                    <span v-if="item.chooseCode!=''">&nbsp;{{item.chooseCode}}  </span>
                </span>"
            </div>
          </div>
        </div>
        <div class="skuTab" > 
          <div v-for="item in detailInfo.sku" class="skuItem" >
             <div class="skuTitle">{{item.name}}</div>
               <div v-for="type in item.value" class="skuText" :class="{'text-active':type.text == item.chooseCode}" v-tap="{methods:chooseSkuItem,item:item,type:type}">{{type.text}}</div>
          </div>
          <div class="pro_number">
            <span class="pro_num_title">购买数量</span>
            <div class="number_count">
              <span class="decrease icon iconfont icon-minus" :class="{'disable_count':curNum == 1}" v-tap.prevent="{methods :minusPro}"></span>
              <span class="num">{{curNum}}</span>
              <span class="increase  icon iconfont icon-plus" :class="{'disable_count':curNum == detailInfo.qty}" v-tap.prevent="{methods :plusPro}"></span>
            </div>
          </div>
        </div>
        <footer>
          <div v-if="detailInfo.pro_status == 0" class="purchase" v-tap="{ methods : purchase}" >
            立即购买
          </div>
          <div v-if="detailInfo.pro_status == 1" class="advance" >
            即将开始
          </div>
          <div v-if="detailInfo.pro_status == 2" class="soldout" >
            售罄
          </div>
        </footer>
    </mt-popup>
    <footer>
      <div v-if="detailInfo.pro_status == 0" class="purchase" v-tap="{ methods : purchase}" >
        立即购买
      </div>
      <div v-if="detailInfo.pro_status == 1" class="advance" >
        即将开始
      </div>
      <div v-if="detailInfo.pro_status == 2" class="soldout" >
        售罄
      </div>
    </footer>
	</div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import { Toast } from 'mint-ui'
  import GoodSwipe from './GoodSwipe'
  import GoodInfo from './GoodInfo'
	export default{
	    data(){
	        return {
            swipe:{},//轮播图对象
            sku:false,
            detailInfo:{},
            curNum:1,//选择的数量
            deposit:'',// sku单价
            depfree:'0',// sku优惠
            depqty:'',// sku库存
            pos_top:0,//固定背景
            activityOption:{
              autoplay: 4000,
              pagination: '.swiper-pagination',
              loop: true
            }
          }
      },
      components:{
        GoodSwipe,
        GoodInfo
      },
      methods: {
        
        chooseType(){
          this.sku = true
        },
        closeSkuTab(){
          this.sku = false
        },
        chooseSkuItem(params){
          let vm = this
          params.item.chooseCode = params.type.text
          params.item.goodid = params.type.goodid
          vm.deposit = params.type.price
          vm.depfree = params.type.free
          vm.depqty = params.type.qty
        },
        loadGoodsDetail(){
          let vm = this
          vm.$store.dispatch('FETCH_MALL_GOODSDETAIL').then(()=>{
            vm.detailInfo = vm.$store.getters.activeGoodsDetail
            // 设置库存
            vm.depqty = vm.detailInfo.qty
            // 倒计时效果
            setInterval(function(){
              vm.detailInfo.sale_time-=1
            }, 1000);
            // 轮播图信息
            vm.swipe = vm.detailInfo.proImg
            // 选择的属性码
            vm.detailInfo.sku.forEach((item)=>{
              this.$set(item,'chooseCode','')
              this.$set(item,'goodid','')
            })
          })
        },
        GraphicDetail(){
          this.$router.push({name:'GraphicDetail'})
        },
        minusPro(){
          let vm = this
          if(vm.curNum>1){
            vm.curNum-=1
          }
        },
        plusPro(){
          let vm = this
          if(vm.curNum<vm.detailInfo.qty){
            vm.curNum+=1
          }
        },
        // 购买
        purchase(){
          let vm = this
          // 1.如果非空并且sku关闭，打开sku;2.如果非空并且sku打开，提示什么没选;3.如果全选了，存储选择信息，关闭sku，跳转。
          if(vm.skuNullNum>0&&!vm.sku){
            vm.chooseType()
          }else if(vm.skuNullNum>0&&vm.sku){
            let info = ''
            vm.detailInfo.sku.forEach((item)=>{
              if(item.chooseCode === ''){
                info+=' '+item.name
              }
            })
            Toast({message:'请选择'+info,duration: 2000});
          }else if(vm.skuNullNum==0){
             this.sku = false
             vm.saveGoodInfo()
             // 计算属性性能bugfix
             setTimeout(()=>{
              this.$router.push({ name: 'OrderDetail'})
             },100)
              
          }
        },
        saveGoodInfo(){
          let sku = '',vm = this
          vm.detailInfo.sku.forEach((item)=>{
              sku+=item.chooseCode+','
          })
          let goodInfo={
            name:vm.detailInfo.fullname,
            sku:sku,
            num:vm.curNum
          }
          vm.setMsg('detailInfo',"goodInfo",goodInfo)

        },
        hasClass(obj, cls) {  
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
        },
        addClass(obj, cls) {  
            if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
        } ,
        removeClass(obj, cls) {  
          if (this.hasClass(obj, cls)) {  
              var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
              obj.className = obj.className.replace(reg, ' ');  
          }  
        }     
      },
      computed:{
        ...mapGetters([
            'activeGoodsDetail'
        ]),
        skuNullNum(){
          let vm = this,num=0
          if(vm.detailInfo.sku){
            vm.detailInfo.sku.forEach((item)=>{
              if(item.chooseCode=='') num+=1
            })
          }
          
          return num
        },
        fixedkey(){
          var app = document.getElementById('app')
          if(this.sku){
            this.pos_top=document.body.scrollTop
            this.addClass(app,'app_fix')
            app.style.top = -this.pos_top+'px'
            this.savePopup('sku')
          }else{
            this.removeClass(app,'app_fix')
            document.body.scrollTop  = this.pos_top
            this.removePopup()
          }
          return this.sku
        }
      },
      created(){
        this.loadGoodsDetail()
      },
      beforeRouteLeave (to, from, next) {
          if(sessionStorage.getItem('popupArr')){
                let tempArr = JSON.parse(sessionStorage.getItem('popupArr'))
                if(tempArr.length>0){
                  let cur = tempArr.pop()
                  this[cur] = false
                  sessionStorage.setItem('popupArr',JSON.stringify(tempArr))
                  next(false)
                }else{
                  next()
                }
            }else{
                next()
            }
        }
	}
</script>
<style lang='scss'>
  @import '../../../static/lib/base/config.scss';
  .goods_detail{
    .mint-header{
      margin-bottom: 0;
    }
    .mint-cell:last-child{
        background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 20%, transparent 50%);
        .mint-cell-wrapper{
          background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 20%, transparent 50%);
        }
    }
    .mint-cell-allow-right::after{
      width: 10px;
      height: 10px;
    }
    .pro_detail{
      margin: 0.266667rem 0;
    }
    .pro_sku{
      padding-bottom: 1.6rem;
    }
    footer{
      position: fixed;
      bottom: 0;
      width: 100%;
      div{
        height: 1.333333rem;
        line-height: 1.333333rem;
        text-align: center;
        font-size: 0.453333rem;
        color: #fff;
      }
      .purchase{
        background-color: $purchase-btn;
      }
      .advance{
        background-color: $advance-btn;
      }
      .soldout{
        color:#575656;
        background-color: $soldout-btn;
      }
    }
    .mint-popup-bottom{
      width: 101%;
      height: 12.0rem;
        .cur_sku{
          height: 3.226667rem;
          margin:0 0.293333rem;
          position: relative;
          .thumbnail{
            width: 3.12rem;
            height: 3.12rem;
            position: relative;
            left: 0px;
            top: -0.36rem;
            display: inline-block;
            border-radius: 0.133333rem;
            background-color: #fff;
            img{
              width: 2.826667rem;
              height: 2.826667rem;
              left: 0.146667rem;
              top: 0.146667rem;
              z-index: 2;
              position: absolute;
            }
          }
          .icon-plus{
            position: absolute;
            right: 0;
            top: 0.133333rem;
            transform: rotate(45deg);
            padding: 4px;
            &::before{
              color:rgb(76,80,82);
              font-size: 0.586667rem;
            }
          }
          .cur_info{
            position: absolute;
            left: 3.48rem;
            top: 0;
            .pro_deposit,.qty,.selected-prop{
                color:rgb(76,80,82);
                font-size: 0.373333rem;
            }
            .pro_deposit{
                font-size: 0.4rem;
                padding-top: 0.266667rem;
                color:rgb(214,66,56);
                font-size: 0.466667rem;
                height: 0.906667rem;
                .allprice{
                  font-size: 0.24rem;
                  color: rgb(147,147,147);
                  text-decoration: line-through; 
                }
            }
            .qty{
              padding-top: 0.32rem;
            }
            .selected-prop{
              padding-top: 0.066667rem;
            }
            .chooseInfo{
              height: 32px;
              display: -webkit-box;  
              display: -moz-box;  
              overflow: hidden;  
              text-overflow: ellipsis;  
              word-break: break-all;  
              -webkit-box-orient: vertical;  
              -webkit-line-clamp:2;  
            }
          }
        }
        .skuTab{
          height: 6.08rem;
          margin: 0px 0.4rem 0px;
          overflow-y: auto; 
          .skuItem{
            .skuTitle{
                color: $common-font-color;
                font-size: 0.373333rem;
                padding: 0.2rem 0 0.333333rem;
            }
            .skuText{
              border-radius: 0.133333rem;
              padding: 0.12rem 0.426667rem;
              margin-right: 0.2rem;
              background-color: #f2f2f2;
              color: $common-font-color;
              display: inline-block;
              margin-bottom: 0.2rem;
            }
            .text-active{
              background-color: #f60;
              color: #fff;
            }
          }
          .pro_number{
            padding: 0.666667rem 0 0.333333rem;
            line-height: 1.146667rem;
            .pro_num_title{
                color: $common-font-color;
                font-size: 0.373333rem;
            }
            .number_count{
              float: right;
              .decrease,.increase,.num{
                color: #9a9a9a;
                background-color: #f2f2f2;
                width: 1.146667rem;
                height: 1.066667rem;
                display: inline-block;
                text-align: center;
                line-height: 1.146667rem;
                font-size: 0.4rem !important;
                &::before{
                  font-size: 0.4rem !important;
                };
              }
              .disable_count{
                color: #ccc;
              }
              .num{
                background-color: #fff;
                color: $common-font-color;
              }
            }
          }
        }
    }
  }
  .goods_fix{
    overflow-y: hidden;
  }
</style>
