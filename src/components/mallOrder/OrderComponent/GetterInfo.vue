<!-- 提货人信息 -->
<template>
	<div class="getterInfo">
		<div class="list-caption-title">
			<div class="title-icon"></div>
			<span class="title-name">提货人</span>
		</div>
		<div class="getter ratain-border">
			<div>
				<span class="title">姓名</span>
				<span class="value">{{OrderData.GetterName}}</span>
			</div>
			<div>
				<span class="title">证件号</span>
				<span class="value">{{OrderData.GetterIdCardNum}}</span>
			</div>
			<div>
				<span class="title">手机号</span>
				<span class="value">{{OrderData.GetterPhone}}</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
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
	.getterInfo{
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
		.getter{
			background-color: #fff;
			padding: 0.3rem 0.4rem;
			div{
				padding: 0.133333rem 0;
				.value{
					float: right;
				}
			}
		}
	}
</style>