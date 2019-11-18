package com.knight.core.ux.pdf.element.table;

import java.util.List;

import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.knight.core.ux.pdf.PConstant;
import com.knight.core.ux.pdf.element.DataBean;

/**
 * 表格属性
 * @ClassName:TableProperties
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-10-11 上午10:59:46
 * @since JDK Version 1.5
 */
public class TableProperties {
	// 表行数
	private int row;

	// 表列数
	private int col;

	// 表格宽度

	// 表字体大小
	private float size = 12;
	
	// 表字体
	private Font defaultfont = FontFactory.getFont("STSongStd-Light", "UniGB-UCS2-H", size);

	// 表头内容
	private String tableheader;

	// 表尾内容
	private String tabletail;

	private float[] colwidths;

	private float[] rowheights;

	/**
	 * 初始化报表类型，默认报表类型为自由格式的类型
	 */
	private int tabletype = PConstant.freeformtable;

	/**
	 * 表中的元素表配置 即：表中有多少个单元格，以及每个单元格的属性
	 */
	private ElementTable elementtalbe;

	/**
	 * 表中的元素数据bean
	 */
	private List<DataBean> data;

	/**
	 * 根据行数与列数确定，表格的大小 不指定行高与列宽时，行高以默认高为准，列宽，平均分配当前宽度
	 * @param row
	 * @param col
	 */
	public TableProperties(int row, int col) {
		super();
		this.row = row;
		this.col = col;

	}

	public TableProperties(int row, int col, Font font) {
		super();
		this.row = row;
		this.col = col;
		this.defaultfont = font;
	}

	public TableProperties(int row, int col, int size) {
		super();
		this.row = row;
		this.col = col;
		this.size = size;
	}

	public TableProperties(int row, int col, Font font, int size) {
		super();
		this.row = row;
		this.col = col;
		this.defaultfont = font;
		this.size = size;
	}

	public TableProperties(Font defaultfont, float size, float[] colwidths, float[] rowheights) {
		super();
		this.defaultfont = defaultfont;
		this.size = size;
		this.colwidths = colwidths;
		this.rowheights = rowheights;
	}

	public float[] getColwidths() {
		return colwidths;
	}

	/**
	 * 设置每个列的宽度，列宽在创建表的初始宽度指定 根据数据数重设列数，更改变量值
	 * @param colwidths
	 */
	public void setColwidths(float[] colwidths) {
		this.colwidths = colwidths;
		this.col = colwidths.length;
	}

	public float[] getRowheights() {
		return rowheights;
	}

	/**
	 * 设置每行的行高，在创建表时指定 存在此属性时，表的行数以此为准
	 * @param rowheights
	 */
	public void setRowheights(float[] rowheights) {
		this.rowheights = rowheights;
		this.row = rowheights.length;
	}

	public int getRow() {
		return row;
	}

	public void setRow(int row) {
		this.row = row;
	}

	public int getCol() {
		return col;
	}

	public void setCol(int col) {
		this.col = col;
	}

	public Font getFont() {
		return defaultfont;
	}

	public void setFont(Font font) {
		this.defaultfont = font;
	}

	public float getSize() {
		return size;
	}

	public void setSize(float size) {
		this.size = size;
	}

	public String getTableheader() {
		return tableheader;
	}

	public void setTableheader(String tableheader) {
		this.tableheader = tableheader;
	}

	public String getTabletail() {
		return tabletail;
	}

	public void setTabletail(String tabletail) {
		this.tabletail = tabletail;
	}

	public ElementTable getElementtalbe() {
		return elementtalbe;
	}

	public void setElementtalbe(ElementTable elementtalbe) {
		this.elementtalbe = elementtalbe;
	}

	public int getTabletype() {
		return tabletype;
	}

	public void setTabletype(int tabletype) {
		this.tabletype = tabletype;
	}

	public List<DataBean> getData() {
		return data;
	}

	public void setData(List<DataBean> data) {
		this.data = data;
	}

}
