<template>
	<div class="bank_activity">
		<header>
			<span class="title">{{bankActivity.title}}</span>
			<span v-if="bankActivity.more" class="more" v-tap="{methods:getMore}">更多></span>
		</header>
		<div class="activity_wrapper">
			<div class="activity_item ratain-box" v-for="item in bankActivity.data" v-tap="{methods:skipUrl,link_url:item.link_url,auth:item.auth}">
				<img :src="item.img_url" alt="">
				<div class="activity_title">{{item.title}}</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:{
			bankActivity:{
				type:Object,
				required:true
			}
		},
		methods:{
			getMore(){
				this.$router.push({ name: 'AllService'})
			}
		}
	}
</script>
<style lang='scss'>
	.bank_activity{
		header{
			padding: 0.52rem 0.346667rem 0;
			position: relative;
			.title{
				font-size: 0.4rem;
				color: rgb(2,2,2);
			}
			.more{
				font-size: 0.346667rem;
				color: rgb(95,95,95);
				position: absolute;
				right: 0.24rem;
				bottom: 0;
				padding: 0.133333rem 0.106667rem 0;
			}
		}
		.activity_wrapper{
			padding: 0 0.306667rem;
			.activity_item{
				margin: 0.08rem 0.04rem;
				display: inline-block;
				width: 2.266667rem;
				height: 2.426667rem;
				text-align: center;
				img{
					width: 1.413333rem;
					height: 1.413333rem;
					margin-top: 0.133333rem;
				}
				.activity_title{
					padding-top: 0.08rem;
					font-size: 0.32rem;
				}
			}
		}
	}
</style>