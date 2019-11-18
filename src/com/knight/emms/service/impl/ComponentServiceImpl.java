/**
 *====================================================
 * 文件名称: ComponentServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-6			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.ComponentDao;
import com.knight.emms.dao.ComponentHoldDao;
import com.knight.emms.domain.IUploadTerminalDomain;
import com.knight.emms.model.Component;
import com.knight.emms.model.ComponentHold;
import com.knight.emms.model.StoreHouse;
import com.knight.emms.service.ComponentService;
import com.knight.emms.service.StoreHouseService;
import com.knight.emms.support.ComponentSupport;
import com.knight.system.model.CodeInfo;
import com.knight.system.service.CodeService;

/**
 * @ClassName: ComponentServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-6 下午2:30:08
 */
public class ComponentServiceImpl extends BaseBusinessModelServiceImpl<Component> implements ComponentService {
	
	@Resource
	private ComponentHoldDao componentHoldDao;

	
	private ComponentDao componentDao;

	@Resource
	private CodeService codeService;
	
	@Resource
	private StoreHouseService storeHouseService;

	@Resource
	private IUploadTerminalDomain uploadTerminalDomain;

	public ComponentServiceImpl(ComponentDao dao) {
		super(dao);
		this.componentDao = dao;
	}

	//补仓存储数据
	public void savecomponentHold(ComponentHold componentHold){
		componentHoldDao.save(componentHold);
	}

	@SuppressWarnings("unchecked")
	public List<Component> queryExportData(QueryFilter queryFilter) {
		queryFilter.addSorted("componId", "desc");
		List<Component> list = (List<Component>) super.queryExportData(queryFilter);
		List<Map<String, Object>> result = componentDao.queryByScript("store.count_compon_on_status");

		for (Component c : list) {
			c.setTotalCounts(c.getConsumeCounts());
			c.setInuseCounts(0);
			c.setUnuseCounts(0);
			for (Map<String, Object> data : result) {
				if (c.getComponId().equals(data.get("COMPON_ID"))) {
					if(data.get("STATUS").equals("1")){
						c.setInuseCounts((Integer) (data.get("COUNTS")==null?0:data.get("COUNTS")));
					}
					if(data.get("STATUS").equals("0")){
						c.setUnuseCounts((Integer) (data.get("COUNTS")==null?0:data.get("COUNTS")));
					}
				}
			}
			c.setTotalCounts(c.getStoreCounts() + c.getInuseCounts()+c.getUnuseCounts());
		}
		return list;
	}

    public Component calculateComponent(Component c,List<Map<String, Object>> inuse,List<Map<String, Object>> unuse,List<Map<String, Object>> pickup){
        c.setInuseCounts(0);
		c.setUnuseCounts(0);
        for (Map<String, Object> data : unuse) {
            if (c.getComponId().equals(data.get("COMPON_ID"))) {
                c.setUnuseCounts((Integer) data.get("COUNTS"));
            }
        }
        for (Map<String, Object> data : pickup) {
            if (c.getComponId().equals(data.get("COMPON_ID"))) {
				try {
					c.setInuseCounts((Integer) data.get("COUNTS"));
				}catch (Exception e){
					logger.info((Long)data.get("COUNTS")+"");
				}
            }
        }
        //c.setTotalCounts(c.getConsumeCounts()+c.getUnuseCounts()+c.getInuseCounts());
        c.setTotalCounts(c.getUnuseCounts()+c.getInuseCounts());
        for (Map<String, Object> data : inuse) {
            if (c.getComponId().equals(data.get("COMPON_ID"))) {
                if (Constant.ENABLED.equals(c.getConsumeFlag())) {
                    c.setTotalCounts(c.getTotalCounts()+(Integer) data.get("COUNTS"));
                    c.setInuseCounts(c.getInuseCounts()+(Integer) data.get("COUNTS"));
                    break;
                } else {
                    c.setTotalCounts(c.getConsumeCounts());
                }
            }
        }
       return c;
    }

	public List<Component> queryTranslateAll(QueryFilter queryFilter) {
		List<Component> list = super.queryTranslateAll(queryFilter);
		List<Map<String, Object>> inuse = componentDao.queryByScript("store.count_compon_inuse");
		List<Map<String, Object>> unuse = componentDao.queryByScript("dispatch.project_ecunused_gather2");
		List<Map<String, Object>> pickup = componentDao.queryByScript("pickup.count_compon_pickup");
		for (Component c : list) {
            calculateComponent(c,inuse,unuse,pickup);
		}
		return list;
	}

    public Component getTranslate(Long pk){
        Component c = super.getTranslate(pk);
        List<Map<String, Object>> inuse = componentDao.queryByScript("store.count_compon_inuse");
        List<Map<String, Object>> unuse = componentDao.queryByScript("dispatch.project_ecunused_gather2");
        List<Map<String, Object>> pickup = componentDao.queryByScript("pickup.count_compon_pickup");
        return calculateComponent(c,inuse,unuse,pickup);
    };

	public void saveCreate(Component component) {
		if(component.getStoreHouseJoinComponents()!=null){
	
		String[] funs = component.getStoreHouseJoinComponents().split(",");
//		if(set.size()>0){
//			for(String s : funs){
//				Long storeId = Long.parseLong(s);
//				for(StoreHouse sh :set){
//					if(storeId != sh.getStoreId()){
//						StoreHouse af = storeHouseService.get(storeId);
//						if (af != null) {
//							component.getStoreHouses().add(af);
//						}
//					}
//				}
//			}
//		}else{
		component.setStoreHouses(new HashSet<StoreHouse>());
			for(String s : funs){
				Long storeId = Long.parseLong(s);
				StoreHouse af = storeHouseService.get(storeId);
				if (af != null) {
					component.getStoreHouses().add(af);
				}
			}
		}
		if(component.getComponId() == null){
			SerialNumberStrategy strategy = Component.class.getAnnotation(SerialNumberStrategy.class);
			CodeInfo briefCode = codeService.getCodeInfoMap("repertoryCategory").get(component.getComponCategory());
			if (briefCode.getAliasValue() == null) {
				throw new BusinessException("未设置[" + briefCode.getValue() + "]的代码简称!");
			}
			component.setCategoryBriefCode(briefCode.getAliasValue());
			component.setBatchNumber(component.getCategoryBriefCode() + DateUtil.getCurrentTimeStr());
			ComponentSupport.completeCreateComponent(component);
			String preSerial = component.getCategoryBriefCode() + DateUtil.getCurrentDateStr();
			int startseq = componentDao.createNextSerialseq(component, component.getCategoryBriefCode());
			if (startseq + component.getNumber() > strategy.maxseq()) {
				throw new BusinessException("序列号生成已达最大值" + strategy.maxseq() + ",无法继续生成编号,请改期录入!");
			}
			for (int i = startseq; i < startseq + component.getNumber(); i++) {
				Component c = component.clone();
				c.setComponSerial(preSerial + StringUtils.leftPad(i + "", (strategy.maxseq() + "").length(), "0"));

				c.setAssetValue(c.getUnitprice().multiply(new BigDecimal(c.getConsumeCounts())));
				componentDao.save(c);
			}	
		}else{
			componentDao.merge(component);
		}
		
	}

	public void saveUpload(List<Component> componentList) {
		SerialNumberStrategy strategy = Component.class.getAnnotation(SerialNumberStrategy.class);
		Map<String, List<Component>> compMap = new HashMap<String, List<Component>>();
		for (Component c : componentList) {
			if (StringUtils.isBlank(c.getComponCategory())) {
				throw new BusinessException("上报零配件中包含未知类别的零配件!");
			}
			c.setConsumeFlag(Constant.DISENABLED); // 终端上报固定为非易耗品
			c.setNumber(1); // 固定为单品部件
			List<Component> compList = null;
			if (compMap.containsKey(c.getComponCategory())) {
				compList = compMap.get(c.getComponCategory());
			} else {
				compList = new ArrayList<Component>();
				compMap.put(c.getComponCategory(), compList);
			}
			compList.add(c);
		}
		for (List<Component> categoryList : compMap.values()) {
			Component component = categoryList.get(0);
			CodeInfo briefCode = codeService.getCodeInfoMap("repertoryCategory").get(component.getComponCategory());
			if (StringUtils.isBlank(briefCode.getAliasValue())) {
				throw new BusinessException("未设置[" + briefCode.getValue() + "]的代码[" + briefCode.getCode() + "]简称!");
			}
			component.setCategoryBriefCode(briefCode.getAliasValue());
			component.setBatchNumber(component.getCategoryBriefCode() + DateUtil.getCurrentTimeStr());

			int seq = componentDao.createNextSerialseq(component, component.getCategoryBriefCode());
			String preSerial = component.getCategoryBriefCode() + DateUtil.getCurrentDateStr();
			String batchNumber = component.getBatchNumber();
			if (seq + categoryList.size() > strategy.maxseq()) {
				throw new BusinessException("序列号生成已达最大值" + strategy.maxseq() + ",无法继续生成编号,请改期录入!");
			}
			for (int i = 0; i < categoryList.size(); i++) {
				Component compon = categoryList.get(i);
				ComponentSupport.completeCreateComponent(compon);
				compon.setComponSerial(preSerial + StringUtils.leftPad((seq + i) + "", (strategy.maxseq() + "").length(), "0"));
				compon.setBatchNumber(batchNumber);
			}
		}
		for (Component component : componentList) {
			uploadTerminalDomain.uploadsave(component);
		}
	}

	public void removeBindingEquipment(Long componId) {
		Component component = componentDao.get(componId);
		component.setEquipId(null);
		componentDao.save(component);
	}

	public void fix(){
		List<Component> components = super.getAll();
		for(Component c:components) {
			componentDao.save(c);
		}
	}

}
