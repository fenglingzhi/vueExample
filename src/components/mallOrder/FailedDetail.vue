<template>
	<div class="failedOrder">
		<mt-header title="订单详情">
			<span v-tap="{methods:back}" slot="left">
				<mt-button icon="back"></mt-button>
			</span>
		</mt-header>
		<order-info :OrderData="orderData"></order-info>
		<getter-info :OrderData="orderData"></getter-info>
		<good-info :OrderData="orderData"></good-info>
		<exchange-area :OrderData="orderData"></exchange-area>
		<other-info :OrderData="orderData"></other-info>
		<remark :OrderData="orderData"></remark>
		<div class="orderOpt">
			<span class="delete">删除订单</span>
		</div>
	</div>
	
</template>
<script>
	import * as api from '../../api/mallApi'
	import OrderInfo from './OrderComponent/OrderInfo'
  	import GetterInfo from './OrderComponent/GetterInfo'
  	import GoodInfo from './OrderComponent/GoodInfo'
  	import ExchangeArea from './OrderComponent/ExchangeArea'
  	import OtherInfo from './OrderComponent/OtherInfo'
  	import Remark from './OrderComponent/Remark'
	export default{
		data(){
			return {
				orderData:{}
			}
		},
		components:{
			OrderInfo,
			GetterInfo,
			GoodInfo,
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
	.failedOrder{
		padding-bottom: 0.533333rem;
		.orderOpt{
			margin-top: 0.533333rem;
			width: 10.0rem;
			text-align: center;
			.delete{
				width: 9.426667rem;
				height: 1.333333rem;
				line-height: 1.333333rem;
				font-size: 0.4rem;
				color: #fff;
				text-align: center;
				display: inline-block;
				background-color: #fd655a;
				border-radius: 0.106667rem
			}
		}
	}
</style>