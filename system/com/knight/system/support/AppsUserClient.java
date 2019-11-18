/**
 *====================================================
 * 文件名称: AppsUserClient.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014年11月5日			Administrator(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.system.support;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.xml.namespace.QName;

import net.sf.json.JSONObject;

import org.apache.axis2.addressing.EndpointReference;
import org.apache.axis2.client.Options;
import org.apache.axis2.rpc.client.RPCServiceClient;
import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import com.knight.system.application.ApplicationContainer;

/**
 * @ClassName: AppsUserClient
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Administrator
 * @date 2014年11月5日 上午10:21:46
 */
public class AppsUserClient {

	public static String callAppsUserService(String serverUrl, String serverNameSpace, String methodName, Object[] args) throws Exception {
		if (!(Boolean) ApplicationContainer.getSystemParam("appAccessSwitch")) {
			return null;
		}
		if (StringUtils.isBlank(serverUrl)) {
			return null;
		}
		EndpointReference targetEPR = new EndpointReference(serverUrl);
		RPCServiceClient serviceClient = new RPCServiceClient();
		Options options = serviceClient.getOptions();
		options.setTo(targetEPR);
		QName method = new QName(serverNameSpace, methodName);
		Class<?>[] returnTypes = new Class[] { String.class };
		Object[] response = serviceClient.invokeBlocking(method, args, returnTypes);
		return (String) response[0];
	}
	
	public static void main(String[] args) {
		JSONObject jsonObject = JSONObject.fromObject("{rtnvalue:1}");
		String rtnvalue = jsonObject.getString("rtnvalue");
		System.out.println(rtnvalue);
	}
	
	 public static  String post(final HttpClient client, String url, Map<String, String> params) {
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
}
