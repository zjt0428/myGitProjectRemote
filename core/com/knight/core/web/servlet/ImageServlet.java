/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: FileUploadServlet.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.web.servlet;

import java.awt.image.BufferedImage;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;

import com.knight.core.util.QRBarCodeUtil;

/**
 * @ClassName:FileUploadServlet
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午10:01:28
 * @since JDK Version 1.5
 */
@Slf4j
public class ImageServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public void init() throws ServletException {}

	private void showImageField(HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Cache-Control", "no-store");
		response.setDateHeader("Expires", 0);
		response.setContentType("image/jpeg");
	}

	private void downImageFile(HttpServletRequest request, HttpServletResponse response) {
		String imageName = request.getParameter("imageName");
		String isopendirect = request.getParameter("isopendirect");
		String usemime = request.getParameter("usemime");
		String mimetype = request.getParameter("mimetype");

		imageName = StringUtils.isBlank(imageName) ? "download" : imageName;
		try {
			imageName = URLEncoder.encode(imageName, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			log.error("", e);
		}
		String disposition = "filename=\"" + imageName + "\"";
		if (!"true".equals(isopendirect)) {
			disposition = "attachment;" + disposition;
		} else {
			disposition = "inline;" + disposition;
		}
		if ("true".equals(usemime) && StringUtils.isBlank(mimetype)) {
			response.setContentType(mimetype + ";charset=UTF-8");
		} else {
			response.setContentType("APPLICATION/OCTET-STREAM;charset=UTF-8");
		}
		response.addHeader("Content-disposition", disposition);
	}

	/** 二维码 */
	public void qrcode(HttpServletRequest request, HttpServletResponse response) {
		String contents = request.getParameter("contents");
		if (StringUtils.isEmpty(contents)) {
			return;
		}
		if ("downlaod".equals(request.getParameter("option"))) {
			downImageFile(request, response);
		} else {
			showImageField(request, response);
		}
		ServletOutputStream servletOutputStream = null;
		try {
			servletOutputStream = response.getOutputStream();
			String codepath = System.getProperty("java.io.tmpdir") + "/code_" + UUID.randomUUID() + ".jpg";
			String width = request.getParameter("width");
			String height = request.getParameter("height");
			if (width == null) {
				width = "200";
			}
			if (height == null) {
				height = "200";
			}
			QRBarCodeUtil.encodeQRCode(contents, codepath, Integer.parseInt(width), Integer.parseInt(height));
			BufferedImage bufferedImage = ImageIO.read(new FileInputStream(codepath));
			ImageIO.write(bufferedImage, "jpg", servletOutputStream);
			servletOutputStream.flush();
		} catch (Exception e) {
			log.error("", e);
		} finally {
			IOUtils.closeQuietly(servletOutputStream);
		}
	}

	protected void doPost(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		String method = request.getParameter("method");
		if ("qrcode".equals(method)) {
			qrcode(request, response);
		}
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		this.doPost(req, resp);
	}

}
