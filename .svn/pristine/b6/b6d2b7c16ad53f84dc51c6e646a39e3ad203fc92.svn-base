/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: ExportBaseAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-11-28			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.web.action;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.google.gson.reflect.TypeToken;
import com.knight.core.ApplicationEnvironment;
import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.model.ExportField;
import com.knight.core.model.ExportModel;
import com.knight.core.model.ExportStruct;
import com.knight.core.service.ExportService;
import com.knight.core.support.ExcelSupport;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.util.ObjectUtil;
import com.knight.system.service.impl.CodeServiceImpl;

import lombok.Cleanup;
import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: ExportBaseAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-11-28 上午9:15:04
 */
public abstract class ExportBaseAction<T extends ExportModel> extends BaseAction {

	private static final long serialVersionUID = 1L;

	private static final String ERROR_EXPORT_NAME = ExcelSupport.encodeFileName("导出文件错误");

	@Getter
	@Setter
	private HSSFWorkbook workbook;

	protected ExportService getExportService() {
		@SuppressWarnings("unchecked")
		Class<T> model = (Class<T>) ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
		return ApplicationEnvironment.provideExportService(model);
	}

	protected String getUnBaseTypeValue(ExportModel model, Object value, ExportField exportField, int headerIndex) throws Exception {
		return null;
	}

	@Setter
	@Getter
	private String extension = "xls";

	@Setter
	@Getter
	private String contentType = "application/vnd.ms-excel;charset=UTF-8";

	@Setter
	@Getter
	private String filename;

	private String getPredefineUnBaseTypeValue(ExportModel model, ExportField exportField, int headerIndex) throws Exception {
		Object value = exportField.getReadMethod().invoke(model, ObjectUtil.EMPTY_PRAMAS);
		if (value == null) {
			return null;
		}
		if (exportField.getFieldType().equals(Date.class)) {
			String dateValue = getUnBaseTypeValue(model, value, exportField, headerIndex);
			if (dateValue != null) {
				return dateValue;
			}
			return DateUtil.changeDateToStr((Date) value, DateUtil.LINK_DISPLAY_DATE_FULL);
		}
		return getUnBaseTypeValue(model, value, exportField, headerIndex);
	}

	private String parserExportFieldData(ExportModel model, ExportField exportField, int headerIndex) {
		try {
			if (!exportField.isBaseType()) {
				return getPredefineUnBaseTypeValue(model, exportField, headerIndex);
			}
			Object readValue = exportField.getReadMethod().invoke(model, ObjectUtil.EMPTY_PRAMAS);
			if (readValue == null) {
				return null;
			}
			String exportdata = readValue.toString();
			if (!exportField.isCode()) {
				return exportdata;
			}
			Map<String, String> vs = CodeServiceImpl.fastCodeMap(exportField.getCodeId());
			if (vs == null || vs.isEmpty()) {
				return exportdata;
			}
			if (!exportField.isArray()) {
				return vs.get(exportdata);
			}
			String[] codeArray = exportdata.split(",");
			String[] valueArray = new String[codeArray.length];
			for (int i = 0; i < codeArray.length; i++) {
				String value = vs.get(codeArray[i].trim());
				if (value == null) {
					valueArray[i] = codeArray[i];
				} else {
					valueArray[i] = value;
				}
			}
			return StringUtils.join(valueArray, ",");
		} catch (Exception e) {
			logger.error(null, e);
		}
		return null;
	}

	protected List<String[]> getExportFieldData(QueryFilter queryFilter, ExportService exportService, String[] datafields) {
		ExportStruct exportStruct = exportService.getPersistantStruct().getExportStruct();
		List<? extends ExportModel> dataList = exportService.queryExportData(queryFilter);

		List<String[]> content = new ArrayList<String[]>(dataList.size());
		Map<String, ExportField> exportFileds = exportStruct.getExportFileds();
		for (int i = 0; i < dataList.size(); i++) {
			ExportModel c = dataList.get(i);
			String[] data = new String[datafields.length + 1];
			data[0] = (i + 1) + "";
			for (int j = 1; j < data.length; j++) {
				ExportField ef = exportFileds.get(datafields[j - 1]);
				if (ef == null) {
					data[j] = "";
					continue;
				}
				data[j] = parserExportFieldData(c, ef, j);
			}
			content.add(data);
		}
		return content;
	}

	private List<String[]> getExportFieldData(ExportService exportService, String[] datafields) {
		QueryFilter filter = new QueryFilter(getRequest());
		filter.getPagingBean().setStart(0);
		filter.getPagingBean().setPageSize(100000);
		return getExportFieldData(filter, exportService, datafields);
	}

	public String export() {
		workbook = new HSSFWorkbook();
		try {
			ExportService exportService = getExportService();
			ExportStruct exportStruct = exportService.getPersistantStruct().getExportStruct();

			filename = ExcelSupport.encodeFileName(exportStruct.getExportName() + "-" + DateUtil.getCurrentDateStr());
			String[] headers = ("序号," + getRequest().getParameter("headers")).split(",");
			String[] datafields = getRequest().getParameter("datafields").split(",");
			List<String[]> content = getExportFieldData(exportService, datafields);

			HSSFCellStyle[] cellStyles = ExcelSupport.getEquipCellStyle(workbook);
			HSSFSheet sheet = workbook.createSheet(exportStruct.getSheetName());
			sheet.setDefaultColumnWidth(14);
			sheet.setColumnWidth(0, 6 * 256);
			ExcelSupport.createEquipTile(exportStruct.getExportName(), sheet, cellStyles, headers);
			ExcelSupport.createContent(sheet, content, cellStyles[3]);
		} catch (Exception e) {
			filename = ERROR_EXPORT_NAME;
			workbook.createSheet("错误的信息");
			logger.error("", e);
		}
		return EXPORT;
	}

	public InputStream getInputStream() {
		try {
			@Cleanup
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			workbook.write(out);
			return new ByteArrayInputStream(out.toByteArray());
		} catch (Exception e) {
			logger.error("", e);
			throw new BusinessException("文件导出失败!");
		}
	}
	
	public String exportValue() {
//		workbook = new HSSFWorkbook();
//		try {
//			ExportService exportService = getExportService();
//			ExportStruct exportStruct = exportService.getPersistantStruct().getExportStruct();
//
//			filename = ExcelSupport.encodeFileName(exportStruct.getExportName() + "-" + DateUtil.getCurrentDateStr());
//			String[] headers = ("序号," + getRequest().getParameter("headers")).split(",");
//			String[] datafields = getRequest().getParameter("datafields").split(",");
//			String[] values = getRequest().getParameter("values").split("linemark");
////			List<String[]> content = new ArrayList();
////			for(String afw : values){
////				String[] aw= afw.split(",");
////				content.add(aw);
////			}
//			
//			List<String[]> content = getExportFieldDataByValue(values, datafields);
//
//			HSSFCellStyle[] cellStyles = ExcelSupport.getEquipCellStyle(workbook);
//			HSSFSheet sheet = workbook.createSheet(exportStruct.getSheetName());
//			sheet.setDefaultColumnWidth(14);
//			sheet.setColumnWidth(0, 6 * 256);
//			ExcelSupport.createEquipTile(exportStruct.getExportName(), sheet, cellStyles, headers);
//			ExcelSupport.createContent(sheet, content, cellStyles[3]);
//		} catch (Exception e) {
//			filename = ERROR_EXPORT_NAME;
//			workbook.createSheet("错误的信息");
//			logger.error("", e);
//		}
		return EXPORT;
	}
	

	protected List<String[]> getExportFieldDataByValue(String[] values, ExportService exportService, String[] datafields) {
//		ExportStruct exportStruct = exportService.getPersistantStruct().getExportStruct();
		List<String[]> content = new ArrayList();
//		for(String afw : values){
//			String[] aw= afw.split(",");
//			content.add(aw);
//		}
//		List<String[]> content = new ArrayList<String[]>(dataList.size());
//		Map<String, ExportField> exportFileds = exportStruct.getExportFileds();
//		for (int i = 0; i < content.size(); i++) {
//			ExportModel c = content.get(i);
//			String[] data = new String[datafields.length + 1];
//			data[0] = (i + 1) + "";
//			for (int j = 1; j < data.length; j++) {
//				ExportField ef = exportFileds.get(datafields[j - 1]);
//				if (ef == null) {
//					data[j] = "";
//					continue;
//				}
//				data[j] = parserExportFieldData(c, ef, j);
//			}
//			content.add(data);
//		}
		return content;
	}

	public String exportGridData() {
		workbook = new HSSFWorkbook();
		String exportName = getRequest().getParameter("exportName");
		String sheetName = getRequest().getParameter("sheetName");
		String header = getRequest().getParameter("headers");
		String dataList = getRequest().getParameter("dataList");
		
		filename = ExcelSupport.encodeFileName(exportName + "-" + DateUtil.getCurrentDateStr());
		String[] headers = ("序号," + header).split(",");
		List<String[]> content = GsonUtil.fromJson(dataList, new TypeToken<List<String[]>> () {});
		HSSFCellStyle[] cellStyles = ExcelSupport.getEquipCellStyle(workbook);
		HSSFSheet sheet = workbook.createSheet(sheetName);
		sheet.setDefaultColumnWidth(14);
		sheet.setColumnWidth(0, 6 * 256);
		ExcelSupport.createEquipTile(exportName, sheet, cellStyles, headers);
		ExcelSupport.createContent(sheet, content, cellStyles[3]);
		return EXPORT;
	}
}
