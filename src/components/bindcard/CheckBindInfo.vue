<!-- 验证主卡信息 -->
<template>
	<div class="check_bind_info">
		<mt-header title="添加账户">
			<span v-tap="{methods:back}" slot="left">
				<mt-button icon="back"></mt-button>
			</span>
		</mt-header>
		<div class="form-wrapper">
			<div class="customer_info ratain-border">
				尊敬的{{cardData.name|bindName}}：<br>
				为了保障您账户安全，请填写以下验证信息，谢谢！
			</div>
			<div class="list-caption-title">
				<div class="title-icon"></div>
				<span class="title-name">请在下方输入尾号为{{cardData.cardNo|CheckCardCardNo}}的银行卡号</span>
			</div>
			<mt-field label="卡号" placeholder="请输入验证的银行卡号" class="ratain-border" v-model="checkInfo.cardNo"></mt-field>
			<div class="list-caption-title">
				<div class="title-icon"></div>
				<span class="title-name">请在下方手机号{{cardData.phone|checkCardPhone}}收到的验证码</span>
			</div>
			<mt-field label="验证码" placeholder="请输入验证码" v-model="checkInfo.code">
				<button v-show="showAccessButton" class="accesscaptcha" v-tap="{methods:getAccessCaptcha}">{{showAccessTip}}</button>
				<div v-show="!showAccessButton" class="accesscaptcha_gray">
					{{countdown}}秒后重新获取
				</div>
			</mt-field>
		</div>
		<footer>
			<mt-button class="btn-orange" size="large" v-tap="{methods:commitAddInfo}">下一步</mt-button>
		</footer>
	</div>
	

</template>
<script>
	import * as api from '../../api/bankApi'
	import {mapGetters} from 'vuex'
	import { MessageBox } from 'mint-ui';
	export default {
		data(){
			return{
				showAccessButton:true,
				countdown:20,
				showAccessTip:'获取验证码',
				cardData:{},
				checkInfo:{
					cardNo:'6228450438028956877',
					code:''
				}
			}
		},
		methods:{
			getAccessCaptcha(){
				let vm = this
				vm.showAccessButton=false
				let body = {
					cardNo:vm.cardData.cardNo,
					idCardNo:vm.cardData.idCardNo,
					phone:vm.cardData.phone
				}
				// 发送获取验证码信息
				api.getCode(body)
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
			getCheckInfo(){
				let vm = this
				vm.cardData = vm.getMsg('bindcard','BindCheckInfo')
			},
			//确认函数
			commitAddInfo(){
				let vm = this,wx_info = JSON.parse(sessionStorage.getItem('wx_info'))
				let body = {
					cardNo:vm.checkInfo.cardNo,
					idCardNo:vm.cardData.idCardNo,
					phone:vm.cardData.phone,
					code:vm.checkInfo.code,
					custName:vm.checkInfo.name,
					openId:wx_info.openid,
					regEntry:wx_info.appid,
					changeWxUser:true
				}
				vm.checkAndBindCard(body,wx_info.openid)
			},
			//绑卡函数
			checkAndBindCard(body,openid){
				let vm = this
				api.bindCard(body).then(resp=>{
					if(resp.data.result === 0){
						let body = resp.data.data
						vm.setMsg('bindcard','BindSuccInfo',body)
						vm.$store.dispatch('FETCH_BANK_CARDLIST',openid).then(()=>{
							vm.$store.dispatch('FETCH_USER_INFO').then(()=>{
								let userInfo = vm.$store.getters.activeUserInfo
								vm.setMsg('bankIndex',"userInfo",userInfo)
								vm.$router.push({ name: 'BindSuccess'})
							})
						})
					}else{
						// 弹窗显示错误信息
						MessageBox.alert(resp.data.msg)
					}
				})
			}
		},
		mounted(){
			this.getCheckInfo()
		},
		computed: {
		    ...mapGetters([
		        'activeUserInfo'
		    ])
		  }
	}
</script>
<style lang='scss'>
	@import '../../../static/lib/base/config.scss';
	.check_bind_info{
		.form-wrapper{
			width: 100%;
			.customer_info{
				background-color: #fff;
				height: 2.0rem;
				line-height: 0.666667rem;
				font-size: 0.4rem;
				padding: 0.333333rem 0 0.333333rem 10px;
			}
			.list-caption-title{
				padding:0.386667rem 0;
				font-size:0.373333rem;
				display:flex;
				.title-icon{
					width:0.106667rem;
					background-color:$primary-color;
				}
				.title-name{
					flex:1;
					line-height: 0.613333rem;
					padding-left:0.133333rem;
				}
			}
			.mint-field .mint-cell-title{
      			width: 1.866667rem;
      		}
      		.mint-cell-wrapper{
      			background-image: none;
      		}
      		.mint-cell:last-child{
      			background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 20%, transparent 50%);
      			.mint-cell-wrapper{
      				background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 20%, transparent 50%);
      				padding: 0;
      				.mint-cell-title{
      					padding-left: 10px;
      					margin-right: 10px;
      				}
      			}
      		}
      		.mint-cell-text{
      			color: rgb(69,68,68);
      		}
			.accesscaptcha,.accesscaptcha_gray{
				height:1.133333rem;
				width:3.466667rem;
				text-align:center;
				color:#fff;
				background:$primary-color;
				line-height:1.146667rem;
				border:none;
				padding:0;
			}
			.accesscaptcha_gray{
				background:#ddd;
			}
		}
		footer{
			margin:1.733333rem 0.28rem 0;
		}
	}
</style>