/**
 *====================================================
 * 文件名称: SchedularDispatchDomainImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-10			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.domain.impl;

import java.util.Calendar;
import java.util.Date;

import javax.annotation.Resource;

import lombok.extern.slf4j.Slf4j;

import com.knight.core.dao.BaseJDBCDao;
import com.knight.core.script.SqlScriptBuilder;
import com.knight.core.util.DateUtil;
import com.knight.emms.domain.SchedularDispatchDomain;

/**
 * @ClassName: SchedularDispatchDomainImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-8-10 下午5:45:50
 */
@Slf4j
public class SchedularDispatchDomainImpl implements SchedularDispatchDomain {

	@Resource
	private BaseJDBCDao baseJdbcDao;

	public void contractExpireEquipRemaind() {
		log.debug("合同设备租期到期提醒 ...");
		Date preDate = DateUtil.transpositionDate(new Date(), Calendar.DATE, 30);
		String remaindDate = DateUtil.changeDateToStr(preDate, DateUtil.LINK_DISPLAY_DATE);
		String sql = SqlScriptBuilder.get("remaind.schedule_contract_equip_expire");
		baseJdbcDao.jdbcTemplate().update(sql, remaindDate);
	}

	public void contractOvertimeEquipRemaind() {
		log.debug("合同设备租期超过提醒...");
		String remaindDate = DateUtil.getCurrentLinkDateStr();
		String sql = SqlScriptBuilder.get("remaind.schedule_contract_equip_overtime");
		baseJdbcDao.jdbcTemplate().update(sql, remaindDate);
	}

	public void purchaseOvertimeRemaind() {
		log.debug("采购到货时间逾期提醒...");
		String remaindDate = DateUtil.getCurrentLinkDateStr();
		String sql = SqlScriptBuilder.get("remaind.schedule_purchase_overtime");
		baseJdbcDao.jdbcTemplate().update(sql, remaindDate);
	}

	public void borrowExpireRemaind() {
		log.debug("借用归还到期提醒...");
		Date preDate = DateUtil.transpositionDate(new Date(), Calendar.DATE, 30);
		String remaindDate = DateUtil.changeDateToStr(preDate, DateUtil.LINK_DISPLAY_DATE);
		String sql = SqlScriptBuilder.get("remaind.schedule_borrow_expire");
		baseJdbcDao.jdbcTemplate().update(sql, remaindDate);
	}

	public void borrowOvertimeRemaind() {
		log.debug("借用归还逾期提醒...");
		Date preDate = DateUtil.transpositionDate(new Date(), Calendar.DATE, -1);
		String remaindDate = DateUtil.changeDateToStr(preDate, DateUtil.LINK_DISPLAY_DATE);
		String sql = SqlScriptBuilder.get("remaind.schedule_borrow_overtime");
		baseJdbcDao.jdbcTemplate().update(sql, remaindDate);
	}

	@Override
	public void contractFundCategorySwitch() {
		log.debug("结算合同结算类别新老款更新...");
		String sql = SqlScriptBuilder.get("contract.switch_FundCategory");
		baseJdbcDao.jdbcTemplate().update(sql);
	}

}
