/**
 *====================================================
 * 文件名称: SettleProjectServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-24			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Map;

import com.knight.core.service.ExportService;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.SettleProjectDao;
import com.knight.emms.model.SettleProject;
import com.knight.emms.service.SettleProjectService;

/**
 * @ClassName: SettleProjectServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-24 下午5:10:23
 */
public class SettleProjectServiceImpl extends BaseBusinessModelServiceImpl<SettleProject> implements SettleProjectService, ExportService {

	private SettleProjectDao settleProjectDao;


	public SettleProjectServiceImpl(SettleProjectDao dao) {
		super(dao);
		this.settleProjectDao = dao;
	}


	public void saveCreate(SettleProject settleProject) {
		settleProject.setSubSettleFee();
		if(settleProject.getSettleId()==null){
			String seq = settleProjectDao.createNextSerial(settleProject);
			settleProject.setSettleSerial(seq);
			settleProject.setSettleProjectState(Constant.DISENABLED);
			settleProject.setDetailCaculateTime(DateUtil.getCurrentLinkTimeStr());
			settleProjectDao.save(settleProject);			
		}else{
			settleProject.setSettleProjectState(settleProject.getSettleProjectState());
			SettleProject sp = settleProjectDao.get(settleProject.getSettleId());
			if(settleProject.getCurrentSettleAmount().equals(sp.getCurrentSettleAmount())) {
				settleProject.setDetailCaculateTime(DateUtil.getCurrentLinkTimeStr());
			}else {
				settleProject.setDetailCaculateTime(sp.getDetailCaculateTime());
			}
			settleProjectDao.merge(settleProject);
		}
		
	}


    //生效
	@Override
	public void effective(SettleProject settleProject) {
		settleProject.setSettleProjectState(Constant.ENABLED);
		  settleProjectDao.save(settleProject);
		  }

   //失效
	@Override
	public void loseEffective(SettleProject settleProject) {
		settleProject.setSettleProjectState(Constant.DISENABLED);
		settleProjectDao.save(settleProject);
	}
	
	public SettleProject getByFilter(Long settleId,String filterName,Map<String,Object> map){
		return settleProjectDao.getByFilter(settleId, filterName,map);
	}
	
}
