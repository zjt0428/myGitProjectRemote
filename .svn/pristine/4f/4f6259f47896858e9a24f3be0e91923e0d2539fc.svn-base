/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: Functions.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-8-22			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.core.taglibs;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.knight.core.util.ObjectUtil;
import com.knight.system.application.ApplicationContainer;

/**
 * @ClassName: Functions
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-8-22 下午6:07:01
 */
public class Functions {

	private static Integer integersum(Collection<?> input, Field field) {
		Integer sum = 0;
		try {
			for (Object o : input) {
				Integer value = (Integer) ObjectUtil.getProperty(o, field);
				if (value != null) {
					sum += value;
				}
			}
			return sum;
		} catch (Exception e) {
			return -1;
		}
	}

	private static Long longsum(Collection<?> input, Field field) {
		Long sum = 0L;
		try {
			for (Object o : input) {
				Long value = (Long) ObjectUtil.getProperty(o, field);
				if (value != null) {
					sum += value;
				}
			}
			return sum;
		} catch (Exception e) {
			return -1L;
		}
	}

	private static Short shortsum(Collection<?> input, Field field) {
		Short sum = (short) 0;
		try {
			for (Object o : input) {
				Short value = (Short) ObjectUtil.getProperty(o, field);
				if (value != null) {
					sum = (short) (sum + value);
				}
			}
			return sum;
		} catch (Exception e) {
			return (short) -1;
		}
	}

	private static BigDecimal bigDecimalsum(Collection<?> input, Field field) {
		BigDecimal sum = BigDecimal.ZERO;
		try {
			for (Object o : input) {
				BigDecimal value = (BigDecimal) ObjectUtil.getProperty(o, field);
				if (value != null) {
					sum = sum.add(value);
				}
			}
			return sum;
		} catch (Exception e) {
			return BigDecimal.valueOf(-1);
		}
	}

	public static boolean contains(Set<?> input, Object element) {
		return (input.contains(element));
	}

	public static boolean containsKey(Map<?, ?> input, Object key) {
		return (input.containsKey(key));
	}

	public static boolean containsValue(Map<?, ?> input, Object value) {
		return (input.containsValue(value));
	}

	public static String listsum(Collection<?> input, String property) {
		if (input == null || input.isEmpty()) {
			return "0";
		}
		try {
			Class<?> clazz = input.iterator().next().getClass();
			Field field = clazz.getDeclaredField(property);
			Class<?> fieldType = field.getType();
			if (fieldType.equals(java.math.BigDecimal.class)) {
				return bigDecimalsum(input, field).toString();
			} else if (fieldType.equals(java.lang.Integer.class)) {
				return integersum(input, field).toString();
			} else if (fieldType.equals(java.lang.Long.class)) {
				return longsum(input, field).toString();
			} else if (fieldType.equals(java.lang.Short.class)) {
				return shortsum(input, field).toString();
			}
			return "unsupport";
		} catch (Exception e) {
			return "error";
		}
	}

	public static Object company() {
		return ApplicationContainer.getSysConfig().get("app.company");
	}

	private static Integer integersum(List<?> input, Field field) {
		Integer sum = 0;
		try {
			for (Object o : input) {
				Integer value = (Integer) ObjectUtil.getProperty(o, field);
				if (value != null) {
					sum += value;
				}
			}
			return sum;
		} catch (Exception e) {
			return -1;
		}
	}

	private static Long longsum(List<?> input, Field field) {
		Long sum = 0L;
		try {
			for (Object o : input) {
				Long value = (Long) ObjectUtil.getProperty(o, field);
				if (value != null) {
					sum += value;
				}
			}
			return sum;
		} catch (Exception e) {
			return -1L;
		}
	}

	private static Short shortsum(List<?> input, Field field) {
		Short sum = (short) 0;
		try {
			for (Object o : input) {
				Short value = (Short) ObjectUtil.getProperty(o, field);
				if (value != null) {
					sum = (short) (sum + value);
				}
			}
			return sum;
		} catch (Exception e) {
			return (short) -1;
		}
	}

	private static BigDecimal bigDecimalsum(List<?> input, Field field) {
		BigDecimal sum = BigDecimal.ZERO;
		try {
			for (Object o : input) {
				BigDecimal value = (BigDecimal) ObjectUtil.getProperty(o, field);
				if (value != null) {
					sum = sum.add(value);
				}
			}
			return sum;
		} catch (Exception e) {
			return BigDecimal.valueOf(-1);
		}
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static String collectionPropertySum(Object obj, String property) {
		if (obj == null) {
			return "0";
		}
		List<?> input = null;
		if (obj instanceof List) {
			input = (List<?>) obj;
		} else if (obj instanceof Map) {
			input = new ArrayList(((Map<?, ?>) obj).values());
		} else if (obj instanceof Set) {
			input = new ArrayList((Set<?>) obj);
		} else {
			return "0";
		}
		if (input == null || input.isEmpty()) {
			return "0";
		}
		try {
			Class<?> clazz = input.get(0).getClass();
			Field field = clazz.getDeclaredField(property);
			Class<?> fieldType = field.getType();
			if (fieldType.equals(java.math.BigDecimal.class)) {
				return bigDecimalsum(input, field).toString();
			} else if (fieldType.equals(java.lang.Integer.class)) {
				return integersum(input, field).toString();
			} else if (fieldType.equals(java.lang.Long.class)) {
				return longsum(input, field).toString();
			} else if (fieldType.equals(java.lang.Short.class)) {
				return shortsum(input, field).toString();
			}
			return "unsupport";
		} catch (Exception e) {
			return "error";
		}
	}

}
