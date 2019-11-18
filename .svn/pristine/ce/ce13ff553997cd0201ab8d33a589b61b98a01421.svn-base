var ProjectDepotInitListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, (a && a.params) || {});
	// =====================================================================//
	
	var generalItems = null;
	if (!this.searchDisenable) {
		generalItems = [{
			lable : "项目名称",
			name : "Q_projectName_S_LK"
		},{
			lable : "合同编号",
			name : "Q_contractSerial_S_LK"
		}];
	}	
	var actionItems = [ {
		iconCls : "btn-grid-read",
		qtip : "明细",
		handler : this.readProjectDepotInit
	} ];
	
	var tbarItems = null;
	if (!this.tbarDisenable) {
		tbarItems = this.initTopBarActionItems();
	}
	
	var datagrid_config = {
			store : {
				fields : ProjectDepotInitListViewField
			},
			rowAction : {
				width : 60,
				actionItems : actionItems
			},
			tbarItems : tbarItems,
			columns : [{
				header : "项目编号",
				dataIndex : "projectSerial"
			}, {
				header : "初始化人员",
				dataIndex : "initPerson"
			}, {
				header : "初始化日期",
				dataIndex : "initDate"
			}, {
				header : "合同编号",
				dataIndex : "contractSerial"
			}, {
				header : "项目名称",
				dataIndex : "projectName"
			}, {
				header : "项目地址",
				dataIndex : "address"
			}, {
				header : "状态",
				dataIndex : "effectiveName"
			}]
	}
	
	ProjectDepotInitListView.superclass.constructor.call(this, Ext.apply({
		id : "ProjectDepotInitListView",
		title : "项目仓库初始化",
		iconCls : "menu-business-corp",
		url : __ctxPath + "/materials/listProjectDepotInit.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
}

Ext.extend(ProjectDepotInitListView, Knight.ux.SearchGridPanel, {
	
	speciallyGridAction : function(g, id, url, op, va) {
		var msg1 = "请选择要【" + op + "】的项目初始信息！";
		var msg2 = "您确认要【" + op + "】所选的项目初始信息吗？";
		var msg3 = "成功【" + op + "】所选的项目初始信息！";
		$baseGridAction(g, msg1, id, msg2, url, msg3, null, va);
	},

	initTopBarActionItems : function() {
		var tbarItems = [];
		if (isGranted("_ProjectDepotInitAdd")) {
			tbarItems.push({
				iconCls : "btn-head-add",
				text : "新增",
				handler : this.addProjectDepotInit.createDelegate(this)
			});
		}
		if (isGranted("_ProjectDepotInitEdit")) {
			tbarItems.push({
				iconCls : "btn-head-edit",
				text : "修改",
				handler : this.editProjectDepotInit.createDelegate(this)
			});
		}
		if (isGranted("_ProjectDepotInitMultiDel")) {
			tbarItems.push({
				iconCls : "btn-head-del",
				text : "删除",
				handler : this.delProjectDepotInit.createDelegate(this)
			});
		}
		if (isGranted("_ProjectDepotInitMultiEffective")) {
			tbarItems.push({
				iconCls : "btn-head-lock",
				text : "生效",
				handler : this.effectiveProjectDepotInit.createDelegate(this)
			});
		}
		return tbarItems;
	},
	readProjectDepotInit : function(a) {
		new ProjectDepotInitForm(a).show();
	},
	addProjectDepotInit : function(){
		new ContractMaterialsSelector({
			single : true,
			params : {
				Q_applyforState_S_EQ : "3",
				Q_assetsProperty_S_EQ : "2"
			},
			callback : function(d) {
				var data = d[0].data;
				$request({
					url : __ctxPath + "/archive/loadProject.do",
					params : {
						projectId : data.projectId
					},
					success : function(g,h){
						var resp = Ext.util.JSON.decode(g.responseText);
						var data1 = resp.data;
						new ProjectDepotInitForm({
							contractMaterials : data,
							project : data1
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
	initProjectDepot : function(a){
		new ProjectDepotInitForm(a, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	editProjectDepotInit : function(){
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		if (a[0].data.effective == "1") {
			$toast("该信息已经【生效】！无法修改");
			return;
		}
		new ProjectDepotInitForm(a[0].data, {
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delProjectDepotInit : function(){
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		for(var i=0;i<a.length;i++){
			if (a[i].data.effective == "1") {
				$toast("该信息已经【生效】！无法删除");
				return;
			}
		}
		this.speciallyGridAction(this.dataGridPanel, "projectInitId", __ctxPath + "/materials/multiDelProjectDepotInit.do", "删除");
	},
	effectiveProjectDepotInit : function() {
		this.speciallyGridAction(this.dataGridPanel, "projectInitId", __ctxPath + "/materials/multiEffectiveProjectDepotInit.do", "生效", function(a) {
			var data = $ajaxSyncCall(__ctxPath + "/materials/loadProjectDepotInit.do", {projectInitId : a.projectInitId}).data;
			if ("0" == data[0].effective) {
				return true;
			}
			$toast("该信息已经【生效】！");
			return false;
		}.createDelegate(this), "是否确认生效，生效后数据将不能进行修改和删除！");
	}
});