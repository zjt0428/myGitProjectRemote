var AntiFallDetectionForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	var statusCombo = $initComboBoxField("检测状态", "antiFallDetection.status", "DETECT_STATUS", {
		allowBlank : true,
		readOnly : !this.saveable
	});
	this.exwSerialId = Ext.id();
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
					readOnly : false,
					fieldLabel : "检测编号",
					name : "antiFallDetection.detectNum"
				}, {
					id : "antiFallNum",
					readOnly : false,
					fieldLabel : "防坠器编号",
					name : "antiFallDetection.antiFallNum"
				},{
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "项目名称",
					name : "antiFallDetection.projectName",
					relateModule : RelationModule.project.relateModule,
					importhandler : this.importProjectArchives.createDelegate(this)
				},{
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					allowBlank : true,
					fieldLabel : "备案编号",
					name : "antiFallDetection.recordId",
					relateModule : RelationModule.equipment.relateModule,
					importhandler : this.importEquipmentArchives.createDelegate(this)
				},{id:this.exwSerialId,
					readOnly : true,
					fieldLabel : "出厂编号",
					name : "antiFallDetection.exwSerial"
				}]
			},  {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ statusCombo, {
					maxLength : 32,
					fieldLabel : "检测费用",
					name : "antiFallDetection.antiFallFee"
				},{
					maxLength : 32,
					fieldLabel : "所属企业",
					hidden:true,
					name : "antiFallDetection.userId"
				},  {
					xtype : "datefield",
					width : 120,
					editable : false,
					format : "Y-m-d H:i:s",
					fieldLabel : "检测评定日期",
					name : "antiFallDetection.startDate",
					value:new Date()
				}, {
					xtype : "datefield",
					width : 120,
					editable : false,
					format : "Y-m-d H:i:s",
					fieldLabel : "检测有效日期",
					name : "antiFallDetection.endDate",
					value:new Date()
				} ]
			} ]
		} ]
	} ];
	AntiFallDetectionForm.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		height : 480,
		form_config : {
			title : "防坠器检测",
			object : "antiFallDetection",
			saveable : this.saveable,
			url : __ctxPath + "/equip/saveAntiFallDetection.do",
			items : items,
			fieldMapping : AntiFallDetectionFieldMapping,
			hiddenField:AntiFallHiddenField
		}
	});
};
Ext.extend(AntiFallDetectionForm, Knight.ux.FormPanelWindow, {
	importProjectArchives : function(data) {
		this.setMultiFieldValue([ "projectName"], [data.projectName ]);
	},
	importEquipmentArchives : function(data) {
		this.setMultiFieldValue([ "recordId","exwSerial"], [data.recordId,data.exwSerial ]);
	},
	importCustomerArchives : function(data) {
		this.setMultiFieldValue([ "checkCustom", "checkCustomName" ], [ data.customerId, data.customerName ]);
	},
	importCorpInfoArchives : function(data) {
		this.setMultiFieldValue([ "rectifyEnt", "rectifyEntName" ], [ data.corpId, data.corpName ]);
	},
	saveFormData : function() {
		var info = curUserInfo;
		if(isCorpAppUser()){
			this.setFieldValue("userId",curUserInfo.corpInfo.corpId);
		}
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {

		this.getForm().load({
			deferredRender : false,
			url : __ctxPath + "/archive/loadComponent.do?componId=" + this.componId,
			waitMsg : "正在载入数据...",
			success : function(g, h) {
				var data = Ext.util.JSON.decode(h.response.responseText).data[0];
				Ext.getCmp("antiFallNum").setValue(data.leftcageSerial);
			}.createDelegate(this),
			failure : function(c, d) {
				Ext.Msg.alert("出错", "载入数据失败!");
			}
		});
		
		//var fieldNames = [ "userId"];
		/*alert(curUserInfo.corpInfo.corpId);
		var s = "";
		var s = curUserInfo.corpInfo;
		for(var i in s){
			s+=i+"="+s[i]+"  ";
		}
		alert(s);*/
		//this.setFieldValue("userId",curUserInfo.corpInfo.corpId);
		if (!Ext.isEmpty(this.antiFallId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/equip/loadAntiFallDetection.do?antiFallId=" + this.antiFallId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					//data.userId = curUserInfo.corpInfo.corpId;
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else{
			this.setFieldValue("antiFallNum",this.leftcageSerial)
	/*		var fieldNames = [ "equipId", "equipGenericName", "equipSpecificName", "recordId", "exwSerial" ];
			this.setMultiFieldValue(this.paddingFieldNames("equipment", fieldNames), this.paddingValues(this.equipment, fieldNames));*/
		}
			
	}
});