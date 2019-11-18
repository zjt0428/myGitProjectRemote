/**
 *====================================================
 * 文件名称: AmountEquipShareAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-27			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import javax.annotation.Resource;

import com.knight.core.log.ActionLog;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.service.AmountEquipShareService;

/**
 * @ClassName: AmountEquipShareAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-27 下午1:56:57
 */
public class AmountEquipShareAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Resource
	private AmountEquipShareService amountEquipShareService;

	@ActionLog(description = "删除费用分摊设备")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			amountEquipShareService.remove(new Long(id));
		}
		return SUCCESS;
	}

}
