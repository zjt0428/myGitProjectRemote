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
 * Created by YaoFly on 2016/9/19.
 */
public class AppRemindActionTest {
    private CloseableHttpClient httpClient;
    private String url;
    private String tmessage;
    @After
    public void tearDown() throws Exception {
        url += ";jsessionid=536D776AB2C83ED2CCAB01B9A08C53D5";
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
    public void testGetAllCount() throws Exception {
        url = HttpClientHelper.sysUrl+"/terminal/getAllCountRemind.do";
        tmessage="{\"query\":{\"remindModules\":[{\"moduleName\":\"CONSTRUCT_OPERATION\",\"params\": \"status\"" +
                ",\"value\": \"1\" }]}}";
    }
}