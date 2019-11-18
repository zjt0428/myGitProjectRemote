package com.knight.emms.web.action;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.InspectSelfChoose;
import com.knight.emms.model.InspectSelfChooseDetail;
import com.knight.emms.model.InspectSelfInit;
import com.knight.emms.model.InspectSelfInitDetail;
import com.knight.emms.service.InspectSelfChooseDetailService;
import com.knight.emms.service.InspectSelfChooseService;
import com.knight.emms.service.InspectSelfInitService;

import lombok.Getter;
import lombok.Setter;

public class InspectSelfChooseAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Setter
	@Getter
	private Long chooseId;
	
	@Setter
	@Getter
	private Long initId;
	
	@Setter
	@Getter
	private String inspectType;
	
	@Setter
	@Getter
	private InspectSelfInit inspectSelfInit;
	
	@Setter
	@Getter
	private InspectSelfChoose inspectSelfChoose;
	
	@Resource
	private InspectSelfInitService inspectSelfInitService;

	@Resource
	private InspectSelfChooseService inspectSelfChooseService;
	
	@Resource
	private InspectSelfChooseDetailService inspectSelfChooseDetailService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<InspectSelfChoose> list = inspectSelfChooseService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String save() {
		InspectSelfInit init = inspectSelfInitService.get(initId);
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_initId_L_EQ", String.valueOf(initId));
		filter.addConjunctFilter("Q_inspectType_S_EQ", inspectType);
		List<InspectSelfChoose> list = inspectSelfChooseService.getAll(filter);
		if(list.size() > 0) {
			throw new BusinessException("已存在该检查项，请勿重复添加！");
		}else {
			InspectSelfChoose choose = new InspectSelfChoose();
			choose.setInitId(init.getInitId());
			choose.setInspectType(init.getInspectType());
			choose.setInspectItem(init.getInspectItem());
			inspectSelfChooseService.save(choose);
			Set<InspectSelfInitDetail> initDetailSet = init.getInspectSelfInitDetailSet();
			Set<InspectSelfChooseDetail> chooseDetailSet = choose.getInspectSelfChooseDetailSet();
			Iterator<InspectSelfInitDetail> ii = initDetailSet.iterator();
			while(ii.hasNext()) {
				InspectSelfInitDetail d = (InspectSelfInitDetail)ii.next();
				InspectSelfChooseDetail cd = new InspectSelfChooseDetail();
				cd.setChooseId(choose.getChooseId());
				cd.setDetailContent(d.getDetailContent());
				cd.setInspectType(d.getInspectType());
				chooseDetailSet.add(cd);
				cd = null;
			}
			choose.setInspectSelfChooseDetailSet(chooseDetailSet);
			inspectSelfChooseService.merge(choose);
		}
		return SUCCESS;
	}
	
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			inspectSelfChooseService.remove(new Long(id));
		}
		return SUCCESS;
	}
	
}
