package com.knight.emms.domain.impl;

import java.util.LinkedHashMap;
import java.util.Set;

import com.knight.app.model.TAppRepair;
import com.knight.emms.domain.ListenOverTime;
import com.knight.emms.domain.ScheduleAppRepairDomain;
import com.knight.emms.sms.api.OpenApi;
import com.knight.system.application.ApplicationContainer;

public class ScheduleAppRepairDomainImpl implements ScheduleAppRepairDomain{

	private boolean flag=false;
	//缓存对象
    private static LinkedHashMap<Object,ListenOverTime<TAppRepair>> treeMap=new LinkedHashMap<Object,ListenOverTime<TAppRepair>>();

    public static void add(Object key,ListenOverTime<TAppRepair> object){

        treeMap.put(key,object);

   }



   public static  void  remove(Object key){

         treeMap.remove(key);

   }


	
	@Override
	public void listenApply() {
		// TODO Auto-generated method stub
		if(flag==false){
			innit();
		}
		Scan();
	}


	private void innit(){

		flag=true;
	}

	/**
	 * 扫描
	 */
	private void Scan(){
		LinkedHashMap<Object,ListenOverTime<TAppRepair>> treeMapClone=null;
        treeMapClone= (LinkedHashMap<Object,ListenOverTime<TAppRepair>>) treeMap.clone();
		 Set<Object> sets=treeMapClone.keySet();
	        for (Object b:sets){
	           if(treeMapClone.get(b).isOverTime()){//判断是否超时
	        	   treeMapClone.get(b).deal();   //在克隆中扫描到就处理
	        	   treeMap.remove(b);//处理后删除
	           }
	        }

	}
}
