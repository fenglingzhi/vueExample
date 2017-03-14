<template>
	<div class="orderInfo ratain-border">
		<div class="order">
			<div class="order_num">订单号：{{OrderData.orderId}}</div>
			<div class="order_state">{{OrderData.OrderState|toOrderState}}</div>
		</div>
		<div class="order_date">{{OrderData.CreatDate}}</div>
	</div>
</template>
<script>
	export default {
		props:{
			OrderData:{
				type:Object,
				required:true
			}
		}
	}
</script>
<style lang='scss'>
	.orderInfo{
		height:2.08rem;
		background-color: #fff;
		padding: 0.3rem 0.4rem;
		color: rgb(81,81,81);
		.order{
			display: flex;
			padding: 0.1rem 0;
			.order_num{
				flex: 1;
			}
			.order_state{
				font-size: 0.373333rem;
				color: rgb(227,12,12);
				width: 2.0rem;
				text-align: right;
			}
		}	
		.order_date{
			padding: 0.1rem 0;
		}
	}
</style>