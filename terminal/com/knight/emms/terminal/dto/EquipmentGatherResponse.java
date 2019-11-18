/**
 *====================================================
 * 文件名称: EquipmentGatherResponse.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年7月18日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import lombok.Data;

/**
 * @ClassName: EquipmentGatherResponse
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年7月18日 下午10:30:51
 */
@Data
public class EquipmentGatherResponse {

	private boolean success = true;

	private String msg = "操作成功";

	private Info info = new Info();

	private String score = "0";

	@Data
	public static class Info {
		private List<Result> result = new ArrayList<Result>();
	}

	@Data
	public static class Result {

		private String businessStatus;

		private Integer counts;

	}

	public void addGather(List<Map<String, Object>> datas) {
		int total = 0;
		int wait = 0;
		for (Map<String, Object> data : datas) {
			Result r = new Result();
			r.setBusinessStatus((String) data.get("BUSINESSSTATUS"));
			r.setCounts((Integer) data.get("COUNTS"));
			this.info.result.add(r);
			if ("0".equals(r.getBusinessStatus())) {
				wait = r.getCounts();
			}
			total += r.getCounts();
		}
		if (total > 0) {
			BigDecimal a = new BigDecimal(total);
			BigDecimal b = new BigDecimal(wait);
			this.score = a.subtract(b).multiply(new BigDecimal(100)).divide(a, BigDecimal.ROUND_HALF_UP).toString();
		}

	}

}
