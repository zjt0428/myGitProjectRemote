package com.knight.emms.terminal.action;

import com.knight.emms.util.HttpClientHelper;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by YaoFly on 2016/8/25.
 */
public class AppConfimActionTest {
    private CloseableHttpClient httpClient;
    private String url;
    private String tmessage;
    @After
    public void tearDown() throws Exception {
        url += ";jsessionid=9ECDAD52D053BF4B9467251F9E5DF39D";
        HttpClientHelper.secParam.put("tmessage", tmessage);
        String responseText = HttpClientHelper.post(httpClient, url, HttpClientHelper.secParam);
        System.out.println(responseText);
    }

    @Before
    public void setUp() throws Exception {
        httpClient = HttpClients.custom().build();
        HttpClientHelper.sysUrl="http://localhost:8082/emms";
    }

    @Test
    public void testSave() throws Exception {
        url = HttpClientHelper.sysUrl+"/terminal/saveAcceptConfim.do";
        tmessage ="{\"relateId\":38,\"relateModule\":\"CONSTRUCT_OPERATION\",\"acceptUsername\":\"超级管理员\",\"acceptDep\":\"厦门中塔租赁股份有限公司\",\"acceptTime\":\"2016-08-25 14:17:10\",\"acceptOpinion\":\"1\",\"acceptRemark\":\"受理\"}";
    }
}