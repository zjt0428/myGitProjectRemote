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
 * Created by YaoFly on 2016/8/24.
 */
public class AppConstructActionTest {
    private CloseableHttpClient httpClient;
    private String url;
    private String tmessage;
    @After
    public void tearDown() throws Exception {
        url += ";jsessionid=39499CD728E3B8AD998EE6507D23E971";
        HttpClientHelper.secParam.put("tmessage", tmessage);
        String responseText = HttpClientHelper.post(httpClient, url, HttpClientHelper.secParam);
        System.out.println(responseText);
    }

    @Before
    public void setUp() throws Exception {
        httpClient = HttpClients.custom().build();
        HttpClientHelper.sysUrl="http://localhost:8081/emms";
//        HttpClientHelper.sysUrl = "http://www.zutd.com.cn:9091/emms";
    }

    @Test
    public void testAdd() throws Exception {
        url = HttpClientHelper.sysUrl+"/terminal/addConstruct.do";
        tmessage = "{\"constructTheme\":\"082414\",\"licensePlate\":\"闽A56A5F\",\"constructDate\":\"2016-08-24\",\"practiNames\":\"李四,王五,张三\",\"username\":\"超级管理员\",\"providedDate\":\"2016-08-24\",\"buildingNum\":\"10\",\"summary\":\"150\",\"remark\":\"备注\",\"teams\":\"丘进发\",\"project\":{\"projectId\":92,\"projectName\":\"思明万达广场\",\"address\":\"福建省厦门市思明区厦门市思明区思明大道33号\"},\"equipment\":{\"equipId\":191,\"equipSpecificName\":\"QTZ63B\",\"exwSerial\":\"5456\",\"propertyName\":\"厦门中塔租赁股份有限公司\",\"recordId\":\"TTTTTTTT\"},\"constructOperationRealTasks \":\"[]\",\"constructOperationPlanTasks\":\"[{\\\"quantity\\\":1000,\\\"unitPrice\\\":15,\\\"summary\\\":150,\\\"contents\\\":\\\"1\\\",\\\"unit\\\":\\\"kg\\\",\\\"remark\\\":\\\"备注\\\"}]\",\"constructPlanPractis\":\"[{\\\"userId\\\":354,\\\"type\\\":\\\"0\\\"}]\"}";
    }


    @Test
    public void testList() throws Exception {
        url = HttpClientHelper.sysUrl+"/terminal/listConstruct.do";
        tmessage = "{\"query\":{\"status\":\"2\",\"keyword\":\"\",\"start\":\"0\",\"pageSize\":\"10\"}}";
    }

    @Test
    public void testLoad() throws Exception {
        url = HttpClientHelper.sysUrl+"/terminal/loadConstruct.do";
        tmessage = "{\"query\":{\"constructId\":\"72\"}}";
    }

    @Test
    public void testFill() throws Exception {
        url = HttpClientHelper.sysUrl+"/terminal/fillConstruct.do";
//        tmessage = "{\"constructId\":43,\"fileAttaches\":\"2174,2175\",\"username\":\"超级管理员\",\"actualPractiNames\":\"张三,李四,王五\",\"receiveDate\":\"2016-08-25\",\"actualDate\":\"2016-08-25\",\"mileage\":2.11,\"summary\":\"150\",\"constructOperationRealTasks \":\"[{\\\"quantity\\\":10,\\\"unitPrice\\\":15,\\\"summary\\\":150,\\\"contents\\\":\\\"1\\\",\\\"unit\\\":\\\"kg\\\",\\\"remark\\\":\\\"备注\\\"}]\",\"constructOperationPlanTasks\":\"[{\\\"quantity\\\":10,\\\"unitPrice\\\":15,\\\"summary\\\":150,\\\"contents\\\":\\\"1\\\",\\\"unit\\\":\\\"kg\\\",\\\"remark\\\":\\\"备注\\\"}]\"}";
        tmessage = "{\n" +
                "  \"actualDate\": \"2016-08-31\",\n" +
                "  \"actualPractiNames\": \"第五次测试人员\",\n" +
                "  \"constructId\": \"395\",\n" +
                "  \"constructOperationPlanTasks\": \"[{\\\"constructId\\\":\\\"278\\\",\\\"constructTaskId\\\":\\\"553\\\",\\\"contents\\\":\\\"第二任务\\\",\\\"quantity\\\":\\\"3\\\",\\\"summary\\\":\\\"765.00\\\",\\\"taskType\\\":\\\"0\\\",\\\"unit\\\":\\\"kh\\\",\\\"unitPrice\\\":\\\"255.00\\\"}]\",\n" +
                "  \"constructOperationRealTasks\": \"[{\\\"constructId\\\":\\\"278\\\",\\\"contents\\\":\\\"第二任务\\\",\\\"quantity\\\":\\\"3\\\",\\\"summary\\\":\\\"765.00\\\",\\\"taskType\\\":\\\"0\\\",\\\"unit\\\":\\\"kh\\\",\\\"unitPrice\\\":\\\"255.00\\\"}]\",\n" +
                "  \"constructRealPractis\": \"[{\\\"type\\\":\\\"1\\\",\\\"userId\\\":\\\"354\\\"}]\",\n" +
                "  \"fileAttaches\": \"2185\",\n" +
                "  \"mileage\": \"\",\n" +
                "  \"receiveDate\": \"\",\n" +
                "  \"remark\": \"叫姐姐\",\n" +
                "  \"summary\": \"2985.00\",\n" +
                "  \"username\": \"许燕琳3\"\n" +
                "}";
    }

    @Test
    public void testClosed() throws Exception {
        url = HttpClientHelper.sysUrl+"/terminal/closedConstruct.do";
        tmessage = "{\"constructId\":38}";
    }
}