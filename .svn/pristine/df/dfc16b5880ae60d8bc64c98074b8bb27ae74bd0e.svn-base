package com.knight.emms.web.action;

import java.math.BigDecimal;
import java.util.List;

import javax.annotation.Resource;

import lombok.Getter;
import lombok.Setter;

import com.knight.core.filter.QueryFilter;
import com.knight.core.log.ActionLog;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.core.web.action.BaseAction;
import com.knight.emms.constant.Constant;
import com.knight.emms.model.Car;
import com.knight.emms.service.CarService;

public class CarAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private Car car;

	@Getter
	@Setter
	private Long carId;

	@Resource
	private CarService carService;

	public String list() {
		QueryFilter filter = new QueryFilter(getRequest());
		List<Car> list = carService.queryTranslateAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':").append(filter.getPagingBean().getTotalItems()).append(",result:");
		buff.append(GsonUtil.toJson(list));
		buff.append("}");
		this.jsonString = buff.toString();
		return SUCCESS;
	}

	@ActionLog(description = "保存车辆档案信息")
	public String save() {
		if (car.getCarId() == null) {
			car.setStatus(Constant.ENABLED);
			car.setDisbursement(BigDecimal.ZERO);
			car.setDelFlag(Constant.ENABLED);
			carService.save(car);
			setFileAttach(car.getCarId());
		} else {
			Car c = carService.get(car.getCarId());
			car.setStatus(c.getStatus());
			car.setDelFlag(c.getDelFlag());
		}
		car.setSubCar();
		carService.merge(car);
		return SUCCESS;
	}

	@ActionLog(description = "加载车辆档案信息")
	public String load() {
		Car c = carService.getTranslateFull(carId);
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(GsonUtil.toJson(c, GsonUtil.SINCE_VERSION_20, DateUtil.LINK_DISPLAY_DATE, false));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}

	@ActionLog(description = "删除车辆费用信息")
	public String multiDelExpense() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			carService.deletedExpense(new Long(id));
		}
		return SUCCESS;
	}

	@ActionLog(description = "删除车辆档案信息")
	public String multiDel() {
		String[] ids = getRequest().getParameterValues("ids");
		for (String id : ids) {
			carService.remove(new Long(id));
		}
		return SUCCESS;
	}

}
