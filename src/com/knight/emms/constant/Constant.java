/**
 *====================================================
 * 文件名称: Constant.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年5月15日			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.constant;

import java.math.BigDecimal;

/**
 * @ClassName: Constant
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Administrator
 * @date 2014年5月15日 上午11:52:20
 */
public class Constant {

	public static final BigDecimal ZERO = BigDecimal.ZERO;

	public static final BigDecimal HUNDRED = new BigDecimal(100);

	/** DISENABLED=0 */
	public static final String DISENABLED = "0";

	/** ENABLED=1 */
	public static final String ENABLED = "1";
	
	/*现场装车*/
	public static final String MATERIALS_PACKAGE = "MATERIALS_PACKAGE";
	
	/*发货调度*/
	public static final String MATERIALS_DISPATCH = "MATERIALS_DISPATCH";
	
	/*报废申请*/
	public static final String SCRAP_APPLY = "SCRAP_APPLY";
	
	/*报废合同*/
	public static final String SCRAP_CONTRACT = "SCRAP_CONTRACT";
	
	/*报废处理*/
	public static final String SCRAP_HANDLE = "SCRAP_HANDLE";
	
	/*已评审*/
	public static final String REVIEWED = "1";
	
	/*未评审*/
	public static final String UNREVIEW = "0";
	

	/*项目结算*/
	public static final String SETTLE_PROJECT = "SETTLE_PROJECT";
	
	/*周材结算*/
	public static final String SETTLE_MATERIALS = "SETTLE_MATERIALS";

	/**图片路径前缀*/
	public static final String IMG_PRE_PATH = "/image/";
	
	/**立即生成*/
	public static final String GENERATE_NOW = "0";

	/**次月生成*/
	public static final String GENERATE_NEXT_MONTH = "1";
	
	
}
