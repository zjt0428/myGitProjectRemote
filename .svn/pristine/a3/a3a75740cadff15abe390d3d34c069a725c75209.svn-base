package com.knight.emms.terminal.action;

import com.google.gson.reflect.TypeToken;
import com.knight.core.util.DateUtil;
import com.knight.core.util.GsonUtil;
import com.knight.emms.model.ConstructPracti;
import com.knight.emms.util.HttpClientHelper;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.Set;

import static org.junit.Assert.*;

/**
 * Created by YaoFly on 2016/9/16.
 */
public class EquipmentActionTest {

    private CloseableHttpClient httpClient;
    private String url;
    private String tmessage;
    @After
    public void tearDown() throws Exception {
        url += ";jsessionid=1F9652BBACE7CD37460E35170C2A04D4";
        HttpClientHelper.secParam.put("tmessage", tmessage);
        String responseText = HttpClientHelper.post(httpClient, url, HttpClientHelper.secParam);
        System.out.println(responseText);
    }

    @Before
    public void setUp() throws Exception {
        httpClient = HttpClients.custom().build();
        HttpClientHelper.sysUrl="http://localhost:8080/mmis";
//        HttpClientHelper.sysUrl = "http://www.jjaq.com.cn:8916/mmis";
//        HttpClientHelper.sysUrl = "http://www.zutd.com.cn:9091/emms";
    }
//    @Test
//    public void testSubmitToCompany() throws Exception {
//    	url = HttpClientHelper.sysUrl+"/terminal/listEnvironment.do";
//    	tmessage = "{\"query\":{\"start\":0,\"pageSize\":10,\"inspectSchedule\":\"2\"}}";
//    }
//    @Test
//    public void testListPractitioner() throws Exception {
//        url = HttpClientHelper.sysUrl+"/equip/saveScrapApply.do";
//        tmessage = "{\"username\":\"15318991593\",\"password\":\"123456\",\"longitude\":\"15318991593\",\"latitude\":\"15318991593\",\"deviceToken\":\"AhnJOE6gC_NrbVcdayK-37XVXQc4g190G57cJ3AGshmG\"}";
//    }
//    @Test
//    public void testListPractitioner() throws Exception {
//    	url = HttpClientHelper.sysUrl+"/login.do";
//    	tmessage = "{\"username\":\"15318991593\",\"password\":\"123456\",\"longitude\":\"15318991593\",\"latitude\":\"15318991593\",\"deviceToken\":\"AhnJOE6gC_NrbVcdayK-37XVXQc4g190G57cJ3AGshmG\"}";
//    }
//
//    @Test
//    public void testJackOrDrop() throws Exception {
//        url = HttpClientHelper.sysUrl+"/terminal/jackOrDropEquipment.do";
////        tmessage = "{\"installId\":\"692\",\"jackFileAttaches\":\"100,110\",\"jjComponSet\":[{\"componId\":3343,\"counts\":-2,\"installId\":\"692\",\"jjTime\":\"2016-11-06\",\"jjUserName\":\"苏宏顺\"}],\"type\":\"drop\"}";
//        tmessage = "{\"installId\":\"703\",\"jjComponSet\":[{\"componId\":3333,\"counts\":-1,\"installId\":\"703\",\"jjTime\":\"2016-11-14\",\"jjUserName\":\"苏宏顺\"},{\"componId\":3339,\"counts\":-1,\"installId\":\"703\",\"jjTime\":\"2016-11-14\",\"jjUserName\":\"苏宏顺\"}],\"type\":\"drop\"}";
//    }
//
//    @Test
//    public void testDismantleSubmit() throws Exception {
//        url = HttpClientHelper.sysUrl+"/terminal/dismantleSubmitEquipment.do";
//        tmessage = "{\"flowId\":616,\"startdisDate\":\"2016-10-19 09:00:00\",\"enddisDate\":\"2016-10-19 09:00:00\"}";
//    }
//
//    @Test
//    public void testListEquip() throws Exception {
//        url = HttpClientHelper.sysUrl+"/terminal/listEquipEquipment.do";
//        tmessage = "{\"query\":{\"start\":0,\"pageSize\":20,\"keyword\":\"\"}}";
//    }
//
//    @Test
//    public void testwaitInstallCompon() throws Exception {
//        url = HttpClientHelper.sysUrl+"/terminal/waitInstallComponEquipment.do";
//        tmessage = "{\"query\":{\"projectId\":91,\"exwSerial\":\"\"}}";
//    }
//
//    @Test
//    public void testlistInstallCompondiary() throws Exception {
//        url = HttpClientHelper.sysUrl+"/terminal/listInstallCompondiaryEquipment.do";
//        tmessage = "{\"query\":{\"installId\":505,\"componGenericName\":\"防坠器\"}}";
//    }
//
//    @Test
//    public void testdismantleWaitList() throws Exception {
//        url = HttpClientHelper.sysUrl+"/terminal/dismantleWaitListEquipment.do";
//        tmessage = "{\"query\":{\"start\":0,\"pageSize\":100}}";
//    }
//
//    @Test
//    public void testdismantleSubmit() throws Exception {
//        url = HttpClientHelper.sysUrl+"/terminal/dismantleSubmitEquipment.do";
//        tmessage = "{\"flowId\":691,\"startdisDate\":\"2016-11-07\",\"enddisDate\":\"2016-11-07\",\"dismantleHeight\":\"11.5\",\"Address\":\"\",\"dismantleType\":\"1\"}";
//    }
//
//    @Test
//    public void testdismantleLoad() throws Exception {
//        url = HttpClientHelper.sysUrl+"/terminal/dismantleLoadEquipment.do";
//        tmessage = "{\"query\":{\"dismantleId\":325}}";
//    }
//
//    @Test
//    public void testwaitInstallPracti() throws Exception {
//        url = HttpClientHelper.sysUrl+"/terminal/waitInstallPractiEquipment.do";
//        tmessage = "{\"query\":{\"keyword\":\"建筑电工\"}}";
//    }
//    @Test
//    public void testlistComponentDispatch() throws Exception {
//        url = HttpClientHelper.sysUrl+"/terminal/listComponentDispatchEquipment.do";
//        url += ";jsessionid=B4D63D7FB19A52E5260B9AD8378BEFB1";
//        tmessage = "{\"query\":{\"keyword\":\"\",\"relateModule\":\"storeCompon\",\"start\":1,\"pageSize\":66,\"exwSerial\":\"120\",\"componSerial\":\"1010\",\"dimensions\":\"1010\",\"componGenericName\":\"1010\",\"componSpecificName\":\"1010\"}}";
//    }
//  @Test
//  public void testwaitInstallPracti() throws Exception {
//      url = HttpClientHelper.sysUrl+"/terminal/listEquipOnStatusEquipment.do";
//      tmessage = "{\"query\":{\"start\":0,\"pageSize\":100,\"businessStatus\":\"8\"}}";
//  }
//  @Test
//  public void countEquip() throws Exception {
//	  url = HttpClientHelper.sysUrl+"/terminal/countEquipEquipment.do";
//	  tmessage = "{\"query\":{\"keyword\":\"\"}}";
//  }
//
    @Test
    public void testinspectAllList() throws Exception {
    	url = HttpClientHelper.sysUrl+"/terminal/inspectAllListEquipment.do";
    	tmessage = "{\"query\":{\"start\":0,\"pageSize\":10,\"type\":\"1\"}}";
    }
//  
//    @Test
//    public void gatherList() throws Exception {
//    	url = HttpClientHelper.sysUrl+"/terminal/gatherEquipment.do";
//    	tmessage = "{\"query\":{\"start\":0,\"pageSize\":10\"}}";
//    }
    
//    @Test
//    public void inspectRectifySubmit() throws Exception {
//    	url = HttpClientHelper.sysUrl+"/terminal/inspectRectifySubmitEquipment.do";
//    	tmessage = "{\"inspectId\":1139,\"rectifyResult\":4,\"rectifyDate\":\"2017-09-03 20:33:00\",\"rectifyUsername\":陶飞,\"rectifyIntroduce\":null,\"relateModule\":EQUIP_INSPECT,\"longitude\":116.75164,\"latitude\":39.592267,\"fileAttaches\":\"5915\"}";
//    }
    
//    @Test
//    public void inspectLoad() throws Exception {
//    	url = HttpClientHelper.sysUrl+"/terminal/inspectLoadEquipment.do";
//    	tmessage = "{\"query\":{\"inspectId\":\"1134\"}}";
//    }
    
//    @Test
//    public void inspectWaitList() throws Exception {
//    	url = HttpClientHelper.sysUrl+"/terminal/inspectWaitListEquipment.do";
//    	tmessage = "{\"query\":{\"start\":0,\"pageSize\":10,\"projectName\":null,\"rectification\":\"0\"}}";
//    }
    
//    @Test
//    public void listEquip() throws Exception {
//    	url = HttpClientHelper.sysUrl+"/terminal/listEquipEquipment.do";
//    	tmessage = "{\"query\":{\"start\":0,\"pageSize\":10,\"keyword\":爬升架,\"relateModule\":projectStore,\"storeId\":\"270\"}}";
//    }
    
//    @Test
//    public void query() throws Exception {
//    	url = HttpClientHelper.sysUrl+"/terminal/queryEquipment.do";
//    	tmessage = "{\"query\":{\"start\":0,\"pageSize\":10,\"exwSerial\":NULL,\"recordId\":NULL,\"projName\":\"NULL\"}}";
//    }
    
//      @Test
//	  public void query() throws Exception {
//	  	url = HttpClientHelper.sysUrl+"/archive/equipDistributionEquipment.do";
//	  	tmessage = "{\"query\":{\"inspectId\":\"1134\"}}";
//	  }
}