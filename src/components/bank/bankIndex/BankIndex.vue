<!-- MicroBank part of index-->
<template>
	<div class="bank_index">
		<bank-header :swipe="swipe" :areaInfo="areaInfo" :activityOption="activityOption"></bank-header>
		<bank-head-info :infoHeadLine="infoHeadLine" :infoLineOption="infoLineOption"></bank-head-info>
		<bank-activity :bankActivity="bankActivity"></bank-activity>
		<div class="floor-item" v-for="item in floor">
			<template-one v-if="item.type === '1'" :floorData="item" @getMore="getMore"></template-one>
			<template-two v-if="item.type === '2'" :floorData="item" @getMore="getMore"></template-two>
		</div>
		<bank-tool class="bank_floor" :toolData="bankTool"></bank-tool>
		
	</div>
</template>
<script>

	import * as api from '../../../api/bankApi'
	import * as baseApi from '../../../api/baseApi'
	import TemplateOne from './TemplateOne'
	import TemplateTwo from './TemplateTwo'
	import BankHeader from './BankHeader'
	import BankHeadInfo from './BankHeadInfo'
	import BankActivity from './BankActivity'
	import BankTool from './BankTool'
	import {mapGetters} from 'vuex'
	import { MessageBox } from 'mint-ui';
	export default{
		name:'bankIndex',
		data(){
			return {
				areaInfo:{},
				infoHeadLine:{},
				swipe:{},
	            bankActivity:{},
	            floor:[],
	            bankTool:{},
	            activityOption:{
	            	autoplay: 4000,
	            	pagination: '.swiper-pagination',
	            	loop: true
	            },
	            infoLineOption:{
	            	autoplay: 4000,
	            	direction: 'vertical',
	            	loop:true
	            }
			}
		},
		components:{
			TemplateOne,
			TemplateTwo,
			BankHeader,
			BankHeadInfo,
			BankActivity,
			BankTool
		},
		methods:{
			// 获取数据,从store拉取数据，若对象为空，则发送请求
			// 流程改1：默认城市从session中获取，请求api,如果定位有，提示定位切换
			// 流程改2：默认城市从session中获取，请求api，获取用户信息，跑定位，如果定位有，检测定位，如果有不同，判断切换定位
			loadBankBus(){
				let vm = this
		   		var userInfo = vm.$store.getters.activeUserInfo
				if(vm.isEmptyObject(userInfo)){
					vm.$store.dispatch('FETCH_USER_INFO').then(()=>{
						userInfo = vm.$store.getters.activeUserInfo
						vm.setMsg('bankIndex',"userInfo",userInfo)
						vm.getMenuData()	
					})
				}else{
					vm.setMsg('bankIndex',"userInfo",userInfo)
					vm.getMenuData()
				}
			},
			// 获取首页信息
			getMenuData(){
				let vm = this
				var business = vm.$store.getters.activeBankBusiness
				if(vm.isEmptyObject(business)){
					vm.chooseCity()
				}else{
					vm.assignment(business)
				}	
			},
			//根据默认城市获取定位，之后获取当前地理位置
			chooseCity(){
	        	let vm = this
	        	let wx_info = JSON.parse(sessionStorage.getItem('wx_info'))
	        	let body = {
	        		city:wx_info.defAreaCode
	        	}
	        	vm.$store.dispatch('FETCH_BANK_BUSINESS_BYCITY',body).then(()=>{
	        		let business = vm.$store.getters.activeBankBusiness
					vm.assignment(business)
					vm.getWxArea()
				})
	        },
			//获取地理位置判断当前地理位置是否是南京
	        getWxArea(){
	        	let vm = this
	        	let wx_info = JSON.parse(sessionStorage.getItem('wx_info'))
	        	vm.configWxjssdk()
				
				wx.ready(function () {
					wx.getLocation({
				        type: 'wgs84', 
				        success: function (res) {
				            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
				            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
				            var speed = res.speed; // 速度，以米/每秒计
				            var accuracy = res.accuracy; // 位置精度
				            var body={
				                lat:latitude,
				                lng:longitude,
				                appid:wx_info.appid,
				                openid:wx_info.openid
				            }
				            let cityInfo = {
				            	lat:latitude,
				                lng:longitude
				            }
				            vm.setMsg('bankIndex',"location",res)
				            vm.changeDefault(body,cityInfo)
				        },
				        cancel: function (res) {
					        
					    },
					    fail: function(){
					    	alert('请打开定位服务，获取更好的服务')
					    }
				    })
			    })
			
	        },
	        //提示是否切换城市
	        changeDefault(body,cityInfo){
	        	let vm = this
	        	let wx_info = JSON.parse(sessionStorage.getItem('wx_info'))
	        	baseApi.getCity(cityInfo).then(resp=>{
				    if(resp.data.result==0){
				        if(resp.data.data.code!=wx_info.defAreaCode){
				        	if(resp.data.data.code!='99'&&resp.data.data.code!='00'){
				        		MessageBox.confirm('是否切换到当前城市：'+resp.data.data.city,'温馨提示').then(action => {
									vm.$store.dispatch('FETCH_BANK_BUSINESS',body).then(()=>{
										let business = vm.$store.getters.activeBankBusiness
										// 保存当前城市信息
										let allInfo = JSON.parse(sessionStorage.getItem('wx_info'))
						        		allInfo.defAreaCode=resp.data.data.code
						        		sessionStorage.setItem('wx_info',JSON.stringify(allInfo))
										vm.assignment(business)
										// 强制更新用户信息
										vm.$store.dispatch('FETCH_USER_INFO').then(()=>{
											let userInfo = vm.$store.getters.activeUserInfo
											vm.setMsg('bankIndex',"userInfo",userInfo)
										})
									})
								}).catch(()=>{
									console.log('cancel')
								})
				        	}
				        }
				    }
				})
	        },
			// 渲染首页数据赋值
			assignment(business){
				let vm = this
				//1.地区信息
				vm.areaInfo = business.areaInfo
				vm.setMsg('bankIndex',"areaInfo",business.areaInfo)
				//2.活动轮播图
				vm.swipe = business.swipe
				vm.activityOption.autoplay = vm.swipe.switch_time
				//3.头条资讯
				vm.infoHeadLine = business.infoHeadLine
				vm.infoLineOption.autoplay = vm.infoHeadLine.switch_time
				//4.常用业务
				vm.bankActivity = business.commonBus
				//5.楼层活动
				vm.floor = business.floor
				//6.工具
				vm.bankTool = business.tool
			},
			getMore(id){
				console.log(id)
				this.$router.push({ name: 'FloorMore'})
			},
			update_wx_title(title) {
			    document.title = title;
			    var mobile = navigator.userAgent.toLowerCase();
			    if (/iphone|ipad|ipod/.test(mobile)) {
			        var iframe = document.createElement('iframe');
			        iframe.style.visibility = 'hidden';
			        iframe.setAttribute('src', 'http://www.95599.cn/jiangsu/intro/jsweixintest/ABCWeJS/dist/static/img/1.jpg');
			        var iframeCallback = function() {
			            setTimeout(function() {
			                iframe.removeEventListener('load', iframeCallback);
			                document.body.removeChild(iframe);
			            }, 0);
			        };
			        iframe.addEventListener('load', iframeCallback);
			        document.body.appendChild(iframe);
			    }
			}

		},
		computed:{
		    ...mapGetters([
		        'activeBankBusiness',
		        'activeUserInfo'
		    ])
		},
		created(){
			this.update_wx_title("微银行")
			this.loadBankBus()
				
			
		}
	}
</script>
<style lang='scss'>
	@import '../../../../static/lib/base/config.scss';
	.bank_index{
		background: #fff;
		.card1,.card2,.card3{
			position: relative;
			.title{
				position: absolute;
				.main_title,.sub_title{
					width: 100%;
					overflow: hidden;
					position: absolute;
				}
			}
		}
		.card1{
			.title{
				width: 4.626667rem;
				height: 100%;
				right: 0;
				top: 0;
				.main_title,.sub_title{
					font-size: 0.373333rem;
				}
				.main_title{
					top: 1.013333rem;
				}
				.sub_title{
					top: 1.586667rem;
				}
			}
		}
		.card2{
			.title{
				width: 100%;
				top: 0;
				height: 1.4rem;
				.main_title,.sub_title{
					left: 0.2rem;
				}
				.main_title{
					top: 0.4rem;
					font-size: 0.373333rem;
				}
				.sub_title{
					top: 0.933333rem;
					font-size: 0.293333rem;
					color: #727272;
				}
			}
		}
		.card3{
			.title{
				width: 3.333333rem;
				top: 0;
				height: 100%;
				.main_title,.sub_title{
					left: 0.4rem;
				}
				.main_title{
					top: 0.466667rem;
					font-size: 0.373333rem;
				}
				.sub_title{
					top: 0.986667rem;
					font-size: 0.213333rem;
				}
			}
		}
		.floor{
			padding-bottom: 0.08rem;
			header{
				padding: 0.44rem 0.346667rem 0;
				position: relative;
				.title{
					font-size: 0.4rem;
					color: rgb(2,2,2);
				}
				.more{
					font-size: 0.346667rem;
					color: rgb(95,95,95);
					position: absolute;
					right: 0.24rem;
					bottom: 0;
					padding: 0.133333rem 0.106667rem 0;
				}
			}
			.wrapper{
				margin:0.08rem 0.346667rem 0;
				.first_floor{
					margin-bottom: 0.133333rem;
				}
			}
		}
		.bank_floor{	
			padding-bottom: 65px; 	
		}
	}

</style>