package com.knight.core.ux.pdf.element;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.List;

import lombok.extern.slf4j.Slf4j;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * 生成pdf文档
 * @ClassName:PDocument
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-10-11 上午10:54:11
 * @since JDK Version 1.5
 */
@Slf4j
public class PDocument extends PdfObject {

	// 默认的pdf左右边距
	private final float margin = 30f;

	// 默认的pdf上下边距
	private final float tbmargin = 30f;

	private float leftmargin = margin;

	private float rightmargin = margin;

	private float topmargin = tbmargin;

	private float bottommargin = tbmargin;

	private Document document;

	private String title = "";

	private String keyword = "";

	private String author = "";

	private String subject = "";

	private Rectangle rect;

	private boolean rotate = true;

	private List<PdfObject> datalist;

	private String filename;

	public PDocument(List<PdfObject> datalist, String filename) {
		try {
			this.genDocument(datalist, filename);
		} catch (FileNotFoundException e) {
			log.error("", e);
		} catch (DocumentException e) {
			log.error("", e);
		}
	}

	public void createDocument() {
		try {
			this.genDocument(datalist, filename);
		} catch (FileNotFoundException e) {
			log.error("", e);
		} catch (DocumentException e) {
			log.error("", e);
		}
	}

	public PDocument() {
	}

	/**
	 * @param title
	 * @param subject
	 * @param keyword
	 * @param author
	 */
	public PDocument(String title, String subject, String keyword, String author) {
		this.title = title;
		this.subject = subject;
		this.keyword = keyword;
		this.author = author;
	}

	/**
	 * @param rect
	 * @param rotate
	 */
	public PDocument(Rectangle rect, boolean rotate) {
		this.rect = rect;
		this.rotate = rotate;
	}

	/**
	 * @param title
	 * @param keyword
	 * @param author
	 * @param subject
	 * @param rect
	 * @param rotate
	 */
	public PDocument(String title, String keyword, String author, String subject, Rectangle rect, boolean rotate) {
		super();
		this.title = title;
		this.keyword = keyword;
		this.author = author;
		this.subject = subject;
		this.rect = rect;
		this.rotate = rotate;
	}

	/**
	 * @param datas
	 * @param filename
	 * @throws DocumentException
	 * @throws FileNotFoundException
	 */
	private void genDocument(List<PdfObject> datas, String filename) throws DocumentException, FileNotFoundException {

		if (rect == null)
			rect = PageSize.A4;

		if (!rotate)
			document = new Document(rect.rotate());
		else
			document = new Document(rect);
		PdfWriter.getInstance(document, new FileOutputStream(filename));

		document.setMargins(leftmargin, rightmargin, topmargin, bottommargin);

		// HeaderFooter footer = new HeaderFooter(new Phrase("页脚  ",this.getDefaultfont()),true);
		// HeaderFooter header = new HeaderFooter(new Phrase("页眉 ",this.getDefaultfont()),new Phrase("ttt",this.getDefaultfont()));

		// footer.setAlignment(2);
		// footer.setBorder(0);

		// header.setBorder(0);
		// header.setAlignment(0);

		// document.setFooter(footer);
		// document.setFooter(header);

		/**
		 * 设置pdf文件的状态属性
		 */
		document.addAuthor(author);
		document.addCreationDate();
		document.addKeywords(keyword);
		document.addProducer();
		document.addTitle(title);
		document.addSubject(subject);

		document.open();
		for (int i = 0; i < datas.size(); i++) {
			PdfObject element = datas.get(i);
			this.add(element);
		}

		document.close();
	}

	private void add(PdfObject element) throws DocumentException {
		int type = element.getType();
		Object o = element.getObject();
		switch (type) {
		case 0:
			break;
		case 2:
			Paragraph ep = (Paragraph) o;
			document.add(ep);
			break;
		case 1:
			PdfPTable ept = (PdfPTable) o;
			ept.setSpacingAfter(0);
			ept.setSpacingBefore(0);
			document.add(ept);
			break;
		case 3:
			Image ei = (Image) o;
			ei.scaleToFit(this.getWH(true), this.getWH(true));
			document.add(ei);
			break;
		case 4:
			Paragraph et = (Paragraph) o;
			document.add(et);
			break;
		}
	}

	/**
	 * @param width
	 * @return
	 */
	private float getWH(boolean width) {
		float tmpwh = 0f;

		Rectangle rect = document.getPageSize();

		tmpwh = rect.getRight() - rect.getLeft() - 2 * margin;

		return tmpwh;

	}

	@Override
	public Object getObject() {
		return document;
	}

	/**
	 * 返回当前对象的类型
	 */
	@Override
	public int getType() {
		return 0;
	}

	public float getLeftmargin() {
		return leftmargin;
	}

	public void setLeftmargin(float leftmargin) {
		this.leftmargin = leftmargin;
	}

	public float getRightmargin() {
		return rightmargin;
	}

	public void setRightmargin(float rightmargin) {
		this.rightmargin = rightmargin;
	}

	public float getTopmargin() {
		return topmargin;
	}

	public void setTopmargin(float topmargin) {
		this.topmargin = topmargin;
	}

	public float getBottommargin() {
		return bottommargin;
	}

	public void setBottommargin(float bottommargin) {
		this.bottommargin = bottommargin;
	}

	public Document getDocument() {
		return document;
	}

	public void setDocument(Document document) {
		this.document = document;
	}

	public float getMargin() {
		return margin;
	}

	public float getTbmargin() {
		return tbmargin;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public Rectangle getRect() {
		return rect;
	}

	public void setRect(Rectangle rect) {
		this.rect = rect;
	}

	public boolean isRotate() {
		return rotate;
	}

	public void setRotate(boolean rotate) {
		this.rotate = rotate;
	}

	public List<PdfObject> getDatalist() {
		return datalist;
	}

	public void setDatalist(List<PdfObject> datalist) {
		this.datalist = datalist;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

}
