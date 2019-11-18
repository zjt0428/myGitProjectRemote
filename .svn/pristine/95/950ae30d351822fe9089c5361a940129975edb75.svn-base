<%@page import="com.itextpdf.text.log.SysoLogger"%>
<%@page import="java.io.ByteArrayOutputStream"%>
<%@page import="java.io.ObjectOutputStream"%>
<%@page import="java.io.File"%>
<%@page import="java.io.IOException"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Map"%>
<%@page import="java.lang.Number"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="javax.sql.DataSource"%>
<%@page import="org.apache.commons.lang.StringUtils"%>

<%@page import="net.sf.jasperreports.engine.JRExporterParameter"%>
<%@page import="net.sf.jasperreports.engine.JasperFillManager"%>
<%@page import="net.sf.jasperreports.engine.JasperPrint"%>
<%@page import="net.sf.jasperreports.engine.JasperRunManager"%>
<%@page import="net.sf.jasperreports.engine.export.JRHtmlExporter"%>
<%@page import="net.sf.jasperreports.engine.export.JRHtmlExporterParameter"%>
<%@page import="net.sf.jasperreports.engine.export.JRXlsExporter"%>
<%@page import="net.sf.jasperreports.engine.export.JRXlsExporterParameter"%>
<%@page import="net.sf.jasperreports.engine.JasperPrintManager"%>
<%@page import="net.sf.jasperreports.j2ee.servlets.ImageServlet"%>

<%@page import="com.knight.core.ApplicationContextHelper"%>
<%@page import="com.knight.core.filter.ReportFilter"%>
<%@page import="com.knight.emms.constant.ReportConstant"%>

<%@page language="java" contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<%
	request.setCharacterEncoding("utf-8");
	response.setContentType("text/html;charset=utf-8");
	response.setCharacterEncoding("utf-8");
	Map parameters = (new ReportFilter(request)).getVariables();
	String reportType = request.getParameter("reportType");
	String rootPath = application.getRealPath("/report/jasper");//报表模版附件的根目录
	String reportName = request.getParameter("reportName") == null ? "report" : request.getParameter("reportName");
	String jasperFile = ReportConstant.getJasper(request.getParameter("jasper"));
	if (StringUtils.isBlank(jasperFile)) {
		throw new IllegalArgumentException("报表文件未加载...");
	}
	Connection conn = null;
	try {
		DataSource dataSource = (DataSource) ApplicationContextHelper.getBean("dataSource");
		conn = dataSource.getConnection();
		File fullPath = new File(rootPath + "/" + jasperFile);//上传后的报表模板的全路径
		//将解析完的参数传入报表模板中并生成报表
		//如果接收到的参数为pdf类型的话,则生成pdf的报表
		if ("pdf".equals(reportType)) {
			byte[] bytes = JasperRunManager.runReportToPdf(fullPath.getPath(), parameters, conn);
			//设置报表生成类型为PDF
			response.setContentType("application/pdf;charset=utf-8");
			request.setCharacterEncoding("utf-8");
			response.setCharacterEncoding("utf-8");
			response.setContentLength(bytes.length);
			reportName = reportName + ".pdf";
			response.setHeader("Content-Disposition", "attachment;filename=" + new String(reportName.getBytes("GB2312"), "ISO8859-1"));

			ServletOutputStream ouputStream = response.getOutputStream();
			ouputStream.write(bytes, 0, bytes.length);
			ouputStream.flush();
			ouputStream.close();
			conn.close();
			out.clear();
			out = pageContext.pushBody();
		} else if ("xls".equals(reportType)) {
			//如果接受到的参数为xls(excel类型)的话,则生成xls类型的报表
			JRXlsExporter exporter = new JRXlsExporter();
			ByteArrayOutputStream oStream = new ByteArrayOutputStream();
			JasperPrint jasperPrint = JasperFillManager.fillReport(fullPath.getPath(), parameters, conn);
			exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
			exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, oStream);
			exporter.setParameter(JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS, Boolean.TRUE);
			exporter.setParameter(JRXlsExporterParameter.IS_ONE_PAGE_PER_SHEET, Boolean.FALSE);
			exporter.setParameter(JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND, Boolean.FALSE);
			exporter.setParameter(JRXlsExporterParameter.IS_DETECT_CELL_TYPE, Boolean.TRUE);
			exporter.exportReport();
			byte[] bytes = oStream.toByteArray();
			//设置报表生成类型为excel
			response.setContentType("application/vnd.ms-excel");
			request.setCharacterEncoding("utf-8");
			response.setCharacterEncoding("utf-8");
			response.setContentLength(bytes.length);
			reportName = reportName + ".xls";
			response.setHeader("Content-Disposition", "attachment;filename=" + new String(reportName.getBytes("GB2312"), "ISO8859-1"));

			ServletOutputStream ouputStream = response.getOutputStream();
			ouputStream.write(bytes, 0, bytes.length);
			ouputStream.flush();
			ouputStream.close();
			conn.close();
			out.clear();
			out = pageContext.pushBody();
		} else if ("print".equals(reportType)) {
			JasperPrint jasperPrint = JasperFillManager.fillReport(fullPath.getPath(), parameters, conn); // 填充报表数据生成JasperPrint对象 
			JasperPrintManager.printReport(jasperPrint, false); // 直接打印,不用预览PDF直接打印  true为弹出打印机选择.false为直接打印.
			response.setContentType("application/octet-stream");
			ServletOutputStream ouputStream = response.getOutputStream();
			ObjectOutputStream oos = new ObjectOutputStream(ouputStream);
			oos.writeObject(jasperPrint); // 将JasperPrint对象写入对象输出流中              
			oos.flush();
			oos.close();
			ouputStream.flush();
			ouputStream.close();
			conn.close();
		} else {
			//否则生成html类型的报表
			JRHtmlExporter exporter = new JRHtmlExporter();
			ByteArrayOutputStream oStream = new ByteArrayOutputStream();
			JasperPrint jasperPrint = JasperFillManager.fillReport(fullPath.getPath(), parameters, conn);
			//这里也是解决HTML报表图片不显示的
			session.setAttribute(ImageServlet.DEFAULT_JASPER_PRINT_SESSION_ATTRIBUTE, jasperPrint);
			exporter.setParameter(JRHtmlExporterParameter.IS_USING_IMAGES_TO_ALIGN, Boolean.FALSE);
			//下面这一句是解决HTML报表图片不显示的问题，注意URI得写对，这里URI是指jasper文件所在的目录
			exporter.setParameter(JRHtmlExporterParameter.IMAGES_URI, "jasper?image=");
			exporter.setParameter(JRHtmlExporterParameter.JASPER_PRINT, jasperPrint);
			exporter.setParameter(JRHtmlExporterParameter.CHARACTER_ENCODING, "utf-8");
			exporter.setParameter(JRHtmlExporterParameter.OUTPUT_STREAM, oStream);
			exporter.exportReport();
			byte[] bytes = oStream.toByteArray();
			//设置报表生成类型的html
			response.setContentType("text/html;charset=utf-8");
			request.setCharacterEncoding("utf-8");
			response.setCharacterEncoding("utf-8");
			response.setContentLength(bytes.length);
			ServletOutputStream ouputStream = response.getOutputStream();
			ouputStream.write(bytes, 0, bytes.length);
			ouputStream.flush();
			ouputStream.close();
			conn.close();
			out.clear();
			out = pageContext.pushBody();
		}
	} catch (Exception ex) {
		ex.printStackTrace();
	} finally {
		if (conn != null && !conn.isClosed()) {
			try {
				conn.close();
			} catch (Exception e) {
			}
		}
	}
%>

