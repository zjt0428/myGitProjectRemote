/**
\ * 版权所有：北京福富软件技术股份有限公司福州分公司
 * Copyright 2010 Fujian Fujitsu Communication Software Co., Ltd.
 * All right reserved. 
 *====================================================
 * 文件名称: LoginAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2010-12-30			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 * 
 */
package com.knight.system.web.action;

import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import lombok.Getter;
import lombok.Setter;
import nl.captcha.Captcha;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import com.knight.core.Constants;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.AppRole;
import com.knight.system.model.AppUser;
import com.knight.system.model.AppUserKey;
import com.knight.system.model.SysConfig;
import com.knight.system.service.AppUserKeyService;
import com.knight.system.service.AppUserService;
import com.knight.system.service.SysConfigService;

/**
 * 登陆请求
 * @ClassName:LoginAction
 * @Description:TODO(这里用一句话描述这个类的作用)
 * @author:chenxy
 * @date 2011-8-24 上午10:01:00
 * @since JDK Version 1.5
 */
public class LoginAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Resource
	private AppUserService userService;

	@Resource
	private AppUserKeyService appUserKeyService;

	@Resource
	private SysConfigService sysConfigService;

	@Resource
	private AuthenticationManager authenticationManager;

	private static String key = "RememberAppUser";

	private AppUserKey currentKey;

	@Getter
	@Setter
	private AppUser user;

	@Getter
	@Setter
	private String username;

	@Getter
	@Setter
	private String password;

	@Getter
	@Setter
	private String longitude;

	@Getter
	@Setter
	private String latitude;

	@Getter
	@Setter
	private String deviceToken;

	@Getter
	@Setter
	private String checkCode;

	private void checkAppUserIKey() {
		String keySeral = getRequest().getParameter("keySeral");
		if (StringUtils.isNotBlank(keySeral) && !"noKeySeral".equals(keySeral)) { // 有插入密钥
			AppUserKey ak = appUserKeyService.queryAppUserKey(this.user.getUserId(), keySeral);
			if (ak == null) {
				return;
			}
			if (Constants.DISENABLED.equals(ak.getKeyStatus())) {
				throw new java.lang.IllegalArgumentException("该IKey被禁用,非IKey用户请不要使用IKey登陆!");
			}
			long current = Long.parseLong(DateUtil.getCurrentDateStr());
			long validPeriod = Long.parseLong(ak.getValidPeriodTime().replaceAll("[^0-9]", ""));
			if (validPeriod > current) {
				throw new java.lang.IllegalArgumentException("该IKey还未生效,非IKey用户请不要使用IKey登陆!IKey用户请联系管理员!");
			}
			long expiration = Long.parseLong(ak.getExpirationTime().replaceAll("[^0-9]", ""));
			if (expiration < current) {
				throw new java.lang.IllegalArgumentException("该IKey已经过期,非IKey用户请不要使用IKey登陆!IKey用户请联系管理员!");
			}
			ak.getAppUserKeyExtends();
			currentKey = ak.clone();
			currentKey.setAppUser(null);
		}
	}

	private void checkLoginUser() throws Exception {
		String randomData = (String) getSession().getAttribute("randomData");
		Enumeration<String> e = getRequest().getParameterNames();
		Map<String,Object> map = new HashMap<String,Object>();
		if(e!=null){
			while(e.hasMoreElements()){
				String en = (String)e.nextElement();
				String value = getRequest().getParameter(en);
				map.put(en, value);
			}
		}
		Map<String,Object> headers = new HashMap<String,Object>();
		Enumeration<String> h = getRequest().getHeaderNames();
		if(h!=null){
			while(e.hasMoreElements()){
				String hn = (String)e.nextElement();
				String value = getRequest().getHeader(hn);
				System.out.println("请求头："+hn+"==="+value);
				headers.put(hn, value);
			}
		}
		String randomDigest = getRequest().getParameter("randomDigest");
		if (StringUtils.isNotBlank(randomData) && !randomData.equals(randomDigest)) {
			throw new java.lang.IllegalArgumentException("登陆请求地址非法/或页面过时,请刷新页面");
		}
		if (StringUtils.isEmpty(this.username)) {
			throw new java.lang.IllegalArgumentException("用户名不能为空.");
		}
		if (StringUtils.isEmpty(this.password)) {
			throw new java.lang.IllegalArgumentException("密码不能为空.");
		}
		SysConfig sysConfig = sysConfigService.findByKey("codeConfig");
		Captcha captcha = (Captcha) getSession().getAttribute(Captcha.NAME);
		if (sysConfig.getDataValue().equals(SysConfig.CODE_OPEN)) {
			if (captcha == null) {
				throw new java.lang.IllegalArgumentException("请刷新验证码再登录.");
			}
			if (!captcha.isCorrect(this.checkCode)) {
				throw new java.lang.IllegalArgumentException("验证码不正确.");
			}
		}
		setUser(this.userService.findByUserName(this.username));
		if (this.user == null) {
			throw new java.lang.IllegalArgumentException("用户不存在.");
		}
		if (AppUser.SUPER_USER.equals(this.user.getUserId())) {
			this.user.setStatus(Constants.FLAG_ACTIVATION);
		}
		if (this.user.getStatus() == Constants.FLAG_DISABLE) {
			throw new java.lang.IllegalArgumentException("此用户已被禁用.");
		}
		if (this.user.getDelFlag() == Constants.FLAG_DELETED) {
			throw new java.lang.IllegalArgumentException("此用户已失效.");
		}
		checkAppUserIKey();
		if (Constants.ENABLED.equals(this.user.getKeyFlag())) {
			if (currentKey == null) {
				throw new java.lang.IllegalArgumentException("未检测到用户IKey信息,请重新插入IKey进行登陆!");
			}
		}
		if (!this.user.getPassword().equalsIgnoreCase(this.password)) {
			throw new java.lang.IllegalArgumentException("用户密码不正确.");
		}
		if ((StringUtils.isNotBlank(this.latitude) && StringUtils.isNotBlank(this.longitude))||StringUtils.isNotBlank(this.deviceToken)) {
			this.user.setLatitude(this.latitude);
			this.user.setLongitude(this.longitude);
			this.user.setUpdateTime(new Date());
			this.user.setDeviceToken(this.deviceToken);
			userService.save(this.user);
		}
		this.user.getAppUserKeySet();
		this.user.getAppUserExtendSet();
	}

	private void loadAppUserExtendInfo(SecurityContext securityContext) {
		AppUser principal = (AppUser) securityContext.getAuthentication().getPrincipal();
		if (principal.getDepartment() != null) {
			principal.setDepId(principal.getDepartment().getDepId());
			principal.setDepName(principal.getDepartment().getDepName());
			principal.setDepPath(principal.getDepartment().getPath());
		}
		principal.setCurrentAppUserKey(currentKey);
		userService.loadAppUserExtends(principal);
		if (currentKey != null) {
			appUserKeyService.loadAppUserKeyExtends(currentKey);
		}
	}

	@ActionLog(description = "用户登录")
	public String login() {
		try {
			checkLoginUser();
			UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(this.username, this.password);
			SecurityContext securityContext = SecurityContextHolder.getContext();
			securityContext.setAuthentication(this.authenticationManager.authenticate(authRequest));
			SecurityContextHolder.setContext(securityContext);
			getSession().setAttribute(SystemConstant.SPRING_SECURITY_LAST_USERNAME, this.username);
			loadAppUserExtendInfo(securityContext);
			String rememberMe = getRequest().getParameter("_spring_security_remember_me");
			if ((rememberMe != null) && (rememberMe.equals("on"))) {
				long tokenValiditySeconds = 1209600L;
				long tokenExpiryTime = System.currentTimeMillis() + tokenValiditySeconds * 1000L;
				String signatureValue = DigestUtils.md5Hex(this.username + ":" + tokenExpiryTime + ":" + this.user.getPassword() + ":" + key);
				String tokenValue = this.username + ":" + tokenExpiryTime + ":" + signatureValue;
				String tokenValueBase64 = new String(Base64.encodeBase64(tokenValue.getBytes()));
				getResponse().addCookie(makeValidCookie(tokenExpiryTime, tokenValueBase64));
			}
			Set<String> funKeys = new HashSet<String>();
			for (AppRole role : this.user.getRoles()) {
				if(role.getRights()!=null) {
					String[] authorities = role.getRights().split(",");
					for (String authority : authorities) {
						if (SystemConstant.APP_FUNCTIONS.contains(authority)) {
							funKeys.add(authority);
						}
					}
				}
			}
			setJsonString("{\"success\":true,\"msg\":\"登陆成功\",\"rights\":\"" + StringUtils.join(funKeys, ",") + "\"}");
			//登录成功后，需要把该用户显示至在线用户
			if(StringUtils.isNotBlank(this.deviceToken)){
				ApplicationContainer.addOnlineUser(getRequest().getSession().getId(), ApplicationContainer.getCurrentUser(),"2");
			}else{
				ApplicationContainer.addOnlineUser(getRequest().getSession().getId(), ApplicationContainer.getCurrentUser(),"1");
			}
			if(ApplicationContainer.getCurrentUser().getRights().contains("__ALL")){
				getRequest().setAttribute("IS_MANAGER",true);
			}
		} catch (Exception e) {
			setJsonString("{\"success\":false,\"msg\":\"" + e.getMessage() + "\"}");
		}
		return SUCCESS;
	}

	protected Cookie makeValidCookie(long expiryTime, String tokenValueBase64) {
		HttpServletRequest request = getRequest();
		Cookie cookie = new Cookie("SPRING_SECURITY_REMEMBER_ME_COOKIE", tokenValueBase64);
		cookie.setMaxAge(157680000);
		cookie.setPath((org.springframework.util.StringUtils.hasLength(request.getContextPath())) ? request.getContextPath() : "/");
		return cookie;
	}

}
