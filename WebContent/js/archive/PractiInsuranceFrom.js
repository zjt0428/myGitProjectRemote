var PractiInsuranceFrom = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.approveable = this.approveable; // 审批功能按钮
	var fileAttachContainer = this.initFileAttachContainer({
		relateId : this.insureId,
		relateModule : RelationModule.practiInsurance.relateModule,
		saveable : this.saveable
	});
	var supplierFields = [ "insuranceCompany", "linkman", "claimPhone","linkmanPhone"];
	this.practiInsuranceDetailGrid = new PractiInsuranceDetailGrid({
		saveable : this.saveable,
		recordcallback : this.dispatchComponentArchives.createDelegate(this)
	},{
		parentForm : this,
	});
	

	var isTongRenNo = new Ext.form.Radio({
	    name:"practiInsurance.insuranceType",
	    width:70,
	    checked	:true,
	    boxLabel:"雇主责任险",
	    inputValue:"0"
	});
	var isTongRenYes = new Ext.form.Radio({
	    name:"practiInsurance.insuranceType",
	    boxLabel:"其他",
	    width:70,
	    inputValue:"1"
	});
	var bussinessArea = new Ext.form.RadioGroup({
		id : "insuranceType",
	    fieldLabel: '保险项目',
	    items:[isTongRenNo,isTongRenYes],
	    allowBlank: true/*,
	    listeners:{
	        afterrender:function () {
	        	bussinessArea.items.get(0).setValue(true);//默认选择第一个
	        }
	    }*/
	});
	var items = [ {
		id : this.insureId,
		xtype : "hidden",
	}, {
		xtype : "fieldset",
		title : "基本信息",
		anchor : "98%",
		collapsible : true,
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					readOnly : true,
					width : 180,
					fieldLabel : "填报人",
					name : "practiInsurance.userName"
				}, {
					fieldLabel : "保险单号",
					name : "practiInsurance.insureSerial"
				}, {
					readOnly : true,
					fieldLabel : "联系人",
					name : "practiInsurance.linkman"
				}, {
					fieldLabel : "保费总额",
					readOnly : true,
					name : "practiInsurance.totalPremium"
				},{
					fieldLabel : "联系人电话",
					readOnly : true,
					name : "practiInsurance.linkmanPhone"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					width : 180,
					readOnly : true,
					fieldLabel : "填报部门",
					name : "practiInsurance.department.depName"
				}, {
					xtype : "relationCompositeField",
					fieldLabel : "保险公司",
					allowBlank : false,
					readOnly : true,
					width : 180,
					name : "practiInsurance.insuranceCompany",
					relateModule : RelationModule.supplier.relateModule,
					fields : supplierFields,
					cleanhandler : this.cleanMultiField.createDelegate(this),
					importhandler : this.importSupplierArchives.createDelegate(this)
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "起保日期",
					name : "practiInsurance.startInsureDate",
				}, {
					fieldLabel : "保障人数",
					readOnly : true,
					name : "practiInsurance.practiMaxNum"
				}, {
					fieldLabel : "理赔总额",
					readOnly : true,
					name : "practiInsurance.claimAmount",
					value : "0"
				}, {
					hidden : true,
					name : "practiInsurance.practiNum"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					xtype : "datefield",
					format : "Y-m-d",
					width : 180,
					readOnly : true,
					allowBlank : false,
					fieldLabel : "填报日期",
					name : "practiInsurance.providedDate",
					value : new Date()
				}, {
					readOnly : true,
					fieldLabel : "理赔电话",
					name : "practiInsurance.claimPhone"
				}, {
					hidden : true,
					name : "practiInsurance.practiFull"
				}, {
					xtype : "datefield",
					format : "Y-m-d",
					width : 130,
					editable : false,
					fieldLabel : "停保日期",
					name : "practiInsurance.endInsureDate",
				},{
					xtype : "relationCompositeField",
					disabled : !this.saveable,
					readOnly : true,
					fieldLabel : "所属公司",
					name : "practiInsurance.corpName",
					relateModule : RelationModule.corp.relateModule,
					fields : [ "corpId", "corpName"],
					importhandler : this.importCorpArchives.createDelegate(this)
				} ]
			}  ]
		},{
			layout : "column",
			items : [
			{
				layout : "form",
				columnWidth : 0.35,
				items : [ bussinessArea]
			} ]
		}, {
			layout : "column",
			items : [
			{
				layout : "form",
				columnWidth : 0.99,
				items : [ {
					xtype : "textarea",
					maxLength : 128,
					maxLengthText : MoreThanMaxLength,
					anchor : "95%",
					height : "60",
					fieldLabel : "备注",
					name : "practiInsurance.remark"
				} ]
			} ]
		}, fileAttachContainer]
	} ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.practiInsuranceDetailGrid]
	});
	if(this.saveable != true){
		this.practiInsureClaimDetailGrid = new PractiInsureClaimDetailGrid({
			recordcallback : this.dispatchComponentArchives.createDelegate(this)
		},{
			parentForm : this,
			insureId : this.insureId
		});
		this.relateTabPanel.add(this.practiInsureClaimDetailGrid);
	}
	items.push(this.relateTabPanel);
	PractiInsuranceFrom.superclass.constructor.call(this, {
		title : "人员保险信息",
		animateTarget : this.animateTarget,
		y : 10,
		width : 860,
		height : 560,
		constrain: true,//禁止窗口移出浏览器屏幕
		layout : "fit",
		form_config : {
			labelWidth : 90,
			object : "practiInsurance",
			saveable : this.saveable,
			url : __ctxPath + "/archive/savePractiInsurance.do",
			items : items,
			fieldMapping : PractiInsuranceFieldMapping,
			hiddenField : PractiInsuranceHiddenField
		}
	});
};
Ext.extend(PractiInsuranceFrom, Knight.ux.FormPanelWindow, {
	importSupplierArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.supplierName, data.linkMan, data.tel, data.linkManPhone ]);
	},
	importCorpArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.corpId, data.corpName]);
	},
	dispatchComponentArchives : function(record) {
		if (Ext.isEmpty(record)) {
			return;
		}
	},
	saveFormData : function() {
		var gridCount = this.practiInsuranceDetailGrid.getStore().getCount();
		var practiNo = this.getFieldValue("practiMaxNum");
//		if(gridCount<1) {
//			$toast("未关联相关人员，无法保存！");
//			return;
//		}
		if(gridCount!=practiNo) {
			$toast("关联人员与最大保险人数不一致！");
		}
		var r = null;
		var g = null;
		var t = "0";
		var checkEndDate = this.getFieldValue("endInsureDate");
		var money = this.getFieldValue("totalPremium");
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		var time = year+"-"+month+"-"+day;
		var d1 = new Date(checkEndDate.replace(/\-/g, "\/"));
		var d2 = new Date(time.replace(/\-/g, "\/"));
		if(d1 < d2){
			$toast("停保日期必须大于当前时间！");
			return;
		}
		for (var i = 0; i < this.practiInsuranceDetailGrid.getStore().getCount(); i++) {
			r += Number( this.practiInsuranceDetailGrid.getStore().getAt(i).data.premium);
		}
		
		if(r < money){
			this.setFieldValue("totalPremium", money );
		}else if(r > money){
			this.setFieldValue("totalPremium", r );
		}
		if(gridCount >= practiNo){
			t = "1";
			this.setFieldValue("practiMaxNum", gridCount);
		}else if( gridCount < practiNo){
			this.setFieldValue("practiMaxNum", practiNo);
		}
		this.setFieldValue("practiFull", t );
		this.setFieldValue("practiNum", gridCount);
		this.setFieldValue("practiInsuranceDetails", $gridstore2json(this.practiInsuranceDetailGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.insureId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadPractiInsurance.do?insureId=" + this.insureId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.practiInsuranceDetailSet, this.practiInsuranceDetailGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}else{
			var fieldNames = [ "department.depId", "department.depName", "userId", "userName"];
			var values = [ curUserInfo.depId, curUserInfo.depName, curUserInfo.userId, curUserInfo.fullname];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});