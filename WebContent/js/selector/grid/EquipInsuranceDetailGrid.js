var EquipInsuranceDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		header : "状态",
		dataIndex : "equipment",
		renderer : function(n) {
			return n.statusName;
		}
	}, {
		xtype : "checkcolumn",
		header : "跟随主险",
		dataIndex : "defaultFlag",
		width : 40,
		renderer : function(v, p, record){
			p.css += ' x-grid3-check-col-td';
			var startInsureDate1 = this.parentForm.getFieldValue("startInsureDate");
			if(v == "true" || v == true){
				record.data.startInsureDate = startInsureDate1;
				v = '-on';
			}else{
				v = '';
				record.data.defaultFlag = '';
			}
			return String.format('<div class="x-grid3-check-col{0}">&#160;</div>', v);
		}.createDelegate(this)
	}, {
		header : "起保日期",
		dataIndex : "startInsureDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.startInsureDate = value;
			return value;
		}
	}, {
		header : "归属仓库",
		dataIndex : "equipment",
		renderer : function(n) {
			return n.storeName;
		}
	}, {
		header : "设备名称",
		dataIndex : "equipment",
		renderer : function(n) {
			return n.equipGenericName;
		}
	}, {
		header : "规格型号",
		dataIndex : "equipment",
		renderer : function(n) {
			return n.equipSpecificName;
		}
	}, {
		header : "出厂编号",
		dataIndex : "equipment",
		renderer : function(n) {
			return n.exwSerial;
		}
	}, {
		header : "设备自编号",
		dataIndex : "equipment",
		renderer : function(n) {
			return n.equipSerial;
		}
	}, {
		header : "设备价值",
		dataIndex : "equipWorth",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		tooltip : "可在代码词典处配置险种",
		header : "保险种类",
		dataIndex : "insuranceCategory",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.insureProgramData,
			editable : false
		}),
		renderer : function(value, metadata, record) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				record.data.insuranceCategory = value;
				value = store.getAt(index).data.name;
			}
			record.data.insuranceCategory = value;
			return value;
		}
	}, {
		header : "保费",
		dataIndex : "premium",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "合同编号",
		dataIndex : "contractNo",
	}, {
		header : "当前项目",
		dataIndex : "projectName",
	}, {
		header : "存放地址",
		dataIndex : "address",
	}, {
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		hidden : true,
		dataIndex : "contractId",
	}];
	EquipInsuranceDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "设备明细",
		option : "设备明细",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : EquipInsuranceDetailListViewField,
		columns : columns,
		delurl : __ctxPath + "/equip/multiDelDetailEquipInsurance.do"
	}, this.grid_config || {}));
};
Ext.extend(EquipInsuranceDetailGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		var startInsureDate = this.parentForm.getForm().findField("equipInsurance.startInsureDate").getValue();
		Ext.apply(record.data, {
			equipment : data,
			equipId : data.equipId,
			contractId : data.contractId,
			contractNo : data.contractNo,
			projectName : data.projectName,
			address : data.projectAddress,
			startInsureDate : startInsureDate,
			defaultFlag : true
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		var startInsureDate = this.parentForm.getForm().findField("equipInsurance.startInsureDate").getValue();
		if(startInsureDate==null){
			$toast("请先填写起保日期！");
			return;
		}
		new EquipLostHandleSelector({
			params : {
				"Q_equipGeneric_S_EQ" : "T",
			},
			collectEnable : true,
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
});
