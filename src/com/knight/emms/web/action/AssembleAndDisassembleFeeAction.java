/**
 *====================================================
 * 文件名称: AssembleAndDisassembleFeeAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年7月13日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.AssembleAndDisassembleFee;
import com.knight.emms.service.AssembleAndDisassembleFeeService;

/**
 * @ClassName: AssembleAndDisassembleFeeAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年7月13日
 */
public class AssembleAndDisassembleFeeAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Long feeId;
	
	@Getter
	@Setter
	private AssembleAndDisassembleFee assembleAndDisassembleFee;
	
	@Resource
	private AssembleAndDisassembleFeeService assembleAndDisassembleFeeService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<AssembleAndDisassembleFee> list = assembleAndDisassembleFeeService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String load() {
		AssembleAndDisassembleFee a = assembleAndDisassembleFeeService.getTranslate(feeId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(a, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
        setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "新增或更新周材装卸/包装费")
	public String save() {
		if (assembleAndDisassembleFee.getFeeId() == null) {
			assembleAndDisassembleFeeService.save(assembleAndDisassembleFee);
		} else {
			assembleAndDisassembleFeeService.merge(assembleAndDisassembleFee);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除周材装卸/包装费")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
        for (String id : ids) {
        	assembleAndDisassembleFeeService.remove(new Long(id));
        }
        return SUCCESS;
	}
}
