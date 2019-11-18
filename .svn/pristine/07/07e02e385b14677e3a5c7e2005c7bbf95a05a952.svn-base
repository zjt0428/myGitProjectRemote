/**
 *====================================================
 * 文件名称: SalaryServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-17			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.emms.core.service.BusinessFlowServiceImpl;
import com.knight.emms.dao.CorpAccountDao;
import com.knight.emms.dao.SalaryDao;
import com.knight.emms.dao.SalaryPractiDao;
import com.knight.emms.model.*;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.service.SalaryService;
import com.knight.system.service.CodeService;

/**
 * @ClassName: SalaryServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-17 下午4:30:20
 */
public class SalaryServiceImpl extends BusinessFlowServiceImpl<Salary> implements SalaryService {

	private SalaryDao salaryDao;

	@Resource
	private SalaryPractiDao salaryPractiDao;

	@Resource
	private CorpAccountDao corpAccountDao;

	@Resource
	private CodeService codeService;

    @Resource
    private BusinessMessageService businessMessageService;

	public SalaryServiceImpl(SalaryDao dao) {
		super(dao);
		this.salaryDao = dao;
	}

	public Salary getTranslateFull(Long salaryId) {
		Salary s = salaryDao.get(salaryId);
		s.setApplyforStateName(codeService.getValue("APPLYFOR_STATE", s.getApplyforState()));
		s.getSalaryPractiSet();
		return s;
	}

	@Override
	public void saveOrMergeForEdit(Salary salary) {
		if (salary.getSalaryId() == null) {
			salaryDao.saveSerialModel(salary);
		}
		salary.setSubSalary();
		salaryDao.merge(salary);
	}

	public void deletedPracti(Long salaryPractiId) {
		salaryPractiDao.remove(salaryPractiId);
	}

	public void passApproveApplication(FormApprove formApprove) {
		Salary s = super.passFlowApproveApplication(formApprove);
		List<Map<String, Object>> existPractis = salaryDao.queryByScript("fund.salary_exist_practi", s.getSalaryId());
		if (!existPractis.isEmpty()) {
			StringBuffer sb = new StringBuffer("以下人员已经生成[" + s.getSalaryMonth() + "]月薪:</br>");
			for (Map<String, Object> m : existPractis) {
				sb.append(m.get("SALARY_SERIAL")).append("-").append(m.get("PRACTI_NAME")).append("|");
			}
			sb.deleteCharAt(sb.length() - 1);
			throw new BusinessException(sb.toString());
		}
		salaryDao.updatePractiReward(s);
		BigDecimal salaryAmmount = BigDecimal.ZERO;
		for (SalaryPracti sp : s.getSalaryPractiSet()) {
			salaryAmmount = salaryAmmount.add(sp.getSummaryAmount());
		}
		s.setSalaryAmount(salaryAmmount);

		// 企业帐户余额-付款
		if (s.getEntAccountId() != null) {
			CorpAccount account = corpAccountDao.get(s.getEntAccountId());
			if (account != null) {
				account.setBalance(account.getBalance().subtract(s.getSalaryAmount()));
				corpAccountDao.save(account);
			}
		}
		// 薪资审批通过,发送消息
		List<Map<String,Object>> list = salaryDao.queryByScript("remaind.salary_approve", s.getSalaryId());
		for(Map<String,Object> map:list){
			BusinessMessage bm = new BusinessMessage();
			bm.setReceiveTel((String)map.get("REMAIND_TEL"));
			bm.setMessage((String)map.get("MESSAGE"));
			bm.setSenderName("薪资消息");
			businessMessageService.sendOnce(bm);
		}
		salaryDao.save(s);
	}

	public Map<Long, SalaryPracti> loadPreMonthSalary(String salaryMonth) {
		List<SalaryPracti> sps = salaryPractiDao.queryMonthSalary(salaryMonth);
		Map<Long, SalaryPracti> spm = new HashMap<Long, SalaryPracti>();
		for (SalaryPracti sp : sps) {
			spm.put(sp.getPractiId(), sp);
		}
		return spm;
	}

	public List<Map<String, Object>> findPractiSalaryByMonth(String salaryMonth) {
		salaryMonth = salaryMonth.replaceAll("[^0-9]", "");
		return salaryPractiDao.findPractiSalaryByMonth(salaryMonth);
	}
}
