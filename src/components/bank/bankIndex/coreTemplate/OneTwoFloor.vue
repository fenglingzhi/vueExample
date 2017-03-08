<!-- 一竖两横模板 -->
<template>
	<div class="floor_one_two">
		<div class="left_part ratain-box card2" v-tap="{methods:skipUrl,link_url:leftData.link_url,auth:leftData.auth}">
			<img v-lazy="leftData.img_url" alt="">
			<div class="title" v-if="leftData.showTitle">
				<span class="main_title">{{leftData.main_title}}</span>
				<span class="sub_title">{{leftData.sub_title}}</span>
			</div>
		</div>
		<div class="right_part">
			<div class="top_part ratain-box card3" v-tap="{methods:skipUrl,link_url:topData.link_url,auth:topData.auth}">
				<img v-lazy="topData.img_url" alt="">
				<div class="title" v-if="topData.showTitle">
					<span class="main_title">{{topData.main_title}}</span>
					<span class="sub_title">{{topData.sub_title}}</span>
				</div>
			</div>
			<div class="bottom_part ratain-box card3" v-tap="{methods:skipUrl,link_url:bottomData.link_url,auth:bottomData.auth}">
				<img v-lazy="bottomData.img_url" alt="">
				<div class="title" v-if="bottomData.showTitle">
					<span class="main_title">{{bottomData.main_title}}</span>
					<span class="sub_title">{{bottomData.sub_title}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			leftData:{
				type:Object,
				required:true
			},
			topData:{
				type:Object,
				required:true
			},
			bottomData:{
				type:Object,
				required:true
			}
		}
	}
</script>
<style lang='scss'>
	.floor_one_two{
		display: flex;
		.left_part{
			width: 3.026667rem;
			height: 3.573333rem;
			margin-right: 0.12rem;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.right_part{
			width: 6.16rem;
			height: 3.573333rem;
			.top_part{
				width: 6.16rem;
				height: 1.733333rem;
				margin-bottom: 0.106667rem;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.bottom_part{
				width: 6.16rem;
				height: 1.733333rem;
				img{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>