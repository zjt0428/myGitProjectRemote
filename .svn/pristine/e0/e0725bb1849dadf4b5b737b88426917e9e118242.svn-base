/**
 *====================================================
 * 文件名称: InstallWaitListEquipmentResponse.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年6月21日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @ClassName: InstallWaitListEquipmentResponse
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年6月21日 下午2:28:13
 */
@Data
public class ListEquipmentStatusResponse {

	private boolean success = true;

	private String msg = "操作成功";

	private Info info = new Info();

	@Data
	public static class Info {
		private List<Result> result = new ArrayList<Result>();
	}

	@Data
	@AllArgsConstructor
	public static class Result {

		private Long dispatchEquipId;

		private Long dispatchId;

		private String recordId;

		private String projectName;

		private Long projectId;
		
		private String buildingNum;
		
		private String exwSerial;
	}

	public void add(Long dispatchEquipId, Long dispatchId, String recordId, String projectName,Long projectId,String buildingNum,String exwSerial) {
		List<Result> result = this.info.getResult();
		Result re=new Result(dispatchEquipId, dispatchId, recordId, projectName,projectId,buildingNum,exwSerial);
		re.setBuildingNum(buildingNum);
		re.setExwSerial(exwSerial);
		result.add(re);
	}

}
