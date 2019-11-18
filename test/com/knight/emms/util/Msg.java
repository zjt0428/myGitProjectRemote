package com.knight.emms.util;

import com.kewail.sdk.sms.SmsSingleSender;
import com.kewail.sdk.sms.SmsSingleSenderResult;

public class Msg {

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		String accesskey = "5d1c0d0587b65f067788470a";
		String secretkey ="6f45ed3241cc4be8a3cc4d8af7feb1c5";
		//手机号码
		String phoneNumber = "18695691304";
		//初始化单发
		SmsSingleSender singleSender = new SmsSingleSender(accesskey, secretkey);
		SmsSingleSenderResult singleSenderResult;
		
		//普通单发,注意前面必须为【】符号包含，置于头或者尾部。
//		singleSenderResult = singleSender.send(0, "86", phoneNumber, "这种在这种咋地。", "", "");
	    singleSenderResult = singleSender.send(0, "86", phoneNumber, "【Kewail科技】尊敬的用户：您的验证码：94580，工作人员不会索取，请勿泄漏。", "", "");
		System.out.println(singleSenderResult);
	}

}
