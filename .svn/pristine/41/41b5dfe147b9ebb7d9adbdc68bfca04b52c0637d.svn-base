package com.knight.emms.terminal.support.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {
	
	//Date to String 
	public static String Date2String(Date sDate){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");  
		//Date date = new java.util.Date();  
		String str = sdf.format(sDate); 
		return str;
	}
	
	//String to Date
	public static Date String2Date(String sDate){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");  
	    Date date = null;
		try {
			date = sdf.parse(sDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	
}
