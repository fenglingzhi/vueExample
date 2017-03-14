<template>
	<div class="paidOrder">
		<div v-tap="{ methods : findOrder , order:paidOrder}">
			<div class="order_head">
				<span class="order_pro_fullname">{{paidOrder.fullname}}</span>
				<span class="order_status">{{paidOrder.order_type | toOrderState}}</span>
			</div>
			<div class="order_body ratain-border">
				<img :src="paidOrder.thumb" alt="">
				<div class="order_pro_info">
					<p>{{paidOrder.order_time}}</p>
					<p>规格：<span v-for="sku in paidOrder.sku">{{sku}}</span></p>
					<p>数量：{{paidOrder.num}}</p>
					<p>合计：<span class="money">￥{{paidOrder.allPrice|tofixtwo}}</span></p>
				</div>
			</div>
		</div>
		<div class="order_footer">
			<span class="buy_btn" v-tap="{ methods : findGood , order:paidOrder}">再次购买</span>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			paidOrder:{
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
			}
		}
	}
</script>
<style lang='scss'>
	
</style>