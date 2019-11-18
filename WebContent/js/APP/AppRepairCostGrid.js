var AppRepairCostGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false;
	var columns = [{
			header : "维修班组",
			/*dataIndex : "maintenanceTeam",*/
			/*editor : new Ext.form.ComboBox({
				typeAhead: true,
			    triggerAction: 'all',
			    lazyRender:true,
			    mode: 'local',
				store: new Ext.data.ArrayStore({
			        id: 0,
			        fields: [
			            'myId',
			            'displayText'
			        ],
			        data: [['一班组', '一班组'], ['二班组', '二班组'], [a, a]]
			    }),
			    valueField: 'myId',
			    displayField: 'displayText'
			})	*/
			dataIndex : "equipCategoryName",
			editor : new Knight.ux.TreeCombo({
				valId : Ext.id(),
				url : __ctxPath + "/system/treeCode.do?codeId=repertoryCategory"
			}),
			renderer : function(value, metadata, record) {
				if (value == undefined) {
					return;
				}
				if (record.data.category == undefined) {
					record.data.category = value;
					if (record.data.equipCategory == undefined) {
						record.data.equipCategory = this.getEditor().id;
					}
					return value;
				}
				if (record.data.category != value) {
					record.data.equipCategory = this.getEditor().id;
					record.data.category = value;
				}
				return value;
			}
		},{
			header : "工时内容",
			dataIndex : "hoursContent",	
			editor : new Ext.form.TextField({
				allowBlank : false,
			})
		},{
			header : "维修工时",
			dataIndex : "maintenanceHours",	
			editor : new Ext.form.NumberField({
				allowBlank : false,
				maxValue : 999999
			})
		},{
			header : "单价",
			dataIndex : "price",		
			editor : new Ext.form.NumberField({
				allowBlank : false,
				maxValue : 999999,
			})
		},{
			header : "金额",
			dataIndex : "amount",
			editor : new Ext.form.NumberField({
				allowBlank : false,
				maxValue : 999999,
			}),
			renderer : function(value, metadata, record) {
				record.data.amount = Number(record.data.maintenanceHours) * Number(record.data.price)
				return  record.data.amount;
			}
			},{
				header : "备注",
				dataIndex : "remarks",	
				editor : new Ext.form.TextField({
					allowBlank : false,
				})
			}
		];
	if(this.saveable){
		if(!this.tbarItems){
			this.tbarItems=[];
		}
		this.tbarItems.push({
			iconCls:"btn-approvalTask",
			text:"删除",
			handler:this.delSubModule.createDelegate(this)
		});
	};
	AppRepairCostGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : AppRepairCostListViewField,
		title : "维修费用",
		option : "维修费用",
		tbarItems : this.tbarItems,
		height : 300,
		columns : columns
	}, this.grid_config || {}));
};
	
Ext.extend(AppRepairCostGrid, Knight.ux.SubModuleBaseGrid, {
	
	createSubModule : function(){
		return{ 
			amount : 0,
			price : 0,
			maintenanceHours: 0
		}
	},
	delSubModule : function(data, grid, action, rowIndex) {
		var m = this.getSelectionModel().getSelections();
		for ( var i = 0; i < m.length; i++) {
			this.stopEditing();
			this.getStore().remove(m[i]);
		}
		this.startEditing(0, 0);
	}
});