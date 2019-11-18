var DispatchAllocateGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.hidden = this.hidden ? true : false;
	var DispatchAllocateItems = null;
	this.componSpecificCombo = $initComboBoxField("所属型号", "Q_componSpecific_S_EQ", "componSpecific", {
		editable : true,
		allowBlank : true
	});
	if (this.saveable) {
		DispatchAllocateItems = [this.componSpecificCombo,{
			iconCls : "btn-search",
			text : "加载配货单",
			handler : this.loadSubmits.createDelegate(this)
		}];
	}
	var columns = [ {
		header : "配件名称",
		dataIndex : "componGenericName",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "规格",
		dataIndex : "specification",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 64
		})
	}, {
		header : "单位",
		dataIndex : "calculate",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 4
		})
	}, {
		header : "数量",
		dataIndex : "quantity",
		editor : new Ext.form.NumberField({
			maxValue : 999999,
			minValue : 0,
			value : 0
		}),
	}, {
		header : "欠工地",
		hidden : this.hidden,
		dataIndex : "defective",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 4
		})
	}, {
		header : "配货",
		hidden : this.hidden,
		dataIndex : "reissue",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 4
		})
	}, {
		header : "核对",
		hidden : this.hidden,
		dataIndex : "verify",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 4
		})
	} ];
	DispatchAllocateGrid.superclass.constructor.call(this, {
		saveable : this.saveable,
		selectable : this.selectable,
		fields : DispatchAllocateListViewField,
		title : this.title,
		columns : columns,
		option : "配货清单",
		liftOrTower : this.liftOrTower,
		tbarItems : DispatchAllocateItems,
		delurl : __ctxPath + "/dispatch/multiDelAllocateDispatch.do"
	});
};
Ext.extend(DispatchAllocateGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
//		for (var i = 0; i < this.getStore().getCount(); i++) {
//			if (this.getStore().getAt(i).data.repairId == data.repairId) {
//				return;
//			}
//		}
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
//			dispatchId : this.dispatchId,
//			componId : data.componId,
			componGenericName : data.componGenericName,
			specification : data.dimensions,
			calculate : data.calculate,
			quantity: data.quantity,
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
		if (this.recordcallback) {
			this.recordcallback.call(this, record);
		}
	},
	createSubModule : function() {
		return {
			dispatchId : this.dispatchId,
			componGenericName : 0,
			calculate : 0,
			quantity : 1
		};
	},
	loadSubmits : function() {
		$request({
			url : __ctxPath + "/form/listsDispatchAllocateInit.do?pagesize=1000",
			waitMsg : "正在载入数据...",
			params : {
				"Q_componSpecific_S_EQ" : this.componSpecificCombo.getValue(),
				"Q_initStatus_S_EQ" : this.liftOrTower
			}, 
			success : function(b,c) {
				var data = Ext.util.JSON.decode(b.responseText);
				for(var i = 0 ;i< data.result.length;i++){
					this.addSubModuleDate(data.result[i]);
				}
			}.createDelegate(this),
			failure : function(c, d) {
				Ext.Msg.alert("出错", "载入数据失败!");
			}
			})
		},
});
