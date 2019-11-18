package com.knight.system.web.action;

import java.io.UnsupportedEncodingException;
import java.security.AlgorithmParameters;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.Provider;
import java.security.Security;
import java.security.spec.InvalidParameterSpecException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;

import org.apache.axiom.om.util.Base64;
import org.apache.commons.lang.StringUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.core.util.HttpUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.domain.impl.SchedularInspectDomainImpl;
import com.knight.emms.terminal.TerminalBaseAction;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.AppRole;
import com.knight.system.model.AppUser;
import com.knight.system.service.AppUserService;

public class MiniProgramAction extends TerminalBaseAction{
	
	private static final long serialVersionUID = 3296056622983389395L;
	
	private static final String appId = "wx51883d3d76b39f3f";
	
	private static final String appSecret="c81ac1adc5c8198acc53390406091da8";
	
	private AppUser appUser;
	
	@Resource
	private AppUserService appUserService;

	@Resource
	private AuthenticationManager authenticationManager;
	
	public boolean findUser(String mobile, String openId) {
		QueryFilter filter  = new QueryFilter();
		filter.addConjunctFilter("Q_mobile_S_EQ", mobile);
		filter.addConjunctFilter("Q_openId_S_EQ", openId);
		List<AppUser> list = appUserService.getAll(filter);
		if(list.size()==1) {
			appUser = list.get(0);
			return true;
		}
		return false;
	}
	
	public boolean bindingUser(String mobile, String password, String openId) {
		AppUser au = appUserService.findByMobile(mobile);
		if(au==null) {
			return false;
		}else if(au.getPassword().equals(password)){
			au.setOpenId(openId);
			appUserService.save(au);
			appUser = au;
			return true;
		}else {
			return false;
		}
	}
	
//	public String login() {
//		String code = getRequest().getParameter("code");
//		String mobile = getRequest().getParameter("mobile");
//		String username = getRequest().getParameter("username");
//		String password = getRequest().getParameter("password");
//		String url = "https://api.weixin.qq.com/sns/jscode2session?";
//		String param ="appid="+appId+"&secret="+appSecret+"&js_code="+code+"&grant_type=authorization_code";
//		try {
//			String response = HttpUtil.post(url, param, "GET", "UTF-8");
//			JSONObject  jsonObject  = JSON.parseObject(response);
//			String openId = jsonObject.getString("openid");
//			String sessionKey = jsonObject.getString("session_key");
//			if(StringUtils.isNotBlank(openId)) {
//				if(findUser(mobile, openId)) {
//					setJsonString("{\"success\" : true, \"msg\":\"登录成功！\"}");
//				}else if(StringUtils.isNotBlank(mobile) && StringUtils.isNotBlank(password)){
//					if(bindingUser(mobile, password, openId)) {
//						setJsonString("{\"success\" : true, \"msg\" :\"绑定成功！\"}");
//					}else {
//						setJsonString("{\"success\" : false, \"msg\" :\"用户名或密码错误！\"}");
//					}
//				}else {
//					setJsonString("{\"success\" : false, \"msg\" :\"绑定失败，请输入用户名密码\"}");
//				}
//				if(appUser!=null) {
//					UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(appUser.getUsername(), appUser.getPassword());
//					SecurityContext securityContext = SecurityContextHolder.getContext();
//					securityContext.setAuthentication(this.authenticationManager.authenticate(authRequest));
//					SecurityContextHolder.setContext(securityContext);
//					getSession().setAttribute(SystemConstant.SPRING_SECURITY_LAST_USERNAME, appUser.getUsername());
//				}
//			}else {
//				setJsonString("{\"success\" : false,\"msg\" :\"获取openId失败，请检查appId或appSecret！\",\"response\":"+response+"}");
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return SUCCESS;
//	}
	
	public String login() {
		String username = getRequest().getParameter("username");
		String mobile = getRequest().getParameter("mobile");
		String password = getRequest().getParameter("password");
		QueryFilter filter = new QueryFilter();
//		filter.addConjunctFilter("Q_username_S_EQ", username);
		filter.addConjunctFilter("Q_mobile_S_EQ", mobile);
		filter.addConjunctFilter("Q_delFlag_SN_EQ", "0");
		List<AppUser> list = appUserService.getAll(filter);
		if(list.size()>0) {
			AppUser au = list.get(0);
			if(au.getPassword().equals(password)) {
				appUser = au;
				UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(appUser.getUsername(), appUser.getPassword());
				SecurityContext securityContext = SecurityContextHolder.getContext();
				securityContext.setAuthentication(this.authenticationManager.authenticate(authRequest));
				SecurityContextHolder.setContext(securityContext);
				getSession().setAttribute(SystemConstant.SPRING_SECURITY_LAST_USERNAME, appUser.getUsername());
				appUserService.loadAppUserExtends(appUser);
				Set<String> funKeys = new HashSet<String>();
				HttpServletRequest request = getRequest();
				for (AppRole role : appUser.getRoles()) {
					if(role.getRights()!=null) {
						String[] authorities = role.getRights().split(",");
						for (String authority : authorities) {
//							if (SystemConstant.APP_FUNCTIONS.contains(authority)) {
								funKeys.add(authority);
//							}
						}
					}
				}
				
				setJsonString("{\"success\" : true, \"msg\":\"登录成功！\",\"user\":"+GsonUtil.toJson(appUser)+",\"rights\":\"" + StringUtils.join(funKeys, ",") + "\"}");
				//登录成功后，需要把该用户显示至在线用户
				ApplicationContainer.addOnlineUser(getRequest().getSession().getId(), ApplicationContainer.getCurrentUser(),"3");
				if(ApplicationContainer.getCurrentUser().getRights().contains("__ALL")){
					getRequest().setAttribute("IS_MANAGER",true);
				}
				if(!ApplicationContainer.isCurrentSuperAdmin()) {
		        	appUserService.getRoleDataPermission(ApplicationContainer.getCurrentUser());
		        }
			}else {
				setJsonString("{\"success\" : false, \"msg\":\"用户名密码错误！\"}");
			}
		}else {
			setJsonString("{\"success\" : false, \"msg\":\"用户不存在！\"}");
		}
		return SUCCESS;
	}
	
	public static JSONObject getUserInfo(String encryptedData,String sessionKey,String iv){
        // 被加密的数据
        byte[] dataByte = Base64.decode(encryptedData);
        // 加密秘钥
        byte[] keyByte = Base64.decode(sessionKey);
        // 偏移量
        byte[] ivByte = Base64.decode(iv);
        try {
            int base = 16;
            if (keyByte.length % base != 0) {
                int groups = keyByte.length / base + (keyByte.length % base != 0 ? 1 : 0);
                byte[] temp = new byte[groups * base];
                Arrays.fill(temp, (byte) 0);
                System.arraycopy(keyByte, 0, temp, 0, keyByte.length);
                keyByte = temp;
            }
            // 初始化
//            Security.addProvider(new Provider());
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS7Padding","BC");
            SecretKeySpec spec = new SecretKeySpec(keyByte, "AES");
            AlgorithmParameters parameters = AlgorithmParameters.getInstance("AES");
            parameters.init(new IvParameterSpec(ivByte));
            cipher.init(Cipher.DECRYPT_MODE, spec, parameters);// 初始化
            byte[] resultByte = cipher.doFinal(dataByte);
            if (null != resultByte && resultByte.length > 0) {
                String result = new String(resultByte, "UTF-8");
                return JSON.parseObject(result);
            }
        } catch (NoSuchAlgorithmException e) {
            logger.error(e.getMessage(), e);
        } catch (NoSuchPaddingException e) {
        	logger.error(e.getMessage(), e);
        } catch (InvalidParameterSpecException e) {
        	logger.error(e.getMessage(), e);
        } catch (IllegalBlockSizeException e) {
        	logger.error(e.getMessage(), e);
        } catch (BadPaddingException e) {
        	logger.error(e.getMessage(), e);
        } catch (UnsupportedEncodingException e) {
        	logger.error(e.getMessage(), e);
        } catch (InvalidKeyException e) {
        	logger.error(e.getMessage(), e);
        } catch (InvalidAlgorithmParameterException e) {
        	logger.error(e.getMessage(), e);
        } catch (NoSuchProviderException e) {
        	logger.error(e.getMessage(), e);
        }
        return null;
    }
}
