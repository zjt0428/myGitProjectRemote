var LaborPayForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable; // 保存/重置功能按钮
	this.laborPayDetailGrid = new LaborPayDetailGrid({
		saveable : this.saveable,
		recordcallback : this.dispatchComponentArchives.createDelegate(this)
	},{
		parentForm : this,
	});

	var items = [ {
		id : this.laborPayId,
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
					readOnly : true,
					width : 250,
					fieldLabel : "合同编号",
					name : "laborPay.contractNo"
				}, {
					readOnly : true,
					fieldLabel : "设备类型",
					name : "laborPay.equipment.equipGenericName"
				}, {
					id : "startSettleDate",
					xtype : "datefield",
					format : "Y-m-d",
					readOnly : true,
					width : 150,
					editable : false,
					fieldLabel : "开始结算时间",
					name : "laborPay.startSettleDate",
				}, {
					fieldLabel : "应付金额",
					readOnly : true,
					name : "laborPay.copeAmount"
				},{
					fieldLabel : "工地项目经理",
					readOnly : true,
					name : "laborPay.leaseProjectHead"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					maxLength : 20,
					width : 250,
					readOnly : true,
					fieldLabel : "项目名称",
					name : "laborPay.projectName"
				}, {
					readOnly : true,
					fieldLabel : "规格型号",
					name : "laborPay.equipment.equipSpecificName"
				}, {
					id : "endSettleDate",
					xtype : "datefield",
					width : 150,
					format : "Y-m-d",
					readOnly : true,
					editable : false,
					fieldLabel : "截止时间",
					name : "laborPay.endSettleDate",
				}, {
					fieldLabel : "已支付",
					readOnly : true,
					name : "laborPay.paidAmount"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				items : [ {
					readOnly : true,
					width : 250,
					fieldLabel : "承租方",
					name : "laborPay.paEntName"
				}, {
					readOnly : true,
					fieldLabel : "设备自编号",
					name : "laborPay.equipment.equipSerial"
				}, {
					readOnly : true,
					fieldLabel : "税率",
					name : "laborPay.rate"
				},{
					readOnly : true,
					fieldLabel : "待支付",
					name : "laborPay.pendingAmount"
				} ]
			} ]
		}]
	} ];
	this.relateTabPanel = new Ext.TabPanel({
		autoHeight : true,
		anchor : "98%",
		activeTab : 0,
		items : [ this.laborPayDetailGrid]
	});
	items.push(this.relateTabPanel);
LaborPayForm.superclass.constructor.call(this, {
	title : "支付信息",
	animateTarget : this.animateTarget,
	y : 10,
	width : 860,
	height : 560,
	constrain: true,//禁止窗口移出浏览器屏幕
	layout : "fit",
	form_config : {
		labelWidth : 90,
		object : "laborPay",
		saveable : this.saveable,
		url : __ctxPath + "/dispatch/saveLaborPay.do",
		items : items,
		fieldMapping : LaborPayFieldMapping,
		hiddenField : LaborPayHiddenField
		}
	});
};
Ext.extend(LaborPayForm, Knight.ux.FormPanelWindow, {
	dispatchComponentArchives : function(record) {
		if (Ext.isEmpty(record)) {
			return;
		}
	},
	saveFormData : function() {
		var gridCount = this.laborPayDetailGrid.getStore().getCount();
		var a = 0;
		for(var i = 0;i < gridCount;i++){
			if(this.laborPayDetailGrid.getStore().getAt(i).data.payDate == ""){
				this.laborPayDetailGrid.getStore().removeAt(i);
			}else{
				a += Number(this.laborPayDetailGrid.getStore().getAt(i).data.issueAmount);
			}
		}
		this.setFieldValue("paidAmount", a);
		var b = this.getFieldValue("copeAmount");
		var c = Number(b)-Number(a);
		this.setFieldValue("pendingAmount", c);
		if(Number(c)<0){
			$toast("支付金额不正确，请确认");
			return false;
		}
		this.setFieldValue("laborPayDetails", $gridstore2json(this.laborPayDetailGrid));
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.laborPayId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/dispatch/loadLaborPay.do?laborPayId=" + this.laborPayId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.laborPayDetailSet, this.laborPayDetailGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		}else{
			var fieldNames = [ "contractNo", "equipment.equipGenericName", "startSettleDate", "copeAmount","leaseProjectHead","equipment.equipSpecificName",
			                   "endSettleDate","paEntName","equipment.equipSerial","rate","projectName","paEnt","paModule","equipment.equipId","laborSettId","afterTaxAmount","equipId"];
			var values = [ this.laborPay.contractNo, this.laborPay.equipment.equipGenericName, this.laborPay.startSettleDate, this.laborPay.costTotal,this.laborPay.leaseProjectHead,
			               this.laborPay.equipment.equipSpecificName,this.laborPay.endSettleDate,this.laborPay.paEntName,this.laborPay.equipment.equipSerial,this.laborPay.settleContract.taxRate,
			               this.laborPay.projectName,this.laborPay.paEnt,this.laborPay.paModule,this.laborPay.equipId,this.laborPay.laborSettId,this.laborPay.afterTaxAmount,this.laborPay.equipId];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});