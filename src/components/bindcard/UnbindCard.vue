<template>
	<div class="unbindCard">
		<mt-header title="删除账户">
			<span v-tap="{methods:backToCard}" slot="left">
		        <mt-button icon="back"></mt-button>
		    </span>
    	</mt-header>
		<mt-cell title="选择绑定卡号" is-link value="" v-tap="{ methods : open}">
		  <span  size="large">{{curNum}}</span>
		</mt-cell>
		<footer>
			<mt-button class="btn-orange" size="large" @click="commitUnbindInfo">下一步</mt-button>
		</footer>
		<mt-popup v-model="numberflag" position="bottom" class="mint-popup-4">
			<div class="opt-area">
				<span v-tap="{methods:selectNum}">完成</span>
			</div>
      		<mt-picker :slots="info" :valueKey="keyValue" @change="onValuesChange" :visible-item-count="5" :show-toolbar="false"></mt-picker>
    	</mt-popup>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui';
	import {mapGetters} from 'vuex'
	import * as api from '../../api/bankApi'
	export default{
		name:'UnbindCard',
		data(){
			return {
				numberflag:false,
				curNum:'',//显示卡号信息
				selectedNum:'',//选中的卡号
				info:[
			        {
			          flex: 1,
			          values: [],
			          className: 'slot1',
			          textAlign: 'center'
			        }
			    ],
			    keyValue:'showNo',
			    tempNum:'',//临时卡号信息
			    tempShowNum:''//临时显示卡号信息
			}
		},
		methods:{
			//获取卡列表信息,从store拉取数据，若length为0，则发送请求(理论上当用户进入此页面，表示至少有一张卡，不过当用户刷新数据，会清空内存数据导致length为0)
			getCards(){
				let vm = this
				let templist = vm.$store.getters.activeCardList
				if(templist.length>0){
					vm.chooseSelectNum(templist)
				}else{
					vm.fetchCardlist()
				}
				
			},
			//向服务端发送请求获取数据,如果数据长度为零，跳转到绑卡页面
			fetchCardlist(){
				let vm = this,openid = JSON.parse(sessionStorage.getItem('wx_info')).openid
				vm.$store.dispatch('FETCH_BANK_CARDLIST',openid).then(()=>{
					let templist = vm.$store.getters.activeCardList
					if(templist.length>0){
						vm.chooseSelectNum(templist)
					}else{
						vm.$router.push({ name: 'BindCard'})
					}
				})
			},
			//选择默认卡并且构造列表数据
			chooseSelectNum(templist){
				let vm = this
				for(let i = 0;i<templist.length;i++){
					let showNo = vm.starcover(templist[i].cardNo,4,4)
					vm.$set(templist[i],'showNo',showNo)
				}
				vm.info[0].values = templist
				vm.curNum = templist[0].showNo
				vm.selectedNum = templist[0].cardNo
			},
			onValuesChange(picker, values){
				let vm = this
				//将当前选择的显示号码传入tempShowNum
				vm.tempShowNum = values[0].showNo
				//将当前选中的号码传入tempNum
				vm.tempNum = values[0].cardNo
			},
			// 解绑
			commitUnbindInfo(){
				let vm = this
				MessageBox.confirm('确定将卡号为'+vm.curNum+'的银行卡解除绑定？','温馨提示').then(action => {
						// 找出当前默认卡
						let defaultCardNo = ''
						vm.info[0].values.forEach(item=>{
							if(item.mainCard === '1'){
								defaultCardNo = item.cardNo
							}
						})
						if(vm.selectedNum===defaultCardNo&&vm.info[0].values.length>1){
							MessageBox.alert('默认卡不能解绑', '温馨提示')
						}else{
							let body = {
								cardNo:vm.selectedNum,
								openid:JSON.parse(sessionStorage.getItem('wx_info')).openid
							}
							vm.deleteCard(body)
						}
					}).catch(()=>{
						console.log('cancel')
					});
			},
			//删除卡以及后续操作
			deleteCard(body){
				let vm = this,openid = JSON.parse(sessionStorage.getItem('wx_info')).openid
				api.DeleteCard(body)
					.then(resp=>{
						if(resp.data.result === 0){
							vm.$store.dispatch('FETCH_BANK_CARDLIST',openid).then(()=>{
								vm.$store.dispatch('FETCH_USER_INFO').then(()=>{
									let userInfo = vm.$store.getters.activeUserInfo
									vm.setMsg('bankIndex',"userInfo",userInfo)
									vm.$router.push({ name: 'UnbindSuccess'})
								})
							})
						}else{
							vm.setMsg('unbindcard','unbindErrorMsg',resp.data.msg)
							vm.$router.push({ name: 'UnbindError'})
						}
					})
			},
			open(){
				this.numberflag = true
			},
			selectNum(){
				let vm = this
				if(vm.tempShowNum!=''){
					vm.curNum = vm.tempShowNum
					vm.selectedNum = vm.tempNum
				}
				this.numberflag = false
			},
			backToCard(){
	        	this.$router.push({ name: 'CardList'})
	      	}
		},
		computed:{
			...mapGetters([
				'activeCardList',
				'activeUserInfo'
			])	
		},
		mounted(){
			this.getCards()
		}

	}
</script>
<style lang='scss'>
	.unbindCard{
		footer{
			margin:5.92rem 0.28rem 0;
			
		}
		.mint-cell-allow-right::after{
			width: 10px;
			height: 10px;
		}
		.mint-popup-4 {
        	width: 100%;
        .picker-slot-wrapper, .picker-item {
          backface-visibility: hidden;
        }
        /*去除上横线*/
        .mint-cell-wrapper{
        	background-image: none;
        }
        .opt-area{
        	position: relative;
		  	width: 100%;
		  	box-sizing: border-box;
		  	text-align: right;
		  	padding:0.266667rem 0;
        	&::after{
        		content: " ";
			  	position: absolute;
			  	left: 0;
			  	bottom: 0;
			  	width: 100%;
			  	height: 1px;
			  	border-bottom: 1px solid #D9D9D9;
			  	color: #D9D9D9;
			  	-webkit-transform: scaleY(0.5);
			          	transform: scaleY(0.5);
        	}

			span{
				padding: 0.266667rem 0.4rem;
				font-size: 0.4rem;
			}
        }
      }
	}
</style>