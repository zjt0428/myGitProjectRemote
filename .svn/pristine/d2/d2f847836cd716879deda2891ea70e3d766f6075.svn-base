package com.knight.core.ux.pdf.element;

import com.itextpdf.text.Element;
import com.itextpdf.text.Paragraph;

/**
 * 文档的标题性文字，对于标题性文字，默认为居中，字体大小为16 对于标题上下部分的空间为两行，15f
 * @ClassName:PTitle
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-10-11 上午10:58:04
 * @since JDK Version 1.5
 */
public class PTitle extends PdfObject {

	private Paragraph paragraph;

	public PTitle(String content) {
		this.setSize(16);
		paragraph = new Paragraph(content, this.getDefaultfont());
		paragraph.setAlignment(Element.ALIGN_CENTER);
	}

	public PTitle(String content, int align) {
		this.setSize(16);
		paragraph = new Paragraph(content, this.getDefaultfont());
		paragraph.setAlignment(align);
	}

	public PTitle(String content, int align, int size) {
		this.setSize(size);
		paragraph = new Paragraph(content, this.getDefaultfont());
		paragraph.setAlignment(align);
	}

	public PTitle(StringBuffer sbcontent) {
		this(sbcontent.toString());
	}

	public Object getObject() {
		paragraph.setSpacingAfter(15f);
		paragraph.setSpacingBefore(15f);
		return paragraph;
	}

	/**
	 * 返回当前对象的类型为标题
	 */
	@Override
	public int getType() {
		return 4;
	}

}
