/**
 *====================================================
 * 文件名称: EquipDetectAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-14			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.math.BigDecimal;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.ExclusionStrategyConstant;
import com.knight.emms.model.CorpInfo;
import com.knight.emms.model.EquipDetect;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.Practitioner;
import com.knight.emms.service.EquipDetectService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: EquipDetectAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-14 下午1:19:35
 */
public class EquipDetectAction extends ExportBaseAction<EquipDetect> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private EquipDetect equipDetect;

	@Getter
	@Setter
	private Long detectId;

	@Resource
	private EquipDetectService equipDetectService;

	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		switch (headerIndex) {
		case 1:
			return ((EquipFlow) value).getEquipDiary().getBuildingNum();
		case 2:
			return ((EquipFlow) value).getEquipDiary().getProjectName();
		case 3:
			return ((EquipFlow) value).getEquipDiary().getRecordId();
		case 6:
			return ((EquipDetect) model).getDetectAmount().setScale(2, BigDecimal.ROUND_HALF_UP).toString();
		case 7:
			return ((EquipDetect) model).getBalanceAmount().setScale(2, BigDecimal.ROUND_HALF_UP).toString();
		case 8:
			return ((EquipDetect) model).getPaymentAmount().setScale(2, BigDecimal.ROUND_HALF_UP).toString();
		case 9:
			return ((EquipFlow) value).getEquipDiary().getExwSerial();
		case 10:
			return CodeServiceImpl.fastValue("equipGeneric", ((EquipFlow) value).getEquipDiary().getEquipGeneric());
		case 11:
			return ((EquipFlow) value).getEquipDiary().getAddress();
		default:
			return null;
		}
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<EquipDetect> list = equipDetectService.queryTranslateAllFull(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, ExclusionStrategyConstant.equipFlowDiaryStrategy));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		EquipDetect p = equipDetectService.getTranslateFull(detectId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(p, GsonUtil.SINCE_VERSION_20, false, ExclusionStrategyConstant.equipFlowDiaryStrategy));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新检测信息")
	public String save() {
		if (equipDetect.getDetectId() == null) {
			equipDetect.setDelFlag(Constant.ENABLED);
			equipDetect.setPaymentAmount(BigDecimal.ZERO);
			equipDetect.setBalanceAmount(equipDetect.getDetectAmount().subtract(equipDetect.getPaymentAmount()));
			super.isCreateFileAttach = true;
		} else {
			EquipDetect p = equipDetectService.get(equipDetect.getDetectId());
			equipDetect.setPaymentAmount(p.getPaymentAmount());
			equipDetect.setBalanceAmount(equipDetect.getDetectAmount().subtract(equipDetect.getPaymentAmount()));
			equipDetect.setDetectSerial(p.getDetectSerial());
			equipDetect.setEquipFlow(p.getEquipFlow());
			equipDetect.setDelFlag(p.getDelFlag());
		}
		equipDetectService.saveOrUpdate(equipDetect);
		createFileAttach(this.equipDetect.getDetectId());
		return SUCCESS;
	}

	@ActionLog(description = "删除检测信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			equipDetectService.remove(new Long(id));
		}
		return SUCCESS;
	}

	public String print() {
		String formpage = getRequest().getParameter("formpage");
		equipDetect = equipDetectService.getTranslateFull(detectId);
		CorpInfo corpInfo = null;
		try {
			Practitioner practitioner = (Practitioner) ApplicationContainer.getCurrentUser().getAppUserExtends().get("PRACTITIONER");
			corpInfo = practitioner.getCorpInfo();
		} catch (Exception e) {
		}
		getRequest().setAttribute("currentCorpInfo", corpInfo);
		String verifyType = equipDetect.getEquipFlow().getEquipDiary().getVerifyType();
		if ("T".equals(verifyType)) {
			formpage += "TowerCrane";
		} else {
			formpage += "Lift";
		}
		return formpage;
	}

}
