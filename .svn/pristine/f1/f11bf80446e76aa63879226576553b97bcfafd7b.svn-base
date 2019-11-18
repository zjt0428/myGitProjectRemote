/**
 *====================================================
 * 文件名称: FormAcceptServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-11-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.HashMap;
import java.util.Map;

import lombok.Setter;

import com.knight.core.exception.BusinessException;
import com.knight.emms.constant.Type;
import com.knight.emms.core.ApplyforState;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.dao.FormAcceptDao;
import com.knight.emms.model.FormAccept;
import com.knight.emms.service.FormAcceptService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: FormAcceptServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-11-7 上午8:09:26
 */
public class FormAcceptServiceImpl extends BusinessLongPKServiceImpl<FormAccept> implements FormAcceptService {

	private FormAcceptDao formAcceptDao;

	@Setter
	private Map<String, BusinessFlowService<ApplyforState>> businessFlowServices = new HashMap<String, BusinessFlowService<ApplyforState>>();

	public FormAcceptServiceImpl(FormAcceptDao dao) {
		super(dao);
		this.formAcceptDao = dao;
	}

	private void checkApplyfor(FormAccept formAccept) {
		if (businessFlowServices.containsKey(formAccept.getRelateModule())) {
			BusinessFlowService<ApplyforState> flowService = businessFlowServices.get(formAccept.getRelateModule());
			if (Type.Applyfor.pass.equals(formAccept.getAcceptOpinion())) {
				flowService.passAcceptApplication(formAccept);
			} else {
				flowService.rejectAcceptApplication(formAccept);
			}
		} else {
			throw new BusinessException("受理类型未定义,不支持该受理信息!");
		}
	}

	public void parserAccept(FormAccept formAccept) {
		checkApplyfor(formAccept);
		formAcceptDao.save(formAccept);
	}

}
