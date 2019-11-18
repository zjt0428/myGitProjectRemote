/**
 * <code><pre>
 * 	level : 1,
 * 	title : '施工升降机验收项目',
 * 	height : 300,
 * 	parentNameLable : '类别',
 * 	itemNameLable : '检查项目',
 * 	demandDesLable : '内容和要求',
 * 	standardResultLable : '检查结果',
 * 	remarkLable : '结论'
 * </code></pre>
 */
var VerifyStandardGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = []
	if (this.parentNameLable) {
		columns.push({
			width : 100,
			header : this.parentNameLable,
			dataIndex : "parentName",
			editor : new Ext.form.TextField({
				allowBlank : false,
				maxLength : 64
			})
		});
	}
	if (this.itemNameLable) {
		columns.push({
			width : 120,
			header : this.itemNameLable,
			dataIndex : "itemName",
			editor : new Ext.form.TextField({
				allowBlank : false,
				maxLength : 32
			})
		});
	}
	if (this.demandDesLable) {
		columns.push({
			width : 400,
			header : this.demandDesLable,
			dataIndex : "demandDes",
			renderer : function(value, meta, record) {
				meta.attr = 'style="white-space:normal;"';
				return value;
			},
			editor : new Ext.form.TextField({
				allowBlank : false,
				maxLength : 32
			})
		});
	}
	if (this.standardResultLable) {
		columns.push({
			width : 80,
			header : this.standardResultLable,
			dataIndex : "standardResult",
			editor : new Ext.form.ComboBox({
				emptyText : '请选择...',
				mode : 'local',
				editable : false,
				triggerAction : 'all',
				valueField : "name",
				displayField : "name",
				store : new Ext.data.ArrayStore({
					fields : [ "name" ],
					data : [ [ "合格" ], [ "不合格" ] ]
				})
			})
		});
	}
	if (this.remarkLable) {
		columns.push({
			width : 100,
			header : this.remarkLable,
			dataIndex : "remark",
			editor : new Ext.form.TextField({
				allowBlank : false,
				maxLength : 32
			})
		});
	}
	if (this.summaryLable) {
		columns.push({
			width : 100,
			header : this.summaryLable,
			dataIndex : "summary",
			editor : new Ext.form.TextField({
				allowBlank : false,
				maxLength : 32
			})
		});
	}
	if (this.saveable && this.standardResultLable) {
		if (Ext.isEmpty(this.tbarItems)) {
			this.tbarItems = [];
		}
		this.tbarItems.push({
			iconCls : "btn-business-magicwand",
			text : "全部合格",
			handler : this.allFillQualified.createDelegate(this)
		});
	}
	VerifyStandardGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "检测项目要求",
		option : "检测要求",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : VerifyStandardListViewField,
		columns : columns,
		delurl : __ctxPath + "/verify/multiDelVerifyStandard.do"
	}, this.grid_config || {}));
};
Ext.extend(VerifyStandardGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		this.addHeight(recordHeight);
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			parentName : data.PARENT_ITEM_NAME,
			itemName : data.ITEM_NAME,
			level : data.LEVEL,
			demandDes : data.DEMAND_DES
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
	},
	addSubModule : function() {
		new VerifyItemSelector({
			params : this.select_params,
			callback : function(d) {
				for ( var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	},
	allFillQualified : function() {
		for ( var i = 0; i < this.getStore().getCount(); i++) {
			this.getStore().getAt(i).set("standardResult", "合格");
		}
	}
});