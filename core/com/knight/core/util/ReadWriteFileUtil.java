/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: SyncFileReadWrite.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-3-21			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.RandomAccessFile;
import java.util.ArrayList;
import java.util.List;

import lombok.Cleanup;
import lombok.extern.slf4j.Slf4j;

/**
 * @ClassName:ReadWriteFileUtil
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:55:23
 * @since JDK Version 1.5
 */
@Slf4j
public class ReadWriteFileUtil {

	/** 创建空文本文件 */
	public static File creatFile(String path) throws IOException {
		File file = new File(path);
		if (!file.isDirectory()) {
			file.createNewFile();
		} else {
			throw new java.lang.IllegalArgumentException(file + "为文件目录...");
		}
		return file;
	}

	/** 写文件 */
	public static void writeFile(File file, String content) {
		try {
			@Cleanup
			RandomAccessFile accessFile = new RandomAccessFile(file, "rw");
			accessFile.writeBytes(content);
		} catch (IOException e) {
			log.error("", e);
		}
	}

	/** 写文件 */
	public static void createFile(String path, String content) throws IOException {
		File file = creatFile(path);
		writeFile(file, content);
	}

	public static void writeByList(File file, List<String> contentList) throws IOException {
		try {
			@Cleanup
			FileOutputStream fos = new FileOutputStream(file);
			@Cleanup
			PrintWriter pw = new PrintWriter(fos);
			for (String line : contentList) {
				pw.write(line);
				pw.write(System.getProperty("line.separator"));
			}
			fos.flush();
			pw.flush();
		} catch (IOException e) {
			log.error("", e);
			throw e;
		}
	}

	/** 生成文件 */
	public static void createByList(String path, List<String> contentList) throws IOException {
		File file = creatFile(path);
		writeByList(file, contentList);
	}

	/** 读取文件 */
	public static String readFileForStr(String path) throws IOException {
		StringBuffer readSB = new StringBuffer();
		String readLine = null;
		try {
			@Cleanup
			BufferedReader bufread = new BufferedReader(new InputStreamReader(new FileInputStream(path), "UTF-8"));
			try {
				while ((readLine = bufread.readLine()) != null) {
					readSB.append(readLine);
				}
			} catch (IOException e) {
				log.error("", e);
			}
		} catch (FileNotFoundException e) {
			log.error("", e);
		}

		log.debug(readSB.toString());
		return readSB.toString();
	}

	/** 读取文件 */
	public static List<String> readFileForList(String path) throws IOException {
		List<String> contentList = new ArrayList<String>();
		String readLine = null;
		try {
			@Cleanup
			BufferedReader bufread = new BufferedReader(new InputStreamReader(new FileInputStream(path), "UTF-8"));
			try {
				while ((readLine = bufread.readLine()) != null) {
					contentList.add(readLine);
				}
			} catch (IOException e) {
				log.error("", e);
			}
		} catch (FileNotFoundException e) {
			log.error("", e);
			throw new java.lang.IllegalArgumentException("[" + path + "]文件未找到");
		}
		log.debug("一共读取数据:" + contentList.size() + "行...");
		return contentList;
	}

}
