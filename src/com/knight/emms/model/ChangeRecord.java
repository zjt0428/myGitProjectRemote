/**
 *====================================================
 * 文件名称: ChangeRecord.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.constant.Status;

/**
 * @ClassName: ChangeRecord
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-5 下午8:30:25
 */

@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class ChangeRecord extends BaseModel implements ExportModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long orecordId;

	@Expose
	private Long userId;
	
	@Expose
	private String userName;
	
	@Expose
	private String createTime;
	
	@Expose
	private String executeSql;
	
	@Expose
	private String originalValue;

}
