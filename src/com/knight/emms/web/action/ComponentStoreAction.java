/**
 *====================================================
 * 文件名称: EquipmentAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月25日			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.knight.app.model.InspectRectify;
import com.knight.app.service.InspectRectifyService;
import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.paging.PagingBean;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.ComponDiary;
import com.knight.emms.model.Component;
import com.knight.emms.model.DismantleManage;
import com.knight.emms.model.EquipDiary;
import com.knight.emms.model.EquipDismantle;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.EquipInspect;
import com.knight.emms.model.EquipInspectSchema;
import com.knight.emms.model.EquipInstall;
import com.knight.emms.model.EquipRepair;
import com.knight.emms.model.Equipment;
import com.knight.emms.model.IndisSchema;
import com.knight.emms.model.InspectManage;
import com.knight.emms.model.InstallJjCompon;
import com.knight.emms.model.InstallManage;
import com.knight.emms.model.Practitioner;
import com.knight.emms.model.ProjectCompon;
import com.knight.emms.service.ComponentService;
import com.knight.emms.service.DismantleManageService;
import com.knight.emms.service.EquipDismantleService;
import com.knight.emms.service.EquipFlowService;
import com.knight.emms.service.EquipInspectService;
import com.knight.emms.service.EquipInstallService;
import com.knight.emms.service.EquipRepairService;
import com.knight.emms.service.EquipmentService;
import com.knight.emms.service.IndisSchemaService;
import com.knight.emms.service.InspectManageService;
import com.knight.emms.service.InstallManageService;
import com.knight.emms.service.PractitionerService;
import com.knight.emms.service.ProjectComponService;
import com.knight.emms.service.StoreHouseService;
import com.knight.emms.terminal.Query;
import com.knight.emms.terminal.Tequest;
import com.knight.emms.terminal.TerminalBaseAction;
import com.knight.emms.terminal.dto.ComponentInfoResponse;
import com.knight.emms.terminal.dto.DismantleLoadResponse;
import com.knight.emms.terminal.dto.EquipmentGatherResponse;
import com.knight.emms.terminal.dto.EquipmentInfoResponse;
import com.knight.emms.terminal.dto.InspectLoadResponse;
import com.knight.emms.terminal.dto.InstallLoadEquipmentResponse;
import com.knight.emms.terminal.dto.InstallWaitListEquipmentResponse;
import com.knight.emms.terminal.dto.WaitInstallComponResponse;
import com.knight.emms.terminal.dto.WaitInstallPractiResponse;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.AppUser;
import com.knight.system.model.FileAttach;
import com.knight.system.model.UserExtend;
import com.knight.system.service.CodeService;
import com.knight.system.service.FileAttachService;
import com.knight.system.service.impl.CodeServiceImpl;

/**
 * @ClassName: EquipmentAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014年10月25日 上午10:55:39
 */
public class ComponentStoreAction extends TerminalBaseAction {

	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static final long serialVersionUID = 1L;

	@Resource
	private FileAttachService fileAttachService;

	
	@Resource
	private ComponentService componentService;
	

	@Resource
	private StoreHouseService storeHouseService;
	

	
	public String list() {
		String taskId = getRequest().getParameter("taskId");
		
		return SUCCESS;
	}


	
}
