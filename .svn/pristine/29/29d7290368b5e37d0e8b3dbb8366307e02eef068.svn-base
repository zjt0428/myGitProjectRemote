/**
 *====================================================
 * 文件名称: ProjectServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.model.Component;
import com.knight.emms.service.ComponentService;
import org.hibernate.Criteria;
import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;

import com.knight.emms.dao.ProjectComponDao;
import com.knight.emms.model.ProjectCompon;
import com.knight.emms.service.ProjectComponService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

import javax.annotation.Resource;

/**
 * @ClassName: ProjectServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-5 下午10:54:42
 */
public class ProjectComponServiceImpl extends BusinessLongPKServiceImpl<ProjectCompon> implements ProjectComponService {

	@SuppressWarnings("unused")
	private ProjectComponDao projectDao;


	@Resource
	private ComponentService componentService;

	
	public ProjectComponServiceImpl(ProjectComponDao dao) {
		super(dao);
		this.projectDao = dao;
	}

	public List<ProjectCompon> queryTranslateAll(QueryFilter queryFilter) {
		List<ProjectCompon> list = dao.getAll(queryFilter);
		CodeServiceImpl.translate(list);
		if(list!=null && list.size()>0){
			for(ProjectCompon pc:list){
				CodeServiceImpl.translate(pc.getComponent(), componentService.getPersistantStruct());
			}
		}
		return list;
	}

}
