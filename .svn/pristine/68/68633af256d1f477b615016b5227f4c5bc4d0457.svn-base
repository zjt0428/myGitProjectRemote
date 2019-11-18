/**
 * Copyright © 2018 Chen·G·Y. All rights reserved. 
 *====================================================
 * 文件名称: ProjectRepairServiceImpl.java
 * 作者: 陈光毅
 * 创建日期: 2018年1月23日
 *====================================================
 * 文件描述: 项目维修 Service接口实现
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
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.ProjectDao;
import com.knight.emms.dao.ProjectDepotInOutDao;
import com.knight.emms.dao.ProjectMaterialsStoreDao;
import com.knight.emms.dao.ProjectRepairAfterDao;
import com.knight.emms.dao.ProjectRepairBeforeDao;
import com.knight.emms.dao.ProjectRepairDao;
import com.knight.emms.model.FormAccept;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.Project;
import com.knight.emms.model.ProjectDepotInOut;
import com.knight.emms.model.ProjectMaterialsStore;
import com.knight.emms.model.ProjectRepair;
import com.knight.emms.model.ProjectRepairAfter;
import com.knight.emms.model.ProjectRepairBefore;
import com.knight.emms.service.ProjectRepairService;

import lombok.SneakyThrows;

/**
 * @ClassName: ProjectRepairServiceImpl
 * @Description: 项目维修 Service接口实现
 * @author 陈光毅
 * @date 2018年1月23日 下午4:30:22
 * @version v1.0
 */
@Service("projectRepairService")
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class ProjectRepairServiceImpl extends BusinessFlowServiceImpl<ProjectRepair> implements ProjectRepairService {

	private ProjectRepairDao projectRepairDao;

	/** 维修前 */
	@Resource
	private ProjectRepairBeforeDao projectRepairBeforeDao;

	/** 维修后 */
	@Resource
	private ProjectRepairAfterDao projectRepairAfterDao;

	/** 项目库存 */
	@Resource
	private ProjectMaterialsStoreDao projectMaterialsStoreDao;

	/** 项目 */
	@Resource
	private ProjectDao projectDao;
	
	/** 项目出入库记录表 */
	@Resource
	private ProjectDepotInOutDao projectDepotInOutDao;
	
	/**
	 * @Title ProjectRepairServiceImpl
	 * @Description: Spring注入
	 * @param dao
	 * @throws RuntimeException
	 * @author 陈光毅
	 * @date 2018年1月23日 下午4:30:40
	 * @version v1.0
	 */
	@Autowired(required = true)
	public ProjectRepairServiceImpl(@Qualifier("projectRepairDao") ProjectRepairDao dao) throws RuntimeException {
		super(dao);
		this.projectRepairDao = dao;
	}

	/*
	 * （非 Javadoc）
	 * 
	 * @see
	 * com.knight.emms.core.service.BusinessFlowService#saveOrMergeForEdit(com.
	 * knight.emms.core.ApplyforState)
	 */
	@Override
	@SneakyThrows(Exception.class)
	public void saveOrMergeForEdit(ProjectRepair projectRepair) throws RuntimeException {
		if (projectRepair.getRepairId() == null) {
			projectRepair.setStatus("0");
			projectRepair.setSubProjectRepair();
			if (this.parity(projectRepair)) {
				projectRepairDao.saveSerialModel(projectRepair);
				projectRepairDao.save(projectRepair);
			} else {
				throw new BusinessException("维修前/后的周材数量不一致");
			}
		} else {
			projectRepair.setStatus(projectRepair.getStatus());
			projectRepair.setSubProjectRepair();
			if (this.parity(projectRepair)) {
				projectRepairDao.update(projectRepair);
			} else {
				throw new BusinessException("维修前/后的周材数量不一致");
			}
		}
	}

	/** 删除维修前页签数据 */
	@Override
	@SneakyThrows(Exception.class)
	public void delBefore(Long beforeId) throws RuntimeException {
		projectRepairBeforeDao.remove(beforeId);
	}

	/** 删除维修后页签数据 */
	@Override
	@SneakyThrows(Exception.class)
	public void delAfter(Long afterId) throws RuntimeException {
		projectRepairAfterDao.remove(afterId);
	}

	/** 审核 */
	@Override
	@SneakyThrows(Exception.class)
	protected ProjectRepair passFlowAcceptApplication(FormAccept formAccept) throws RuntimeException {
		ProjectRepair projectRepair = super.passFlowAcceptApplication(formAccept);
		return projectRepair;
	}

	/** 审批 */
	@Override
	@SneakyThrows(Exception.class)
	public void passApproveApplication(FormApprove formApprove) throws RuntimeException {
		ProjectRepair projectRepair = passFlowApproveApplication(formApprove);
		// 调整维修后的项目库存
		this.addRepair(projectRepair);
		logger.info("项目库存已调整！");
		// 添加到出入库记录表
		this.addRecord(projectRepair);
		logger.info("已添加到出入库记录表！");
		projectRepairDao.save(projectRepair);
	}

	/**
	 * @Title ProjectRepairServiceImpl
	 * @Description: 数量对等判断
	 * @param projectRepair
	 * @author 陈光毅
	 * @date 2018年1月30日 上午8:46:55
	 * @version v1.0
	 */
	public boolean parity(ProjectRepair projectRepair) {
		boolean isParity = false;
		Set<?> projectRepairBeforeSet = projectRepair.getProjectRepairBeforeSet();
		Set<?> projectRepairAfterSet = projectRepair.getProjectRepairAfterSet();
		double beforeQuantity = 0;
		double afterQuantity = 0;
		for (Object object : projectRepairBeforeSet) {
			ProjectRepairBefore projectRepairBefore = (ProjectRepairBefore) object;
			if (projectRepairBefore.getAssistQuantity() != null) {
				beforeQuantity += Double.valueOf(projectRepairBefore.getAssistQuantity());
			} else {
				throw new BusinessException("维修的数量不能为空！");
			}
		}
		for (Object object : projectRepairAfterSet) {
			ProjectRepairAfter projectRepairAfter = (ProjectRepairAfter) object;
			if (projectRepairAfter.getAssistQuantity() != null) {
				afterQuantity += Double.valueOf(projectRepairAfter.getAssistQuantity());
			} else {
				throw new BusinessException("维修的数量不能为空！");
			}
		}
		if (Double.doubleToLongBits(beforeQuantity) == Double.doubleToLongBits(afterQuantity)) {
			for (Object beforeObject : projectRepairBeforeSet) {
				ProjectRepairBefore projectRepairBefore = (ProjectRepairBefore) beforeObject;
				double quantity = 0;
				
				for (Object afterObject : projectRepairAfterSet) {
					ProjectRepairAfter projectRepairAfter = (ProjectRepairAfter) afterObject;
					if (projectRepairBefore.getMaterialsSpecifications().getMaterialsCommodity()
							.getCommodityId() == projectRepairAfter.getMaterialsSpecifications().getMaterialsCommodity()
									.getCommodityId()) {
						quantity += Double.valueOf(projectRepairAfter.getAssistQuantity());
					}
				}
				if (quantity==0) {
					boolean exist = false;
					boolean eq = false;
					for(Object afterObject : projectRepairAfterSet) {
						ProjectRepairAfter projectRepairAfter = (ProjectRepairAfter) afterObject;
						if(projectRepairAfter.getMaterialsSpecifications().getSecondConvertedQuantity().equals(
								projectRepairBefore.getMaterialsSpecifications().getSecondConvertedQuantity())) {
							exist = true;
							if(projectRepairAfter.getAssistQuantity().equals(projectRepairBefore.getAssistQuantity())) {
								eq = true;
							}
						}
					}
					if(exist&&eq) {
						continue;
					} else {
						throw new BusinessException("【"+projectRepairBefore.getMaterialsSpecifications().getMaterialsCommodity().getCommodity()
								+projectRepairBefore.getMaterialsSpecifications().getSpecifications()+"】维修前/后的辅助数量不一致");
					}
				} else {
					if (Double.doubleToLongBits(Double.valueOf(projectRepairBefore.getAssistQuantity())) != Double
							.doubleToLongBits(quantity)) {
						throw new BusinessException("周材"
								+ projectRepairBefore.getMaterialsSpecifications().getMaterialsCommodity().getCommodity()
								+ "维修前/后的数量不一致");
					}
				}
				
			}
			isParity = true;
		}
		return isParity;
	}

	/**
	 * @Title ProjectRepairServiceImpl
	 * @Description: 调整维修后的项目库存
	 * @param projectRepair
	 * @author 陈光毅
	 * @date 2018年1月30日 上午9:38:26
	 * @version v1.0
	 */
	private void addRepair(ProjectRepair projectRepair) {
		Set<?> projectRepairBeforeSet = projectRepair.getProjectRepairBeforeSet();
		Set<?> projectRepairAfterSet = projectRepair.getProjectRepairAfterSet();
		if (projectRepairBeforeSet != null && projectRepairBeforeSet.size() > 0) {
			for (Object object : projectRepairBeforeSet) {
				ProjectRepairBefore projectRepairBefore = (ProjectRepairBefore) object;
				QueryFilter filter = new QueryFilter();
				filter.addConjunctFilter("Q_[project.projectId]_L_EQ",
						projectRepair.getContractMaterials().getProjectId() + "");
				filter.addConjunctFilter("Q_[materialsSpecifications.specificationsId]_L_EQ",
						projectRepairBefore.getMaterialsSpecifications().getSpecificationsId() + "");
				List<ProjectMaterialsStore> listProjectMaterialsStore = projectMaterialsStoreDao.getAll(filter);
				if (listProjectMaterialsStore != null && listProjectMaterialsStore.size() == 1) {
					for (ProjectMaterialsStore p : listProjectMaterialsStore) {
						if (Integer.valueOf(projectRepairBefore.getRepairQuantity()) > Integer
								.valueOf(p.getQuantity())) {
							throw new BusinessException("所维修的周材数量不能大于项目库存数量，请检查后重试！");
						} else {
							int quantity = Integer.valueOf(p.getQuantity())
									- Integer.valueOf(projectRepairBefore.getRepairQuantity());
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
		if (projectRepairAfterSet != null && projectRepairAfterSet.size() > 0) {
			for (Object object : projectRepairAfterSet) {
				ProjectRepairAfter projectRepairAfter = (ProjectRepairAfter) object;
				QueryFilter filter = new QueryFilter();
				filter.addConjunctFilter("Q_[project.projectId]_L_EQ",
						projectRepair.getContractMaterials().getProjectId() + "");
				filter.addConjunctFilter("Q_[materialsSpecifications.specificationsId]_L_EQ",
						projectRepairAfter.getMaterialsSpecifications().getSpecificationsId() + "");
				List<ProjectMaterialsStore> listProjectMaterialsStore = projectMaterialsStoreDao.getAll(filter);
				if (listProjectMaterialsStore != null && listProjectMaterialsStore.size() == 1) {
					for (ProjectMaterialsStore p : listProjectMaterialsStore) {
						int quantity = Integer.valueOf(p.getQuantity())
								+ Integer.valueOf(projectRepairAfter.getRepairQuantity());
						p.setQuantity(String.valueOf(quantity));
						projectMaterialsStoreDao.update(p);
					}
				} else if (listProjectMaterialsStore.size() > 1) {
					throw new BusinessException("内部异常！请联系维护管理员");
				} else {
					ProjectMaterialsStore projectMaterialsStore = new ProjectMaterialsStore();
					Project project = projectDao.get(projectRepair.getContractMaterials().getProjectId());
					projectMaterialsStore.setProject(project);
					projectMaterialsStore.setMaterialsSpecifications(projectRepairAfter.getMaterialsSpecifications());
					projectMaterialsStore.setQuantity(projectRepairAfter.getRepairQuantity());
					projectMaterialsStoreDao.save(projectMaterialsStore);
				}
			}
		}
	}
	
	/**
	 * @Title ProjectRepairServiceImpl
	 * @Description: 项目出入库记录
	 * @param projectRepair
	 * @author 陈光毅
	 * @date 2018年1月30日 下午5:23:50
	 * @version v1.0
	 */
	public void addRecord(ProjectRepair projectRepair) {
		Set<?> beforeSet = projectRepair.getProjectRepairBeforeSet();
		Set<?> afterSet = projectRepair.getProjectRepairAfterSet();
		if(beforeSet != null && beforeSet.size() > 0) {
			for(Object object : beforeSet) {
				ProjectRepairBefore projectRepairBefore = (ProjectRepairBefore) object;
				Project project = projectDao.get(projectRepair.getContractMaterials().getProjectId());
				ProjectDepotInOut projectDepotInOut = new ProjectDepotInOut();
				projectDepotInOut.setCommodity(
						projectRepairBefore.getMaterialsSpecifications().getMaterialsCommodity().getCommodity());
				projectDepotInOut.setSpecificationsId(projectRepairBefore.getMaterialsSpecifications().getSpecificationsId());
				projectDepotInOut.setSpecifications(projectRepairBefore.getMaterialsSpecifications().getSpecifications());
				projectDepotInOut.setUnit(projectRepairBefore.getMaterialsSpecifications().getFirstUnitConversion());
				projectDepotInOut.setQuantity(projectRepairBefore.getRepairQuantity());
				projectDepotInOut.setSupplementQuantity(projectRepairBefore.getAssistQuantity());
				projectDepotInOut.setOperationWay("项目维修出库");
				projectDepotInOut.setContractId(projectRepair.getContractMaterials().getContractmaId());
				projectDepotInOut.setRelateId(projectRepair.getRepairId());
				projectDepotInOut.setRelateModule("PROJECT_REPAIR");
				projectDepotInOut.setRelateModuleName("项目维修");
				projectDepotInOut.setRelateSerial(projectRepair.getRepairSerial());
				projectDepotInOut.setProjectId(project.getProjectId());
				projectDepotInOut.setProjectName(project.getProjectName());
				projectDepotInOut.setOperationDate(DateUtil.changeObj2DateStr(projectRepair.getRepairDate(), "yyyy-MM-dd"));
				projectDepotInOutDao.save(projectDepotInOut);
			}
		}
		if(afterSet != null && afterSet.size() > 0) {
			for(Object object : afterSet) {
				ProjectRepairAfter projectRepairAfter = (ProjectRepairAfter) object;
				Project project = projectDao.get(projectRepair.getContractMaterials().getProjectId());
				ProjectDepotInOut projectDepotInOut = new ProjectDepotInOut();
				projectDepotInOut.setCommodity(
						projectRepairAfter.getMaterialsSpecifications().getMaterialsCommodity().getCommodity());
				projectDepotInOut.setSpecificationsId(projectRepairAfter.getMaterialsSpecifications().getSpecificationsId());
				projectDepotInOut.setSpecifications(projectRepairAfter.getMaterialsSpecifications().getSpecifications());
				projectDepotInOut.setUnit(projectRepairAfter.getMaterialsSpecifications().getFirstUnitConversion());
				projectDepotInOut.setQuantity(projectRepairAfter.getRepairQuantity());
				projectDepotInOut.setSupplementQuantity(projectRepairAfter.getAssistQuantity());
				projectDepotInOut.setOperationWay("项目维修入库");
				projectDepotInOut.setContractId(projectRepair.getContractMaterials().getContractmaId());
				projectDepotInOut.setRelateId(projectRepair.getRepairId());
				projectDepotInOut.setRelateModule("PROJECT_REPAIR");
				projectDepotInOut.setRelateModuleName("项目维修");
				projectDepotInOut.setRelateSerial(projectRepair.getRepairSerial());
				projectDepotInOut.setProjectId(project.getProjectId());
				projectDepotInOut.setProjectName(project.getProjectName());
				projectDepotInOut.setOperationDate(DateUtil.changeObj2DateStr(projectRepair.getRepairDate(), "yyyy-MM-dd"));
				projectDepotInOutDao.save(projectDepotInOut);
			}
		}
	}
}
