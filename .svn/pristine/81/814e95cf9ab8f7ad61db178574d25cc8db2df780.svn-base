package com.knight.emms.terminal.action;

import com.knight.emms.util.HttpClientHelper;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by YaoFly on 2016/8/24.
 */
public class DicCodeActionTest {
    private CloseableHttpClient httpClient;
    private String url;
    private String tmessage;
    @Before
    public void setUp() throws Exception {
        httpClient = HttpClients.custom().build();
//        HttpClientHelper.sysUrl="http://localhost:8082/emms";
        HttpClientHelper.sysUrl = "http://www.zutd.com.cn:9091/emms";
    }

    @After
    public void tearDown() throws Exception {
        url += ";jsessionid=2C31051281A8019CAA37E516C7EF5E7B";
        HttpClientHelper.secParam.put("tmessage", tmessage);
        String responseText = HttpClientHelper.post(httpClient, url, HttpClientHelper.secParam);
        System.out.println(responseText);

    }

    @Test
    public void testGetValueMap() throws Exception {
        url = HttpClientHelper.sysUrl+"/terminal/getValueMapDicCode.do";
        tmessage = "{\"query\":{\"codeId\":\"taskContent\"}}";
    }

}