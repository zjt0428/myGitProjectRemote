package com.knight.core.ux.pdf.element;

import com.itextpdf.text.pdf.PdfPTable;
import com.knight.core.ux.pdf.TableGenerator;
import com.knight.core.ux.pdf.element.table.TableProperties;

public class PTable extends PdfObject {

	private TableGenerator tablegenerator = new TableGenerator();

	@SuppressWarnings("unused")
	private boolean border = true;

	private PdfPTable table;

	/**
	 * 根据表格属性与指定行高及边框有无设置边框
	 * @param tp
	 * @param rowheight
	 * @param border
	 */
	public PTable(TableProperties tp, int rowheight, boolean border) {
		tablegenerator.setBorder(border);
		if (rowheight != 0)
			tablegenerator.setRowheight(rowheight);

		table = tablegenerator.createTable(tp);

	}

	/***
	 * 根据表格属性，生成表格
	 * @param tp
	 */
	public PTable(TableProperties tp) {
		this(tp, 0, true);
	}

	/***
	 * 根据表格属性，生成表格
	 * @param tp
	 * @param border 是否存在表格线
	 */
	public PTable(TableProperties tp, boolean border) {
		this(tp, 0, border);
	}

	
//	public PdfPTable getPdfPTable(TableProperties tableproperties) {
//		table = tablegenerator.createTable(tableproperties);
//		return table;
//	}
//
//	public PdfPTable getPdfPTable(TableProperties tableproperties, int rowheight) {
//		tablegenerator.setRowheight(rowheight);
//		return getPdfPTable(tableproperties);
//	}

	public Object getObject() {
		// TODO Auto-generated method stub
		table.setSpacingAfter(this.getSpaceafter());
		table.setSpacingBefore(this.getSpacebef());
		return table;
	}

	/**
	 * 返回当前对象的类型
	 */
	@Override
	public int getType() {
		return 1;
	}

}
