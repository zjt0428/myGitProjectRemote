package com.knight.emms.terminal.dto;

import com.knight.emms.model.Dispatch;
import com.knight.emms.model.DispatchEquip;

import lombok.Data;

import java.util.*;

public class AssetsDispatchResponse {
	private boolean success = true;
	
	private String msg = "操作成功";
	
	private String infoType = "DISPATCH";
	
	private Info info = new Info();
	
	@Data
	public static class Info{
		private List<Result> results = new ArrayList<Result>();
	}
	
	@Data
	public static class Result{
		private String dispatchTheme;
		
		private String userName;
		
		private String sendWareHouse;
		
		private String receiveWareHouse;
		
		private String dispatchDate;

		private String projectName;
	}
	
	public void addDispatch(Dispatch dispatch){
		for(DispatchEquip dispatchEquip : dispatch.getDispatchEquipSet()){
			Result result = new Result();
			result.setDispatchTheme(dispatch.getDispatchTheme());
			result.setUserName(dispatch.getUserName());
			result.setSendWareHouse(dispatchEquip.getEquipment().getStoreName());
			result.setReceiveWareHouse(dispatch.getProjectName());
			result.setDispatchDate(dispatch.getProvidedDate());
			this.info.results.add(result);
		}
	}

}
