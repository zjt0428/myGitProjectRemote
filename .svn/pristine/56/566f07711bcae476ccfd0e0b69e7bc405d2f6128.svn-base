package com.knight.emms.terminal.dto;

import com.google.gson.annotations.Expose;
import com.knight.app.model.TAppLogistics;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by YaoFly on 2016/7/28.
 */
public class LogisticsInfoResponse {

	private boolean success = true;

	private String msg = "操作成功";

	private String infoType = "Logistics";

	private Info info = new Info();

	@Data
	public static class Info {
		private List<Result> results = new ArrayList<Result>();
	}

	@Data
	public static class Result {
		@Expose
		private Long logiId;

		@Expose
		private Long disId;

		@Expose
		private String deliveryDate;

		@Expose
		private String deliveryMan;

		@Expose
		private String propertyName;

		@Expose
		private String sendWarehouseName;

		@Expose
		private String receiveWarehouseName;

		@Expose
		private BigDecimal summary;
	}
}
