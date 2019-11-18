package com.knight.emms.terminal.action;

import com.knight.core.util.GsonUtil;
import com.knight.emms.terminal.TerminalBaseAction;
import com.knight.emms.util.HttpClientHelper;
import com.knight.emms.util.TerminalTestUtil;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by YaoFly on 2016/8/10.
 */
public class AppDispatchActionTest extends TerminalBaseAction {
    private CloseableHttpClient httpClient;
    private String url;
    private String tmessage;
    @After
    public void tearDown() throws Exception {
        url += ";jsessionid=06DB3628C962CFCADB99B7FCF48826FB";
        HttpClientHelper.secParam.put("tmessage", tmessage);
        String responseText = HttpClientHelper.post(httpClient, url, HttpClientHelper.secParam);
        System.out.println(responseText);
    }

    @Before
    public void setUp() throws Exception {
        httpClient = HttpClients.custom().build();
        HttpClientHelper.sysUrl="http://localhost:8082/emms";
//        HttpClientHelper.sysUrl = "http://www.zutd.com.cn:9091/emms";
    }

    @Test
    public void testQueryList() throws Exception {

    }

    @Test
    public void testAdd() throws Exception {
        url = HttpClientHelper.sysUrl+"/terminal/addDispatch.do";
        tmessage = "";
    }

    @Test
    public void testQueryView() throws Exception {

    }

    @Test
    public void testQueryStore() throws Exception {

    }

    @Test
    public void testQueryContractlease() throws Exception {

    }

    @Test
    public void testClosed() throws Exception {

    }
}