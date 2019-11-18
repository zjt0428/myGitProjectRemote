var DispatchComponGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
	
	var tbarItems = [];
	tbarItems.push({
		iconCls : "btn-head-add",
		text : "基地配件",
		handler : this.addSubModule.createDelegate(this)
	}, {
		iconCls : "btn-head-add",
		text : "项目配件",
		handler : this.addSubModule2.createDelegate(this)
	});
	var columns = [{
		header : "项目ID",
		dataIndex : "projectId",
		hidden:true
		
	},{
		header : "项目配件ID",
		dataIndex : "projectComponId",
		hidden:true
		
	},{
		header : "配件类型",
		dataIndex : "component",
		renderer : function(n) {
			return n.componCategoryName==null ? n.COMPONCATEGORYNAME:n.componCategoryName;
		}
	}, {
		header : "设备型号",
		dataIndex : "component",
		renderer : function(n) {
			return n.componSpecificName==null ? n.COMPONSPECIFICNAME:n.componSpecificName;
		}
	}, {
		header : "生产厂家",
		dataIndex : "component",
		renderer : function(n) {
			return n.equipVenderName == null ? n.EQUIPVENDERNAME:n.equipVenderName;
		}
	}, {
		header : "配件名称",
		dataIndex : "component",
		renderer : function(n) {
			return n.componGenericName==null? n.COMPONGENERICNAME:n.componGenericName;
		}
	}, {
		header : "规格型号",
		dataIndex : "component",
		renderer : function(n) {
			return n.dimensions;
			return n.dimensions==null ? n.DIMENSIONS:n.dimensions;
		}
	}, {
		header : "计量单位",
		dataIndex : "component",
		renderer : function(n) {
			return n.calculate==null ? n.CALCULATE:n.calculate;
		}
	}, {
		header : "所在仓库",
		dataIndex : "storeName"
	}, {
		width : 60,
		header : "库存数量",
		dataIndex : "storeCounts"
	}, {
		header : "预计开始时间",
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
		width : 60,
		header : "调拨数量",
		dataIndex : "iniCounts",
		editor : new Ext.form.NumberField({
//			maxValue : 9999,
//			minValue : 1,
//			value : 1
		}),
		renderer : function(value, metadata, record) {
			if (this.saveable && value > record.get("component").consumeCounts) {
				Ext.Msg.alert("信息警告", "该类型配件库存不足!");
				// value = record.get("component").consumeCounts;
			}
			record.data.iniCounts = value;
			record.data.counts = 0;
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
	DispatchComponGrid.superclass.constructor.call(this, Ext.apply({
		addForbidden : this.addForbidden,
		delForbidden : this.delForbidden,
		saveable : this.saveable,
		selectable : this.selectable,
		fields : DispatchComponListViewField,
		title : "发配件",
		option : "调度零配件",
		tbarItems : tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelComponDispatch.do"
	}, this.grid_config || {}));
};
Ext.extend(DispatchComponGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.componId == data.componId) {
				return;
			}
		}
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			dispatchId : this.dispatchId,
			componId : data.componId,
			component : data,
			startDate : this.currentDate,
			iniCounts : data.counts,
			storeName: data.storeName,
			storeCounts:data.storeCounts
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
		if (this.recordcallback) {
			this.recordcallback.call(this, record);
		}
	},
	addSubModule : function() {
		if(this.relation.storeId==null){
			$toast("请先选择发货仓库！");
			return;
		}
		var selector = new ComponentJoinStoreHouseSelector({
			collectEnable : true,
			params : {
				"storeId":this.relation.storeId
			},
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;
					data.storeName = this.relation.storeName;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		});
		selector.fbar.addText("<a style=\"color: red\">提示：双击配件时，请注意输入'调度数量'</a>");
		selector.show();
	},
	addSubModule2 : function() {
		new ProjectSelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				var selector = new ProjectComponSelector({
					collectEnable : true,
					params : {
						"Q_projectId_L_EQ" : data.projectId
					},
					callback : function(d) {
						for (var i = 0; i < d.length; i++) {
							var data = d[i].data;
							var RecordType = this.getStore().recordType;
							var record = new RecordType();
							Ext.apply(record.data, {
								dispatchId : this.dispatchId,
								componId : data.componId,
								component : data.component,
								startDate : this.currentDate,
								iniCounts : data.addFestival,
								projectId:data.projectId,
								storeName: data.component.storeName,
								storeCounts:data.counts,
								projectComponId : data.projectComponId
							});
							this.stopEditing();
							this.getStore().add(record);
							this.startEditing(0, 0);
							if (this.recordcallback) {
								this.recordcallback.call(this, record);
							}
						}
					}.createDelegate(this)
				});
				selector.fbar.addText("<a style=\"color: red\">提示：双击配件时，请注意输入'调度数量'</a>");
				selector.show();

			}.createDelegate(this)
		}).show();
	}
});