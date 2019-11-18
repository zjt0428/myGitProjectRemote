var DicDetailListView = function(a) {
	Ext.apply(this, a);
	this.searchPanel = new Ext.FormPanel({
		id : "DicDetailListSearchForm",
		height : 40,
		frame : false,
		region : "north",
		border : false,
		layout : "hbox",
		split : true,
		collapseMode : "mini",
		layoutConfig : {
			padding : "5",
			align : "middle"
		},
		defaults : {
			xtype : "label",
			margins : {
				top : 0,
				right : 4,
				bottom : 4,
				left : 4
			}
		},
		items : [ {
			text : "编号"
		}, {
			width : 80,
			xtype : "textfield",
			name : "bhField"
		}, {
			text : a.tableAlias =="equipSpecific"?"规格型号":"名称"
		}, {
			width : 80,
			xtype : "textfield",
			name : "mcField"
		}, {
			xtype : "button",
			text : "查询",
			iconCls : "btn-search",
			handler : function() {
				var c = Ext.getCmp("DicDetailListSearchForm");
				var d = Ext.getCmp("DicDetailListGrid");
				if (c.getForm().isValid()) {
					c.getForm().submit({
						waitMsg : "正在提交查询",
						url : __ctxPath + "/system/listDicDetailCode.do?codeId=" + a.tableAlias,
						success : function(f, g) {
							var e = Ext.util.JSON.decode(g.response.responseText);
							d.getStore().loadData(e);
						}
					});
				}
			}
		}, {
			xtype : "button",
			text : "重置",
			iconCls : "btn-reset",
			handler : function() {
				var c = Ext.getCmp("DicDetailListSearchForm");
				c.getForm().reset();
			}
		} ]
	});
	this.store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : __ctxPath + "/system/listDicDetailCode.do?codeId=" + a.tableAlias
		}),
		reader : new Ext.data.JsonReader({
			root : "result",
			totalProperty : "totalCounts",
			fields : [ "codeId", "code", "value", "parentCode", "aliasValue","aliasValue1","aliasValue2","equipCategory" ]
		})
	});
	this.store.load({
		params : {
			start : 0,
			limit : 25
		}
	});
	var csm = new Ext.grid.CheckboxSelectionModel();
	var cols = [ csm, new Ext.grid.RowNumberer(), {
		dataIndex : "codeId",
		hidden : true
	}, {
		header : "编号",
		dataIndex : "code",
		editor : new Ext.form.TextField({
			allowBlank : false
		})
	}, {
		header :  a.tableAlias =="equipSpecific"?"规格型号":"名称",
		dataIndex : "value",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	} ];
	if (!Ext.isEmpty(this.parentFieldName)) {
		cols.push({
			header : "父节点编号",
			dataIndex : "parentCode",
			editor : new Ext.form.TextField()
		});
	}
	if (!Ext.isEmpty(this.aliasFieldName)) {
		cols.push({
			header : this.aliasFieldLable ? this.aliasFieldLable : "简称",
			dataIndex : "aliasValue",
			editor : new Ext.form.TextField()
		});
	}
	if (!Ext.isEmpty(this.aliasFieldName1)) {
		cols.push({
			header : this.aliasFieldLable1 ? this.aliasFieldLable1 : "简称",
					dataIndex : "aliasValue1",
					editor : new Ext.form.TextField()
		});
	}
	if (!Ext.isEmpty(this.aliasFieldName2)) {
		cols.push({
			header : this.aliasFieldLable2 ? this.aliasFieldLable2 : "简称",
					dataIndex : "aliasValue2",
					editor : new Ext.form.TextField()
		});
	}
	if (!Ext.isEmpty(this.aliasFieldName3)) {
		cols.push({
			header : this.aliasFieldLable3 ? this.aliasFieldLable3 : "简称",
					dataIndex : "equipCategory",
					editor : new Ext.form.TextField()
		});
	}
	var posisionCombo =$initSimpleComboBoxField("职位","practitioner.position", [[1,"管理"],[2,"技工"]])
	if (!Ext.isEmpty(this.aliasFieldName)&&this.aliasFieldLable=="类别简称") {
/*		cols.push({
				xtype : "treecombo",
				//valId : this.componCategoryId,
				allowBlank : false,
				width : 130,
				header : "零配件类别",
				url : __ctxPath + "/system/treeCode.do?codeId=repertoryCategory",
				dataIndex : "aliasValue"
			header : "零配件类别",
			dataIndex : "aliasValue",
			editor : new Ext.form.TextField()
		});*/
	}
	var cm = new Ext.grid.ColumnModel({
		columns : cols,
		defaults : {
			sortable : true,
			menuDisabled : false,
			width : 100
		}
	});
	this.topbar = new Ext.Toolbar({
		height : 30,
		bodyStyle : "text-align:left",
		items : []
	});
	this.topbar.add(new Ext.Button({
		iconCls : "btn-head-add",
		text : "添加",
		handler : this.adddic.createDelegate(this)
	}));
	this.topbar.add(new Ext.Button({
		iconCls : "btn-head-del",
		text : "删除",
		handler : this.deldic.createDelegate(this)
	}));
	this.topbar.add(new Ext.Button({
		iconCls : "btn-save",
		text : "保存",
		handler : this.savedic.createDelegate(this)
	}));
	this.topbar.add(new Ext.Button({
		iconCls : "btn-refresh",
		text : "重置",
		handler : this.refreshdic.createDelegate(this)
	}));
	this.gridPanel = new Ext.grid.EditorGridPanel({
		id : "DicDetailListGrid",
		region : "center",
		store : this.store,
		trackMouseOver : true,
		disableSelection : false,
		loadMask : true,
		cm : cm,
		sm : csm,
		clicksToEdit : 1,
		tbar : this.topbar,
		viewConfig : {
			forceFit : true,
			enableRowBody : false,
			showPreview : false
		},
		bbar : new Ext.PagingToolbar({
			pageSize : 25,
			store : this.store,
			displayInfo : true,
			displayMsg : "从{0}至{1}， 共{2}条记录",
			emptyMsg : "当前没有记录"
		})
	});
	DicDetailListView.superclass.constructor.call(this, {
		layout : "border",
		items : [ this.searchPanel, this.gridPanel ]
	});
};
Ext.extend(DicDetailListView, Ext.Panel, {
	adddic : function() {
		//var resp = this.getForm();
		var store = this.store;
		var max = 0;
		if(store.totalLength<24){
			for(var i=0;i<store.totalLength;i++){
				if(parseInt(store.data.items[i].data.code)>max){
					max = parseInt(store.data.items[i].data.code);
				}
			}
			//alert(typeof max);
			var CodeInfo = this.store.recordType;
			var codeInfo = new CodeInfo({
				codeId : "",
				code : ++max,
				value : ""
			});
		}
		else{
			var CodeInfo = this.store.recordType;
			var codeInfo = new CodeInfo({
				codeId : "",
				code : "",
				value : ""
			});
		}
		this.gridPanel.stopEditing();
		this.store.insert(0, codeInfo);
		this.gridPanel.startEditing(0, 0);
	},
	deldic : function() {
		var selections = this.gridPanel.getSelectionModel().getSelections();
		if (selections.length == 0) {
			$toast("请选择要删除的记录！");
			return;
		}
		var store = this.store;
		var tableAlias = this.tableAlias;
		Ext.Msg.confirm("信息确认", "您确认要删除该记录吗？", function(c) {
			if (c == "yes") {
				var enables = Array();
				for ( var i = 0; i < selections.length; i++) {
					var record = selections[i];
					if (!Ext.isEmpty(record.get("codeId"))) {
						enables.push(record.get("code"));
					}
				}
				Ext.Ajax.request({
					url : __ctxPath + "/system/delDicDetailCode.do?codeId=" + tableAlias,
					params : {
						codes : Ext.encode(enables)
					},
					success : function(q, s) {
						$toast("操作完成!");
						store.reload();
					},
					failure : function(q, r) {
						Ext.MessageBox.alert("操作信息", "操作失败!");
					}
				})
			}
		});
	},
	savedic : function() {
		var mr = this.store.getModifiedRecords();// 获取所有更新过的记录
		if (mr.length == 0) { // 确认修改记录数量
			return false;
		}
		var mrd = new Array();
		for ( var i = 0; i < mr.length; i++) {
			if (Ext.isEmpty(mr[i].data.code)) {
				continue;
			}
			mrd[i] = mr[i].data;
		}
		var store = this.store;
		var tableAlias = this.tableAlias;
		Ext.Ajax.request({
			url : __ctxPath + "/system/saveDicDetailCode.do?codeId=" + tableAlias,
			params : {
				modifiedRecords : Ext.encode(mrd)
			},
			success : function(q, s) {
				$toast("操作完成!");
				store.commitChanges();
				store.reload();
			},
			failure : function(q, r) {
				Ext.MessageBox.alert("操作信息", "保存失败");
				store.rejectChanges();
			}
		});
	},
	refreshdic : function() {
		this.store.rejectChanges();
	}
});
var DicDetailWin = function(a) {
	var d = new DicDetailListView(a);
	DicDetailWin.superclass.constructor.call(this, {
		id : "DicDetailWin",
		title : a.tableAlias + "-代码明细(编号不允许为空)",
		iconCls : "menu-system-dic",
		width : 600,
		height : 500,
		border : false,
		layout : "fit",
		items : [ d ],
		modal : true
	});
};
Ext.extend(DicDetailWin, Ext.Window, {});