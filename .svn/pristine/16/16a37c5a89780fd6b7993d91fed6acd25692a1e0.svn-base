/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: FileAttachServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-26			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.service.impl;

import java.io.File;
import java.util.Date;
import java.util.List;

import com.knight.core.service.impl.BaseLongPKServiceImpl;
import com.knight.core.util.FileUtil;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.constant.SystemConstant;
import com.knight.system.dao.FileAttachDao;
import com.knight.system.model.FileAttach;
import com.knight.system.service.FileAttachService;

/**
 * @ClassName:FileAttachServiceImpl
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午10:00:39
 * @since JDK Version 1.5
 */
public class FileAttachServiceImpl extends BaseLongPKServiceImpl<FileAttach> implements FileAttachService {

	private FileAttachDao fileAttachDao;

	public FileAttachServiceImpl(FileAttachDao dao) {
		super(dao);
		this.fileAttachDao = dao;
	}

	public List<FileAttach> getByDepend(Long dependId, String dependName) {
		return fileAttachDao.getByDepend(dependId, dependName);
	}

	public List<Long> getFileIdByDepend(Long dependId, String dependName) {
		return fileAttachDao.getFileIdByDepend(dependId, dependName);
	}

	public void remove(Long fileId) {
		FileAttach fileAttach = fileAttachDao.get(fileId);
		String fullFilePath = ApplicationContainer.getSystemParam("FILE_UPLOAD_PATH") + fileAttach.getFilePath();
		logger.debug("delete file:" + fullFilePath);
		File file = new File(fullFilePath);
		if (file.exists()) {
			file.delete();
		}
		if (fileAttach != null) {
			fileAttachDao.remove(fileAttach);
		}
	}

	public void removeByPath(String filePath) {
		FileAttach fileAttach = fileAttachDao.getByPath(filePath);
		String fullFilePath = ApplicationContainer.getSystemParam("FILE_UPLOAD_PATH") + filePath;
		logger.debug("delete file:" + fullFilePath);
		File file = new File(fullFilePath);
		if (file.exists()) {
			file.delete();
		}
		if (fileAttach != null) {
			fileAttachDao.remove(fileAttach);
		}
	}

	public FileAttach getByPath(String filePath) {
		return fileAttachDao.getByPath(filePath);
	}

	public void migrateFileAttachbyModule(Long srcDependId, String srcDependName, Long tagDependId, String tagDependName) {
		List<FileAttach> srcFileAttachs = fileAttachDao.getByDepend(srcDependId, srcDependName);
		if (srcFileAttachs == null || srcFileAttachs.isEmpty()) {
			return;
		}
		String srcFileCat = SystemConstant.ATTACH_MODULE.get(srcDependName);
		String tagFileCat = SystemConstant.ATTACH_MODULE.get(tagDependName);
		for (FileAttach srcFileAttach : srcFileAttachs) {
			String tagFilePath = srcFileAttach.getFilePath().replace(srcFileCat, tagFileCat);
			String tagFullFilePath = ApplicationContainer.getSystemParam("FILE_UPLOAD_PATH") + tagFilePath;
			logger.debug("migrate file:" + tagFullFilePath);
			File file = new File(tagFullFilePath);
			if (file.exists()) {
				file.delete();
			} else {
				int index = tagFullFilePath.lastIndexOf("/");
				File dirPath = new File(tagFullFilePath.substring(0, index + 1));
				if (!(dirPath.exists())) {
					dirPath.mkdirs();
				}
			}
			FileUtil.copyFile(new File(ApplicationContainer.getSystemParam("FILE_UPLOAD_PATH") + srcFileAttach.getFilePath()), file);
			FileAttach f = new FileAttach();
			f.setDependId(tagDependId);
			f.setDependName(tagDependName);
			f.setFileName(srcFileAttach.getFileName());
			f.setFilePath(tagFilePath);
			f.setCreatetime(new Date());
			f.setExt(srcFileAttach.getExt());
			f.setFileType(tagFileCat);
			f.setNote(srcFileAttach.getNote());
			f.setCreator(srcFileAttach.getCreator());
			fileAttachDao.save(f);
		}
	}

	public List<FileAttach> queryForRelate(Long relateId, String relateModule) {
		return fileAttachDao.getByDepend(relateId, relateModule);
	}

}
