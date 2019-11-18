package com.knight.emms.terminal.action;

import com.knight.emms.util.HttpClientHelper;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by YaoFly on 2016/12/12.
 */
public class UserActionTest {
    private CloseableHttpClient httpClient;
    private String url;
    private String tmessage;
    @After
    public void tearDown() throws Exception {
        url += ";jsessionid=D88DEDB2C05AB0D3E699600BFBF6C1AE";
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
    public void testList() throws Exception {

    }

    @Test
    public void testUpdate() throws Exception {

    }

    @Test
    public void testUpdatePassword() throws Exception {

    }

    @Test
    public void testResetPassword() throws Exception {

    }

    @Test
    public void testGetCurrent() throws Exception {
        url = HttpClientHelper.sysUrl+"/terminal/getCurrentUser.do";
        tmessage = "{}";
    }
}