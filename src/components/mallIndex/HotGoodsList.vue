<!-- 热门商品列表 -->
<template>
	<div>
	    <div class="product-item" v-for="item in goodsList" v-tap="{ methods : chooseProduct , item:item}">
		    <div class="product-img">
			    <img v-lazy="item.img_url" alt="">
			    <div v-if="item.pro_status == 0">
			    	<div class="trapezoid onsale"></div>
			    	<div class="state">在售</div>
			    </div>
			    <div v-if="item.pro_status == 1">
			    	<div class="trapezoid advance"></div>
			    	<div class="state">预售</div>
			    </div>
			    <div v-if="item.pro_status == 2">
			    	<div class="trapezoid soldout"></div>
			    	<div class="state state_soldout">售罄</div>
			    </div>
		    </div>
		    <div class="product-info">
			    <div class="fullname">{{item.fullname}}</div>
			    <div class="description">{{item.description}}</div>
			    
			    <div  class="sale_price">{{item.price_name}}：
			    	<span>￥{{item.sale_price | tofixtwo}}{{item.price_unit}}</span>
			    </div>
			    <div class="qty ratain-border-bottom">
			        <span class="main-qty">库存<span class="qty_num">{{item.qty}}</span></span>
			        <span>已销售<span class="qty_num">{{item.sold_qty}}</span></span>
			    </div>
			        <div class="other">{{item.other}}</div>
		        </div>
	    </div>
    </div>
</template>
<script>
	export default{
		props:{
			goodsList:{
				type:Array,
				required:true
			}
		},
		methods:{
			chooseProduct(params){
				this.$emit('chooseProduct',params.item)
			}
		}
	}
</script>
<style lang='scss'>
	.product-item{
      padding:0.186667rem 0.2rem;
      background-color: #fff;
      display: flex;
      margin-top: 0.266667rem;
      .product-img{
        font-size: 0;
        width:3.12rem;
        height: 2.88rem;
        margin-right: 0.32rem;
        position: relative;
        img{
          width:inherit;
          height: inherit;
        }
        .trapezoid{
          position: absolute;
          top:1.3132rem;
          left: -0.42rem;
          width: 2.450933rem;
          border-right: 0.594rem solid transparent;
          border-left: 0.594rem solid transparent;
          z-index: 1;
          transform: rotate(-45deg);
          transform-origin: left top;
        }
        .onsale{
        	border-bottom: 0.594rem solid #e6262b;
        }
        .advance{
        	border-bottom: 0.594rem solid #fea800;
        }
        .soldout{
        	border-bottom: 0.594rem solid #d7d7d7;
        }
        .state{
          color: #fff;
          position: absolute;
          width: 2.450933rem;
          height: 0.565733rem;
          top:0.4rem;
          left: -0.565733rem;
          z-index: 3;
          font-size: 0.32rem;
          line-height: 0.565733rem;
          text-align: center;
          transform: rotate(-45deg);
        }
        .state_soldout{
			color: rgb(87,86,86);
        }
      }
      .product-info{
        flex: 1;
        .fullname,.description,.sale_price,.other{
          height: 0.583333rem;
          line-height: 0.583333rem;
          width: 5.973333rem;
          text-overflow:ellipsis;
          overflow:hidden;
          white-space:nowrap;
        }
        .fullname{
          font-size: 0.373333rem;
          color:rgb(69,68,68);
        }
        .description{
          font-size: 0.32rem;
          color: rgb(82,82,82);
        }
        .sale_price{
          font-size: 0.346667rem;
          color: rgb(69,68,68);
          span{
            font-size: 0.4rem;
            color: rgb(214,66,65);
          }
          
        }
        .qty{
          height: 0.613333rem;
          line-height: 0.613333rem;
          font-size: 0.293333rem;
          color: rgb(128,128,128);
          .qty_num{
            color: rgb(254,168,0);
          }
          .main-qty{
            padding-right: 1.48rem;
          }
        }
        .other{
          line-height: 0.666667rem;
          font-size: 0.293333rem;
          color: rgb(128,128,128);
        }
      }
    }
</style>