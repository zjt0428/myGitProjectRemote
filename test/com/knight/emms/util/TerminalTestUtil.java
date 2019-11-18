package com.knight.emms.util;

import com.knight.emms.terminal.Query;
import com.knight.emms.terminal.Tequest;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by YaoFly on 2016/8/10.
 */
public class TerminalTestUtil {
    private static TerminalTestUtil terminalTestUtil = new TerminalTestUtil();
    private TerminalTestUtil(){}
    public static TerminalTestUtil getInstance(){
        return terminalTestUtil;
    }

    private static String sysUrl, url;
    private static Map<String, String> secParam = new HashMap<String, String>();
    private static Tequest tequest = new Tequest();
    private static Query q = new Query();

    public static String post(final HttpClient client, String url, Map<String, String> params) {
        HttpPost post = null;
        try {
            List<NameValuePair> nvps = new ArrayList<NameValuePair>();
            if (params != null) {
                for (Map.Entry<String, String> entry : params.entrySet()) {
                    nvps.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
                }
            }
            post = new HttpPost(url);
            post.setEntity(new UrlEncodedFormEntity(nvps, "UTF-8"));
            HttpResponse response = client.execute(post);
            HttpEntity entity = response.getEntity();
            System.out.println(response.toString());
            String responseText = EntityUtils.toString(entity, "UTF-8");
            EntityUtils.consume(entity);
            return responseText;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (post != null) {
                post.releaseConnection();
            }
        }
    }
}
