<!-- 倒计时效果 -->
<template>
	<div>
		距活动结束还剩：<span class="timenum">{{day}}</span>天<span class="timenum">{{hour}}</span>时<span class="timenum">{{min}}</span>分<span class="timenum">{{sec}}</span>秒
	</div>
</template>
<script>
	export default{
		props:{
			time:{
				type:Number,
				required:true
			}
		},
		computed:{
			day(){
				let day = parseInt(this.time/3600/24)
				return day
			},
			hour(){
				let day = parseInt(this.time/3600/24)
				let hour = parseInt((this.time-day*(3600*24))/3600)
				return hour
			},
			min(){
				let day = parseInt(this.time/3600/24)
				let hour = parseInt((this.time-day*(3600*24))/3600)
				let leftTime = this.time - day*(3600*24) - hour*(3600)
				let min = parseInt(leftTime/60)
				return min
			},
			sec(){
				let day = parseInt(this.time/3600/24)
				let hour = parseInt((this.time-day*(3600*24))/3600)
				let leftTime = this.time - day*(3600*24) - hour*(3600)
				let min = parseInt(leftTime/60)
				let sec = parseInt(leftTime-min*60)
				return sec
			}
		}
	}
</script>
<style lang='scss'>
	.timenum{
        color: rgb(254,168,0);
    }
</style>