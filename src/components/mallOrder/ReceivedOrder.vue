<template>
	<div class="receivedOrder">
		<div v-tap="{ methods : findOrder , order:receivedOrder}">
			<div class="order_head">
				<span class="order_pro_fullname">{{receivedOrder.fullname}}</span>
				<span class="order_status">{{receivedOrder.order_type | toOrderState}}</span>
			</div>
			<div class="order_body ratain-border">
				<img :src="receivedOrder.thumb" alt="">
				<div class="order_pro_info">
					<p>{{receivedOrder.order_time}}</p>
					<p>规格：<span v-for="sku in receivedOrder.sku">{{sku}}</span></p>
					<p>数量：{{receivedOrder.num}}</p>
					<p>合计：<span class="money">￥{{receivedOrder.allPrice|tofixtwo}}</span></p>
				</div>
			</div>
		</div>
		
		<div class="order_footer">
			<span class="cancel_btn" v-tap="{ methods : delOrder , order:receivedOrder}">删除订单</span>
			<span class="buy_btn" v-tap="{ methods : findGood , order:receivedOrder}">再次购买</span>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			receivedOrder:{
				type:Object,
				required:true
			}
		},
		methods:{
			findOrder(params){
				this.$emit('findOrder',params)
			},
			findGood(params){
				this.$emit('findGood',params)
			},
			delOrder(params){
				this.$emit('delOrder',params)
			}
		}
	}
</script>
<style lang='scss'>
	.receivedOrder{
		/*padding: 0.133333rem 0;*/
	}
</style>