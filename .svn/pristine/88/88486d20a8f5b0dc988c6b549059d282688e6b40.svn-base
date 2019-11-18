/**
 *====================================================
 * 文件名称: TruckCranePriceAction.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2017年7月10日		陈光毅(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.web.action;

import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.constant.ExclusionStrategyConstant;
import com.knight.emms.model.TruckCranePrice;
import com.knight.emms.service.TruckCranePriceService;

/**
 * @ClassName: TruckCranePriceAction
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 陈光毅
 * @date 2017年7月10日
 */
public class TruckCranePriceAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Long priceId;
	
	@Getter
	@Setter
	private TruckCranePrice truckCranePrice;
	
	@Resource
	private TruckCranePriceService truckCranePriceService;
	
	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<TruckCranePrice> list = truckCranePriceService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list, false));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}
	
	public String load() {
		TruckCranePrice m = truckCranePriceService.getTranslate(priceId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(m, GsonUtil.SINCE_VERSION_20, false));
        sb.append("]}");
        setJsonString(sb.toString());
		return SUCCESS;
	}
	
	@ActionLog(description = "新增或更新汽吊价格")
	public String save() {
		if (truckCranePrice.getPriceId() == null) {
			truckCranePrice.setDelFlag(Constant.ENABLED);
			truckCranePriceService.save(truckCranePrice);
		} else {
			truckCranePrice.setDelFlag(Constant.ENABLED);
			truckCranePriceService.merge(truckCranePrice);
		}
		return SUCCESS;
	}
	
	@ActionLog(description = "删除汽吊价格")
	public String multiDel() {
		 String[] ids = getRequest().getParameterValues("ids");
	        for (String id : ids) {
	        	truckCranePriceService.remove(new Long(id));
	        }
		return SUCCESS;
	}
}
