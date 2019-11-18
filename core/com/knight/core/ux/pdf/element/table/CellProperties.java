package com.knight.core.ux.pdf.element.table;

import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;

/**
 * 单元格属性，单元格分为两类，一类是静态文本类型，一类是数据类型
 * @ClassName:CellProperties
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-10-11 上午10:58:19
 * @since JDK Version 1.5
 */
public abstract class CellProperties {

	private int row;

	private int col;

	/* 0为行rowspan,1为colspan */
	private int type;

	/* 指定占用的单元格数量 */
	private int num;

	private Font defaultfont = FontFactory.getFont("STSong-Light", "UniGB-UCS2-H");

	private int horizontalAlignment = Element.ALIGN_CENTER;

	private int verticalAlignment = Element.ALIGN_MIDDLE;

	public CellProperties(int row, int col, int type, int num, int horizontalAlignment, int verticalAlignment) {
		super();
		this.row = row;
		this.col = col;
		this.type = type;
		this.num = num;
		this.horizontalAlignment = horizontalAlignment;
		this.verticalAlignment = verticalAlignment;
	}

	/**
	 * @param row
	 * @param col
	 * @param type
	 * @param num
	 * @param text
	 */
	public CellProperties(int row, int col, int type, int num) {
		super();
		this.row = row;
		this.col = col;
		this.type = type;
		this.num = num;
	}

	// //定义抽象方法，得到对象值
	public abstract Object getO();

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

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public Font getDefaultfont() {
		return defaultfont;
	}

	public void setDefaultfont(Font defaultfont) {
		this.defaultfont = defaultfont;
	}

	public int getHorizontalAlignment() {
		return horizontalAlignment;
	}

	public void setHorizontalAlignment(int horizontalAlignment) {
		this.horizontalAlignment = horizontalAlignment;
	}

	public int getVerticalAlignment() {
		return verticalAlignment;
	}

	public void setVerticalAlignment(int verticalAlignment) {
		this.verticalAlignment = verticalAlignment;
	}

	@Override
	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append("row=" + this.row);
		sb.append("col=" + this.col);
		sb.append("type=" + this.type);
		sb.append("num=" + this.num);
		return sb.toString();
	}

}
