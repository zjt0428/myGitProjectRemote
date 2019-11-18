package com.knight.emms.terminal.dto;

import java.util.ArrayList;
import java.util.List;

import com.knight.emms.model.Project;
import com.knight.emms.model.StoreHouse;

import lombok.Data;

public class StoreInfoResponse {
	private boolean success = true;
	
	private String msg = "操作成功";
	
	private String infoType = "STORE";
	
	private Info info = new Info();
	
	@Data
	public static class Info{
		private List<Result> results = new ArrayList<Result>();
	}
	
	@Data
	public static class Result{
		private Long storeId;
		
		private String storeName;
		
		private String storeAdress;
		
	}
	
	public void addStore(Project project,StoreHouse storeHouse){
		Result result = new Result();
		if(project!=null){
			result.setStoreId(project.getProjectId());
			result.setStoreName(project.getProjectName());
			result.setStoreAdress(project.getAddress());
		}
		if(storeHouse!=null){
			result.setStoreId(storeHouse.getStoreId());
			result.setStoreName(storeHouse.getStoreName());
			result.setStoreAdress(storeHouse.getAddress());
		}
		this.info.results.add(result);
	}
}
