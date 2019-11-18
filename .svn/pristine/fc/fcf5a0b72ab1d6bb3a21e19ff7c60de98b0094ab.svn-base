/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: DESUtil.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-3-28			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.util;

import java.security.Key;
import java.security.SecureRandom;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * @ClassName: DESUtil
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-8-26 上午11:14:08
 */
public class DESUtil {

	private static Log logger = LogFactory.getLog(DESUtil.class);

	private byte[] keyBytes;

	private Cipher ecipher;

	private Cipher dcipher;

	private Cipher initCipher(int opmode) {
		Cipher cipher = null;
		try {
			KeyGenerator generator = KeyGenerator.getInstance("DES");
			generator.init(new SecureRandom(keyBytes));
			Key key = generator.generateKey();
			cipher = Cipher.getInstance("DES");
			cipher.init(opmode, key);
			generator = null;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return cipher;
	}

	public DESUtil(String key) {
		keyBytes = ByteUtil.hexString2HexBytes(ByteUtil.bytes2HexString(key.getBytes()));
		ecipher = initCipher(Cipher.ENCRYPT_MODE);
		dcipher = initCipher(Cipher.DECRYPT_MODE);
	}

	/**
	 * 加密,将明文字符串加密转成HexString密文输出
	 * @param proclaim
	 * @return
	 * @author:chenxy
	 */
	public String encrypt(String proclaim) {
		try {
			byte[] encHexBytes = ByteUtil.hexString2HexBytes(ByteUtil.bytes2HexString(proclaim.getBytes()));
			byte[] enc = ecipher.doFinal(encHexBytes);
			return ByteUtil.bytes2HexString(enc);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 加密,将明文Hex字节数组加密转成HexString密文输出
	 * @param encHexBytes
	 * @return
	 * @author:chenxy
	 */
	public String encryptHexBytes(byte[] encHexBytes) {
		try {
			byte[] enc = ecipher.doFinal(encHexBytes);
			return ByteUtil.bytes2HexString(enc);
		} catch (BadPaddingException e) {
			logger.error(e);
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 解密,将HexString密文解密转成明文字符串输出
	 * @param cryptogram
	 * @return
	 * @author:chenxy
	 */
	public String decrypt(String cryptogram) {
		try {
			byte[] decHexBytes = ByteUtil.hexString2HexBytes(cryptogram);
			byte[] dec = dcipher.doFinal(decHexBytes);
			return new String(dec);
		} catch (BadPaddingException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 解密,将Hex字节数组密文解密转成明文字符串输出
	 * @param decHexBytes
	 * @return
	 * @author:chenxy
	 */
	public String decryptHexBytes(byte[] decHexBytes) {
		try {
			byte[] dec = dcipher.doFinal(decHexBytes);
			return new String(dec);
		} catch (BadPaddingException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		}
		return null;
	}

}
