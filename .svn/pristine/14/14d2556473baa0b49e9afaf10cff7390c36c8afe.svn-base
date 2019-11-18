var DispatchPractiGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
	var columns = [ {
		header : "从业工种",
		dataIndex : "practitioner",
		renderer : function(n) {
			return n.kindWorkName;
		}
	}, {
		header : "企业人员",
		dataIndex : "practitioner",
		renderer : function(n) {
			return n.practiName;
		}
	}, {
		header : "联系方式",
		dataIndex : "practitioner",
		renderer : function(n) {
			return n.mobile;
		}
	}, {
		header : "预计进场时间",
		dataIndex : "startDate",
		editor : new Ext.ux.form.DateTimeField({
			format : "Y-m-d H:i:s",
			editable : false,
			allowBlank : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			value = Ext.util.Format.date(value, "Y-m-d H:i:s");
			record.data.startDate = value;
			return value;
		}
	} ];
	DispatchPractiGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : DispatchPractiListViewField,
		title : "安排人员",
		option : "调度人员",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelPractiDispatch.do"
	}, this.grid_config || {}));
};
Ext.extend(DispatchPractiGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.practiId == data.practiId) {
				return;
			}
		}
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			dispatchId : this.dispatchId,
			practiId : data.practiId,
			practitioner : data,
			startDate : this.currentDate
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
		if (this.recordcallback) {
			this.recordcallback.call(this, record);
		}
	},
	addSubModule : function() {
		new PractitionerSelector({
			callback : function(d) {
				for ( var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	}
});