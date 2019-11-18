/**
 *====================================================
 * 文件名称: InstallLoadEquipmentResponse.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年6月21日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import lombok.Data;

import com.knight.emms.model.EquipInstall;

/**
 * @ClassName: InstallLoadEquipmentResponse
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年6月21日 下午2:47:39
 */
@Data
public class InstallLoadEquipmentResponse {

	private boolean success = true;

	private String msg = "操作成功";

	private Info info = new Info();

	@Data
	public static class Info {
		private List<Result> result = new ArrayList<Result>();
	}

	@Data
	public static class Result {

		private Long installId;

		private Date startinDate;

		private Date endinDate;

		private BigDecimal installHeight;

		private Integer knotCounts;

		private Integer wallAttacheQty;

		private BigDecimal brachium;

		private String longitude;

		private String latitude;

		private String address;

		private String userName;
		
		private String remark;

		private String fileAttaches;

		private String jackFileAttaches;

		private String dropFileAttaches;
		
		private String installtype;

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
		private Long projectId;

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

		private String jjStautsName;

	}

	@Data
	public static class PractiDiary {

		private Long practiDiaryId;

		private Long practiId;

		private String practiName;

	}

	public void add(EquipInstall ei) {
		Result result = new Result();
		result.setAddress(ei.getAddress());
        result.setKnotCounts(ei.getKnotCounts());
		result.setWallAttacheQty(ei.getWallAttacheQty());
		result.setBrachium(ei.getBrachium());
		result.setEndinDate(ei.getEndinDate());
		result.getEquipFlow().getEquipDiary().setProjectId(ei.getEquipFlow().getEquipDiary().getProjectId());
		result.getEquipFlow().getEquipDiary().setProjectName(ei.getEquipFlow().getEquipDiary().getProjectName());
		result.getEquipFlow().getEquipDiary().setRecordId(ei.getEquipFlow().getEquipDiary().getRecordId());
		result.setFileAttaches(ei.getFileAttaches());
		result.setInstallHeight(ei.getInstallHeight());
		result.setInstallId(ei.getInstallId());
		result.setLatitude(ei.getLatitude());
		result.setLongitude(ei.getLongitude());
		result.setStartinDate(ei.getStartinDate());
		result.setUserName(ei.getUserName());
        result.setDropFileAttaches(ei.getDropFileAttaches());
        result.setJackFileAttaches(ei.getJackFileAttaches());
		for (com.knight.emms.model.ComponDiary cd : ei.getComponDiarySet()) {
			ComponDiary diray = new ComponDiary();
			diray.setComponDiaryId(cd.getComponDiaryId());
			diray.setComponId(cd.getComponId());
			diray.setComponSerial(cd.getComponSerial());
			diray.setComponSpecificName(cd.getComponSpecificName());
			diray.setComponGenericName(cd.getComponGenericName());
			diray.setCounts(cd.getCounts());
            diray.setJjStautsName(cd.getJjStautsName());
			result.getComponDiarySet().add(diray);
		}
		for (com.knight.emms.model.PractiDiary pd : ei.getPractiDiarySet()) {
			PractiDiary diray = new PractiDiary();
			diray.setPractiDiaryId(pd.getPractiDiaryId());
			diray.setPractiId(pd.getPractiId());
			diray.setPractiName(pd.getPractiName());
			result.getPractiDiarySet().add(diray);
		}
		this.info.result.add(result);
	}

	public void add(EquipInstall ei,List<Map> images) {
		Result result = new Result();
		result.setAddress(ei.getAddress());
        result.setKnotCounts(ei.getKnotCounts());
        result.setWallAttacheQty(ei.getWallAttacheQty());
		result.setBrachium(ei.getBrachium());
		result.setEndinDate(ei.getEndinDate());
		result.setRemark(ei.getRemark());
		result.getEquipFlow().getEquipDiary().setProjectId(ei.getEquipFlow().getEquipDiary().getProjectId());
		result.getEquipFlow().getEquipDiary().setProjectName(ei.getEquipFlow().getEquipDiary().getProjectName());
		result.getEquipFlow().getEquipDiary().setRecordId(ei.getEquipFlow().getEquipDiary().getRecordId());
		result.getEquipFlow().getEquipDiary().setBuildingNum(ei.getEquipFlow().getEquipDiary().getBuildingNum());
		result.getEquipFlow().getEquipDiary().setExwSerial(ei.getEquipFlow().getEquipDiary().getExwSerial());
		result.setFileAttaches(ei.getFileAttaches());
		result.setInstallHeight(ei.getInstallHeight());
		result.setInstallId(ei.getInstallId());
		result.setLatitude(ei.getLatitude());
		result.setLongitude(ei.getLongitude());
		result.setStartinDate(ei.getStartinDate());
		result.setUserName(ei.getUserName());
		result.setInstalltype(ei.getInstalltype());
		result.setImages(images);
        result.setDropFileAttaches(ei.getDropFileAttaches());
        result.setJackFileAttaches(ei.getJackFileAttaches());
		for (com.knight.emms.model.ComponDiary cd : ei.getComponDiarySet()) {
			ComponDiary diray = new ComponDiary();
			diray.setComponDiaryId(cd.getComponDiaryId());
			diray.setComponId(cd.getComponId());
			diray.setComponSerial(cd.getComponSerial());
			diray.setComponSpecificName(cd.getComponSpecificName());
			diray.setComponGenericName(cd.getComponGenericName());
			diray.setCounts(cd.getCounts());
            diray.setJjStautsName(cd.getJjStautsName());
			result.getComponDiarySet().add(diray);
		}
		for (com.knight.emms.model.PractiDiary pd : ei.getPractiDiarySet()) {
			PractiDiary diray = new PractiDiary();
			diray.setPractiDiaryId(pd.getPractiDiaryId());
			diray.setPractiId(pd.getPractiId());
			diray.setPractiName(pd.getPractiName());
			result.getPractiDiarySet().add(diray);
		}
		
		this.info.result.add(result);
	}

}
