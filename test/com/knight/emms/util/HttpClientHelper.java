package com.knight.emms.util;

import java.util.*;
import java.util.Map.Entry;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.annotations.Expose;
import com.google.gson.reflect.TypeToken;
import com.knight.app.core.mode.RemindModule;
import com.knight.app.model.TAppEquipDispatchDetail;
import com.knight.app.model.TAppLogisticsComp;
import com.knight.core.util.DateUtil;
import com.knight.emms.model.ComponDiary;
import flexjson.test.mock.Person;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import com.knight.core.support.StringSupport;
import com.knight.core.util.GsonUtil;
import com.knight.emms.terminal.Query;
import com.knight.emms.terminal.Tequest;

/**
 * @ClassName: com.knight.emms.util.HttpClientHelper
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014年12月16日 上午8:55:21
 */
public class HttpClientHelper {

    public static String sysUrl, url;
    public static Map<String, String> secParam = new HashMap<String, String>();
    public static Tequest tequest = new Tequest();
    public static Query q = new Query();

    public static String post(final HttpClient client, String url, Map<String, String> params) {
        HttpPost post = null;
        try {
            List<NameValuePair> nvps = new ArrayList<NameValuePair>();
            if (params != null) {
                for (Entry<String, String> entry : params.entrySet()) {
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

    public static void main(String[] args) throws Exception {
        CloseableHttpClient httpClient = HttpClients.custom().build();
        sysUrl = "http://localhost:8081/emms";
//        sysUrl = "http://www.zutd.com.cn:9091/emms";
		login();
//        remindCount();
//        url += ";jsessionid=DCC6710C2F638AD357AC279D8A1E04D7";
        secParam.put("tmessage", GsonUtil.toJson(tequest, false));
        String responseText = post(httpClient, url, secParam);
        System.out.println(responseText);

    }

    public static void login() {
        url = sysUrl + "/login.do";
        secParam.put("username", "qiujf");
        secParam.put("password", StringSupport.encryptMD5("123456"));
        secParam.put("longitude", "100");
        secParam.put("latitude", "100");
    }

}

