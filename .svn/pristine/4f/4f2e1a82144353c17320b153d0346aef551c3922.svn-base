package com.knight.core.ux.pdf.element.table;

/**
 * 静态文本单元格的属性
 * @ClassName:TextCellProperties
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-10-11 上午11:00:45
 * @since JDK Version 1.5
 */
public class TextCellProperties extends CellProperties {

	private String celltext;

	public TextCellProperties(int row, int col, int type, int num, String celltext) {
		super(row, col, type, num);
		this.celltext = celltext;
	}

	public TextCellProperties(int row, int col, int type, int num) {
		super(row, col, type, num);
	}

	public TextCellProperties(int row, int col, int type, int num, int horizontalAlignment, int verticalAlignment, String celltext) {
		super(row, col, type, num, horizontalAlignment, verticalAlignment);
		this.celltext = celltext;
	}

	public void setCelltext(String celltext) {
		this.celltext = celltext;
	}

	@Override
	public Object getO() {
		return celltext;
	}

}
