/**
 * <pre><code>
 * saveable : Boolean,
 * selectable : Boolean,
 * height : Number,
 * dispatchId : Number
 * </code></pre>
 */
var DispatchEquipGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
	this.parentForm =this. parentForm;

	var columns = [ {
		dataIndex : "workStatus",
		header : "状态",
		width : 40,
		renderer : function(n) {
			if (n == "0") {
				return '未安装';
			} else if (n == "1") {
				return '已安装';
			} else {
				return '已拆卸';
			}
		}
	}, {
		width : 40,
		header : "楼号",
		dataIndex : "buildingNum",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 6
		})
	},  {
		header : "设备名称",
		dataIndex : "equipment",
		renderer : function(n) {
			return n.equipGenericName;
		}
	}, {
		header : "设备型号",
		dataIndex : "equipment",
		renderer : function(n) {
			return n.equipSpecificName;
		}
	}, {
		header : "生产厂家",
		dataIndex : "equipment",
		renderer : function(n) {
			return n.equipVender;
		}
	}, {
		header : "备案编号",
		dataIndex : "equipment",
		renderer : function(n) {
			return n.recordId;
		}
	},{
		header : "设备自编号",
		dataIndex : "equipment",
		renderer : function(n) {
			return n.equipSerial;
		}
	},{
		header : "发货仓库",
		dataIndex : "equipment",
		renderer : function(n) {
			return n.storeName;
		}
	}, {
		header : "预计进场时间",
		dataIndex : "startDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : false,
			allowBlank : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value.substring(0, 10);
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.startDate = value;
			return value;
		}
	}, {
		header : "预计拆卸时间",
		dataIndex : "endDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : false,
			allowBlank : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value.substring(0, 10);
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.endDate = value;
			return value;
		}
	}, {
		width : 150,
		header : "备注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : true
		})
	} ];
	DispatchEquipGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : DispatchEquipListViewField,
		title : "发设备",
		option : "调度设备",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelEquipDispatch.do",
		grid_view : {
			enableHdMenu : true
		}
	}, this.grid_config || {}));
};
Ext.extend(DispatchEquipGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.equipId == data.equipId) {
				return;
			}
		}
		var startDate;
		var endDate;
		if(this.relation!=null && this.relation.contractEquipBriefSet!=null
			&& this.relation.contractEquipBriefSet.length>0) {
			var set = this.relation.contractEquipBriefSet;
			for(var i=0; i<set.length; i++) {
				if(set[i].equipSpecificName == data.equipSpecificName) {
					startDate = set[i].startDate;
					endDate = set[i].endDate;
				}
			}
		}
		if (typeof (this.loadRecordCallback) == "function") {
			this.loadRecordCallback.call(this, data);
		}
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			dispatchId : this.dispatchId,
			workStatus : "0",
			equipId : data.equipId,
			equipment : data,
			buildingNum : data.buildingNum,
			specificName:data.specificName,
			genericName :data.genericName,
			startDate : startDate ? startDate : this.currentDate,
			endDate : endDate ? endDate : this.currentDate
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		if(this.relation.storeId==null){
			$toast("请先选择发货仓库！");
			return;
		}
		var params = {};
		params.Q_storeId_L_EQ =this.relation.storeId;
		params.Q_businessStatus_S_EQ = "0";
		/*var storeId = this.parentForm.findFormField("storeId").getValue();
		if (!Ext.isEmpty(projectId)) {
			params = {
				"Q_storeId_L_EQ" : storeId
			}
		}*/
		var selector = new EquipSelector({
			params : params,
			collectEnable : true,
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
				if (typeof (this.afterRecordCallback) == "function") {
					this.afterRecordCallback.call(this, d);
				}
			}.createDelegate(this)
		});
		selector.fbar.addText("<a style=\"color: red\">提示：双击鼠标左键选中设备</a>");
		selector.show();
	}
});