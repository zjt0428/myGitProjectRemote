/**
 * 版权所有：福建顶点软件股份有限公司
 * Copyright 2011 Fujian Apex Software Shares Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: FtpSupportClient.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2011-8-11			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.support;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;

import lombok.Cleanup;
import lombok.extern.slf4j.Slf4j;

import org.apache.commons.net.PrintCommandListener;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;

/**
 * FTP工具类
 * @ClassName:FtpSupportClient
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:53:32
 * @since JDK Version 1.5
 */
@Slf4j
public class FtpSupportClient {

	private FTPClient ftpClient = new FTPClient();

	private boolean connected = false;

	private boolean logined = false;
	
	private String serverName;
	
	private int port;

	public FtpSupportClient(String serverName, int port) {
		// 设置将过程中使用到的命令输出到控制台
		ftpClient.addProtocolCommandListener(new PrintCommandListener(new PrintWriter(System.out)));
		this.serverName = serverName;
		this.port = port;
		try {
			connect();
		} catch(Exception e) {
			log.warn("FTP 初始化未连接...");
		}
	}
	
	public FtpSupportClient(String serverName, int port, String userName, String password) {
		// 设置将过程中使用到的命令输出到控制台
		ftpClient.addProtocolCommandListener(new PrintCommandListener(new PrintWriter(System.out)));
		this.serverName = serverName;
		this.port = port;
		try {
			connect();
			login(userName, password);
		} catch (Exception e) {
			log.warn("FTP 初始化未连接...");
		}
	}

	/** 建立连接 */
	public void connect() {
		try {
			if (port < 1) {
				ftpClient.connect(serverName);
			} else {
				ftpClient.connect(serverName, port);
			}
			log.debug("Start connected to " + ftpClient.getRemoteAddress() + ":" + ftpClient.getRemotePort() + ".");
			int reply = ftpClient.getReplyCode();
			if (!FTPReply.isPositiveCompletion(reply)) {
				ftpClient.disconnect();
				log.error("FTP server refused connection");
				return;
			}
			log.debug("connect " + serverName + " success");
			connected = true;
		} catch (IOException e) {
			if (ftpClient.isConnected())
				try {
					ftpClient.disconnect();
				} catch (IOException ioe) {
					log.error("FTP Server closeed exception:", ioe);
				}
			log.error("Can't connect the server.", e);
		}
	}

	/** 关闭连接 */
	public void close() {
		if (connected && ftpClient.isConnected()) {
			try {
				if (logined) {
					ftpClient.logout();
				}
				ftpClient.disconnect();
			} catch (IOException e) {
				log.error("FTP Server closeed exception:", e);
			}
		}
		connected = false;
	}

	/** 登录 */
	public boolean login(String userName, String password) {
		try {
			if (!ftpClient.login(userName, password)) {
				log.error("cann't login the server. please check the username/passowrd or connect counts");
				ftpClient.logout();
				return false;
			}
			log.debug("Remote system is " + ftpClient.getSystemName());
			logined = true;
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
	}

	/** 退出 */
	public boolean logout() {
		try {
			boolean flag = ftpClient.logout();
			logined = !flag;
			return flag;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * 文件上传
	 * @param srcFile
	 * @param remoteFile
	 * @return
	 * @author:chenxy
	 */
	public boolean uploadFile(String srcFile, String remoteFile, String remoteDir) {
		boolean flag = false;
		if (!connected) {
			throw new java.lang.IllegalArgumentException("未连接FTP...");
		}
		if (!logined) {
			throw new java.lang.IllegalArgumentException("未登陆FTP...");
		}
		
		cd(remoteDir);
		try {
			ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
			ftpClient.enterLocalActiveMode();

			@Cleanup
			InputStream input = new FileInputStream(srcFile);
			flag = ftpClient.storeFile(remoteFile, input);
		} catch (IOException e) {
			log.error("uploadFile Exception:", e);
			flag = false;
		}
		return flag;
	}

	/**
	 * 下载文件
	 * @param srcFile
	 * @param remoteFile
	 * @return
	 * @author:chenxy
	 */
	public boolean downloadFile(String srcFile, String remoteFile, String remoteDir) throws Exception {
		boolean flag = false;
		if (!this.connected) {
			throw new java.lang.IllegalArgumentException("未连接FTP...");
		}
		if (!this.logined) {
			throw new java.lang.IllegalArgumentException("未登陆FTP...");
		}
		cd(remoteDir);
		try {
			ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
			ftpClient.enterLocalActiveMode();
			@Cleanup
			OutputStream output= new FileOutputStream(srcFile);
			flag = ftpClient.retrieveFile(remoteFile, output);
		} catch (IOException e) {
			log.error("downloadFile Exception:", e);
			flag = false;
		}
		return flag;
	}

	/**
	 * 遍历目录文件
	 * @param path
	 * @return
	 * @author:chenxy
	 */
	public String[] traversalFiles(String path) {
		String[] fileNames = null;
		try {
			fileNames = ftpClient.listNames(path);
		} catch (IOException e) {
			log.error("遍历目录[" + path + "]下文件异常:", e);
		}
		return fileNames;
	}

	/**
	 * FTP服务端目录转移
	 * @param path
	 * @return
	 * @author:chenxy
	 */
	public boolean cd(String path) {
		try {
			ftpClient.cwd(path);
			return true;
		} catch (IOException e) {
			log.error("目录变更异常:", e);
			return false;
		}
	}

}
