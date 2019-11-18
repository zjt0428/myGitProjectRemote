/**
 *====================================================
 * 文件名称: ComponentSupport.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年5月15日			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.support;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang.StringUtils;

import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.Component;

/**
 * @ClassName: ComponentSupport
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Administrator
 * @date 2014年5月15日 下午5:02:09
 */
public class ComponentSupport {

	public static void completeCreateComponent(Component component) {
		component.setComponId(null);
		Date purchaseDate = component.getPurchaseDate();
		if (purchaseDate != null) {
			component.setDepreciateDate(DateUtil.changeDateToStr(DateUtil.transpositionDate(purchaseDate, Calendar.YEAR, 1), DateUtil.LINK_DISPLAY_DATE));
			component.setStatusDate(component.getPurchaseDate());
		} else {
			component.setStatusDate(new Date());
		}
		component.setTotalRate(BigDecimal.ZERO);
		component.setStatus(Status.EquipCompon.unused);
		component.setDelFlag(Constant.ENABLED);
		if (Constant.ENABLED.equals(component.getConsumeFlag())) { // 易耗品处理
			component.setConsumeCounts(component.getNumber());
			component.setNumber(1);
		} else { // 非易耗品
			component.setConsumeFlag(Constant.DISENABLED);
			component.setConsumeCounts(1); // 数量固定为1
		}
		component.setPeriodReserve(component.getConsumeCounts());
		component.setAssetValue(component.getUnitprice().multiply(new BigDecimal(component.getConsumeCounts())));
		component.setPresentValue(component.getAssetValue());
		if (!Constant.ENABLED.equals(component.getParachuteFlag())) {
			component.setParachuteFlag(Constant.DISENABLED);
		} else {
			if (StringUtils.isBlank(component.getParachuteCheckDate())) {
				component.setParachuteCheckDate(DateUtil.getCurrentLinkDateStr());
			}
		}
		if (!Constant.ENABLED.equals(component.getWallAttacheFlag())) {
			component.setWallAttacheFlag(Constant.DISENABLED);
		}
		if (!Constant.ENABLED.equals(component.getKnotFlag())) {
			component.setKnotFlag(Constant.DISENABLED);
		}
		if (!Constant.ENABLED.equals(component.getBoltFlag())) {
			component.setBoltFlag(Constant.DISENABLED);
		}
	}

}
