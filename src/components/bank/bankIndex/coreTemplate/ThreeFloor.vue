<!-- 一行三个模板 -->
<template>
	<div class="floor_three">
		<div class="left_part ratain-box card2" v-tap="{methods:skipUrl,link_url:leftData.link_url,auth:leftData.auth}">
			<img v-lazy="leftData.img_url" alt="">
			<div class="title" v-if="leftData.showTitle">
				<span class="main_title">{{leftData.main_title}}</span>
				<span class="sub_title">{{leftData.sub_title}}</span>
			</div>
		</div>
		<div class="center_part ratain-box card2" v-tap="{methods:skipUrl,link_url:centerData.link_url,auth:centerData.auth}">
			<img v-lazy="centerData.img_url" alt="">
			<div class="title" v-if="centerData.showTitle">
				<span class="main_title">{{centerData.main_title}}</span>
				<span class="sub_title">{{centerData.sub_title}}</span>
			</div>
		</div>
		<div class="right_part ratain-box card2" v-tap="{methods:skipUrl,link_url:rightData.link_url,auth:rightData.auth}">
			<img v-lazy="rightData.img_url" alt="">
			<div class="title" v-if="rightData.showTitle">
				<span class="main_title">{{rightData.main_title}}</span>
				<span class="sub_title">{{rightData.sub_title}}</span>
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
			centerData:{
				type:Object,
				required:true
			},
			rightData:{
				type:Object,
				required:true
			}
		}
	}
</script>
<style lang='scss'>
	.floor_three{
		width: 9.306667rem;
		height: 3.573333rem;
		display: flex;
		.left_part,.center_part,.right_part{
			width: 3.026667rem;
			height: 3.573333rem;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.left_part,.center_part{
			margin-right: 0.113333rem;
		}
	}
</style>