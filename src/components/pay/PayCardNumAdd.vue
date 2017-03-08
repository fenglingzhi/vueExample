<!-- 添加银行卡 -->
<template>
    <div class="PayCardNumAdd">
        <mt-header title="添加银行卡">
            <span v-tap="{methods:back}" slot="left">
                <mt-button icon="back"></mt-button>
            </span>
        </mt-header>
        <div class="Pay_Card_input">
            <span>银行卡号</span>
            <input type="text" placeholder="请输入添加的银行卡号">
        </div>
        <div class="next" v-tap="{methods:next}">
            <span>下一步</span>
        </div>
        <div class="Support_Card"  v-tap="{methods:check}">
            <span>查看支持的银行卡></span>
        </div>
    </div>
</template>
<script>
	export default{
        methods:{
            next(){
                this.$router.push({name:'CheckCardInfo'})
            },
            check(){
                this.$router.push({name:'FetchCardType'})
            }
        }
	}
</script>
<style lang='scss'>
	.PayCardNumAdd{
        font-size: 0.4rem;
        .Pay_Card_input{
            background: #fff;
            height: 1.146667rem;
            line-height: 1.146667rem;
            padding: 0 0.44rem;
            margin-bottom: 0.826667rem;
            margin-top: 0.266667rem;
            input{
                margin-left: 0.8rem;
            }
        }
        .next{
            margin: 0 0.44rem;
            height: 1.333333rem;
            line-height: 1.333333rem;
            width: auto;
            background: #fd655a;
            color: #fff;
            font-size: 0.453333rem;
            border-radius: 0.133333rem;
            text-align: center;
            margin-bottom: 0.4rem;
        }
        .Support_Card{
            text-align: center;
        }
    }
</style>