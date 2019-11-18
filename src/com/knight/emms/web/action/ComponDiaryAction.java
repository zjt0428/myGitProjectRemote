/**
 *====================================================
 * 文件名称: ComponDiaryAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.lang.StringUtils;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.ComponDiary;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.EquipInstall;
import com.knight.emms.service.ComponDiaryService;
import com.knight.emms.service.EquipFlowService;
import com.knight.emms.service.EquipInstallService;

/**
 * @ClassName: ComponDiaryAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-20 上午8:11:19
 */
public class ComponDiaryAction extends ExportBaseAction<ComponDiary> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private ComponDiary componDiary;

	@Setter
	@Getter
	private Long componDiaryId;

	@Resource
	private ComponDiaryService componDiaryService;

	@Resource
	private EquipFlowService equipFlowService;

	@Resource
	private EquipInstallService equipInstallService;

	public String noRepetList() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<ComponDiary> list = componDiaryService.queryTranslateAll(filter);
		//List<ComponDiary> list = componDiaryService.findBysql("from ComponDiary");
		List removalList =new ArrayList();
		Set set = new HashSet();
		String s = "";
		for(int i=0;i<list.size();i++){
			ComponDiary compon = list.get(i);
			if(set.add(compon.getComponId())){
				removalList.add(compon);
				s+=(compon.getComponId())+"--";
			}else{
				for (int j = 0; j < removalList.size(); j++) {
					ComponDiary removalCompon = (ComponDiary) removalList.get(j);
					if(removalCompon.getComponId().equals(compon.getComponId())){
						removalList.remove(j);
						removalCompon.setCounts(compon.getCounts()+removalCompon.getCounts());
						removalList.add(removalCompon);

						break;
					}
				}
			}
		}
		System.out.println(s);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(removalList));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<ComponDiary> list = componDiaryService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	@ActionLog(description = "删除零配件计划信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			ComponDiary c = componDiaryService.get(new Long(id));
			if (Constant.DISENABLED.equals(c.getActive())) {
				componDiaryService.remove(c);
			}
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除已调配零配件")
	public String fulfil() {
		componDiaryService.fulfil(componDiaryId);
		return SUCCESS;
	}

	public String jacking() {
		String[] ids = getRequest().getParameterValues("ids");
		String teams = getRequest().getParameter("teams");
		String practiId = getRequest().getParameter("practiId");
		String practiName = getRequest().getParameter("practiName");
		Integer jackingCounts = Integer.parseInt(getRequest().getParameter("jackingCounts"));
		Date jackingDate = DateUtil.parseDate(getRequest().getParameter("jackingDate"));
		if (jackingDate == null || StringUtils.isBlank(teams) || StringUtils.isBlank(practiId) || StringUtils.isBlank(practiName)) {
			throw new BusinessException("顶升人员信息不允许为空");
		}
		for (String id : ids) {
			ComponDiary c = componDiaryService.get(new Long(id));
			EquipFlow equipFlow = equipFlowService.get(c.getFlowId());
			if (equipFlow == null) {
				throw new BusinessException("数据不完整,查询失败");
			}
			String flowState = equipFlow.getFlowState();
			if (!(Status.EquipFlow.dismantled.equals(flowState) || Status.EquipFlow.employed.equals(flowState) || Status.EquipFlow.installed.equals(flowState))) {
				throw new BusinessException("请等待流程审核通过");
			}
			if (c.getJackingCounts() < c.getCounts()) {
				c.setJackingStauts(Status.JackingStauts.jacking);
				c.setJackingTeams(teams);
				c.setJackingPractiId(new Long(practiId));
				c.setJackingPractiName(practiName);
				c.setJackingDate(jackingDate);
				c.setJackingCounts(c.getJackingCounts() + jackingCounts);
				if (c.getJackingCounts() > c.getCounts()) {
					c.setJackingCounts(c.getCounts());
				}
				componDiaryService.save(c);
			}
			EquipInstall install = equipFlow.getEquipInstall();
			if ("1" == c.getKnotFlag()) {
				install.setKnotCounts(install.getKnotCounts() + jackingCounts);
				equipInstallService.update(install);
			}
		}
		return SUCCESS;
	}

	public String dismantle() {
		String[] ids = getRequest().getParameterValues("ids");
		String teams = getRequest().getParameter("teams");
		String practiId = getRequest().getParameter("practiId");
		String practiName = getRequest().getParameter("practiName");
		Integer dismantleCounts = Integer.parseInt(getRequest().getParameter("dismantleCounts"));
		Date dismantleDate = DateUtil.parseDate(getRequest().getParameter("dismantleDate"));
		if (dismantleDate == null || StringUtils.isBlank(teams) || StringUtils.isBlank(practiId) || StringUtils.isBlank(practiName)) {
			throw new BusinessException("顶升人员信息不允许为空");
		}
		for (String id : ids) {
			ComponDiary c = componDiaryService.get(new Long(id));
			EquipFlow equipFlow = equipFlowService.get(c.getFlowId());
			if (equipFlow == null) {
				throw new BusinessException("数据不完整,查询失败");
			}
			String flowState = equipFlow.getFlowState();
			if (!(Status.EquipFlow.dismantled.equals(flowState))) {
				throw new BusinessException("请等待流程审核通过");
			}
			if (c.getDismantleCounts() < c.getCounts()) {
				c.setDismantleStauts(Status.DismantleStauts.dismantle);
				c.setDismantleTeams(teams);
				c.setDismantlePractiId(new Long(practiId));
				c.setDismantlePractiName(practiName);
				c.setDismantleDate(dismantleDate);
				c.setDismantleCounts(c.getDismantleCounts() + dismantleCounts);
				if (c.getDismantleCounts() > c.getCounts()) {
					c.setDismantleCounts(c.getCounts());
				}
				componDiaryService.save(c);
			}
		}
		return SUCCESS;
	}
}
