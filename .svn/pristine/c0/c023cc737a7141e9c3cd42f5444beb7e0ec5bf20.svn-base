/**
 *====================================================
 * 文件名称: WaitInstallPracti.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年6月22日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal.dto;

import java.util.ArrayList;
import java.util.List;

import com.knight.emms.model.Practitioner;
import lombok.Data;

import com.knight.emms.model.DispatchPracti;

/**
 * @ClassName: WaitInstallPracti
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年6月22日 下午3:53:39
 */
@Data
public class WaitInstallPractiResponse {

	private boolean success = true;

	private String msg = "操作成功";

	private Info info = new Info();

	@Data
	public static class Info {
		private List<Result> result = new ArrayList<Result>();
	}

	@Data
	public static class Result {

		private Long practiId;

		private Practitioner practitioner = new Practitioner();

	}

	@Data
	public static class Practitioner {

		private String practiName;

		private String kindWorkName;

		private String mobile;

		private String deName;

	}

	public void add(List<com.knight.emms.model.Practitioner> dps) {
		for (com.knight.emms.model.Practitioner dp : dps) {
			Result result = new Result();
			result.setPractiId(dp.getPractiId());
			result.getPractitioner().setPractiName(dp.getPractiName());
			result.getPractitioner().setKindWorkName(dp.getKindWorkName());
			result.getPractitioner().setMobile(dp.getMobile());
			result.getPractitioner().setDeName(dp.getDepartment().getDepName());
			this.info.getResult().add(result);
		}
	}

}
