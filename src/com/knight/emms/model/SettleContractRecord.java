/**
 *====================================================
 * 文件名称: SettleContract.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-24			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.InstalmentMethod;
import com.knight.emms.core.ReceivementMethod;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.Department;

/**
 * @ClassName: SettleContract
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-24 下午3:57:28
 */
@Data
@EqualsAndHashCode(callSuper = false)
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare(isExportable = true, exportName = "结算信息汇总", sheetName = "结算信息")
@SerialNumberStrategy(name = "settleSerial", strategy = "JS{yyyyMMdd}", maxseq = 999)
public class SettleContractRecord extends BusinessModel implements  ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long recordId;
	
	@Expose
	private Long settleId;

	@Expose
	private Long userId;
	@Expose
	private String userName;
	
	@Expose
	private String createTime;
	@Expose
	private SettleContract settleContract;

	@Override
	public void setModelSerial(String serial) {
		// TODO Auto-generated method stub
		
	}




	
}
