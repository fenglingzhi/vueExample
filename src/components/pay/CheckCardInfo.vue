<!-- 绑卡：验证用户信息 -->
<template>
    <div class="CheckCardInfo">
		<mt-header title="服务协议">
            <span v-tap="{methods:back}" slot="left">
                <mt-button icon="back"></mt-button>
            </span>
        </mt-header>
        <div class="card_info">
        	<div class="card_types">
        		<span>卡类型</span>
        		<span class="card_issuer">农业银行</span>
        		<span class="card_type">借记卡</span>
        	</div>
        	<div class="card_user">
        		<span>持卡人姓名</span>
        		<span class="card_user_name">王小岩</span>
        	</div>
        </div>
        <div class="card_check_num">
        	<div class="card_phone">
        		<span>手机号码</span>
        		<input type="text" placeholder="发卡行预留手机号码">
        	</div>
        	<mt-field label="验证码" placeholder="请输入验证码" class="check_code">
				<span class="get_code" v-tap="{methods:getCode}" v-show="showAccessButton">{{showAccessTip}}</span>
	    		<span class="reset_code" v-show="!showAccessButton">{{countdown}}秒后重发</span>
	    	</mt-field>
        </div>
        <div class="protocol">
    		<input type="checkbox">
    		<span>同意<a href="#" v-tap="{methods:protocol}">支付协议</a></span>
    	</div>
    	<div class="next" v-tap="{methods:next}">
            <span>下一步</span>
        </div>
    </div>
</template>
<script>
	export default{
		data(){
			return {
				showAccessButton:true,
				countdown:20,
				showAccessTip:'获取验证码',
			}
		},
		methods:{
			next(){
				this.$router.push({ name: 'PayCardAddSuccess'})
			},
			protocol(){
				this.$router.push({ name: 'FetchProtocol'})
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
			},
		}
	}
</script>
<style lang='scss'>
	.CheckCardInfo{
		%common_height{
			height: 1.133333rem;
			line-height: 1.146667rem;
		}
		%common_warp{
			background: #fff;
			padding-left: 0.44rem;
		}
		
		.card_info{
			@extend %common_warp;
			margin: 0.266667rem 0;
			span{
					display: inline-block;
					width: 2.0rem;
			}
			.card_types{
				border-bottom: 0.013333rem solid #e6e6e6;
				@extend %common_height;
				.card_issuer{
					font-weight: 500;
					margin-left: 0.266667rem;
				}
				.card_type{
					@extend .card_issuer;
				}
			}
			.card_user{
				@extend %common_height;
				.card_user_name{
					font-weight: 500;
					margin-left: 0.266667rem;
				}
			}
		}
		.card_check_num{
			@extend %common_warp;
			margin-bottom: 0.266667rem;
			span{
				display: inline-block;
				width: 2.0rem;
			}
			.card_phone{
				@extend %common_height;
				input{
					margin-left: 0.266667rem;
				}
			}
			.check_code{
				height: 1.066667rem;
				background: #fff;
				line-height: 1.066667rem;
				.mint-cell-wrapper{
					padding: 0;
					.mint-cell-title{

					}
					.mint-cell-value{
						margin-left: 0.4rem;
						width: 3.733333rem;
	    				flex: inherit;
						input{
							
							margin: 0;
							width: 3.733333rem;
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
			.mint-field .mint-cell-title{
				width: 2.0rem;
			}
		}
		.protocol{
			height: 0.8rem;
			width: 100%;
			line-height: 0.8rem;
			font-size: 0.373333rem;
			padding-left: 0.44rem;
			input{
				display: block;
				float: left;
			}
			span{
				display: block;
				width: 2.933333rem;
				line-height: 0.373333rem;
				margin-left: 0.266667rem;
				float: left;
			}
			a{
				color: #fc896f;
				display: inline;
			}
		}
		.next{
			margin: 0 0.44rem;
            height: 1.333333rem;
            line-height: 1.333333rem;
            width: auto;
            background: #fd655a;
            color: #fff;
            font-size: 0.453333rem;
            border-radius: 0.133333rem;
            text-align: center;
            margin-top: 0.533333rem;
		}
	}
</style>