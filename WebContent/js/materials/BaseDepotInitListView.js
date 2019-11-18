var BaseDepotInitListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "助记码",
			name : "Q_mnemonics_S_LK"
		},{
			lable : "品名",
			name : "Q_commodity_S_LK"
		},{
			lable : "规格",
			name : "Q_specifications_S_LK"
		},{
			lable : "仓库名称",
			name : "Q_depotName_S_LK"
		}];
	}	
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readBaseDepotInit
	} ];
	
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	
	var datagrid_config = {
			store : {
				fields : BaseDepotInitListViewField
			},
			rowAction : {
				width : 60,
				actionItems : actionItems
			},
			tbarItems : tbarItems,
			columns : [{
				header : "品名",
				dataIndex : "commodity"
			}, {
				header : "助记码",
				dataIndex : "mnemonics"
			}, {
				header : "规格",
				dataIndex : "specifications"
			}, {
				header : "计量单位",
				dataIndex : "unit"
			}, {
				header : "数量",
				dataIndex : "total"
			}, {
				header : "辅助单位",
				dataIndex : "supplementUnit"
			}, {
				header : "辅助数量",
				dataIndex : "supplementTotal"
			}, {
				header : "仓库名称",
				dataIndex : "depotName"
			}, {
				header : "状态",
				dataIndex : "effectiveName"
			}]
	}
	
	BaseDepotInitListView.superclass.constructor.call(this, Ext.apply({
		id : "BaseDepotInitListView",
		title : "基地仓库初始化",
		iconCls : "menu-business-corp",
		url : __ctxPath + "/materials/listBaseDepotInit.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
}

Ext.extend(BaseDepotInitListView, Knight.ux.SearchGridPanel, {
	
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的仓库初始信息！";
		var msg2 = "您确认要【" + op + "】所选的仓库初始信息吗？";
		var msg3 = "成功【" + op + "】所选的仓库初始信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},

	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_BaseDepotInitAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addBaseDepotInit.createDelegate(this)
			});
		}
		if (isGranted("_BaseDepotInitEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editBaseDepotInit.createDelegate(this)
			});
		}
		if (isGranted("_BaseDepotInitMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delBaseDepotInit.createDelegate(this)
			});
		}
		if (isGranted("_BaseDepotInitMultiEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "生效",
				handler : this.effectiveBaseDepotInit.createDelegate(this)
			});
		}
		return tbarItems;
	},
	
	readBaseDepotInit : function(a) {
		new BaseDepotInitForm(a).show();
	},
	
	addBaseDepotInit : function(){
		new BaseDepotSelector({
			single : true,
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/materials/findDepotBaseLocation.do",
					params : {
						"Q_baseDepot.depotId_L_EQ" : data.depotId,
						"Q_delFlag_S_EQ" : "1"
					},
					success : function(g,h){
						var resp = Ext.util.JSON.decode(g.responseText);
						var datas = resp.data;
						new BaseDepotInitForm({
							baseDepot : data,
							locationList : datas
						}, {
							saveable : true,
							callback : function() {
								this.dataGridPanel.getStore().reload();
							}.createDelegate(this)
						}).show();
					}.createDelegate(this)
				})
				
			}.createDelegate(this)
		}).show();
	},
	
	editBaseDepotInit : function(){
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if (a[0].data.effective == "1") {
			$toast("该信息已经【生效】！无法修改");
			return;
		}
		new BaseDepotInitForm(a[0].data, {
			saveable : true,
			editable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	
	delBaseDepotInit : function(){
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		for(var i=0;i<a.length;i++){
			if (a[i].data.effective == "1") {
				$toast("该信息已经【生效】！无法删除");
				return;
			}
		}
		this.speciallyGridAction(this.dataGridPanel, "depotInitId", __ctxPath + "/materials/multiDelBaseDepotInit.do", "删除");
	},
	effectiveBaseDepotInit : function() {
		this.speciallyGridAction(this.dataGridPanel, "depotInitId", __ctxPath + "/materials/multiEffectiveBaseDepotInit.do", "生效", function(a) {
			if ("0" == a.effective) {
				return true;
			}
			$toast("该信息已经【生效】！");
			return false;
		}.createDelegate(this), "是否确认生效，生效后数据将不能进行修改和删除！");
	}
});