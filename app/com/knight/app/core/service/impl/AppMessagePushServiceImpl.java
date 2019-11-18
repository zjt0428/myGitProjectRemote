package com.knight.app.core.service.impl;

import com.itextpdf.text.log.Logger;
import com.knight.app.core.message.AndroidNotification;
import com.knight.app.core.message.PushClient;
import com.knight.app.core.message.android.*;
import com.knight.app.core.message.ios.*;
import com.knight.app.core.service.AppMessagePushService;
import com.knight.core.ApplicationContextHelper;
import com.knight.core.util.DateUtil;
import com.knight.system.application.ApplicationContainer;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Date;

/**
 * Created by YaoFly on 2016/9/1.
 */
@Slf4j
public class AppMessagePushServiceImpl implements AppMessagePushService {
    private String timestamp = null;
    private PushClient client = new PushClient();

    public AppMessagePushServiceImpl() {}

    public void sendAndroidBroadcast() throws Exception {
    	String activity = "com.lcy.ztonline.activity.inspection.InspectionDetailActivity";
        AndroidBroadcast broadcast = new AndroidBroadcast((String)ApplicationContainer.getSystemParam("appKey"),(String)ApplicationContainer.getSystemParam("appMasterSecret"));
        broadcast.setTicker( "Android broadcast ticker");
        broadcast.setTitle(  "中文的title");
        broadcast.setText(   "Android broadcast text");
        broadcast.setExtraField("testFlag","1");
        broadcast.setExtraField("testFlag2","2");
        broadcast.goActivityAfterOpen(activity);
        broadcast.setDisplayType(AndroidNotification.DisplayType.NOTIFICATION);
        // TODO Set 'production_mode' to 'false' if it's a test device.
        // For how to register a test device, please see the developer doc.
        broadcast.setProductionMode();
        // Set customized fields
        broadcast.setExtraField("test", "helloworld");
        client.send(broadcast);
    }

    public void sendAndroidUnicast(String deviceToken,String ticker,String title,String text,String detail,String type){
        try {
            AndroidUnicast unicast = new AndroidUnicast((String)ApplicationContainer.getSystemParam("appKey"), (String)ApplicationContainer.getSystemParam("appMasterSecret"));
            // TODO Set your device token
            unicast.setDeviceToken(deviceToken);
            unicast.setTicker(ticker == null ? "测试通知栏文字" : ticker);
            unicast.setTitle(title == null ? "测试标题" : title);
            unicast.setText(text == null ? "测试内容" : text);
            unicast.goActivityAfterOpen("com.lcy.ztonline.activity.NewsDetailActivity");
            unicast.setDisplayType(AndroidNotification.DisplayType.NOTIFICATION);
            // TODO Set 'production_mode' to 'false' if it's a test device.
            // For how to register a test device, please see the developer doc.
            unicast.setProductionMode();
            // Set customized fields
            unicast.setExtraField("sendTime", DateUtil.changeDateToStr(new Date(),DateUtil.LINK_DISPLAY_DATE_FULL));
            unicast.setExtraField("title", title);
            unicast.setExtraField("content", text);
            unicast.setExtraField("detail", detail);
            unicast.setExtraField("type", type);
            System.out.println(unicast.toString());
            client.send(unicast);
        }catch (Exception e){
            e.printStackTrace();
            log.warn(title+"消息推送异常");
        }
    }
    

    public void sendAndroidUnicast(String deviceToken,String ticker,String title,String text){
        try {
            AndroidUnicast unicast = new AndroidUnicast((String)ApplicationContainer.getSystemParam("appKey"), (String)ApplicationContainer.getSystemParam("appMasterSecret"));
            // TODO Set your device token
            unicast.setDeviceToken(deviceToken);
            unicast.setTicker(ticker == null ? "测试通知栏文字" : ticker);
            unicast.setTitle(title == null ? "测试标题" : title);
            unicast.setText(text == null ? "测试内容" : text);
            unicast.goActivityAfterOpen("com.lcy.ztonline.activity.NewsDetailActivity");
            unicast.setDisplayType(AndroidNotification.DisplayType.NOTIFICATION);
            // TODO Set 'production_mode' to 'false' if it's a test device.
            // For how to register a test device, please see the developer doc.
            unicast.setProductionMode();
            // Set customized fields
            unicast.setExtraField("sendTime", DateUtil.changeDateToStr(new Date(),DateUtil.LINK_DISPLAY_DATE_FULL));
            unicast.setExtraField("title", title);
            unicast.setExtraField("content", text);
            System.out.println(unicast.toString());
            client.send(unicast);
        }catch (Exception e){
            e.printStackTrace();
            log.warn(title+"消息推送异常");
        }
    }

    public void sendAndroidGroupcast() throws Exception {
        AndroidGroupcast groupcast = new AndroidGroupcast((String)ApplicationContainer.getSystemParam("appKey"),(String)ApplicationContainer.getSystemParam("appMasterSecret"));
		/*  TODO
		 *  Construct the filter condition:
		 *  "where":
		 *	{
    	 *		"and":
    	 *		[
      	 *			{"tag":"test"},
      	 *			{"tag":"Test"}
    	 *		]
		 *	}
		 */
        JSONObject filterJson = new JSONObject();
        JSONObject whereJson = new JSONObject();
        JSONArray tagArray = new JSONArray();
        JSONObject testTag = new JSONObject();
        JSONObject TestTag = new JSONObject();
        testTag.put("tag", "test");
        TestTag.put("tag", "Test");
        tagArray.put(testTag);
        tagArray.put(TestTag);
        whereJson.put("and", tagArray);
        filterJson.put("where", whereJson);
        System.out.println(filterJson.toString());

        groupcast.setFilter(filterJson);
        groupcast.setTicker( "Android groupcast ticker");
        groupcast.setTitle(  "中文的title");
        groupcast.setText(   "Android groupcast text");
        groupcast.goAppAfterOpen();
        groupcast.setDisplayType(AndroidNotification.DisplayType.NOTIFICATION);
        // TODO Set 'production_mode' to 'false' if it's a test device.
        // For how to register a test device, please see the developer doc.
        groupcast.setProductionMode();
        client.send(groupcast);
    }

    public void sendAndroidCustomizedcast() throws Exception {
        AndroidCustomizedcast customizedcast = new AndroidCustomizedcast((String)ApplicationContainer.getSystemParam("appKey"),(String)ApplicationContainer.getSystemParam("appMasterSecret"));
        // TODO Set your alias here, and use comma to split them if there are multiple alias.
        // And if you have many alias, you can also upload a file containing these alias, then
        // use file_id to send customized notification.
        customizedcast.setAlias("alias", "alias_type");
        customizedcast.setTicker( "Android customizedcast ticker");
        customizedcast.setTitle(  "中文的title");
        customizedcast.setText(   "Android customizedcast text");
        customizedcast.goAppAfterOpen();
        customizedcast.setDisplayType(AndroidNotification.DisplayType.NOTIFICATION);
        // TODO Set 'production_mode' to 'false' if it's a test device.
        // For how to register a test device, please see the developer doc.
        customizedcast.setProductionMode();
        client.send(customizedcast);
    }

    public void sendAndroidCustomizedcastFile() throws Exception {
        AndroidCustomizedcast customizedcast = new AndroidCustomizedcast((String)ApplicationContainer.getSystemParam("appKey"),(String)ApplicationContainer.getSystemParam("appMasterSecret"));
        // TODO Set your alias here, and use comma to split them if there are multiple alias.
        // And if you have many alias, you can also upload a file containing these alias, then
        // use file_id to send customized notification.
        String fileId = client.uploadContents((String)ApplicationContainer.getSystemParam("appKey"),(String)ApplicationContainer.getSystemParam("appMasterSecret"),"aa"+"\n"+"bb"+"\n"+"alias");
        customizedcast.setFileId(fileId, "alias_type");
        customizedcast.setTicker( "Android customizedcast ticker");
        customizedcast.setTitle(  "中文的title");
        customizedcast.setText(   "Android customizedcast text");
        customizedcast.goAppAfterOpen();
        customizedcast.setDisplayType(AndroidNotification.DisplayType.NOTIFICATION);
        // TODO Set 'production_mode' to 'false' if it's a test device.
        // For how to register a test device, please see the developer doc.
        customizedcast.setProductionMode();
        client.send(customizedcast);
    }

    public void sendAndroidFilecast() throws Exception {
        AndroidFilecast filecast = new AndroidFilecast((String)ApplicationContainer.getSystemParam("appKey"),(String)ApplicationContainer.getSystemParam("appMasterSecret"));
        // TODO upload your device tokens, and use '\n' to split them if there are multiple tokens
        String fileId = client.uploadContents((String)ApplicationContainer.getSystemParam("appKey"),(String)ApplicationContainer.getSystemParam("appMasterSecret"),"aa"+"\n"+"bb");
        filecast.setFileId( fileId);
        filecast.setTicker( "Android filecast ticker");
        filecast.setTitle(  "中文的title");
        filecast.setText(   "Android filecast text");
        filecast.goAppAfterOpen();
        filecast.setDisplayType(AndroidNotification.DisplayType.NOTIFICATION);
        client.send(filecast);
    }

    public void sendIOSBroadcast() throws Exception {
        IOSBroadcast broadcast = new IOSBroadcast((String)ApplicationContainer.getSystemParam("appKey"),(String)ApplicationContainer.getSystemParam("appMasterSecret"));

        broadcast.setAlert("IOS 广播测试");
        broadcast.setBadge( 0);
        broadcast.setSound( "default");
        // TODO set 'production_mode' to 'true' if your app is under production mode
        broadcast.setTestMode();
        // Set customized fields
        broadcast.setCustomizedField("test", "helloworld");
        client.send(broadcast);
    }

    public void sendIOSUnicast(String deviceToken,String ticker,String title,String text){
        try {
        IOSUnicast unicast = new IOSUnicast((String)ApplicationContainer.getSystemParam("appKeyIOS"),(String)ApplicationContainer.getSystemParam("appMasterSecretIOS"));
        // TODO Set your device token
        unicast.setDeviceToken("913b6b5ca1066fc566caaea69f3200529513a9e55925bbe7bc3a9a189527d516");
        unicast.setAlert(text);
        unicast.setBadge( 1);
        unicast.setSound( "default");
        // TODO set 'production_mode' to 'true' if your app is under production mode
        unicast.setTestMode();
//        unicast.setProductionMode();
        // Set customized fields
        unicast.setCustomizedField("sendTime", DateUtil.changeDateToStr(new Date(),DateUtil.LINK_DISPLAY_DATE_FULL));
        unicast.setCustomizedField("title", title == null ? "测试标题" : title);
        unicast.setCustomizedField("content", text == null ? "测试标题" : text);
        client.send(unicast);
        }catch (Exception e){
            e.printStackTrace();
          log.warn(text+"------消息推送异常");
        }
    }
    
    public void sendIOSUnicast(String deviceToken,String ticker,String title,String text,String detail,String type){
        try {
        	IOSUnicast unicast = new IOSUnicast((String)ApplicationContainer.getSystemParam("appKeyIOS"),(String)ApplicationContainer.getSystemParam("appMasterSecretIOS"));
            // TODO Set your device token
        	 log.warn(deviceToken);
        	  unicast.setDeviceToken("913b6b5ca1066fc566caaea69f3200529513a9e55925bbe7bc3a9a189527d516");
              unicast.setAlert(text);
              unicast.setBadge( 1);
              unicast.setSound( "default");
              // TODO set 'production_mode' to 'true' if your app is under production mode
              //unicast.setTestMode();
//              unicast.setProductionMode();
              // Set customized fields
              unicast.setCustomizedField("sendTime", DateUtil.changeDateToStr(new Date(),DateUtil.LINK_DISPLAY_DATE_FULL));
              unicast.setTestMode();
              unicast.setCustomizedField("title", title == null ? "测试标题" : title);
              unicast.setCustomizedField("content", text == null ? "测试标题" : text);
              unicast.setCustomizedField("detail", detail == null ? "测试标题" : detail);
              unicast.setCustomizedField("type", type == null ? "测试标题" : type);
              client.send(unicast);
              }catch (Exception e){
                  e.printStackTrace();
                log.warn(text+"------消息推送异常");
              }
    }
    

    public void sendIOSGroupcast() throws Exception {
        IOSGroupcast groupcast = new IOSGroupcast((String)ApplicationContainer.getSystemParam("appKey"),(String)ApplicationContainer.getSystemParam("appMasterSecret"));
		/*  TODO
		 *  Construct the filter condition:
		 *  "where":
		 *	{
    	 *		"and":
    	 *		[
      	 *			{"tag":"iostest"}
    	 *		]
		 *	}
		 */
        JSONObject filterJson = new JSONObject();
        JSONObject whereJson = new JSONObject();
        JSONArray tagArray = new JSONArray();
        JSONObject testTag = new JSONObject();
        testTag.put("tag", "iostest");
        tagArray.put(testTag);
        whereJson.put("and", tagArray);
        filterJson.put("where", whereJson);
        System.out.println(filterJson.toString());

        // Set filter condition into rootJson
        groupcast.setFilter(filterJson);
        groupcast.setAlert("IOS 组播测试");
        groupcast.setBadge( 0);
        groupcast.setSound( "default");
        // TODO set 'production_mode' to 'true' if your app is under production mode
        groupcast.setTestMode();
        client.send(groupcast);
    }

    public void sendIOSCustomizedcast() throws Exception {
        IOSCustomizedcast customizedcast = new IOSCustomizedcast((String)ApplicationContainer.getSystemParam("appKey"),(String)ApplicationContainer.getSystemParam("appMasterSecret"));
        // TODO Set your alias and alias_type here, and use comma to split them if there are multiple alias.
        // And if you have many alias, you can also upload a file containing these alias, then
        // use file_id to send customized notification.
        customizedcast.setAlias("alias", "alias_type");
        customizedcast.setAlert("IOS 个性化测试");
        customizedcast.setBadge( 0);
        customizedcast.setSound( "default");
        // TODO set 'production_mode' to 'true' if your app is under production mode
        customizedcast.setTestMode();
        client.send(customizedcast);
    }

    public void sendIOSFilecast() throws Exception {
        IOSFilecast filecast = new IOSFilecast((String)ApplicationContainer.getSystemParam("appKey"),(String)ApplicationContainer.getSystemParam("appMasterSecret"));
        // TODO upload your device tokens, and use '\n' to split them if there are multiple tokens
        String fileId = client.uploadContents((String)ApplicationContainer.getSystemParam("appKey"),(String)ApplicationContainer.getSystemParam("appMasterSecret"),"aa"+"\n"+"bb");
        filecast.setFileId( fileId);
        filecast.setAlert("IOS 文件播测试");
        filecast.setBadge( 0);
        filecast.setSound( "default");
        // TODO set 'production_mode' to 'true' if your app is under production mode
        filecast.setTestMode();
        client.send(filecast);
    }
}
