<template>
	<div class="city_list">
		<mt-header title="选择所在城市">
			<span v-tap="{methods:back}" slot="left">
		        <mt-button icon="back"></mt-button>
		    </span>
		</mt-header>
		<div class="cur_city ratain-border">当前城市：{{areaInfo.city}}</div>
		<div class="list">
			<div class="list-caption-title">
				<div class="title-icon"></div>
				<span class="title-name">城市</span>
			</div>
			<div  class="grids grids-small list-table ratain-border-bottom" >
				<div class="grid list-table-cell" v-for="cell in cityData"  v-tap="{methods:chooseCity,city:cell}">	
					{{cell.name}}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	export default{
		data(){
			return{
				cityData:[],
				areaInfo:{}
			}
		},
		methods:{
			
	        getCityData(){
	        	let vm = this
	        	vm.areaInfo = vm.getMsg('bankIndex','areaInfo')
				vm.$store.dispatch('FETCH_BASE_CITY').then(()=>{
					vm.cityData = vm.$store.getters.activeCityData
				})
	        },
	        chooseCity(params){
	        	let vm = this
	        	let body = {
	        		city:params.city.id
	        	}
	        	vm.$store.dispatch('FETCH_BANK_BUSINESS_BYCITY',body).then(()=>{
	        		vm.areaInfo.city = params.city.name+'市'
					vm.$router.push({name:'BankIndex'})
				})
	        	
	        }
		},
		computed:{
			...mapGetters([
		        'activeCityData'
		    ])
		},
		mounted(){
			this.getCityData()
		}
	}
</script>
<style lang='scss'>
	@import '../../../static/lib/base/config.scss';
	.city_list{
		.cur_city{
			height: 1.146667rem;
			line-height: 1.146667rem;
			background-color: #fff;
			padding-left: 26px;
			color: rgb(48,49,53);
			font-size: 0.4rem;
		}
		.list{
			.list-caption-title{
				padding:0.2rem 0;
				font-size:0.373333rem;
				display:flex;
				.title-icon{
					width:0.106667rem;
					background-color:$backIcon-color;
				}
				.title-name{
					flex:1;
					line-height: 0.613333rem;
					padding-left:0.133333rem;
				}
			}
			.list-table{
				background-color: #fff;

				.grid{
					padding:5px 0;
					&::before{
						border-right:none;
					}
					&::after{
						border-right:none;
						border-bottom: none;
					}
				}
				.list-table-cell{
					text-align:center;
					font-size: 0.4rem;
					line-height: 0.88rem;
					
				}
			}
		}
	}
</style>