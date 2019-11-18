/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: DesCipher.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.support;

import com.knight.core.util.DESUtil;

/**
 * @ClassName: DesCipher
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-8-26 上午11:18:14
 */
public class DesCipher {

	private static DesCipher INSTANCE = new DesCipher();

	private DESUtil desUtil;

	private DesCipher() {
		String key = "knightwork@chenxy@chenxy";
		desUtil = new DESUtil(key);
	}

	public static DesCipher getInstance() {
		return INSTANCE;
	}

	public String encrypt(String proclaim) {
		return desUtil.encrypt(proclaim);
	}

	public String decrypt(String cryptogram) {
		return desUtil.decrypt(cryptogram);
	}

}
