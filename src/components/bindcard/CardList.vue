<template>
	<div class="cardlist">
		<mt-header fixed title="我的账户">
			<span v-tap="{methods:backToBank}" slot="left">
		        <mt-button icon="back"></mt-button>
		      </span>
			<mt-button class="unbind" v-if="cardlist.length>0" slot="right" @click="unbindCard">解绑</mt-button>
		</mt-header>
		<div class="myCard" v-bind:class="{bgRed:index%2==0,bgBlue:index%2==1}" v-for="(item,index) in cardlist" v-tap="{methods:chooseDefault,item:item}">
			<div class="choose_icon">
				<div class="icon">
					<img src="../../../static/img/mine/ico_nongye.png" alt="">
				</div>
			</div>
			<div class="card_info">
				<div class="card_area">
					<div class="bankName">农业银行</div>
					<div class="bankArea">{{item.areaCodeName}}</div>
				</div>
				<div class="cardType">{{item.cardType}}</div>
				<div class="card_number" :class="{defaultNum:item.mainCard == '1'}">{{item.cardNo|cardNum}}</div>
				
				<div class="set_default" v-show="item.mainCard != '1'">
					<span class="radio_core" :class="{'checked':item.mainCard === '1'}"></span>
					<input type="radio" v-model="selectedNumber" value="item.card_number">
					<span  class="set_tip">设置该卡为默认卡</span>
				</div>
				<div class="card_type">
					<span v-show="item.mainCard === '1'">默认卡片</span>
				</div>
			</div>
			
		</div>
		
		<div class="addCard" v-tap="{methods:addCard}">
			<div class="addCardIcon"></div>
			<div class="addCardInfo">点击添加银行卡</div>
		</div>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui';
	import {mapGetters} from 'vuex'
	import * as api from '../../api/bankApi'
	export default{
		name:'Cardlist',
		data(){
			return {
				selectedNumber:'',
				cardlist:[]
			}
		},
		methods:{
			// 获取卡列表信息,从store拉取数据，若length为0，则发送请求(理论上当用户进入此页面，表示至少有一张卡，不过当用户刷新数据，会清空内存数据导致length为0)
			getCards(){
				let vm = this,openid=JSON.parse(sessionStorage.getItem('wx_info')).openid
				vm.cardlist = vm.$store.getters.activeCardList
				if(vm.cardlist.length>0){
					vm.chooseMainCard(vm.cardlist)
				}else{
					vm.$store.dispatch('FETCH_BANK_CARDLIST',openid).then(()=>{
						vm.cardlist = vm.$store.getters.activeCardList
						if(vm.cardlist.length>0){
							vm.chooseMainCard(vm.cardlist)
						}
					})
				}
			},
			//选择出主卡
			chooseMainCard(cardlist){
				let vm = this
				cardlist.forEach(item=>{
					if(item.mainCard === '1'){
						vm.selectedNumber = item.cardNo
					}
				})
			},
			//修改默认卡之后,需要更新store中的数据并进行局部刷新
			chooseDefault(params){
				let vm = this
				if(vm.selectedNumber !== params.item.cardNo){
					MessageBox.confirm('确定将卡号为'+params.item.cardNo+'的银行卡设置为默认卡吗？','温馨提示').then(action => {
					  vm.selectedNumber = params.item.cardNo
					  
					  let body = {
					  	cardNo:params.item.cardNo,
					  	openid:JSON.parse(sessionStorage.getItem('wx_info')).openid
					  }
					  this.updateCards(body)
					}).catch(()=>{
						console.log('cancel')
					});
				}
			},
			//修改默认卡之后的更新数据以及渲染
			updateCards(body){
				let vm = this,openid=JSON.parse(sessionStorage.getItem('wx_info')).openid
				api.changeDefaultCard(body).then(resp=>{
					if(resp.data.result===0){
					  	vm.$store.dispatch('FETCH_BANK_CARDLIST',openid).then(()=>{
							vm.cardlist = vm.$store.getters.activeCardList
							vm.chooseMainCard(vm.cardlist)
						})
					}else{
					  	vm.$store.dispatch('FETCH_BANK_CARDLIST',openid).then(()=>{
							vm.cardlist = vm.$store.getters.activeCardList
							vm.chooseMainCard(vm.cardlist)
						})
					}
				})
			},
			addCard(){
				this.$router.push({ name: 'BindCard'})
			},
			unbindCard(){
				this.$router.push({ name: 'UnbindCard'})
			},
			backToBank(){
	          this.$router.push({ name: 'BankMine'})
	        }
		},
		computed:{
			...mapGetters([
				'activeCardList'
			])	
		},
		mounted(){
			this.getCards()
		}
	}
</script>
<style lang='scss'>
	@import '../../../static/lib/base/config.scss';
	.cardlist{
		padding:1.573333rem 0.346667rem 0.346667rem;
		width: 100%;
		.mint-button-text{
			color:rgb(45,193,182);
			font-size: 15px;
		}
		.unbind{
			.mint-button-text{
				color: $primary-color;
			}
		}
		.myCard{
      		background-size: 110%;
      		color: white;
			width: 100%;
			display: flex;
			height: 3.333333rem;
			border-radius: 0.16rem;
			margin-bottom: 0.4rem;
      		padding-top:0.4rem;
      		padding-bottom: 0.6rem;
			.choose_icon{
				width: 1.466667rem;
				position: relative;
				.icon{
					width: 0.933333rem;
					height: 0.933333rem;
					margin: 0 auto;
					img{
						width: 100%;
						height: 100%;
					}
				}
				span{
					position: absolute;
					top: -0.666667rem;
					left: 0.106667rem;
					font-size: 0.32rem;
					line-height: 0.32rem;
					padding-top: 0.133333rem;
					background: url('../../../static/img/mine/mr@3x.png') no-repeat;
					width: 0.72rem;
					height: 100%;
					display: inline-block;
					background-size: 100%;
					text-align: center;
					color: rgb(38,164,169);
				}
			}
			.card_info{
				flex: 1;
				font-size: 0.426667rem;
				line-height: 0.533333rem;
				.card_area{
					display: flex;
					.bankName{
						flex: 1;
					}
					.bankArea{
						width: 2.666667rem;
						padding-right: 0.266667rem;
						text-align: right;
						font-size: 0.373333rem;
						color: rgba(255,255,255,.5);
					}
				}
				.cardType{
					font-size: 0.373333rem;
				}
				.card_number{
					padding-top: 0.16rem;
				}
				.defaultNum{
					padding-top: 0.506667rem;
				}
				.card_type{
					text-align: right;
					padding-right: 0.266667rem;
					span{
						background-color: rgba(255,255,255,.8);
						color: #d95d82;
						font-size: 0.24rem;
						padding: 0.106667rem 0.133333rem;
						border-radius: 0.08rem;
						text-align: center;
					}
				}
		        .set_default{
		          margin-top: 0.333333rem;
			        .set_tip{
			          	font-size: 14px;
			          	height: 20px;
			          	line-height: 20px;
			          	display:block;
			          	padding-left: 26px;
			        }
			        input{
						display: none;
					}
					.radio_core{
						display: inline-block;
					    background-color: rgba(255,255,255,.5);
					    border-radius: 100%;
					    border: 1px solid #fff;
					    position: relative;
					    width: 18px;
					    height: 18px;
					    vertical-align: middle;
					    float: left;
					    
					}
					.checked{
						&::after{
							content: " ";
						    border-radius: 100%;
						    top: 5px;
						    left: 5px;
						    position: absolute;
						    width: 8px;
						    height: 8px;
						    -webkit-transition: -webkit-transform .2s;
						    transition: -webkit-transform .2s;
						    transition: transform .2s;
						    transition: transform .2s, -webkit-transform .2s;
						    -webkit-transform: scale(0);
						    transform: scale(1);
						    z-index: 3;
						    background-color: #fff;
					    }
					}
		        }
			}

		}
		.bgBlue{
			background: url('../../../static/img/mine/bgBlue.png') no-repeat;
		}
		.bgRed{
			background: url('../../../static/img/mine/bgRed.png') no-repeat;
		}
		.addCard{
      		background: #d4d4d4;
			background-size: 116%;
			width: 100%;
			display: flex;
			height: 2.773333rem;
			border-radius: 0.16rem;

			.addCardIcon{
				width: 2.773333rem;
				height: 2.773333rem;
				background: url('../../../static/img/mine/add@3x.png') 20px 20px no-repeat;
				background-size: 60%;
				text-align: center;
			}
			.addCardInfo{
				line-height: 2.773333rem;
				padding-left: 0.68rem;
				font-size: 0.48rem;
        		color:#fff;
			}
		}
	}
</style>
