package com.knight.core.ux.pdf.element;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

import lombok.extern.slf4j.Slf4j;

import com.itextpdf.text.BadElementException;
import com.itextpdf.text.Image;

/**
 * @ClassName:PImage
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-10-11 上午10:55:34
 * @since JDK Version 1.5
 */
@Slf4j
public class PImage extends PdfObject {

	private static Image image;

	public PImage(String resource) {
		this.getInstance(resource);
	}

	public PImage(URL url) {
		this.getInstance(url);
	}

	public PImage(byte[] imgb) {
		this.getInstance(imgb);
	}

	public Image getInstance(byte[] imgb) {

		try {
			image = Image.getInstance(imgb);
		} catch (BadElementException e) {
			log.error("", e);
		} catch (MalformedURLException e) {
			log.error("", e);
		} catch (IOException e) {
			log.error("", e);
		}

		return image;
	}

	public Image getInstance(URL url) {
		try {
			image = Image.getInstance(url);
		} catch (BadElementException e) {
			log.error("", e);
		} catch (MalformedURLException e) {
			log.error("", e);
		} catch (IOException e) {
			log.error("", e);
		}

		return image;
	}

	public Image getInstance(String resource) {
		try {
			image = Image.getInstance(resource);
		} catch (BadElementException e) {
			log.error("", e);
		} catch (MalformedURLException e) {
			log.error("", e);
		} catch (IOException e) {
			log.error("", e);
		}

		return image;
	}

	public Object getObject() {
		image.setSpacingAfter(this.getSpaceafter());
		image.setSpacingBefore(this.getSpacebef());
		return image;
	}

	/**
	 * 返回当前对象的类型
	 */
	@Override
	public int getType() {
		return 3;
	}

}
