package com.knight.emms.model;

import com.google.gson.annotations.Expose;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.model.Department;
import lombok.Data;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

/**
 * @ClassName: PractiEvaluation
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author linxx
 * @date 2019-08-08 下午2:46:52
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "人员评价信息汇总", sheetName = "评价信息")
@SerialNumberStrategy(name = "insureSerial", strategy = "WX-{yyyyMMdd}", maxseq = 999)
public class PractiEvaluation extends BaseModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long evaluaId;

	/**评价单号*/
	@Expose
	private String evaluaSerial;

	/**评价日期*/
	@Expose
	private String evaluaDate;

	/**评价人*/
	@Expose
	private String evaluaMan;

	/**评价人ID*/
	@Expose
	private Long evaluaManId;

	/**接受评价人*/
	@Expose
	private String acceptMan;

	/**接受评价人ID*/
	@Expose
	private Long acceptManId;

	/**评价星级*/
	@Expose
	private String evaluaStar;

	/**评价内容*/
	@Expose
	private String evaluaContent;

	/**删除标识*/
	@Expose
	private String delFlag;

	@Expose
	private Integer count;
}
