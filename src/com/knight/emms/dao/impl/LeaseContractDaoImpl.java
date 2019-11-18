/**
 *====================================================
 * 文件名称: LeaseContractDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年8月15日		chengy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.dao.impl;

import org.springframework.stereotype.Repository;

import com.knight.emms.core.dao.BaseBusinessModelDaoImpl;
import com.knight.emms.dao.LeaseContractDao;
import com.knight.emms.model.LeaseContract;

/**
 * @ClassName: LeaseContractDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chengy
 * @date 2017年8月15日 下午5:12:52
 */
@Repository("leaseContractDao")
public class LeaseContractDaoImpl extends BaseBusinessModelDaoImpl<LeaseContract> implements LeaseContractDao {
	
}
