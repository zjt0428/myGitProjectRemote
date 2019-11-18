/**
 *====================================================
 * 文件名称: WaitInstallComponResponse.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2015年6月22日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.knight.emms.model.ProjectCompon;
import lombok.Data;

import com.knight.emms.model.DispatchCompon;

/**
 * @ClassName: WaitInstallComponResponse
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2015年6月22日 下午3:54:09
 */
@Data
public class WaitInstallComponResponse {

	private boolean success = true;

	private String msg = "操作成功";

	private Info info = new Info();

	@Data
	public static class Info {
		private List<Result> result = new ArrayList<Result>();
	}

	@Data
	public static class Result {

		private Long componId;

		private Integer counts;

		private Component component = new Component();

	}

	@Data
	public static class Component {

		private String componSerial;

		private String componGenericName;

		private String dimensions;

        private String knotFlag;

        private String wallAttacheFlag;

        private BigDecimal knotMetric;
        
        private String exwSerial;

	}

	public void add(List<ProjectCompon> dcs) {
		for (ProjectCompon dc : dcs) {
			Result result = new Result();
			result.setComponId(dc.getComponId());
			result.getComponent().setComponSerial(dc.getComponent().getComponSerial());
		    result.getComponent().setExwSerial(dc.getComponent().getExwSerial());;
			result.getComponent().setComponGenericName(dc.getComponent().getComponGenericName());
			result.getComponent().setDimensions(dc.getComponent().getDimensions());
            result.getComponent().setKnotFlag(dc.getComponent().getKnotFlag());
            result.getComponent().setWallAttacheFlag(dc.getComponent().getWallAttacheFlag());
            result.getComponent().setKnotMetric(dc.getComponent().getKnotMetric()==null?new BigDecimal(0):dc.getComponent().getKnotMetric());
			result.setCounts(dc.getCounts());
			this.info.getResult().add(result);
		}
	}

}
