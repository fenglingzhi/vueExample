<template>
	<div class="remark-wrapper">
		<div class="list-caption-title">
			<div class="title-icon"></div>
			<span class="title-name">提货网点</span>
		</div>
		<div class="del_pay ratain-box">
			<textarea v-model="OrderData.Remark" disabled=""></textarea>	
		</div>
	    
	</div>
</template>
<script>
	export default{
		props:{
			OrderData:{
				type:Object,
				required:true
			}
		}
	}
</script>
<style lang='scss'>
	@import '../../../../static/lib/base/config.scss';
	.remark-wrapper{
		color: rgb(81,81,81);
		.list-caption-title{
			padding:0.133333rem 0;
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
				padding-left:0.2rem;
			}
		}
		.del_pay{
			width:9.6rem;
			height:2.066667rem;
			margin:0 0.2rem;
		}
		textarea{
			padding: 0.266667rem;
			width:9.6rem;
			height:2.066667rem;
			color: #000;
			border:none;
			resize:none;
			background:#fff;
			font-size:0.266667rem;
			text-align:left;
			overflow-y:auto;
		}
	}
</style>