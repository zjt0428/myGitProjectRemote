/**
 *====================================================
 * 文件名称: CorpInfoAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-4			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.lang.xwork.StringUtils;

import com.knight.core.Constants;
import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.CorpAccount;
import com.knight.emms.model.CorpInfo;
import com.knight.emms.service.CorpInfoService;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;
import com.knight.system.model.CodeInfo;
import com.knight.system.model.Department;
import com.knight.system.service.CodeService;
import com.knight.system.service.DepartmentService;

/**
 * @ClassName: CorpInfoAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-4 上午11:07:05
 */
public class CorpInfoAction extends ExportBaseAction<CorpInfo> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private CorpInfo corpInfo;

	@Setter
	@Getter
	private Long corpId;

	@Resource
	private CorpInfoService corpInfoService;

	@Resource
	private CodeService codeService;
	
	@Resource
	private DepartmentService departmentService;
	
	private String getRegAddressCode(CorpInfo corpInfo) {
		CodeInfo provinceCode = codeService.getCodeInfoMap("province").get(corpInfo.getProvince());
		CodeInfo cityCode = codeService.getCodeInfoMap("city").get(corpInfo.getCity());
		CodeInfo countyCode = codeService.getCodeInfoMap("county").get(corpInfo.getCounty());
		String a = provinceCode.getAliasValue();
		String b = cityCode.getAliasValue();
		String c = countyCode.getAliasValue();
		if (StringUtils.isBlank(a)) {
			throw new BusinessException(provinceCode.getValue() + "省简称未定义,备案编号规则引用失败!");
		}
		if (StringUtils.isBlank(b)) {
			throw new BusinessException(cityCode.getValue() + "-市简称未定义,备案编号规则引用失败!");
		}
		if (StringUtils.isBlank(b)) {
			throw new BusinessException(countyCode.getValue() + "-区县简称未定义,备案编号规则引用失败!");
		}
		return a + b + c;
	}

	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		if (value instanceof Department) {
			return ((Department) value).getDepName();
		}
		return null;
	}

	public String list() {
		List<CorpInfo> list = new ArrayList<CorpInfo>();
		QueryFilter filter = new QueryFilter(getRequest());
		AppUser curUser = ApplicationContainer.getCurrentUser();
		if(curUser.getDepartment().getDepType().equals(Constants.DEP_LABOUR)) {
			String depSerial = curUser.getDepartment().getDepSerial().substring(0, 4);
			filter.addConjunctFilter("Q_department.depSerial_S_LK", depSerial);
			list = corpInfoService.queryTranslateAll(filter);
		}else {
			list = corpInfoService.queryTranslateAll(filter);
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String listAccount() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<CorpAccount> list = corpInfoService.queryAccountAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		CorpInfo c = corpInfoService.getTranslateFull(corpId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存企业档案信息")
	public String save() {
		if (StringUtils.isNotBlank(corpInfo.getCorpType())) {
			corpInfo.setCorpType(corpInfo.getCorpType().replaceAll(", ", ","));
			corpInfo.setRegAddress(getRegAddressCode(corpInfo));
		}
		if (corpInfo.getCorpId() == null) {
			if (ApplicationContainer.getCurrentUser().getDepartment() == null) {
				throw new BusinessException("操作用户无相关部门信息,无法添加企业!");
			}
			corpInfo.setCorpStatus(Status.Archives.enabled);
			corpInfo.setDelFlag(Constant.ENABLED);
			corpInfoService.save(corpInfo);
			setFileAttach(corpInfo.getCorpId());
		} else {
			CorpInfo c = corpInfoService.get(corpInfo.getCorpId());
			corpInfo.setCorpStatus(c.getCorpStatus());
			corpInfo.setCertId(c.getCertId());
			corpInfo.setPractitionerSet(c.getPractitionerSet());
			corpInfo.setDelFlag(c.getDelFlag());
			if (StringUtils.isBlank(corpInfo.getCorpName())) {
				corpInfo.setCorpName(c.getCorpName());
			}
		}
		corpInfo.setSubCorpInfo();
		corpInfoService.merge(corpInfo);
		return SUCCESS;
	}

	@ActionLog(description = "删除企业帐户信息")
	public String multiDelAccount() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			corpInfoService.deletedAccount(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除企业档案信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			CorpInfo c = corpInfoService.get(new Long(id));
			c.setCorpStatus(Status.Archives.cancel);
			c.setDelFlag(Constant.DISENABLED);
			corpInfoService.save(c);
		}
		return SUCCESS;
	}

	@ActionLog(description = "注销企业档案信息")
	public String multiCancel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			CorpInfo c = corpInfoService.get(new Long(id));
			c.setCorpStatus(Status.Archives.cancel);
			corpInfoService.save(c);
		}
		return SUCCESS;
	}

	@ActionLog(description = "恢复企业档案信息")
	public String recover() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			CorpInfo c = corpInfoService.get(new Long(id));
			c.setCorpStatus(Status.Archives.enabled);
			corpInfoService.save(c);
		}
		return SUCCESS;
	}

}
