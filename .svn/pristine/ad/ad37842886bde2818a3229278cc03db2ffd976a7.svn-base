/**
 *====================================================
 * 文件名称: EquipmentSupport.java
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

import com.knight.core.util.DateUtil;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.Status;
import com.knight.emms.model.Equipment;

/**
 * @ClassName: EquipmentSupport
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Administrator
 * @date 2014年5月15日 下午3:28:47
 */
public class EquipmentSupport {

	public static void completeDefaultEquipment(Equipment equipment) {
		equipment.setEquipId(null);
		Date purchaseDate = equipment.getPurchaseDate();
		equipment.setDepreciateDate(DateUtil.changeDateToStr(DateUtil.transpositionDate(purchaseDate, Calendar.YEAR, 1), DateUtil.LINK_DISPLAY_DATE));
		equipment.setStatusDate(equipment.getPurchaseDate());
		equipment.setPresentValue(equipment.getAssetValue());
		equipment.setTotalRate(BigDecimal.ZERO);
		equipment.setBusinessStatus(Status.EquipBusiness.disenable);
		equipment.setStoreStatus(Status.EquipComponStore.unstore);
		equipment.setStatus(Status.EquipCompon.unused);
		equipment.setDelFlag(Constant.ENABLED);
		if (equipment.getMortgageAmount() == null) {
			equipment.setMortgageAmount(BigDecimal.ZERO);
		}
		if (equipment.getDepreciateRate() == null) {
			equipment.setDepreciateRate(BigDecimal.ZERO);
		}
		if (Constant.ENABLED.equals(equipment.getMortgage())) { // 按揭贷款-付款状态
			if (equipment.getMortgageAmount().compareTo(BigDecimal.ZERO) == 1) {
				equipment.setFundStatus(Status.Fund.payment);
			} else {
				equipment.setFundStatus(Status.Fund.paymented);
			}
		} else { // 无按揭贷款-付款状态
			equipment.setMortgage(Constant.DISENABLED);
			equipment.setFundStatus(Status.Fund.paymented);
		}
		equipment.setFinishedAmount(BigDecimal.ZERO);
		equipment.setRemainderAmount(equipment.getMortgageAmount());
	}

}
