var MaterialsInStock = function (a) {
	this.params = {};
    Ext.apply(this.params, (a && a.params) || {});
    
    var generaltems =[{
		lable : "日期:",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		name : "Q_[START_DATE]_S",
		value : new Date()
	},  {
		lable : "至:",
		xtype : "datefield",
		editable : false,
		format : "Y-m-d",
		name : "Q_[END_DATE]_S",
		value : new Date()
	}, {
		width : 100,
		lable : "品名",
		name : "Q_[COMMODITY]_S"
	}, {
		width : 100,
		lable : "规格",
		name : "Q_[SPECIFICATIONS]_S"
	}, {
		width : 100,
		lable : "出库类型",
		name : "Q_[IN_TYPE]_S"
	}, {
		width : 100,
		lable : "出库仓库",
		name : "Q_[DEPOT_NAME]_S"
	}]
    
	MaterialsInStock.superclass.constructor.call(this,{
		id : "MaterialsInStock",
		title : "周材入库明细表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_MATERIALS_IN_STOCK",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
}

Ext.extend(MaterialsInStock, Knight.ux.BaseReportView, {});