var TeamsAccountQueryForm = function(a) {
	Ext.apply(this, a || {});
	var items = [ {
		xtype : "relationCompositeField",
		width : 240,
		readOnly : true,
		fieldLabel : "项目名称",
		name : "teamsAccount.projectName",
		fields : [ "projectId", "projectName" ],
		relateModule : RelationModule.project.relateModule,
		importhandler : this.importProjectArchives.createDelegate(this)
	}, {
		xtype : "panel",
		layout : "column",
		items : [ {
			layout : "form",
			columnWidth : 0.5,
			defaultType : "textfield",
			items : [ {
				xtype : "relationCompositeField",
				readOnly : true,
				fieldLabel : "班组负责人",
				name : "teamsAccount.practiName",
				fields : [ "practiId", "practiName", "teams" ],
				relateModule : RelationModule.practitioner.relateModule,
				importhandler : this.importPractiArchives.createDelegate(this)
			}, {
				xtype : "datefield",
				format : "Y-m-d",
				width : 130,
				editable : false,
				fieldLabel : "结算开始时间",
				name : "teamsAccount.accountStartDate",
				value : new Date()
			}, {
				xtype : "numberfield",
				maxValue : 9999999,
				fieldLabel : "附墙单价",
				name : "teamsAccount.wallAttachePrice"
			} ]
		}, {
			layout : "form",
			columnWidth : 0.5,
			defaultType : "textfield",
			items : [ {
				fieldLabel : "班组名称",
				name : "teamsAccount.teams"
			}, {
				xtype : "datefield",
				format : "Y-m-d",
				width : 130,
				editable : false,
				fieldLabel : "结算截至时间",
				name : "teamsAccount.accountEndDate",
				value : new Date()
			}, {
				xtype : "numberfield",
				maxValue : 9999999,
				fieldLabel : "标准节单价",
				name : "teamsAccount.knotPrice"
			} ]
		} ]
	} ];
	this.buttons = [ {
		text : "确认",
		iconCls : "btn-save",
		handler : this.query.createDelegate(this)
	}, {
		text : "取消",
		iconCls : "btn-cancel",
		handler : this.cancel.createDelegate(this)
	} ];
	TeamsAccountQueryForm.superclass.constructor.call(this, {
		title : "核算查询",
		width : 540,
		height : 210,
		buttonAlign : "center",
		buttons : this.buttons,
		form_config : {
			labelWidth : 85,
			object : "teamsAccount",
			items : items,
			url : __ctxPath + "/dispatch/presaveTeamsAccount.do",
			fieldMapping : TeamsAccountFieldMapping,
			hiddenField : TeamsAccountHiddenField
		}
	});
};
Ext.extend(TeamsAccountQueryForm, Knight.ux.FormPanelWindow, {
	importProjectArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.projectId, data.projectName ]);
	},
	importPractiArchives : function(data, fields) {
		this.setMultiFieldValue(fields, [ data.practiId, data.practiName, data.teams ]);
	},
	query : function() {
		$formsubmit(this.getForm(), function(c, e) {
			var resp = Ext.util.JSON.decode(e.response.responseText);
			new TeamsAccountForm({
				teamsAccount : resp.data[0]
			}, {
				saveable : true,
				callback : this.callback
			}).show();
			this.close();
		}.createDelegate(this));
	},
	cancel : function() {
		this.close();
	}
});