<!-- MicroBank part of mine-->
<template>
	<div class="mine">
		<div class="info-part user-info">
			<mt-cell v-if="regStatus=='00'" title="" to="/bindcard" is-link value="">
			  <div class="head-icon">
			  	<i class="icon iconfont icon-wode1"></i>
			  </div>
			  <div class="info-content unauth">
			  	<div class="user-name">
			  		<span>游客</span>
			  		<img src="static/img/mine/weirenz@2x.png" alt="">
			  	</div>
			  	<div class="set-card">账户认证</div>
			  </div>
			</mt-cell>
			<mt-cell v-if="regStatus=='01'" title="" to="/bindcard" is-link value="">
			  <div class="head-icon">
			  	<span>{{headName}}</span>
			  </div>
			  <div class="info-content auth">
			  	<div class="user-name">
			  		<span>{{userInfo.custName}}</span>
			  		<img src="static/img/mine/yirenz@2x.png" alt="">
			  	</div>
			  	<div class="info">账户设置：添加银行卡</div>
			  </div>
			</mt-cell>
			<mt-cell v-if="regStatus=='02'" title="" to="/cardlist" is-link value="">
			  <div class="head-icon">
			  	<span>{{headName}}</span>
			  </div>
			  <div class="info-content auth">
			  	<div class="user-name">
			  		<span>{{userInfo.custName}}</span>
			  		<img src="static/img/mine/yirenz@2x.png" alt="">
			  	</div>
			  	<div class="info">{{userInfo.areaCodeName}}&nbsp;{{userInfo.cardNo|cardNum}}</div>
			  </div>
			</mt-cell>
		</div>
		<div class="info-part mine-list">
			<mt-cell title="账单" to="/bank" is-link value="">
			  <img slot="icon" src="static/img/mine/zd@3x.png" width="24" >
			</mt-cell>
			<mt-cell title="优惠券管理" to="/bank" is-link value="">
			  <img slot="icon" src="static/img/mine/yhqgl@3x.png" width="24">
			</mt-cell>
			<mt-cell title="积分管理" to="/bank" is-link value="">
			  <img slot="icon" src="static/img/mine/jfgl@3x.png" width="24" >
			</mt-cell>
			<mt-cell title="积分活动" to="/bank" is-link value="">
			  <img slot="icon" src="static/img/mine/jfhd@3x.png" width="24">
			</mt-cell>
		</div>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	export default{
		name:'mine',
		data(){
			return{
				headName:'',
				userInfo:{},
				regStatus:'00'
			}
			
		},
		methods:{
			loadInfo(){
				//获取用户卡号信息，将主卡信息显示在‘我的’页面,从store拉取数据，若length为0，则发送请求,当用户没有绑卡，进入此页面每次都会刷新
				let vm = this,openid=JSON.parse(sessionStorage.getItem('wx_info')).openid
				let templist = vm.$store.getters.activeCardList
				//提取首页信息,若有姓名，则填入，即实名认证用户,如果刷新，则从远端获取信息
				if(vm.getMsg('bankIndex','userInfo')){
					vm.setUserInfo()
				}
				if(templist.length>0){
					vm.chooseMainCard(templist)
				}else{
					vm.$store.dispatch('FETCH_BANK_CARDLIST',openid).then(()=>{
						let templist = vm.$store.getters.activeCardList
						if(templist.length>0){
							vm.chooseMainCard(templist)
						}
					})
				}
			},
			// 获取用户信息
	        getUserInfo(){
	        	let vm = this
	        	var userInfo = vm.$store.getters.activeUserInfo
				if(vm.isEmptyObject(userInfo)){
					vm.$store.dispatch('FETCH_USER_INFO').then(()=>{
						userInfo = vm.$store.getters.activeUserInfo
						vm.setMsg('bankIndex',"userInfo",userInfo)
					})
				}else{
					// 防止别人绑了你的卡,用户的权限等级没更新
					vm.getUserInfo()
					vm.setUserInfo()
				}	
	        },
	        // 选择用户信息
	        setUserInfo(){
	        	let vm = this
	        	vm.userInfo = vm.getMsg('bankIndex','userInfo')
				if(vm.userInfo.regStatus!='00'){
					// 更换权限
					vm.regStatus = vm.userInfo.regStatus
					let uname = vm.userInfo.custName
					vm.headName = uname.substr(uname.length-2)
					vm.userInfo.custName = vm.userInfo.custName
				}
	        },
			// 选择获取到的卡列表里面的主卡，将绑卡用户主卡信息覆盖认证用户信息
			chooseMainCard(templist){
				let vm = this
				templist.forEach(card=>{
					if(card.mainCard === '1'){
						vm.userInfo = card
						vm.regStatus = '02'
						let uname = vm.userInfo.custName
						
						vm.headName = uname.substr(uname.length-2)

					}
				})
			}
		},
		computed:{
			...mapGetters([
				'activeCardList',
				'activeUserInfo'
			])
				
		},
		mounted(){

			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.mine{
		.info-part{
			margin: 0.133333rem 0;
		}
		.mine-list{
			margin-top: 0.266667rem;
			.mint-cell{
				.mint-cell-title{
				  font-size: 0;
				}
			}
			.mint-cell-title{
				img{
					width: 0.986667rem;
					height: 0.986667rem;
				}
				.mint-cell-text{
					padding-left: 0.266667rem;
				}
			}
		}
		.user-info{
			.mint-cell{
				min-height:3.146667rem !important;
        		background-color: #fd655a;
				.mint-cell-title{
					flex:none;
				}

				
		        .mint-cell-value{
		          	color: white;
		          	width: 100%;
		          	height:1.706667rem;
		          	display: flex;
		          	.head-icon{
						height:100%;
						width:1.706667rem; 
						border-radius: 50%;
						border: 0.1rem solid #fff;
						text-align: center;
						background-color: #ffcac6;
						position: relative;
						span{
							font-size: 0.426667rem;
							line-height: 1.573333rem;
							height:100%;
							width:100%;
							display: inline-block;
						}
						.icon-wode1{
							position: absolute;
							top:0.333333rem;
							left: 0.36rem;
							font-size: 0.8rem;
						}
					}
		        }
		        .mint-cell-allow-right::after{
		          border-color: white;
		        }
				.unauth{
					text-align: left;
					padding-left: 0.266667rem;
					width: 6.8rem;
					display: flex;
					.user-name{
						flex: 1;
						font-size: 0.48rem;
						line-height: 0.64rem;
						img{
							width: 0.92rem;
							height: 0.453333rem;
							margin-bottom: 0.093333rem;
						}
					}
					.set-card{
						width: 2.666667rem;
						font-size: 0.4rem;
						height: 0.64rem;
						line-height: 0.64rem;
						text-align: right;
					}
				}
				.auth{
					flex: 1;
					padding: 0.26rem 0 0.26rem 0.266667rem;
					height: 100%;
					display: flex;
					flex-direction:column;
					.user-name{
						flex: 1;
						font-size: 0.48rem;
						height: 0.693333rem;
						line-height: 0.693333rem;
						img{
							width: 0.92rem;
							height: 0.453333rem;
							margin-bottom: 0.093333rem;
						}
					}
					.info{
						flex: 1;
						color: #fff;
						font-size: 0.373333rem;
					}
				}
			}
		}
		.mine-list{
			.mint-cell-text{
				color: rgb(69,68,68);
			}
		}
		.mint-cell-allow-right::after{
			width: 10px;
			height: 10px;
		}


	}
</style>
