<!-- 支付输入验证码页面 -->
<template>
    <div class="PayCheckInfo">
    	<div class="phone_num">
    		<p>请输入手机号130****1234收到的短信验证码</p>	
    	</div>
    	<mt-field label="验证码" placeholder="请输入验证码" class="check_code">
			<span class="get_code" v-tap="{methods:getCode}" v-show="showAccessButton">{{showAccessTip}}</span>
    		<span class="reset_code" v-show="!showAccessButton">{{countdown}}秒后重发</span>
    	</mt-field>
    	<!-- <div class="confirm" v-tap="{methods:confirm}">确认</div>
    	<div class="cancel" v-tap="{methods:cancel}">取消</div> -->
    </div>
</template>
<script>
	export default{
		name:'PayCheckInfo',
		data(){
			return {
				showAccessButton:true,
				countdown:20,
				showAccessTip:'获取验证码',
			}
		},
		methods:{
			confirm(){
				this.$router.push({ name: 'PayOrderUnion'})
			},
			cancel(){
				this.$router.push({ name: 'PayOrderUnion'})
			},
			getCode(){
				let vm = this
				vm.showAccessButton=false
				// 发送获取验证码信息
				let accessCountdown = setInterval(()=>{
					vm.countdown = vm.countdown - 1
					if(vm.countdown === -1){
						vm.showAccessButton=true
						vm.countdown = 20
						vm.showAccessTip = '重新获取'
						clearInterval(accessCountdown)
					}
				},1000)
			}
		}
	}
</script>
<style lang='scss'>
	.PayCheckInfo{
		color: #454444;
		.phone_num{
			height: 1.066667rem;
			padding: 0 0.44rem;
			line-height: 1.066667rem;
			width: auto;
			font-weight: 500;  
		}
		.check_code{
			height: 1.066667rem;
			background: #fff;
			border-bottom: 0.013333rem solid #e6e6e6;
			line-height: 1.066667rem;
			.mint-cell-wrapper{
				padding: 0;
				.mint-cell-title{
					padding-left: 0.44rem;
				}
				.mint-cell-value{
					padding-right: 0.44rem;
					width: 180px;
    				flex: inherit;
					input{
						margin: 0;
						width: 1.866667rem;
					}
				}
			}
			.get_code{
				float: right;
				border-left: 0.013333rem solid #e6e6e6;
				height: 0.666667rem;
				width: 2.666667rem;
				text-align: center;
				margin-top: 0.2rem;
				line-height: 0.666667rem;
			}
			.reset_code{
				@extend .get_code;
				color: #d9d9d9;
			}
			input{
				margin-left: 0.866667rem;
			}
		}
		.confirm{
			height: 1.333333rem;
			width: auto;
			text-align: center;
			color: #fff;
			background: #fd655a;
			border-radius: 0.133333rem;
			margin: 0 0.44rem;
			line-height: 1.333333rem;
			margin-top: 0.826667rem;
			margin-bottom: 0.533333rem;
			font-size: 0.453333rem;
		}
		.cancel{
			@extend .confirm;
			background: transparent;
			border: 0.013333rem solid #fd655a;
			color: #fd655a;
		}
	}
</style>