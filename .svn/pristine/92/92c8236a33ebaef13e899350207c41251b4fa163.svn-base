/*
 * $Id: PdfObjectt.java  2009-12-20 09:43 lilj $
 * Copyright 2009 by lilj.
 */
package com.knight.core.ux.pdf.element;

import java.io.IOException;

import lombok.extern.slf4j.Slf4j;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.pdf.BaseFont;

/**
 * pdf对象接口
 * @ClassName:PdfObject
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-10-11 上午10:52:33
 * @since JDK Version 1.5
 */
@Slf4j
public abstract class PdfObject {

	/** 缺省字体 */
	private Font defaultfont;

	// 对象的前置距离与后置距离
	private final float spaceafter = 5f;

	private final float spacebef = 5f;

	private int size = 12;

	public PdfObject() {
	}

	public abstract Object getObject();

	/**
	 * 返回当前对象的类型，0为文档，1为表格，2为段落，3为图像，4为标题文字
	 * @return
	 */
	public abstract int getType();

	public Font getDefaultfont() {
		try {
			defaultfont = new Font(BaseFont.createFont("STSong-Light", "UniGB-UCS2-H", BaseFont.NOT_EMBEDDED), size);
		} catch (DocumentException e) {
			log.error("", e);
		} catch (IOException e) {
			log.error("", e);
		}
		return defaultfont;
	}

	public void setDefaultfont(Font defaultfont) {
		this.defaultfont = defaultfont;
	}

	public float getSpaceafter() {
		return spaceafter;
	}

	public float getSpacebef() {
		return spacebef;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

}
