/**
 *====================================================
 * 文件名称: TerminalProxyServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-12-4			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.terminal;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import lombok.extern.slf4j.Slf4j;

import com.knight.core.dao.BaseJDBCDao;
import com.knight.core.exception.BusinessException;
import com.knight.core.model.SyncModule;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.Component;
import com.knight.emms.model.Dispatch;
import com.knight.emms.model.EquipInspect;
import com.knight.emms.model.Equipment;
import com.knight.emms.service.ComponentService;
import com.knight.emms.service.DispatchService;
import com.knight.emms.service.EquipInspectService;
import com.knight.emms.service.EquipmentService;
import com.knight.emms.support.UploadTerminalFileParser;
import com.knight.system.constant.SystemConstant;

/**
 * @ClassName: TerminalProxyServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-12-4 上午11:45:40
 */
@Slf4j
public class TerminalProxyServiceImpl implements TerminalProxyService {

	@Resource
	private BaseJDBCDao baseJdbcDao;

	@Resource
	private ComponentService componentService;

	@Resource
	private EquipmentService equipmentService;

	@Resource
	private EquipInspectService equipInspectService;

	@Resource
	private DispatchService dispatchService;

	public static String returnMessage(String result, String message) {
		return "<?xml version=\"1.0\" encoding=\"UTF-8\"?><response result=\"" + result + "\" msg=\"" + message + "\"></response>";
	}

	public String syncServiceData() {
		StringBuffer sb = new StringBuffer();
		sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?><SYNCHRO>");
		for (SyncModule sync : SystemConstant.SYNC_SYSTEM_DATA) {
			sb.append("<" + sync.getModuleName() + ">");
			String sql = sync.getDataSource();
			List<Map<String, Object>> datas = baseJdbcDao.queryForList(sql);
			for (Map<String, Object> data : datas) {
				sb.append("<DATA>");
				for (Map.Entry<String, Object> entry : data.entrySet()) {
					sb.append("<" + entry.getKey() + ">");
					String value = "";
					if (entry.getValue() != null) {
						if (entry.getValue() instanceof Date) {
							value = entry.getValue().toString().substring(0, 19);
						} else {
							value = entry.getValue().toString().trim();
						}
					}
					sb.append(value);
					sb.append("</" + entry.getKey() + ">");
				}
				sb.append("</DATA>");
			}
			sb.append("</" + sync.getModuleName() + ">");
		}
		sb.append("</SYNCHRO>");
		return sb.toString();
	}

	public String uploadComponentData(String requestText) {
		log.debug("接收终端上报零配件信息:" + requestText);
		String result = Constant.ENABLED;
		String message = "";
		try {
			List<Component> list = UploadTerminalFileParser.parserContent(requestText, UploadTerminalFileParser.T_COMPONENT);
			if (!list.isEmpty()) {
				componentService.saveUpload(list);
			}
		} catch (Exception e) {
			result = Constant.DISENABLED;
			if (e instanceof BusinessException) {
				message = e.getMessage();
			}
			message = "上传配件信息文件解析异常!";
		}
		String responseText = returnMessage(result, message);
		log.debug("响应终端上报零配件信息:" + responseText);
		return responseText;
	}

	public String uploadEquipmentData(String requestText) {
		log.debug("接收终端上报设备信息:" + requestText);
		String result = Constant.ENABLED;
		String message = "";
		try {
			List<Equipment> list = UploadTerminalFileParser.parserContent(requestText, UploadTerminalFileParser.T_EQUIPMENT);
			if (!list.isEmpty()) {
				equipmentService.saveUpload(list);
			}
		} catch (Exception e) {
			result = Constant.DISENABLED;
			if (e instanceof BusinessException) {
				message = e.getMessage();
			}
			message = "上传备案信息文件解析异常!";
		}
		String responseText = returnMessage(result, message);
		log.debug("响应终端上报设备信息:" + responseText);
		return responseText;
	}

	public String uploadDispatchData(String requestText) {
		log.debug("接收终端上报调度信息:" + requestText);
		String result = Constant.ENABLED;
		String message = "";
		try {
			List<Dispatch> list = UploadTerminalFileParser.parserDispatchContent(requestText);
			if (!list.isEmpty()) {
				dispatchService.saveUpload(list);
			}
		} catch (Exception e) {
			result = Constant.DISENABLED;
			if (e instanceof BusinessException) {
				message = e.getMessage();
			}
			message = "上传调度信息文件解析异常!";
		}
		String responseText = returnMessage(result, message);
		log.debug("响应终端上报调度信息:" + responseText);
		return responseText;
	}

	public String uploadEquipInspectData(String requestText) {
		log.debug("接收终端上报巡检信息:" + requestText);
		String result = Constant.ENABLED;
		String message = "";
		try {
			List<EquipInspect> list = UploadTerminalFileParser.parserEquipInspectContent(requestText);
			if (!list.isEmpty()) {
				equipInspectService.saveUpload(list);
			}
		} catch (Exception e) {
			result = Constant.DISENABLED;
			if (e instanceof BusinessException) {
				message = e.getMessage();
			}
			message = "上传调度信息文件解析异常!";
		}
		String responseText = returnMessage(result, message);
		log.debug("响应终端上报巡检信息:" + responseText);
		return responseText;
	}
}
