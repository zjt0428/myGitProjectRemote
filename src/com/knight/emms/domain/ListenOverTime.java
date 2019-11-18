package com.knight.emms.domain;

import java.util.Date;

/**
 * Created by dell on 2016/5/20.
 */
public abstract class ListenOverTime<T> {





    private Date date;       //产生时间

    private Long overLenth;  //超时长度()

    private T data;          //超时要处理的模型数据

    private Boolean delFlag; //是否已处理

    public abstract void deal();//(超时)处理

    public Date getDate() {
        return date;
    }

    public Boolean isOverTime(){
        Date now=new Date();
        long l=now.getTime()-date.getTime();
        if(l>overLenth){
            return true;
        }else {
            return false;
        }
    }
    public Long getOverLenth() {
        return overLenth;
    }

    public void setOverLenth(Long overLenth) {
        this.overLenth = overLenth;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public Boolean getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(Boolean delFlag) {
        this.delFlag = delFlag;
    }

    public void setDate(Date date) {

        this.date = date;
    }
}
