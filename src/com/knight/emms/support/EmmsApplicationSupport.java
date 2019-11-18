/**
 *====================================================
 * 文件名称: EmmsApplicationSupport.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年10月10日			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.support;

import java.util.Map;

import com.knight.emms.model.CorpInfo;
import com.knight.emms.model.Practitioner;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.constant.SystemConstant;
import com.knight.system.model.UserExtend;

/**
 * @ClassName: EmmsApplicationSupport
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Administrator
 * @date 2014年10月10日 下午3:32:06
 */
public class EmmsApplicationSupport {

	public static String getAppuserCorpName() {
		CorpInfo corpInfo = getAppuserCorpInfo();
		if (corpInfo == null) {
			return "";
		}
		return corpInfo.getCorpName();
	}

	public static CorpInfo getAppuserCorpInfo() {
		Map<String, UserExtend> appUserExtends = ApplicationContainer.getCurrentUser().getAppUserExtends();
		if (appUserExtends.isEmpty() || appUserExtends.get(SystemConstant.MODULE_PRACTITIONER) == null) {
			return null;
		}
		return ((Practitioner) appUserExtends.get(SystemConstant.MODULE_PRACTITIONER)).getCorpInfo();
	}

}
