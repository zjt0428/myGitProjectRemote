/**
 *====================================================
 * 文件名称: HandleMake.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年11月03日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.HandleMake;
import com.knight.emms.service.HandleMakeService;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: HandleMake
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年11月03日
 */
public class HandleMakeAction extends ExportBaseAction<HandleMake> {
	
	private static final long serialVersionUID = 1L;
	
	@Getter@Setter
	private Long handleId;
	
	@Getter@Setter
	private HandleMake handleMake;
	
	@Resource
	private HandleMakeService handleMakeService;

	public String list () {
		QueryFilter filter = new QueryFilter(getRequest());
		List<HandleMake> list = handleMakeService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String load () {
		HandleMake h = handleMakeService.getTranslate(handleId);
		CodeServiceImpl.translate(h.getApplyMake());
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(h, GsonUtil.SINCE_VERSION_20, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "新增或更新制作处理")
	public String save () {
		if (handleMake.getHandleId() == null) {
			handleMake.setStatus("0");
			handleMake.setDelFlag(Constant.ENABLED);
		} else {
			HandleMake h = handleMakeService.get(handleMake.getHandleId());
			handleMake.setDelFlag(h.getDelFlag());
			handleMake.setStatus(h.getStatus());
		}
		setFileAttach(handleMake.getHandleId());
		handleMakeService.saveOrMergeForEdit(handleMake);
		this.jsonString = "{success:true,applyforId:" + handleMake.getApplyforId() + "}";
		return SUCCESS;
	}
	
	@ActionLog(description = "删除制作处理")
	public String multiDel () {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			HandleMake h = handleMakeService.getTranslate(new Long(id));
			if (h.getStatus().equals("0")) {
				handleMakeService.remove(h);
			} else {
				throw new BusinessException("删除状态非法！");
			}
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除制作清单")
	public String multiDelMake () {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			handleMakeService.delMake(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除耗用清单")
	public String multiDelConsume () {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			handleMakeService.delConsume(new Long(id));
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "提交制作处理")
	public String multiSubmit () {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			HandleMake h = handleMakeService.getTranslate(new Long(id));
			if (h.getStatus().equals("0")) {
				h.setStatus(Status.Applyfor.waitApprove);
				handleMakeService.merge(h);
			} else {
				throw new BusinessException("提交状态非法！");
			}
		}
		return SUCCESS;
	}
}
