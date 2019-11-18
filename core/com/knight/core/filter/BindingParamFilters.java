/**
 *====================================================
 * 文件名称: BindingParamFilters.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月3日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.core.filter;

import java.util.ArrayList;

import com.knight.core.filter.BindingParamFilters.ParamFilter;
import com.knight.core.filter.command.ConjunctCommandImpl;
import com.knight.core.filter.command.CriteriaCommand;

import lombok.Getter;
import lombok.Setter;

/**
 * @ClassName: BindingParamFilters
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014年10月3日 下午3:29:18
 */
public class BindingParamFilters extends ArrayList<ParamFilter> {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	public Integer pageNumber;

	@Getter
	@Setter
	private Integer pageSize;

	public BindingParamFilters() {}

	public BindingParamFilters(Integer pageNumber, Integer pageSize) {
		this.pageNumber = pageNumber;
		this.pageSize = pageSize;
	}

	public static class ParamFilter {

		/** 属性名称 */
		@Getter
		protected String property;

		/** 查询属性的操作 */
		@Getter
		protected String operation;

		/** 绑定参数名 */
		@Getter
		protected String bindingName;

		/** 属性值 */
		@Getter
		@Setter
		protected Object value;

		public ParamFilter(String property, Object value) {
			this.property = property;
			this.operation = "EQ";
			this.bindingName = property;
			this.value = value;
		}

		public ParamFilter(String property, String operation, Object value) {
			this.property = property;
			this.operation = operation;
			this.bindingName = property;
			this.value = value;
		}

		public ParamFilter(String property, String operation, String bindingName, Object value) {
			this.property = property;
			this.operation = operation;
			this.bindingName = bindingName;
			this.value = value;
		}

	}

	public boolean addFilter(String property, String operation, String bindingName, Object value) {
		return this.add(new ParamFilter(property, operation, bindingName, value));
	}

	public boolean addFilter(String property, String operation, Object value) {
		return this.add(new ParamFilter(property, operation, value));
	}

	public boolean addFilter(String property, Object value) {
		return this.add(new ParamFilter(property, value));
	}

	public int getFirstResult() {
		return (this.pageNumber - 1) * this.pageSize;
	}

	/**
	 * 将QueryFilter 转成 BindingParamFilters 
	 * （此方法不适用于存在QFO 或 QVO 查询条件）
	 * */
	public boolean convertQueryFilter(QueryFilter filter) {
		for (int i = 0; i < filter.getCommands().size(); ++i) {
			CriteriaCommand command = (CriteriaCommand) filter.getCommands().get(i);
			if (command instanceof ConjunctCommandImpl) {
				String property = ((ConjunctCommandImpl) command).getProperty();
				String operation = ((ConjunctCommandImpl) command).getOperation();
				Object value = ((ConjunctCommandImpl) command).getValue();
				this.add(new ParamFilter(property, operation, property+i, value));
				filter.addParamValue(value);
			} 
		}
		return true;
	}
}
