<!-- 提货人信息 -->
<template>
	<div class="getterInfo">
		<div class="list-caption-title">
			<div class="title-icon"></div>
			<span class="title-name">提货人</span>
		</div>
		<div class="getter ratain-border">
			<div class="paid_get_info">
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
			<div class="chengeGetter ratain-border-left">
				<i class="iconfont icon-modify"></i>
				<p>修改</p>
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
			padding: 0.3rem 0 0.3rem 0.4rem;
			display: flex;
			.paid_get_info{
				flex: 1;
				padding-right: 0.266667rem;
				div{
					padding: 0.133333rem 0;
					.value{
						float: right;
					}
				}
			}
			.chengeGetter{
				width: 1.813333rem;
				text-align: center;
				padding-top: 0.613333rem;
				.icon-modify{
					font-size: 0.666667rem;
					color: #fd8400;

				}
			}
		}
	}
</style>