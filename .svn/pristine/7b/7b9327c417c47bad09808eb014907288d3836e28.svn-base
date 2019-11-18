package com.knight.core.ux.pdf;

import java.beans.IntrospectionException;
import java.io.IOException;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.knight.core.ux.pdf.element.DataBean;
import com.knight.core.ux.pdf.element.table.CellProperties;
import com.knight.core.ux.pdf.element.table.DataCellProperties;
import com.knight.core.ux.pdf.element.table.ElementTable;
import com.knight.core.ux.pdf.element.table.TableProperties;

/**
 * 表格生成器，对表格所做的操作，将在此类中完成
 * @ClassName:TableGenerator
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-10-11 上午11:00:52
 * @since JDK Version 1.5
 */
public class TableGenerator {
	
	private static final float margin = 5f;

	// 缺省行高
	private float rowheight = 20f;

	// 缺省边框为true
	private boolean border = true;

	@SuppressWarnings("unused")
	private boolean autoassign = true;

	@SuppressWarnings("unused")
	private float colswidth = 16f;

	private TableProperties tp;

	private static Font chineseFont;

	public TableGenerator(float rowheight) {
		super();
		this.rowheight = rowheight;
	}

	public TableGenerator(float rowheight, boolean autoassign) {
		super();
		this.rowheight = rowheight;
		this.autoassign = autoassign;
	}

	public TableGenerator(float rowheight, boolean autoassign, float colswidth) {
		super();
		this.rowheight = rowheight;
		this.autoassign = autoassign;
		this.colswidth = colswidth;
	}

	public TableGenerator() {
	}

	/**
	 * 根据行列数生成指定行列的空表格
	 * @param rows 行数
	 * @param cols 列数
	 * @return
	 */
	public PdfPTable createTable(int rows, int cols) {
		PdfPTable table = new PdfPTable(cols);

		for (int i = 0; i < rows * cols; i++) {
			PdfPCell cell;
			cell = new PdfPCell();

			cell.setFixedHeight(rowheight);
			table.addCell(cell);
		}
		table.setSpacingAfter(margin);
		table.setSpacingBefore(margin);
		return table;
	}

	/**
	 * 根据指定单元格内容，生成表格，
	 * @param rows
	 * @param cols
	 * @param element 定制的表格对象
	 * @param db 数据对象，表格中存储的数据对象
	 * @return
	 */
	public PdfPTable createFreeTable(int rows, int cols, ElementTable et, DataBean db) {
		float[] colwidths = this.tp.getColwidths();
		float[] rowheights = this.tp.getRowheights();
		PdfPTable table = new PdfPTable(colwidths);

		table.setWidthPercentage(100f);
		Map<String, CellProperties> element = this.readElementTalbe(et, this.tp);
		int pan = 0;
		ArrayList<String> hascell = new ArrayList<String>();
		float tmprowheight = rowheight;

		for (int i = 0; i < rows; i++) {
			if (rowheights != null && i <= rowheights.length) {
				tmprowheight = rowheights[i];
			}
			for (int j = 0; j < cols; j++) {
				String key = i + "*" + j;
				if (hascell.contains(key))
					continue;
				PdfPCell cell;

				if (element.containsKey(key)) {
					CellProperties e = element.get(key);
					cell = this.getPdfPCell(e, db);
					// cell.setNoWrap(false);
					int type = e.getType();
					pan = e.getNum();
					// this.handlePdfPcell(cell, e);
					if (type == PConstant.rowspan) {
						cell.setRowspan(pan);
						for (int k = 1; k < pan; k++) {
							int tmprow;
							int tmpcol;
							tmprow = i + k;
							tmpcol = j;
							hascell.add(tmprow + "*" + tmpcol);
						}
					} else if (type == PConstant.colspan) {
						cell.setColspan(pan);
						for (int k = 1; k < pan; k++) {
							int tmprow;
							int tmpcol;
							tmprow = i;
							tmpcol = j + k;
							hascell.add(tmprow + "*" + tmpcol);
						}
					}
				} else
					cell = new PdfPCell();

				// 最小高度
				cell.setMinimumHeight(rowheight);
				cell.setFixedHeight(tmprowheight);

				table.addCell(cell);
			}
		}
		return table;
	}

	/**
	 * 生成grid类型的表格，根据数据量的多少，增加表格的行数 生成时默认以第一行为表头表格。
	 * @param rows
	 * @param cols
	 * @param et 定制的表格对象，
	 * @param data 数据对象
	 * @return
	 */
	public PdfPTable createGridTable(int cols, ElementTable et, List<DataBean> data) {
		float[] colwidths = this.tp.getColwidths();
		// float[] rowheights = this.tp.getRowheights();
		PdfPTable table = new PdfPTable(colwidths);

		table.setWidthPercentage(100f);

		int rows = 0;
		Map<String, CellProperties> element = this.readElementTalbe(et, this.tp);

		// 生成的表格的行数以数据的行数为准
		rows = data.size();

		// if (element.size() < colwidths.length)

		/**
		 * 生成表头,并根据element设置表头文本 当在element中未找到相应的元素时，表头为空
		 */
		for (int i = 0; i < colwidths.length; i++) {
			String key = "0*" + i;
			PdfPCell cell;

			if (element.containsKey(key)) {
				CellProperties e = element.get(key);
				cell = this.getPdfCell(e);
			} else
				cell = new PdfPCell();

			if (!border)
				cell.setBorder(0);
			table.addCell(cell);
		}

		/**
		 * 根据行数生成内容 排列方式为距中
		 */
		for (int i = 0; i < rows; i++) {
			for (int j = 0; j < colwidths.length; j++) {
				String key = "9999999*" + j;
				PdfPCell cell;
				if (element.containsKey(key)) {
					CellProperties cellp = element.get(key);
					if (cellp instanceof DataCellProperties) {
						DataBean db = data.get(i);
						cell = this.getPdfPCell(cellp, db);
					} else
						cell = new PdfPCell(new Phrase(""));
				} else
					cell = new PdfPCell(new Phrase(""));
				if (!border)
					cell.setBorder(0);
				table.addCell(cell);
			}
		}

		// 补充空行
		if (rows < et.getDefaultRow())
			rows = et.getDefaultRow() - data.size();
		else
			rows = 0;

		for (int i = 0; i < rows; i++) {
			for (int j = 0; j < colwidths.length; j++) {
				PdfPCell cell = new PdfPCell(new Phrase(""));
				cell.setFixedHeight(20f);
				if (!border)
					cell.setBorder(0);
				table.addCell(cell);
			}
		}
		table.setSpacingAfter(margin);
		table.setSpacingBefore(margin);
		return table;
	}

	/**
	 * 根据表格属性生成表格
	 * @param tableproperties
	 * @return
	 */
	public PdfPTable createTable(TableProperties tableproperties) {
		int rows = tableproperties.getRow();
		int cols = tableproperties.getCol();
		this.tp = tableproperties;
		ElementTable et = tableproperties.getElementtalbe();

		if (this.tp.getTabletype() == PConstant.freeformtable)
			return this.createFreeTable(rows, cols, et, this.tp.getData().get(0));
		else
			return this.createGridTable(cols, et, this.tp.getData());

	}

	/**
	 * 根据单元格的内的内容，创建并返回单元格 单元格中的内容可以为Image,PdfPTable,Phrase
	 * @param te
	 */
	private PdfPCell getPdfPCell(CellProperties cellp, DataBean db) {
		// 为数据属性时，将对应的数据对象，放到单元格中
		if (cellp instanceof DataCellProperties) {
			DataCellProperties dcp = (DataCellProperties) cellp;
			String fieldname = dcp.getColumnname();
			Method[] methods = db.getClass().getDeclaredMethods();
			try {
				for (int i = 0; i < methods.length; i++) {
					Method method = methods[i];
					String methodname = method.getName();

					if (methodname.substring(3).equalsIgnoreCase(fieldname) && methodname.substring(0, 3).equalsIgnoreCase("get")) {
						Object o = method.invoke(db, new Object[] {});
						dcp.setO(o);
					}
					/*
					 * if (methodname.substring(3).toUpperCase().equals( fieldname.toUpperCase()) && methodname.substring(0, 3).toUpperCase().equals( "GET")) {
					 * Object o = method.invoke(db, new Object[] {}); dcp.setO(o); }
					 */
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return this.getPdfCell(cellp);
	}

	/**
	 * 根据cellproperties生成对应的pdfpcell
	 * @param cellp
	 * @return
	 */
	public PdfPCell getPdfCell(CellProperties cellp) {
		Object element = cellp.getO();
		PdfPCell cell = null;
		float top = margin;
		float bottom = margin;
		float left = margin;
		float right = margin;

		if (element instanceof Image) {
			cell = new PdfPCell((Image) element, true);
		}

		// 图像的时候上下左右边距都为5
		if (element instanceof PdfPTable) {
			cell = new PdfPCell((PdfPTable) element);
			top = 0;
			bottom = 0;
		}

		if (element instanceof Phrase) {
			cell = new PdfPCell((Phrase) element);
		}

		if (element instanceof String)

			cell = new PdfPCell(new Phrase((String) element, cellp.getDefaultfont()));

		if (element instanceof Integer) {
			cell = new PdfPCell(new Phrase(Integer.toString((Integer) element), cellp.getDefaultfont()));
		}

		if (element instanceof Date) {
			Date tmpdate = (Date) element;
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

			cell = new PdfPCell(new Phrase(sdf.format(tmpdate), cellp.getDefaultfont()));
		}

		if (element instanceof Long) {

			cell = new PdfPCell(new Phrase(Long.toString((Long) element), cellp.getDefaultfont()));
		}
		if (cell == null)
			cell = new PdfPCell();

		// 设置文字的上边距及下边距
		cell.setPaddingBottom(bottom);
		cell.setPaddingTop(top);
		cell.setPaddingLeft(left);
		cell.setPaddingRight(right);
		if (!border)
			cell.setBorder(0);
		cell.setHorizontalAlignment(cellp.getHorizontalAlignment());
		cell.setVerticalAlignment(cellp.getVerticalAlignment());
		return cell;
	}

	/**
	 * 读元素表bean，并将内容设置到map中
	 * @param et
	 * @return
	 * @throws IntrospectionException
	 */
	public Map<String, CellProperties> readElementTalbe(ElementTable et) {
		HashMap<String, CellProperties> hm = new HashMap<String, CellProperties>();
		Class<?> classType = et.getClass();
		try {
			Method methods[] = classType.getDeclaredMethods();
			for (int i = 0; i < methods.length; i++) {
				Method method = methods[i];
				String methodname = method.getName();
				if (methodname.substring(0, 3).toUpperCase().equals("GET")) {
					Object o = method.invoke(et, new Object[] {});

					// 只处理TableElement对象
					if (o instanceof CellProperties) {
						CellProperties te = (CellProperties) o;
						int row, col;
						row = te.getRow();
						col = te.getCol();
						hm.put(row + "*" + col, te);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return hm;
	}

	/***
	 * 增加了根据表格发生处理字体的功能，其它如上
	 * @param et
	 * @param tp
	 * @return
	 */
	public Map<String, CellProperties> readElementTalbe(ElementTable et, TableProperties tp) {
		HashMap<String, CellProperties> hm = new HashMap<String, CellProperties>();
		Class<?> classType = et.getClass();
		try {
			Method methods[] = classType.getDeclaredMethods();
			for (int i = 0; i < methods.length; i++) {
				Method method = methods[i];
				String methodname = method.getName();
				if (methodname.substring(0, 3).toUpperCase().equals("GET")) {
					Object o = method.invoke(et, new Object[] {});

					// 只处理TableElement对象
					if (o instanceof CellProperties) {
						CellProperties te = (CellProperties) o;
						te.setDefaultfont(tp.getFont());
						int row, col;
						row = te.getRow();
						col = te.getCol();
						hm.put(row + "*" + col, te);
					}
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return hm;
	}

	public Font createChineseFont(int size, int style) {
		try {
			chineseFont = new Font(BaseFont.createFont("STSong-Light", "UniGB-UCS2-H", BaseFont.NOT_EMBEDDED), size, style);
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return chineseFont;
	}

	/**************************************************************************/
	/** 以下是生成的get/set方法 **/
	public float getRowheight() {
		return rowheight;
	}

	public void setRowheight(float rowheight) {
		this.rowheight = rowheight;
	}

	public boolean isBorder() {
		return border;
	}

	public void setBorder(boolean border) {
		this.border = border;
	}

}
