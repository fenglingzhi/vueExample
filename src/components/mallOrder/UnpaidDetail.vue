<template>
	<div class="unpaidDetail">
		<mt-header title="订单详情">
			<span v-tap="{methods:back}" slot="left">
				<mt-button icon="back"></mt-button>
			</span>
		</mt-header>
		<order-info :OrderData="orderData"></order-info>
		<getter-info :OrderData="orderData"></getter-info>
		<unpaid-good-info v-if="left_time!=''" :OrderData="orderData" :LeftTime="left_time"></unpaid-good-info>
		<exchange-area :OrderData="orderData"></exchange-area>
		<other-info :OrderData="orderData"></other-info>
		<remark :OrderData="orderData"></remark>
		<div class="unpaidOpt">
			<span class="cancel">取消订单</span>
			<span class="pay">付款</span>
		</div>
	</div>
</template>
<script>
  	import * as api from '../../api/mallApi'
  	import OrderInfo from './OrderComponent/OrderInfo'
  	import GetterInfo from './OrderComponent/GetterInfo'
  	import UnpaidGoodInfo from './OrderComponent/UnpaidGoodInfo'
  	import ExchangeArea from './OrderComponent/ExchangeArea'
  	import OtherInfo from './OrderComponent/OtherInfo'
  	import Remark from './OrderComponent/Remark'
	export default{
		data(){
			return {
				orderData:{},
				left_time:''
			}
		},
		components:{
			OrderInfo,
			GetterInfo,
			UnpaidGoodInfo,
			ExchangeArea,
			OtherInfo,
			Remark
		},
		methods:{
			// 未支付订单每次查询
			loadOrderDetail(){
				let vm = this
				let orderid = this.$route.params.orderid
				api.getUnpaidDetail(orderid).then((resp)=>{
					if(resp.data.result == 0){
						vm.orderData = resp.data.data
						vm.left_time = vm.orderData.left_time
					}
				})
			}
		},
		created(){
			this.loadOrderDetail()
		}
	}
</script>
<style lang='scss'>
	@import '../../../static/lib/base/config.scss';
	.unpaidDetail{
		padding-bottom: 0.533333rem;
		.mint-cell-allow-right::after{
		    width: 10px;
		    height: 10px;
	    }
		.unpaidOpt{
			margin-top: 0.533333rem;
			width: 10.0rem;
			display: flex;
			.cancel,.pay{
				width: 4.133333rem;
				height: 1.013333rem;
				line-height: 1.013333rem;
				font-size: 0.4rem;
				color: #fff;
				text-align: center;
				display: inline-block;
				/*float: left;*/
			}
			.cancel{
				margin: 0 0.466667rem 0 0.4rem;
				background-color: #fd8400;
			}
			.pay{
				margin:0 0.4rem 0 0.466667rem;
				background-color: #fd655a;
			}
		}
	}
</style>