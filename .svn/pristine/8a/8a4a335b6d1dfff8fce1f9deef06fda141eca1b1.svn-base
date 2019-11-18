package com.knight.system.model;

import java.util.HashSet;
import java.util.Set;

import lombok.Data;

import com.knight.core.model.BaseModel;

@Data
public class AppFunction extends BaseModel {

	private static final long serialVersionUID = 1L;

	protected Long functionId;

	protected String funKey;

	protected String funName;

	protected Set<FunUrl> funUrls = new HashSet<FunUrl>();

	public AppFunction() {
	}

	public AppFunction(String funKey, String funName) {
		this.funKey = funKey;
		this.funName = funName;
	}

	public AppFunction(Long in_functionId) {
		setFunctionId(in_functionId);
	}

}