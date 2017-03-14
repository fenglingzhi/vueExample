<template>
	<div class="failedOrder">
		<div v-tap="{ methods : findOrder , order:failedOrder}">
			<div class="order_head">
				<span class="order_pro_fullname">{{failedOrder.fullname}}</span>
				<span class="order_status">{{failedOrder.order_type | toOrderState}}</span>
			</div>
			<div class="order_body ratain-border">
				<img :src="failedOrder.thumb" alt="">
				<div class="order_pro_info">
					<p>{{failedOrder.order_time}}</p>
					<p>规格：<span v-for="sku in failedOrder.sku">{{sku}}</span></p>
					<p>数量：{{failedOrder.num}}</p>
					<p>合计：<span class="money">￥{{failedOrder.allPrice|tofixtwo}}</span></p>
				</div>
			</div>
		</div>

		<div class="order_footer">
			<span class="cancel_btn"  v-tap="{ methods : delOrder , order:failedOrder}">删除订单</span>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			failedOrder:{
				type:Object,
				required:true
			}
		},
		methods:{
			findOrder(params){
				this.$emit('findOrder',params)
			},
			delOrder(params){
				this.$emit('delOrder',params)
			}
		}
	}
</script>
<style lang='scss'>
	.failedOrder{
		/*padding: 0.133333rem 0;*/
	}
</style>