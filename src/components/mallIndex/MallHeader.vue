<!-- 微银行首页轮播图 -->
<template>
	<div class="index-header">
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
	.index-header{
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
			padding: 0.2rem 0.4rem 0.6rem 0.4rem;
			height: 1.333333rem;
			background-image: linear-gradient(to top, rgba(255, 255, 255, 0.01) 0%, rgba(0, 0, 0, 0.1) 35%, rgba(0, 0, 0, 0.28) 98%, #FFFFFF 100%); 
			.area-info{
				width: 1.8rem;
				font-size: 0.373333rem;
				position: relative;
				bottom: -0.04rem;
				.icon-xia1{
					font-size: 0.32rem;
				}
			}
			.title{
				flex: 1;
				font-size: 0.4rem;
				width: 6.533333rem;
				display: flex;
				position: relative;
				/*align-items: flex-end;*/
				top:-0.013333rem;
				justify-content: center;
			}
			.rightInfo{
				width: 1.8rem;
				font-size: 0.32rem;
				position: relative;
				bottom: 0.08rem;
				.userInfo{
					width: 1.8rem;
					font-size: 0.32rem;
					position: absolute;
					top:-0.026667rem;
					text-align: right;
					.name,.otherinfo{
						width: 100%;
						overflow:hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.iconfont{
						font-size: 0.32rem;
						padding-right: 0.053333rem;
					}
				}
			}
			
		}
	}
</style>