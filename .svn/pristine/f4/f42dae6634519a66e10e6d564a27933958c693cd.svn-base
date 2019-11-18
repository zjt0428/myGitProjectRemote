/**
 * 版权所有：小鱼
 * Copyright 2012 QQ 258787785
 * All right reserved. 
 *====================================================
 * 文件名称: ExcelSupport.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-11-23			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.support;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.util.CellRangeAddress;

/**
 * @ClassName: ExcelSupport
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-11-23 下午4:25:07
 */
public class ExcelSupport {

	private static short title_font_size = (short) 14;

	private static short text_font_size = (short) 11;

	private static HSSFCellStyle getCellStyleBorder(HSSFWorkbook workbook, short font_bold, short font_size, short border_size) {
		HSSFFont font = workbook.createFont();
		font.setBoldweight(font_bold);
		font.setFontHeightInPoints((short) 10);

		HSSFCellStyle cellStyle = workbook.createCellStyle();
		cellStyle.setFont(font);
		cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

		cellStyle.setBorderBottom(border_size);
		cellStyle.setBorderLeft(border_size);
		cellStyle.setBorderRight(border_size);
		cellStyle.setBorderTop(border_size);
		return cellStyle;
	}

	public static HSSFCellStyle[] getEquipCellStyle(HSSFWorkbook workbook) {
		HSSFCellStyle titlCellStyle = getCellStyleBorder(workbook, HSSFFont.BOLDWEIGHT_BOLD, title_font_size, (short) 2);

		HSSFCellStyle cellStyle0 = getCellStyleBorder(workbook, HSSFFont.BOLDWEIGHT_NORMAL, text_font_size, (short) 1);
		cellStyle0.setFillForegroundColor(IndexedColors.PALE_BLUE.getIndex());
		cellStyle0.setFillPattern(CellStyle.SOLID_FOREGROUND);

		HSSFCellStyle cellStyle1 = getCellStyleBorder(workbook, HSSFFont.BOLDWEIGHT_NORMAL, text_font_size, (short) 1);
		cellStyle1.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
		cellStyle1.setFillPattern(CellStyle.SOLID_FOREGROUND);

		HSSFCellStyle cellStyle2 = getCellStyleBorder(workbook, HSSFFont.BOLDWEIGHT_NORMAL, text_font_size, (short) 1);

		return new HSSFCellStyle[] { titlCellStyle, cellStyle0, cellStyle1, cellStyle2 };
	}

	public static void createEquipTile(String title, HSSFSheet sheet, HSSFCellStyle[] cellStyles, String[] headers) {
		HSSFRow row = sheet.createRow(0);
		row.setHeightInPoints(24);
		for (int i = 0; i < headers.length; i++) {
			row.createCell(i).setCellStyle(cellStyles[0]);
		}
		// 设置表头
		HSSFCell cell = row.getCell(0);
		cell.setCellType(HSSFCell.CELL_TYPE_STRING);
		cell.setCellValue(title);
		sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, headers.length - 1));

		row = sheet.createRow(1);
		for (int i = 0; i < headers.length; i++) {
			cell = row.createCell(i);
			cell.setCellType(HSSFCell.CELL_TYPE_STRING);
			cell.setCellStyle(cellStyles[1]);
			cell.setCellValue(headers[i]);
		}
	}

	public static void createContent(HSSFSheet sheet, List<String[]> list, HSSFCellStyle style) {
		for (int i = 0; i < list.size(); i++) {
			String[] values = list.get(i);
			HSSFRow row = sheet.createRow(i + 2);
			for (int j = 0; j < values.length; j++) {
				HSSFCell cell = row.createCell(j);
				cell.setCellStyle(style);
				cell.setCellType(HSSFCell.CELL_TYPE_STRING);
				cell.setCellValue(values[j]);
			}
		}
	}

	public static String encodeFileName(String exportname) {
		try {
			return URLEncoder.encode(exportname, "UTF-8");
		} catch (UnsupportedEncodingException e) {
		}
		return "exportFile";
	}

}
