var AssembleAndDisassembleFeeListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "品名",
			name : "Q_commodity_S_LK"
		}];
	}	
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readAssembleAndDisassembleFee
	} ];
	
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	
	var datagrid_config = {
			store : {
				fields : AssembleAndDisassembleFeeListViewField
			},
			rowAction : {
				width : 60,
				actionItems : actionItems
			},
			tbarItems : tbarItems,
			columns : [{
				header : "品名",
				dataIndex : "materialsCommodity.commodity"
			}, {
				header : "收费类型",
				dataIndex : "feesTypeName"
			}, {
				header : "收费单位",
				dataIndex : "measurementUnit"
			}, {
				xtype : "checkcolumn",
				width : 24,
				header : "是否在用",
				dataIndex : "whetherUsing",
				renderer : function(v, p, record){
					p.css += ' x-grid3-check-col-td';
					if(v == "on") {
						v = '-on';
					} else {
						v = '';
					}
					return String.format('<div class="x-grid3-check-col{0}">&#160;</div>', v);
				}
			}, {
				header : "理论换算数值",
				dataIndex : "theoriesValueConversion"
			}, {
				header : "换算单位",
				dataIndex : "unitConversion"
			}, {
				header : "收费单价",
				dataIndex : "chargeUnitPrice"
			}]
	}
	
	AssembleAndDisassembleFeeListView.superclass.constructor.call(this, Ext.apply({
		id : "AssembleAndDisassembleFeeListView",
		title : "装卸/包装费设置",
		url : __ctxPath + "/materials/listAssembleAndDisassembleFee.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
}

Ext.extend(AssembleAndDisassembleFeeListView, Knight.ux.SearchGridPanel, {
	
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的周材信息！";
		var msg2 = "您确认要【" + op + "】所选的周材信息吗？";
		var msg3 = "成功【" + op + "】所选的周材信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},
	
	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_AssembleAndDisassembleFeeAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addAssembleAndDisassembleFee.createDelegate(this)
			});
		}
		if (isGranted("_AssembleAndDisassembleFeeEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editAssembleAndDisassembleFee.createDelegate(this)
			});
		}
		if (isGranted("_AssembleAndDisassembleFeeMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delAssembleAndDisassembleFee.createDelegate(this)
			});
		}
		return tbarItems;
	},
	
	readAssembleAndDisassembleFee : function(a) {
		new AssembleAndDisassembleFeeForm(a).show();
	},
	
	addAssembleAndDisassembleFee : function() {
		new AssembleAndDisassembleFeeForm(null, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	editAssembleAndDisassembleFee : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new AssembleAndDisassembleFeeForm(a[0].data, {
			saveable : true,
			editable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	delAssembleAndDisassembleFee : function() {
		this.speciallyGridAction(this.dataGridPanel, "feeId", __ctxPath + "/materials/multiDelAssembleAndDisassembleFee.do", "删除", function(a) {
			return true;
		}.createDelegate(this));
	}
})