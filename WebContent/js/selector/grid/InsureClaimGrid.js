var InsureClaimGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	var columns = [ {
		width : 100,
		header : "保单号",
		dataIndex : "insureSerial"
	}, {
		width : 100,
		header : "开户行",
		dataIndex : "bankDeposit",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		width : 100,
		header : "账号",
		dataIndex : "account",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		width : 100,
		header : "理赔时间",
		dataIndex : "claimDate",
		editor : new Ext.form.DateField({
			format : "Y-m-d",
			editable : false,
			allowBlank : false
		}),
		renderer : function(value, metadata, record) {
			if (typeof (value) == "string") {
				return value;
			}
			value = Ext.util.Format.date(value, "Y-m-d");
			record.data.claimDate = value;
			return value;
		}
	}, {
		width : 100,
		header : "损失额",
		dataIndex : "wastageAmount",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 8
		})
	}, {
		width : 100,
		header : "赔偿额",
		dataIndex : "compensateAmount",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 8
		})
	}, {
		width : 250,
		header : "理赔事由",
		dataIndex : "claimReson",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	} ];
	if (this.saveable) {
		if (!this.tbarItems) {
			this.tbarItems = [];
		}
		this.tbarItems.push({
			iconCls : "btn-approvalTask",
			text : "保存理赔",
			handler : this.claimInsureEquip.createDelegate(this)
		});
	}
	InsureClaimGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : InsureClaimListViewField,
		title : "理赔记录",
		option : "理赔信息",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		autoExpandColumn : "claimReson",
		delurl : __ctxPath + "/equip/multiDelClaimInsureEquip.do"
	}, this.grid_config || {}));
};
Ext.extend(InsureClaimGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			insureId : this.insureId,
			insureSerial : this.insureSerial,
			equipId : this.equipId,
			claimDate : new Date(),
			claimReson : "理赔事由",
			wastageAmount : 0,
			compensateAmount : 0
		};
	},
	claimInsureEquip : function() {
		var gridjsondata = $gridstore2json(this);
		$request({
			url : __ctxPath + "/equip/saveClaimInsureEquip.do",
			params : {
				insureId : this.insureId,
				insureClaims : gridjsondata
			},
			success : function(g, h) {
				if (this.callback) {
					this.callback.call(this);
				}
			}.createDelegate(this)
		});
	}
});