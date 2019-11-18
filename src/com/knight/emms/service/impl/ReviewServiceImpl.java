/**
 *====================================================
 * 文件名称: ReviewServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月25日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import com.knight.emms.dao.ReviewDao;
import com.knight.emms.model.Review;
import com.knight.emms.service.ReviewService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

/**
 * @ClassName: ReviewServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014年10月25日 下午9:49:09
 */
public class ReviewServiceImpl extends BusinessLongPKServiceImpl<Review> implements ReviewService {

	public ReviewServiceImpl(ReviewDao dao) {
		super(dao);
	}

}
