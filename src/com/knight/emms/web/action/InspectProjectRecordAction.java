
package com.knight.emms.web.action;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.ExportBaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.InspectProjectRecord;
import com.knight.emms.service.InspectProjectRecordService;
import com.knight.system.model.FileAttach;
import com.knight.system.service.FileAttachService;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: SafetyEducationAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author
 * @date
 */
public class InspectProjectRecordAction  extends ExportBaseAction<InspectProjectRecord> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private InspectProjectRecord inspectProjectRecord;

	@Setter
	@Getter
	private Long inprojectId;
	
	@Resource
	private FileAttachService fileAttachService;
	
	@Resource
	private InspectProjectRecordService inspectProjectRecordService;
	
	public String list(){
		QueryFilter filter = new QueryFilter(getRequest());
		String aid = getRequest().getParameter("aid");
		filter.addConjunctFilter("Q_aid_L_EQ", aid);
		List<InspectProjectRecord> list = inspectProjectRecordService.queryTranslateAll(filter);
		for(InspectProjectRecord i : list){
			i.setInprojectImageList(this.getFilePath(i.getInprojectImage()));
		}
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list,true));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	/**加载安全教育信息*/
	public String load(){
		inspectProjectRecord = inspectProjectRecordService.getTranslate(inprojectId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(inspectProjectRecord, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	
	public List<String> getFilePath(String id) {
		List<String> imgList = new ArrayList<String>();
		if (StringUtils.isNotBlank(id)&&!id.equals("null")&&!id.equals("NULL")) {
			System.out.println(id);
			QueryFilter filter = new QueryFilter();
			filter.addValuesDisjunctFilter("QVO_fileId_L_EQ", id);
			List<FileAttach> fileList = fileAttachService.getAll(filter);
			String url = null;
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < fileList.size(); i++) {
				sb.append(fileList.get(i).getFileId()).append(",");
				imgList.add(Constant.IMG_PRE_PATH + fileList.get(i).getFilePath());
			}
		}
		return imgList;
	}
}
