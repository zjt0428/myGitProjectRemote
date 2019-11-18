package com.knight.core.ux.pdf.element.table;

/**
 * 数据单元格属性
 * @ClassName:DataCellProperties
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-10-11 上午10:59:31
 * @since JDK Version 1.5
 */
public class DataCellProperties extends CellProperties {

	private String columnname;

	private Object o;

	public DataCellProperties(int row, int col, int type, int num) {
		super(row, col, type, num);
	}

	public DataCellProperties(int row, int col, int type, int num, String columnname) {
		super(row, col, type, num);
		this.columnname = columnname;
	}

	public DataCellProperties(int row, int col, int type, int num, int horizontalAlignment, int verticalAlignment, String columnname) {
		super(row, col, type, num, horizontalAlignment, verticalAlignment);
		this.columnname = columnname;
	}

	@Override
	public Object getO() {
		return this.o;
	}

	public void setO(Object o) {
		this.o = o;
	}

	public String getColumnname() {
		return columnname;
	}

	public void setColumnname(String columnname) {
		this.columnname = columnname;
	}
}
