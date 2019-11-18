var SecureProtocolForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮

	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.protocolId,
		relateModule : RelationModule.secureProtocol.relateModule,
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
					name : "secureProtocol.protocolSerial"
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "备案编号",
					name : "secureProtocol.equipment.recordId",
					relateModule : RelationModule.equipment.relateModule,
					importhandler : this.importEquipmentArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "安装单位",
					name : "secureProtocol.inEntName",
					relateModule : RelationModule.corp.relateModule,
					importhandler : this.importCorpInfoArchives.createDelegate(this)
				}, {
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "使用单位",
					name : "secureProtocol.emEntName",
					relateModule : RelationModule.customer.relateModule,
					importhandler : this.importCustomerArchives.createDelegate(this)
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					width : 125,
					editable : false,
					format : "Y-m-d",
					fieldLabel : "填报日期",
					name : "secureProtocol.providedDate",
					value : new Date()
				}, {
					readOnly : true,
					fieldLabel : "设备名称",
					name : "secureProtocol.equipment.equipGenericName"
				}, {
					allowBlank : false,
					fieldLabel : "安拆资质证书号",
					name : "secureProtocol.inEntCertNum",
					value : "无"
				}, {
					xtype : "numberfield",
					fieldLabel : "最终安装高度(M)",
					value : 0,
					name : "secureProtocol.finalHeight"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					fieldLabel : "出厂编号",
					name : "secureProtocol.equipment.exwSerial"
				}, {
					readOnly : true,
					fieldLabel : "规格型号",
					name : "secureProtocol.equipment.equipSpecificName"
				}, {
					allowBlank : false,
					fieldLabel : "资质等级",
					name : "secureProtocol.inEntTitleLevel",
					value : "无"
				}, {
					xtype : "numberfield",
					fieldLabel : "附墙道数",
					value : 0,
					name : "secureProtocol.wallAttacheQty"
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
					name : "secureProtocol.project.projectName",
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
					name : "secureProtocol.project.address"
				} ]
			} ]
		}, {
			xtype : "textarea",
			anchor : "95%",
			maxLength : 128,
			height : 48,
			fieldLabel : "备注",
			name : "secureProtocol.remark"
		}, fileAttachContainer ]
	} ];
	SecureProtocolForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		height : 420,
		form_config : {
			title : "安全协议",
			object : "secureProtocol",
			saveable : this.saveable,
			url : __ctxPath + "/safety/saveSecureProtocol.do",
			items : items,
			fieldMapping : SecureProtocolFieldMapping,
			hiddenField : SecureProtocolHiddenField
		}
	});
};
Ext.extend(SecureProtocolForm, Knight.ux.FormPanelWindow, {
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
	importEquipmentArchives : function(data) {
		var fieldNames = [ "equipId", "equipGenericName", "equipSpecificName", "recordId", "exwSerial" ];
		this.setMultiFieldValue(this.paddingFieldNames("equipment", fieldNames), this.paddingValues(data, fieldNames));
	},
	saveFormData : function() {
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
				url : __ctxPath + "/safety/loadSecureProtocol.do?protocolId=" + this.protocolId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
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
			var values = [ contract.contractId, this.relateModule, contract.paEnt, contract.paModule, contract.paEntName, contract.pbEnt, contract.pbModule, contract.pbEntName,
					corpCert ? corpCert.certNum : "" ];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});