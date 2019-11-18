/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: DisjunctCommandImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-9-2			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.filter.command;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.Restrictions;

import com.knight.core.filter.QueryFilter;
import com.knight.core.support.RestrictionsParser;

/**
 * @ClassName: DisjunctCommandImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-9-2 下午8:44:15
 * 
 *       <pre>
 * this.params[&quot;QBO_applyforState_S_VOR&quot;] = 1,2,7,8;
 * </pre>
 * 
 *       <pre>
 * this.params[&quot;QBO_[paEnt|pbEnt]_L_FOR&quot;] = 6;
 * </pre>
 * 
 *       <pre>
 * this.params[&quot;QBO_GROUP_OR_FVOR&quot;] = &quot;paEnt_L_EQ,contractId_L_GE&quot;;
 * this.params[&quot;paEnt&quot;] = 6;
 * this.params[&quot;contractId&quot;] = 40;
 * </pre>
 */
public class DisjunctCommandImpl extends FieldCommandImpl implements CriteriaCommand {

	private List<String> properties;

	private List<Object> values;

	private List<String> operations;

	private QueryFilter filter;

	public DisjunctCommandImpl(List<String> properties, List<Object> values, List<String> operations, QueryFilter filter) {
		this.properties = properties;
		this.values = values;
		this.operations = operations;
		this.filter = filter;
	}

	private Criterion or(List<String> operations, List<String> properties, List<Object> values, int i) {
		if (i < properties.size() - 1) {
			Criterion c = RestrictionsParser.parserCriterion(operations.get(i), properties.get(i), values.get(i));
			return Restrictions.or(c, or(operations, properties, values, ++i));
		} else {
			return RestrictionsParser.parserCriterion(operations.get(i), properties.get(i), values.get(i));
		}
	}

	private Criterion join(List<String> operations, List<String> properties, List<Object> values) {
		Disjunction disjunction = Restrictions.disjunction();
		for(int i=0; i<operations.size(); i++) {
			disjunction.add(RestrictionsParser.parserCriterion(operations.get(i), properties.get(i), values.get(i)));
		}
		return disjunction;
	}
	
	public Criteria execute(Criteria criteria) {
		List<String> properties = (List<String>) this.properties;
		List<Object> values = (List<Object>) this.values;
		List<String> operations = (List<String>) this.operations;
		List<String> tempPropertities = new ArrayList<String>();
        // 支持外键属性的查询
        for(String property : properties){
            String propertyName = null;
            String[] propertys = property.split("[.]");
            if (("vo".equals(propertys[0]) && propertys.length == 2) || (propertys.length == 1)) {
                propertyName = property;
            } else if (propertys.length > 1) {
                String multiple = propertys[0];
                for (int i = 0; i < propertys.length - 1; i++) {
                    if (i > 0) {
                        multiple = multiple + "." + propertys[i];
                    }
                    if (!this.filter.getAliasSet().contains(multiple)) { // 防止别名重复
                        criteria.createAlias(multiple, propertys[i]);
                        this.filter.getAliasSet().add(multiple);
                    }
                }
                propertyName = property.replace(multiple, propertys[propertys.length - 2]);
            }
            tempPropertities.add(propertyName);
        }
        
        if(tempPropertities.isEmpty()) {
        	tempPropertities = properties;
        }
		if (!tempPropertities.isEmpty()) {
//			Criterion c = or(operations, properties, values, 0);
			Criterion c = join(operations, tempPropertities, values);
			if (c != null) {

				criteria.add(c);
			}
		}
		return criteria;
	}

	public String getPartHql() {
		StringBuffer sb = new StringBuffer("( ");
		List<String> properties = (List<String>) this.properties;
		List<Object> values = (List<Object>) this.values;
		List<String> operations = (List<String>) this.operations;
		for (int i = 0; i < values.size(); i++) {
			String property = properties.get(i);
			Object value = values.get(i);
			sb.append(RestrictionsParser.parserPreparedHql(operations.get(i), property, value, filter.getParamValues())).append(" or ");
		}
		return sb.substring(0, sb.length() - 3) + " )";
	}
}
