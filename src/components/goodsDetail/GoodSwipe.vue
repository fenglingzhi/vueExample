<!-- 商品轮播图 -->
<template>
	<div class="header">
        <swiper :options="activityOption">
		       <swiper-slide v-for="item in swipe.data">
		        <img class="item-image" :src="item.img_url">
		       </swiper-slide>
		       <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
		   </swiper>
       </div>
</template>
<script>
	export default{
		props:{
			swipe:{
				type:Object,
				required:true
			},
			activityOption:{
				type:Object,
				required:true
			}
		}
	}
</script>
<style lang='scss'>
	.header{
		.swiper-container{
			height:5.013333rem;
        	width: 10.0rem;
			.swiper-slide{
				img{
					width: 100%;
					display: block;
				}
			}
		}
	}
</style>