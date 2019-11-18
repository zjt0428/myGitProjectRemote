/**
 *====================================================
 * 文件名称: FileAttachAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月25日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.emms.terminal.Tequest;
import com.knight.emms.terminal.TerminalBaseAction;
import com.knight.system.model.FileAttach;
import com.knight.system.service.FileAttachService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;

/**
 * @ClassName: FileAttachAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014年10月25日 下午5:22:06
 */
public class FileAttachAction extends TerminalBaseAction {

	private static final long serialVersionUID = 1L;

	@Resource
	private FileAttachService fileAttachService;

	public String list() {
		Tequest tequest = getTerminalMessage();
		QueryFilter filter = getTerminalQueryFilter();
		filter.addConjunctFilter("Q_dependId_L_EQ", tequest.getQuery().getRelateId() + "");
		filter.addConjunctFilter("Q_dependName_S_EQ", tequest.getQuery().getRelateModule());
		List<FileAttach> list = fileAttachService.getAll(filter);
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		for (FileAttach fileAttach : list) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("fileId", fileAttach.getFileId());
			map.put("fileName", fileAttach.getFileName());
			map.put("filePath", fileAttach.getFilePath());
			map.put("createtime", fileAttach.getCreatetime());
			result.add(map);
		}
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] { "createtime" });
		successResponse(serializer.serialize(result));
		return SUCCESS;
	}

}
