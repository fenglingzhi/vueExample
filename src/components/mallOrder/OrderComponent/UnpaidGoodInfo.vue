<template>
	<div class="unpaid ratain-border-top">
		<div class="order_head">
			<span class="left_time">
				<i class="icon iconfont icon-shizhong"></i>
				支付剩余时间
				<span>{{min}}:{{sec}}</span>
			</span>
		</div>
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
			},
			LeftTime:{
				type:String,
				required:false
			}
		},
		methods:{
			timecount(){
					let vm = this
					vm.lastTime = parseInt(this.LeftTime)
					// 倒计时效果
		            let st = setInterval(function(){
		              vm.lastTime-=1
		              if(vm.lastTime<=0){
		              	clearInterval(st)
		              	vm.OrderData.OrderState = '3'
		              }
		            }, 1000);
				
			}
		},
		mounted(){
			this.timecount()
		},
		computed:{
			min(){
				let min = parseInt(this.lastTime/60)
				if(min<10){
					min = '0'+min
				}
				return min
			},
			sec(){
				let min = parseInt(this.lastTime/60)
				let sec = this.lastTime - 60*min
				if(sec<10){
					sec = '0'+sec
				}
				return sec
			}
		}
	}
</script>
<style lang='scss'>
	.unpaid{
		margin-top: 0.266667rem;
		background: #fff;
		.order_head{
			height: 0.906667rem;
			line-height: 0.906667rem;
			padding: 0 0.533333rem;
			.left_time{
				.icon-shizhong{
					color: #fd8400;
				}
				span{
					color: #fd8400;
					font-size: 0.346667rem;
				}
			}
		}
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