/**
 * 版权所有：厦门市巨龙软件工程有限公司
 * Copyright 2010 Xiamen Dragon Software Eng. Co. Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: QueryFilter.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-25			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.filter;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang.StringUtils;

import com.knight.core.filter.command.ConjunctCommandImpl;
import com.knight.core.filter.command.CriteriaCommand;
import com.knight.core.filter.command.DisjunctCommandImpl;
import com.knight.core.filter.command.FieldCommandImpl;
import com.knight.core.filter.command.SortCommandImpl;
import com.knight.core.support.ParamParser;
import com.knight.core.web.paging.PagingBean;

/**
 * @ClassName:QueryFilter
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午9:48:05
 * @since JDK Version 1.5
 */
@Slf4j
public class QueryFilter {

	public static final String ORDER_DESC = "desc";

	public static final String ORDER_ASC = "asc";

	private HttpServletRequest request = null;

	/** Map中filter的key,表示用哪一个作为查询的条件 */
	@Getter
	private String filterName = null;

	@Getter
	private List<Object> paramValues = new ArrayList<Object>();

	@Getter
	private List<Object> defaultQueryParamValues = new ArrayList<Object>();

	@Getter
	@Setter
	private String defaultQueryConditions;

	@Getter
	private List<CriteriaCommand> commands = new ArrayList<CriteriaCommand>();

	@Getter
	private Set<String> aliasSet = new HashSet<String>();
	
	@Setter
	private PagingBean pagingBean = null;

	public PagingBean getPagingBean() {
		return this.pagingBean;
	}
	

	public QueryFilter() {
		this.pagingBean = new PagingBean(0, PagingBean.DEFAULT_PAGE_SIZE);
	}

	/**
	 * 从请求对象获取查询参数,并进行构造
	 * <p>
	 * 参数名格式必须为: Q_firstName_S_EQ 其中Q_表示该参数为查询的参数，firstName查询的字段名称， S代表该参数的类型为字符串类型,该位置的其他值有： D=日期，BD=BigDecimal，FT=float,N=Integer,SN=Short,S=字符串 EQ代表等于。
	 * 该位置的其他值有：<br/>
	 * LT，GT，EQ，LE，GE,LK<br/>
	 * 要别代表<,>,=,<=,>=,like的条件查询 增加分组可选(OR)查询,示例:QBO_GROUP=[vo.userid]_L_EQ,depName_LK&vo.userid=1&depName=部门
	 * <p>
	 * @param request
	 */
	public QueryFilter(HttpServletRequest req) {
		this.request = req;
		@SuppressWarnings("unchecked")
		Enumeration<String> paramEnu = request.getParameterNames();
		while (paramEnu.hasMoreElements()) {
			String paramName = paramEnu.nextElement();
			if (paramName.startsWith("Q_")) {
				String paramValue = request.getParameter(paramName);
				addConjunctFilter(paramName, paramValue);
			} else if (paramName.startsWith("QFO_")) {
				String disjunctValue = request.getParameter(paramName);
				addFieldsDisjunctFilter(paramName, disjunctValue);
			} else if (paramName.startsWith("QVO_")) {
				String disjunctValue = StringUtils.join(request.getParameterValues(paramName), ",");
				addValuesDisjunctFilter(paramName, disjunctValue);
			} else if (paramName.startsWith("QFVO_")) {
				String disjunctValue = request.getParameter(paramName);
				addFieldsValuesDisjunctFilter(paramName, disjunctValue);
			} else if (paramName.startsWith("ORDER_")) { // 例:ORDER_[]_BY,ORDER_createTime_BY
				String orderValue = request.getParameter(paramName);
				addSortedFilter(paramName, orderValue);
			}
		}
		String query = request.getParameter("QUERY_FILTER");
		if (StringUtils.isNotBlank(query)) {
			this.filterName = query;
		}

		// 取得分页的信息
		Integer start = 0;
		Integer limit = PagingBean.DEFAULT_PAGE_SIZE;

		String s_start = request.getParameter("start");
		String s_limit = request.getParameter("limit");
		if (StringUtils.isNotEmpty(s_start)) {
			start = new Integer(s_start);
		}
		if (StringUtils.isNotEmpty(s_limit)) {
			limit = new Integer(s_limit);
		}
		
		String sort = request.getParameter("sort");
		String dir = request.getParameter("dir");

		if ((StringUtils.isNotEmpty(sort)) && (StringUtils.isNotEmpty(dir))) {
			addSorted(sort, dir);
		}
		this.pagingBean = new PagingBean(start.intValue(), limit.intValue());
		//查询所有 without limit
		String queryAll = request.getParameter("QUERY_ALL_WITHOUT_LIMIT");
		if("Y".equals(queryAll)) {
			this.getPagingBean().setLimitSize(false);
		}
	}

	/**
	 * 添加过滤的查询条
	 * @param paramName 过滤的查询参数名称
	 * @param paramName
	 * @param paramValue
	 */
	public void addConjunctFilter(String paramName, String paramValue) {
		if (StringUtils.isBlank(paramValue)) {
			return;
		}
		String[] fieldInfo = ParamParser.parserParamName(paramName);
		if (fieldInfo == null || fieldInfo.length < 3 || fieldInfo.length > 4) {
			log.error("Query param name [" + paramName + "] is not right format.");
			return;
		}
		String property = fieldInfo[1];
		Object value = null;
		String operation = null;
		if (fieldInfo.length == 3) {
			value = ParamParser.convertSingleObject(fieldInfo[2], paramValue);
			operation = FieldCommandImpl.DEFAULT_OPERATION;
		} else if (fieldInfo.length == 4) {
			value = ParamParser.convertSingleObject(fieldInfo[2], paramValue);
			operation = fieldInfo[3];
		}
		ConjunctCommandImpl fieldCommand = new ConjunctCommandImpl(property, value, operation, this);
		this.commands.add(fieldCommand);
	}

	public void addFieldsDisjunctFilter(String disjunctName, String disjunctValue) {
		if (StringUtils.isBlank(disjunctValue)) {
			return;
		}
		String[] disjunctInfo = ParamParser.parserParamName(disjunctName);
		if (disjunctInfo == null || disjunctInfo.length < 2 || disjunctInfo.length > 4) {
			log.error("Query param name [" + disjunctName + "] is not right format.");
			return;
		}
		String[] fieldParams = disjunctInfo[1].split("[|]");

		List<String> properties = new ArrayList<String>(fieldParams.length);
		List<Object> values = new ArrayList<Object>(fieldParams.length);
		List<String> operations = new ArrayList<String>(fieldParams.length);
		if (disjunctInfo.length == 2) {
			for (int i = 0; i < fieldParams.length; i++) {
				String fieldPrama = fieldParams[i];
				String[] fieldInfo = fieldPrama.split("-");
				if (fieldInfo.length > 3) {
					log.error("Query param name [" + disjunctName + "] is not right format.");
					return;
				}

				properties.add(fieldInfo[0]);
				if (fieldInfo.length == 1) {
					values.add(disjunctValue);
					operations.add(FieldCommandImpl.DEFAULT_OPERATION);
				} else if (fieldInfo.length == 2) {
					values.add(ParamParser.convertSingleObject(fieldInfo[1], disjunctValue));
					operations.add(FieldCommandImpl.DEFAULT_OPERATION);
				} else if (fieldInfo.length == 3) {
					values.add(ParamParser.convertSingleObject(fieldInfo[1], disjunctValue));
					operations.add(fieldInfo[2]);
				}
			}
		} else if (disjunctInfo.length == 3) { // 统一参数值类型
			Object valueIdentical = ParamParser.convertSingleObject(disjunctInfo[2], disjunctValue);
			for (int i = 0; i < fieldParams.length; i++) {
				String fieldPrama = fieldParams[i];
				String[] fieldInfo = fieldPrama.split("-");
				if (fieldInfo.length > 3) {
					log.error("Query param name [" + disjunctName + "] is not right format.");
					return;
				}

				properties.add(fieldInfo[0]);
				values.add(valueIdentical);
				if (fieldInfo.length == 3) {
					operations.add(fieldInfo[2]);
				} else {
					operations.add(FieldCommandImpl.DEFAULT_OPERATION);
				}
			}
		} else if (disjunctInfo.length == 4) { // 统一参数值类型及操作类型
			Object valueIdentical = ParamParser.convertSingleObject(disjunctInfo[2], disjunctValue);
			String perationIdentical = disjunctInfo[3];
			for (int i = 0; i < fieldParams.length; i++) {
				String fieldPrama = fieldParams[i];
				String[] fieldInfo = fieldPrama.split("-");
				if (fieldInfo.length > 3) {
					log.error("Query param name [" + disjunctName + "] is not right format.");
					return;
				}
				properties.add(fieldInfo[0]);
				values.add(valueIdentical);
				operations.add(perationIdentical);
			}
		}
		DisjunctCommandImpl fieldCommand = new DisjunctCommandImpl(properties, values, operations, this);
		this.commands.add(fieldCommand);
	}

	public void addValuesDisjunctFilter(String disjunctName, String disjunctValue) {
		if (StringUtils.isBlank(disjunctValue)) {
			return;
		}
		String[] disjunctInfo = ParamParser.parserParamName(disjunctName);
		if (disjunctInfo.length > 4 || disjunctInfo.length < 3) {
			log.error("Query param name [" + disjunctName + "] is not right format.");
			return;
		}
		String propertyIdentical = disjunctInfo[1];
		String valueTypeIdentical = disjunctInfo[2];
		String operationIdentical = disjunctInfo.length == 4 ? disjunctInfo[3] : FieldCommandImpl.DEFAULT_OPERATION;
		String[] disjunctValues = disjunctValue.split(",");

		List<String> properties = new ArrayList<String>(disjunctValues.length);
		List<Object> values = new ArrayList<Object>(disjunctValues.length);
		List<String> operations = new ArrayList<String>(disjunctValues.length);
		for (String value : disjunctValues) {
			properties.add(propertyIdentical);
			values.add(ParamParser.convertSingleObject(valueTypeIdentical, value));
			operations.add(operationIdentical);
		}
		DisjunctCommandImpl fieldCommand = new DisjunctCommandImpl(properties, values, operations, this);
		this.commands.add(fieldCommand);

	}

	public void addFieldsValuesDisjunctFilter(String disjunctName, String disjunctValue) {
		if (StringUtils.isBlank(disjunctValue)) {
			return;
		}
		String[] disjunctInfo = ParamParser.parserParamName(disjunctName);
		if (disjunctInfo == null || disjunctInfo.length < 2 || disjunctInfo.length > 4) {
			log.error("Query param name [" + disjunctName + "] is not right format.");
			return;
		}
		String[] fieldParams = disjunctInfo[1].split("[|]");
		String[] disjunctValues = disjunctValue.split(",");
		if (fieldParams.length != disjunctValues.length) {
			log.error("Query param name [" + disjunctName + "] is not right format.");
			return;
		}

		List<String> properties = new ArrayList<String>(fieldParams.length);
		List<Object> values = new ArrayList<Object>(fieldParams.length);
		List<String> operations = new ArrayList<String>(fieldParams.length);
		if (disjunctInfo.length == 2) {
			for (int i = 0; i < fieldParams.length; i++) {
				String fieldPrama = fieldParams[i];
				String[] fieldInfo = fieldPrama.split("-");
				if (fieldInfo.length > 3) {
					log.error("Query param name [" + disjunctName + "] is not right format.");
					return;
				}
				String value = disjunctValues[i];

				properties.add(fieldInfo[0]);
				if (fieldInfo.length == 1) {
					values.add(value);
					operations.add(FieldCommandImpl.DEFAULT_OPERATION);
				} else if (fieldInfo.length == 2) {
					values.add(ParamParser.convertSingleObject(fieldInfo[1], value));
					operations.add(FieldCommandImpl.DEFAULT_OPERATION);
				} else if (fieldInfo.length == 3) {
					values.add(ParamParser.convertSingleObject(fieldInfo[1], value));
					operations.add(fieldInfo[2]);
				}
			}
		} else if (disjunctInfo.length == 3) { // 统一参数值类型
			for (int i = 0; i < fieldParams.length; i++) {
				String fieldPrama = fieldParams[i];
				String[] fieldInfo = fieldPrama.split("-");
				if (fieldInfo.length > 3) {
					log.error("Query param name [" + disjunctName + "] is not right format.");
					return;
				}
				String value = disjunctValues[i];

				properties.add(fieldInfo[0]);
				values.add(ParamParser.convertSingleObject(disjunctInfo[2], value));
				if (fieldInfo.length == 3) {
					operations.add(fieldInfo[2]);
				} else {
					operations.add(FieldCommandImpl.DEFAULT_OPERATION);
				}
			}
		} else if (disjunctInfo.length == 4) { // 统一参数值类型及操作类型
			String perationIdentical = disjunctInfo[3];
			for (int i = 0; i < fieldParams.length; i++) {
				String fieldPrama = fieldParams[i];
				String[] fieldInfo = fieldPrama.split("-");
				if (fieldInfo.length > 3) {
					log.error("Query param name [" + disjunctName + "] is not right format.");
					return;
				}
				String value = disjunctValues[i];

				properties.add(fieldInfo[0]);
				values.add(ParamParser.convertSingleObject(disjunctInfo[2], value));
				operations.add(perationIdentical);
			}
		}
		DisjunctCommandImpl fieldCommand = new DisjunctCommandImpl(properties, values, operations, this);
		this.commands.add(fieldCommand);
	}

	public void addSortedFilter(String sortedName, String sortedValue) {
		String[] fieldInfo = ParamParser.parserParamName(sortedName);
		if (fieldInfo == null || fieldInfo.length != 3) {
			log.error("order param name [" + sortedName + "] is not right format.");
		}
		String[] properties = fieldInfo[1].split("[|]");
		String[] values = sortedValue.split(",");
		for (int i = 0; i < properties.length; i++) {
			String property = properties[i];
			addSorted(property, values[i]);
		}
	}

	public void addSorted(String orderBy, String ascDesc) {
		this.commands.add(new SortCommandImpl(orderBy, ascDesc, this));
	}

	public void addParamValue(Object value) {
		this.paramValues.add(value);
	}

	public void addDefaultParamValue(Object value) {
		this.defaultQueryParamValues.add(value);
	}
	
	public List<Object> getParamValueList() {
		return this.paramValues;
	}

}
