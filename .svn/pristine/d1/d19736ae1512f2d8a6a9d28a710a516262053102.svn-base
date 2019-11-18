package com.knight.emms.terminal.action;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import com.knight.app.model.TFlowCopyChkman;
import com.knight.app.model.TFlowDefine;
import com.knight.app.model.TFlowInstance;
import com.knight.app.model.TFlowInstanceProcess;
import com.knight.app.model.TFlowNode;
import com.knight.app.service.TFlowCopyChkmanService;
import com.knight.app.service.TFlowDefineService;
import com.knight.app.service.TFlowInstanceProcessService;
import com.knight.app.service.TFlowInstanceService;
import com.knight.app.service.TFlowNodeService;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.terminal.Query;
import com.knight.emms.terminal.Tequest;
import com.knight.emms.terminal.TerminalBaseAction;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.CodeInfo;
import com.knight.system.service.CodeService;

public class AppFlowAction extends TerminalBaseAction {

	SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");

	@Resource
	private TFlowInstanceService flowInsService;

	@Resource
	private TFlowCopyChkmanService copyChkManService;

	@Resource
	private TFlowInstanceProcessService procService;

	@Resource
	private TFlowDefineService defineService;

	@Resource
	private TFlowNodeService nodeService;
	@Resource
	private CodeService codeService;

	@ActionLog(description = "保存流程申请")
	public String apply() {
		boolean bl = true;
		Tequest tequest = getTerminalMessage();

		if (tequest.getUserId() == null || tequest.getUserId() == 0) {
			bl = false;
		} else if (tequest.getApplyDt() == null) {
			bl = false;
		} else if (tequest.getContent() == null || "".equals(tequest.getContent())) {
			bl = false;
		} else if (tequest.getFlowType() == null || "".equals(tequest.getFlowType())) {
			bl = false;
		} else if (tequest.getFlowId() == null) {
			bl = false;
		} else if (tequest.getFlowName() == null || "".equals(tequest.getFlowName())) {
			bl = false;
		}
		if (bl == false) {
			setJsonString("{\"success\":false, \"msg\":\"上传数据有错。\"}");
			return SUCCESS;
		}
		TFlowInstance ins = new TFlowInstance();
		ins.setUserid(tequest.getUserId());
		ins.setStartinDate(tequest.getStartinDate());
		ins.setEndinDate(tequest.getEndinDate());
		ins.setApplyDt(tequest.getApplyDt());
		ins.setContent(tequest.getContent());
		ins.setFlowId(tequest.getFlowId());
		ins.setFlowType(tequest.getFlowType());
		ins.setFlowName(tequest.getFlowName());
		ins.setFileAttaches(tequest.getFileAttaches());
		if (tequest.getChkUserId() == null) {
			ins.setState("0");
			ins.setChkUserid(null);
			ins.setSeq(new Long(0));
		} else {
			ins.setChkUserid(tequest.getChkUserId());
			ins.setHasView("0");
			ins.setSeq(new Long(1));
			ins.setState("1");
		}
		ins.setDays(tequest.getDays());
		flowInsService.save(ins);
		if (tequest.getCopyUserIds() != null && !"".equals(tequest.getCopyUserIds())) {
			String[] ccuserId = tequest.getCopyUserIds().split(",");
			for (int i = 0; i < ccuserId.length; i++) {
				TFlowCopyChkman copy = new TFlowCopyChkman();
				copy.setInsid(ins.getInsid());
				copy.setUserId(Long.parseLong(ccuserId[i]));
				copy.setHasView("0");
				copyChkManService.save(copy);
			}
		}
		String msg = GsonUtil.toJson(ins, true, DateUtil.LINK_DISPLAY_DATE, false);
		send("您有一条流程名称为：" + ins.getFlowName() + "的待审批信息,申请人为：" + ApplicationContainer.getCurrentUser().getUsername(),
				msg, String.valueOf(ins.getChkUserid()), "APPLYFLOW");
		System.out.println("审批信息：" + msg);
		setJsonString("{\"success\":true,\"msg\":\"操作成功。\",\"insid\":" + ins.getInsid() + "}");
		return SUCCESS;
	}

	@ActionLog(description = "保存流程申请")
	public String approve() {
		boolean bl = true;
		Tequest tequest = getTerminalMessage();
		if (tequest.getChkUserId() == null) {
			bl = false;
		} else if (tequest.getChkDate() == null) {
			bl = false;
		} else if (tequest.getChkResult() == null || tequest.getChkResult().equals("")) {
			bl = false;
		} else if (tequest.getChkOpinion() == null || tequest.getChkOpinion().equals("")) {
			bl = false;
		} else if (tequest.getInsId() == null) {
			bl = false;
		} else if (tequest.getSeq() == null) {
			bl = false;
		}
		if (bl == false) {
			setJsonString("{\"success\":false, \"msg\":\"上传数据有错。\"}");
			return SUCCESS;
		}
		TFlowInstanceProcess proc = new TFlowInstanceProcess();
		proc.setInsid(tequest.getInsId());
		proc.setChkDate(tequest.getChkDate());
		proc.setChkOpinion(tequest.getChkOpinion());
		proc.setChkResult(tequest.getChkResult());
		proc.setChkUserid(tequest.getChkUserId());
		proc.setNodeid(tequest.getSeq());
		procService.save(proc);
		System.out.println(tequest.getNextChkUserId() + "this is pass." + tequest.getChkResult());
		TFlowInstance ins = new TFlowInstance();
		ins = flowInsService.get(tequest.getInsId());
		if (tequest.getNextChkUserId() == null) {
			ins.setState("3");
			ins.setChkUserid(null);
			ins.setSeq(null);
		} else {
			if ("2".equals(tequest.getChkResult())) {
				ins.setState("5");
				ins.setChkUserid(tequest.getNextChkUserId());
				ins.setSeq(tequest.getNextSeq());
			} else {
				ins.setChkUserid(tequest.getNextChkUserId());
				ins.setSeq(tequest.getNextSeq());
				ins.setHasView("0");
			}
		}
		flowInsService.update(ins);
		if (tequest.getCopyUserIds() != null && !"".equals(tequest.getCopyUserIds())) {
			String[] ccuserId = tequest.getCopyUserIds().split(",");
			for (int i = 0; i < ccuserId.length; i++) {
				TFlowCopyChkman copy = new TFlowCopyChkman();
				copy.setInsid(ins.getInsid());
				copy.setUserId(Long.parseLong(ccuserId[i]));
				copyChkManService.save(copy);
			}
		}
		setJsonString("{\"success\":true, \"msg\":\"操作成功。\"}");
		return SUCCESS;
	}

	public String query() {
		Query query = getTerminalMessage().getQuery();
		String flowName = "";
		if (query != null) {
			flowName = query.getFlowName();
		}
		QueryFilter filter = new QueryFilter();
		if (flowName != null && !"".equals(flowName)) {
			filter.addConjunctFilter("Q_flowName_S_LK", flowName);
		}
		filter.addConjunctFilter("Q_delFlag_N_EQ", "1");
		List<TFlowDefine> list = defineService.queryTranslateAll(filter);

		successResponse(GsonUtil.toJson(list, true, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	public String queryChkMan() {
		Query query = getTerminalMessage().getQuery();
		QueryFilter filter = new QueryFilter();
		Long flowId = query.getFlowId();
		Long seq = query.getSeq();
		String userName = query.getUserName();
		if (userName == null || userName.equals("null")) {
			userName = "";
		}
		System.out.println("##queryChkMan##  flowId=" + flowId + "   seq = " + seq + "  userName=" + userName);
		if (flowId == null) {
			setJsonString("{\"success\":false, \"msg\":\"上传数据有错。\"}");
			return SUCCESS;
		} else if (seq == null) {
			setJsonString("{\"success\":false, \"msg\":\"上传数据有错。\"}");
			return SUCCESS;
		}
		filter.addConjunctFilter("Q_flowId_L_EQ", String.valueOf(flowId));
		filter.addConjunctFilter("Q_seq_L_EQ", String.valueOf(seq));
		List<TFlowNode> list = nodeService.queryTranslateAll(filter);
		List<Map<String, Object>> chkManList = null;
		if (list != null && list.size() > 0) {
			TFlowNode flowNodes = list.get(0);
			chkManList = flowInsService.queryByScript("terminal.list_chk_man", "%" + userName + "%", flowNodes.getChkRoleid());
		}
		successResponse(GsonUtil.toJson(chkManList, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	// type： 0--我的申请 1 --我的审批 2--抄送我的 3--已归档
	public String queryInstance() {
		Query query = getTerminalMessage().getQuery();
		Long type = query.getType();
		Long userId = query.getUserId();
		if (type == null) {
			setJsonString("{\"success\":false, \"msg\":\"上传数据有错。\"}");
			return SUCCESS;
		} else if (userId == null) {
			setJsonString("{\"success\":false, \"msg\":\"上传数据有错。\"}");
			return SUCCESS;
		}

		Integer startRow = query.getStart();
		if (startRow == null) {
			startRow = 0;
		}
		Integer pageSize = query.getPageSize();
		if (pageSize == null) {
			pageSize = 10;
		}

		List<TFlowInstance> list = new ArrayList<TFlowInstance>();
		QueryFilter filter = new QueryFilter();

		if (type == 1) {
			filter.addConjunctFilter("Q_userid_L_EQ", String.valueOf(userId));
			filter.addConjunctFilter("Q_state_S_NEQ", "3");
			filter.getPagingBean().setStart(startRow);
			filter.getPagingBean().setPageSize(pageSize);
			filter.addSorted("insid", "desc");
			list = flowInsService.queryTranslateAll(filter);
		} else if (type == 2) {
			List<TFlowInstance> myApprList = new ArrayList<TFlowInstance>();
			filter.addConjunctFilter("Q_chkUserid_L_EQ", String.valueOf(userId));
			filter.addConjunctFilter("Q_state_S_NEQ", "3");
			filter.addSorted("insid", "desc");
			myApprList = flowInsService.queryTranslateAll(filter);

			QueryFilter filter1 = new QueryFilter();
			filter1.addConjunctFilter("Q_chkUserid_L_EQ", String.valueOf(userId));
			filter1.addSorted("pid", "desc");
			List<TFlowInstanceProcess> prcList = procService.queryTranslateAll(filter1);
			for (TFlowInstanceProcess insProc : prcList) {
				TFlowInstance inst = insProc.getInstance();
				if (!inst.getState().equals("3")) {
					if (inst.getState().equals("1")) {
						inst.setStateName("审批中");
					}
					if (inst.getState().equals("2")) {
						inst.setStateName("审批结束");
					}
					if (inst.getState().equals("5")) {
						inst.setStateName("退回");
					}
					myApprList.add(inst);
				}
			}
			if (myApprList != null && myApprList.size() > startRow) {
				if (myApprList.size() - startRow < pageSize) {
					pageSize = myApprList.size() - startRow;
				}
				for (int i = startRow; i < pageSize + startRow; i++) {
					list.add((TFlowInstance) myApprList.get(i));
				}
			}
		} else if (type == 3) {
			filter.addConjunctFilter("Q_userId_L_EQ", String.valueOf(userId));
			filter.getPagingBean().setStart(startRow);
			filter.getPagingBean().setPageSize(pageSize);
			filter.addSorted("copid", "desc");
			List<TFlowCopyChkman> copyList = copyChkManService.queryTranslateAll(filter);
			for (TFlowCopyChkman copy : copyList) {

				TFlowInstance inst = copy.getInstance();
				if (!inst.getState().equals("3")) {
					if (inst.getState().equals("1")) {
						inst.setStateName("审批中");
					}
					if (inst.getState().equals("2")) {
						inst.setStateName("审批结束");
					}
					if (inst.getState().equals("5")) {
						inst.setStateName("退回");
					}
					if (copy.getHasView() == null || "0".equals(copy.getHasView())) {
						inst.setHasView("0");
					} else {
						inst.setHasView("1");
					}
					list.add(inst);
				}
			}
		} else if (type == 4) {
			filter.addConjunctFilter("Q_state_S_EQ", String.valueOf(3));
			filter.getPagingBean().setStart(startRow);
			filter.getPagingBean().setPageSize(pageSize);
			filter.addSorted("insid", "desc");
			list = flowInsService.queryTranslateAll(filter);
		}

		// 统计未读数
		int myApp = 0;
		int copyMe = 0;

		QueryFilter myAppfilter = new QueryFilter();
		myAppfilter.addConjunctFilter("Q_chkUserid_L_EQ", String.valueOf(userId));
		myAppfilter.addConjunctFilter("Q_hasView_S_EQ", "0");
		List<TFlowInstance> myApplist = flowInsService.queryTranslateAll(myAppfilter);
		if (myApplist != null && myApplist.size() > 0) {
			myApp = myApplist.size();
		}
		QueryFilter copyMefilter = new QueryFilter();
		copyMefilter.addConjunctFilter("Q_userId_L_EQ", String.valueOf(userId));
		copyMefilter.addConjunctFilter("Q_instance.state_S_NEQ", "3");
		copyMefilter.addConjunctFilter("Q_hasView_S_EQ", "0");
		List<TFlowCopyChkman> copyMelist = copyChkManService.queryTranslateAll(copyMefilter);
		if (copyMelist != null && copyMelist.size() > 0) {
			for (TFlowCopyChkman copy : copyMelist) {
				TFlowInstance inst = copy.getInstance();
				if (inst != null) {
					copyMe = copyMe + 1;
				}
			}
		}

		setJsonString("{\"success\":true,\"msg\":\"操作成功\",\"myAppNr\":" + myApp + ",\"copyMeNr\":" + copyMe
				+ ",\"info\":{\"result\":" + GsonUtil.toJson(list, true, DateUtil.LINK_DISPLAY_DATE, false) + "}}");
		return SUCCESS;
	}

	public String queryInsNotRead() {
		Query query = getTerminalMessage().getQuery();
		Long userId = query.getUserId();
		if (userId == null) {
			setJsonString("{\"success\":false, \"msg\":\"上传数据有错。\"}");
			return SUCCESS;
		}

		// 统计未读数
		int myApp = 0;
		int copyMe = 0;

		QueryFilter myAppfilter = new QueryFilter();
		myAppfilter.addConjunctFilter("Q_chkUserid_L_EQ", String.valueOf(userId));
		myAppfilter.addConjunctFilter("Q_hasView_S_EQ", "0");
		List<TFlowInstance> myApplist = flowInsService.queryTranslateAll(myAppfilter);
		if (myApplist != null && myApplist.size() > 0) {
			myApp = myApplist.size();
		}

		QueryFilter copyMefilter = new QueryFilter();
		copyMefilter.addConjunctFilter("Q_userId_L_EQ", String.valueOf(userId));
		copyMefilter.addConjunctFilter("Q_instance.state_S_NEQ", "3");
		copyMefilter.addConjunctFilter("Q_hasView_S_EQ", "0");
		List<TFlowCopyChkman> copyMelist = copyChkManService.queryTranslateAll(copyMefilter);
		if (copyMelist != null && copyMelist.size() > 0) {
			for (TFlowCopyChkman copy : copyMelist) {
				TFlowInstance inst = copy.getInstance();
				if (inst != null) {
					copyMe = copyMe + 1;
				}
			}
		}
		setJsonString("{\"success\":true,\"msg\":\"操作成功\",\"notRead\":" + (myApp + copyMe) + "}");
		return SUCCESS;
	}

	public String setInsHasRead() {
		Query query = getTerminalMessage().getQuery();
		Long userId = query.getUserId();
		Long insId = query.getInsId();
		Long type = query.getType();
		if (userId == null || insId == null || type == null) {
			setJsonString("{\"success\":false, \"msg\":\"上传数据有错。\"}");
			return SUCCESS;
		}
		if (type == 1) {
			TFlowInstance ins = flowInsService.get(insId);
			ins.setHasView("1");
			flowInsService.update(ins);
		} else if (type == 2) {
			QueryFilter copyMefilter = new QueryFilter();
			copyMefilter.addConjunctFilter("Q_userId_L_EQ", String.valueOf(userId));
			copyMefilter.addConjunctFilter("Q_insid_L_EQ", String.valueOf(insId));
			copyMefilter.addConjunctFilter("Q_hasView_S_EQ", "0");
			List<TFlowCopyChkman> copyList = copyChkManService.getAll(copyMefilter);
			if (copyList != null) {
				for (TFlowCopyChkman copy : copyList) {
					copy.setHasView("1");
					copyChkManService.update(copy);
				}
			}
		}
		setJsonString("{\"success\":true,\"msg\":\"操作成功\"}");
		return SUCCESS;
	}

	public String setInsFinish() {
		Query query = getTerminalMessage().getQuery();
		Long insId = query.getInsId();
		Long arcUserId = query.getArcUserId();
		String arcRemark = query.getArcRemark();
		if (insId == null) {
			setJsonString("{\"success\":false, \"msg\":\"上传数据有错。\"}");
			return SUCCESS;
		}
		TFlowInstance ins = flowInsService.get(insId);
		ins.setState("3");
		ins.setArcUserId(arcUserId);
		ins.setArcDate(new Date());
		ins.setArcRemark(arcRemark);
		flowInsService.update(ins);
		setJsonString("{\"success\":true,\"msg\":\"操作成功\"}");
		return SUCCESS;
	}

	public String queryView() {
		Query query = getTerminalMessage().getQuery();
		Long insId = query.getInsId();
		if (insId == null) {
			setJsonString("{\"success\":false, \"msg\":\"参数有误。\"}");
			return SUCCESS;
		}
		TFlowInstance instance = flowInsService.getTranslate(insId);
		if (instance.getFlowId() != null) {
			QueryFilter queryFilter = new QueryFilter();
			queryFilter.addConjunctFilter("Q_flowId_L_EQ", String.valueOf(instance.getFlowId()));
			List<TFlowNode> nodes = nodeService.queryTranslateAll(queryFilter);
			String flowDesc = "";
			Long lastSeq = new Long(0);
			for (TFlowNode node : nodes) {
				flowDesc += flowDesc.equals("") ? node.getNodeName() : "-" + node.getNodeName();
				if (node.getSeq() > lastSeq) {
					lastSeq = node.getSeq();
				}
			}
			instance.setFlowDesc(flowDesc);
			instance.setLastSeq(lastSeq);
		}
		if (instance.getInsid() != null) {
			QueryFilter queryFilter1 = new QueryFilter();
			queryFilter1.addConjunctFilter("Q_insid_L_EQ", String.valueOf(instance.getInsid()));
			List<TFlowCopyChkman> copyMan = copyChkManService.queryTranslateAll(queryFilter1);
			String cusers = "";
			for (TFlowCopyChkman fccm : copyMan) {
				cusers += cusers.equals("") ? fccm.getUserName() : "," + fccm.getUserName();
			}
			instance.setCopyUserNames(cusers);
			QueryFilter procFilter = new QueryFilter();
			procFilter.addConjunctFilter("Q_insid_L_EQ", String.valueOf(instance.getInsid()));
			List<TFlowInstanceProcess> procList = procService.queryTranslateAll(procFilter);
			Set<TFlowInstanceProcess> instanceProcessSet = new HashSet<TFlowInstanceProcess>();
			for (TFlowInstanceProcess proc : procList) {
				proc.setInstance(null);
				instanceProcessSet.add(proc);
			}
			instance.setInstanceProcessSet(instanceProcessSet);
		}
		successResponse(GsonUtil.toJson(instance, true, DateUtil.LINK_DISPLAY_DATE, false));
		return SUCCESS;
	}

	public String queryCode() {
		Query query = getTerminalMessage().getQuery();
		String codeId = query.getCodeId();
		String json = "";
		Map<String, CodeInfo> codeMap = codeService.getCodeInfoMap(codeId);
		if("INSPECT_RESULT".equals(codeId)){
			List<CodeInfo> list = new ArrayList<CodeInfo>(codeMap.values());
			Collections.sort(list, new Comparator<CodeInfo>() {
	            @Override
	            public int compare(CodeInfo h1, CodeInfo h2) {
	                return h1.getCode().compareTo(h2.getCode());
	            }
		    });
		    json = GsonUtil.toJson(list);
		}else{
			json = GsonUtil.toJson(codeMap.values());
		}
		setJsonString("{\"success\":true,\"msg\":\"操作成功\",\"info\":{\"result\":" + json + "}}");
		return SUCCESS;
	}

	/**
	 * 抄送提交
	 */
	public String copyTo() {
		boolean bl = true;
		Tequest tequest = getTerminalMessage();
		if (tequest.getCopyUserIds() == null || tequest.getCopyUserIds().equals("")) {
			bl = false;
		} else if (tequest.getInsId() == null) {
			bl = false;
		}
		if (bl == false) {
			setJsonString("{\"success\":false, \"msg\":\"参数错误，参数为空。\"}");
			return SUCCESS;
		}
		String[] ccuserId = tequest.getCopyUserIds().split(",");
		for (int i = 0; i < ccuserId.length; i++) {
			TFlowCopyChkman copy = new TFlowCopyChkman();
			copy.setInsid(tequest.getInsId());
			copy.setUserId(Long.parseLong(ccuserId[i]));
			copyChkManService.save(copy);
		}
		setJsonString("{\"success\":true, \"msg\":\"操作成功。\"}");
		return SUCCESS;
	}
}
