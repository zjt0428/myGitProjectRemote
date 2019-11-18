package com.knight.emms.terminal.action;

import com.knight.emms.util.HttpClientHelper;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by YaoFly on 2016/9/26.
 */
public class AnnounceMessageActionTest {
    private CloseableHttpClient httpClient;
    private String url;
    private String tmessage;
    @After
    public void tearDown() throws Exception {
        url += ";jsessionid=D2CCC727F40AEC21D22DCAE16E4F4A51";
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
    public void testPersonal() throws Exception {
        url = HttpClientHelper.sysUrl+"/terminal/personalAnnounceMessage.do";
        tmessage = "{query:{\"createTime\":\"2016-02-01\"}}";
    }

    @Test
    public void testPublish() throws Exception {

    }
}