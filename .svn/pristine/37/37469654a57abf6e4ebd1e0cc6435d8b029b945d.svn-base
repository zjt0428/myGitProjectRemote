/**
 * Copyright © 2018 Chen·G·Y. All rights reserved. 
 *====================================================
 * 文件名称: LeaseRepairServiceImpl.java
 * 作者: 陈光毅
 * 创建日期: 2018年1月18日
 *====================================================
 * 文件描述: 租借维修 Service接口实现
 */
package com.knight.emms.service.impl;

import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.LeaseRepairAfterDao;
import com.knight.emms.dao.LeaseRepairBeforeDao;
import com.knight.emms.dao.LeaseRepairDao;
import com.knight.emms.dao.LeaseStockDao;
import com.knight.emms.dao.ProjectDepotInOutDao;
import com.knight.emms.dao.ProjectMaterialsStoreDao;
import com.knight.emms.model.FormAccept;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.LeaseRepair;
import com.knight.emms.model.LeaseRepairAfter;
import com.knight.emms.model.LeaseRepairBefore;
import com.knight.emms.model.LeaseStock;
import com.knight.emms.model.ProjectDepotInOut;
import com.knight.emms.model.ProjectMaterialsStore;
import com.knight.emms.service.LeaseRepairService;

import lombok.SneakyThrows;

/**
 * @ClassName: LeaseRepairServiceImpl
 * @Description: 租借维修 Service接口实现
 * @author 陈光毅
 * @date 2018年1月18日 上午10:16:08
 * @version v1.0
 */
@Service("leaseRepairService")
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class LeaseRepairServiceImpl extends BusinessFlowServiceImpl<LeaseRepair> implements LeaseRepairService {

	private LeaseRepairDao leaseRepairDao;

	/** 维修前 */
	@Resource
	private LeaseRepairBeforeDao leaseRepairBeforeDao;

	/** 维修后 */
	@Resource
	private LeaseRepairAfterDao leaseRepairAfterDao;

	/** 租借库存 */
	@Resource
	private LeaseStockDao leaseStockDao;

	/** 项目库存 */
	@Resource
	private ProjectMaterialsStoreDao projectMaterialsStoreDao;

	/** 项目出入库记录表 */
	@Resource
	private ProjectDepotInOutDao projectDepotInOutDao;

	/**
	 * @Title LeaseRepairServiceImpl
	 * @Description: spring注入
	 * @param dao
	 * @author 陈光毅
	 * @date 2018年1月18日 上午10:17:52
	 * @version v1.0
	 */
	@Autowired(required = true)
	public LeaseRepairServiceImpl(@Qualifier("leaseRepairDao") LeaseRepairDao dao) throws RuntimeException {
		super(dao);
		this.leaseRepairDao = dao;
	}

	@Override
	@SneakyThrows(Exception.class)
	public void saveOrMergeForEdit(LeaseRepair leaseRepair) throws RuntimeException {
		if (leaseRepair.getRepairId() == null) {
			leaseRepair.setStatus("0");
			leaseRepair.setDelFlag(Constant.ENABLED);
			leaseRepair.setSubLeaseRepair();
			if (this.parity(leaseRepair)) {
				leaseRepairDao.saveSerialModel(leaseRepair);
				leaseRepairDao.save(leaseRepair);
			} else {
				throw new BusinessException("维修前/后的周材数量不一致");
			}
		} else {
			leaseRepair.setStatus(leaseRepair.getStatus());
			leaseRepair.setDelFlag(leaseRepair.getDelFlag());
			leaseRepair.setSubLeaseRepair();
			if (this.parity(leaseRepair)) {
				leaseRepairDao.update(leaseRepair);
			} else {
				throw new BusinessException("维修前/后的周材数量不一致");
			}
		}
	}

	/** 删除维修前页签数据 */
	@Override
	@SneakyThrows(Exception.class)
	public void delBefore(Long beforeId) throws RuntimeException {
		leaseRepairBeforeDao.remove(beforeId);
	}

	/** 删除维修后页签数据 */
	@Override
	@SneakyThrows(Exception.class)
	public void delAfter(Long afterId) throws RuntimeException {
		leaseRepairAfterDao.remove(afterId);
	}

	/** 审核 */
	@Override
	@SneakyThrows(Exception.class)
	protected LeaseRepair passFlowAcceptApplication(FormAccept formAccept) throws RuntimeException {
		LeaseRepair leaseRepair = super.passFlowAcceptApplication(formAccept);
		return leaseRepair;
	}

	/** 审批 */
	@Override
	@SneakyThrows(Exception.class)
	public void passApproveApplication(FormApprove formApprove) throws RuntimeException {
		LeaseRepair leaseRepair = passFlowApproveApplication(formApprove);
		// 调整维修后的租借库存
		this.addLeaseRepair(leaseRepair);
		logger.info("租借库存已调整！");
		// 调整维修后的项目库存
		this.addProjectRepair(leaseRepair);
		logger.info("项目库存已调整！");
		// 添加到出入库记录表
		this.addRecord(leaseRepair);
		logger.info("已添加到出入库记录表！");
		leaseRepairDao.save(leaseRepair);
	}

	/**
	 * @Title LeaseRepairServiceImpl
	 * @Description: 数量对等判断
	 * @param leaseRepair
	 * @author 陈光毅
	 * @date 2018年1月30日 上午9:42:28
	 * @version v1.0
	 */
	public boolean parity(LeaseRepair leaseRepair) {
		boolean isParity = false;
		Set<?> leaseRepairBeforeSet = leaseRepair.getLeaseRepairBeforeSet();
		Set<?> leaseRepairAfterSet = leaseRepair.getLeaseRepairAfterSet();
		double beforeQuantity = 0;
		double afterQuantity = 0;
		for (Object object : leaseRepairBeforeSet) {
			LeaseRepairBefore leaseRepairBefore = (LeaseRepairBefore) object;
			if (leaseRepairBefore.getAssistQuantity() != null) {
				beforeQuantity += Double.valueOf(leaseRepairBefore.getAssistQuantity());
			} else {
				throw new BusinessException("维修的数量不能为空！");
			}
		}
		for (Object object : leaseRepairAfterSet) {
			LeaseRepairAfter leaseRepairAfter = (LeaseRepairAfter) object;
			if (leaseRepairAfter.getAssistQuantity() != null) {
				afterQuantity += Double.valueOf(leaseRepairAfter.getAssistQuantity());
			} else {
				throw new BusinessException("维修的数量不能为空！");
			}
		}
		if (Double.doubleToLongBits(beforeQuantity) == Double.doubleToLongBits(afterQuantity)) {
			for (Object beforeObject : leaseRepairBeforeSet) {
				LeaseRepairBefore leaseRepairBefore = (LeaseRepairBefore) beforeObject;
				double quantity = 0;
				for (Object afterObject : leaseRepairAfterSet) {
					LeaseRepairAfter leaseRepairAfter = (LeaseRepairAfter) afterObject;
					if (leaseRepairBefore.getMaterialsSpecifications().getMaterialsCommodity()
							.getCommodityId() == leaseRepairAfter.getMaterialsSpecifications().getMaterialsCommodity()
									.getCommodityId()) {
						quantity += Double.valueOf(leaseRepairAfter.getAssistQuantity());
					}
				}
				if (Double.doubleToLongBits(Double.valueOf(leaseRepairBefore.getAssistQuantity())) != Double
						.doubleToLongBits(quantity)) {
					throw new BusinessException(
							"周材" + leaseRepairBefore.getMaterialsSpecifications().getMaterialsCommodity().getCommodity()
									+ "维修前/后的数量不一致");
				}
			}
			isParity = true;
		}
		return isParity;
	}

	/**
	 * @Title LeaseRepairServiceImpl
	 * @Description: 调整维修后的租借库存
	 * @author 陈光毅
	 * @date 2018年1月26日 下午4:11:49
	 * @version v1.0
	 */
	private void addLeaseRepair(LeaseRepair leaseRepair) {
		Set<?> leaseRepairBeforeSet = leaseRepair.getLeaseRepairBeforeSet();
		Set<?> leaseRepairAfterSet = leaseRepair.getLeaseRepairAfterSet();
		if (leaseRepairBeforeSet != null && leaseRepairBeforeSet.size() > 0) {
			for (Object object : leaseRepairBeforeSet) {
				LeaseRepairBefore leaseRepairBefore = (LeaseRepairBefore) object;
				QueryFilter filter = new QueryFilter();
				filter.addConjunctFilter("Q_leaseId_L_EQ", leaseRepair.getLeaseContract().getLeaseId() + "");
				filter.addConjunctFilter("Q_[materialsSpecifications.specificationsId]_L_EQ",
						leaseRepairBefore.getMaterialsSpecifications().getSpecificationsId() + "");
				List<LeaseStock> listLeaseStock = leaseStockDao.getAll(filter);
				if (listLeaseStock != null && listLeaseStock.size() == 1) {
					for (LeaseStock s : listLeaseStock) {
						if (Integer.valueOf(leaseRepairBefore.getRepairQuantity()) > Integer.valueOf(s.getQuantity())) {
							throw new BusinessException("所维修的周材数量不能大于项目库存数量，请检查后重试！");
						} else {
							int quantity = Integer.valueOf(s.getQuantity())
									- Integer.valueOf(leaseRepairBefore.getRepairQuantity());
							s.setQuantity(String.valueOf(quantity));
							leaseStockDao.update(s);
						}
					}
				} else if (listLeaseStock == null) {
					throw new BusinessException("存在非法维修的周材，请检查后重试！");
				} else {
					throw new BusinessException("内部异常！请联系维护管理员");
				}
			}
		}
		if (leaseRepairAfterSet != null && leaseRepairAfterSet.size() > 0) {
			for (Object object : leaseRepairAfterSet) {
				LeaseRepairAfter leaseRepairAfter = (LeaseRepairAfter) object;
				QueryFilter filter = new QueryFilter();
				filter.addConjunctFilter("Q_leaseId_L_EQ", leaseRepair.getLeaseContract().getLeaseId() + "");
				filter.addConjunctFilter("Q_[materialsSpecifications.specificationsId]_L_EQ",
						leaseRepairAfter.getMaterialsSpecifications().getSpecificationsId() + "");
				List<LeaseStock> listLeaseStock = leaseStockDao.getAll(filter);
				if (listLeaseStock != null && listLeaseStock.size() == 1) {
					for (LeaseStock s : listLeaseStock) {
						int quantity = Integer.valueOf(leaseRepairAfter.getRepairQuantity())
								+ Integer.valueOf(s.getQuantity());
						s.setQuantity(String.valueOf(quantity));
						leaseStockDao.update(s);
					}
				} else if (listLeaseStock.size() > 1) {
					throw new BusinessException("内部异常！请联系维护管理员");
				} else {
					LeaseStock leaseStock = new LeaseStock();
					leaseStock.setLeaseId(leaseRepair.getLeaseContract().getLeaseId());
					leaseStock.setMaterialsSpecifications(leaseRepairAfter.getMaterialsSpecifications());
					leaseStock.setQuantity(leaseRepairAfter.getRepairQuantity());
					leaseStockDao.save(leaseStock);
				}
			}
		}
	}

	/**
	 * @Title LeaseRepairServiceImpl
	 * @Description: 调整维修后的项目库存
	 * @param leaseRepair
	 * @author 陈光毅
	 * @date 2018年1月30日 下午4:07:12
	 * @version v1.0
	 */
	public void addProjectRepair(LeaseRepair leaseRepair) {
		Set<?> leaseRepairBeforeSet = leaseRepair.getLeaseRepairBeforeSet();
		Set<?> leaseRepairAfterSet = leaseRepair.getLeaseRepairAfterSet();
		if (leaseRepairBeforeSet != null && leaseRepairBeforeSet.size() > 0) {
			for (Object object : leaseRepairBeforeSet) {
				LeaseRepairBefore leaseRepairBefore = (LeaseRepairBefore) object;
				QueryFilter filter = new QueryFilter();
				filter.addConjunctFilter("Q_[project.projectId]_L_EQ",
						leaseRepair.getLeaseContract().getProject().getProjectId() + "");
				filter.addConjunctFilter("Q_[materialsSpecifications.specificationsId]_L_EQ",
						leaseRepairBefore.getMaterialsSpecifications().getSpecificationsId() + "");
				List<ProjectMaterialsStore> listProjectMaterialsStore = projectMaterialsStoreDao.getAll(filter);
				if (listProjectMaterialsStore != null && listProjectMaterialsStore.size() == 1) {
					for (ProjectMaterialsStore p : listProjectMaterialsStore) {
						if (Integer.valueOf(leaseRepairBefore.getRepairQuantity()) > Integer.valueOf(p.getQuantity())) {
							throw new BusinessException("所维修的周材数量不能大于项目库存数量，请检查后重试！");
						} else {
							int quantity = Integer.valueOf(p.getQuantity())
									- Integer.valueOf(leaseRepairBefore.getRepairQuantity());
							p.setQuantity(String.valueOf(quantity));
							projectMaterialsStoreDao.update(p);
						}
					}
				} else if (listProjectMaterialsStore == null) {
					throw new BusinessException("存在非法维修的周材，请检查后重试！");
				} else {
					throw new BusinessException("内部异常！请联系维护管理员");
				}
			}
		}
		if (leaseRepairAfterSet != null && leaseRepairAfterSet.size() > 0) {
			for (Object object : leaseRepairAfterSet) {
				LeaseRepairAfter leaseRepairAfter = (LeaseRepairAfter) object;
				QueryFilter filter = new QueryFilter();
				filter.addConjunctFilter("Q_[project.projectId]_L_EQ",
						leaseRepair.getLeaseContract().getProject().getProjectId() + "");
				filter.addConjunctFilter("Q_[materialsSpecifications.specificationsId]_L_EQ",
						leaseRepairAfter.getMaterialsSpecifications().getSpecificationsId() + "");
				List<ProjectMaterialsStore> listProjectMaterialsStore = projectMaterialsStoreDao.getAll(filter);
				if (listProjectMaterialsStore != null && listProjectMaterialsStore.size() == 1) {
					for (ProjectMaterialsStore p : listProjectMaterialsStore) {
						int quantity = Integer.valueOf(p.getQuantity())
								+ Integer.valueOf(leaseRepairAfter.getRepairQuantity());
						p.setQuantity(String.valueOf(quantity));
						projectMaterialsStoreDao.update(p);
					}
				} else if (listProjectMaterialsStore.size() > 1) {
					throw new BusinessException("内部异常！请联系维护管理员");
				} else {
					ProjectMaterialsStore projectMaterialsStore = new ProjectMaterialsStore();
					projectMaterialsStore.setProject(leaseRepair.getLeaseContract().getProject());
					projectMaterialsStore.setMaterialsSpecifications(leaseRepairAfter.getMaterialsSpecifications());
					projectMaterialsStore.setQuantity(leaseRepairAfter.getRepairQuantity());
					projectMaterialsStoreDao.save(projectMaterialsStore);
				}
			}
		}
	}

	/**
	 * @Title LeaseRepairServiceImpl
	 * @Description: 项目出入库记录
	 * @author 陈光毅
	 * @date 2018年1月30日 下午5:24:20
	 * @version v1.0
	 */
	public void addRecord(LeaseRepair leaseRepair) {
		Set<?> beforeSet = leaseRepair.getLeaseRepairBeforeSet();
		Set<?> afterSet = leaseRepair.getLeaseRepairAfterSet();
		if (beforeSet != null && beforeSet.size() > 0) {
			for (Object object : beforeSet) {
				LeaseRepairBefore leaseRepairBefore = (LeaseRepairBefore) object;
				ProjectDepotInOut projectDepotInOut = new ProjectDepotInOut();
				projectDepotInOut.setCommodity(
						leaseRepairBefore.getMaterialsSpecifications().getMaterialsCommodity().getCommodity());
				projectDepotInOut.setSpecificationsId(leaseRepairBefore.getMaterialsSpecifications().getSpecificationsId());
				projectDepotInOut.setSpecifications(leaseRepairBefore.getMaterialsSpecifications().getSpecifications());
				projectDepotInOut.setUnit(leaseRepairBefore.getMaterialsSpecifications().getFirstUnitConversion());
				projectDepotInOut.setQuantity(leaseRepairBefore.getRepairQuantity());
				projectDepotInOut.setSupplementQuantity(leaseRepairBefore.getAssistQuantity());
				projectDepotInOut.setOperationWay("租借维修出库");
				projectDepotInOut.setContractId(leaseRepair.getLeaseContract().getContractId());
				projectDepotInOut.setRelateId(leaseRepair.getRepairId());
				projectDepotInOut.setRelateModule("LEASE_REPAIR");
				projectDepotInOut.setRelateModuleName("租借维修");
				projectDepotInOut.setRelateSerial(leaseRepair.getRepairSerial());
				projectDepotInOut.setProjectId(leaseRepair.getLeaseContract().getProject().getProjectId());
				projectDepotInOut.setProjectName(leaseRepair.getLeaseContract().getProject().getProjectName());
				projectDepotInOut.setOperationDate(DateUtil.changeObj2DateStr(leaseRepair.getRepairDate(), "yyyy-MM-dd"));
				
				projectDepotInOut.setLeaseId(leaseRepair.getLeaseContract().getLeaseId());
				projectDepotInOutDao.save(projectDepotInOut);
			}
		}
		if (afterSet != null && afterSet.size() > 0) {
			for (Object object : afterSet) {
				LeaseRepairAfter leaseRepairAfter = (LeaseRepairAfter) object;
				ProjectDepotInOut projectDepotInOut = new ProjectDepotInOut();
				projectDepotInOut.setCommodity(
						leaseRepairAfter.getMaterialsSpecifications().getMaterialsCommodity().getCommodity());
				projectDepotInOut.setSpecificationsId(leaseRepairAfter.getMaterialsSpecifications().getSpecificationsId());
				projectDepotInOut.setSpecifications(leaseRepairAfter.getMaterialsSpecifications().getSpecifications());
				projectDepotInOut.setUnit(leaseRepairAfter.getMaterialsSpecifications().getFirstUnitConversion());
				projectDepotInOut.setQuantity(leaseRepairAfter.getRepairQuantity());
				projectDepotInOut.setSupplementQuantity(leaseRepairAfter.getAssistQuantity());
				projectDepotInOut.setOperationWay("租借维修入库");
				projectDepotInOut.setContractId(leaseRepair.getLeaseContract().getContractId());
				projectDepotInOut.setRelateId(leaseRepair.getRepairId());
				projectDepotInOut.setRelateModule("LEASE_REPAIR");
				projectDepotInOut.setRelateModuleName("租借维修");
				projectDepotInOut.setRelateSerial(leaseRepair.getRepairSerial());
				projectDepotInOut.setProjectId(leaseRepair.getLeaseContract().getProject().getProjectId());
				projectDepotInOut.setProjectName(leaseRepair.getLeaseContract().getProject().getProjectName());
				projectDepotInOut.setOperationDate(DateUtil.changeObj2DateStr(leaseRepair.getRepairDate(), "yyyy-MM-dd"));
				
				projectDepotInOut.setLeaseId(leaseRepair.getLeaseContract().getLeaseId());
				projectDepotInOutDao.save(projectDepotInOut);
			}
		}
	}
}
