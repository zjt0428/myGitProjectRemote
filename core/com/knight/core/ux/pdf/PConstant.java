package com.knight.core.ux.pdf;

import com.itextpdf.text.Element;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Rectangle;

/**
 * 表格中的常量
 * @ClassName:PConstant
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-10-11 上午11:07:21
 * @since JDK Version 1.5
 */
public class PConstant {
	/**
	 * 单元格跨行
	 */
	public static final int rowspan = 0;

	/**
	 * 任意单元格将跨列的类型
	 */
	public static final int colspan = 1;

	/**
	 * 列表格式的table，以此格式生成表格时，将不会分页
	 */
	public static final int gridtable = 0;

	/**
	 * 自由格式的报表，以此格式时，文档将按数据进行分页 原则上是每条数据占一页
	 */
	public static final int freeformtable = 1;

	/***
	 * 以下是单元格的对齐属性
	 */
	public static final int ALIGN_CENTER = Element.ALIGN_CENTER;

	public static final int ALIGN_LEFT = Element.ALIGN_LEFT;

	public static final int ALIGN_RIGHT = Element.ALIGN_RIGHT;

	public static final int ALIGN_TOP = Element.ALIGN_TOP;

	public static final int ALIGN_MIDDLE = Element.ALIGN_MIDDLE;

	public static final int ALIGN_BOTTOM = Element.ALIGN_BOTTOM;

	/**
	 * 页面的纸张属性，常用的有三种A4,A3,A5
	 */
	public static final Rectangle PAGE_A4 = PageSize.A4;

	public static final Rectangle PAGE_A5 = PageSize.A5;

	public static final Rectangle PAGE_A3 = PageSize.A5;

}
