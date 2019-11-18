var SearchForm = new Ext.Panel({
	id : "SearchForm",
	layout : "hbox",
	border : false,
	bodyStyle : "background-color: transparent;",
	style : "margin-top:-15px",
	layoutConfig : {
		align : "top",
		pack : "center"
	},
	defaults : {
		margins : {
			top : 0,
			left : 2,
			bottom : 0,
			right : 0
		}
	},
	items : [ {
		id : "searchContent",
		xtype : "textfield",
		width : 120
	}, {
		id : "searchType",
		width : 60,
		xtype : "combo",
		mode : "local",
		editable : false,
		triggerAction : "all",
		store : [ ["news","新闻"]],
		value : "news"
	}, {
		xtype : "button",
		text : "搜索",
		iconCls : "btn-search",
		handler : function() {
			var b = Ext.getCmp("searchContent").getValue();
			var a = Ext.getCmp("searchType").value;
			if (a == "news") {
				App.clickTopTab("SearchNews", b, function() {
					App.removeTab("SearchNews");
				});
				return;
			} 
		}
	} ]
});