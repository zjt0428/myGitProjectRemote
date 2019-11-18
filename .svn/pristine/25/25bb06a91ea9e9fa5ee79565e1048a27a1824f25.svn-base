var LogisticsBackdetailGrid2 = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.carTextFieldId = Ext.id();
	this.driverTextFieldId = Ext.id();
	this.linktelTextFieldId = Ext.id();
	this.carId = null;
	this.licensePlate = null;
	this.driver = null;
	this.driverPhone = null;

	var columns = [ {
		header : "运输车辆",
		dataIndex : "licensePlate"
	}, {
		header : "司机",
		dataIndex : "driver"
	}, {
		header : "联系电话",
		dataIndex : "driverPhone"
	}, {
		header : "零配件",
		dataIndex : "component",
		renderer : function(n) {
			return n.componGenericName;
		}
	}, {
		header : "配件型号",
		dataIndex : "component",
		renderer : function(n) {
			return n.componSpecificName;
		}
	}, {
		header : "配件规格",
		dataIndex : "component",
		renderer : function(n) {
			return n.dimensions;
		}
	}, {
		header : "运输数量",
		dataIndex : "counts",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999
		})
	}, {
		header : "计量单位",
		dataIndex : "component",
		renderer : function(n) {
			return n.calculate;
		}
	}, {
		width : 130,
		header : "备 注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 128
		})
	} ];
	if (this.saveable) {
		this.tbarItems = [ "-", {
			xtype : "label",
			style : "margin:1px 0px 0px 5px;",
			html : "运输车辆<font color=red>*</font>:"
		}, {
			id : this.carTextFieldId,
			style : "margin:1px 0px 0px 5px;",
			xtype : "textfield",
			allowBlank : false,
			width : 90
		}, {
			xtype : "label",
			style : "margin:1px 0px 0px 5px;",
			html : "司机"
		}, {
			id : this.driverTextFieldId,
			style : "margin:1px 0px 0px 5px;",
			xtype : "textfield",
			allowBlank : false,
			width : 90
		}, {
			xtype : "label",
			style : "margin:1px 0px 0px 5px;",
			html : "联系电话"
		}, {
			id : this.linktelTextFieldId,
			style : "margin:1px 0px 0px 5px;",
			xtype : "textfield",
			allowBlank : false,
			width : 90
		}, {
			xtype : "button",
			disabled : !this.saveable,
			style : "margin:1px 0px 0px 1px;",
			autoWidth : true,
			iconCls : "btn-clean",
			handler : this.cleanMultiField.createDelegate(this)
		}, {
			xtype : "button",
			disabled : !this.saveable,
			style : "margin:1px 0px 0px 1px;",
			autoWidth : true,
			iconCls : "btn-anchor-point",
			handler : this.importCarArchives.createDelegate(this)
		} ];
	}
	LogisticsBackdetailGrid2.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : LogisticsBackdetail2ListViewField,
		title : "物流清单信息",
		option : "物流清单信息",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelBackdetailLogisticsBacksport.do"
	}, this.grid_config || {}));
};
Ext.extend(LogisticsBackdetailGrid2, Knight.ux.SubModuleBaseGrid, {
	importCarArchives : function() {
		new CarSelector({
			callback : function(d) {
				var data = d[0].data;
				this.carId = data.carId;
				var carTextField = Ext.getCmp(this.carTextFieldId);
				carTextField.setValue(data.licensePlate);
				carTextField.setReadOnly(true);
				var driverTextField = Ext.getCmp(this.driverTextFieldId);
				driverTextField.setValue(data.driver);
				var linktelTextField = Ext.getCmp(this.linktelTextFieldId);
				linktelTextField.setValue(data.driverPhone);
			}.createDelegate(this)
		}).show();
	},
	cleanMultiField : function() {
		var carTextField = Ext.getCmp(this.carTextFieldId);
		this.carId = null;
		carTextField.setValue("");
		carTextField.setReadOnly(false);
	},
	addSubModuleDate : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			var record = this.getStore().getAt(i).data;
			if (record.component.componId == data.componId) {
				return;
			}
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			carId : this.carId,
			licensePlate : this.licensePlate,
			driver : this.driver,
			driverPhone : this.driverPhone,
			component : data.component,
			counts : data.counts
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
	},

	addSubModule : function() {
		this.licensePlate = Ext.getCmp(this.carTextFieldId).getValue();
		this.driver = Ext.getCmp(this.driverTextFieldId).getValue();
		this.driverPhone = Ext.getCmp(this.linktelTextFieldId).getValue();
		if (Ext.isEmpty(this.licensePlate) || Ext.isEmpty(this.driver) || Ext.isEmpty(this.driverPhone)) {
			Ext.Msg.alert("信息提示", "【车辆】【司机】【司机联系方式】不允许为空!");
			return;
		}
//		$toast(this.rowId + " ^^^ " + this.flowId);
		if(!Ext.isEmpty(this.rowId)){
			new ComponIntoSelector({				
				params : {
					"Q_rowId_L_EQ" : this.rowId
				},
				callback : function(d) {
					for (var i = 0; i < d.length; i++) {
						var data = d[i].data;
						this.addSubModuleDate(data);
					}
				}.createDelegate(this)
			}).show();
			
		}		
	}
});