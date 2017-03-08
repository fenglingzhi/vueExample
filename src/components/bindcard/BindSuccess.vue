<template>
	<div class="bindSuccess">
		<div class="successInfo">
			<img src="../../../static/img/mine/bangdingchengg@3x.png" alt="" >
			<span>绑定成功</span>
		</div>
		<mt-cell title="你已绑定卡号" :value="info.cardNo|bindCardNo"></mt-cell>
		<mt-cell title="客户姓名" :value="info.name|bindName"></mt-cell>
		<mt-cell title="身份证号" :value="info.idCardNo|bindIdNo"></mt-cell>
		<mt-cell title="手机号" :value="info.phone|bindPhone"></mt-cell>
		<footer>
			<mt-button class="btn-orange" size="large" @click="closeInfo">关闭</mt-button>
		</footer>
	</div>
</template>
<script>
	export default{
		name:'BindSuccess',
		data(){
			return {
				info:{
					
				}
			}
		},
		methods:{
			getSuccInfo(){
				let vm = this
				vm.info = vm.getMsg('bindcard','BindSuccInfo')
			},
			closeInfo:function(){
				this.$router.push({ name: 'CardList'})
			}
		},
		mounted(){
			this.getSuccInfo()
		}
	}
</script>
<style lang='scss'>
	.bindSuccess{
		.successInfo{
			padding: 1.08rem 0;
			text-align: left;
			font-size: 0.666667rem;
			text-align: center;
			height: 3.6rem;
			img{
				vertical-align:middle;
				width: 1.44rem;
				padding-bottom: 0.133333rem;
				display: inline-block;
			}
			span{
				padding-left: 0.44rem;
				color: rgb(28,28,28);
			}
		}
		footer{
			margin:1.733333rem 0.28rem 0;
		}
	}
</style>