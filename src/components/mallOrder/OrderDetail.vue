<!-- 订单详情页（购物模板） -->
<template>
	<div class="order_detail" :class="{'order_fix':fixedkey}" :style="{top:-pos_top+'px'}">
		<mt-header title="确认订单">
	      	<span v-tap.prevent="{ methods : back}" slot="left">
	        	<mt-button icon="back"></mt-button>
	      	</span>
	    </mt-header>
	    <div class="goods_detail ratain-border">
	    	<img :src="showInfo.goodInfo.thumb" alt="">
	    	<div class="goods_info">
	    		<div class="goods_info_title">商品名称：{{showInfo.goodInfo.fullname}}</div>
	    		<div class="sku">已选：<span v-for="item in showInfo.goodInfo.sku">{{item}}</span></div>
	    		<div>物流：网点自提</div>
	    	</div>
	    </div>
	    <div class="list-caption-title">
			<div class="title-icon"></div>
			<span class="title-name">选择提货网点及日期：</span>
		</div>
	    
	    <div class="delivery_outlets">
	    	<mt-cell  title="区域"  is-link value="" v-tap="{ methods : open ,type:'del_area'}">
		    	<span>{{showInfo.del_area}}</span>
	        </mt-cell>
	        <mt-cell  title="网点"  is-link value="" v-tap="{ methods : open ,type:'del_dot'}">
		    	<span>{{showInfo.del_dot}}</span>
	        </mt-cell>
	        <mt-cell class="detail_address">
		    	<div>地址：{{showInfo.del_detail_address}}</div>
		    	<div>电话：{{showInfo.del_phone}}</div>
	        </mt-cell>
	        <mt-cell  title="提货日期"  is-link value="" v-tap="{ methods : open,type:'del_date' }">
		    	<span v-if="form.date == ''">请选择预计提货日期</span>
		    	<span v-else>{{form.date | timeCon}}</span>
	        </mt-cell>
	        <mt-field label="推荐人" placeholder="选填" type="text" v-model="form.referee"></mt-field>
	    </div>
	    <div class="list-caption-title">
			<div class="title-icon"></div>
			<span class="title-name">联系人信息：</span>
		</div>
	    <div class="connect_info">
	    	<mt-field label="手机号码" placeholder="请输入您的手机号" type="number" v-model="form.contactPhone"></mt-field>
		    <mt-field label="验证码" placeholder="请输入验证码" type="number" v-model="form.code">
				<button v-show="showAccessButton"  class="accesscaptcha ratain-border-left" v-tap.prevent="{ methods : getAccessCaptcha}">{{showAccessTip}}</button>
				<div v-show="!showAccessButton" class="accesscaptcha_gray ratain-border-left">
					{{countdown}}秒后重新获取
				</div>
			</mt-field>
	    </div>
	    <div class="consignee_info">
	    	<mt-cell  title="提货人"  is-link value="" v-tap="{ methods : open ,type:'del_consignee'}">
		    	<span>{{showInfo.del_consignee}}</span>
	        </mt-cell>
	    </div>
	    <div class="list-caption-title" v-show="form.del_consignee=='1'">
			<div class="title-icon"></div>
			<span class="title-name">提货人信息：</span>
		</div>
	    <div class="consignee_info"  v-show="form.del_consignee=='1'">
	    	<mt-field label="姓名" placeholder="请输入提货人姓名" v-model="form.consignee_name"></mt-field>
	    	<mt-field label="身份件号" placeholder="请输入提货人身份证件号码" v-model="form.consignee_certid"></mt-field>
			<mt-field label="手机号" placeholder="请输入提货人的手机号" type="number" v-model="form.consignee_phone"></mt-field>
	    </div>
	    <div class="pay_type">
	    	<mt-cell  title="支付方式"  is-link value="" v-tap="{ methods : open ,type:'del_pay'}">
		    	<span>{{showInfo.del_pay}}</span>
	        </mt-cell>
	        <mt-cell  title="优惠券" is-link  value="">
		    	<span>不可用</span>
	        </mt-cell>
	        <mt-cell  title="积分" is-link  value="">
		    	<span>暂不可用</span>
	        </mt-cell>
	    </div>
	    <div class="del_bill">
	    	<mt-cell  title="发票信息"  is-link value="" v-tap="{ methods : open ,type:'del_bill'}">
		    	<span>{{showInfo.del_bill}}</span>
	        </mt-cell>
	    </div>
	    <div class="del_price ratain-border">
	    	<div>
	    		<span>商品总额</span>
	    		<span class="price">￥{{showInfo.goodInfo.realprice*goodNum | tofixtwo}}</span>
	    	</div>
	    	<div>
	    		<span>运费</span>
	    		<span class="price">￥0.00</span>
	    	</div>
	    	<div>
	    		<span>优惠</span>
	    		<span class="price">￥{{showInfo.goodInfo.free*goodNum | tofixtwo}}</span>
	    	</div>
	    	<div class="allprice">
	    		<span>小计</span>
	    		<span class="price">￥{{(showInfo.goodInfo.realprice-showInfo.goodInfo.free)*goodNum | tofixtwo}}</span>
	    	</div>
	    </div>
	    <div class="list-caption-title">
			<div class="title-icon"></div>
			<span class="title-name">备注：</span>
		</div>
	    <div class="pay_tip">
	    	<textarea class="ratain-box" placeholder="如对商品规格、颜色有要求，请留言"></textarea>
	    </div>
	    <footer>
	    	<div class="info ratain-border-top">
	    		共<span class="keyInfo">{{goodNum}}</span>件，实付款<span class="keyInfo">￥{{(showInfo.goodInfo.realprice-showInfo.goodInfo.free)*goodNum | tofixtwo}}</span>
	    	</div>
	      	<div class="submitOrder" v-tap.prevent="{ methods : submitOrder}" >
	        	提交订单
	      	</div>
	    </footer>
		<mt-popup v-model="del_area" position="bottom" >
	    	<div class="pop_container">
	    		<div class="pop_title">选择区域</div>
	    		<!-- 取消则移除dom -->
	    		<radio-list v-if="del_area" class="radio-list" :options="del_area_options" :defaultProps="del_area_defalut" v-model="form.del_area" @chooseNode="chooseInfo"></radio-list>
		    	<footer>
		    		<div class="cancel" v-tap="{ methods : cancel, type:'del_area'}" >
				        取消
				    </div>
		    		
		    		<div class="sure" v-tap="{ methods : chooseDelArea}" >
				       	确定
				    </div>
			      	
			    </footer>
	    	</div>	
	    </mt-popup>
	    <mt-popup v-model="del_dot" position="bottom" >
	    	<div class="pop_container">
	    		<div class="pop_title">选择网点</div>
	    		<radio-list v-if="del_dot" class="radio-list" :options="del_dot_options" :defaultProps="del_dot_default" v-model="form.del_dot" @chooseNode="chooseInfo"></radio-list>
		    	<footer>
		    		<div class="cancel" v-tap="{ methods : cancel, type:'del_dot'}" >
			        	取消
			      	</div>
			      	<div class="sure" v-tap="{ methods : chooseDelDot}" >
			       	 	确定
			      	</div>
			    </footer>
	    	</div>	
	    </mt-popup>
	    <mt-popup v-model="del_consignee" position="bottom" >
	    	<div class="pop_container">
	    		<div class="pop_title">提货方式</div>
	    		<radio-list v-if="del_consignee" class="radio-list" :options="del_consignee_options" :defaultProps="del_consignee_default" v-model="form.del_consignee" @chooseNode="chooseInfo"></radio-list>
		    	<footer>
		    		<div class="cancel" v-tap="{ methods : cancel, type:'del_consignee'}" >
			        	取消
			      	</div>
			      	<div class="sure" v-tap="{ methods : chooseDelConsignee}" >
			       	 	确定
			      	</div>
			    </footer>
	    	</div>	
	    </mt-popup>
	    <mt-popup v-model="del_pay" position="bottom" >
	    	<div class="pop_container">
	    		<div class="pop_title">支付方式</div>
	    		<radio-list v-if="del_pay" class="radio-list" :options="del_pay_options"  v-model="form.del_pay" @chooseNode="chooseInfo"></radio-list>
		    	<footer>
		    		<div class="cancel" v-tap="{ methods : cancel, type:'del_pay'}" >
			        	取消
			      	</div>
			      	<div class="sure" v-tap="{ methods : chooseDelPay}" >
			       	 	确定
			      	</div>
			    </footer>
	    	</div>	
	    </mt-popup>
	    <mt-popup v-model="del_bill" position="bottom" >
	    	<div class="pop_container">
	    		<div class="pop_title">支付方式</div>
	    		<radio-list v-if="del_bill" class="radio-list" :options="del_bill_options"  v-model="form.del_bill" @chooseNode="chooseInfo"></radio-list>
		    	<footer>
		    		<div class="cancel" v-tap="{ methods : cancel, type:'del_bill'}" >
			        	取消
			      	</div>
			      	<div class="sure" v-tap="{ methods : chooseDelBill}" >
			       	 	确定
			      	</div>
			    </footer>
	    	</div>	
	    </mt-popup>
	    <!-- TODO:datetime-picker尚未做固定 -->
	    <mt-popup v-model="del_date" position="bottom" >
	    	<div class="pop_container">
	    		<div class="pop_title">提货日期</div>
	    		<mt-datetime-picker
				  type="date"
				  v-model="tempdate"
				  :start-date="startDate"
				  year-format="{value} 年"
				  month-format="{value} 月"
				  date-format="{value} 日">
				  
				</mt-datetime-picker>
		    	<footer>
		    		<div class="cancel" v-tap="{ methods : cancelDate}" >
			        	取消
			      	</div>
			      	<div class="sure" v-tap="{ methods : chooseDelDate}" >
			       	 	确定
			      	</div>
			    </footer>
	    	</div>	
	    </mt-popup>
	</div>
</template>
<script>
	import RadioList from '../common/RadioList'
	import {mapGetters} from 'vuex'
	import * as api from '../../api/mallApi'

	export default{
		data(){
			return {
				showAccessButton:true,
				countdown:20,
				showAccessTip:'获取验证码',
				cur_type:'',
				startDate:new Date(),
				goodNum:'2',
				tempdata:new Date(),
				showInfo:{
					goodInfo:{},
					del_area:'',
					del_dot:'',
					del_detail_address:'',
					del_phone:'',
					date:'',
					del_consignee:'',
					del_pay:'',
					del_bill:''
				},
				form:{
					referee:'',
					del_area:'',
					del_dot:'',
					date:new Date(),
					contactPhone:'',
					code:'',
					del_consignee:'',
					consignee_name:'',
					consignee_certid:'',
					consignee_phone:'',
					del_pay:'',
					del_bill:''
				},
				pos_top:0,//记录背景滑动位置
				del_area:false,//区域弹窗控制
				del_dot:false,//网点弹窗控制
				del_consignee:false,//提货人弹窗控制
				del_pay:false,//付款方式弹窗控制
				del_bill:false,//发票信息弹窗控制
				del_date:false,//提货日期弹窗控制
				del_area_options:[],//金库区域列表
				del_area_defalut:{
					label:'label',
					value:'value'
				},
				del_dot_options:[],//金库网点列表
				del_dot_default:{
					label:'label',
					value:'value'
				},
				del_consignee_options:[],//提货人选项列表
				del_consignee_default:{
					label:'label',
					value:'value'
				},
				del_pay_options:[],//付款方式列表
				del_bill_options:[],//发票信息列表
				tempdata:'',//选择data临时变量
			}
		},
		components:{
			RadioList
		},
		methods:{
			loadInfo(){
				let vm = this
				vm.getOrderArea()
				vm.getOrderConsignee()
				vm.getOrderPay()
				vm.getOrderBill()
				vm.getGoodInfo()
			},
			// 初始化商品信息,todo:根据商品id查询
			getGoodInfo(){
				let vm = this
				api.getGoodDetail().then((resp)=>{
					if(resp.data.result == 0){
						vm.showInfo.goodInfo = resp.data.data
					}
				})
			},
			// 初始化发票信息选项
			getOrderBill(){
				let vm = this
				api.getOrderBill().then((resp)=>{
					if(resp.data.result == 0){
						vm.del_bill_options = resp.data.data
						// 初始化显示数据以及code
						vm.showInfo.del_bill = resp.data.data[0].label
						vm.form.del_bill = resp.data.data[0].value
					}
				})
			},
			// 初始化地区信息
			getOrderArea(){
				let vm = this
				api.getOrderArea().then((resp)=>{
					if(resp.data.result == 0){
						vm.del_area_options = resp.data.data
						// 初始化显示数据以及code
						vm.showInfo.del_area = resp.data.data[0].label
						vm.form.del_area = resp.data.data[0].value
						// 获取网点信息
						vm.getOrderDot(vm.form.del_area)
					}
				})
			},
			getOrderDot(areaId){
				let vm = this
				api.getOrderDot(areaId).then((resp)=>{
					if(resp.data.result == 0){
						vm.showInfo.del_dot = resp.data.data[0].label
						vm.form.del_dot = resp.data.data[0].value
						vm.del_dot_options = resp.data.data
						vm.showInfo.del_detail_address = resp.data.data[0].address
						vm.showInfo.del_phone = resp.data.data[0].phone
					}
				})
			},
			confirmDate(value){
				this.form.date = value
			},
			//初始化提货方式信息
			getOrderConsignee(){
				let vm = this
				api.getOrderConsignee().then((resp)=>{
					if(resp.data.result == 0){
						vm.del_consignee_options = resp.data.data
						// 初始化显示数据以及code
						vm.showInfo.del_consignee = resp.data.data[0].label
						vm.form.del_consignee = resp.data.data[0].value
					}
				})
			},
			//初始化支付方式信息
			getOrderPay(){
				let vm = this
				api.getOrderPay().then((resp)=>{
					if(resp.data.result == 0){
						vm.del_pay_options = resp.data.data
						// 初始化显示数据以及code
						vm.showInfo.del_pay = resp.data.data[0].label
						vm.form.del_pay = resp.data.data[0].value
					}
				})
			},
	        hasClass(obj, cls) {  
            	return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
	        },
	        addClass(obj, cls) {  
	            if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
	        } ,
	        removeClass(obj, cls) {  
	          if (this.hasClass(obj, cls)) {  
	              var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
	              obj.className = obj.className.replace(reg, ' ');  
	          }  
	        },
	        getAccessCaptcha(){
				let vm = this
				vm.showAccessButton=false
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
			submitOrder(){

			},
			//配合fixedkey使用
			open(params){
				this[params.type]=true
				this.cur_type = params.type
			},
	        cancel(params){
				this[params.type]=false
	        },
	        cancelDate(){
	        	this.del_date = false
	        },
			chooseInfo(data){
				let vm = this
				vm.tempdata = data
			},
	        chooseDelArea(){
	        	let vm = this
	        	vm.form.del_area = vm.tempdata.value
				vm.showInfo.del_area = vm.tempdata.label
				vm.getOrderDot(vm.form.del_area)
				vm.del_area=false
	        },
	        chooseDelDot(){
	        	let vm = this
	        	vm.form.del_dot = vm.tempdata.value
				vm.showInfo.del_dot = vm.tempdata.label
				vm.showInfo.del_detail_address = vm.tempdata.address
				vm.showInfo.del_phone = vm.tempdata.phone
				console.log(vm.tempdata)
				vm.del_dot=false
	        },
	        chooseDelConsignee(){
	        	let vm = this
	        	vm.form.del_consignee = vm.tempdata.value
	        	vm.showInfo.del_consignee = vm.tempdata.label
	        	vm.del_consignee = false
	        },
	        chooseDelPay(){
	        	let vm = this
	        	vm.form.del_pay = vm.tempdata.value
	        	vm.showInfo.del_pay = vm.tempdata.label
	        	vm.del_pay = false
	        },
	        chooseDelBill(){
	        	let vm = this
	        	vm.form.del_bill = vm.tempdata.value
	        	vm.showInfo.del_bill = vm.tempdata.label
	        	vm.del_bill = false
	        },
	        chooseDelDate(){
	        	let vm = this
	        	this.form.date = vm.tempdate
	        	vm.del_date = false
	        }
		},
		computed:{
			fixedkey(){
	          var app = document.getElementById('app')
	          if(this[this.cur_type]){
	            this.pos_top=document.body.scrollTop
	            this.addClass(app,'app_fix')
	            app.style.top = -this.pos_top+'px'
	            this.savePopup(this.cur_type)
	            
	          }else{
	            this.removeClass(app,'app_fix')
	            // 移动端生效
	            document.body.scrollTop  = this.pos_top
	            this.removePopup()
	          }
	          return this[this.cur_type]
	        },
	        ...mapGetters([
           	 	'activeOrderDetail'
        	]),
		},
		mounted(){
			this.loadInfo()
		},
		beforeRouteLeave (to, from, next) {
			if(sessionStorage.getItem('popupArr')){
		        let tempArr = JSON.parse(sessionStorage.getItem('popupArr'))
		        if(tempArr.length>0){
		        	let cur = tempArr.pop()
		        	this[cur] = false
		        	sessionStorage.setItem('popupArr',JSON.stringify(tempArr))
		        	next(false)
		        }else{
		        	next()
		        }
		    }else{
		        next()
		    }
		}

	}
</script>
<style lang='scss'>
	@import '../../../static/lib/base/config.scss';
	.order_detail{
		.mint-field .mint-cell-title{
      		width: 1.866667rem;
      	}
		.list-caption-title{
			padding:0.133333rem 0;
			font-size:0.373333rem;
			display:flex;
			.title-icon{
				width:0.106667rem;
				background-color:$backIcon-color;
			}
			.title-name{
				flex:1;
				font-size: 0.373333rem;
				line-height: 0.613333rem;
				padding-left:0.2rem;
			}
		}
		.goods_detail{
			height: 3.04rem;
			padding: 0.333333rem;
			width: 100%;
			background-color: #fff;
			display: flex;
			margin-bottom: 0.133333rem;
			img{
				width: 2.666667rem;
				height: 2.4rem;
			}
			.goods_info{
				flex: 1;
				width: 100px;
				padding: 0.2rem 0.333333rem;
				div{
					width: 100%;
					text-overflow: ellipsis;
					overflow:hidden; 
					white-space:nowrap;
				}
				.goods_info_title{
					font-weight: 600;
					color: rgb(76,80,82);
				}
				.sku{
					margin: 0.266667rem 0 0.133333rem 0;
				}
			}

		}
		.delivery_outlets{
			.detail_address{
				height:2.293333rem;
				.mint-cell-wrapper{
					height: 100%;
					.mint-cell-value{
						display: block;
						width: 100%;
						color: #000;
						height: 1.6rem;
						margin: 0.346667rem 0;
						div{
							height: 0.8rem;
							line-height: 0.8rem;
						}
					}
				}
				
			}
		}
		.mint-cell-allow-right::after{
		    width: 10px;
		    height: 10px;
	    }
	    .delivery_outlets,.consignee_info,.connect_info,.pay_type,.pay_tip,.del_bill{
	    	padding: 0.133333rem 0;
	    }
	    .del_bill .mint-cell-value span{
	    	color: rgb(249,83,45);
	    }
	    .del_price{
	    	height: 4.666667rem;
	    	background-color: #fff;
	    	margin: 0.133333rem 0;
	    	font-size: 0.4rem;
	    	padding: 0.4rem 18px 0 10px;
	    	color: rgb(69,68,68);
	    	div{
	    		padding-bottom: 0.2rem;
	    		.price{
	    			float: right;
	    		}
	    	}
	    	.allprice{
				color: $primary-color;
	    	}
	    }
	    .pay_tip{
	    	padding-bottom: 1.866667rem;
	    	textarea{
				margin:0 0.2rem;
				padding: 0.333333rem 0.4rem;
				width:9.6rem;
				height:2.066667rem;
				color: rgb(129,131,132);
				border:none;
				resize:none;
				background:#fcfcfc;
				font-size:0.266667rem;
				text-align:left;
				overflow-y:auto;
			}
	    }
	    .connect_info{
			.accesscaptcha,.accesscaptcha_gray{
				height:0.666667rem;
				width:2.866667rem;
				text-align:center;
				color:rgb(69,68,68);
				background:#fff;
				line-height:0.666667rem;
				border:none;
				padding:0;
				margin-top: 0.24rem;
				font-size: 0.346667rem;
			}
			.accesscaptcha_gray{
				/*background:#ddd;*/
			}
	    }
	    footer{
	      position: fixed;
	      bottom: 0;
	      width: 100%;
	      height: 1.333333rem;
	      line-height: 1.333333rem;
	      display: flex;
	      background-color: #fff;
	      .info{
	      	flex: 1;
	      	font-size: 0.373333rem;
	    	color: rgb(69,68,68);
	    	padding-right: 0.266667rem;
	    	text-align: right;
			.keyInfo{
				color: rgb(249,83,45);
			}
	      }
	      .submitOrder{
	      	width: 2.933333rem;
	        background-color: #dd5549;
	        text-align: center;
	        color: #fff;
	      }
	    }
	    .mint-popup-bottom{
		    width: 101%;
		    height: 55%;
		    
		    .pop_container{
		    	overflow-y: auto;
		    	height: 100%;
		    	.mint-datetime{
		    		display: block !important;
		    		top: 0;
		    		.picker-toolbar{
		    			display: none;
		    		}
		    	}
		    	.pop_title{
			    	text-align: center;
			    	padding: 0.533333rem 0 0.4rem;
			    	position: fixed;
			    	top: 0;
			    	width: 100%;
			    	background-color: #fff;
			    	z-index: 6;
			    	color: rgb(81,81,81);
			    	font-weight: 600;
			    }
		    	.radio-list{
		    		padding: 1.36rem 0 1.68rem;
			    }
			    footer{
			      position: fixed;
			      bottom: 0;
			      width: 100%;
			      display: flex;
			      z-index: 5;
			      height: 1.68rem;
			      background-color: #fff;
			      .sure,.cancel{
					width: 4.093333rem;
					height: 1.013333rem;
					line-height: 1.013333rem;
					border: 0.026667rem solid #fd655a;
					border-radius: 0.08rem;
					text-align: center;
			      }
			      .sure{
			        background-color: #fd655a;
					margin: 0.266667rem 0.506667rem 0.4rem 0.4rem;
					color: #fff;

			      }
			      .cancel{
			      	color: #fd655a;
			      	margin: 0.266667rem 0.4rem 0.4rem 0.506667rem;
			      }
			    }
		    }
		}
	},
	.order_fix{
			position: fixed;
			left: 0;
			right: 0;
		}
</style>