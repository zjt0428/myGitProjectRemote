var ComponDiaryGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.title = this.title ? this.title : "安装配件清单";
	this.jackingPractiIdTextFieldId = Ext.id();
	this.jackingPractiNameTextFieldId = Ext.id();
	this.jackingTeamsTextFieldId = Ext.id();
	this.jackingDateTextFieldId = Ext.id();
	this.dismantlePractiIdTextFieldId = Ext.id();
	this.dismantlePractiNameTextFieldId = Ext.id();
	this.dismantleTeamsTextFieldId = Ext.id();
	this.dismantleDateTextFieldId = Ext.id();
	var columns = [ {
		header : "零配件编号",
		dataIndex : "componSerial"
	}, {
		header : "安顶状态",
		dataIndex : "jjStautsName",
		renderer : function(value, metadata, record) {
			if(record.get("jjStauts")==1){
				return "首次安装";
			}
			else if (record.get("jjStauts")==4) {
				return "降节";
			}
			else if(record.get("jjStauts")==2){
				return "顶升";
			}else if(record.get("jjStauts")==3){
				return "拆卸";
			}
		}
	}, {
		header : "零配件名称",
		dataIndex : "componGenericName"
	}, {
		header : "设备型号",
		dataIndex : "componSpecificName"
	},{
		header : "生产厂家",
		dataIndex : "equipVenderName"
	}, {
		header : "配件规格",
		dataIndex : "dimensions"
	},{
		header : "安顶人员",
		dataIndex : "jjUserName"
	}, {
		header : "开始时间",
		dataIndex : "startDate"
	}, {
		width : 60,
		header : "安排数量",
		dataIndex : "counts",
		editor : new Ext.form.NumberField({
			maxValue : 9999,
			minValue : 1,
			value : 1
		}),
		renderer : function(value, metadata, record) {
			if (value > record.get("maxCounts")) {
				Ext.Msg.alert("信息警告", "该类型配件调配数量不足!");
				value = record.get("maxCounts");
			}
			record.data.counts = value;
			//this.getForm().findFormField("knotCounts").setValue("333");
			return value;
		}
	},  {
		hidden : !this.dismantleEnabled,
		header : "降节数量",
		dataIndex : "dismantleCounts"
	}, {
		hidden : !this.dismantleEnabled,
		header : "拆卸班组",
		dataIndex : "dismantleTeams"
	}, {
		hidden : !this.dismantleEnabled,
		header : "拆卸负责人",
		dataIndex : "dismantlePractiName"
	} ];

	var actionItems = [];
	if (this.retrieveable) {
		actionItems.push({
			iconCls : "btn-grid-del",
			qtip : "回收",
			handler : this.fulfilDispatchCompon
		});
	}
	if (this.jackingEnabled) {
		this.tbarItems = [ "-", {
			xtype : "label",
			style : "margin:1px 0px 0px 5px;",
			html : "班组<font color=red>*</font>:"
		}, {
			id : this.jackingTeamsTextFieldId,
			style : "margin:1px 0px 0px 5px;",
			xtype : "textfield",
			readOnly : true,
			allowBlank : false,
			width : 90
		}, {
			xtype : "label",
			style : "margin:1px 0px 0px 5px;",
			html : "负责人<font color=red>*</font>:"
		}, {
			id : this.jackingPractiNameTextFieldId,
			style : "margin:1px 0px 0px 5px;",
			xtype : "textfield",
			readOnly : true,
			allowBlank : false,
			width : 90
		}, {
			xtype : "label",
			style : "margin:1px 0px 0px 5px;",
			html : "顶升时间<font color=red>*</font>:"
		}, {
			id : this.jackingDateTextFieldId,
			style : "margin:1px 0px 0px 5px;",
			xtype : "datefield",
			format : "Y-m-d",
			allowBlank : false,
			width : 130,
			value : new Date()
		}, {
			id : this.jackingPractiIdTextFieldId,
			xtype : "textfield",
			hidden : true
		}, {
			xtype : "button",
			style : "margin:1px 0px 0px 1px;",
			autoWidth : true,
			iconCls : "btn-clean",
			handler : this.cleanJackingMultiField.createDelegate(this)
		}, {
			xtype : "button",
			style : "margin:1px 0px 0px 1px;",
			autoWidth : true,
			iconCls : "btn-anchor-point",
			handler : this.importJackingPractitArchives.createDelegate(this)
		}, {
			xtype : "button",
			style : "margin:1px 0px 0px 1px;",
			autoWidth : true,
			text : "顶升",
			handler : this.jackingComponent.createDelegate(this)
		} ];
	}
	if (this.dismantleEnabled) {
		this.tbarItems = [ "-", {
			xtype : "label",
			style : "margin:1px 0px 0px 5px;",
			html : "班组<font color=red>*</font>:"
		}, {
			id : this.dismantleTeamsTextFieldId,
			style : "margin:1px 0px 0px 5px;",
			xtype : "textfield",
			readOnly : true,
			allowBlank : false,
			width : 90
		}, {
			xtype : "label",
			style : "margin:1px 0px 0px 5px;",
			html : "负责人<font color=red>*</font>:"
		}, {
			id : this.dismantlePractiNameTextFieldId,
			style : "margin:1px 0px 0px 5px;",
			xtype : "textfield",
			readOnly : true,
			allowBlank : false,
			width : 90
		}, {
			xtype : "label",
			style : "margin:1px 0px 0px 5px;",
			html : "拆卸时间<font color=red>*</font>:"
		}, {
			id : this.dismantleDateTextFieldId,
			style : "margin:1px 0px 0px 5px;",
			xtype : "datefield",
			format : "Y-m-d",
			allowBlank : false,
			width : 130,
			value : new Date()
		}, {
			id : this.dismantlePractiIdTextFieldId,
			xtype : "textfield",
			hidden : true
		}, {
			xtype : "button",
			style : "margin:1px 0px 0px 1px;",
			autoWidth : true,
			iconCls : "btn-clean",
			handler : this.cleanDismantleMultiField.createDelegate(this)
		}, {
			xtype : "button",
			style : "margin:1px 0px 0px 1px;",
			autoWidth : true,
			iconCls : "btn-anchor-point",
			handler : this.importDismantlePractitArchives.createDelegate(this)
		}, {
			xtype : "button",
			style : "margin:1px 0px 0px 1px;",
			autoWidth : true,
			text : "拆卸",
			handler : this.dismantleComponent.createDelegate(this)
		}, {
			xtype : "button",
			style : "margin:1px 0px 0px 1px;",
			autoWidth : true,
			text : "全部拆卸",
			handler : this.dismantleAllComponent.createDelegate(this)
		} ];
	}
	ComponDiaryGrid.superclass.constructor.call(this, Ext.apply({
		saveable : this.saveable,
		selectable : this.selectable,
		fields : ComponDiaryListViewField,
		title : this.title,
		option : "零配件计划",
		tbarItems : this.tbarItems,
		height : this.height,
		columns : columns,
		rowAction : {
			width : 40,
			actionItems : actionItems
		},
		delurl : __ctxPath + "/equip/multiDelComponDiary.do",
		removedcallback : this.recordcallback
	}, this.grid_config || {}));
};
Ext.extend(ComponDiaryGrid, Knight.ux.SubModuleBaseGrid, {
	afteredit : function() {
		if (this.recordcallback) {
			this.recordcallback.call(this);
		}
	},
	addSubModuleDate : function(data) {
		for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.componId == data.componId) {
				return;
			}
		}
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			businessComponId : data.dispatchComponId,
			componId : data.component.componId,
			componSerial : data.component.componSerial,
			componCategory : data.component.componCategory,
			componCategoryName : data.component.componCategoryName,
			componGeneric : data.component.componGeneric,
			componGenericName : data.component.componGenericName,
			equipVender : data.component.equipVender,
			equipVenderName : data.component.equipVenderName,
			componSpecific : data.component.componSpecific,
			componSpecificName : data.component.componSpecificName,
			dimensions : data.component.dimensions,
			consumeFlag : data.component.consumeFlag,
			parachuteFlag : data.component.parachuteFlag,
			knotFlag : data.component.knotFlag,
			wallAttacheFlag : data.component.wallAttacheFlag,
			knotMetric : data.component.knotMetric,
			brachium : data.component.brachium,
			counts : data.addFestival,
			jackingCounts : 0,
			dismantleCounts : 0,
			maxCounts : data.counts,
			//component : data.component
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
		if (this.recordcallback) {
			this.recordcallback.call(this);
		}
	},
	addSubModule : function() {
//		new DispatchComponSelector({
//			params : this.importParams,
//			callback : function(d) {
//				for (var i = 0; i < d.length; i++) {
//					var data = d[i].data;
//					this.addSubModuleDate(data);
//				}
//			}.createDelegate(this)
//		}).show();
		new ProjectComponSelector({
			params : this.importParams,
			collectEnable : true,
			callback : function(d) {
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;
					this.addSubModuleDate(data);
				}
			}.createDelegate(this)
		}).show();
	},
	fulfilDispatchCompon : function(data, grid, action, rowIndex) {
		var msg = "该零配件[" + data.componSerial + "]已经调配审核通过,如果删除无法恢复,如需分配请重新提交调度!";
		$baseRowAction(msg, __ctxPath + "/equip/fulfilComponDiary.do", {
			componDiaryId : data.componDiaryId
		}, function() {
			this.stopEditing();
			this.getStore().removeAt(rowIndex);
			this.startEditing(0, 0);
		}.createDelegate(this));
	},
	cleanJackingMultiField : function() {
		var jackingTeamsTextField = Ext.getCmp(this.jackingTeamsTextFieldId);
		jackingTeamsTextField.setValue("");
		var jackingPractiNameTextField = Ext.getCmp(this.jackingPractiNameTextFieldId);
		jackingPractiNameTextField.setValue("");
	},
	importJackingPractitArchives : function() {
		new PractitionerSelector({
			single : true,
			callback : function(d) {
				var jackingPractiIdTextField = Ext.getCmp(this.jackingPractiIdTextFieldId);
				jackingPractiIdTextField.setValue(d[0].data.practiId);
				var jackingTeamsTextField = Ext.getCmp(this.jackingTeamsTextFieldId);
				jackingTeamsTextField.setValue(d[0].data.teams);
				var jackingPractiNameTextField = Ext.getCmp(this.jackingPractiNameTextFieldId);
				jackingPractiNameTextField.setValue(d[0].data.practiName);
			}.createDelegate(this)
		}).show();
	},
	jackingComponent : function() {
		var a = this.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录信息！");
			return;
		}
		var e = Array();
		for (var i = 0; i < a.length; i++) {
			e.push(a[i].data.componDiaryId);
		}
		var practiId = Ext.getCmp(this.jackingPractiIdTextFieldId).getValue();
		var practiName = Ext.getCmp(this.jackingPractiNameTextFieldId).getValue();
		var teams = Ext.getCmp(this.jackingTeamsTextFieldId).getValue();
		var jackingDate = Ext.getCmp(this.jackingDateTextFieldId).getValue().format('Y-m-d');
		if (Ext.isEmpty(teams) || Ext.isEmpty(practiId) || Ext.isEmpty(practiName)) {
			$toast("请选择班组！");
			return;
		}
		Ext.MessageBox.prompt("顶升", "请输入顶升数量:", function(b, t) {
			if (b == "ok") {
				var v = Ext.num(t, NaN);
				if (isNaN(v)) {
					Ext.MessageBox.alert("操作信息", "请输入数字!");
					return;
				}
				var counts = Ext.util.Format.number(t, "0");
				$request({
					params : {
						practiId : practiId,
						practiName : practiName,
						teams : teams,
						jackingDate : jackingDate,
						jackingCounts : counts,
						ids : e
					},
					url : __ctxPath + "/equip/jackingComponDiary.do",
					success : function() {
						for (var i = 0; i < a.length; i++) {
							a[i].set("jackingPractiId", practiId);
							a[i].set("jackingCounts", Number(a[i].get("jackingCounts")) + Number(counts));
							a[i].set("jackingPractiName", practiName);
							a[i].set("jackingTeams", teams);
						}
					}.createDelegate(this)
				});
			}
		}.createDelegate(this));
	},
	cleanDismantleMultiField : function() {
		var dismantleTeamsTextField = Ext.getCmp(this.dismantleTeamsTextFieldId);
		dismantleTeamsTextField.setValue("");
		var dismantlePractiNameTextField = Ext.getCmp(this.dismantlePractiNameTextFieldId);
		dismantlePractiNameTextField.setValue("");
	},
	importDismantlePractitArchives : function() {
		new PractitionerSelector({
			single : true,
			callback : function(d) {
				var dismantlePractiIdTextField = Ext.getCmp(this.dismantlePractiIdTextFieldId);
				dismantlePractiIdTextField.setValue(d[0].data.practiId);
				var dismantleTeamsTextField = Ext.getCmp(this.dismantleTeamsTextFieldId);
				dismantleTeamsTextField.setValue(d[0].data.teams);
				var dismantlePractiNameTextField = Ext.getCmp(this.dismantlePractiNameTextFieldId);
				dismantlePractiNameTextField.setValue(d[0].data.practiName);
			}.createDelegate(this)
		}).show();
	},
	dismantleComponent : function() {
		var a = this.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【修改】的记录信息！");
			return;
		}
		var e = Array();
		for (var i = 0; i < a.length; i++) {
			e.push(a[i].data.componDiaryId);
		}
		var practiId = Ext.getCmp(this.dismantlePractiIdTextFieldId).getValue();
		var practiName = Ext.getCmp(this.dismantlePractiNameTextFieldId).getValue();
		var teams = Ext.getCmp(this.dismantleTeamsTextFieldId).getValue();
		var dismantleDate = Ext.getCmp(this.dismantleDateTextFieldId).getValue().format('Y-m-d');
		if (Ext.isEmpty(teams) || Ext.isEmpty(practiId) || Ext.isEmpty(practiName)) {
			$toast("请选择班组！");
			return;
		}
		Ext.MessageBox.prompt("拆卸", "请输入降节数量:", function(b, t) {
			if (b == "ok") {
				var v = Ext.num(t, NaN);
				if (isNaN(v)) {
					Ext.MessageBox.alert("操作信息", "请输入数字!");
					return;
				}
				var counts = Ext.util.Format.number(t, "0");
				$request({
					params : {
						practiId : practiId,
						practiName : practiName,
						teams : teams,
						dismantleCounts : counts,
						dismantleDate : dismantleDate,
						ids : e
					},
					url : __ctxPath + "/equip/dismantleComponDiary.do",
					success : function() {
						for (var i = 0; i < a.length; i++) {
							a[i].set("dismantlePractiId", practiId);
							a[i].set("dismantlePractiName", practiName);
							a[i].set("dismantleTeams", teams);
							a[i].set("dismantleCounts", Number(a[i].get("dismantleCounts")) + Number(counts));
						}
					}.createDelegate(this)
				});
			}
		}.createDelegate(this));
	},
	dismantleAllComponent : function() {
		if (this.getStore().getCount() == 0) {
			$toast("未发现需要拆卸的配件信息！");
			return;
		}
		var e = Array();
		for (var i = 0; i < this.getStore().getCount(); i++) {
			e.push(this.getStore().getAt(i).data.componDiaryId);
		}
		var practiId = Ext.getCmp(this.dismantlePractiIdTextFieldId).getValue();
		var practiName = Ext.getCmp(this.dismantlePractiNameTextFieldId).getValue();
		var teams = Ext.getCmp(this.dismantleTeamsTextFieldId).getValue();
		var dismantleDate = Ext.getCmp(this.dismantleDateTextFieldId).getValue().format('Y-m-d');
		if (Ext.isEmpty(teams) || Ext.isEmpty(practiId) || Ext.isEmpty(practiName)) {
			$toast("请选择班组！");
			return;
		}
		$baseConfirmAction({
			msg : "确定拆卸全部配件?",
			url : __ctxPath + "/equip/dismantleComponDiary.do",
			params : {
				practiId : practiId,
				practiName : practiName,
				teams : teams,
				dismantleCounts : 999999999,
				dismantleDate : dismantleDate,
				ids : e
			},
			success : function() {
				for (var i = 0; i < this.getStore().getCount(); i++) {
					this.getStore().getAt(i).set("dismantlePractiId", practiId);
					this.getStore().getAt(i).set("dismantlePractiName", practiName);
					this.getStore().getAt(i).set("dismantleTeams", teams);
					this.getStore().getAt(i).set("dismantleCounts", Number(this.getStore().getAt(i).get("counts")));
				}
			}.createDelegate(this)
		});
	}
});