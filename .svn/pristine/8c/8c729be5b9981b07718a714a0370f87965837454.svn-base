/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: SimpleCaptchaServlet.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.web.servlet;

import static nl.captcha.Captcha.NAME;

import java.awt.Color;
import java.awt.Font;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import nl.captcha.Captcha;
import nl.captcha.Captcha.Builder;
import nl.captcha.backgrounds.GradiatedBackgroundProducer;
import nl.captcha.gimpy.BlockGimpyRenderer;
import nl.captcha.gimpy.DropShadowGimpyRenderer;
import nl.captcha.servlet.CaptchaServletUtil;
import nl.captcha.text.producer.ChineseTextProducer;
import nl.captcha.text.producer.DefaultTextProducer;
import nl.captcha.text.renderer.DefaultWordRenderer;
import nl.captcha.text.renderer.WordRenderer;

/**
 * 扩展默认的simpleCaptcha
 * @ClassName:SimpleCaptchaServlet
 * @Description:TODO(扩展默认的simpleCaptcha)
 * @author:chenxy
 * @date 2011-8-24 上午9:56:59
 * @since JDK Version 1.5
 */
public class SimpleCaptchaServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private static final String PARAM_HEIGHT = "height"; // 高度 默认为50

	private static final String PARAM_WIDTH = "width";// 宽度 默认为200

	private static final String PAEAM_NOISE = "noise";// 干扰线条 默认是没有干扰线条

	private static final String PAEAM_TEXT = "text";// 文本

	protected int _width = 200;

	protected int _height = 50;

	protected boolean _noise = false;

	protected String _text = null;

	/** 初始化过滤器.将配置文件的参数文件赋值 */
	public void init() throws ServletException {
		if (getInitParameter(PARAM_HEIGHT) != null) {
			this._height = Integer.valueOf(getInitParameter(PARAM_HEIGHT)).intValue();
		}

		if (getInitParameter(PARAM_WIDTH) != null) {
			this._width = Integer.valueOf(getInitParameter(PARAM_WIDTH)).intValue();
		}

		if (getInitParameter(PAEAM_NOISE) != null) {
			_noise = Boolean.valueOf(getInitParameter(PAEAM_NOISE));
		}

		if (getInitParameter(PAEAM_NOISE) != null) {
			_text = String.valueOf(getInitParameter(PAEAM_TEXT));
		}
	}

	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		Builder builder = new Captcha.Builder(_width, _height);
		// 增加边框
		builder.addBorder();
		// 是否增加干扰线条
		if (_noise == true) {
			builder.addNoise();
		}
		// ----------------自定义字体大小-----------
		// 自定义设置字体颜色和大小 最简单的效果 多种字体随机显示
		List<Font> fontList = new ArrayList<Font>();
		fontList.add(new Font("Arial", Font.HANGING_BASELINE, 40));// 可以设置斜体之类的
		fontList.add(new Font("Courier", Font.BOLD, 40));
		DefaultWordRenderer dwr = new DefaultWordRenderer(Color.green, fontList);

		// 加入多种颜色后会随机显示字体空心
//		List<Color> colorList = new ArrayList<Color>();
//		colorList.add(Color.green);
//		colorList.add(Color.white);
//		colorList.add(Color.blue);
//		ColoredEdgesWordRenderer cwr = new ColoredEdgesWordRenderer(colorList, fontList);

		WordRenderer wr = dwr;
		// 增加文本，默认为5个随机字符.
		if (_text == null) {
			builder.addText();
		} else {
			String[] ts = _text.split(",");
			for (int i = 0; i < ts.length; i++) {
				String[] ts1 = ts[i].split(":");
				if ("chinese".equals(ts1[0])) {
					builder.addText(new ChineseTextProducer(Integer.parseInt(ts1[1])), wr);
				} else if ("number".equals(ts1[0])) {
					// 这里没有0和1是为了避免歧义 和字母I和O
					char[] numberChar = new char[] { '2', '3', '4', '5', '6', '7', '8' };
					builder.addText(new DefaultTextProducer(Integer.parseInt(ts1[1]), numberChar), wr);
				} else if ("word".equals(ts1[0])) {
					// 原理同上
					char[] numberChar = new char[] { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'k', 'm', 'n', 'p', 'r', 'w', 'x', 'y' };
					builder.addText(new DefaultTextProducer(Integer.parseInt(ts1[1]), numberChar), wr);
				} else {
					builder.addText(new DefaultTextProducer(Integer.parseInt(ts1[1])), wr);
				}
			}

		}

		// --------------添加背景-------------
		// 设置背景渐进效果 以及颜色 form为开始颜色，to为结束颜色
		GradiatedBackgroundProducer gbp = new GradiatedBackgroundProducer();
		gbp.setFromColor(Color.yellow);
		gbp.setToColor(Color.red);
		// 无渐进效果，只是填充背景颜色
//		FlatColorBackgroundProducer fbp = new FlatColorBackgroundProducer(Color.red);
		// 加入网纹--一般不会用
//		SquigglesBackgroundProducer sbp = new SquigglesBackgroundProducer();
		// 没发现有什么用,可能就是默认的
//		TransparentBackgroundProducer tbp = new TransparentBackgroundProducer();

		builder.addBackground(gbp);
		// ---------装饰字体---------------
		// 字体边框齿轮效果 默认是3
		builder.gimp(new BlockGimpyRenderer(1));
		// 波纹渲染 相当于加粗
//		builder.gimp(new RippleGimpyRenderer());
		// 修剪--一般不会用
//		builder.gimp(new ShearGimpyRenderer(Color.red));
		// 加网--第一个参数是横线颜色，第二个参数是竖线颜色
//		builder.gimp(new FishEyeGimpyRenderer(Color.red, Color.yellow));
		// 加入阴影效果 默认3，75
		builder.gimp(new DropShadowGimpyRenderer());
		// 创建对象
		Captcha captcha = builder.build();

		CaptchaServletUtil.writeImage(resp, captcha.getImage());
		req.getSession().setAttribute(NAME, captcha);

	}

}
