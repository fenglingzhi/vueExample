<!-- 楼层更多对应模板 -->
<template>
	<div class="floor_more">
		<mt-header :title="campaignData.title">
			<span v-tap="{methods:backToIndex}" slot="left">
			    <mt-button icon="back"></mt-button>
			</span>
		</mt-header>
		<div class="info-part mine-list">
			<mt-cell :title="item.title" is-link v-for="item in campaignData.data" v-tap="{methods:skipUrl,link_url:item.link_url,auth:item.auth}">
				<!-- <span>{{item.main_title}}&nbsp;{{item.sub_title}}</span> -->
			</mt-cell>
		</div>
	</div>
	
</template>
<script>
	export default{
		data(){
			return {
				campaignData:{
					title:'热门活动',
					data:[
						{link_url:"www.baidu.com",title:"戴尔游匣Master上市 GTX1050Ti 4G独显",
						 auth:"2"},
						{link_url:"www.baidu.com",title:"线上取现 领积分 双立人餐具",auth:"2"},
						{link_url:"www.baidu.com",title:"文华东方 喜乐新春 尊享非凡礼遇",auth:"2"},
						{link_url:"www.baidu.com",title:"立即领优惠 享Hugo Boss/膳魔师/双立人",auth:"2"}
					]
				}
			}
		},
		methods:{
			//返回首页
			backToIndex(){
				this.$router.push({ name: 'BankIndex'})
			}
		}
	}
</script>
<style lang='scss'>
	.floor_more{
		.mint-cell-allow-right::after{
		    width: 10px;
		    height: 10px;
		    border-color: #222;
		}
	}
</style>