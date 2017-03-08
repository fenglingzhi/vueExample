<!-- 所有服务模板 -->
<template>
	<div class="allservice">
		<mt-header title="全部服务">
			<span v-tap="{methods:backToIndex}" slot="left">
				<mt-button icon="back"></mt-button>
			</span>
		</mt-header>
		<div class="wrapper ratain-border-top">
			<div class="service_container ratain-border-bottom" v-for="list in service">
				<div class="list-caption-title">
					<div class="title-icon"></div>
					<span class="title-name">{{list.title}}</span>
				</div>
				<div class="list_wrapper">
					<div class="list_item" v-for="item in list.data" v-tap="{methods:skipUrl,link_url:item.link_url,auth:item.auth}">
						<img v-lazy="item.img_url">
						<div class="title">{{item.title}}</div>
					</div>
				</div>
				
			</div>
		</div>
		
	</div>
	
</template>
<script>
	import {mapGetters} from 'vuex'
	export default{
		data(){
			return {
				service:[]
			}
		},
		methods:{
			//返回首页
			backToIndex(){
				this.$router.push({ name: 'BankIndex'})
			},
			//获取当前页面数据
			loadInfo(){
				let vm = this
				let citycode = vm.getMsg('bankIndex',"areaInfo").citycode
				vm.$store.dispatch('FETCH_BANK_SERVICE',citycode).then(()=>{
					vm.service = vm.$store.getters.activeBankService
				})
			}
		},
		computed:{
		    ...mapGetters([
		        'activeBankService',
		    ])
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	@import '../../../../static/lib/base/config.scss';
	.allservice{
		.wrapper{
			margin-top: -0.133333rem;
			&:before{
				top:-1px;
			}
		}
		.service_container{
			background-color: #fff;
			.list-caption-title{
				padding:0.706667rem 0 0.346667rem;
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
					padding-left:0.48rem;
				}
			}
			.list_wrapper{
				position: relative;
				overflow: hidden;
				.list_item{
					width: 25%;
					display: inline-block;
					padding-bottom: 0.373333rem;
					text-align: center;
					float: left;
					img{
						width: 1.413333rem;
						height: 1.413333rem;
					}
					.title{
						font-size: 0.32rem;
						color: rgb(2,2,2);
						height: 0.826667rem;
						padding: 0 10%;
					}
				}
			}
			
		}
	}
</style>