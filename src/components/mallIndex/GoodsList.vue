<template>
	<div>
		<mt-header title="商品列表">
			<span v-tap="{methods:backToIndex}" slot="left">
			    <mt-button icon="back"></mt-button>
			</span>
	    </mt-header>
	    <hot-goods-list :goodsList="products" @chooseProduct="goDetail"></hot-goods-list>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
  	import HotGoodsList from './HotGoodsList'
	export default {
		data(){
			return {
            	products:[]
			}
		},
		computed:{
	        ...mapGetters([
	            'activemallGoodsList'
	        ])
	    },
	    components:{
	        HotGoodsList
	    },
		methods:{
			backToIndex(){
				this.$router.push({ name: 'MallIndex'})
			},
			goDetail(item){
	            let vm=this;
	            console.log(item);
	            vm.$router.push({ name: 'GoodsDetail', params: { goods: item }})
	        },
	        loadInfo(){
	        	let vm = this
	            let products = vm.$store.getters.activemallGoodsList
	            if(products.length>0){
	                vm.setProduct()
	            }else{
	                vm.$store.dispatch('FETCH_MALL_GOODSLIST').then(()=>{
	                    vm.setProduct()
	                })
	            }
	        },
	        setProduct(){
	            let vm = this
	            vm.products = vm.$store.getters.activemallGoodsList
	        },
		},
		created(){
	        this.loadInfo()
	        // 返回顶部方法在vue.ext.js
	        // this.backToTop()
	      }
	}
</script>
<style lang='scss'>
	
</style>