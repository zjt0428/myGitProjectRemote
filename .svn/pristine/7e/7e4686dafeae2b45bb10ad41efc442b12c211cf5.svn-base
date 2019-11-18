/*var ComponentDetails = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable;

	this.qrcodePanelId = Ext.id();
	this.baseWidth = this.baseWidth ? this.baseWidth : 0.33;
	this.existsable = !Ext.isEmpty(this.componId) && !this.copyable;
	Ext.apply(this, {
		componCategoryId : Ext.id()
	});


	var items = [ {
		xtype : "hidden",
		id : this.componCategoryId,
		name : "component.componCategory"
	}, {
		xtype : "fieldset",
		title : "基本信息",
		anchor : "95%",
		items : [ {
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : this.baseWidth * 2,
				defaultType : "textfield",
				defaults : {
					allowBlank : false
				},
				items : [ {
					readOnly : true,
					allowBlank : true,
					hidden : this.saveable,
					fieldLabel : "配件总量",
					name : "component.totalCounts"
				},{
					readOnly : true,
					fieldLabel : "库存总量",
					name : "component.totalCountss"
					},{
				readOnly : true,
				fieldLabel : "库存数量",
				name : "component.consumeCounts"
				}, {
					readOnly : true,
					hidden : false,
					fieldLabel : "仓库名称",
					name : "component.storeName"
				} ],
				
			} ]
		} ]
	} ];	
	
	
	ComponentDetails.superclass.constructor.call(this, {
		title : "零配件库存信息",
		animateTarget : this.animateTarget,
		height : 500,
		form_config : {
			labelWidth : 90,
			object : "component",
			saveable : this.saveable,
			url : __ctxPath + "/archive/saveComponent.do",
			items : items,
			fieldMapping : ComponentFieldMapping,
			hiddenField : ComponentHiddenField
		}
	});
};
Ext.extend(ComponentDetails, Knight.ux.FormPanelWindow, {
	
	importSupplierArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.supplierId, data.supplierName, data.address, data.tel ]);
	},
	importPractiArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.practiId, data.practiName, data.mobile ]);
	},
	
	loadFormData : function() {
		if (!Ext.isEmpty(this.componId)) {
			this.getForm().load({
				deferredRender : false,
				url : __ctxPath + "/archive/loadComponent.do?componId=" + this.componId,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFieldRawValue("componGeneric", data.componGenericName);
					this.setFieldRawValue("componSpecific", data.componSpecificName);
					if (!this.copyable) {
						this.findFormField("userName").show();
						var qrcodePanel = Ext.getCmp(this.qrcodePanelId);
						if (qrcodePanel) {
							qrcodePanel.body.update("<img src='" + __ctxPath + "/image-widget?method=qrcode&contents={componId:" + data.componId + "}' height=125 width=130/>");
						}
					} else {
						delete this.componId;
						this.findFormField("componId").setValue(null);
						this.findFormField("componSerial").setValue(null);
						this.findFormField("department.depId").setValue(curUserInfo.depId);
						this.findFormField("userId").setValue(curUserInfo.userId);
						this.findFormField("userName").setValue(curUserInfo.fullname);
						this.findFormField("number").show();
					}
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			this.findFormField("department.depId").setValue(curUserInfo.depId);
			this.findFormField("userId").setValue(curUserInfo.userId);
			this.findFormField("userName").setValue(curUserInfo.fullname);
		
			this.findFormField("mortgage").setValue(this.mortgage);
		}
	},
	saveFormData : function() {
		if (this.getForm().isValid()) {
			$formsubmit(this.getForm(), function() {
				$toast("信息操作成功！");
				if (this.callback) {
					this.callback.call(this);
				}
				this.close();
			}.createDelegate(this));
		}
	}
});






*/
var ComponentDetails = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
//	this.params.Q_delFlag_S_EQ = "1";
	Ext.apply(this.params, a.params || {});
	
	
	
	var datagrid_config = {
		single : this.single,
		store : {
			fields : StoreHouseListViewField
		},
		
		columns : [ {
			header : "仓库数量",
			dataIndex : "CONSUME_COUNTS"
		}, {
			header : "仓库名称",
			dataIndex : "STORE_NAME"
		} 
	      ]
	};

	var target = null;

	ComponentDetails.superclass.constructor.call(this, {
		configView : {
			title : "仓库选择"
		}, 
		source : {
			url : __ctxPath + "/archive/lineComponent.do",
			base_params : {
				taskId : a.taskId
			},
		
			datagrid_view : {
				enableHdMenu : false,
				viewConfig : {
				//	forceFit : !this.collectEnable,
					enableRowBody : false,
					showPreview : false
				}
			},
			datagrid_config : datagrid_config
		},
		/*$request({
			url : __ctxPath + "/takestock/listComponentStore.do",
			base_params : this.params,
			params : {
				taskId : a.taskId
				//renewDate : renewDate
			},
		
			datagrid_view : {
				enableHdMenu : false,
				viewConfig : {
				//	forceFit : !this.collectEnable,
					enableRowBody : false,
					showPreview : false
				}
			},
			datagrid_config : datagrid_config
		}),*/
		target : target
	});
};
Ext.extend(ComponentDetails, Knight.ux.RelationSelector, {});


