/**
 *====================================================
 * 文件名称: EquipmentInfo.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年7月18日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal.dto;

import java.util.*;

import com.google.gson.Gson;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.util.GsonUtil;
import com.knight.emms.model.Component;
import lombok.Data;

import com.knight.core.util.DateUtil;
import com.knight.emms.model.Equipment;

/**
 * @ClassName: EquipmentInfo
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年7月18日 下午5:10:52
 */
@Data
public class EquipmentInfoResponse {

	private boolean success = true;

	private String msg = "操作成功";

	private Info info = new Info();

	private String infoType = "EQUIPMENT";

	@Data
	public static class Info {
		private List<Result> result = new ArrayList<Result>();
	}

	@Data
	public static class Result {

		/** 备案ID */
		private Long equipId;

		/** 备案编号 */
		private String recordId;

		/** 设备名称 */
		private String equipGenericName;

		/** 规格型号 */
		private String equipSpecificName;

		/** 出厂编号 */
		private String exwSerial;

		/** 出厂日期 */
		private String exwDate;

		/** 采购日期 */
		private String purchaseDate;

		/** 报废日期 */
		private String scrapDate;

		/** 制造厂家 */
		private String equipVender;

		private String buildingNum;
		
        private String projectName;
        
        /**设备自编号*/
        private String equipSerial;

		private Set<Component> componentSet = new HashSet<Component>(0);

		private List<ComponentInfoResponse.Result> componentInfoSet = new ArrayList<ComponentInfoResponse.Result>();

	}

	public void addEquipment(Equipment e) {
		Result r = new Result();
		r.setEquipId(e.getEquipId());
		r.setRecordId(e.getRecordId());
		r.setEquipGenericName(e.getEquipGenericName());
		r.setEquipSpecificName(e.getEquipSpecificName());
		r.setExwSerial(e.getExwSerial());
		r.setExwDate(e.getExwDate());
		r.setPurchaseDate(DateUtil.changeDateToStr(e.getPurchaseDate(), DateUtil.LINK_DISPLAY_DATE));
		r.setScrapDate(DateUtil.changeDateToStr(e.getScrapDate(), DateUtil.LINK_DISPLAY_DATE));
		r.setEquipVender(e.getEquipVender());
        r.setComponentSet(e.getComponentSet());
		this.info.result.add(r);
	}

	public void addEquipment(Equipment e,ComponentInfoResponse comps) {
		Result r = new Result();
		r.setEquipId(e.getEquipId());
		r.setRecordId(e.getRecordId());
		r.setEquipGenericName(e.getEquipGenericName());
		r.setEquipSpecificName(e.getEquipSpecificName());
		r.setExwSerial(e.getExwSerial());
		r.setExwDate(e.getExwDate());
		r.setPurchaseDate(DateUtil.changeDateToStr(e.getPurchaseDate(), DateUtil.LINK_DISPLAY_DATE));
		r.setScrapDate(DateUtil.changeDateToStr(e.getScrapDate(), DateUtil.LINK_DISPLAY_DATE));
		r.setEquipVender(e.getEquipVender());
        r.setBuildingNum(e.getBuildingNum());
        r.setProjectName(e.getProjectName());
        r.setEquipSerial(e.getEquipSerial());
		r.setComponentInfoSet(comps.getInfo().result);
		this.info.result.add(r);
	}

}
