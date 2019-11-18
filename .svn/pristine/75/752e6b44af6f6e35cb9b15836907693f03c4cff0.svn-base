var DicCodeListView = function() {
	var generalItems = [ {
		lable : "词典名称",
		name : "Q_remark_S_LK"
	} ];
	var actionItems = [ {
		iconCls : "btn-grid-edit",
		qtip : "明细",
		handler : this.editDicDetail
	} ];
	var tbarItems = [ {
		iconCls : "btn-refresh",
		text : "刷新代码表  <span style='color:red'> *注意:新增完代码词典后，务必点击刷新代码表</span>",
		handler : function() {
			Ext.Ajax.request({
				url : __ctxPath + "/system/refreshDicCode.do",
				waitMsg : "正在重新加载代码数据...",
				success : function(c, d) {
					Ext.Msg.alert("操作信息", "刷新完成!");
				},
				failure : function(c, d) {
					$toast("操作出错，请联系管理员！");
				}
			});
		},
		scope : this
	} ];
	DicCodeListView.superclass.constructor.call(this, {
		id : "DicCodeListView",
		title : "代码词典",
		iconCls : "menu-system-dic",
		url : __ctxPath + "/system/listDicCode.do",
		search_config : {
			generalItems : generalItems
		},
		datagrid_config : {
			store : {
				sortField : "tableAlias",
				sortDir : "desc",
				id : "tableAlias",
				fields : [ "tableAlias", "tableName", "refresh", "bhFieldName", "mcFieldName", "parentFieldName", "aliasFieldName", "aliasFieldLable","aliasFieldName1","aliasFieldLable1","aliasFieldName2","aliasFieldLable2","aliasFieldName3","aliasFieldLable3", "remark" ]
			},
			rowAction : {
				actionItems : actionItems
			},
			tbarItems : tbarItems,
			columns : [ {
				header : "代码别名",
				dataIndex : "tableAlias"
			}, {
				header : "代码表",
				dataIndex : "tableName"
			}, {
				header : "是否刷新",
				dataIndex : "refresh",
				renderer : function(c) {
					if (0 == c) {
						return "否";
					}
					return "是";
				}
			}, {
				header : "代码字段",
				dataIndex : "bhFieldName"
			}, {
				header : "描述字段",
				dataIndex : "mcFieldName"
			}, {
				header : "父级字段",
				dataIndex : "parentFieldName"
			}, {
				header : "附加字段",
				dataIndex : "aliasFieldName"
			}, {
				header : "附加字段2",
				dataIndex : "aliasFieldName2"
			}, {
				header : "附加字段3",
				dataIndex : "aliasFieldName3"
			}, {
				header : "说明",
				dataIndex : "remark"
			} ]
		}
	});
};
Ext.extend(DicCodeListView, Knight.ux.SearchGridPanel, {
	editDicDetail : function(a) {
		new DicDetailWin(a).show();
	}
});