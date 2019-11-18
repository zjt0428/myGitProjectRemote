package com.knight.system.model;

import java.io.Serializable;

import lombok.Data;

@Data

public class PanelItem implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String panelId;

	private int column;

	private int row;

}