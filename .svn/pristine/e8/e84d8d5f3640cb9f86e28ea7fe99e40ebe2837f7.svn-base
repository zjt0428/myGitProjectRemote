var IndisProtocolForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.protocolId,
		relateModule : RelationModule.indisProtocol.relateModule,
		saveable : this.saveable
	});
	this.indisProtocolEquipGrid = new IndisProtocolEquipGrid(null, {
		saveable : this.saveable
	});
	var items = [ {
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.34,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "协议编号",
					name : "indisProtocol.protocolSerial"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "安装单位",
					name : "indisProtocol.inEntName",
					relateModule : RelationModule.corp.relateModule,
					importhandler : this.importCorpInfoArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "使用单位",
					name : "indisProtocol.emEntName",
					relateModule : RelationModule.customer.relateModule,
					importhandler : this.importCustomerArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "numberfield",
					fieldLabel : "附墙道数",
					value : 0,
					name : "accident.wallAttacheQty"
				}, {
					allowBlank : false,
					fieldLabel : "安拆资质证书号",
					name : "indisProtocol.inEntCertNum",
					value : "无"
				}, {
					xtype : "datefield",
					width : 125,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "填报日期",
					name : "indisProtocol.providedDate",
					value : new Date()
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "numberfield",
					fieldLabel : "最终安装高度(M)",
					value : 0,
					name : "indisProtocol.finalHeight"
				}, {
					allowBlank : false,
					fieldLabel : "资质等级",
					name : "indisProtocol.inEntTitleLevel",
					value : "无"
				} ]
			} ]
		}, {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.34,
				defaultType : "textfield",
				items : [ {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "项目名称",
					name : "indisProtocol.project.projectName",
					relateModule : RelationModule.project.relateModule,
					importhandler : this.importProjectArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.66,
				defaultType : "textfield",
				items : [ {
					anchor : "92%",
					readOnly : true,
					fieldLabel : "项目地址",
					name : "indisProtocol.project.address"
				} ]
			} ]
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 128,
			height : 48,
			fieldLabel : "备注",
			name : "indisProtocol.remark"
		}, fileAttachContainer ]
	}, {
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "98%",
		layout : "fit",
		items : [ this.indisProtocolEquipGrid ]
	} ];
	IndisProtocolForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		height : 420,
		form_config : {
			title : "安全协议",
			object : "indisProtocol",
			saveable : this.saveable,
			url : __ctxPath + "/safety/saveIndisProtocol.do",
			items : items,
			fieldMapping : IndisProtocolFieldMapping,
			hiddenField : IndisProtocolHiddenField
		}
	});
};
Ext.extend(IndisProtocolForm, Knight.ux.FormPanelWindow, {
	importProjectArchives : function(data) {
		var fieldNames = [ "projectId", "projectName", "address" ];
		this.setMultiFieldValue(this.paddingFieldNames("project", fieldNames), this.paddingValues(data, fieldNames));
	},
	importCustomerArchives : function(data) {
		this.setMultiFieldValue([ "emEnt", "emEntModule", "emEntName" ], [ data.customerId, RelationModule.customer.relateModule, data.customerName ]);
	},
	importCorpInfoArchives : function(data) {
		var fieldNames = [ "inEnt", "inEntModule", "inEntName", "inEntCertNum" ];
		var values = [ data.corpId, RelationModule.corp.relateModule, data.corpName, data.corpCert ? data.corpCert.certNum : "" ];
		this.setMultiFieldValue(fieldNames, values);
	},
	saveFormData : function() {
		this.setFieldValue("indisProtocolEquips", $gridstore2json(this.indisProtocolEquipGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.protocolId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/safety/loadIndisProtocol.do?protocolId=" + this.protocolId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.indisProtocolEquipSet, this.indisProtocolEquipGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "projectId", "projectName", "address" ];
			this.setMultiFieldValue(this.paddingFieldNames("project", fieldNames), this.paddingValues(this.contract, fieldNames));

			var contract = this.contract;
			var corpCert = this.inEntInfo.corpCert;
			fieldNames = [ "contractLease.contractId", "relateModule", "emEnt", "emEntModule", "emEntName", "inEnt", "inEntModule", "inEntName", "inEntCertNum" ];
			var values = [ contract.contractId, this.relateModule, contract.paEnt, contract.paModule, contract.paEntName, contract.pbEnt, contract.pbModule, contract.pbEntName, corpCert ? corpCert.certNum : "" ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});