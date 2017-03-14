<template>
	<div class="other-info">
		<div class="info-detail ratain-border">
			<div>
				<span class="title">预计提货日期</span>
				<span class="value">{{OrderData.AppointmentExchangeDate}}</span>
			</div>
			<div>
				<span class="title">联系人手机号</span>
				<span class="value">{{OrderData.ContactPhone}}</span>
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
	.other-info{
		color: rgb(81,81,81);
		margin-top: 0.266667rem;
		.info-detail{
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