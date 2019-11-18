/**
 *====================================================
 * 文件名称: ProjectDepotInOut.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年12月04日		Chen·G·Y(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.model.ExportModel;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * @ClassName: ProjectDepotInOut
 * @Description: 项目仓库出入库查询
 * @author Chenzj
 * @date 2017年12月13日
 */
@Data
@ToString(exclude = { "queryId" })
@EqualsAndHashCode(callSuper = false, exclude = { "queryId" })
@Entity
@Table(name = "T_PROJECT_DEPOT_IN_OUT")
public class ProjectDepotInOut extends BaseModel implements ExportModel {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@Expose
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "QUERY_ID")
	private Long queryId;
	
	/** 品名 */
	@Expose
	@Column(name = "COMMODITY", updatable = false, nullable = false)
	private String commodity;

	/** 规格 */
	@Expose
	@Column(name = "SPECIFICATIONS_ID", updatable = false, nullable = false)
	private Long specificationsId;
	
	/** 规格 */
	@Expose
	@Column(name = "SPECIFICATIONS", updatable = false, nullable = false)
	private String specifications;

	/** 单位 */
	@Expose
	@Column(name = "UNIT", updatable = false, nullable = false)
	private String unit;
	
	/** 数量 */
	@Expose
	@Column(name = "QUANTITY", updatable = false, nullable = false)
	private String quantity;
	
	/** 辅助数量 */
	@Expose
	@Column(name = "SUPPLEMENT_QUANTITY", updatable = false, nullable = false)
	private String supplementQuantity;
	
	/** 出入库方式 */
	@Expose
	@Column(name = "OPERATION_WAY", updatable = false)
	private String operationWay;
	
	/** 合同id */
	@Expose
	@Column(name = "CONTRACT_ID", updatable = false, nullable = false)
	private Long contractId;
	
	/** 关联id */
	@Expose
	@Column(name = "RELATE_ID", updatable = false, nullable = false)
	private Long relateId;
	
	/** 关联模块*/
	@Expose
	@Column(name = "RELATE_MODULE", updatable = false, nullable = false)
	private String relateModule;
	
	/** 关联模块名称 */
	@Expose
	@Column(name = "RELATE_MODULE_NAME", updatable = false)
	private String relateModuleName;
	
	/** 关联编号 */
	@Expose
	@Column(name = "RELATE_SERIAL", updatable = false)
	private String relateSerial;
	
	/** 项目id */
	@Expose
	@Column(name = "PROJECT_ID", updatable = false)
	private Long projectId;
	
	/** 项目名称 */
	@Expose
	@Column(name = "PROJECT_NAME", updatable = false, nullable = false)
	private String projectName;
	
	/**出入库时间 */
	@Expose
	@Column(name = "OPERATION_DATE", updatable = false, nullable = false)
	private String operationDate;
	
	/**
	 * 租借合同id
	 * 同一周材合同，可能多条租借合同（租借单位不同）
	 * */
	@Expose
	@Column(name = "LEASE_ID", updatable = false, nullable = true)
	private Long leaseId;
	
	/**创建时间*/
	@Expose
	@Column(name = "CREATE_TIME", updatable = false, nullable = true)
	private String createTime;
	
}
