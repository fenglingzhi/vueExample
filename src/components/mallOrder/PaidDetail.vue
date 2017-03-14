<template>
	<div class="paidOrder">
		<mt-header title="订单详情">
			<span v-tap="{methods:back}" slot="left">
				<mt-button icon="back"></mt-button>
			</span>
		</mt-header>
		<order-info :OrderData="orderData"></order-info>
		<paid-getter-info :OrderData="orderData"></paid-getter-info>
		<good-info :OrderData="orderData"></good-info>
		<exchange-area :OrderData="orderData"></exchange-area>
		<other-info :OrderData="orderData"></other-info>
		<remark :OrderData="orderData"></remark>
	</div>
	
</template>
<script>
	import * as api from '../../api/mallApi'
	import OrderInfo from './OrderComponent/OrderInfo'
  	import PaidGetterInfo from './OrderComponent/PaidGetterInfo'
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
			PaidGetterInfo,
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
	.paidOrder{
		padding-bottom: 0.533333rem;
	}
</style>