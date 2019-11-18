package com.knight.emms.dao.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.knight.core.HibernateConfigurationHelper;
import com.knight.core.exception.BusinessException;
import com.knight.core.util.DateUtil;
import com.knight.emms.core.dao.BaseBusinessModelDaoImpl;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.emms.dao.LostCompensationDao;
import com.knight.emms.model.LostCompensation;

public class LostCompensationDaoImpl extends BaseBusinessModelDaoImpl<LostCompensation> implements LostCompensationDao {

	@Override
	public String serialAutoIncrement() {
		String lostSerial = "";
		SerialNumberStrategy strategy = persistType.getAnnotation(SerialNumberStrategy.class);
		if (strategy == null) {
			throw new java.lang.IllegalArgumentException("未定义编号规则!");
		}
		String preSerial = strategy.strategy().replace("{yyyyMMdd}", DateUtil.getCurrentDateStr());
		List<Map<String, Object>> list = queryByScript("materials.latest_lostSerial", preSerial);
		if(list.size()>0) {
			String latestSerial = list.get(0).get("LOST_SERIAL").toString();
			String[] strs = latestSerial.split(preSerial);
			int num = Integer.valueOf(strs[1])+1;
			if(num>strategy.maxseq()) {
				throw new BusinessException("序列号生成已达最大值" + strategy.maxseq() + ",无法继续生成编号,请改期录入!");
			}else{
				lostSerial = preSerial+StringUtils.leftPad(num + "", (strategy.maxseq() + "").length(), "0");
			}
		}else{
			lostSerial = preSerial+StringUtils.leftPad( "1", (strategy.maxseq() + "").length(), "0");
		}
		return lostSerial;
	}
	
	@Override
	public String createNextSerial(LostCompensation t) {
			SerialNumberStrategy strategy = persistType.getAnnotation(SerialNumberStrategy.class);
			if (strategy == null) {
				throw new java.lang.IllegalArgumentException("未定义编号规则!");
			}
			String compensationDate = t.getCompensationDate();
			String[] strArr = compensationDate.split("-");
			Integer year;
			Integer month;
			Integer day;
			String dateStr = "";
			if(strArr.length>0) {
				year = Integer.valueOf(strArr[0]);
				month = Integer.valueOf(strArr[1]);
				day = Integer.valueOf(strArr[2]);
			}else{
				throw new BusinessException("【丢失赔偿日期】取值异常！");
			}
			if(day>=21){
				month = month+1;
			}
			if(month>12){
				year = year+1;
				month = 1;
			}
			if(month<10){
				dateStr = year.toString()+"0"+month.toString();
			}else{
				dateStr = year.toString()+month.toString();
			}
			
			String preSerial = strategy.strategy().replace("{yyyyMM}", dateStr);
			String tableName = HibernateConfigurationHelper.getTableName(persistType);
			String serialName = HibernateConfigurationHelper.getColumnName(persistType, strategy.name());
			String sql = "SELECT MAX(" + serialName + ") FROM " + tableName + " WHERE " + serialName + " LIKE ?";
			String serial = this.jdbcTemplate.queryForObject(sql, String.class, preSerial + "%");
			int seq = 1;
			if (serial != null) {
				seq = Integer.parseInt(serial.replace(preSerial, "")) + 1;
				if (seq > strategy.maxseq()) {
					throw new BusinessException("序列号生成已达最大值" + strategy.maxseq() + ",无法继续生成编号,请改期录入!");
				}
			}
			return preSerial + StringUtils.leftPad(seq + "", (strategy.maxseq() + "").length(), "0");
		}
		
}
