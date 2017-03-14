<!-- 楼层模板02：结构3-2 -->
<template>
	<div class="floor">
		<header>
			<span class="title">{{floorData.title}}</span>
			<span v-if="floorData.more" class="more" v-tap="{methods:getMore,id:floorData.id}">更多></span>
		</header>
		<div class="wrapper">
			<three-floor class="first_floor" :leftData="floorData.data.cid1" :centerData="floorData.data.cid2" :rightData="floorData.data.cid3"></three-floor>
			<two-floor :leftData="floorData.data.cid4" :rightData="floorData.data.cid5"></two-floor>
		</div>
	</div>
</template>
<script>
	import ThreeFloor from './coreTemplate/ThreeFloor'
	import TwoFloor from './coreTemplate/TwoFloor'
	export default{
		props:{
			floorData:{
				type:Object,
				required:true
			}
		},
		components:{
			ThreeFloor,
			TwoFloor
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