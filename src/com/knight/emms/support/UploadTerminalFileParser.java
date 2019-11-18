/**
 *====================================================
 * 文件名称: UploadTerminalFileParser.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-10-24			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.support;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.dom4j.Document;
import org.dom4j.Element;

import com.knight.core.util.DateUtil;
import com.knight.core.util.FieldUtil;
import com.knight.core.util.XmlUtil;
import com.knight.emms.model.Component;
import com.knight.emms.model.Dispatch;
import com.knight.emms.model.DispatchCompon;
import com.knight.emms.model.DispatchEquip;
import com.knight.emms.model.EquipInspect;
import com.knight.emms.model.EquipInspectDetail;
import com.knight.emms.model.Equipment;
import com.knight.system.application.ApplicationContainer;

/**
 * @ClassName: UploadTerminalFileParser
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-10-24 下午7:56:11
 */
public class UploadTerminalFileParser {

	public static final String T_EQUIPMENT = "T_EQUIPMENT";

	public static final String T_COMPONENT = "T_COMPONENT";

	public static final String T_EQUIPMENT_INSPECT = "T_EQUIPMENT_INSPECT";

	public static final String T_EQUIPMENT_INSPECT_DETAIL = "T_EQUIPMENT_INSPECT_DETAIL";

	public static final String T_DISPATCH = "T_DISPATCH";

	public static final String T_DISPATCH_EQUIP = "T_DISPATCH_EQUIP";

	public static final String T_DISPATCH_COMPON = "T_DISPATCH_COMPON";

	private static Map<String, Map<String, Field>> TERMINAL_MODULE = new HashMap<String, Map<String, Field>>();

	private static Map<String, Class<?>> TERMINAL_CLASS = new HashMap<String, Class<?>>();

	private static void initModuleField(String module, Class<?> clazz) {
		Field[] fields = clazz.getDeclaredFields();
		Map<String, Field> methods = new HashMap<String, Field>();
		for (Field field : fields) {
			int modify = field.getModifiers();
			if (Modifier.isFinal(modify) || !Modifier.isPrivate(modify) || Modifier.isStatic(modify)) {
				continue;
			}
			field.setAccessible(true);
			methods.put(FieldUtil.getDataColumnField(field.getName()), field);
		}
		TERMINAL_MODULE.put(module, methods);
		TERMINAL_CLASS.put(module, clazz);
	}

	private static void setSimpleProperty(Object dest, Field field, String value) throws Exception {
		Class<?> fieldType = field.getType();
		if (fieldType.equals(String.class)) {
			field.set(dest, value);
		} else if (fieldType.equals(Long.class)) {
			Long data = Long.parseLong(value);
			field.set(dest, data);
		} else if (fieldType.equals(Date.class)) {
			Date data = DateUtil.changeStrToDate(value);
			field.set(dest, data);
		} else if (fieldType.equals(BigDecimal.class)) {
			BigDecimal data = new BigDecimal(value);
			field.set(dest, data);
		} else if (fieldType.equals(Short.class)) {
			Short data = Short.parseShort(value);
			field.set(dest, data);
		}
	}

	static {
		initModuleField(T_EQUIPMENT, Equipment.class);
		initModuleField(T_COMPONENT, Component.class);

		initModuleField(T_DISPATCH, Dispatch.class);
		initModuleField(T_DISPATCH_EQUIP, DispatchEquip.class);
		initModuleField(T_DISPATCH_COMPON, DispatchCompon.class);

		initModuleField(T_EQUIPMENT_INSPECT, EquipInspect.class);
		initModuleField(T_EQUIPMENT_INSPECT_DETAIL, EquipInspectDetail.class);
	}

	@SuppressWarnings("unchecked")
	public static <T> List<T> parser(Document document, String synchroTable) throws Exception {
		Element root = document.getRootElement();
		List<T> list = new ArrayList<T>();
		Map<String, Field> methods = TERMINAL_MODULE.get(synchroTable);
		for (Element data : (List<Element>) root.selectNodes("//" + synchroTable + "/DATA")) {
			T t = (T) TERMINAL_CLASS.get(synchroTable).newInstance();
			for (Element column : (List<Element>) data.elements()) {
				String col = column.getName();
				String value = column.getTextTrim();
				if (StringUtils.isBlank(value)) {
					continue;
				}
				if (methods.containsKey(col)) {
					Field field = methods.get(col);
					setSimpleProperty(t, field, value);
				}
			}
			list.add(t);
		}
		return list;
	}

	public static <T> List<T> parserFile(String filePath, String synchroTable) throws Exception {
		if ((String) ApplicationContainer.getSystemParam("FILE_UPLOAD_PATH") != null) {
			filePath = (String) ApplicationContainer.getSystemParam("FILE_UPLOAD_PATH") + filePath;
		}
		Document document = XmlUtil.load(filePath);
		return parser(document, synchroTable);
	}

	public static <T> List<T> parserContent(String content, String synchroTable) throws Exception {
		if (StringUtils.isBlank(content)) {
			return null;
		}
		Document document = XmlUtil.getDocumentBySAX(content);
		return parser(document, synchroTable);
	}

	@SuppressWarnings("unchecked")
	private static List<Dispatch> parserDispatch(Document document) throws Exception {
		Element root = document.getRootElement();
		List<Dispatch> list = new ArrayList<Dispatch>();
		Map<String, Field> methods = TERMINAL_MODULE.get(T_DISPATCH);
		Map<String, Field> demethods = TERMINAL_MODULE.get(T_DISPATCH_EQUIP);
		Map<String, Field> dcmethods = TERMINAL_MODULE.get(T_DISPATCH_COMPON);
		for (Element data : (List<Element>) root.selectNodes(T_DISPATCH + "/DATA")) {
			Dispatch dispatch = new Dispatch();
			for (Element column : (List<Element>) data.elements()) {
				String col = column.getName();
				String value = column.getTextTrim();
				if (StringUtils.isBlank(value)) {
					continue;
				}
				if (methods.containsKey(col)) {
					Field field = methods.get(col);
					setSimpleProperty(dispatch, field, value);
				}
			}
			for (Element sub : (List<Element>) data.selectNodes(T_DISPATCH_EQUIP + "/DATA")) {
				DispatchEquip de = new DispatchEquip();
				for (Element column : (List<Element>) sub.elements()) {
					String col = column.getName();
					String value = column.getTextTrim();
					if (StringUtils.isBlank(value)) {
						continue;
					}
					if (demethods.containsKey(col)) {
						Field field = demethods.get(col);
						setSimpleProperty(de, field, value);
					}
				}
				dispatch.getDispatchEquipSet().add(de);
			}
			for (Element sub : (List<Element>) data.selectNodes(T_DISPATCH_COMPON + "/DATA")) {
				DispatchCompon dc = new DispatchCompon();
				for (Element column : (List<Element>) sub.elements()) {
					String col = column.getName();
					String value = column.getTextTrim();
					if (StringUtils.isBlank(value)) {
						continue;
					}
					if (dcmethods.containsKey(col)) {
						Field field = dcmethods.get(col);
						setSimpleProperty(dc, field, value);
					}
				}
				dc.setCounts(1);
				dispatch.getDispatchComponSet().add(dc);
			}
			list.add(dispatch);
		}
		return list;
	}

	public static List<Dispatch> parserDispatchFile(String filePath) throws Exception {
		if ((String) ApplicationContainer.getSystemParam("FILE_UPLOAD_PATH") != null) {
			filePath = (String) ApplicationContainer.getSystemParam("FILE_UPLOAD_PATH") + filePath;
		}
		Document document = XmlUtil.load(filePath);
		return parserDispatch(document);
	}

	public static List<Dispatch> parserDispatchContent(String content) throws Exception {
		if (StringUtils.isBlank(content)) {
			return null;
		}
		Document document = XmlUtil.getDocumentBySAX(content);
		return parserDispatch(document);
	}

	@SuppressWarnings("unchecked")
	private static List<EquipInspect> parserEquipInspect(Document document) throws Exception {
		Element root = document.getRootElement();
		List<EquipInspect> list = new ArrayList<EquipInspect>();
		Map<String, Field> methods = TERMINAL_MODULE.get(T_EQUIPMENT_INSPECT);
		Map<String, Field> dmethods = TERMINAL_MODULE.get(T_EQUIPMENT_INSPECT_DETAIL);
		for (Element data : (List<Element>) root.selectNodes(T_EQUIPMENT_INSPECT + "/DATA")) {
			EquipInspect inspect = new EquipInspect();
			for (Element column : (List<Element>) data.elements()) {
				String col = column.getName();
				String value = column.getTextTrim();
				if (StringUtils.isBlank(value)) {
					continue;
				}
				if (methods.containsKey(col)) {
					Field field = methods.get(col);
					setSimpleProperty(inspect, field, value);
				}
			}
			for (Element sub : (List<Element>) data.selectNodes(T_EQUIPMENT_INSPECT_DETAIL + "/DATA")) {
				EquipInspectDetail de = new EquipInspectDetail();
				for (Element column : (List<Element>) sub.elements()) {
					String col = column.getName();
					String value = column.getTextTrim();
					if (StringUtils.isBlank(value)) {
						continue;
					}
					if (dmethods.containsKey(col)) {
						Field field = dmethods.get(col);
						setSimpleProperty(de, field, value);
					}
				}
				inspect.getEquipInspectDetailSet().add(de);
			}
			list.add(inspect);
		}
		return list;
	}

	public static List<EquipInspect> parserEquipInspectFile(String filePath) throws Exception {
		if ((String) ApplicationContainer.getSystemParam("FILE_UPLOAD_PATH") != null) {
			filePath = (String) ApplicationContainer.getSystemParam("FILE_UPLOAD_PATH") + filePath;
		}
		Document document = XmlUtil.load(filePath);
		return parserEquipInspect(document);
	}

	public static List<EquipInspect> parserEquipInspectContent(String content) throws Exception {
		if (StringUtils.isBlank(content)) {
			return null;
		}
		Document document = XmlUtil.getDocumentBySAX(content);
		return parserEquipInspect(document);
	}
}
