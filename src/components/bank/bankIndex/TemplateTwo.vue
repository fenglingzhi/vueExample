<!-- 楼层模板02：结构3-1 -->
<template>
	<div class="floor">
		<header>
			<span class="title">{{floorData.title}}</span>
			<span v-if="floorData.more" class="more" v-tap="{methods:getMore,id:floorData.id}">更多></span>
		</header>
		<div class="wrapper">
			<three-floor class="first_floor" :leftData="floorData.data.cid1" :centerData="floorData.data.cid2" :rightData="floorData.data.cid3"></three-floor>
			<one-floor :coreData="floorData.data.cid4"></one-floor>
		</div>
	</div>
</template>
<script>
	import OneFloor from './coreTemplate/OneFloor'
	import ThreeFloor from './coreTemplate/ThreeFloor'
	export default{
		props:{
			floorData:{
				type:Object,
				required:true
			}
		},
		components:{
			OneFloor,
			ThreeFloor
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