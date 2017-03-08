<!-- 楼层模板01：结构1-12 -->
<template>
	<div class="floor">
		<header>
			<span class="title">{{floorData.title}}</span>
			<span v-if="floorData.more" class="more" v-tap="{methods:getMore,id:floorData.id}">更多></span>
		</header>
		<div class="wrapper">
			<one-floor class="first_floor" :coreData="floorData.data.cid1"></one-floor>
			<one-two-floor :leftData="floorData.data.cid2" :topData="floorData.data.cid3" :bottomData="floorData.data.cid4"></one-two-floor>
		</div>
	</div>
</template>
<script>
	import OneFloor from './coreTemplate/OneFloor'
	import OneTwoFloor from './coreTemplate/OneTwoFloor'
	export default{
		props:{
			floorData:{
				type:Object,
				required:true
			}
		},
		components:{
			OneFloor,
			OneTwoFloor
		},
		methods:{
			getMore(params){
				this.$emit('getMore',params.id)
			}
		}
	}
</script>
<style lang='scss'>
	
</style>