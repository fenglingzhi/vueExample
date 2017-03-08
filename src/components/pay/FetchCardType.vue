<!-- 查询可绑定银联卡类型 -->
<template>
    <div class="FetchCardType">
        <mt-header title="支持的银行卡">
            <span v-tap="{methods:back}" slot="left">
                <mt-button icon="back"></mt-button>
            </span>
        </mt-header>
        <mt-navbar v-model="selected" class="card_type_tab">
			<mt-tab-item id="1" class="debit_card">支持的银行卡</mt-tab-item>
			<mt-tab-item id="2" class="credit_card">信用卡</mt-tab-item>
		</mt-navbar>
		<!-- tab-container -->
		<mt-tab-container v-model="selected">
		  	<mt-tab-container-item id="1">
		    	<card-list></card-list>
		  	</mt-tab-container-item>
		  	<mt-tab-container-item id="2">
		    	<credit-card-list></credit-card-list>
		  	</mt-tab-container-item>
		</mt-tab-container>
		<div class="more">
        	<p>更多银行敬请期待...</p>
        </div>
    </div>
</template>
<script>
	import CardList from './CardList'
	import CreditCardList from './CreditCardList'
	import { Navbar, TabItem } from 'mint-ui';
	export default{

		data() {
		    return {
		      selected: '1'
		    };
		},
		components:{
            CardList,
            CreditCardList
        }
	}
</script>
<style lang='scss'>

	.FetchCardType{
		.mint-navbar {
			.mint-tab-item.is-selected{
					border-bottom: 3px solid #f9532d;
				    color: #f9532d;
				    margin-bottom: -3px;
				}
		}
		.tab_focus{
			border-bottom: 0.053333rem solid #f9532d;
			color: #f9532d;
		}
		.card_type_tab{
			height: 1.146667rem;
			background: #fff;
			line-height: 1.146667rem;
			display: table;
			margin-bottom: 0.266667rem;
			margin-top: -0.106667rem;
			.debit_card{
				width: 5.0rem;
				text-align: center;
				display: inline-block;
				padding: 0 1.226667rem;
				float: left;
				.mint-tab-item-label{
					line-height: inherit;
				}
				div{
					width: 2.533333rem;

				}
			}
			.credit_card{
				@extend .debit_card;
				color: #000;
			}
		}
		.more{
			text-align: center;
		}
	}
</style>