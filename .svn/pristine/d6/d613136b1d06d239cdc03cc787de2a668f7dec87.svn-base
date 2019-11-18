var LogisticsTrandetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.carTextFieldId = Ext.id();
	this.driverTextFieldId = Ext.id();
	this.linktelTextFieldId = Ext.id();
	this.carId = null;
	this.licensePlate = null;
	this.driver = null;
	this.driverPhone = null;
	
	var columns = [{
		header : "运输车辆",
		dataIndex : "licensePlate"
	}, {
		header : "司机",
		dataIndex : "driver"
	}, {
		header : "联系电话",
		dataIndex : "driverPhone"
	}, {
		header : "配件类别",
		dataIndex : "dispatchCompon",
		renderer : function(value, metadata, record) {
			return record.data.dispatchCompon.component.componCategoryName;
		}
	}, {
		header : "设备型号",
		dataIndex : "dispatchCompon",
		renderer : function(value, metadata, record) {
			return record.data.dispatchCompon.component.componSpecificName;
		}
	}, {
		header : "生产厂家",
		dataIndex : "dispatchCompon",
		renderer : function(value, metadata, record) {
			return record.data.dispatchCompon.component.equipVenderName;
		}
	}, {
		header : "配件名称",
		dataIndex : "dispatchCompon",
		renderer : function(value, metadata, record) {
			return record.data.dispatchCompon.component.componGenericName;
		}
	}, {
		header : "配件规格",
		dataIndex : "dispatchCompon",
		renderer : function(value, metadata, record) {
			return record.data.dispatchCompon.component.dimensions;
		}
	}, {
		header : "计量单位",
		dataIndex : "dispatchCompon",
		renderer : function(value, metadata, record) {
			return record.data.dispatchCompon.component.calculate;
		}
	},{
		header : "调度数量",
		dataIndex : "dispatchCompon",
		renderer : function(value, metadata, record) {
			return	record.data.dispatchCompon.iniCounts;
		}
	},{
		header : "装车数量",
		dataIndex : "counts",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxValue : 999
		})
	},  {
		width : 130,
		header : "备 注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 128
		})
	} ];
	if (this.signable) {
		columns.push({
			header : "签收数量",
			dataIndex : "signCounts",
			editor : new Ext.form.NumberField({
				allowBlank : false,
				maxValue : 999
			})
		});
	}
	if (this.saveable) {
		this.tbarItems = [{
			xtype : "button",
			disabled : !this.saveable,
			style : "margin:1px 0px 0px 1px;",
			autoWidth : true,
			iconCls : "btn-head-edit",
			text:"车辆",
			handler : this.importCarArchives.createDelegate(this)
		} ];
	}
	LogisticsTrandetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : LogisticsTrandetailListViewField,
		title : "配件发货清单",
		option : "配件发货清单",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelTrandetailLogisticsTransport.do"
	}, this.grid_config || {}));
};
Ext.extend(LogisticsTrandetailGrid, Knight.ux.SubModuleBaseGrid, {
	beforeedit : function(a) {
		if (this.signable && a.field == "signCounts") {
			return true;
		}
		return this.saveable;
	},
	importCarArchives : function() {
		var a = this.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】车辆的记录！");
			return;
		}
		new CarSelector({
			callback : function(d) {
				var data = d[0].data;
				this.licensePlate = data.licensePlate;
				this.driver = data.driver;
				this.driverPhone = data.driverPhone;
				for(j = 0;j<a.length;j++ ){
					a[j].set("licensePlate",this.licensePlate);
					a[j].set("driver",this.driver);
					a[j].set("driverPhone",this.driverPhone);
				}	
			}.createDelegate(this)
		}).show();
	},
	addSubModuleDate : function(data) {

		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			dispatchId : data.dispatch.dispatchId,
			dispatchSerial : data.dispatch.dispatchSerial,
			dispatchTheme : data.dispatch.dispatchTheme,
			carId : this.carId,
			licensePlate : this.licensePlate,
			driver : this.driver,
			driverPhone : this.driverPhone,
			dispatchCompon : data,
			counts : data.iniCounts-data.counts,
			signCounts : data.counts
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new DispatchComponSelector({
			params : {
				"Q_projectId_L_EQ" : this.projectId,
				"Q_dispatchId_L_EQ" : this.dispatchId
//				"Q_applyforState_S_EQ" : "3"
			},
			target_params : {
				//"Q_workStatus_S_EQ" : "0"
			},
			callback : function(d) {
				new CarSelector({	
					callback : function(g) {
						if(g){
						var data = g[0].data;
						this.licensePlate = data.licensePlate;
						this.driver = data.driver;
						this.driverPhone = data.driverPhone;
						}
						for (var i = 0; i < d.length; i++) {
							var dataComp = d[i].data;
							this.addSubModuleDate(dataComp);
						}
					}.createDelegate(this)
				}).show();
				
			}.createDelegate(this)
		}).show();
	}
});