/**
 *====================================================
 * 文件名称: RentContractAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月11日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.BigDecimalUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.AmountPayment;
import com.knight.emms.model.CorpInfo;
import com.knight.emms.model.Customer;
import com.knight.emms.model.RentComponBrief;
import com.knight.emms.model.RentContract;
import com.knight.emms.model.RentDeductBrief;
import com.knight.emms.model.RentEquipBrief;
import com.knight.emms.model.RentItemBrief;
import com.knight.emms.model.Supplier;
import com.knight.emms.service.CorpInfoService;
import com.knight.emms.service.CustomerService;
import com.knight.emms.service.RentContractService;
import com.knight.emms.service.SupplierService;
import com.knight.emms.web.model.RentSpecificItem;

/**
 * @ClassName: RentContractAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月11日 下午11:33:46
 */
public class RentContractAction extends ExportBaseAction<RentContract> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private RentContract rentContract;

	@Setter
	@Getter
	private Long rentId;

	@Resource
	private RentContractService rentContractService;
	
	@Resource
	private CorpInfoService corpInfoService;

	@Resource
	private CustomerService customerService;
	
	@Resource
	private SupplierService supplierService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<RentContract> list = rentContractService.queryTranslateAll(filter);
		for (RentContract c : list) {
			c.setArrearsAmount(c.getPaymentAmount().subtract(c.getFinishedAmount()));
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		RentContract c = rentContractService.getTranslateAll(rentId);
		c.getRentComponBriefSet();
		c.getRentEquipBriefSet();
		c.getRentDeductBriefSet();
		c.getRentItemBriefSet();
		c.setArrearsAmount(c.getRentAmount().subtract(c.getFinishedAmount()));
		List<Map<String, Object>> paymentRecord = rentContractService.queryByScript("contract.get_PaymentRecord", rentId);
		for (Map<String, Object> data : paymentRecord) {
			AmountPayment ap = new AmountPayment();
			ap.setPaymentAmount((BigDecimal) data.get("PAYMENT_AMOUNT"));
			ap.setPaymentDate((String) data.get("PAYMENT_DATE"));
			ap.setPractiName((String) data.get("PRACTI_NAME"));
			c.getAmountPaymentSet().add(ap);
		}
		
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新结算信息")
	public String save() {
		if (rentContract.getRentId() == null) {
			rentContract.setFundStatus(Status.Fund.payment);
			rentContract.setFinishedAmount(BigDecimal.ZERO);
			rentContract.setEffective(Constant.DISENABLED);
			super.isCreateFileAttach = true;
		} else {
			RentContract p = rentContractService.get(rentContract.getRentId());
			if (!Constant.DISENABLED.equals(p.getEffective())) {
				throw new BusinessException("结算单已经打印,无法修改!");
			}
			rentContract.setFinishedAmount(p.getFinishedAmount());
			rentContract.setRentSerial(p.getRentSerial());
			rentContract.setFundStatus(p.getFundStatus());
			rentContract.setEffective(p.getEffective());
		}
		rentContractService.saveOrMergeEdit(rentContract);
		createFileAttach(rentContract.getRentId());
		return SUCCESS;
	}

	@ActionLog(description = "删除结算设备信息")
	public String multiDelEquipBrief() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			rentContractService.deleteEquipBrief(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除结算零配件信息")
	public String multiDelComponBrief() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			rentContractService.deleteComponBrief(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除结算其他费用信息")
	public String multiDelItemBrief() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			rentContractService.deleteItemBrief(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除结算其他费用信息")
	public String multiDelDeductBrief() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			rentContractService.deleteDeductBrief(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除结算信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			rentContractService.remove(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "结算生效")
	public String multiEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			RentContract p = rentContractService.get(new Long(id));
			if (Constant.DISENABLED.equals(p.getEffective())) {
				rentContractService.effective(p);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "结算失效")
	public String multiLoseEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			RentContract p = rentContractService.get(new Long(id));
			if (Constant.ENABLED.equals(p.getEffective())) {
				rentContractService.loseEffective(p);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "打印结算信息")
	public String print() {
		rentContract = rentContractService.getTranslateAll(rentId);
		Map<String, RentSpecificItem> rentSpecificItemMap = new HashMap<String, RentSpecificItem>();
		BigDecimal paymentAmount = BigDecimal.ZERO;
		for (RentEquipBrief brief : rentContract.getRentEquipBriefSet()) {
			paymentAmount = paymentAmount.add(brief.getSummary());
			RentSpecificItem item = null;
			if (rentSpecificItemMap.containsKey(brief.getSpecificKey())) {
				item = rentSpecificItemMap.get(brief.getSpecificKey());
			} else {
				item = new RentSpecificItem();
				rentSpecificItemMap.put(brief.getSpecificKey(), item);
			}
			item.addRentEquipBrief(brief);
		}
		for (RentComponBrief brief : rentContract.getRentComponBriefSet()) {
			paymentAmount = paymentAmount.add(brief.getSummary());
			RentSpecificItem item = null;
			if (rentSpecificItemMap.containsKey(brief.getSpecificKey())) {
				item = rentSpecificItemMap.get(brief.getSpecificKey());
			} else {
				item = new RentSpecificItem();
				rentSpecificItemMap.put(brief.getSpecificKey(), item);
			}
			item.addRentComponBrief(brief);
		}
		getRequest().setAttribute("rentSpecificItems", rentSpecificItemMap.values());

		BigDecimal itemAmount = BigDecimal.ZERO;
		BigDecimal itemDeductAmount = BigDecimal.ZERO;
		for (RentItemBrief brief : rentContract.getRentItemBriefSet()) {
			paymentAmount = paymentAmount.add(brief.getSummary());
			itemAmount = itemAmount.add(brief.getSummary());
			itemDeductAmount = itemDeductAmount.add(brief.getDeductRent());
		}
		getRequest().setAttribute("itemAmount", itemAmount);
		getRequest().setAttribute("itemDeductAmount", itemDeductAmount);
		getRequest().setAttribute("paymentAmount", paymentAmount);

		BigDecimal totalAmount = BigDecimal.ZERO.add(paymentAmount);
		BigDecimal deductAmount = BigDecimal.ZERO;
		for (RentDeductBrief brief : rentContract.getRentDeductBriefSet()) {
			deductAmount = deductAmount.add(brief.getSummary());
			totalAmount = totalAmount.subtract(brief.getSummary());
		}
		getRequest().setAttribute("deductAmount", deductAmount);
		getRequest().setAttribute("totalAmount", totalAmount);
		getRequest().setAttribute("totalAmountIdeograph", BigDecimalUtil.parserDigAmount(totalAmount));
		return getRequest().getParameter("formpage");
	}

}
