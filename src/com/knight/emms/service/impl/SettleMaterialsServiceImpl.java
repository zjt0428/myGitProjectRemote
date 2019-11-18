/**
 *====================================================
 * 文件名称: SettleMaterialsServiceImpl.java
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
import com.knight.emms.dao.SettleMaterialsDao;
import com.knight.emms.model.SettleMaterials;
import com.knight.emms.service.SettleMaterialsService;

/**
 * @ClassName: SettleMaterialsServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-24 下午5:10:23
 */
public class SettleMaterialsServiceImpl extends BaseBusinessModelServiceImpl<SettleMaterials> implements SettleMaterialsService, ExportService {

	private SettleMaterialsDao settleMaterialsDao;


	public SettleMaterialsServiceImpl(SettleMaterialsDao dao) {
		super(dao);
		this.settleMaterialsDao = dao;
	}

	@Override
	public void saveCreate(SettleMaterials settleMaterials) {
		settleMaterials.setSubSettleFee();
		if(settleMaterials.getSettleId()==null){
			String seq = settleMaterialsDao.createNextSerial(settleMaterials);
			settleMaterials.setSettleSerial(seq);
			settleMaterials.setStatus(Constant.DISENABLED);
			settleMaterials.setDetailCaculateTime(DateUtil.getCurrentLinkTimeStr());
			settleMaterialsDao.save(settleMaterials);			
		}else{
			settleMaterials.setStatus(Constant.DISENABLED);
			SettleMaterials sm = settleMaterialsDao.get(settleMaterials.getSettleId());
			if(!settleMaterials.getSettledAmount().equals(sm.getSettledAmount())) {
				settleMaterials.setDetailCaculateTime(DateUtil.getCurrentLinkTimeStr());
			}else {
				settleMaterials.setDetailCaculateTime(sm.getDetailCaculateTime());
			}
			settleMaterialsDao.merge(settleMaterials);
		}
	}
	
    //生效
	@Override
	public void effective(SettleMaterials settleMaterials) {
		settleMaterials.setStatus(Constant.ENABLED);
		settleMaterials.setEffectiveTime(DateUtil.getCurrentLinkTimeStr());
		settleMaterialsDao.save(settleMaterials);
	  }

   //失效
	@Override
	public void loseEffective(SettleMaterials settleMaterials) {
		settleMaterials.setStatus(Constant.DISENABLED);
		settleMaterials.setLoseEffectiveTime(DateUtil.getCurrentLinkTimeStr());
		settleMaterialsDao.save(settleMaterials);
	}

	public SettleMaterials getByFilter(Long settleId,String filterName,Map<String,Object> map){
		return settleMaterialsDao.getByFilter(settleId, filterName,map);
	}

}
