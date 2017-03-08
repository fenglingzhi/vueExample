<!-- 单独一行模板 -->
<template>
	<div class="floor_one ratain-box card1" v-tap="{methods:skipUrl,link_url:coreData.link_url,auth:coreData.auth}">
		<img v-lazy="coreData.img_url" alt="">
		<div class="title" v-if="coreData.showTitle">
			<span class="main_title">{{coreData.main_title}}</span>
			<span class="sub_title">{{coreData.sub_title}}</span>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			coreData:{
				type:Object,
				required:true
			}
		}
	}
</script>
<style lang='scss'>
	.floor_one{
		width: 9.306667rem;
		height: 2.72rem;
		img{
			width: 100%;
			height: 100%;
		}
	}
	
</style>