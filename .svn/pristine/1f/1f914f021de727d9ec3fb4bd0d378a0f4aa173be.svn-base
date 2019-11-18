package com.knight.core.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

import lombok.Cleanup;

/**
 * GZIP工具
 * @ClassName:GZipUtil
 * @Description:TODO(GZIP工具)
 * @author:chenxy
 * @date 2011-8-24 上午9:54:44
 * @since JDK Version 1.5
 */
public class GZipUtil {

	public static final int BUFFER = 1024;

	public static String EXT = ".gz";

	/**
	 * 数据压缩
	 * @param is
	 * @param os
	 * @throws Exception
	 */
	public static void compress(InputStream is, OutputStream os) throws Exception {
		@Cleanup
		GZIPOutputStream gos = new GZIPOutputStream(os);
		int count;
		byte data[] = new byte[BUFFER];
		while ((count = is.read(data, 0, BUFFER)) != -1) {
			gos.write(data, 0, count);
		}
		gos.finish();
		gos.flush();
	}

	/**
	 * 数据压缩
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public static byte[] compress(byte[] data) throws Exception {
		@Cleanup
		ByteArrayInputStream bais = new ByteArrayInputStream(data);
		@Cleanup
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		// 压缩
		compress(bais, baos);
		byte[] output = baos.toByteArray();
		baos.flush();
		return output;
	}

	/**
	 * 文件压缩
	 * @param file
	 * @throws Exception
	 */
	public static void compress(File file) throws Exception {
		@Cleanup
		FileInputStream fis = new FileInputStream(file);
		@Cleanup
		FileOutputStream fos = new FileOutputStream(file.getPath() + EXT);
		compress(fis, fos);
		fos.flush();
		file.delete();
	}

	/**
	 * 数据解压缩
	 * @param is
	 * @param os
	 * @throws Exception
	 */
	public static void decompress(InputStream is, OutputStream os) throws Exception {
		@Cleanup
		GZIPInputStream gis = new GZIPInputStream(is);
		int count;
		byte data[] = new byte[BUFFER];
		while ((count = gis.read(data, 0, BUFFER)) != -1) {
			os.write(data, 0, count);
		}
	}

	/**
	 * 文件压缩
	 * @param path
	 * @throws Exception
	 */
	public static void compress(String path) throws Exception {
		File file = new File(path);
		compress(file);
	}

	/**
	 * 数据解压缩
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public static byte[] decompress(byte[] data) throws Exception {
		@Cleanup
		ByteArrayInputStream bais = new ByteArrayInputStream(data);
		@Cleanup
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		// 解压缩
		decompress(bais, baos);
		data = baos.toByteArray();
		baos.flush();
		return data;
	}

	/**
	 * 文件解压缩
	 * @param file
	 * @throws Exception
	 */
	public static void decompress(File file) throws Exception {
		@Cleanup
		FileInputStream fis = new FileInputStream(file);
		@Cleanup
		FileOutputStream fos = new FileOutputStream(file.getPath().replace(EXT, ""));
		decompress(fis, fos);
		fos.flush();
		file.delete();
	}

	/**
	 * 文件解压缩
	 * @param path
	 * @throws Exception
	 */
	public static void decompress(String path) throws Exception {
		File file = new File(path);
		decompress(file);
	}

}
