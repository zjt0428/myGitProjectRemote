package com.knight.emms.dao.impl;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.knight.core.exception.BusinessException;
import com.knight.core.util.DateUtil;
import com.knight.emms.core.dao.BaseBusinessModelDaoImpl;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.emms.dao.LeasedLostCompensationDao;
import com.knight.emms.model.LeasedLostCompensation;

public class LeasedLostCompensationDaoImpl extends BaseBusinessModelDaoImpl<LeasedLostCompensation> implements LeasedLostCompensationDao {

	@Override
	public String serialAutoIncrement() {
		String lostSerial = "";
		SerialNumberStrategy strategy = persistType.getAnnotation(SerialNumberStrategy.class);
		if (strategy == null) {
			throw new java.lang.IllegalArgumentException("未定义编号规则!");
		}
		String preSerial = strategy.strategy().replace("{yyyyMMdd}", DateUtil.getCurrentDateStr());
		List<Map<String, Object>> list = queryByScript("materials.leased_latest_lostSerial", preSerial);
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

}
