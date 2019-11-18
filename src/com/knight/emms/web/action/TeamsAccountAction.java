/**
 *====================================================
 * 文件名称: TeamsAccountAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年3月31日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.TeamsAccount;
import com.knight.emms.service.TeamsAccountService;
import com.knight.emms.support.EmmsApplicationSupport;

/**
 * @ClassName: TeamsAccountAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年3月31日 上午12:22:33
 */
public class TeamsAccountAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private TeamsAccount teamsAccount;

	@Setter
	@Getter
	private Long teamsAccountId;

	@Resource
	private TeamsAccountService teamsAccountService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<TeamsAccount> list = teamsAccountService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		TeamsAccount c = teamsAccountService.getTranslateAll(teamsAccountId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String presave() {
		Object[] params = new Object[] { teamsAccount.getPractiId(), teamsAccount.getProjectId(), teamsAccount.getTeams(), DateUtil.changeDateToStr(teamsAccount.getAccountStartDate(), DateUtil.LINK_DISPLAY_DATE), DateUtil.changeDateToStr(teamsAccount.getAccountEndDate(), DateUtil.LINK_DISPLAY_DATE) };
		List<Map<String, Object>> teamsAccountKnotList = teamsAccountService.queryByScript("teamsaccount.unsettle_knot_diary", params);
		for (Map<String, Object> data : teamsAccountKnotList) {
			data.put("measurement", "节");
			data.put("accountPrice", teamsAccount.getKnotPrice());
			data.put("quantity", data.get("counts"));
		}
		teamsAccount.setTeamsAccountKnotList(teamsAccountKnotList);
		List<Map<String, Object>> teamsAccountWallList = teamsAccountService.queryByScript("teamsaccount.unsettle_wall_diary", params);
		for (Map<String, Object> data : teamsAccountWallList) {
			data.put("measurement", "道");
			data.put("accountPrice", teamsAccount.getWallAttachePrice());
		}
		teamsAccount.setTeamsAccountWallList(teamsAccountWallList);
		params = new Object[] { teamsAccount.getPractiId(), teamsAccount.getProjectId(), teamsAccount.getTeams() };
		List<Map<String, Object>> teamsAccountAutocraneList = teamsAccountService.queryByScript("teamsaccount.unsettle_autocrane_diary", params);
		for (Map<String, Object> data : teamsAccountAutocraneList) {
			data.put("measurement", "台");
		}
		teamsAccount.setTeamsAccountAutocraneList(teamsAccountAutocraneList);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(teamsAccount, DateUtil.LINK_DISPLAY_DATE, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新班组核算")
	public String save() {
		teamsAccount.setAutocraneAmount(BigDecimal.ZERO);
		teamsAccount.setLgisticsAmount(BigDecimal.ZERO);
		if (teamsAccount.getTeamsAccountId() == null) {
			teamsAccount.setFundStatus(Status.Fund.payment);
			teamsAccount.setFinishedAmount(BigDecimal.ZERO);
			teamsAccount.setEffective(Constant.DISENABLED);
		} else {
			TeamsAccount p = teamsAccountService.get(teamsAccount.getTeamsAccountId());
			if (!Constant.DISENABLED.equals(p.getEffective())) {
				throw new BusinessException("核算单已经生效,无法修改!");
			}
			teamsAccount.setFinishedAmount(p.getFinishedAmount());
			teamsAccount.setFundStatus(p.getFundStatus());
			teamsAccount.setEffective(p.getEffective());
		}
		teamsAccountService.saveOrMergeEdit(teamsAccount);
		return SUCCESS;
	}

	@ActionLog(description = "删除核算物流信息")
	public String multiDelLogistics() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			teamsAccountService.deleteLogistics(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除其他信息")
	public String multiDelOther() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			teamsAccountService.deleteOther(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除核算人员信息")
	public String multiDelPracti() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			teamsAccountService.deletePracti(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除结算信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			TeamsAccount p = teamsAccountService.get(new Long(id));
			if (Constant.DISENABLED.equals(p.getEffective())) {
				teamsAccountService.delete(p);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "班组核算生效")
	public String multiEffective() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			TeamsAccount p = teamsAccountService.get(new Long(id));
			if (Constant.DISENABLED.equals(p.getEffective())) {
				p.setEffective(Constant.ENABLED);
				teamsAccountService.save(p);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "打印结算信息")
	public String print() {
		teamsAccount = teamsAccountService.getTranslateFull(teamsAccountId);
		getRequest().setAttribute("corpInfo", EmmsApplicationSupport.getAppuserCorpInfo());
		return getRequest().getParameter("formpage");
	}

}
