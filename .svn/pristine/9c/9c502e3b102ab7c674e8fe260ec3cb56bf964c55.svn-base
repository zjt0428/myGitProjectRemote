var CustomerLinkerGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	
	this.linkerTypeData = $ajaxSyncCall(__ctxPath + "/system/listCode.do", {
		codeId : "linkerType"
	});
	var defaultFlagChecked = new Ext.grid.CheckColumn({
		width : 40,
		header : "默认",
		dataIndex : "defaultFlag"
	});
	var columns = [ {
		header : "职务",
		dataIndex : "linkerType",
		editor : new Ext.form.ComboBox({
			emptyText : '请选择...',
			mode : 'local',
			editable : false,
			triggerAction : 'all',
			valueField : "code",
			displayField : "name",
			store : new Ext.data.SimpleStore({
				fields : [ "code", "name" ],
				data : this.linkerTypeData
			})
		}),
		renderer : function(value, metadata, record) {
			var store = this.getEditor().store;
			var index = store.find("code", value);
			if (index != -1) {
				record.data.linkerType = value;
				return store.getAt(index).data.name;
			}
			return value;
		}
	}, {
		header : "姓名",
		dataIndex : "linker",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "项目名称",
		dataIndex : "duties",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 32
		})
	}, {
		header : "手机",
		dataIndex : "tel",
		editor : new Ext.form.NumberField({
			allowBlank : false,
			maxLength : 16
		})
	}, {
		header : "办公电话",
		dataIndex : "officePhone",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 16
		})
	}, {
		header : "生日",
		dataIndex : "birthDate",
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
			record.data.birthDate = value;
			return value;
		}
	}, {
		header : "兴趣爱好",
		dataIndex : "interests",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 128
		})
	}, {
		width : 130,
		header : "备 注",
		dataIndex : "remark",
		editor : new Ext.form.TextField({
			allowBlank : false,
			maxLength : 128
		})
	}, defaultFlagChecked ];
	CustomerLinkerGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : CustomerLinkerListViewField,
		title : "客户联系信息",
		option : "客户联系信息",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		grid_view : {
			plugins : defaultFlagChecked
		},
		delurl : __ctxPath + "/archive/multiDelLinkerCustomer.do"
	}, this.grid_config || {}));
};
Ext.extend(CustomerLinkerGrid, Knight.ux.SubModuleBaseGrid, {
	createSubModule : function() {
		return {
			customerId : this.customerId,
			linkerType : null,
			linkerTypeName : null,
			linker : null,
			duties : null,
			tel : null,
			officePhone : null,
			birthDate : null,
			interests : null,
			remark : null
		};
	}
});