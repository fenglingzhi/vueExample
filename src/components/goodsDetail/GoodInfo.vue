<template>
	<div class="pro_info ratain-border-bottom">
	    <div class="proMainTitle">{{detailInfo.fullname}}</div>
	    <div class="proSubTitle">{{detailInfo.description}}</div>
	    <div class="proLeftTime" v-if="detailInfo.pro_status == '0'||detailInfo.pro_status == '1'">
	        <time-counter :time="detailInfo.sale_time"></time-counter>
	   	</div>
	   	<div class="proLeftTime" v-if="detailInfo.pro_status == '2'">
	   		库存0&emsp;已售罄
	   	</div>
	    <div class="pro_deposit">
	    	
	    	<span>
	    		{{detailInfo.price_name}}:<span class="price">￥{{detailInfo.sale_price | tofixtwo}}{{detailInfo.price_unit}}</span>
	    		<span v-if="detailInfo.free>0" class="allprice">￥
			    	<span class="num">{{detailInfo.allprice | tofixtwo}}</span>
			    </span>
	    	</span>
	    </div>
	    <div class="pro_pointsToRedeem">
	        {{detailInfo.other}}
		</div>
    </div>
</template>
<script>
  	import TimeCounter from './TimeCounter'
	export default{
		components:{
	        TimeCounter
	    },
		props:{
			detailInfo:{
				type:Object,
				required:true
			}
		}
	}
</script>
<style lang='scss'>
	.pro_info{
      background-color: #fff;
      padding:0 0.4rem;
      line-height: 0.373333rem;
      .proMainTitle{
        font-size: 0.426667rem;
        color: rgb(69,68,68);
        padding-top: 0.4rem;
      }
      .proSubTitle{
        font-size: 0.346667rem;
        color: rgb(180,184,185);
        padding-top: 0.2rem;
      }
      .proLeftTime{
        font-size: 0.32rem;
        color:rgb(109,109,109);
        padding-top: 0.266667rem;
        
      }
      .pro_deposit{
        font-size: 0.4rem;
        padding-top: 0.453333rem;
        color:rgb(69,68,68);
        .price{
        	color:rgb(214,66,65);
        }
        .allprice{
			font-size: 0.24rem;
			color: rgb(147,147,147);
			.num{
				font-size: 0.24rem;
				color: rgb(147,147,147);
				text-decoration: line-through;
			}
        }
      }
      .pro_pointsToRedeem{
        color:rgb(180,184,185);
        font-size: 0.32rem;
        padding: 0.266667rem 0 0.76rem 0;
      }
    }
</style>