/**
 *====================================================
 * 文件名称: RentContractServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月11日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;

import javax.annotation.Resource;

import com.knight.emms.constant.Constant;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.RentComponBriefDao;
import com.knight.emms.dao.RentContractDao;
import com.knight.emms.dao.RentDeductBriefDao;
import com.knight.emms.dao.RentEquipBriefDao;
import com.knight.emms.dao.RentItemBriefDao;
import com.knight.emms.domain.FundPaymentVoucherService;
import com.knight.emms.model.AmountPayment;
import com.knight.emms.model.RentContract;
import com.knight.emms.service.InstalmentService;
import com.knight.emms.service.RentContractService;
import com.knight.emms.support.FundPlanSupport;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: RentContractServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月11日 下午11:19:48
 */
public class RentContractServiceImpl extends BaseBusinessModelServiceImpl<RentContract> implements RentContractService, FundPaymentVoucherService {

	@Resource
	private RentEquipBriefDao rentEquipBriefDao;

	@Resource
	private RentComponBriefDao rentComponBriefDao;

	@Resource
	private RentItemBriefDao rentItemBriefDao;

	@Resource
	private RentDeductBriefDao rentDeductBriefDao;

	@Resource
	private InstalmentService instalmentService;

	private RentContractDao rentContractDao;

	public RentContractServiceImpl(RentContractDao dao) {
		super(dao);
		this.rentContractDao = dao;
	}

	public RentContract getTranslateAll(Long rentId) {
		RentContract rent = rentContractDao.get(rentId);
		CodeServiceImpl.translate(rent, rentContractDao.getPersistantStruct());
		return rent;
	}

	public void saveOrMergeEdit(RentContract rentContract) {
		if (rentContract.getRentId() == null) {
			rentContractDao.saveSerialModel(rentContract);
		}
		rentContract.setSubRentContract();
		rentContractDao.merge(rentContract);
		rentContract.setInstalmentSet(FundPlanSupport.createInstalment(rentContract));
		instalmentService.saveOrMeger(rentContract.getInstalmentSet());
	}

	public void deleteEquipBrief(Long rentEquipBriefId) {
		rentEquipBriefDao.remove(rentEquipBriefId);
	}

	public void deleteComponBrief(Long rentComponBriefId) {
		rentComponBriefDao.remove(rentComponBriefId);
	}

	public void deleteItemBrief(Long rentItemBriefId) {
		rentItemBriefDao.remove(rentItemBriefId);
	}

	public void deleteDeductBrief(Long rentDeductBriefId) {
		rentDeductBriefDao.remove(rentDeductBriefId);
	}

	public void effective(RentContract rentContract) {
		rentContract.setEffective(Constant.ENABLED);
		rentContractDao.save(rentContract);
	}

	public void loseEffective(RentContract rentContract) {
		rentContract.setEffective(Constant.DISENABLED);
		rentContractDao.save(rentContract);
	}

	public BigDecimal getRelatePaymentAmount(Long rentId) {
		RentContract rentContract = rentContractDao.get(rentId);
		return rentContract.getPaymentAmount();
	}

	public void saveRelateAmountPaymentStatus(AmountPayment amountPayment, Long rentId, String status) {
		RentContract b = rentContractDao.get(rentId);
		b.setFinishedAmount(amountPayment.getHasPaymentAmount());
		b.setFundStatus(status);
		rentContractDao.save(b);
	}

}
