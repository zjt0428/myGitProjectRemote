/**
 *====================================================
 * 文件名称: FundPlanSupport.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-12			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.support;

import java.util.Set;

import com.google.gson.reflect.TypeToken;
import com.knight.core.util.GsonUtil;
import com.knight.emms.core.InstalmentMethod;
import com.knight.emms.core.ReceivementMethod;
import com.knight.emms.model.Instalment;
import com.knight.emms.model.Receivement;

/**
 * @ClassName: FundPlanSupport
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-12 下午1:27:17
 */
public class FundPlanSupport {

	public static Set<Instalment> createInstalment(InstalmentMethod method, String remark) {
		Set<Instalment> instalmentSet = GsonUtil.fromJson(method.getInstalments(), new TypeToken<Set<Instalment>>() {});
		if (instalmentSet != null) {
			for (Instalment p : instalmentSet) {
				p.setRelateId(method.getInstalmentRelationId());
				p.setRelateSerial(method.getInstalmentRelationSerial());
				p.setRelateModule(method.getInstalmentRelationModule());
				p.setRemark(remark);
			}
		}
		return instalmentSet;
	}

	public static Set<Instalment> createInstalment(InstalmentMethod method) {
		return createInstalment(method, null);
	}

	public static Set<Receivement> createReceivement(ReceivementMethod method, String remark) {
		Set<Receivement> receivementSet = GsonUtil.fromJson(method.getReceivements(), new TypeToken<Set<Receivement>>() {});
		if (receivementSet != null) {
			for (Receivement p : receivementSet) {
				p.setRelateId(method.getReceivementRelationId());
				p.setRelateSerial(method.getReceivementRelationSerial());
				p.setRelateModule(method.getReceivementRelationModule());
				p.setRemark(remark);
			}
		}
		return receivementSet;
	}

	public static Set<Receivement> createReceivement(ReceivementMethod method) {
		return createReceivement(method, null);
	}

}
