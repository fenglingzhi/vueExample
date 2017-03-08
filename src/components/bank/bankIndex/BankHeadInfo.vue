<template>
	<div class="headLine ratain-border">
		<div class="headImg ratain-border-right">
			<img :src="infoHeadLine.headImg" alt="">
		</div>
		<swiper :options="infoLineOption">
		    <swiper-slide v-for="item in infoHeadLine.data">
		     	<span v-tap="{methods:skipUrl,link_url:item.link_url,auth:item.auth}">{{item.title}}</span>
		    </swiper-slide>
		</swiper>
	</div>
</template>
<script>
	export default{
		props:{
			infoHeadLine:{
				type:Object,
				required:true
			},
			infoLineOption:{
				type:Object,
				required:false
			}
		}
	}
</script>
<style lang='scss'>
	.headLine{
		height: 0.986667rem;
		display: flex;
		.headImg{
			height: 0.733333rem;
			width: 2.373333rem;
			margin: 0.12rem 0;
			padding: 0.173333rem 0.24rem 0.4rem ;
			img{
				width: 1.733333rem;
				height: 0.373333rem;
			}
		}
		.swiper-container{
			height: 100%;
			flex: 1;
			.swiper-slide{
				span{
					width: 100%;
					height: 100%;
					display: block;
					padding: 0.266667rem 0.4rem;
				}
			}
		}	
	}
	
</style>