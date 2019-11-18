package com.knight.emms.service.impl;

import javax.annotation.Resource;

import com.knight.emms.dao.CarDao;
import com.knight.emms.dao.CarExpenseDao;
import com.knight.emms.model.Car;
import com.knight.emms.service.CarService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;
import com.knight.system.service.impl.CodeServiceImpl;

public class CarServiceImpl extends BusinessLongPKServiceImpl<Car> implements CarService {

	private CarDao carDao;

	@Resource
	private CarExpenseDao carExpenseDao;

	public CarServiceImpl(CarDao dao) {
		super(dao);
		this.carDao = dao;
	}

	public Car getTranslateFull(Long carId) {
		Car c = carDao.get(carId);
		CodeServiceImpl.translate(c, getPersistantStruct());
		c.getCarExpenseSet();
		return c;
	}

	public void deletedExpense(Long carExpenseId) {
		carExpenseDao.remove(carExpenseId);
	}

}
