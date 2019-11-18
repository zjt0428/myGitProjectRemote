/**
 *====================================================
 * 文件名称: MemoServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.app.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.knight.app.dao.AttendamceDao;
import com.knight.app.dao.AttendamceLocationDao;
import com.knight.app.dao.TAppComponDispatchDetailDao;
import com.knight.app.model.*;
import com.knight.app.service.AttendamceService;
import com.knight.app.service.TAppComponDispatchDetailService;
import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.ComponentDao;
import com.knight.emms.dao.MemoDao;
import com.knight.emms.dao.ProjectComponDao;
import com.knight.emms.model.*;
import com.knight.emms.service.MemoService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.knight.app.dao.AttendamceDao;
import com.knight.app.dao.AttendamceLocationDao;
import com.knight.app.dao.TAppComponDispatchDetailDao;
import com.knight.app.model.Attendamce;
import com.knight.app.model.AttendamceLocation;
import com.knight.app.model.TAppComponDispatchDetail;
import com.knight.app.service.AttendamceService;
import com.knight.app.service.TAppComponDispatchDetailService;
import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.MemoDao;
import com.knight.emms.model.CorpInfo;
import com.knight.emms.model.Memo;
import com.knight.emms.model.MemoDetail;
import com.knight.emms.service.MemoService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

import javax.annotation.Resource;

/**
 * @ClassName: MemoServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:34:17
 */
public class TAppComponDispatchDetailServiceImpl  extends BusinessLongPKServiceImpl<TAppComponDispatchDetail> implements TAppComponDispatchDetailService {

	private TAppComponDispatchDetailDao tappComponDispatchDetailDao;

    @Resource
    private ComponentDao componentDao;

    @Resource
    private ProjectComponDao projectComponDao;

	public TAppComponDispatchDetailServiceImpl(TAppComponDispatchDetailDao dao) {
		super(dao);
		this.tappComponDispatchDetailDao = dao;
	}

	public void saveOrUpdate(TAppComponDispatchDetail detail,TAppDispatch disp) {
		if (detail.getCompDeid() == null) {
			tappComponDispatchDetailDao.save(detail);
		}else{
			tappComponDispatchDetailDao.merge(detail);
		}
		Component com = componentDao.get(detail.getCompId());
		Integer ccs = com.getConsumeCounts();
		if(disp.getSendWarehouseType().equals("projectStore")&&disp.getReceWarehouseType().equals("houseStore")){
			ccs = ccs + detail.getDisNum().intValue();
            projectCompLess(disp.getSendId(),detail.getCompId(),detail.getDisNum().intValue());
		}
		if(disp.getSendWarehouseType().equals("houseStore")&&disp.getReceWarehouseType().equals("projectStore")){
			ccs = ccs - detail.getDisNum().intValue();
            projectCompAdd(disp.getReceiveId(),detail.getCompId(),detail.getDisNum().intValue());
		}
		if(disp.getSendWarehouseType().equals("projectStore")&&disp.getReceWarehouseType().equals("projectStore")){
			projectCompLess(disp.getSendId(),detail.getCompId(),detail.getDisNum().intValue());
			projectCompAdd(disp.getReceiveId(),detail.getCompId(),detail.getDisNum().intValue());
		}
		com.setConsumeCounts(ccs);
		componentDao.update(com);
	}

	public void projectCompAdd(Long projectId,Long compId,Integer num){
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_componId_L_EQ",compId.toString());
		filter.addConjunctFilter("Q_projectId_L_EQ", projectId.toString());
		filter.addConjunctFilter("Q_status_S_EQ","0");
		List<ProjectCompon> projectComponReces = projectComponDao.getAll(filter);

		for (ProjectCompon pc : projectComponReces) {
			pc.setCounts(pc.getCounts() + num);
			projectComponDao.save(pc);
		}
		if (projectComponReces.isEmpty()) {
			ProjectCompon pc = new ProjectCompon();
			pc.setProjectId(projectId);
			pc.setComponId(compId);
			pc.setCounts(num);
			pc.setStatus("0");
			projectComponDao.save(pc);
		}
	}

	public void projectCompLess(Long projectId,Long compId,Integer num){
		QueryFilter filter2 = new QueryFilter();
		filter2.addConjunctFilter("Q_componId_L_EQ",compId.toString());
		filter2.addConjunctFilter("Q_projectId_L_EQ", projectId.toString());
		filter2.addConjunctFilter("Q_status_S_EQ","0");
		List<ProjectCompon> projectComponSends = projectComponDao.getAll(filter2);
		if (projectComponSends.size() == 0 ) {
			throw new java.lang.IllegalArgumentException("源项目配件ID关联记录不存在");
		}
		for(ProjectCompon pc : projectComponSends){
			pc.setCounts(pc.getCounts() - num);
			projectComponDao.save(pc);
		}
	}
}
