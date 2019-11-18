package com.knight.emms.util;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.commons.httpclient.Cookie;
import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;   
import org.apache.commons.httpclient.HttpClient;   
import org.apache.commons.httpclient.HttpException;   
import org.apache.commons.httpclient.HttpStatus;   
import org.apache.commons.httpclient.methods.GetMethod;   
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import com.knight.core.support.StringSupport;
import com.knight.core.util.GsonUtil;




public class httpclient {
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		  
	     //构造HttpClient的实例
		String sessionid = "";
		String param = "",rtn="";
		String username="admin";
		String password=StringSupport.encryptMD5("1");
		String sysUrl="http://127.0.0.1:8080/emms";
		try{
			 
			 param = "?username="+java.net.URLEncoder.encode(username, "utf-8")
		    		 	+"&password="+java.net.URLEncoder.encode(password,"utf-8")
		    		 	+"&longitude=100&latitude=100";
		//	param = "?tmessage:{query:{userId:1,sgDate:2015-05-27}}";//"?userId=1&sgDate=2015-05-27";
		}catch(Exception e){
			e.printStackTrace();
		}
	     HttpClient httpClient = new HttpClient();
	    
	     //设置 Http 连接超时为5秒   
	     httpClient.getHttpConnectionManager().getParams().setConnectionTimeout(5000);   
	     //创建GET方法的实例   
	     String url = sysUrl +"/login.do";	//http://192.168.0.180:9085/emms
	    // String url = sysUrl +"/queryViewAttendamce.do";	//http://192.168.0.180:9085/emms
	     GetMethod getMethod = new GetMethod(url+param);   
	        
	     //设置 get 请求超时为 5 秒	     
	     getMethod.getParams().setParameter(HttpMethodParams.SO_TIMEOUT,5000);   
	     //使用系统提供的默认的恢复策略   
	     getMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER,new DefaultHttpMethodRetryHandler());   
	     try{   
	      //执行getMethod   
	      int statusCode = httpClient.executeMethod(getMethod);
	      
	      if (statusCode != HttpStatus.SC_OK){   
	       System.err.println("Method failed: "+ getMethod.getStatusLine());   
	      }
	         
	      //读取内容 ,第一种方式获取   
	      byte[] responseBody = getMethod.getResponseBody();
	      
	      //处理内容	      
	      Cookie[] cookies =  httpClient.getState().getCookies();
	      for(int i=0;i<cookies.length;i++){
	    	  if(cookies[i].getName()!=null &&"JSESSIONID".equals(cookies[i].getName()))
	    		  sessionid = cookies[i].getValue();
	      }	     
	      
	      JSONObject jsonObject = JSONObject.fromObject(new String(responseBody)); 
	      boolean bl = (Boolean)jsonObject.get("success"); 
	      System.out.println(bl);
	      if(bl==true){
	    	  rtn = sessionid;
	      }
	      
	  	  Map<String, String> secParam = new HashMap<String, String>();
	  	  secParam.put("userId", "1");
	  	  secParam.put("sgDate", "2015-05-27");
	  	
	  	  String str = GsonUtil.toJson(secParam);
	     // String secParam = "?tmessage={query:{userId:1,sgDate:2015-05-27}}";//"?userId=1&sgDate=2015-05-27";
	      String secUrl = sysUrl +"/queryViewAttendamce.do" + "?tmessage="+str;	//http://192.168.0.180:9085/emms
		  getMethod = new GetMethod(secUrl);
		  //设置 get 请求超时为 5 秒	     
		  getMethod.getParams().setParameter(HttpMethodParams.SO_TIMEOUT,5000);   
		  //使用系统提供的默认的恢复策略   
		  getMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER,new DefaultHttpMethodRetryHandler()); 
		        
		  int stCode = httpClient.executeMethod(getMethod);
		  
		  if (stCode != HttpStatus.SC_OK){   
		       System.err.println("Method failed: "+ getMethod.getStatusLine());   
		      }
		         
		      //读取内容 ,第一种方式获取   
		   byte[] responseBody11 = getMethod.getResponseBody();

	      
	      System.out.println(rtn+" || " +bl);
	     }catch(HttpException e){   
	      //发生致命的异常，可能是协议不对或者返回的内容有问题   
	        System.out.println("Please check your provided http address!");   
	        e.printStackTrace();   
	     }catch(IOException e){   
	      //发生网络异常   
	      e.printStackTrace();   
	     }finally{   
	      //释放连接   
	      getMethod.releaseConnection();   
	     }	   
	}

}
