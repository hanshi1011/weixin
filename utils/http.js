import {config} from '../config.js'
class HTTP {
	constructor() {
		this.baseRestUrl = config.api_blink_url
	}
	requst(params){
		var that = this,
			url = this.baseRestUrl + params.url;
		if(!params.method){
			params.methods = 'GET';
		}
		wx.request({
			url:url,
			data:params.data,
			method:params.method,
			header:{
				'content-type':'application/json',
				'appkey':config.appkey
			},
			success:(res)=>{
				var code = res.statusCode.toString(),
					startChar = code.charAt(0);
				if(startChar == '2'){
					params.success && params.success(res.data);
				}else{
					params.error && params.error(res) 
				}
			},
			fail:(err)=>{
				params.fail && params.fail(err)
			}
		});
	}
};
export{HTTP};