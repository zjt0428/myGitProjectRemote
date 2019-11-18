var LaborPayDetailGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.params = {};
	var columns = [ {
		header : "流水号",
		dataIndex : "detailSerial"
	}, {
		header : "应收金额",
		dataIndex : "receivableAmount"
	}, {
		header : "应付金额",
		dataIndex : "copeAmount",
	}, {
		header : "本次支付",
		dataIndex : "issueAmount",
		editor : new Ext.form.NumberField({
			id : "issue",
			allowBlank : false,
			maxValue : 999999,
		}),
		renderer : function(v, p, record){
			if(record.data.falut == true){
				var cc = Number(record.data.copeAmount) - Number(record.data.paidAmount);
				if(v>cc){
					$toast("本期支付金额超过待付金额！");
					return v;
				}
				
				var paidAmount = Number(record.data.paidAmount);
				paidAmount += Number(v);
				record.data.paidAmount = paidAmount;
				record.data.pendingAmount = Number(record.data.copeAmount) - Number(record.data.paidAmount);
			}
			return v;
		}.createDelegate(this)
	}, {
		header : "已付金额",
		dataIndex : "paidAmount",
	}, {
		header : "待付金额",
		dataIndex : "pendingAmount",
	}, {
		header : "结余",
		dataIndex : "balanceAmount"
	}, {
		header : "支付时间",
		dataIndex : "payDate",
		editor : new Ext.ux.form.DateTimeField({
			format : "Y-m-d H:i:s",
			editable : false,
			allowBlank : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			value = Ext.util.Format.date(value, "Y-m-d H:i:s");
			record.data.payDate = value;
			return value;
		}
	}];
	LaborPayDetailGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		title : "支付记录",
		option : "支付记录",
		tbarItems : this.tbarItems,
		height : this.height,
		fields : LaborPayDetailListViewField,
		columns : columns,
		delurl : __ctxPath + "/dispatch/multiDelDetailLaborPay.do"
	}, this.grid_config || {}));
};
Ext.extend(LaborPayDetailGrid, Knight.ux.SubModuleBaseGrid, {
	loadLaborPayDetail : function(a) {
		var issueAmount = Number(Ext.getCmp("issue").getValue());
		var copeAmount = Number(Ext.getCmp("cope").getValue());
		var paidAmount = Number(Ext.getCmp("paid").getValue());
		paidAmount += Number(issueAmount);
		Ext.getCmp("paid").setValue(paidAmount);
		Ext.getCmp("pending").setValue(Number(copeAmount) - Number(paidAmount));
	},
	createSubModule : function() {
		var copeAmount = this.parentForm.getForm().findField("laborPay.copeAmount").getValue();
		var balanceAmount = this.parentForm.getForm().findField("laborPay.afterTaxAmount").getValue();
		var money = 0;
		for(var i = 0;i<this.getStore().getCount();i++){
			money += Number(this.getStore().getAt(i).data.issueAmount);
			if(money == copeAmount){
				$toast("金额已付清，无需再支付！");
				return false;
			}
		}
		return {
			copeAmount : copeAmount,
			receivableAmount : copeAmount,
			paidAmount : money,
			issueAmount : 0,
			falut : true,
			balanceAmount : balanceAmount,
			payDate : new Date()
		};
	},
});
