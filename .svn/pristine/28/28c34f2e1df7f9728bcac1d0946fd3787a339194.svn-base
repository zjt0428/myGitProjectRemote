/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: FileUtil.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

import lombok.Cleanup;
import lombok.extern.slf4j.Slf4j;

/**
 * @ClassName:FileUtil
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:54:15
 * @since JDK Version 1.5
 */
@Slf4j
public class FileUtil {

	public static String generateFilename(String originalFilename) {
		String filePre = DateUtil.getCurrentDateStr();
		String fileExt = "";
		int lastIndex = originalFilename.lastIndexOf(46);
		if (lastIndex != -1) {
			fileExt = originalFilename.substring(lastIndex);
		}
		String filename = filePre + "/" + UUIDGenerator.getUUID() + fileExt;
		return filename;
	}

	public static void cleanFileContent(File file) {
		if (!file.exists()) {
			return;
		}
		try {
			@Cleanup
			FileWriter fw = new FileWriter(file);
			fw.write("");
		} catch (Exception ex) {
			log.error(ex.getMessage());
		}
	}

	public static void writeFile(String filePath, String data) {
		try {
			File file = new File(filePath);
			if (!file.getParentFile().exists()) {
				file.getParentFile().mkdirs();
			}
			@Cleanup
			FileOutputStream fos = new FileOutputStream(file);
			@Cleanup
			OutputStreamWriter writer = new OutputStreamWriter(fos, "UTF-8");
			writer.write(data);
		} catch (Exception ex) {
			log.error(ex.getMessage());
		}
	}

	public static String readFile(String filePath) {
		StringBuffer buffer = new StringBuffer();
		try {
			File file = new File(filePath);
			@Cleanup
			FileInputStream fis = new FileInputStream(file);
			@Cleanup
			InputStreamReader isReader = new InputStreamReader(fis, "UTF-8");
			@Cleanup
			BufferedReader breader = new BufferedReader(isReader);
			String line;
			while ((line = breader.readLine()) != null) {
				buffer.append(line);
				buffer.append("\r\n");
			}
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return buffer.toString();
	}

	public static void copyFile(File sourceFile, File targetFile) {
		try {
			@Cleanup
			BufferedInputStream bis = new BufferedInputStream(new FileInputStream(sourceFile));
			@Cleanup
			BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(targetFile));
			byte[] b = new byte[1024 * 5];
			int len;
			while ((len = bis.read(b)) != -1) {
				bos.write(b, 0, len);
			}
			bos.flush();
		} catch (Exception e) {
			log.error("文件拷贝失败!", e);
		}
	}
}
