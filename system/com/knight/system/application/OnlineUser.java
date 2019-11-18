/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: OnlineUser.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.application;

import lombok.Data;

/**
 * 在线用户
 * @ClassName:OnlineUser
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:57:24
 * @since JDK Version 1.5
 */
@Data
public class OnlineUser {

	private String sessionId;

	private Long userId;

	private String username;

	private String fullname;

	private String depPath;

	private String roleIds;
	
	private Short sex;
	
	//1:电脑端，2：app端，3：小程序
	private String moblieFlag;

}
