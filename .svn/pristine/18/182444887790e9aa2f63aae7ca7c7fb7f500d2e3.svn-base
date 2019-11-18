/**
 *====================================================
 * 文件名称: SchedularFundDomainImpl.java
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
import com.knight.emms.domain.SchedularFundDomain;

/**
 * @ClassName: SchedularFundDomainImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-8-10 下午2:50:08
 */
@Slf4j
public class SchedularFundDomainImpl implements SchedularFundDomain {

	@Resource
	private BaseJDBCDao baseJdbcDao;

	public void amountPayDueToRemind() {
		log.debug("付款/还款 到期提醒(设备按揭/合同付款/合同收款)...");
		String remaindDate = DateUtil.getCurrentLinkDateStr();
		String day = remaindDate.substring(8);
		String sql = SqlScriptBuilder.get("remaind.schedule_instalment_equip_overtime");
		baseJdbcDao.jdbcTemplate().update(sql, remaindDate, day);
		sql = SqlScriptBuilder.get("remaind.schedule_instalment_contract_overtime");
		baseJdbcDao.jdbcTemplate().update(sql, remaindDate);
	}

	public void moneyLendOvertimeRemind() {
		log.debug("借款超期归还提醒...");
		Date preDate = DateUtil.transpositionDate(new Date(), Calendar.DATE, -30);
		String remaindDate = DateUtil.changeDateToStr(preDate, DateUtil.LINK_DISPLAY_DATE);
		String sql = SqlScriptBuilder.get("remaind.schedule_money_lend_overtime");
		baseJdbcDao.jdbcTemplate().update(sql, remaindDate);
	}

}
