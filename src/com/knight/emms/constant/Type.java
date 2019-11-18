/**
 *====================================================
 * 文件名称: Type.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年5月9日			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.constant;

/**
 * @ClassName: Type
 * @Description: 操作类型定义
 * @author Administrator
 * @date 2014年5月9日 下午4:59:10
 */
public class Type {

	public static class AnnounceCategory {
		/** 个人-0 */
		public static final String personal = "0";

		/** 部门-1 */
		public static final String department = "1";

		/** 全部门-0 */
		public static final String allDepartment = "0";
	}

	/** 款项类型 */
	public static class Fund {
		/** 付款-0 */
		public static final String payment = "0";

		/** 收款-1 */
		public static final String receive = "1";
	}

	/** 出入库类型 */
	public static class OutInStock {
		/** 出库-0 */
		public static final String out = "0";

		/** 入库-1 */
		public static final String in = "1";
	}

	/** 审批操作类型 */
	public static class Applyfor {
		/** 驳回-0 */
		public static final String reject = "0";

		/** 通过-1 */
		public static final String pass = "1";
	}

	/** 维修设备分类 */
	public static class RepairCompon {
		/** 原配件-0 */
		public static final String original = "0";

		/** 更换配件-1 */
		public static final String renewal = "1";
	}

	/** 归属类型 */
	public static class Belong {
		/** 自有-0 */
		public static final String original = "0";

		/** 租赁-1 */
		public static final String renewal = "1";
	}

	/** 提成类别 */
	public static class DeductCardinal {
		/** 按照合同实收款-0 */
		public static final String real = "0";

		/** 按照合同毛利-1 */
		public static final String profit = "1";
	}

	/** 提成比例类型 */
	public static class DeductProport {
		/** 同一比例-0 */
		public static final String simple = "0";

		/** 累加比例-1 */
		public static final String ladder = "1";
	}

}
