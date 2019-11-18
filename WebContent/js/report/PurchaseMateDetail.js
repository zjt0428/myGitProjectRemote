var PurchaseMateDetail = function(a){
	this.params = {};
	Ext.apply(this.params, ( a && a.params )||{} );
	
	var generaltems =[ {
			lable : "采购起始日期:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[PURCHASE_DATE_BEG]_S",
			value : new Date()
		},  {
			lable : "采购截至日期:",
			xtype : "datefield",
			editable : false,
			format : "Ymd",
			name : "Q_[PURCHASE_DATE_END]_S",
			value : new Date()
		}, {
			width : 80,
			lable : "采购项目",
			name : "Q_[BRIEF_NAME]_S"
		}, {
			width : 80,
			lable : "配件型号",
			name : "Q_[SPECIFIC]_S"
		}, {
			width : 80,
			lable : "采购人",
			name : "Q_[PURCHASER_NAME]_S"
		} , {
			width : 80,
			lable : "供应商",
			name : "Q_[SUPPLIER_NAME]_S"
		}  ];
	
	PurchaseMateDetail.superclass.constructor.call(this,{
		id : "PurchaseMateDetail",
		title : "采购物资明细表",
		iconCls : "menu-business-practivacancyrate",
		jasperFile : "REPORT_PURCHASE_MATE_DETAIL_RPT",
		search_config : {
			generalItems : generaltems
		},
		base_params : this.params
	});
};
Ext.extend(PurchaseMateDetail, Knight.ux.BaseReportView, {});