<!-- 商品图文详情页模板 -->
<template>
	<div class="graphicDetail">
		<mt-header title="图文详情">
	      <span v-tap="{methods:back}" slot="left">
	        <mt-button icon="back"></mt-button>
	      </span>
	    </mt-header>
	    <div class="goodsInfo wrapper  ratain-border-top">
	    	<div class="infoTitle">
	    		<span class="title_cn">产品说明</span>
	    		<span class="title_en">PRODUCT MANUAL</span>
	    	</div>
	    	<div class="infoContent">
	    		{{goodsGraphic.proIntro}}
	    	</div>
	    </div>
	    

	    <div class="goodsInfo">
	    	<div class="infoTitle">
				<span class="title_cn">商品展示</span>
	    		<span class="title_en">PRODUCT SHOWCASE</span>
	    	</div>
	    	<div class="infoImg">
	    		{{goodsGraphic.proIntro}}
	    		<div v-html="goodsGraphic.proImgDetail"></div>
	    	</div>
	    </div>

	    
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	export default{
		data(){
			return {
				goodsGraphic:{}
				
            }
		},
		methods:{
			
	        loadGoodsGraphic(){
	        	let vm = this
		          	vm.$store.dispatch('FETCH_MALL_GOODSGRAPHIC').then(()=>{
		            	vm.goodsGraphic = vm.$store.getters.activeGoodsGraphic
		          })
	        }
		},
		computed:{
	        ...mapGetters([
	            'activeGoodsGraphic'
	        ])
	    },
		mounted(){
			this.loadGoodsGraphic()
		}
	}
</script>
<style lang='scss'>
	@import '../../../static/lib/base/config.scss';
	.graphicDetail{
		.wrapper{
			margin-top: -0.133333rem;
			&:before{
				top:-1px;
			}
		}
		.goodsInfo{
			background-color: #fff;
			padding-top: 0.533333rem;
			.infoTitle{
				width: 8.346667rem;
				height: 0.8rem;
				text-align: center;
				margin: 0 auto 0.4rem;
				color: #fff;
				background-color: $primary-color;
				line-height: 0.8rem;
				.title_cn{
					font-size: 0.4rem
				}
				.title_en{
					font-size: 0.266667rem;
				}
			}
			.infoContent{
				
				padding: 0.133333rem 0.826667rem;
				/*text-indent: 0.746667rem;*/
				line-height: 1.5;
				color: #222;
			}
			.infoImg{
				padding: 0.133333rem 0.826667rem 0.6rem;
				line-height: 1.5;
				color: #222;
				img{
					width: 100%;
				}
			}
		}
	}
</style>