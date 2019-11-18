/**
 *====================================================
 * 文件名称: SettleContractService.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-24			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service;

import com.knight.emms.core.service.BaseBusinessModelService;
import com.knight.emms.model.ContractCostitem;
import com.knight.emms.model.SettleContract;

import java.util.Set;

/**
 * @ClassName: SettleContractService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-24 下午5:09:07
 */
public interface SettleContractService extends BaseBusinessModelService<SettleContract> {

	public SettleContract getTranslateAll(Long settleId);

	public void saveOrMergeEdit(SettleContract settleContract);

	public void deleteEquipBrief(Long seBriefId);

	public void deleteComponBrief(Long scBriefId);

	public void deleteItemBrief(Long siBriefId);

	public void effective(SettleContract settleContract);

	public void loseEffective(SettleContract p);

	public Set<ContractCostitem> getContractCostitems(Long contractId);

	public void deleteOperatorSalary(Long statementId);

	public void deleteSafetyMonitor(Long statementId);

	public void deleteOtherExpense(Long statementId);

	/**合并结算*/
	void saveCombine(SettleContract sc, String contractIds);

	/**预收款对冲至结算单*/
	void hedgingAdvanceReceive(SettleContract sc);
	
	/**判断结算单是否在关账期间*/
	public void isCloseSettle(SettleContract settleContract);
	
	/**修改结算的关账状态*/
	public void editClosedStatus(String months,String closeStatus);
	
	public String getActivateMonths(String startDate,String endDate);
	
	public void updateAmount(SettleContract settleContract,SettleContract p);
	/**刷新结算单的累计应收、已收、尚欠款*/
	public void refreshSum(SettleContract settleContract);

}
