/**
 *====================================================
 * 文件名称: LeaseContract.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年8月15日		chengy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.Set;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.knight.emms.constant.Constant;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.LeaseContractDao;
import com.knight.emms.dao.LeaseExpenseHandlingDao;
import com.knight.emms.dao.LeaseMaterialsInventoryDao;
import com.knight.emms.dao.LeaseMaterialsRecordDao;
import com.knight.emms.dao.LeasePriceSettingDao;
import com.knight.emms.dao.LeaseScrapCompensationDao;
import com.knight.emms.dao.LeaseSpoiledIndemnityDao;
import com.knight.emms.model.FormAccept;
import com.knight.emms.model.FormApprove;
import com.knight.emms.model.LeaseContract;
import com.knight.emms.model.LeaseMaterialsRecord;
import com.knight.emms.model.LeasePriceSetting;
import com.knight.emms.model.MaterialsSpecifications;
import com.knight.emms.service.LeaseContractService;

import groovy.util.logging.Slf4j;
import lombok.SneakyThrows;

/**
 * @ClassName: LeaseContract
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chengy
 * @date 2017年8月15日 下午5:12:52
 */
@Slf4j
@Service("leaseContractService")
@Transactional(rollbackFor = { Exception.class, RuntimeException.class })
public class LeaseContractServiceImpl extends BusinessFlowServiceImpl<LeaseContract> implements LeaseContractService {

	private LeaseContractDao leaseContractDao;
	
	@Resource
	private LeaseMaterialsInventoryDao leaseMaterialsInventoryDao;
	
	@Resource
	private LeasePriceSettingDao leasePriceSettingDao;
	
	@Resource
	private LeaseSpoiledIndemnityDao leaseSpoiledIndemnityDao;
	
	@Resource
	private LeaseScrapCompensationDao leaseScrapCompensationDao;
	
	@Resource
	private LeaseExpenseHandlingDao leaseExpenseHandlingDao;

	/** 周材租借记录 */
	@Resource
	private LeaseMaterialsRecordDao leaseMaterialsRecordDao;
	
	@Autowired(required = true)
	public LeaseContractServiceImpl(@Qualifier("leaseContractDao") LeaseContractDao dao) {
		super(dao);
		this.leaseContractDao = dao;
	}
	
	@Override
	@SneakyThrows(Exception.class)
	public void delInventory(Long inventoryId) throws RuntimeException {
		leaseMaterialsInventoryDao.remove(inventoryId);
	}

	@Override
	@SneakyThrows(Exception.class)
	public void delPrice(Long priceId) throws RuntimeException {
		leasePriceSettingDao.remove(priceId);
	}

	@Override
	@SneakyThrows(Exception.class)
	public void delSpoiled(Long spoiledId) throws RuntimeException {
		leaseSpoiledIndemnityDao.remove(spoiledId);
	}
	
	@Override
	@SneakyThrows(Exception.class)
	public void delCompensation(Long compensationId) throws RuntimeException {
		leaseScrapCompensationDao.remove(compensationId);
	}

	@Override
	@SneakyThrows(Exception.class)
	public void delExpense(Long expenseId) throws RuntimeException {
		leaseExpenseHandlingDao.remove(expenseId);
	}

	@Override
	@SneakyThrows(Exception.class)
	public void saveOrMergeForEdit(LeaseContract t) throws RuntimeException {
		if (t.getContractId() == null) {
			throw new NullPointerException("周材合同ID为空！");
		}
		if (t.getDepId() == null) {
			throw new NullPointerException("管理部门ID为空");
		}
		if (t.getLeaseId() == null) {
			t.setStatus("0");
			t.setDelFlag(Constant.ENABLED);
			leaseContractDao.saveSerialModel(t);
			t.setSubLeaseContract();
		} else {
			t.setStatus(t.getStatus());
			t.setDelFlag(Constant.ENABLED);
			t.setSubLeaseContract();
		}
		leaseContractDao.save(t);
	}
	
	@Override
	@SneakyThrows(Exception.class)
	protected LeaseContract passFlowAcceptApplication(FormAccept formAccept) throws RuntimeException {
		LeaseContract leaseContract = super.passFlowAcceptApplication(formAccept);
		return leaseContract;
	}
	
	@Override
	@SneakyThrows(Exception.class)
	public void passApproveApplication(FormApprove formApprove) throws RuntimeException {
		LeaseContract leaseContract = passFlowApproveApplication(formApprove);
		leaseContractDao.save(leaseContract);
		this.addMaterialsRecord(leaseContract);
		logger.info("生成周材租借记录值!");
	}
	
	/** 生成周材租借记录值 */
	@SneakyThrows(Exception.class)
	public void addMaterialsRecord(LeaseContract leaseContract) throws RuntimeException {
		Set<?> set = leaseContract.getLeasePriceSettingSet();
		if (set != null && set.size() > 0) {
			for (Object object : set) {
				LeasePriceSetting leasePriceSetting = (LeasePriceSetting) object;
				LeaseMaterialsRecord leaseMaterialsRecord = new LeaseMaterialsRecord();
				leaseMaterialsRecord.setLeaseId(leaseContract.getLeaseId());
				MaterialsSpecifications materialsSpecifications = new MaterialsSpecifications();
				materialsSpecifications.setSpecificationsId(leasePriceSetting.getSpecificationsId());
				leaseMaterialsRecord.setMaterialsSpecifications(materialsSpecifications);
				leaseMaterialsRecordDao.save(leaseMaterialsRecord);
			}
		}
	}
}
