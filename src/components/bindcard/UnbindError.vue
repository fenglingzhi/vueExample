<template>
	<div class="unbindError">
		<div class="errorInfo">
			<img src="../../../static/img/mine/bangdingshibai@3x.png" alt="">
			<span>解绑失败</span>
		</div>
		<div class="errorTip">{{unbindErrorMsg}}</div>
		<footer>
			<mt-button class="btn-orange" size="large" @click="closeInfo">关闭</mt-button>
		</footer>
	</div>
</template>
<script>
	export default{
		name:'UnbindError',
		data(){
			return {
				unbindErrorMsg:''
			}
		},
		methods:{
			getunBindError(){
				let vm = this
				vm.unbindErrorMsg = vm.getMsg('unbindcard','unbindErrorMsg')
			},
			closeInfo:function(){
				this.$router.push({ name: 'UnbindCard'})
			}
		},
		mounted(){
			this.getunBindError()
		}
	}
</script>
<style lang='scss'>
	.unbindError{
		.errorInfo{
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
		.errorTip{
			text-align: center;
			color: rgb(74,73,73);
			font-size: 0.4rem;
		}
		footer{
			margin:1.733333rem 0.28rem 0;
		}
	}
</style>