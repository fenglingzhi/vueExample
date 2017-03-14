<template>
	<div class="order_container ratain-border">
		<div class="order_item" v-for="item in listData">
			<unpaid-order v-if="item.order_type == '0'" :unpaidOrder="item" @findOrder="findOrder" @cancelOrder="cancelOrder" @payOrder="payOrder"></unpaid-order>
			<paid-order v-if="item.order_type == '1'" :paidOrder="item" @findOrder="findOrder" @findGood="findGood"></paid-order>
			<received-order v-if="item.order_type == '2'" :receivedOrder="item" @findOrder="findOrder" @findGood="findGood" @delOrder="delOrder"></received-order>
			<failed-order v-if="item.order_type == '3'" :failedOrder="item" @findOrder="findOrder" @delOrder="delOrder"></failed-order>
		</div>
	</div>
</template>
<script>
	import UnpaidOrder from './UnpaidOrder'
	import PaidOrder from './PaidOrder'
	import ReceivedOrder from './ReceivedOrder'
	import FailedOrder from './FailedOrder'
	export default{
		props:{
			listData:{
				type:Array,
				required:true
			}
		},
		components:{
	        UnpaidOrder,
	        PaidOrder,
	        ReceivedOrder,
	        FailedOrder
	    },
	    methods:{
	    	findOrder(params){
	    		let types = ['UnpaidDetail','PaidDetail','ReceivedDetail','FailedDetail']
	    		this.$router.push({ name: types[params.order.order_type], params: { orderid: params.order.order_id }})
	    	},
	    	cancelOrder(params){
	    		console.log('取消订单：'+params.order)
	    	},
	    	payOrder(params){
	    		console.log('支付订单：'+params.order)
	    	},
	    	findGood(params){
	    		console.log('再次购买：'+params.order)
	    	},
	    	delOrder(params){
	    		console.log('删除订单：'+params.order)
	    	}
	    }
	}
</script>
<style lang='scss'>
	.order_container{
		padding: 50px 0 59px 0;
		.order_item{
			padding: 0.133333rem 0;
			.failedOrder,.paidOrder,.receivedOrder,.unpaidOrder{
				height: 4.08rem;
				background-color: #fff;
			}
			.order_head{
				height: 0.8rem;
				line-height: 0.8rem;
				padding: 0 0.533333rem;
				font-size: 0.373333rem;
				.order_status{
					float: right;
					color: #f9532d;
				}
			}
			.order_body{
				height: 2.373333rem;
				width: 10.0rem;
				display: flex;
				padding: 0.2rem 0.533333rem;
				img{
					width: 2.4rem;
					height: 1.973333rem;
				}
				.order_pro_info{
					flex: 1;
					padding-left: 0.4rem;
					.money{
						color: #fd655a;
						font-size: 0.4rem;
					}
				}
			}
			.order_footer{
				height: 0.906667rem;
				line-height: 0.906667rem;
				padding: 0 0.533333rem;
				text-align: right;
				.cancel_btn,.buy_btn{
					width: 1.813333rem;
					height: 0.64rem;
					display: inline-block;
					line-height: 0.64rem;
					text-align: center;
					font-size: 0.32rem;
					border-radius: 0.066667rem;
				}
				.cancel_btn{
					border:1px solid #fd655a;
					color:#fd655a;
				}
				.buy_btn{
					background-color: #fd655a;
					border:1px solid #fd655a;
					color: #fff;
					margin-left: 0.2rem;
				}
			}
		}
	}
</style>