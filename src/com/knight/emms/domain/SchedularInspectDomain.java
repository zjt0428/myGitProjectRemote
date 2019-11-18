package com.knight.emms.domain;

/**
 * Created by YaoFly on 2016/10/26.
 */
public interface SchedularInspectDomain {

    //到周期自动生成巡检单
    public void autoCreateWaitEquipInspect();

  //巡检单过期封存
	void sealEquipInspect();

}
