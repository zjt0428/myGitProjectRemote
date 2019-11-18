/**
 *====================================================
 * 文件名称: InspectLoadResponse.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年6月22日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import lombok.Data;

import com.google.gson.annotations.Expose;
import com.knight.app.model.InspectRectify;
import com.knight.emms.model.EquipInspect;

/**
 * @ClassName: InspectLoadResponse
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年6月22日 下午3:26:31
 */
@Data
public class InspectLoadResponse {

	private boolean success = true;

	private String msg = "操作成功";

	private Info info = new Info();

	@Data
	public static class Info {
		private List<Result> result = new ArrayList<Result>();
	}

	@Data
	public static class Result {

		private Long inspectId;

		private Date inspectDate;

		private String inspectPepoles;

		private String inspectResult;

		private String inspectResultName;

		private String remark;

		private String longitude;

		private String latitude;

		private String address;

		private String fileAttaches;
		
		private List<Map> images;
		
		private String rectification;
		
		private InspectRectify inspectRectify;

		private EquipInspectSchema equipInspectSchema = new EquipInspectSchema();
	}

	@Data
	public static class EquipInspectSchema {

		private EquipDiary equipDiary = new EquipDiary();

	}

	@Data
	public static class EquipDiary {

		private String recordId;

		private String projectName;
		
		private String exwSerial;
		
		private String buildingNum;

		private String equipSerial;
		
		private String equipSpecific;
		
		private String equipSpecificName;
	}

	public void add(EquipInspect ei) {
		Result result = new Result();
		result.setAddress(ei.getAddress());
		result.setFileAttaches(ei.getFileAttaches());
		result.setInspectDate(ei.getInspectDate());
		result.setInspectId(ei.getInspectId());
		result.setInspectPepoles(ei.getInspectPepoles());
		result.setInspectResult(ei.getInspectResult());
		result.setInspectResultName(ei.getInspectResultName());
		result.setLatitude(ei.getLatitude());
		result.setLongitude(ei.getLongitude());
		result.setRemark(ei.getRemark());
		result.getEquipInspectSchema().getEquipDiary().setProjectName(ei.getEquipInspectSchema().getEquipDiary().getProjectName());
		result.getEquipInspectSchema().getEquipDiary().setRecordId(ei.getEquipInspectSchema().getEquipDiary().getRecordId());
		this.info.result.add(result);
	}

	public void add(EquipInspect ei,List<Map> images) {
		Result result = new Result();
		result.setAddress(ei.getAddress());
		result.setFileAttaches(ei.getFileAttaches());
		result.setInspectDate(ei.getInspectDate());
		result.setInspectId(ei.getInspectId());
		result.setInspectPepoles(ei.getInspectPepoles());
		result.setInspectResult(ei.getInspectResult());
		result.setInspectResultName(ei.getInspectResultName());
		result.setLatitude(ei.getLatitude());
		result.setLongitude(ei.getLongitude());
		result.setRemark(ei.getRemark());
		result.setInspectRectify(ei.getInspectRectify());
		result.setImages(images);
		result.setRectification(ei.getRectification());
		result.getEquipInspectSchema().getEquipDiary().setProjectName(ei.getEquipInspectSchema().getEquipDiary().getProjectName());
		result.getEquipInspectSchema().getEquipDiary().setRecordId(ei.getEquipInspectSchema().getEquipDiary().getRecordId());
		result.getEquipInspectSchema().getEquipDiary().setBuildingNum(ei.getEquipInspectSchema().getEquipDiary().getBuildingNum());
		result.getEquipInspectSchema().getEquipDiary().setExwSerial(ei.getEquipInspectSchema().getEquipDiary().getExwSerial());
		result.getEquipInspectSchema().getEquipDiary().setEquipSpecific(ei.getEquipInspectSchema().getEquipDiary().getEquipSpecificName());
		result.getEquipInspectSchema().getEquipDiary().setEquipSerial(ei.getEquipInspectSchema().getEquipDiary().getEquipSerial());
		this.info.result.add(result);
	}
	
}
