<template>
	<div class="exchangeWrapper">
		<div class="list-caption-title">
			<div class="title-icon"></div>
			<span class="title-name">提货网点</span>
		</div>
		<div class="info-body ratain-border">
			<div class="ex-place">
				{{OrderData.ExchangeBranch}}
			</div>
			<div class="ex-detail ratain-border-top">
				<div>地址：{{OrderData.ExchangePlace}}</div>
				<div>电话：{{OrderData.ExchangePhone}}</div>
			</div>
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
	.exchangeWrapper{
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
		.info-body{
			background-color: #fff;
			.ex-place{
				height: 1.146667rem;
				line-height: 1.146667rem;
				padding-left: 0.4rem;
				color: #000;
				font-size: 0.4rem;
			}
			.ex-detail{
				padding: 0.3rem 0.4rem;
				div{
					padding: 0.133333rem 0;
				}
			}
		}
	}
</style>