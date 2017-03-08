<template>
	<div class="unbindSuccess">
		<div class="successInfo">
			<img src="../../../static/img/mine/bangdingchengg@3x.png" alt="" >
			<span>解绑成功</span>
		</div>
		<footer>
			<mt-button class="btn-orange" size="large" @click="closeInfo">关闭</mt-button>
		</footer>
	</div>
</template>
<script>
	export default{
		name:'UnbindSuccess',
		methods:{
			closeInfo:function(){
				this.$router.push({ name: 'CardList'})
			}
		}
	}
</script>
<style lang='scss'>
	.unbindSuccess{
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