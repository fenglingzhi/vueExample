<template>
	<div class="unpaid ratain-border">
		<div class="order_body ratain-border">
			<img :src="OrderData.ImgSmallUrl" alt="">
			<div class="order_pro_info">
				<p class="name">商品名称：{{OrderData.ProductName}}</p>
				<p>规格：<span v-for="sku in OrderData.sku">{{sku}}</span></p>
				<p>数量：{{OrderData.Qty}}</p>
				<p>物流：网点自提</p>
				<p>合计：<span class="money">￥{{OrderData.Total|tofixtwo}}</span></p>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				lastTime:1
			}
		},
		props:{
			OrderData:{
				type:Object,
				required:true
			}
		}
	}
</script>
<style lang='scss'>
	.unpaid{
		margin-top: 0.266667rem;
		background: #fff;
		.order_body{
			height: 3.066667rem;
			width: 10.0rem;
			display: flex;
			padding: 0.333333rem 0.4rem;
			img{
				width: 2.666667rem;
				height: 2.4rem;
			}
			.order_pro_info{
				font-size: 0.333333rem;
				flex: 1;
				padding-left: 0.4rem;
				.name{
					font-size: 0.4rem;
					padding-bottom: 0.133333rem;
				}
				.money{
					color: #fd655a;
					/*font-size: 0.4rem;*/
				}
			}
		}
	}
</style>