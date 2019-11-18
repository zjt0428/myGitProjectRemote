/**
 *====================================================
 * 文件名称: OverduePaymentAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年4月2日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;

import org.apache.commons.lang.StringUtils;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.FreemarkerContextHelper;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.model.OverduePayment;
import com.knight.emms.service.OverduePaymentService;
import com.knight.system.application.ApplicationContainer;

/**
 * @ClassName: OverduePaymentAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年4月2日 下午11:40:17
 */
public class OverduePaymentAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private OverduePayment overduePayment;

	@Setter
	@Getter
	private Long overduePaymentId;

	@Resource
	private OverduePaymentService overduePaymentService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<OverduePayment> list = overduePaymentService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "新增或更新催款信息")
	public String save() {
		overduePaymentService.saveSerialModel(overduePayment);
		return SUCCESS;
	}

	@ActionLog(description = "删除催款信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			overduePaymentService.remove(new Long(id));
		}
		return SUCCESS;
	}

	public String print() {
		overduePayment = overduePaymentService.get(overduePaymentId);
		String event = getRequest().getParameter("EVENT");
		if (event != null && "SAVE".equals(event)) {
			String content = getRequest().getParameter("content");
			overduePayment.setContents(content);
			overduePaymentService.save(overduePayment);
		} else if (event != null && "PRINT".equals(event)) {
			String content = getRequest().getParameter("content");
			overduePayment.setContents(content);
			overduePaymentService.save(overduePayment);
			try {
				getRequest().setCharacterEncoding("UTF-8");
				content = overduePayment.getContents();
				if (content != null && !"".equals(content)) {
					byte[] bytes = content.getBytes("UTF-8"); // bf.tostring()
					getResponse().reset();
					getResponse().setContentType("application/msword");
					getResponse().setHeader("Content-disposition", "inline; filename=" + overduePayment.getOverduePaymentSerial() + ".doc"); // inline
					getResponse().setCharacterEncoding("UTF-8");
					getResponse().setContentLength(bytes.length);
					ServletOutputStream ouputStream = getResponse().getOutputStream();
					ouputStream.write(bytes, 0, bytes.length);
					ouputStream.flush();
					ouputStream.close();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else if (StringUtils.isBlank(overduePayment.getContents())) {
			Map<String, Object> data = new HashMap<String, Object>();
			data.put("overduePayment", overduePayment);
			overduePayment.setContents(FreemarkerContextHelper.process(ApplicationContainer.getSystemParam("overdue.payment").toString(), data));
		}
		getRequest().setAttribute("content", overduePayment.getContents());
		return getRequest().getParameter("formpage");
	}

}
