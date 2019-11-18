/**
 *====================================================
 * 文件名称: AnnounceUserAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-25			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal.action;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import com.knight.app.model.TAppRepair;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.paging.PagingBean;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.Announce;
import com.knight.emms.model.AnnounceCategory;
import com.knight.emms.model.AnnounceUser;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.service.AnnounceService;
import com.knight.emms.service.AnnounceUserService;
import com.knight.emms.service.BusinessMessageService;
import com.knight.emms.terminal.Tequest;
import com.knight.emms.terminal.TerminalBaseAction;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;
import com.knight.system.model.Department;
import com.knight.system.service.AppUserService;
import com.knight.system.service.DepartmentService;

/**
 * @ClassName: AnnounceUserAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-25 下午4:45:57
 */
public class AnnounceMessageAction extends TerminalBaseAction {

	private static final long serialVersionUID = 1L;

	@Resource
	private AnnounceUserService announceUserService;

	@Resource
	private BusinessMessageService businessMessageService;

	@Resource
	private AnnounceService announceService;

	@Resource
	private AppUserService appUserService;

	@Resource
	private DepartmentService departmentService;

	public String add() {
		Tequest tequest = getTerminalMessage();
		String title = tequest.getTitle();
		String type = tequest.getType() == null ? "1" : tequest.getType();
		String announce = tequest.getContent();
		Announce anc = new Announce();
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Set<AnnounceCategory> announcePractiSet =new HashSet<AnnounceCategory>(0);
		Set<AnnounceCategory> announceDepSet = new HashSet<AnnounceCategory>(0);
		 Set<AnnounceCategory> announceScopeDepSet = new HashSet<AnnounceCategory>(0);
		AnnounceCategory ac = new AnnounceCategory();

		anc.setAnnounce(announce);
		anc.setPublish(Constant.ENABLED);
		anc.setDelFlag(Constant.ENABLED);
		anc.setAnnounceType(type);
		anc.setAnnounceTitle(title);
		anc.setUserId(ApplicationContainer.getCurrentUserId());
		anc.setUserName(ApplicationContainer.getCurrentUser().getUsername());
		anc.setDepId(ApplicationContainer.getCurrentUser().getDepId());
		anc.setDepartment(ApplicationContainer.getCurrentUser().getDepartment());
		if (tequest.getUId() != null ) {
			for (int i = 0; i < tequest.getUId().split(",").length; i++) {
				Long uId = Long.valueOf(tequest.getUId().split(",")[i]);
				AppUser appUser = appUserService.get(uId);
//				anc.setUserId(uId);
//				anc.setUserName(appUser.getUsername());
				ac.setUserId(uId);
				ac.setUserName(appUser.getUsername());
				announcePractiSet.add(ac);
			}
		}
		if (tequest.getDepId() != null) {
			for (int i = 0; i < tequest.getDepId().split(",").length; i++) {
				Long depId = Long.valueOf(tequest.getDepId().split(",")[i]);
				Department depatment = departmentService.get(depId);
				ac.setDepId(depId);
				ac.setDepName(depatment.getDepName());
				announceDepSet.add(ac);
				announceScopeDepSet.add(ac);
			}
		}
		anc.setAnnouncePractiSet(announcePractiSet);
		anc.setAnnounceDepSet(announceDepSet);
		anc.setProvidedDate(df.format(new Date()));
		
//		au.setAnnounceUserId(announceUserId);
		announceService.saveOrMergeEditApp(anc);
		
		if (tequest.getUId() != null) {
			for (int i = 0; i < tequest.getUId().split(",").length; i++) {
				Long uId = Long.valueOf(tequest.getUId().split(",")[i]);
				boolean isDepment = false;
				AppUser appUser = appUserService.get(uId);
				if (tequest.getDepId() != null ) {
					for (int j = 0; j < tequest.getDepId().split(",").length; j++) {
						if(String.valueOf(appUser.getDepId()).equals(tequest.getDepId().split(",")[j])){
							isDepment = true;
						}
					}
				}
				if(!isDepment){
					AnnounceUser au = new AnnounceUser();
					au.setUserId(uId);
					au.setAnnounce(anc);
					au.setAnnounceId(anc.getAnnounceId());
					au.setPublishTime(new Date());
					au.setUserName(appUser.getUsername());
					au.setReadFlag("0");
					au.setDelFlag("1");
					announceUserService.save(au);
				}
				
			}
		}
		if (tequest.getDepId() != null ) {
			for (int i = 0; i < tequest.getDepId().split(",").length; i++) {
				Long depId = Long.valueOf(tequest.getDepId().split(",")[i]);
				QueryFilter paramQueryFilter = new QueryFilter();
				paramQueryFilter.addConjunctFilter("Q_depId_L_EQ", String.valueOf(depId));
				paramQueryFilter.addConjunctFilter("Q_delFlag_SN_EQ", "0");
				paramQueryFilter.addConjunctFilter("Q_status_SN_EQ", "1");
				List<AppUser> appUser = appUserService.queryTranslateAll(paramQueryFilter);
				for (int j =0;j<appUser.size();j++){
					AnnounceUser au = new AnnounceUser();
					au.setAnnounce(anc);
					au.setUserId(appUser.get(j).getUserId());
					au.setAnnounceId(anc.getAnnounceId());
					au.setPublishTime(new Date());
					au.setUserName(appUser.get(j).getUsername());
					au.setReadFlag("0");
					au.setDelFlag("1");
					announceUserService.save(au);
				}
			}
		}
//		if (tequest.getDepId() != null) {
//			send("您收到一条公告信息，" + "主题," + anc.getAnnounceTitle() + "内容," + anc.getAnnounce(), null, tequest.getDepId(),
//					"CONSTRUCT");
//		}
//		if (tequest.getUId() != null) {
//			send("您收到一条公告信息，" + "主题," + anc.getAnnounceTitle() + "内容," + anc.getAnnounce(), null, tequest.getUId(),
//					"CONSTRUCT");
//		}
		setJsonString("{\"success\":true, \"msg\":\"操作成功。\"}");
		return SUCCESS;
	}

	public String personal() {
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = getTerminalQueryFilter();
		String msgType = "1";
		if (tequest.getQuery().getMsgType() != null) { 
			msgType = tequest.getQuery().getMsgType();
		}
		filter.addConjunctFilter("Q_receiveTel_S_EQ", ApplicationContainer.getCurrentUser().getMobile());
		if(tequest.getQuery().getCreateTime()!=null || !tequest.getQuery().getCreateTime().equals("")){
			filter.addConjunctFilter("Q_createTime_D_GE", tequest.getQuery().getCreateTime());
		}
		if(tequest.getQuery().getReadFlag()!=null ){
			filter.addConjunctFilter("Q_readFlag_S_EQ", tequest.getQuery().getReadFlag());
		}
		filter.addConjunctFilter("Q_msgType_S_EQ", msgType);
		filter.addSorted("readFlag", "asc");
		filter.setPagingBean(new PagingBean(0, 100000));
		List<BusinessMessage> list = businessMessageService.queryTranslateAll(filter);
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}

	/* 统计未读消息数 */
	public String messageCount() {
		String key = "";
		List<Map<String, Object>> list = businessMessageService.queryByScript("terminal.message_count",
				ApplicationContainer.getCurrentUser().getMobile());
		for (Map<String, Object> data : list) {
			key = String.valueOf(data.get("COUNTS"));
		}
		StringBuffer buff = new StringBuffer("{\"success\":true,\"totalCounts\":").append(key)
				.append(",\"info\":{\"result\":");
		buff.append(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE, false));
		buff.append("}}");
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}

	public String updateMessage() {
		Tequest tequest = getTerminalMessage();
		if (tequest.getQuery().getMessageId() <= 0) {
			setJsonString("{\"success\":false, \"msg\":\"无效的消息ID\"}");
			return SUCCESS;
		}
		BusinessMessage bsm = businessMessageService.getTranslate(tequest.getQuery().getMessageId());
		bsm.setReadFlag("1");
		businessMessageService.update(bsm);
		setJsonString("{\"success\":true, \"msg\":\"操作成功。\"}");
		return SUCCESS;
	}

	public String publish() {
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = getTerminalQueryFilter();
		filter.addConjunctFilter("Q_userId_L_EQ", ApplicationContainer.getCurrentUserId() + "");
		filter.addConjunctFilter("Q_publishTime_D_GE", tequest.getQuery().getPublishTime());
		filter.addSorted("publishTime", "DESC");
		List<AnnounceUser> list = announceUserService.queryTranslateAll(filter);
		successResponse(GsonUtil.toJson(list));
		return SUCCESS;
	}
	
	public String updateAnnoc() {
		Tequest tequest = getTerminalMessage();
		if (tequest.getQuery().getAnnounceUserId() <= 0) {
			setJsonString("{\"success\":false, \"msg\":\"无效的消息ID\"}");
			return SUCCESS;
		}
		AnnounceUser bsm = announceUserService.getTranslate(tequest.getQuery().getAnnounceUserId());
		if(bsm!=null){
			bsm.setReadFlag("1");
			announceUserService.update(bsm);
			setJsonString("{\"success\":true, \"msg\":\"操作成功。\"}");	
		}else{
			setJsonString("{\"success\":false, \"msg\":\"无效的消息ID\"}");
		}
		
		return SUCCESS;
	}

}
