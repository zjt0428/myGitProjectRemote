/**
 *====================================================
 * 文件名称: BaseBusinessModelDaoImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-7			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.core.dao;

import java.text.MessageFormat;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.knight.core.HibernateConfigurationHelper;
import com.knight.core.dao.impl.BaseLongPKDaoImpl;
import com.knight.core.exception.BusinessException;
import com.knight.core.util.DateUtil;
import com.knight.emms.core.BusinessModel;
import com.knight.emms.core.model.SerialNumberStrategy;
import com.knight.emms.model.ContractMaterials;
import com.knight.emms.model.LeaseContract;

/**
 * @ClassName: BaseBusinessModelDaoImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-7 上午7:08:16
 */
public class BaseBusinessModelDaoImpl<T extends BusinessModel> extends BaseLongPKDaoImpl<T>
		implements BaseBusinessModelDao<T> {

	public int createNextSerialseq(T t, String... params) {
		SerialNumberStrategy strategy = persistType.getAnnotation(SerialNumberStrategy.class);
		if (strategy == null) {
			throw new java.lang.IllegalArgumentException("未定义编号规则!");
		}
		String preSerial = MessageFormat.format(strategy.strategy().replace("{yyyyMMdd}", DateUtil.getCurrentDateStr()),
				(Object[]) params);

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
		return seq;
	}

	public String createNextSerial(T t) {
		if(/*t instanceof ContractLease || */t instanceof ContractMaterials || t instanceof LeaseContract){
			SerialNumberStrategy strategy = persistType.getAnnotation(SerialNumberStrategy.class);
			if (strategy == null) {
				throw new java.lang.IllegalArgumentException("未定义编号规则!");
			}
			String preSerial = strategy.strategy().replace("{yyyyMMdd}", DateUtil.getCurrentDateStr());

			String tableName = HibernateConfigurationHelper.getTableName(persistType);
			String serialName = HibernateConfigurationHelper.getColumnName(persistType, strategy.name());
			String sql = "SELECT MAX(cast("+serialName+" as int)) FROM " + tableName + " WHERE " + serialName + " LIKE ?";
			String serial = this.jdbcTemplate.queryForObject(sql, String.class, preSerial + "%");
			int seq = 1;
			if (serial != null) {
				seq = Integer.parseInt(serial.replace(preSerial, "")) + 1;
				if (seq > strategy.maxseq()) {
					throw new BusinessException("序列号生成已达最大值" + strategy.maxseq() + ",无法继续生成编号,请改期录入!");
				}
			}
			return String.valueOf(seq);
		}else{
			SerialNumberStrategy strategy = persistType.getAnnotation(SerialNumberStrategy.class);
			if (strategy == null) {
				throw new java.lang.IllegalArgumentException("未定义编号规则!");
			}
			String preSerial = strategy.strategy().replace("{yyyyMMdd}", DateUtil.getCurrentDateStr());

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

	public String createNextSerial(T t, String... params) {
		SerialNumberStrategy strategy = persistType.getAnnotation(SerialNumberStrategy.class);
		if (strategy == null) {
			throw new java.lang.IllegalArgumentException("未定义编号规则!");
		}
		String preSerial = MessageFormat.format(strategy.strategy(), (Object[]) params);
		if(preSerial.length()>=8){
			preSerial = preSerial.substring(0,8);
		}
		String tableName = HibernateConfigurationHelper.getTableName(persistType);
		String serialName = HibernateConfigurationHelper.getColumnName(persistType, strategy.name());
		String tableId = HibernateConfigurationHelper.getColumnName(persistType, params[params.length-1]);
		String sql = null;
		if(tableId!=null){
			String serial = null;
			sql = "SELECT TOP 1 "+serialName+" FROM " + tableName + " WHERE DEL_FLAG = 1 ORDER BY " + tableId + " DESC ";
			List<Map<String, Object>> list  = this.jdbcTemplate.queryForList(sql);
			for (int i = 0; i < list.size(); i++) {
	            Map<String, Object> map = list.get(i);
	            Iterator<String> iterator = map.keySet().iterator();
	            while (iterator.hasNext()) {
	                String string = (String) iterator.next();
	                serial = String.valueOf(map.get(string));
	            }
	        }
			int seq = 1;
			if (serial != null) {
				String str = null;
				if(params.length==2){
					str = StringUtils.substringAfterLast(serial,params[0]);
				}else if(params.length==3){
					str = StringUtils.substringAfterLast(serial,params[1]);
				}
				seq = Integer.parseInt(str) + 1;
				if (seq > strategy.maxseq()) {
					throw new BusinessException("序列号生成已达最大值" + strategy.maxseq() + ",无法继续生成编号,请改期录入!");
				}
			}
			return preSerial + StringUtils.leftPad(seq + "", (strategy.maxseq() + "").length(), "0");
		}else{
			sql = "SELECT MAX(" + serialName + ") FROM " + tableName + " WHERE " + serialName + " LIKE ?";
			String serial = this.jdbcTemplate.queryForObject(sql, String.class, preSerial + "%");
			int seq = 1;
			if (serial != null) {
				
				seq = Integer.parseInt(serial.replace(preSerial, "")) + 1;
				if (seq > strategy.maxseq()) {
					throw new BusinessException("序列号生成已达最大值" + strategy.maxseq() + ",无法继续生成编号,请改期录入!");
				}
			}
			return preSerial + StringUtils.leftPad(seq + "", (strategy.maxseq()/100 + "").length(), "0");
		}
		
	}

	public T saveSerialModel(T t, String... params) {
		if (StringUtils.isBlank(t.getModelSerial())) {
			String serial = "";
			if (params.length > 0) {
				serial = createNextSerial(t,params);
			} else {
				serial = createNextSerial(t);
			}
			t.setModelSerial(serial);
		}
		return super.save(t);
	}
}
