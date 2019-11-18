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
package com.knight.system.web.servlet;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.Cleanup;
import lombok.extern.slf4j.Slf4j;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.util.Streams;
import org.apache.commons.lang.StringUtils;

import com.knight.core.ApplicationContextHelper;
import com.knight.core.ApplicationEnvironment;
import com.knight.core.exception.BusinessException;
import com.knight.core.util.FileUtil;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.AppUser;
import com.knight.system.model.FileAttach;
import com.knight.system.service.FileAttachService;

/**
 * @ClassName:FileUploadServlet
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午10:01:28
 * @since JDK Version 1.5
 */
@Slf4j
public class FileUploadServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private FileAttachService fileAttachService = (FileAttachService) ApplicationContextHelper.getBean("fileAttachService");

	private String uploadPath = "", tempPath = "";

	public void init(ServletConfig config) throws ServletException {
		super.init(config);
	}

	public void init() throws ServletException {
		this.uploadPath = (String) ApplicationContainer.getSystemParam("FILE_UPLOAD_PATH");
		File uploadPathFile = new File(this.uploadPath);
		if (!(uploadPathFile.exists())) {
			uploadPathFile.mkdirs();
		}
		this.tempPath = this.uploadPath + "temp";
		File tempPathFile = new File(this.tempPath);
		if (!(tempPathFile.exists())) {
			tempPathFile.mkdirs();
		}
	}

	private void responseFile(String isopendirect, String usemime, String mimetype, String fileName, String filePath, HttpServletRequest req, HttpServletResponse resp) {
		ServletOutputStream out = null;
		try {
			out = resp.getOutputStream();
			String str5 = "filename=\"" + URLEncoder.encode(fileName, "UTF-8") + "\"";
			if (!("true".equals(isopendirect))) {
				str5 = "attachment;" + str5;
			} else {
				str5 = "inline;" + str5;
			}
			if ("true".equals(usemime) && mimetype != null) {
				resp.setContentType(mimetype + ";charset=UTF-8");
			} else {
				resp.setContentType("APPLICATION/OCTET-STREAM;charset=UTF-8");
			}
			resp.addHeader("Content-disposition", str5);
			@Cleanup
			FileInputStream fis = new FileInputStream(filePath);
			Streams.copy(fis, out, false);
		} catch (Exception e) {
			log.error("", e);
		} finally {
			try {
				if (out != null) {
					out.flush();
					out.close();
				}
			} catch (IOException e) {
				log.error("", e);
			}
		}
	}

	private boolean validateFileId(HttpServletRequest request) {
		try {
			Long.valueOf(request.getParameter("fileId"));
			return true;
		} catch (Exception e) {
		}
		return false;
	}

	private void download(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		String isopendirect = req.getParameter("isopendirect");
		String usemime = req.getParameter("usemime");
		String mimetype = req.getParameter("mimetype");
		if (!validateFileId(req)) {
			responseFile(isopendirect, usemime, mimetype, "default", ApplicationEnvironment.CONTEXT_ROOT_PATH + "/img/default.jpg", req, resp);
		}
		Long fileId = Long.valueOf(req.getParameter("fileId"));
		FileAttach fileAttach = fileAttachService.get(fileId);
		if (fileAttach == null) {
			responseFile(isopendirect, usemime, mimetype, "default", ApplicationEnvironment.CONTEXT_ROOT_PATH + "/img/default.jpg", req, resp);
		}
		String filePath = this.uploadPath + fileAttach.getFilePath();
		String fileName = fileAttach.getFileName();
		responseFile(isopendirect, usemime, mimetype, fileName, filePath, req, resp);

	}

	private void addFileAttach(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		req.setCharacterEncoding("UTF-8");
		resp.setCharacterEncoding("UTF-8");
		try {
			DiskFileItemFactory factory = new DiskFileItemFactory();
			factory.setSizeThreshold(4096);
			factory.setRepository(new File(this.tempPath));
			ServletFileUpload fu = new ServletFileUpload(factory);
			Long dependId = null;
			String fileCat = "others";
			String source="0";
			if (StringUtils.isNotBlank(req.getParameter("file_cat"))) {
				fileCat = req.getParameter("file_cat");
			}
			if (StringUtils.isNotBlank(req.getParameter("dependId"))) {
				dependId = Long.valueOf(req.getParameter("dependId"));
			}

			@SuppressWarnings("unchecked")
			List<FileItem> fileItems = fu.parseRequest(req);
			for (FileItem fi : fileItems) {
				if ("dependId".equals(fi.getFieldName())) {
					if (StringUtils.isNotBlank(fi.getString())) {
						dependId = Long.valueOf(fi.getString());
					}
				}
				if ("file_cat".equals(fi.getFieldName())) {
					fileCat = fi.getString();
				}
				if("source".equals(fi.getFieldName())){
					source=fi.getString();
				}
			}
			String modulePath = SystemConstant.ATTACH_MODULE.get(fileCat.toUpperCase());
			if (modulePath == null) {
				throw new BusinessException("file_cat类型平台未定义,不支持该模块文件");
			}
			for (FileItem fi : fileItems) {
				if (fi.getContentType() == null) {
					continue;
				}
				if (fi.getName() == null) {
					continue;
				}
				Object o = ApplicationContainer.getSysConfig().get("attachSize");
				Integer sizeLimit = 512;
				if (o != null) {
					sizeLimit = (Integer) o;
				}
				if (fi.getSize() > sizeLimit * 1024) {
					throw new BusinessException("文件超过大小" + sizeLimit + "KB限制");
				}
				String path = fi.getName();
				int start = path.lastIndexOf("\\");
				String fileName = path.substring(start + 1);
				String relativeFullPath = modulePath + "/" + FileUtil.generateFilename(fileName);
				int index = relativeFullPath.lastIndexOf("/");
				File dirPath = new File(this.uploadPath + relativeFullPath.substring(0, index + 1));
				if (!(dirPath.exists())) {
					dirPath.mkdirs();
				}
				fi.write(new File(this.uploadPath + relativeFullPath));
				FileAttach file = new FileAttach();
				file.setCreatetime(new Date());
				AppUser curUser = ApplicationContainer.getCurrentUser();
				if (curUser != null) {
					file.setCreator(curUser.getFullname());
				} else {
					file.setCreator("UNKown");
				}
				file.setDependId(dependId);
				file.setDependName(fileCat.toUpperCase());
				int dotIndex = fileName.lastIndexOf(".");
				file.setExt(fileName.substring(dotIndex + 1));
				file.setFileName(fileName);
				file.setFilePath(relativeFullPath);
				file.setFileType(modulePath);
				file.setNote(fi.getSize() + " B");
				file.setSource(source);
				fileAttachService.save(file);

				StringBuffer sb = new StringBuffer("{\"success\":true");
				sb.append(",\"fileId\":\"").append(file.getFileId());
				sb.append("\",\"fileName\":\"").append(file.getFileName());
				sb.append("\",\"filePath\":\"").append(file.getFilePath());
				sb.append("\",\"message\":\"上传 " + fi.getSize() + " Bit\"");
				sb.append("}");
				resp.setContentType("text/html;charset=UTF-8");
				PrintWriter writer = resp.getWriter();
				writer.println(sb.toString());
				log.debug("成功接收文件[{}]", file);
			}
		} catch (BusinessException e) {
			log.error("", e);
			resp.setContentType("text/html;charset=UTF-8");
			resp.getWriter().write("{\"success\":false,\"message\":\"" + e.getMessage() + "\"}");
		} catch (Exception e) {
			log.error("", e);
			resp.setContentType("text/html;charset=UTF-8");
			resp.getWriter().write("{\"success\":false,\"message\":\"上传失败,请重新上传\"}");
		}
	}

	protected void doPost(final HttpServletRequest req, final HttpServletResponse resp) throws ServletException, IOException {
		String method = req.getParameter("method");
		try {
			if ("download".equals(method)) {
				download(req, resp);
			} else {
				addFileAttach(req, resp);
			}
		} catch (Throwable err) {
			err.printStackTrace();
			throw new RuntimeException(err);
		}
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		this.doPost(req, resp);
	}

}
