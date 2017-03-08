<template>
	<div class="floor bank_tool">
		<header>
			<span class="title">{{toolData.title}}</span>
			<span v-if="toolData.more" class="more">更多></span>
		</header>
		<div class="wrapper">
			<div class="tool_item ratain-box" v-for="item in toolData.data" v-tap="{methods:skipUrl,link_url:item.link_url,auth:item.auth}">
				<img v-lazy="item.img_url" alt="">
				<span class="title">{{item.title}}</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			toolData:{
				type:Object,
				required:true
			}
		}
	}
</script>
<style lang='scss'>
	.bank_tool{
		.wrapper{
			margin: 0 0.293333rem !important;
			.tool_item{
				display: inline-block;
				width: 4.6rem;
				height: 2.12rem;
				margin: 0.08rem 0.053333rem;
				background-color: #f2f2f2;
				border-radius: 0.16rem;
				img{
					width: 1.573333rem;
					height: 1.64rem;
					margin: 0.24rem 0.24rem 0.266667rem;
				}
				.title{
					position: absolute;
					right: 0;
					top: 0;
					width: 2.453333rem;
					height: 2.12rem;
					color: rgb(2,2,2);
					font-size: 0.426667rem;
					line-height: 2.12rem;
				}
			}
		}
		
	}
</style>