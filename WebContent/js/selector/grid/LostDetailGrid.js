var LostDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
	
	var tbarItems = [];
	tbarItems.push({
		hidden : !this.saveable,
		iconCls : "btn-head-add",
		text : "新增",
		handler : this.addSubModule.createDelegate(this)
	},{
		hidden : !this.saveable,
		iconCls : "btn-head-add",
		text : "项目配件",
		handler : this.addSubModule5.createDelegate(this)
	}, {
		hidden : !this.saveable,
		iconCls : "btn-head-add",
		text : "项目附件",
		handler : this.addSubModule3.createDelegate(this)
	});
	var columns = [{
		header : "项目ID",
		dataIndex : "projectId",
		hidden:true,
		editor : new Ext.form.NumberField({
			allowBlank : true
		}),	
	},{
		header : "项目配件ID",
		dataIndex : "projectComponId",
		hidden:true,
		editor : new Ext.form.NumberField({
			allowBlank : true
		}),		
	}, {
		header : "配件名称",
		dataIndex : "commodity",
		editor : new Ext.form.TextField({
			allowBlank : true
		})
	}, {
		header : "设备型号",
		dataIndex : "componSpecific",
		editor : new Ext.ux.form.SimpleCombo({
			codeData : this.componSpecificData
		}),
		renderer : function(value, metadata, record,row,col,store) {
			value = Ext.isEmpty(value) ? this.getEditor().value : value;
			var comboStore = this.getEditor().store;
			var index = comboStore.find("code", value);
			if (index != -1) {
				value = comboStore.getAt(index).data.name;
				if(row==0&&record.modified!=null&&record.modified.componSpecific!=null) {
					for(var i = 1;i<store.getCount();i++) {
						store.getAt(i).set("componSpecific",value);
					}
				}
			}
			record.data.componSpecific = value;
			return value;
		}
	},  {
		width : 60,
		header : "库存数量",
		dataIndex : "counts",
		editor : new Ext.form.NumberField({
			allowBlank : true
		})
	}, {
		width : 60,
		header : "情况描述",
		dataIndex : "loseDescribe",
		editor : new Ext.form.TextField({
			allowBlank : true
		})
	}, {
		width : 60,
		header : "计量单位",
		dataIndex : "calculate",
		editor : new Ext.form.TextField({
			allowBlank : true
		})
	}, {
		width : 60,
		header : "丢失数量",
		dataIndex : "lostCounts",
		editor : new Ext.form.NumberField({
			allowBlank : true
		})
	}, {
		width : 60,
		header : "丢失单价",
		dataIndex : "lostCost",
		editor : new Ext.form.NumberField({
			allowBlank : true
		})
	}, {
		width : 60,
		header : "损坏数量",
		dataIndex : "damageCounts",
		editor : new Ext.form.NumberField({
			allowBlank : true
		})
	}, {
		width : 60,
		header : "损坏单价",
		dataIndex : "damageCosts",
		editor : new Ext.form.NumberField({
			allowBlank : true
		})
	}, {
		width : 60,
		header : "金额小计",
		dataIndex : "totals",
		renderer : function(value, metadata, record) {
			value1 = record.get("lostCounts")*record.get("lostCost");
			value2 = record.get("damageCounts")*record.get("damageCosts");
			value = value1+value2;
			record.data.totals = value;
			return value;
		}
	}, {
		width : 60,
		header : "备注",
		dataIndex : "describe",
		editor : new Ext.form.TextField({
			allowBlank : true
		})
	} ];
	LostDetailGrid.superclass.constructor.call(this, Ext.apply({
		addForbidden : this.addForbidden,
		delForbidden : this.delForbidden,
		saveable : this.saveable,
		selectable : this.selectable,
		fields : LostDetailListViewField,
		title : "丢失清单",
		option : "调度配件",
		tbarItems : tbarItems,
		height : this.height,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelComponLostHandle.do"
	}, this.grid_config || {}));
};
Ext.extend(LostDetailGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			lostCounts : 0,
			lostCost : 0,
			damageCounts : 0,
			damageCosts : 0,
			componSpecific : this.componSpecificData[0][0]
		}
	},
	addSubModuleDate : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.componId == data.componId) {
				return;
			}
		}
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			component : equipSpecificName,
			counts:quantity
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
		if (this.recordcallback) {
			this.recordcallback.call(this, record);
		}
	},
	addSubModule2 : function() {
		new DispatchAllocateInitSelector({
			collectEnable : true,
			callback : function(d) {
				var e = Array();
				for (var i = 0; i < d.length; i++) {
					var map ={};
					map['id'] = d[i].data.disAllInitId;
					e.push(d[i].data.disAllInitId);
				}
				$request({
					params : {
						projectId : this.projectId,
						ids : e,
					},
					url : __ctxPath + "/archive/importAnnexProject.do",
					success : function(d) {
						this.getStore().reload();
						var data = d[i].data;
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addSubModule3 : function() {
		var selector = new AnnexDetailSelector({
			collectEnable : false,
			params : {
				projectId : this.projectId
			},
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;
					var RecordType = this.getStore().recordType;
					var record = new RecordType();
					Ext.apply(record.data, {
						commodity : data.componGenericName,
						counts:data.quantity,
						componSpecific: data.equipSpecificName,
						calculate : data.calculate         
						
					});
					this.stopEditing();
					this.getStore().add(record);
					this.startEditing(0, 0);
					if (this.recordcallback) {
						this.recordcallback.call(this, record);
					}
				}
		selector.fbar.addText("<a style=\"color: red\">提示：双击配件时，请注意输入'调度数量'</a>");
		selector.show();

	}.createDelegate(this)
}).show();
	},
	addSubModule5 : function() {
				var selector = new ProjectComponSelector({
					collectEnable : false,
					params : {
						Q_projectId_L_EQ : this.projectId
					},
					callback : function(d) {
						for (var i = 0; i < d.length; i++) {
							var data = d[i].data;
							var RecordType = this.getStore().recordType;
							var record = new RecordType();
							Ext.apply(record.data, {
								lostId : this.lostId,
								componId : data.componId,
								component : data.component,
								projectId:data.projectId,
								counts:data.counts,
								calculate : data.component.calculate,
								projectComponId : data.projectComponId,
								componSpecific : data.component.componSpecificName,
								commodity : data.component.componGenericName
							});
							this.stopEditing();
							this.getStore().add(record);
							this.startEditing(0, 0);
							if (this.recordcallback) {
								this.recordcallback.call(this, record);
							}
						}
				selector.fbar.addText("<a style=\"color: red\">提示：双击配件时，请注意输入'调度数量'</a>");
				selector.show();

			}.createDelegate(this)
		}).show();
	},
	getTotalSummary : function() {
		var summaryAmount = 0;
		for (var i = 0; i < this.getStore().getCount(); i++) {
			var r = this.getStore().getAt(i).data;
			summaryAmount += Number(r.totals);
		}
		return summaryAmount;
	},
	changeComponSpecific : function(value) {
		var store = this.getEditor().store;
		var index = store.find("code", value);
		if(index !=-1) {
			for(var i = 0;i<this.getStore().getCount();i++) {
				this.getStore().getAt(i).data.componSpecific = store.getAt(index).data.name;
			}
		}
	}
});