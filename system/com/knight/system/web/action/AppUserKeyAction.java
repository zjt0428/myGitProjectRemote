/**
 * 版权所有：福建能能信息科技有限公司
 * Copyright 2012 Fujian Nengneng Information Technology Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: AppUserKeyAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2012-10-21			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.web.action;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;

import com.knight.core.Constants;
import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;
import com.knight.system.model.AppUserKey;
import com.knight.system.model.AppUserKeyExtend;
import com.knight.system.model.AppUserKeyLog;
import com.knight.system.service.AppUserKeyExtendService;
import com.knight.system.service.AppUserKeyLogService;
import com.knight.system.service.AppUserKeyService;
import com.knight.system.service.AppUserService;
import com.knight.system.support.StatusParser;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;

/**
 * @ClassName: AppUserKeyAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2012-10-21 下午8:50:44
 */
public class AppUserKeyAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private AppUserKey appUserKey;

	@Getter
	@Setter
	private Long keyId;

	@Resource
	private AppUserKeyService appUserKeyService;

	@Resource
	private AppUserKeyExtendService appUserKeyExtendService;

	@Resource
	private AppUserKeyLogService appUserKeyLogService;

	@Resource
	private AppUserService appUserService;

	public String listCurrentKey() {
		AppUser currentUser = ApplicationContainer.getCurrentUser();
		Set<AppUserKey> keys = currentUser.getAppUserKeySet();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(keys.size()).append(",result:");
		JSONSerializer serializer = new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"), new String[] { "distributeTime", "updateTime" });
		buff.append(serializer.exclude(new String[] { "appUser" }).serialize(keys));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<AppUserKey> list = appUserKeyService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	public String load() {
		AppUserKey key = appUserKeyService.get(keyId);
		key.setUsername(key.getAppUser().getUsername());
		key.setFullname(key.getAppUser().getFullname());
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(key, DateUtil.LINK_DISPLAY_DATE));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "保存或更新IKEY证书")
	public String save() {
		if (appUserKey.getKeyId() == null) {
			if (appUserKey.getUserId() == null) {
				throw new BusinessException("用户信息加载失败,无法保存IKEY信息!");
			}
			AppUserKey k = appUserKeyService.existAppUserKey(appUserKey);
			if (k != null) {
				throw new BusinessException("用户已经存在该IKey,请不要重复分配!");
			}
			AppUser appUser = appUserService.get(appUserKey.getUserId());
			if (appUser == null) {
				throw new BusinessException("用户信息加载失败,无法保存IKEY信息!");
			}
			appUserKey.setAppUser(appUser);
			appUserKey.setDistributeTime(new Date());
			appUserKey.setUpdateTime(new Date());
			appUserKeyService.save(appUserKey);
		} else {
			AppUserKey k = appUserKeyService.get(appUserKey.getKeyId());
			try {
				AppUserKeyLog l = new AppUserKeyLog();
				BeanUtils.copyProperties(l, k);
				l.setUserId(k.getAppUser().getUserId());
				l.setFullname(k.getAppUser().getFullname());
				l.setUpdateUsername(ApplicationContainer.getCurrentUser().getFullname());
				appUserKeyLogService.save(l);
			} catch (Exception e) {
				logger.error("", e);
			}
			appUserKey.setAppUser(k.getAppUser());
			appUserKey.setUpdateTime(new Date());
			appUserKey.setDistributeTime(k.getDistributeTime());
			appUserKeyService.merge(appUserKey);
		}
		if (appUserKey.getKeyExtend() != null) {
			AppUserKeyExtend keyExtend = appUserKey.getKeyExtend();
			if (keyExtend.getKeyExtendId() == null) {
				if (keyExtend.getForeignId() != null && StringUtils.isNotBlank(keyExtend.getForeignModule()) && StringUtils.isNotBlank(keyExtend.getForeignName())) {
					keyExtend.setKeyId(appUserKey.getKeyId());
					appUserKeyExtendService.save(keyExtend);
				}
			} else {
				AppUserKeyExtend e = appUserKeyExtendService.get(keyExtend.getKeyExtendId());
				e.setForeignId(keyExtend.getForeignId());
				e.setForeignModule(keyExtend.getForeignModule());
				e.setForeignName(keyExtend.getForeignName());
				appUserKeyExtendService.save(e);
			}
		}
		appUserKeyService.saveOrMerge(appUserKey);
		return SUCCESS;
	}

	@ActionLog(description = "禁用IKEY证书")
	public String multiForbidden() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			AppUserKey k = appUserKeyService.get(new Long(id));
			k.setKeyStatus(Constants.DISENABLED);
			appUserKeyService.save(k);
		}
		return SUCCESS;
	}

	@ActionLog(description = "恢复IKEY证书")
	public String recover() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			AppUserKey k = appUserKeyService.get(new Long(id));
			k.setKeyStatus(StatusParser.parserIkeyExpiration(k.getExpirationTime()));
			appUserKeyService.save(k);
		}
		return SUCCESS;
	}

	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			appUserKeyService.remove(new Long(id));
		}
		return SUCCESS;
	}

	public String listLog() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<AppUserKeyLog> list = appUserKeyLogService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, DateUtil.LINK_DISPLAY_DATE));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

}
