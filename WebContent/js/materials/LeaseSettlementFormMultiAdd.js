var LeaseSettlementFormMultiAdd = function (a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	
	var leaseTypeCombo = $initComboBoxField("合同类型", "leaseSettlement.leaseType", "contractCategory", {
		width : 150,
		editable : false,
		readOnly : !this.saveable,
		disabled : !this.saveable,
		allowBlank : false
	})
	
	var settlementCombo = new Ext.form.ComboBox({
		hidden : this.isMulti,
		fieldLabel  : "结算方式",
		name : "leaseSettlement.settlement",
		width : 150,
		editable : false,
		readOnly : true,
		disabled : !this.saveable,
		mode : "local",
		allowBlank : false,
		triggerAction : "all",
		store : [["0", "算头不算尾"], ["1", "算尾不算头"], ["2", "算头又算尾"], ["3", "头尾都不算"]]
	})
	
	var items = [{
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		collapsible : true,
		items : [{
			xtype : "panel",
			layout : "column",
			items : [{
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					disabled : !this.saveable,
					editable : false,
					readOnly : true,
					fieldLabel : "结算编号",
					name : "leaseSettlement.settlementSerial"
				}, {
					disabled : !this.saveable,
					allowBlank : false,
					fieldLabel : "结算主题",
					name : "leaseSettlement.settlementTheme"
				}]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					disabled : !this.saveable,
					editable : false,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "填报人",
					name : "leaseSettlement.userName"
				}, {
					xtype : "datetimefield",
					format : "Y-m-d H:i:s",
					width : 150,
					disabled : !this.saveable,
					editable : false,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "填报日期",
					name : "leaseSettlement.fillDate",
					value : new Date()
				}, settlementCombo]
			}, {
				layout : "form",
				columnWidth : 0.25,
				defaultType : "textfield",
				items : [{
					id : "startDate",
					xtype : "datefield",
					format : "Y-m-d",
					width : 150,
					disabled : !this.saveable,
					editable : false,
					allowBlank : false,
					fieldLabel : "起始日期",
					name : "leaseSettlement.startDate"
				}, {
					id : "endDate",
					xtype : "datefield",
					format : "Y-m-d",
					width : 150,
					disabled : !this.saveable,
					editable : false,
					allowBlank : false,
					fieldLabel : "截止日期",
					name : "leaseSettlement.endDate"
				}]
			}]
		}]
	}]
	
	LeaseSettlementFormMultiAdd.superclass.constructor.call(this, {
		animateTarget : this.animateTarget,
		title : "租借结算",
		height : 420,
		form_config : {
			object : "leaseSettlement",
			saveable : this.saveable,
			approve : {
				action : this.approveable,
				relateId : this.settlementId,
				relateModule : RelationModule.leaseSettlement.relateModule
			},
			url : __ctxPath + "/materials/saveLeaseSettlement.do",
			items : items,
			fieldMapping : LeaseSettlementFieldMapping,
			hiddenField : LeaseSettlementHiddenField
		}
	});
}
Ext.extend(LeaseSettlementFormMultiAdd, Knight.ux.FormPanelWindow, {
	
	saveFormData : function() {
		var startDate = this.getForm().findField("leaseSettlement.startDate").value;
		var endDate = this.getForm().findField("leaseSettlement.endDate").value;
		if (new Date(startDate).format('Y-m-d H:i:s') > new Date(endDate).format('Y-m-d H:i:s')) {
			$toast("截止日期不能小于起始日期！");
			return;
		}
		var url = __ctxPath + "/materials/multiSaveLeaseSettlement.do?leaseIds="+this.leaseIds;
		this.multiSubmit(this.getForm(),url);
//		$formsubmit(this.getForm(), function(c, e) {
//			$toast("信息操作成功！");
//			var resp = Ext.util.JSON.decode(e.response.responseText);
//			if (resp.applyforId) {
//				this.submitApplication(__ctxPath + "/materials/multiSubmitLeaseSettlement.do", resp.applyforId);
//			} else if (this.callback) {
//				this.callback.call(this);
//			}
//			this.close();
//		}.createDelegate(this),null,url)
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.settlementId)) {
			
		} else {
			var fieldName = [ "userId", "userName" ];
			var value = [curUserInfo.userId, curUserInfo.fullname ];
			this.setMultiFieldValue(fieldName, value);
			this.setFieldValue("settlement",this[0].data.accountingMethod);
		}
	},
	multiSubmit : function(form,url) {
		form.submit({
			submitEmptyText:false,
			target: "附件详细信息",
			method : "POST",
			waitMsg : "正在提交数据...",
			url : url,
			success : function(b, c) {
				if (c.response.responseText.indexOf("success:false") != -1 || c.response.responseText.indexOf("\"success\":false") != -1) {
						var d = Ext.util.JSON.decode(c.response.responseText);
						msg = "由于批量新增的数量过多，需要时间处理，请稍后注意信息提示!";
						if (d.msg) {
							msg = d.msg;
						}
						Ext.MessageBox.show({
							title : "操作信息",
							msg : msg,
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
				} else {
					if(this.callback) {
						this.callback.call(this);
					}
					this.close();
					$toast("信息操作成功！");
				}
			}.createDelegate(this),
			failure : function(b, c) {
					var d = Ext.util.JSON.decode(c.response.responseText);
					msg = "由于批量新增的数量过多，需要时间处理，请稍后注意信息提示!";
					if (d.msg) {
						msg = d.msg;
					}
					Ext.MessageBox.show({
						title : "操作信息",
						msg : msg,
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			}.createDelegate(this)
		});
	}
})