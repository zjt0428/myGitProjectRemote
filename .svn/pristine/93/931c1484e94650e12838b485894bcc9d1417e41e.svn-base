/**
 *====================================================
 * 文件名称: TeamsAccountServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年3月31日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;

import javax.annotation.Resource;

import com.knight.core.util.DateUtil;
import com.knight.emms.dao.TeamsAccountDao;
import com.knight.emms.dao.TeamsAccountLogisticsDao;
import com.knight.emms.dao.TeamsAccountOtherDao;
import com.knight.emms.dao.TeamsAccountPractiDao;
import com.knight.emms.domain.FundPaymentVoucherService;
import com.knight.emms.model.AmountPayment;
import com.knight.emms.model.TeamsAccount;
import com.knight.emms.service.TeamsAccountService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: TeamsAccountServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年3月31日 上午12:21:45
 */
public class TeamsAccountServiceImpl extends BusinessLongPKServiceImpl<TeamsAccount> implements TeamsAccountService, FundPaymentVoucherService {

	private TeamsAccountDao teamsAccountDao;

	@Resource
	private TeamsAccountLogisticsDao teamsAccountLogisticsDao;

	@Resource
	private TeamsAccountOtherDao teamsAccountOtherDao;

	@Resource
	private TeamsAccountPractiDao teamsAccountPractiDao;

	public TeamsAccountServiceImpl(TeamsAccountDao dao) {
		super(dao);
		this.teamsAccountDao = dao;
	}

	public TeamsAccount getTranslateAll(Long teamsAccountId) {
		TeamsAccount teamsAccount = teamsAccountDao.get(teamsAccountId);
		CodeServiceImpl.translate(teamsAccount, teamsAccountDao.getPersistantStruct());
		return teamsAccount;
	}

	public void saveOrMergeEdit(TeamsAccount teamsAccount) {
		if (teamsAccount.getTeamsAccountId() == null) {
			teamsAccountDao.save(teamsAccount);
			Object[] params = new Object[] { teamsAccount.getPractiId(), teamsAccount.getProjectId(), teamsAccount.getTeams(), DateUtil.changeDateToStr(teamsAccount.getAccountStartDate(), DateUtil.LINK_DISPLAY_DATE), DateUtil.changeDateToStr(teamsAccount.getAccountEndDate(), DateUtil.LINK_DISPLAY_DATE), teamsAccount.getTeamsAccountId() };
			teamsAccountDao.updateScirpt("teamsaccount.update_knot_wall_jacking", params);
			teamsAccountDao.updateScirpt("teamsaccount.update_knot_wall_dismantle", params);
			params = new Object[] { teamsAccount.getPractiId(), teamsAccount.getProjectId(), teamsAccount.getTeams(), teamsAccount.getTeamsAccountId() };
			teamsAccountDao.updateScirpt("teamsaccount.update_autocrane_dispatch", params);
		}
		teamsAccount.setSubTeamsAccount();
		teamsAccountDao.merge(teamsAccount);
	}

	public void deleteLogistics(Long logisticsId) {
		teamsAccountLogisticsDao.remove(logisticsId);
	}

	public void deleteOther(Long otherId) {
		teamsAccountOtherDao.remove(otherId);
	}

	public void deletePracti(Long practiId) {
		teamsAccountPractiDao.remove(practiId);
	}

	public void delete(TeamsAccount teamsAccount) {
		Long teamsAccountId = teamsAccount.getTeamsAccountId();
		teamsAccountDao.remove(teamsAccount);
		teamsAccountDao.updateScirpt("teamsaccount.clean_knot_wall_jacking", teamsAccountId);
		teamsAccountDao.updateScirpt("teamsaccount.clean_knot_wall_dismantle", teamsAccountId);
		teamsAccountDao.updateScirpt("teamsaccount.clean_autocrane_dispatch", teamsAccountId);
	}

	public BigDecimal getRelatePaymentAmount(Long teamsAccountId) {
		TeamsAccount teamsAccount = teamsAccountDao.get(teamsAccountId);
		return teamsAccount.getPaymentAmount();
	}

	public void saveRelateAmountPaymentStatus(AmountPayment amountPayment, Long teamsAccountId, String status) {
		TeamsAccount teamsAccount = teamsAccountDao.get(teamsAccountId);
		teamsAccount.setFundStatus(status);
		teamsAccount.setFinishedAmount(amountPayment.getHasPaymentAmount());
		teamsAccountDao.save(teamsAccount);
	}

	public TeamsAccount getTranslateFull(Long teamsAccountId) {
		TeamsAccount teamsAccount = teamsAccountDao.get(teamsAccountId);
		CodeServiceImpl.translate(teamsAccount);
		CodeServiceImpl.translate(teamsAccount.getTeamsAccountKnotSet());
		CodeServiceImpl.translate(teamsAccount.getTeamsAccountWallSet());
		return teamsAccount;
	}

}
