/**
 * <code><pre>
 * jasperFile : '',
 * search_config : {
 * 	preLableHidden : boolean,
 * 	generalItems : [],
 * 	advancedItems : [],
 * 	searchActionItems : []
 * },
 * items : [],
 * base_params : Object
 * </code></pre>
 */
Ext.ns("Knight.ux");
Knight.ux.BaseReportView = function(a) {
	this.params = {};
	this.params["reportType"] = "html";
	this.params["jasper"] = a.jasperFile;
	Ext.applyIf(this.params, a.base_params || {});

	this.searchPanel;
	var mainPanelItems = [];
	var searchable = a.search_config && a.search_config.generalItems && a.search_config.generalItems.length > 0;
	if (searchable) {
		this.initSearchPanel(a);
		mainPanelItems.push(this.searchPanel);
	}
	this.reportPanel = new Ext.Panel({
		autoScroll : true,
		region : "center"
	});
	mainPanelItems.push(this.reportPanel);
	if (a.items) {
		mainPanelItems = mainPanelItems.concat(a.items);
	}
	a.items = mainPanelItems;
	Knight.ux.BaseReportView.superclass.constructor.call(this, Ext.apply({
		region : "center",
		layout : "border",
		items : mainPanelItems
	}, a));
};
Ext.extend(Knight.ux.BaseReportView, Ext.Panel, {
	initSearchPanel : function(a) {
		var c = a.search_config;
		var searchItems = [];
		if (!c.preLableHidden) {
			searchItems.push({
				text : "统计条件:"
			});
		}
		for ( var i = 0; i < c.generalItems.length; i++) {
			if (c.generalItems[i].lable) {
				searchItems.push({
					text : c.generalItems[i].lable
				});
			}
			if (!c.generalItems[i].xtype) {
				c.generalItems[i].xtype = "textfield";
			}
			searchItems.push(c.generalItems[i]);
		}
		for ( var param in this.params) {
			searchItems.push({
				xtype : "textfield",
				hidden : true,
				name : param,
				value : this.params[param]
			});
		}
		searchItems.push({
			xtype : "button",
			text : "查询",
			iconCls : "btn-search",
			handler : this.searchSubmit.createDelegate(this)
		});
		searchItems.push({
			xtype : "button",
			text : "重置",
			iconCls : "btn-reset",
			handler : this.searchReset.createDelegate(this)
		});
		var advancedable = c.advancedItems && c.advancedItems.length > 0;
		if (advancedable) {
			this.advancedSearchPanel = new AdvancedQueryWin(c.advancedItems, {
				base_params : this.params,
				submit : function() {
					this.currentSearchPanel = this.advancedSearchPanel;
					var searchPanelParams = this.searchPanel.getForm().getValues(false);
					this.currentSearchPanel.getForm().findField("reportType").setValue("html");
					$reportFormRequest(this.currentSearchPanel.getForm(), function(e, c) {
						this.reportPanel.body.update(e.responseText);
					}.createDelegate(this),null, searchPanelParams);
				}.createDelegate(this)
			});
			searchItems.push({
				xtype : "button",
				text : "高级查询",
				iconCls : "btn-head-lookup",
				handler : this.advancedSearch.createDelegate(this)
			});
		}
		if (c.searchActionItems && c.searchActionItems.length > 0) {
			searchItems = searchItems.concat(c.searchActionItems);
		}
		searchItems.push({
			xtype : "button",
			text : "导出",
			iconCls : "btn-head-exporter",
			handler : this.exportReport.createDelegate(this)
		});
		searchItems.push({
			xtype : "button",
			text : "打印",
			iconCls : "btn-head-print",
			handler : this.printReport.createDelegate(this)
		});
		this.searchPanel = new Ext.FormPanel({
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
			items : searchItems
		});
		this.currentSearchPanel = this.searchPanel;
	},
	searchSubmit : function() {
		this.currentSearchPanel = this.searchPanel;
		this.currentSearchPanel.getForm().findField("reportType").setValue("html");
		$reportFormRequest(this.currentSearchPanel.getForm(), function(e, c) {
			this.reportPanel.body.update(e.responseText);
		}.createDelegate(this));
	},
	searchReset : function() {
		this.searchPanel.getForm().reset();
	},
	exportReport : function() {
		this.currentSearchPanel = this.searchPanel;
		this.currentSearchPanel.getForm().findField("reportType").setValue("xls");
		$exportFormSubmit(this.currentSearchPanel.getForm(), __ctxPath + "/report/report.jsp");
	},
	printReport : function() {
		this.currentSearchPanel.getForm().findField("reportType").setValue("print");
		$reportFormRequest(this.currentSearchPanel.getForm(), function(e, c) {
			Ext.MessageBox.alert("提示", "完成报表打印输出!");
		}.createDelegate(this));
	},
	compareDate : function(date,fieldName,str) {
		var secondDate = this.currentSearchPanel.getForm().findField(fieldName).getValue();
		if(str.indexOf("startDate")!=-1) {
			if(date>secondDate) {
				return true;
			}else{
				return false;
			}
		}else if(str.indexOf("endDate")!=-1) {
			if(date<secondDate) {
				return true;
			}else{
				return false;
			}
		}
	},
	cleanMultiField : function(fields) {
		for (var i = 0; i < fields.length; i++) {
			var field = this.searchPanel.getForm().findField(fields[i]);
			if(field) {
				field.setValue(null);
			}
		}
	},
	advancedSearch : function() {
		this.advancedSearchPanel.show();
	}
});