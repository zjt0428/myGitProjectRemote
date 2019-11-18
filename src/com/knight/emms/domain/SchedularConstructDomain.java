package com.knight.emms.domain;

/**
 * Created by YaoFly on 2016/9/18.
 */
public interface SchedularConstructDomain {
    //即将到期提醒
    public void expiringSMSMessage();
    //超期提醒
    public void overTimeSMSMessage();
}
