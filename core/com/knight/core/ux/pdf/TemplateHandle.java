package com.knight.core.ux.pdf;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.AcroFields;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfCopy;
import com.itextpdf.text.pdf.PdfCopyFields;
import com.itextpdf.text.pdf.PdfImportedPage;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import com.itextpdf.text.pdf.PdfWriter;
import com.knight.core.ux.pdf.element.DataBean;

/**
 * 根据模板处理数据 原理：存在已定义好的模板文件，要向模板文件中写入数据，
 * 定义一javabean，javabean中的变量名要求与模板中TEXTfield的一致
 * 
 * @author lilj
 * 
 */
public class TemplateHandle {

	/**
	 * 根据一组databean，生成一个pdf 生成方法，是将多个pdf合并
	 * 
	 * @param templatefile
	 * @param destfile
	 * @param databean
	 * @return
	 * @throws IOException
	 * @throws DocumentException
	 */
	public void getPdfFile(String templatefile, String destpath,
			String destfilename, List<DataBean> databean) throws IOException,
			DocumentException {
		String filename = destpath + "/" + destfilename;
		Document document = new Document();
		PdfCopy copy = new PdfCopy(document, new FileOutputStream(filename));
		document.open();
		for (int i = 0; i < databean.size(); i++) {
			String tmppdffile = destpath + "/tmp_" + destfilename;
			this.getPdfFile(templatefile, tmppdffile, databean.get(i));
			PdfReader reader = new PdfReader(tmppdffile);
			int n = reader.getNumberOfPages();
			for (int j = 1; j <= n; j++) {
				document.newPage();
				PdfImportedPage page = copy.getImportedPage(reader, j);
				copy.addPage(page);
			}
		}

		// 删除临时文件
		File file = new File(destpath + "/tmp_" + destfilename);
		if (file.exists())
			file.delete();

		document.close();
	}

	/**
	 * 根据一个databean,处理一个pdf文件，
	 * 
	 * @param templatefile
	 * @param destfile
	 * @param databean
	 * @return
	 * @throws IOException
	 * @throws DocumentException
	 */
	public void getPdfFile(String templatefile, String destfile,
			DataBean databean) throws IOException, DocumentException {

		String TemplatePDF = templatefile;

		PdfReader reader = new PdfReader(TemplatePDF);

		PdfStamper stamper = new PdfStamper(reader, new FileOutputStream(
				destfile));

		AcroFields form = stamper.getAcroFields();

		DataBean db = databean;
		List<String> fieldnames = this.getFieldName(db);

		for (int i = 0; i < fieldnames.size(); i++) {
			String tmpname = fieldnames.get(i).toLowerCase();
			String value = this.getFieldValue(tmpname, db);
			form.setField(tmpname, value);
		}

		stamper.setFormFlattening(true);
		stamper.close();
	}

	/**
	 * 根据一组Databean生成pdf文件 不同的list组，可以应用不同的模板
	 * 
	 * @param mapbean
	 *            存储指定类型的一组Databean,第一个参数为Databean对应的模板参数值
	 * @param templatefile
	 *            存储一组模板文件与mapbean中的databean对应
	 * @param destfilename
	 *            目标文件名
	 * @param destpah
	 *            目标路径
	 * @throws DocumentException
	 * @throws IOException
	 */
	public void getPdfFile(Map<String, List<DataBean>> mapbean, Map<String, String> maptemplatefile, String destfilename, String destpath) throws IOException,
			DocumentException {
		Iterator<?> iterator = mapbean.keySet().iterator();
		String[] files = new String[mapbean.keySet().size()];
		Integer i = 0;
		while (iterator.hasNext()) {
			String key = iterator.next().toString();
			List<DataBean> db = mapbean.get(key);
			String templatefile = maptemplatefile.get(key);
			this.getPdfFile(templatefile, destpath, "tmp_" + i + ".pdf", db);
			files[i] = destpath + "/tmp_" + i + ".pdf";
			i++;
		}
		this.mergePdfFiles(files, destpath + "/" + destfilename);

		// 删除临时文件
		i = 0;
		while (iterator.hasNext()) {
			File file = new File(destpath + "/tmp_" + i + ".pdf");
			if (file.exists())
				file.delete();
			i++;
		}
	}

	private String getFieldValue(String fieldname, DataBean db) {
		String value = "";
		Method[] methods = db.getClass().getDeclaredMethods();

		for (int i = 0; i < methods.length; i++) {
			String methodname = methods[i].getName();
			if (methodname.substring(0, 3).toUpperCase().equals("GET") && methodname.substring(3).toUpperCase().equals(fieldname.toUpperCase())) {
				Method method = methods[i];
				try {
					Object o = method.invoke(db, new Object[] {});
					if (o == null)
						value = "";
					else {
						if (o instanceof Date) {
							Date tmpdate = (Date) o;
							SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
							value = sdf.format(tmpdate);

						} else
							value = o.toString();
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return value;
	}

	/**
	 * 根据数据bean得到pdf中要写入的textfield的名字
	 * @param db
	 * @return
	 */
	private List<String> getFieldName(DataBean db) {
		List<String> fieldnames = new ArrayList<String>();
		Field[] fields = db.getClass().getDeclaredFields();
		for (int i = 0; i < fields.length; i++) {
			String tmpname = fields[i].getName();
			fieldnames.add(tmpname);
		}
		return fieldnames;
	}

	/**
	 * 合并文件
	 * @param files
	 *            源文件组合
	 * @param savepath
	 *            目标文件路径
	 */
	public void mergePdfFiles(String[] files, String savepath) {
		try {
			Document document = new Document(new PdfReader(files[0]).getPageSize(1));
			PdfCopy copy = new PdfCopy(document, new FileOutputStream(savepath));
			document.open();
			for (int i = 0; i < files.length; i++) {
				PdfReader reader = new PdfReader(files[i]);
				int n = reader.getNumberOfPages();
				for (int j = 1; j <= n; j++) {
					document.newPage();
					PdfImportedPage page = copy.getImportedPage(reader, j);
					copy.addPage(page);
				}
			}
			document.close();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		}
	}

	public void mergePdfFiles(List<String> files, String savepath) {
		if (files.size() <= 0)
			return;
		try {
			Document document = new Document(new PdfReader(files.get(0)).getPageSize(1));
			PdfCopy copy = new PdfCopy(document, new FileOutputStream(savepath));
			document.open();
			for (int i = 0; i < files.size(); i++) {
				PdfReader reader = new PdfReader(files.get(i));
				int n = reader.getNumberOfPages();
				for (int j = 1; j <= n; j++) {
					document.newPage();
					PdfImportedPage page = copy.getImportedPage(reader, j);
					copy.addPage(page);
				}
			}
			document.close();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		}
	}
	
    @SuppressWarnings("unused")
	private void mergePdfFiles1(String[] files, String savepath) {

		try {
			PdfReader reader3 = new PdfReader(files[0]);
			reader3.consolidateNamedDestinations();

			PdfReader reader4 = new PdfReader(files[1]);
			PdfCopyFields copy2 = new PdfCopyFields(new FileOutputStream(
					savepath));
			copy2.setFullCompression();
			copy2.addDocument(reader3);
			copy2.addDocument(reader4);
			copy2.close();
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		/*
		 * try { Document document = new Document(new PdfReader(files[0])
		 * .getPageSize(1)); PdfCopy copy = new PdfCopy(document, new
		 * FileOutputStream(savepath)); document.open(); PdfReader reader = new
		 * PdfReader(files[0]); copy.newPage(); //PdfImportedPage page =
		 * copy.getImportedPage(reader, 1); //copy.addPage(page);
		 * 
		 * //PdfReader reader1 = new PdfReader(files[1]); //OutputStream output
		 * = new FileOutputStream(files[1]); //PdfCopyFields copy1 = new
		 * PdfCopyFields(output);
		 * 
		 * PdfAcroForm acroform = copy.getAcroForm();
		 * 
		 * //PRIndirectReference pp = new PRIndirectReference(reader1,1);
		 * //PRAcroForm acform1 = copy.getAcroForm();
		 * acroform.addSignature("asdfasdfasdf", 12, 12, 12, 12);
		 * //copy1.addDocument(reader); document.close(); } catch (IOException
		 * e) { e.printStackTrace(); } catch (DocumentException e) {
		 * e.printStackTrace(); }
		 */
	}
    
    @SuppressWarnings("unused")
	private void mergePdfFiles2(String files[]) {
		try {
			int pages = Integer.parseInt(files[2]);

			if (pages < 2 || pages > 8) {
				throw new DocumentException("You can't have " + pages
						+ " pages on one page (minimum 2; maximum 8).");
			}

			float x1 = 30f;
			float x2 = 280f;
			float x3 = 320f;
			float x4 = 565f;

			float[] y1 = new float[pages];
			float[] y2 = new float[pages];

			float height = (778f - (20f * (pages - 1))) / pages;
			y1[0] = 812f;
			y2[0] = 812f - height;

			for (int i = 1; i < pages; i++) {
				y1[i] = y2[i - 1] - 20f;
				y2[i] = y1[i] - height;
			}

			// we create a reader for a certain document
			PdfReader reader = new PdfReader(files[0]);
			// we retrieve the total number of pages
			int n = reader.getNumberOfPages();
			System.out.println("There are " + n
					+ " pages in the original file.");

			// step 1: creation of a document-object
			Document document = new Document(PageSize.A4);
			// step 2: we create a writer that listens to the document
			PdfWriter writer = PdfWriter.getInstance(document,
					new FileOutputStream(files[1]));
			// step 3: we open the document
			document.open();
			PdfContentByte cb = writer.getDirectContent();
			PdfImportedPage page;
			int rotation;
			int i = 0;
			int p = 0;
			// step 4: we add content
			while (i < n) {
				i++;
				Rectangle rect = reader.getPageSizeWithRotation(i);
				float factorx = (x2 - x1) / rect.getWidth();
				float factory = (y1[p] - y2[p]) / rect.getHeight();
				float factor = (factorx < factory ? factorx : factory);
				float dx = (factorx == factor ? 0f : ((x2 - x1) - rect
						.getWidth()
						* factor) / 2f);
				float dy = (factory == factor ? 0f : ((y1[p] - y2[p]) - rect
						.getHeight()
						* factor) / 2f);
				page = writer.getImportedPage(reader, i);
				rotation = reader.getPageRotation(i);
				if (rotation == 90 || rotation == 270) {
					cb.addTemplate(page, 0, -factor, factor, 0, x1 + dx, y2[p]
							+ dy + rect.getHeight() * factor);
				} else {
					cb.addTemplate(page, factor, 0, 0, factor, x1 + dx, y2[p]
							+ dy);
				}
				cb.setRGBColorStroke(0xC0, 0xC0, 0xC0);
				cb.rectangle(x3 - 5f, y2[p] - 5f, x4 - x3 + 10f, y1[p] - y2[p]
						+ 10f);
				for (float l = y1[p] - 19; l > y2[p]; l -= 16) {
					cb.moveTo(x3, l);
					cb.lineTo(x4, l);
				}
				cb.rectangle(x1 + dx, y2[p] + dy, rect.getWidth() * factor,
						rect.getHeight() * factor);
				cb.stroke();
				System.out.println("Processed page " + i);
				p++;
				if (p == pages) {
					p = 0;
					document.newPage();
				}
			}
			// step 5: we close the document
			document.close();
		} catch (Exception e) {
			System.err.println(e.getClass().getName() + ": " + e.getMessage());
		}
	}
}
