/**
 *====================================================
 * 文件名称: EquipWarehouseServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Status;
import com.knight.emms.constant.Type;
import com.knight.emms.dao.ComponDiaryDao;
import com.knight.emms.dao.ComponIntoStoreDao;
import com.knight.emms.dao.ComponIntoStoreDetailDao;
import com.knight.emms.dao.ComponentDao;
import com.knight.emms.dao.EquipDiaryDao;
import com.knight.emms.dao.EquipFlowDao;
import com.knight.emms.dao.EquipWarehouseAbnormalDao;
import com.knight.emms.dao.EquipmentDao;
import com.knight.emms.dao.ProjectComponDao;
import com.knight.emms.dao.StoreComponStockDao;
import com.knight.emms.dao.StoreEquipStockDao;
import com.knight.emms.domain.BusinessEquipFlowValidate;
import com.knight.emms.model.AttachmentStorage;
import com.knight.emms.model.ComponIntoStore;
import com.knight.emms.model.ComponIntoStoreDetail;
import com.knight.emms.model.Component;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.ProjectCompon;
import com.knight.emms.model.ProjectJoinAnnex;
import com.knight.emms.model.StoreComponStock;
import com.knight.emms.model.StoreHouse;
import com.knight.emms.model.StoreJoinComponent;
import com.knight.emms.service.ComponIntoStoreService;
import com.knight.emms.service.ComponentService;
import com.knight.emms.service.EquipHitchService;
import com.knight.emms.service.ProjectJoinAnnexService;
import com.knight.emms.service.StoreHouseService;
import com.knight.emms.service.StoreJoinComponentService;
import com.knight.system.constant.SystemConstant;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: EquipWarehouseServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-5 下午10:49:25
 */
public class ComponIntoStoreServiceImpl extends BusinessEquipFlowValidate<ComponIntoStore> implements ComponIntoStoreService {

	private ComponIntoStoreDao componIntoStoreDao;

	@Resource
	private ComponIntoStoreDetailDao componIntoStoreDetailDao;

	@Resource
	private EquipmentDao equipmentDao;

	@Resource
	private EquipFlowDao equipFlowDao;

	@Resource
	private ComponentDao componentDao;
	
	@Resource
	private ProjectComponDao projectComponDao;

	@Resource
	private EquipDiaryDao equipDiaryDao;

	@Resource
	private ComponDiaryDao componDiaryDao;

	@Resource
	private StoreEquipStockDao storeEquipStockDao;

	@Resource
	private StoreComponStockDao storeComponStockDao;

	@Resource
	private EquipWarehouseAbnormalDao equipWarehouseAbnormalDao;

	@Resource
	private EquipHitchService equipHitchService;
	
	@Resource
	private ProjectJoinAnnexService projectJoinAnnexService;
	
	@Resource
	private StoreJoinComponentService storeJoinComponentService;
	
	@Resource
	private ComponentService componentService;
	
	@Resource
	private StoreHouseService storeHouseService;

	public ComponIntoStoreServiceImpl(ComponIntoStoreDao dao) {
		super(dao);
		this.componIntoStoreDao = dao;
	}

	public List<ComponIntoStore> queryTranslateAllFull(QueryFilter filter) {
		List<ComponIntoStore> list = componIntoStoreDao.getAll(filter);
		for (ComponIntoStore ew : list) {
			CodeServiceImpl.translate(ew, getPersistantStruct());
		}
		return list;
	}

	public ComponIntoStore getTranslateFull(Long rowId) {
		ComponIntoStore ew = componIntoStoreDao.get(rowId);
		CodeServiceImpl.translate(ew, getPersistantStruct());
		
		for (ComponIntoStoreDetail p : ew.getEquipWarehouseComponSet()) {
			CodeServiceImpl.translate(p, componIntoStoreDetailDao.getPersistantStruct());
			CodeServiceImpl.translate(p.getComponent(), componentDao.getPersistantStruct());
		}
		return ew;
	}

	public void saveOrMergeForEdit(ComponIntoStore componIntoStore) {
		if (componIntoStore.getRowId() == null) {
			componIntoStoreDao.saveSerialModel(componIntoStore);
		}
		componIntoStore.setSubEquipWarehouse();
		componIntoStoreDao.merge(componIntoStore);
	}

	public void delete(Long rowId) {
		ComponIntoStore componIntoStore = componIntoStoreDao.get(rowId);

		componIntoStoreDao.remove(componIntoStore);
	}

	protected ComponIntoStore passFlowApproveApplication(FormApprove formApprove) {
		ComponIntoStore t = super.passFlowApproveApplication(formApprove);
		//项目附件处理
		if(t.getAttachmentStorageSet().size()>0){
			for(AttachmentStorage as : t.getAttachmentStorageSet()){
				QueryFilter filter = new QueryFilter();
				filter.addConjunctFilter("Q_project.projectId_L_EQ",  String.valueOf(t.getProjectId()));
				filter.addConjunctFilter("Q_dispatchAllocateInit.disAllInitId_L_EQ", String.valueOf(as.getDisAllInitId()));
				List<ProjectJoinAnnex> slist = projectJoinAnnexService.queryTranslateAll(filter); 
				if(slist.size()>0){
					ProjectJoinAnnex pj = slist.get(0);
					pj.setCounts((pj.getCounts()==null?0:pj.getCounts())-new Integer(as.getCounts()));
					projectJoinAnnexService.merge(pj);
				}
			}
			
		}
		for (ComponIntoStoreDetail ewc : t.getEquipWarehouseComponSet()) {

			if (!Status.EquipComponStore.warehouse.equals(ewc.getStatus())) { // 非待入库状态,进行库存状态变更
				
				Component c = componentDao.get(ewc.getComponId());
				if (Status.EquipComponStore.warehoused.equals(ewc.getStatus())) { // 已入库,设备库存增加
					
					//仓库配件处理
					if(t.getEquipWarehouseComponSet().size()>0){
							QueryFilter filter = new QueryFilter();
							filter.addConjunctFilter("Q_storeHouse.storeId_L_EQ",  String.valueOf(t.getStoreId()));
							filter.addConjunctFilter("Q_component.componId_L_EQ", String.valueOf(ewc.getComponId()));
							List<StoreJoinComponent> slist = storeJoinComponentService.queryTranslateAll(filter); 
							if(slist.size()>0){
								StoreJoinComponent sjc = slist.get(0);
								sjc.setCounts(sjc.getCounts()+ewc.getCounts());
								storeJoinComponentService.merge(sjc);
							}else{
								StoreJoinComponent sjc =new StoreJoinComponent();
								StoreHouse sh = storeHouseService.get(t.getStoreId());
								Component ct = componentService.get(ewc.getComponId());
								sjc.setComponent(ct);
								sjc.setStoreHouse(sh);
								sjc.setCounts(ewc.getCounts());
								storeJoinComponentService.save(sjc);
							}
						
					}
					
					c.setConsumeCounts(c.getConsumeCounts() + ewc.getCounts());
					// 配件入库
					StoreComponStock stock = new StoreComponStock();
					stock.setStoreId(t.getStoreId());
					stock.setComponId(c.getComponId());
					stock.setProjectId(t.getProjectId());
					stock.setCounts(ewc.getCounts());
					stock.setBoundDate(DateUtil.getCurrentLinkDateStr());
					stock.setStockType(Type.OutInStock.in);
					storeComponStockDao.save(stock);
					
					QueryFilter query = new QueryFilter();
					query.addConjunctFilter("Q_projectId_L_EQ", t.getProjectId() + "");
					query.addConjunctFilter("Q_componId_L_EQ", ewc.getComponId() + "");
					query.addConjunctFilter("Q_status_S_EQ", "0");
					List<ProjectCompon> list = projectComponDao.getAll(query);
					for (ProjectCompon pc : list) {
						pc.setCounts(pc.getCounts() - ewc.getCounts());
						projectComponDao.save(pc);
					}				
					
				}
				if (Status.EquipComponStore.warehoused.equals(ewc.getStatus())) {
					c.setStoreId(t.getStoreId());
				}
				if (c.getConsumeCounts() > 0) {
					c.setStatus(Status.EquipCompon.unused);
				} else {
					c.setStatus(ewc.getStatus());
				}
				c.setStatusDate(new Date());
				componentDao.save(c);
			}
			if (Status.InspectResult.failed.equals(ewc.getResult()) || Status.InspectResult.repair.equals(ewc.getResult())) { // 生成故障单
				Long relateId = t.getRowId();
				String relateSerial = t.getSerial();
				String relateModule = SystemConstant.MODULE_COMPON_INTOSTORE;
				String warehouseResult = CodeServiceImpl.fastValue("INSPECT_RESULT", ewc.getResult());
				equipHitchService.createRelateHitch(relateId, relateSerial, relateModule, t.getProjectId(), null, t.getIntoDate(), warehouseResult, ewc.getRemark(), null, null);
			}
		}

		return t;
	}

}
