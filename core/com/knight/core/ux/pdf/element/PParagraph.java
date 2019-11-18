package com.knight.core.ux.pdf.element;

import com.itextpdf.text.Paragraph;

/**
 * @ClassName:PParagraph
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-10-11 上午10:57:17
 * @since JDK Version 1.5
 */
public class PParagraph extends PdfObject {

	private Paragraph paragraph;

	public PParagraph(String content) {
		paragraph = new Paragraph(content, this.getDefaultfont());
	}

	public PParagraph(String content, int align) {
		paragraph = new Paragraph(content, this.getDefaultfont());
		paragraph.setAlignment(align);
	}

	public PParagraph(StringBuffer sbcontent) {
		this(sbcontent.toString());
	}

	public Object getObject() {
		paragraph.setSpacingAfter(1);
		paragraph.setSpacingBefore(1);
		return paragraph;
	}

	/**
	 * 返回当前对象的类型
	 */
	@Override
	public int getType() {
		return 2;
	}

}
