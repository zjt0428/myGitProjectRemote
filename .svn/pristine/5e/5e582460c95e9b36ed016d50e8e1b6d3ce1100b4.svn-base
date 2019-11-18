package com.knight.app.core.service;

/**
 * Created by YaoFly on 2016/9/1.
 */
public interface AppMessagePushService {
    //向所有Android设备发送广播消息
    public void sendAndroidBroadcast() throws Exception;

    //向指定Android设备发送单播消息
    public void sendAndroidUnicast(String deviceToken,String ticker,String title,String text,String detail,String type);
    
    //向指定Android设备发送单播消息
    public void sendAndroidUnicast(String deviceToken,String ticker,String title,String text);

    //向指定Android设备发送列播消息
    public void sendAndroidGroupcast() throws Exception;

    //向Android设备发送alias通知
    public void sendAndroidCustomizedcast() throws Exception;
    public void sendAndroidCustomizedcastFile() throws Exception;

    //向Android设备发送filecast文件通知
    public void sendAndroidFilecast() throws Exception;


    //向所有IOS设备发送广播消息
    public void sendIOSBroadcast() throws Exception;

    //向指定IOS设备发送单播消息
    public void sendIOSUnicast(String deviceToken,String ticker,String title,String text);
    public void sendIOSUnicast(String deviceToken,String ticker,String title,String text,String detail,String type);

    //向指定IOS设备发送列播消息
    public void sendIOSGroupcast() throws Exception;

    //向IOS设备发送alias通知
    public void sendIOSCustomizedcast() throws Exception;

    //向IOS设备发送filecast文件通知
    public void sendIOSFilecast() throws Exception;
}
