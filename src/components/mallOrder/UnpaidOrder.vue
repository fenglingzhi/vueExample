<template>
	<div class="unpaidOrder">
		<div v-tap="{ methods : findOrder , order:unpaidOrder}">
			<div class="order_head">
				<span class="order_pro_fullname">{{unpaidOrder.fullname}}</span>
				<span class="order_status">{{unpaidOrder.order_type | toOrderState}}</span>
			</div>
			<div class="order_body ratain-border">
				<img :src="unpaidOrder.thumb" alt="">
				<div class="order_pro_info">
					<p>{{unpaidOrder.order_time}}</p>
					<p>规格：<span v-for="sku in unpaidOrder.sku">{{sku}}</span></p>
					<p>数量：{{unpaidOrder.num}}</p>
					<p>合计：<span class="money">￥{{unpaidOrder.allPrice|tofixtwo}}</span></p>
				</div>
			</div>
		</div>
		<div class="order_footer">
			<span class="left_time">
				<i class="icon iconfont icon-shizhong"></i>
				支付剩余时间
				<span>{{min}}:{{sec}}</span>
			</span>
			<span class="cancel_btn" v-tap="{ methods : cancelOrder , order:unpaidOrder}">取消订单</span>
			<span class="buy_btn" v-tap="{ methods : payOrder , order:unpaidOrder}">付款</span>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				lastTime:0
			}
		},
		props:{
			unpaidOrder:{
				type:Object,
				required:true
			}
		},
		methods:{
			timecount(){
				let vm = this
				vm.lastTime = this.unpaidOrder.left_time
				// 倒计时效果
	            let st = setInterval(function(){
	              vm.lastTime-=1
	              if(vm.lastTime<=0){
	              	clearInterval(st)
	              	vm.unpaidOrder.order_type = '3'
	              }
	            }, 1000);
			},
			cancelOrder(params){
				this.$emit('cancelOrder',params)
			},
			findOrder(params){
				this.$emit('findOrder',params)
			},
			payOrder(params){
				this.$emit('payOrder',params)
			}
		},
		created(){
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
	.unpaidOrder{
		.order_footer{
			.left_time{
				float: left;
				.icon-shizhong{
					color: #fd8400;
				}
				span{
					color: #fd8400;
					font-size: 0.346667rem;
				}
			}
		}
	}
</style>