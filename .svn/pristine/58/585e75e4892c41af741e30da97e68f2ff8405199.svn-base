var  AnnexDetailsListView = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	Ext.apply(this.params, (a && a.params) || {});
	// ===================================================================//
	var tbarItems = [];
	this.initTopBarActionItems(tbarItems);
	var generalItems = null;
	var equipCategoryCombo = $initComboBoxField("类型", "initStatus","repertoryCategory", {
		lable : "类型",
		allowBlank : true
	});
	var componSpecificCombo = $initComboBoxField("设备型号", "equipSpecific", "equipSpecific", {
		editable : true,
		lable : "设备型号",
		allowBlank : true
	});
	
	var componEquipVenderCombo = $initComboBoxField("生产厂家", "equipVender", "equipVender", {
		editable : true,
		lable : "生产厂家",
		allowBlank : true
	});
	generalItems = [ equipCategoryCombo,componSpecificCombo,componEquipVenderCombo,{
		hidden : true,
		name : "projectId"
	} ];
	var datagrid_config = {
		store : {
			fields : [ "annexDetalisId","componCateGoryName","calculate", "quantity","initStatus","dimension","componSpecific","equipSpecificName","equipVenderName","componGenericName","projectId" ]
		},
		tbarItems : tbarItems,
		columns : [ {
			header : "配件类别",
			dataIndex : "componCateGoryName",
			editor : new Ext.form.TextField({
				allowBlank : false,
				maxLength : 32
			})
		},{
			header : "设备型号",
			dataIndex : "equipSpecificName",
			editor : new Ext.form.TextField({
				allowBlank : false,
				maxLength : 32
			})
		},  {
			header : "生产厂家",
			dataIndex : "equipVenderName",
			editor : new Ext.form.TextField({
				allowBlank : false,
				maxLength : 4
			})
		}, {
			header : "配件名称",
			dataIndex : "componGenericName",
			editor : new Ext.form.NumberField({
				maxValue : 999999,
				minValue : 0,
				value : 0
			}),
		}, {
			header : "配件规格",
			dataIndex : "dimension",
			editor : new Ext.form.NumberField({
				maxValue : 999999,
				minValue : 0,
				value : 0
			}),
		},{
			header : "计量单位",
			dataIndex : "calculate",
			editor : new Ext.form.TextField({
				maxValue : 999999,
				minValue : 0,
				value : 0
			}),
		},  {
			header : "数量",
			dataIndex : "quantity",
			editor : new Ext.form.TextField({
				maxValue : 999999,
				minValue : 0,
				value : 0
			}),
		}]
	};
	 AnnexDetailsListView.superclass.constructor.call(this, Ext.apply({
		id : " AnnexDetailsListView",
		title :"配件清单",
		iconCls : "menu-archive-draft-manage",
		url : __ctxPath + "/materials/listOnProjectAnnexDetails.do",
		base_params : this.params,
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : datagrid_config
	}, a));
};
Ext.extend( AnnexDetailsListView, Knight.ux.SearchGridPanel, {
	initTopBarActionItems : function(tbarItems) {
		tbarItems.push({
			iconCls : "btn-head-add",
			text : "新增",
			handler : this.addDispatchAllocateT.createDelegate(this)
		});
	},
	searchSubmit : function() {
		this.searchPanel=this.getSearchPanel();
		this.dataGridPanel=this.getDataGridPanel();
		this.searchPanel.getForm().findField("projectId").setValue(this.projectId);
		this.dataGridPanel.getStore().baseParams = this.searchPanel.getForm().getValues(false);
		this.dataGridPanel.getStore().load();
	},
	addDispatchAllocateT : function(){
//		if (Ext.isEmpty(this.storeId)) {
//			return;
//		}
		new DispatchAllocateInitSelector({
			collectEnable : true,
			callback : function(d) {
				var e = Array();
				var counts =  Array();
				for (var i = 0; i < d.length; i++) {
					var map ={};
					e.push(d[i].data.disAllInitId);
					map['id'] = d[i].data.disAllInitId;
					map['counts']  = d[i].data.counts==null?d[i].data.quantity:d[i].data.counts;
					counts.push(map);
				}
				$request({
					params : {
						projectId : this.projectId,
						ids : e,
						counts:Ext.util.JSON.encode(counts)
					},
					url : __ctxPath + "/archive/importAnnexProject.do",
					success : function() {
						this.dataGridPanel.getStore().reload();
					}.createDelegate(this)
				});
			}.createDelegate(this)
		}).show();
	},
	addDispatchAllocate : function(){
		new DispatchAllocateInitForm({
			type: "Lift",
			title : "升降机配件配置新增",
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	speciallyGridAction : function(g, id, url, op) {
		var msg1 = "请选择要【" + op + "】的配置信息!";
		var msg2 = "您确认要【" + op + "】该配置信息吗?";
		var msg3 = "成功【" + op + "】该配置信息!";
		$baseGridAction(g, msg1, id, msg2, url, msg3);
	},
	editDispatchAllocate : function() {
		var a = this.dataGridPanel.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录！");
			return;
		}
		new DispatchAllocateInitForm({
			disAllInitId :a[0].data.disAllInitId,
			saveable : true,
			callback : function() {
				this.dataGridPanel.getStore().reload();
			}.createDelegate(this)
		}).show();
	},
	delDispatchAllocate : function() {
		this.speciallyGridAction(this.dataGridPanel, "disAllInitId", __ctxPath + "/materials/multiDelDispatchAllocateInit.do", "删除");
	}
});