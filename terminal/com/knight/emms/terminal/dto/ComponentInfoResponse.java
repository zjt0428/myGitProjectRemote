/**
 *====================================================
 * 文件名称: ComponentInfoResponse.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年7月18日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.knight.emms.model.ProjectCompon;
import lombok.Data;

import com.knight.core.util.DateUtil;
import com.knight.emms.model.Component;

/**
 * @ClassName: ComponentInfoResponse
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年7月18日 下午5:11:33
 */
@Data
public class ComponentInfoResponse {

	private boolean success = true;

	private String msg = "操作成功";

	private String infoType = "COMPONENT";

	private Info info = new Info();

	@Data
	public static class Info {
		public List<Result> result = new ArrayList<Result>();
	}

	@Data
	public static class Result {

		/** 配件ID */
		private Long componId;

		/** 配件编号 */
		private String componSerial;

		/** 配件名称 */
		private String componGenericName;

		/** 设备型号 */
		private String componSpecificName;

		/** 配件规格 */
		private String dimensions;

		/** 报废日期 */
		private String scrapDate;

		/** 所属设备 */
		private String recordId;

        private Integer freeCounts;

        private Integer consumeCounts;
        
	}

	public void addComponent(Component c) {
		Result r = new Result();
		r.setComponId(c.getComponId());
		r.setComponSerial(c.getComponSerial());
		r.setComponGenericName(c.getComponGenericName());
		r.setComponSpecificName(c.getComponSpecificName());
		r.setDimensions(c.getDimensions());
		r.setScrapDate(DateUtil.changeDateToStr(c.getScrapDate(), DateUtil.LINK_DISPLAY_DATE));
		r.setRecordId(c.getRecordId());
		r.setConsumeCounts(c.getConsumeCounts());
		this.info.result.add(r);
	}

	public void addProjectComponent(List<Map<String,Object>> list){
		Result r = new Result();
        for(Map<String,Object> m :list){
		r.setComponId((Long)m.get("componId"));
		r.setComponSerial((String)m.get("componSerial"));
		r.setComponGenericName((String)m.get("componGenericName"));
		r.setComponSpecificName((String)m.get("componSpecificName"));
		r.setDimensions((String)m.get("dimensions"));
        r.setConsumeCounts((Integer)m.get("consumeCounts"));
//        r.setFreeCounts((Integer)m.get("freeCounts"));
		this.info.result.add(r);
        }
	}

}
