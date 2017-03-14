<template>
	<div class="bindcard">
	    <mt-header title="添加账户">
			<span v-tap="{methods:back}" slot="left">
			    <mt-button icon="back"></mt-button>
			</span>
	    </mt-header>
		<div class="form">
			<mt-field label="卡号" placeholder="请输入签约的农行卡号（选填）"  v-model="cardData.cardNo" v-vuerify="'cardData.cardNo'" :state="state.cardNo ? 'error': ''"></mt-field>
			<mt-field label="姓名" placeholder="请输入您的姓名"  v-model="cardData.custName" v-vuerify="'cardData.custName'" :state="state.custName ? 'error': ''"></mt-field>
			<mt-field label="证件号" placeholder="请输入您的开户证件号码" v-model="cardData.idCardNo"></mt-field>
			<mt-field label="手机号"  placeholder="请输入您的手机号"  
			v-model="cardData.phone" v-vuerify="'cardData.phone'"
			:state="state.phone ? 'error': ''"></mt-field>
			<mt-field label="验证码" placeholder="请输入验证码" class="code"  v-model="cardData.code" v-vuerify="'cardData.code'" :state="state.code ? 'error': ''">
				<button v-show="showAccessButton" class="accesscaptcha" v-tap="{methods:getAccessCaptcha}">{{showAccessTip}}</button>
				<div v-show="!showAccessButton" class="accesscaptcha_gray">
					{{countdown}}秒后重新获取
				</div>
			</mt-field>
		</div>
		<!-- 为了onblur的指令需要计算属性计算errors -->
		<ul style="display:none"><li v-for="err in errors" v-text="err"></li></ul>
		<footer>
			<mt-button class="btn-orange" size="large" v-tap="{methods:commitAddInfo}">下一步</mt-button>
		</footer>

	</div>
</template>
<script>
	import { Toast,MessageBox } from 'mint-ui';
	import * as api from '../../api/bankApi'
	import {mapGetters} from 'vuex'
	export default{
		name:'BindCard',
		data(){
			return {
				showAccessButton:true,
				countdown:20,
				showAccessTip:'获取验证码',
				cardData:{
					cardNo:'',//卡号
					custName: '',//姓名
					idCardNo:'',//证件号
					phone:'',// 手机号
					code:''// 验证码
				},
				// phoneflag:'',
				//验证状态
				state:{
					cardNo:'',//卡号
					custName:'',//姓名
					phone:'',// 手机号
					code:''//验证码
				}
			}
		},
		// 验证规则
		vuerify:{
			'cardData.phone':{
		      test:/15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|13[0-9]{9}/,
		      message: '手机号格式错误'
		    },
		    'cardData.custName':{
		    	test(val){
		    	 	return val!=''
		    	},
		    	message: '姓名不能为空'
		    },
			'cardData.cardNo':{
		      test:/^$|[0-9]{16,19}/,
		      message: '卡号格式不正确'
		    },
		    'cardData.code':{
		      test:/[0-9]{6}/,
		      message: '验证码格式不正确'
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
			// 新增查询当前卡号是否被绑定，是否为主卡
			// 查询当前地理位置作为注册地
			commitAddInfo(){
				let vm = this,openid=JSON.parse(sessionStorage.getItem('wx_info')).openid,location = {}
				let wx_info = JSON.parse(sessionStorage.getItem('wx_info'))
				vm.configWxjssdk()
				wx.getLocation({
				    type: 'wgs84', 
				    success: function (res) {
				        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
				        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
				        var speed = res.speed; // 速度，以米/每秒计
				        var accuracy = res.accuracy; // 位置精度
				        let body = {
							cardNo:vm.cardData.cardNo,
							idCardNo:vm.cardData.idCardNo,
							phone:vm.cardData.phone,
							code:vm.cardData.code,
							custName:vm.cardData.custName,
							openId:wx_info.openid,
							regEntry:wx_info.appid,
							lat:latitude,//纬度
							lng:longitude,//经度
							changeWxUser:false
						}
						alert(openid)
						vm.checkInfo(body,openid)
				    },
				    cancel: function (res) {
				    	let body = {
							cardNo:vm.cardData.cardNo,
							idCardNo:vm.cardData.idCardNo,
							phone:vm.cardData.phone,
							code:vm.cardData.code,
							custName:vm.cardData.custName,
							openId:wx_info.openid,
							regEntry:wx_info.appid,
							lat:'0',//纬度
							lng:'0',//经度
							changeWxUser:false
						}
						vm.checkInfo(body,openid)
				    },
					fail: function(err){
						let body = {
							cardNo:vm.cardData.cardNo,
							idCardNo:vm.cardData.idCardNo,
							phone:vm.cardData.phone,
							code:vm.cardData.code,
							custName:vm.cardData.custName,
							openId:wx_info.openid,
							regEntry:wx_info.appid,
							lat:'0',//纬度
							lng:'0',//经度
							changeWxUser:false
						}
						vm.checkInfo(body,openid)
					}
				})
				
				
				
			},
			//验证判断绑定卡
			checkInfo(body,openid){
				let vm = this
				if (vm.$vuerify.check()) {
					vm.checkAndBindCard(body,openid)
			    }else{
			    	Toast({
					  message: '表单数据格式错误',
					  position: 'top',
					  duration: 2000
					});
			    }
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
					}else if(resp.data.result != 0&&resp.data.msg=='已被绑定_主卡'){
						let endNum = vm.cardData.cardNo.substr(vm.cardData.cardNo.length-4)
						body.changeWxUser = true
						MessageBox.confirm('您已绑定了其他微信号，确定要将微信号下所有银行卡（尾号'+endNum+'等N张卡）解绑并添加至当前微信号下？','温馨提示').then(action => {
							vm.checkAndBindCard(body,openid)
						}).catch(()=>{
							console.log('cancel')
						})
					}else if(resp.data.result != 0&&resp.data.msg=='已被绑定_非主卡'){
						let body = resp.data.data
						alert(JSON.stringify(body))
						let endNum = vm.cardData.cardNo.substr(vm.cardData.cardNo.length-4)
						MessageBox.confirm('您已绑定了其他微信号，确定要将微信号下所有银行卡（尾号'+endNum+'等N张卡）解绑并添加至当前微信号下？','温馨提示').then(action => {
								vm.setMsg('bindcard','BindCheckInfo',body)
								vm.$router.push({ name: 'CheckBindInfo'})
						}).catch(()=>{
							console.log('cancel')
						})
						
					}else{
						// 弹窗显示错误信息
						MessageBox.alert(resp.data.msg)
					}
				})
			},
			// 验证策略--通过vuerify收集错误（此时错误信息已就位）,之后通过自定义指令绑定blur事件,指令内部将emit出错误信息及其来源，组件内部接收并进行处理
			validation(){
				let vm = this
				vm.$on('vuerify-invalid', (name,errorMsg) => {
					Toast({
					  message: errorMsg,
					  position: 'top',
					  duration: 2000
					});
					if(name === 'cardData.phone'){
						vm.state.phone = true
					}
					if(name === 'cardData.cardNo'){
						vm.state.cardNo = true
					}
					if(name === 'cardData.code'){
						vm.state.code = true
					}
					if(name === 'cardData.custName'){
						vm.state.custName = true
					}
				})
				vm.$on('vuerify-valid',(name)=>{
					if(name === 'cardData.phone'){
						vm.state.phone = false
					}
					if(name === 'cardData.cardNo'){
						vm.state.cardNo = false
					}
					if(name === 'cardData.code'){
						vm.state.code = false
					}
					if(name === 'cardData.custName'){
						vm.state.custName = false
					}
				})
			}
		},
		computed: {
		    ...mapGetters([
		        'activeUserInfo'
		    ]),
		     errors () {
		     	console.log(this.$vuerify.$errors)
		      return this.$vuerify.$errors
		    }
		  },
		created(){
			// 启动验证接收函数
			this.validation()
		},
		mounted(){
			
		}
	}
</script>
<style lang='scss'>

	@import '../../../static/lib/base/config.scss';
	.bindcard{
		header{
			background:#09dba2;
			color:#fff;
			text-align:center;
			font-weight:600;
			font-size:16px;
		}
		.form{
			.code{
				position: relative;
				.mint-field-state.is-error{
					position: absolute;
					right: 3.733333rem;
				}
			}
      		.mint-field .mint-cell-title{
      			width: 1.866667rem;
      		}
      		.mint-cell-text{
      			color: rgb(69,68,68);
      		}
			.accesscaptcha,.accesscaptcha_gray{
				height:1.146667rem;
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
			margin:3.733333rem 0.28rem 0;
		}
	}
</style>
