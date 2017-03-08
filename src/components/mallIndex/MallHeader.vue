<!-- 微银行首页轮播图 -->
<template>
	<div class="header">
        <div class="header-info">
        	<span class="area-info" v-tap="{methods:selectcity}">
        		{{areaInfo.city | CityName}}
				<span class="icon iconfont icon-xia1"></span>
        	</span>
        	<span class="title">{{areaInfo.bank_name}}</span>
        	<div class="rightInfo">
        		<span class="userInfo">
	        		<div class="name">您好:{{userInfo.username}}</div>
	        		<div class="otherinfo">
	        			<i class="icon iconfont icon-jifen"></i>500
	        			<i class="icon iconfont icon-qiaquan"></i>80
	        		</div>
	        	</span>
        	</div>
        </div>
        <swiper :options="activityOption">
		       <swiper-slide v-for="item in swipe.data">
		        <img class="item-image" :src="item.img_url" alt="" v-tap="{methods:skipUrl,link_url:item.link_url,auth:item.auth}">
		       </swiper-slide>
		       <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
		   </swiper>
       </div>
</template>
<script>
	export default{
		props:{
			swipe:{
				type:Object,
				required:true
			},
			areaInfo:{
				type:Object,
				required:true
			},
			activityOption:{
				type:Object,
				required:true
			},
			userInfo:{
				type:Object,
				required:true
			}
		},
		methods:{
			selectcity(){
				let vm = this
				vm.$router.push({name:'CityList'})
			}
		}
	}
</script>
<style lang='scss'>
	.header{
		.swiper-container{
			height: 3.826667rem;
			.swiper-slide{
				img{
					width: 100%;
					display: block;
				}
			}
		}
		position: relative;
		overflow-y: hidden;
		.header-info{
			width: 10rem;
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			z-index: 10;
			color: #fff;
			padding: 0.4rem 0.4rem 0 0.4rem;
			height: 0.933333rem;
			.area-info{
				width: 1.8rem;
				font-size: 0.373333rem;
				position: relative;
				bottom: 1px;
				.icon-xia1{
					font-size: 0.32rem;
				}
			}
			.title{
				flex: 1;
				font-size: 0.4rem;
				width: 6.533333rem;
				display: flex;
				align-items: flex-end;
				justify-content: center;
			}
			.rightInfo{
				width: 1.8rem;
				font-size: 12px;
				position: relative;
				bottom: 3px;
				.userInfo{
					width: 1.8rem;
					font-size: 12px;
					position: absolute;
					top:-4px;
					text-align: right;
					.name,.otherinfo{
						width: 100%;
						overflow:hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.iconfont{
						font-size: 12px;
						padding-right: 0.053333rem;
					}
				}
			}
			
		}
	}
</style>