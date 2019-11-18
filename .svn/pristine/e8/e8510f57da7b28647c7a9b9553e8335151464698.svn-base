/**
 *====================================================
 * 文件名称: TerminalBaseAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月23日			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.xwork.StringUtils;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.ApplicationContextHelper;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.BusinessMessage;
import com.knight.emms.service.BusinessMessageService;
import com.knight.system.model.AppUser;
import com.knight.system.model.FileAttach;
import com.knight.system.service.AppUserService;
import com.knight.system.service.FileAttachService;

/**
 * @ClassName: TerminalBaseAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Administrator
 * @date 2014年10月23日 下午4:09:48
 */
public abstract class TerminalBaseAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private String tmessage;
	
	@Resource
	protected AppUserService appUserService;
	
	@Resource
	protected BusinessMessageService businessMessageService;

	protected Tequest getTerminalMessage(String datePattern) {
		HttpServletRequest r = getRequest();
		logger.info("接收参数 =====> " + tmessage);
		return GsonUtil.fromJson(tmessage, Tequest.class, datePattern);
	}

	protected Tequest getTerminalMessage() {
		return getTerminalMessage(DateUtil.LINK_DISPLAY_DATE);
	}

	protected QueryFilter getTerminalQueryFilter() {
		QueryFilter filter = new QueryFilter();
		filter.getPagingBean().setTotalCounts(false);
		return filter;
	}

	protected QueryFilter getTerminalQueryFilter(Tequest tequest) {
		QueryFilter filter = getTerminalQueryFilter();
		filter.getPagingBean().setStart(tequest.getQuery().getStart());
		filter.getPagingBean().setPageSize(tequest.getQuery().getPageSize());
		return filter;
	}

	protected void successResponse() {
		setJsonString("{\"success\":true,\"msg\":\"操作成功\"}");
	}

	protected void successResponse(String result) {
		setJsonString("{\"success\":true,\"msg\":\"操作成功\",\"info\":{\"result\":" + result + "}}");
	}

	protected void setTerminalFileAttach(Long relateId, String fileIds) {
		FileAttachService fileAttachService = (FileAttachService) ApplicationContextHelper.getBean("fileAttachService");
		if (StringUtils.isNotBlank(fileIds)) {
			String[] fileIdarray = fileIds.split(",");
			for (String fi : fileIdarray) {
				if (StringUtils.isBlank(fi)) {
					continue;
				}
				FileAttach fileAttach = fileAttachService.get(new Long(fi));
				if (fileAttach == null) {
					continue;
				}
				fileAttach.setDependId(relateId);
				fileAttachService.save(fileAttach);
			}
		}
	}
	
	protected void errorResponse() {
		setJsonString("{\"success\":false,\"msg\":\"参数错误\"}");
	}
	protected void errorResponse(String msg) {
		setJsonString("{\"success\":false,\"msg\":\""+msg+ "\"}");
	}
	protected void successResponse2(String strId) {
		setJsonString("{\"success\":true,\"msg\":\"操作成功\","+ strId +"}");
	}
	
	protected boolean send(String msg,String detail,String man,String module){
		String[] dismans=man.split(",");
		for(int i=0;i<dismans.length;i++){
			AppUser appUser = appUserService.get(Long.valueOf(dismans[i]));
			BusinessMessage bm = new BusinessMessage();
			bm.setMessage(msg);
			bm.setDetail(detail);
			bm.setReceiveTel(appUser.getMobile());
			bm.setSenderName("系统消息");
			bm.setSendFlag("0");
			bm.setMsgType("0");
			bm.setModule(module);
			bm.setCreateTime(new Date());
			businessMessageService.sendOnce(bm);
		}
		return true;
	}

}
