/**
 *====================================================
 * 文件名称: attendamceAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-4-20			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.app.action;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

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
import com.knight.app.service.impl.TFlowInstanceServiceImpl;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.core.web.paging.PagingBean;
import com.knight.system.service.impl.CodeServiceImpl;



/**
 * @ClassName: MemoAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-4-20 上午8:41:24
 */
public class TransApprovalAction extends ExportBaseAction<TFlowInstance>  {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private TFlowInstance tflowInstance;

	@Getter
	@Setter
	private Long insid;

	@Resource
	private TFlowInstanceService flowInsService;
	
	@Resource
	private TFlowCopyChkmanService  copyChkManService;
	
	@Resource
	private TFlowInstanceProcessService procService;
	
	@Resource
	private TFlowDefineService defineService;
	
	@Resource
	private TFlowNodeService nodeService;



	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		String type = this.getRequest().getParameter("TYPE");
		String userId = this.getRequest().getParameter("userId");
		List<TFlowInstance> list = new ArrayList<TFlowInstance>();
		if(type!=null && type.equals("1")){
			if(userId!=null && !"".equals(userId)){
				filter.addConjunctFilter("Q_userid_L_EQ", userId);
			}
			list = flowInsService.queryTranslateAll(filter);
		}else if(type!=null && type.equals("2")){
			if(userId!=null && !"".equals(userId)){
				filter.addConjunctFilter("Q_chkUserid_L_EQ", String.valueOf(userId));
			}			
			List<TFlowInstanceProcess> prcTransList = new ArrayList<TFlowInstanceProcess>() ;
			List<TFlowInstanceProcess> prcList = procService.queryTranslateAll(filter);
			for(TFlowInstanceProcess insProc : prcList){
				TFlowInstance inst = insProc.getInstance();
				CodeServiceImpl.translate(inst, flowInsService.getPersistantStruct());
				insProc.setInstance(inst);
				prcTransList.add(insProc);
			}
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
			buff.append(GsonUtil.toJson(prcTransList));
			buff.append("}");
			this.jsonString = buff.toString();
			return SUCCESS;
			
		}else if(type!=null && type.equals("3")){
			if(userId!=null && !"".equals(userId)){
				filter.addConjunctFilter("Q_userId_L_EQ", String.valueOf(userId));
			}
			List<TFlowCopyChkman> copTransList = new ArrayList<TFlowCopyChkman>() ;
			List<TFlowCopyChkman> copyList = copyChkManService.queryTranslateAll(filter);
			for(TFlowCopyChkman copy : copyList){
				TFlowInstance inst = copy.getInstance();
				CodeServiceImpl.translate(inst, flowInsService.getPersistantStruct());
				copy.setInstance(inst);
				copTransList.add(copy);
			}
			StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
			buff.append(GsonUtil.toJson(copTransList));
			buff.append("}");
			this.jsonString = buff.toString();
			return SUCCESS;
		}else if(type!=null && type.equals("4")){
			list = flowInsService.queryTranslateAll(filter);
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		TFlowInstance c = flowInsService.getTranslate(insid);
		
		if(c.getFlowId()!=null){
			QueryFilter queryFilter = new QueryFilter();
			queryFilter.addConjunctFilter("Q_flowId_L_EQ", String.valueOf(c.getFlowId()));
			List<TFlowNode> nodes = nodeService.queryTranslateAll(queryFilter);
			
			String flowDesc = "";
			Long lastSeq = new Long(0);
			for(TFlowNode node:nodes){				
				flowDesc += flowDesc.equals("") ? node.getNodeName() : "-" +node.getNodeName();
				if(node.getSeq()>lastSeq){
					lastSeq = node.getSeq();
				}
			}
			c.setFlowDesc(flowDesc);
			c.setLastSeq(lastSeq);
			
			QueryFilter queryFilter1 = new QueryFilter();
			queryFilter1.addConjunctFilter("Q_insid_L_EQ", String.valueOf(c.getFlowId()));
			List<TFlowCopyChkman> copyMan = copyChkManService.queryTranslateAll(queryFilter1);
			String cusers="";
			for(TFlowCopyChkman fccm:copyMan){
				cusers += cusers.equals("")?fccm.getUserName():","+fccm.getUserName();
			}
			c.setCopyUserNames(cusers);
			
			QueryFilter proFilter = new QueryFilter();
			proFilter.addConjunctFilter("Q_insid_L_EQ", String.valueOf(insid));		
			List<TFlowInstanceProcess> procList = procService.getAll(proFilter);
			
			Set<TFlowInstanceProcess> processSet = new HashSet<TFlowInstanceProcess>();
			for(TFlowInstanceProcess pro:procList){
				pro.setInstance(null);
				processSet.add(pro);
			}
			c.setInstanceProcessSet(processSet);			
			
		}
				
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	public String save() {
		String type = this.getRequest().getParameter("TYPE");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm");
		String curDate = format.format(new Date());
		return SUCCESS;
	}
	
	public String definelist() {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addConjunctFilter("Q_delFlag_N_EQ", "1");
		List<TFlowDefine> list = defineService.queryTranslateAll(filter);

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String loadDefine() {
		String flowId = this.getRequest().getParameter("flowId");
		TFlowDefine flowDefine = defineService.getTranslate(Long.parseLong(flowId));

		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(flowDefine, false));
		sb.append("]}");
		
		this.jsonString = sb.toString();
		return SUCCESS;
	}
}
