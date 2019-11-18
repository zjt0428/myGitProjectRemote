/**
 *====================================================
 * 文件名称: DismantleLoadResponse.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年6月22日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import lombok.Data;

import com.knight.emms.model.EquipDismantle;

/**
 * @ClassName: DismantleLoadResponse
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年6月22日 下午3:45:40
 */
@Data
public class DismantleLoadResponse {

	private boolean success = true;

	private String msg = "操作成功";

	private Info info = new Info();

	@Data
	public static class Info {
		private List<Result> result = new ArrayList<Result>();
	}

	@Data
	public static class Result {

		private Long dismantleId;

		private Date startdisDate;

		private Date enddisDate;

		private String dismantleHeight;

		private String longitude;

		private String latitude;

		private String address;

		private String userName;

		private String fileAttaches;
		
		private String dismantleType;


		private EquipFlow equipFlow = new EquipFlow();

		private Set<ComponDiary> componDiarySet = new HashSet<ComponDiary>();

		private Set<PractiDiary> practiDiarySet = new HashSet<PractiDiary>();
		
		private List<Map> images;
		


	}

	@Data
	public static class EquipFlow {

		private EquipDiary equipDiary = new EquipDiary();

	}

	@Data
	public static class EquipDiary {

		private String recordId;

		private String projectName;
		
		private String exwSerial;
		
		private String buildingNum;

	}

	@Data
	public static class ComponDiary {

		private Long componDiaryId;

		private Long componId;

		private String componSerial;

		private Integer counts;

		private String componSpecificName;

		private String componGenericName;

		private String dimensions;

	}

	@Data
	public static class PractiDiary {

		private String practiName;

	}

	public void add(EquipDismantle ed) {
		Result result = new Result();
		result.setAddress(ed.getAddress());
		result.setDismantleHeight(ed.getDismantleHeight());
		result.setDismantleId(ed.getDismantleId());
		result.setEnddisDate(ed.getEnddisDate());
		result.setFileAttaches(ed.getFileAttaches());
		result.setLatitude(ed.getLatitude());
		result.setLongitude(ed.getLongitude());
		result.setStartdisDate(ed.getStartdisDate());
		result.setUserName(ed.getUserName());
		result.setDismantleType(ed.getDismantleType());
		result.getEquipFlow().getEquipDiary().setProjectName(ed.getEquipFlow().getEquipDiary().getProjectName());
		result.getEquipFlow().getEquipDiary().setRecordId(ed.getEquipFlow().getEquipDiary().getRecordId());

		for (com.knight.emms.model.ComponDiary cd : ed.getComponDiarySet()) {
			ComponDiary diray = new ComponDiary();
			diray.setComponDiaryId(cd.getComponDiaryId());
			diray.setComponId(cd.getComponId());
			diray.setComponSerial(cd.getComponSerial());
			diray.setComponSpecificName(cd.getComponSpecificName());
			diray.setComponGenericName(cd.getComponGenericName());
			diray.setCounts(cd.getCounts());
			diray.setDimensions(cd.getDimensions());
			result.getComponDiarySet().add(diray);
		}
		for (com.knight.emms.model.PractiDiary pd : ed.getPractiDiarySet()) {
			PractiDiary diray = new PractiDiary();
			diray.setPractiName(pd.getPractiName());
			result.getPractiDiarySet().add(diray);
		}
		this.info.result.add(result);
	}
	public void add(EquipDismantle ed,List<Map> images) {
		Result result = new Result();
		result.setAddress(ed.getAddress());
		result.setDismantleHeight(ed.getDismantleHeight());
		result.setDismantleId(ed.getDismantleId());
		result.setEnddisDate(ed.getEnddisDate());
		result.setFileAttaches(ed.getFileAttaches());
		result.setLatitude(ed.getLatitude());
		result.setLongitude(ed.getLongitude());
		result.setStartdisDate(ed.getStartdisDate());
		result.setUserName(ed.getUserName());
		result.setDismantleType(ed.getDismantleType());
		result.getEquipFlow().getEquipDiary().setProjectName(ed.getEquipFlow().getEquipDiary().getProjectName());
		result.getEquipFlow().getEquipDiary().setRecordId(ed.getEquipFlow().getEquipDiary().getRecordId());
		result.getEquipFlow().getEquipDiary().setBuildingNum(ed.getEquipFlow().getEquipDiary().getBuildingNum());
		result.getEquipFlow().getEquipDiary().setExwSerial(ed.getEquipFlow().getEquipDiary().getExwSerial());
		result.setImages(images);
		for (com.knight.emms.model.ComponDiary cd : ed.getComponDiarySet()) {
			ComponDiary diray = new ComponDiary();
			diray.setComponDiaryId(cd.getComponDiaryId());
			diray.setComponId(cd.getComponId());
			diray.setComponSerial(cd.getComponSerial());
			diray.setComponSpecificName(cd.getComponSpecificName());
			diray.setComponGenericName(cd.getComponGenericName());
			diray.setCounts(cd.getCounts());
			diray.setDimensions(cd.getDimensions());
			result.getComponDiarySet().add(diray);
		}
		for (com.knight.emms.model.PractiDiary pd : ed.getPractiDiarySet()) {
			PractiDiary diray = new PractiDiary();
			diray.setPractiName(pd.getPractiName());
			result.getPractiDiarySet().add(diray);
		}
		this.info.result.add(result);
	}
}
