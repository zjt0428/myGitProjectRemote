/**
 *====================================================
 * 文件名称: Review.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月25日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.Date;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;

/**
 * @ClassName: Review
 * @Description: 评论
 * @author chenxy
 * @date 2014年10月25日 下午9:40:19
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
public class Review extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long reviewId;

	private Long relateId;

	private String relateModule;

	@Expose
	private String content;

	@Expose
	private Date reviewTime;
	
	@Expose
	private Long score;
	
	@Expose
	private Long userId;

	@Expose
	private String userName;

	@Expose
	private Review review;

}
