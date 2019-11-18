/**
 *====================================================
 * 文件名称: BorrowAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-12			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.dao.BorrowEquipDao;
import com.knight.emms.domain.MetadataService;
import com.knight.emms.model.Borrow;
import com.knight.emms.model.BorrowAcceptance;
import com.knight.emms.model.BorrowComponent;
import com.knight.emms.model.BorrowEquip;
import com.knight.emms.model.Component;
import com.knight.emms.model.Equipment;
import com.knight.emms.service.BorrowService;
import com.knight.emms.service.EquipmentService;

/**
 * @ClassName: BorrowAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-12 上午11:21:54
 */
public class BorrowAction extends ExportBaseAction<Borrow> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Borrow borrow;

	@Getter
	@Setter
	private Long borrowId;
	
	@Resource
	private BorrowEquipDao borrowEquipdao;
	
	@Resource
	private BorrowService borrowService;

	@Getter
	@Setter
	private BorrowAcceptance borrowAcceptance;

	@Resource
	private MetadataService metadataService;
	
	@Resource
	private EquipmentService equipmentService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Borrow> list = borrowService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String listComponent() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<BorrowComponent> list = borrowService.queryComponentAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String listEquip() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<BorrowEquip> list = borrowService.queryEquipAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		Borrow p = borrowService.getTranslateFull(borrowId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新借用信息")
	public String save() {
		if (borrow.getBorrowId() == null) {
			borrow.setApplyforState(Status.BorrowApplyfor.waitSubmit);
			borrow.setDelFlag(Constant.ENABLED);
		} else {
			Borrow p = borrowService.editLoad(borrow);
			borrow.setBorrowSerial(p.getBorrowSerial());
			borrow.setFundStatus(p.getFundStatus());
			borrow.setApplyforState(p.getApplyforState());
			borrow.setDelFlag(p.getDelFlag());
		}
		borrowService.saveOrMergeForEdit(borrow);
		this.jsonString = "{success:true,applyforId:" + borrow.getApplyforId() + "}";
		return SUCCESS;
	}

	@ActionLog(description = "删除借用登记零配件")
	public String multiDelComponent() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			borrowService.deletedComponent(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除借用登记设备")
	public String multiDelEquip() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			borrowService.deletedEquip(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除借用信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Borrow p = borrowService.get(new Long(id));
			p.setDelFlag(Constant.DISENABLED);
			borrowService.save(p);
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交借用信息")
	public String multiSubmit() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			Borrow p = borrowService.get(new Long(id));
			if (Status.BorrowApplyfor.waitSubmit.equals(p.getApplyforState())) {
				p.setApplyforState(Status.BorrowApplyfor.waitAccept);
				borrowService.save(p);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "提交续借申请")
	public String submitRenew() {
		String renewDate = getRequest().getParameter("renewDate");
		Borrow b = borrowService.get(borrowId);
		if (!Status.BorrowApplyfor.waitReturn.equals(b.getApplyforState())) {
			throw new BusinessException("申请状态不符合要求!");
		}
		b.setRenewDate(renewDate);
		b.setApplyforState(Status.BorrowApplyfor.waitRenewaccept);
		borrowService.save(b);
		return SUCCESS;
	}

	@ActionLog(description = "借用报损信息")
	public String damage() {
		borrowService.acceptance(borrowAcceptance, Status.BorrowAcc.damage);
		return SUCCESS;
	}

	@ActionLog(description = "借用遗失信息")
	public String lose() {
		borrowService.acceptance(borrowAcceptance, Status.BorrowAcc.lose);
		return SUCCESS;
	}

	@ActionLog(description = "提交借用归还信息")
	public String returned() {
		borrowService.acceptance(borrowAcceptance, Status.BorrowAcc.returned);
		return SUCCESS;
	}

	@ActionLog(description = "打印借用单")
	public String printForm() {
		Borrow b = borrowService.getTranslateFull(borrowId);
		b.setRemark(b.getRemark().replaceAll("\\r\\n", "</br>"));
		b.setBorrowDate(DateUtil.changeObj2DateStr(b.getBorrowDate(), DateUtil.CN_DISPLAY_DATE));
		b.setReturnDate(DateUtil.changeObj2DateStr(b.getReturnDate(), DateUtil.CN_DISPLAY_DATE));
		getRequest().setAttribute("borrow", b);
		List<Component> comps = metadataService.queryComponentByBorrow(b);
		getRequest().setAttribute("componentList", comps);
		List<Equipment> equips = metadataService.queryEquipByBorrow(b);
		getRequest().setAttribute("equipmentList", equips);
		return "printForm";
	}
}
