var LogisticsTransportListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	if(!isGranted("__ALL")) {
		this.params.QVO_permissionFlag_S_LK = curUserInfo.dataPermission;
	}
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	var generalItems = null;
	var advancedItems = null;
	var applyforStatusCombo = $initComboBoxField("状态", "Q_applyforState_S_EQ", "LOGISTI_APPLYFOR_STATE", {
		width : 80,
		lable : "状态",
		allowBlank : true
		});

	if (!this.searchDisenable) {
		generalItems = [ {
			xtype : "datacombo",
			width : 75,
			lable : "签收意见",
			name : "Q_signResult_S_EQ",
			store : [ "正常", "异常" ]
		},  applyforStatusCombo, {
			lable : "物流单号",
			name : "Q_transportSerial_S_LK"
		}, {
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			lable : "发货人",
			name : "Q_deliveryMan_S_LK"
		}, {
			lable : "接货人",
			name : "Q_receiveMan_S_LK"
		}, {
			lable : "运输单位",
			name : "Q_transportEntName_S_LK"
		} ];
		advancedItems = [ {
			fieldType : "CHAR_FIELD",
			fieldLabel : "物流单号",
			name : "Q_transportSerial_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "项目名称",
			name : "Q_projectName_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "发货人",
			name : "Q_deliveryMan_S_LK"
		}, {
			fieldType : "CHAR_FIELD",
			fieldLabel : "接货人",
			name : "Q_receiveMan_S_LK"
		}, {
			fieldType : "DATE_RANGE_FIELD",
			fieldLabel : "发货时间",
			leftFieldLabel : "Q_deliveryDate_S_GE",
			rightFieldLabel : "Q_deliveryDate_S_LE"
		} , {
			fieldType : "CHAR_FIELD",
			fieldLabel : "运输单位",
			name : "Q_transportEntName_S_LK"
		},{
			fieldType : "COMBO_FIELD",
			name : "Q_signResult_S_EQ",
			store : [ "正常", "异常" ],
			fieldLabel : "签收意见"
		},{
			fieldType : "CODE_FIELD",
			codeId : "LOGISTI_APPLYFOR_STATE",
			name : "Q_applyforState_S_EQ",
			fieldLabel : "状态"
		}];
	}
	var actionItems = [ {
		iconCls : "btn-grid-read",
		text : "查看",
		qtip : "明细",
		handler : this.loadLogisticsTransport
	} ];
	if (!this.actionDisenable) {
		this.initRowActionItems(actionItems);
	}
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	var datagrid_config = {
		store : {
			fields : LogisticsTransportListViewField
		},
		rowAction : {
//			width : 60,
			actionItems : actionItems,
			renderer : this.rendererRowActionItems.createDelegate(this)
		},
		tbarItems : tbarItems,
		columns : [{
			header : "审批状态",
			dataIndex : "applyforState",
			renderer : function(n){
				switch (n) {
					case "0":
						return "待提交"
						break;
					case "1":
						return "待审核"
						break;
					case "2":
						return "待审批"
						break;
					case "3":
						return "审批通过"
						break;					
				}
			}
		}, {
			header : "物流单号",
			dataIndex : "transportSerial"
		},{
			header : "合同编号",
			dataIndex : "relateSerial"
		},{	
			width : 200,
			header : "项目名称",
			dataIndex : "projectName"
		}, {	
			width : 200,
			header : "收货地址",
			dataIndex : "address"
		} ,{
			header : "发货仓库",
			dataIndex : "deliveryEntName"
		}, {
			header : "发货时间",
			dataIndex : "deliveryDate"
		}, {
			header : "发货主题",
			dataIndex : "shipmentsTheme"
		}, {
			header : "备注",
			dataIndex : "remark"
		},{
			header : "审核时间",
			dataIndex : "acceptTime"
		},{
			header : "审批时间",
			dataIndex : "approveTime"
		}]
	};
	LogisticsTransportListView.superclass.constructor.call(this, Ext.apply({
		id : "LogisticsTransportListView",
		title : TabTitle.LOGISTICS_TRANSPORT_LIST,
		iconCls : "menu-business-contract",
		url : __ctxPath + "/dispatch/listLogisticsTransport.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems,
			advancedItems : advancedItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend(LogisticsTransportListView, Knight.ux.SearchGridPanel, {
	getRowClass : function(record, rowIndex, rowParams, store) {
		var status = record.data.signResult;
		if (status == "异常") {
			var task = new Ext.util.DelayedTask(function() {
				this.dataGridPanel.getView().addRowClass(rowIndex, "x-grid-back-red");
			}.createDelegate(this));
			task.delay(10);
		}
		
	},
	initRowActionItems : function(actionItems) {
		actionItems.push({
//			iconCls : "btn-submit",
			text : "审核",
			qtip : "审核",
			hidden : true,
			handler : this.acceptLogisticsTransport
		});
		actionItems.push({
//			iconCls : "btn-approve",
			text : "审批",
			qtip : "审批",
			hidden : true,
			handler : this.approveLogisticsTransport
		});
	},
	acceptLogisticsTransport : function(a) {
		if("1" != a.applyforState){
			$toast("【审核】的物流信息必须是【待审核】的状态！");
			return;
		}
		new LogisticsTransportForm(a, {
			acceptable : true,
			signable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	approveLogisticsTransport : function(a) {
		if ("2" != a.applyforState) {
			$toast("【审批】的物流信息必须是【待审批】的状态！");
			return;
		}
		new LogisticsTransportForm(a, {
			approveable : true,
			signable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
		
	},
	rendererRowActionItems : function(action, record) {
		switch (record.data.applyforState) {
			case "1":
				if (isGranted("_LogisticsTransportAccept")) {
					action[1].hidden = false;
				}
				break;
			
			case "2":
				if (isGranted("_LogisticsTransportApprove")) {
					action[2].hidden = false;
				}
				break;
		}	
	},
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_LogisticsTransportAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addLogisticsTransport.createDelegate(this)
			});
		}
		if (isGranted("_LogisticsTransportAddCompon")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "附件新增",
				handler : this.addLogisticsTransportCompon.createDelegate(this)
			});
		}
		if (isGranted("_LogisticsTransportEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editLogisticsTransport.createDelegate(this)
			});
		}
		if(isGranted("_LogisticsTransportSubmit")) {
			tbarItems.push({
				iconCls : "btn-submit",
				text : "提交",
				handler : this.submitLogisticsTransport.createDelegate(this)
			});
		}
		if (isGranted("_LogisticsTransportMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delLogisticsTransport.createDelegate(this)
			});
		}
		if (isGranted("_LogisticsTransport")) {
			tbarItems.push({
				hidden : true,
				iconCls : "btn-head-add",
				text : "生成启用单",
				handler : this.autoActivate.createDelegate(this)
			});
		}
		if (isGranted("_LogisticsTransportActivate")) {
			tbarItems.push({
				hidden : true,
				iconCls : "btn-head-add",
				text : "自动生成启用单",
				handler : this.autoAddActivate.createDelegate(this)
			});
		}
		tbarItems.push("->");
		if (isGranted("_LogisticsTransportPrints")) {
			tbarItems.push({
				iconCls : "btn-head-print",
				text : "打印装车清单",
				handler : this.printsLogisticsTransport.createDelegate(this)
			});
		}
		if (isGranted("_LogisticsTransportPrint") && isCorpAppUser()) {
			tbarItems.push({
				hidden : true,
				iconCls : "btn-head-print",
				text : "打印",
				handler : this.printLogisticsTransport.createDelegate(this)
			});
		}
		if (isGranted("_LogisticsTransportExport")) {
			tbarItems.push({
				iconCls : "btn-head-exporter",
				text : "导出",
				handler : this.exportLogisticsTransport.createDelegate(this)
			});
		}
		return tbarItems;
	},
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的物流信息！";
		var msg2 = "您确认要【" + op + "】所选的物流信息吗？";
		var msg3 = "成功【" + op + "】所选的物流信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	
	loadLogisticsTransport : function(a) {
		new LogisticsTransportForm(a, {
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	addLogisticsTransport : function() {
		new DispatchSelector({
			params : {
//				"QVO_permissionFlag_S_LK" : curUserInfo.dataPermission
			},
			single : true,
			callback : function(d) {
				var data = d[0].data;
				var data1;
				$request({
	                url : __ctxPath + "/dispatch/loadDispatch.do",
	                params : {
	                	dispatchId :data.dispatchId
	                },
	                success : function(g, h) {
	                	var resp = Ext.util.JSON.decode(g.responseText);
	                    var data1 = resp.data[0];
	                    new LogisticsTransportForm({
	                    	dispatchId :data.dispatchId,
	    					projectId : data.projectId,
	    					project : data,
	    					length : data1.dispatchEquipSet.length,
	    					data1 : data1.dispatchEquipSet
	    				}, {
	    					saveable : true,
	    					callback : function() {
	    						this.dataGridPanel.getStore().reload();
	    					}.createDelegate(this)
	    				}).show();	                    
	                }.createDelegate(this)	                                                      	                                
	            });				
			}.createDelegate(this)
		}).show();
	},
	addLogisticsTransportCompon : function() {
		new ContractLeaseSelector({
			single : true,
			params : {
				Q_applyforState_S_GE : "3",
				Q_applyforState_S_LE : "6"
			},
			callback : function(d) {
				var data = d[0].data;
				 new LogisticsTransportForm({
 					projectId : data.projectId,
 					project : data,
 					tag : "1"
 				}, {
 					saveable : true,
 					callback : function() {
 						this.dataGridPanel.getStore().reload();
 					}.createDelegate(this)
 				}).show();	      
			}.createDelegate(this)
		}).show();
	},
	editLogisticsTransport : function() {
		$editGridrowSelecte(this.dataGridPanel, function(a) {
			if ("0" != a.applyforState) {
				Ext.MessageBox.alert("操作信息", "【修改】的物流信息必须是【待提交】的物流信息！");
				return false;
			}
			return true;
		}.createDelegate(this), function(a) {
			new LogisticsTransportForm(a.data, {
                transportId : a.id,
				saveable : true,
				callback : function() {
					this.dataGridPanel.getStore().reload();
				}.createDelegate(this)
			}).show();
		}.createDelegate(this));
	},
	submitLogisticsTransport : function() {
		this.speciallyGridAction(this.dataGridPanel, "transportId", __ctxPath + "/dispatch/multiSubmitLogisticsTransport.do", "提交", function(a) {
			if ("0" == a.applyforState) {
				return true;
			}
			$toast("【提交】的物流信息必须是【待提交】的物流信息！");
			return false;
		}.createDelegate(this));
	},
	delLogisticsTransport : function() {
		this.speciallyGridAction(this.dataGridPanel, "transportId", __ctxPath + "/dispatch/multiDelLogisticsTransport.do", "删除", function(a) {
			if ("0" != a.applyforState) {
				Ext.MessageBox.alert("操作信息", "【修改】的物流信息必须是【待提交】的物流信息！");
				return false;
			}
			if ("0" == a.status) {
				return true;
			}
			$toast("【删除】的物流信息必须是【未签收】的物流信息！");
			return false;
		}.createDelegate(this));
	},
	printLogisticsTransport : function() {
		$print(this.dataGridPanel, function(a) {
			if("3" !== a[0].data["applyforState"]){
				$toast("审批未完成，无法打印");
			}else{
				return __ctxPath + "/dispatch/printLogisticsTransport.do?formpage=LogisticsTransport&transportId=" + a[0].data["transportId"];
			}
			
		});
	},
	printsLogisticsTransport : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要打印的装车信息！");
			return;
		}
		var url = __ctxPath + "/dispatch/printsLogisticsTransport.do?transportId=" + a[0].data["transportId"];
		window.open(url, "附件详细信息", "height=600,width=1000,top=0,left=0,toolbar=yes,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no");
	},
	exportLogisticsTransport : function() {
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/dispatch/exportLogisticsTransport.do", this.dataGridPanel);
	},
	
	autoActivate : function (){
		new ContractLeaseSelector({
			single : true,
			params : {
				Q_applyforState_S_GE : "3",
				Q_applyforState_S_LE : "6"
			},
			callback : function(d) {
				var data = d[0].data;
				 new LogisticsTransportForm({
 					projectId : data.projectId,
 					project : data,
 					tag : "1"
 				}, {
 					saveable : true,
 					callback : function() {
 						this.dataGridPanel.getStore().reload();
 					}.createDelegate(this)
 				}).show();	      
			}.createDelegate(this)
		}).show();
		
	},
	autoAddActivate : function(){
		 var a = this.dataGridPanel.getSelectionModel().getSelections();
	     if(a.length>1){
	        $toast("请最多选择一个进行生成启用单！");
	        return ;
	     }
	     if(a[0].data.applyforState != "3"){
	        $toast("请选择状态必须是审批通过的！");
	        return ;
	     }
	     for(var c = 0;c<a.length;c++){
	    	 $request({
	    		 url : __ctxPath + "/dispatch/loadLogisticsTransport.do?",
	             params : {
	                 transportId : a[c].data.transportId
	             },
	             success : function(g,h){
	            	 var resp = Ext.util.JSON.decode(g.responseText);
	            	 var data = resp.data[0];
	            	 new DispatchEquipSelector({
	        	    	 single : true,
	        	     	 params : {
	        	     		 Q_dispatchId_L_EQ : data.logisticsTrandetailSet[0].dispatchId,
	        	     	 },
	        	    	 callback : function() {
	  						var store = this.dataGridPanel.getStore();
	  						store.reload({callback:function(a){
	  						var transportId = store.getAt(0).data["transportId"];
	  						if(store.successProperty == "success"){
	  							Ext.Ajax.request({
	  								url : __ctxPath + "/dispatch/autoActivateLogisticsTransport.do",
	  								params : { ids : transportId},
	  								method : "POST",
	  								success : function(){
	  									
	  								}
	  							})
	  						}
	  						}});
	  					}.createDelegate(this)
	        	     }).show();
	            	 
	             }.createDelegate(this)
	    	 });
	     }
//	     new DispatchEquipSelector({
//	    	 single : true,
//	     	 params : {
//	     		 dispatchId : a[0].data.dispatchId
//	     	 }
//	     }).show();
	}
});
	