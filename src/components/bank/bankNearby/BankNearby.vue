<!-- MicroBank part of nearby-->
<template>
	<div>
            <!-- <label for="input">Text to encrypt:</label><br />
            name:<input v-model="userInfo.username"></input><br />
            password:<input v-model="userInfo.password"></input><br />
            <button  @click="encrypt">加密</button> -->

	</div>
</template>
<script>
	import axios from 'axios'
	export default{
		name:'nearby',
		data(){
			return {
				pubkey:'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCEv1jT690ajmRwoqS0Uq1/SvtM'+
				'l032rHpyp59uuQeUnYxJyULOTF7/3htjD7PiLbY5HrFxsLA8ZTGqwhebWC+TTwNd'+
				'SNUO75AjRghVOd7vmODjYP4JZNkJXbSFSlIpAEz4DVOHoF6p/MjMmxf/hRdN8ZwR'+
				'xWOpC7AkLbe69xbyyQIDAQAB',
				userInfo:{
					username:'',
					password:''
				}
			}
		},
		methods:{
			encryptRequest( data, publicKey) {
	            var encrypt = new JSEncrypt();
	            encrypt.setPublicKey(publicKey);
	            // ajax请求发送的数据对象
	            var sendData = new Object();
	            // 将data数组赋给ajax对象
	            for (var key in data) {
	                sendData[key] = encrypt.encrypt(data[key]);
	                //去除加号
	                sendData[key] = encodeURI(sendData[key]).replace(/\+/g, '%2B')
	            }
	   //          console.log(sendData)
	   //          axios({
				// 	method:'post',
				// 	url:'./static/json/business.json',
				// 	data:sendData
				// }).then()
	            
        	},
        	encrypt(){
        		this.encryptRequest(this.userInfo,this.pubkey)
        	}

		}
	}
</script>
<style lang='scss'>
	
</style>