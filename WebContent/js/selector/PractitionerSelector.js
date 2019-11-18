var PractitionerSelector = function(a) {
	Ext.apply(this, a || {});
	this.params = {};
	this.params.Q_delFlag_S_EQ = "1";
	this.params.Q_practiStatus_S_EQ = "1";
//	if(!isGranted("admin")) {
//		var depList = $ajaxSyncCall(__ctxPath + "/system/getChildDepIdDepartment.do", null).result;
//		var arr = [];
//		for(var i=0; i<depList.length; i++){
//			arr.push(depList[i].depId);
//		}
//		var depStr = arr.join(",")
//		if(depStr.length>0) {
//			this.params["QVO_department.depId_L_EQ"] = depStr;
//		}
//	}
	Ext.apply(this.params, a.params || {});
	Ext.apply(this, {
		attenDepartmentId : Ext.id()
	});
	// ====================================this.searchPanel===============================================//
	var kindWorkCombo = $initComboBoxField("从业工种", "Q_kindWork_S_EQ", "kindWork", {
		width : 80,
		lable : "从业工种",
		allowBlank : true
	});
	var depSelector = new TreeSelector("depTreeSelector", __ctxPath + "/system/listDepartment.do?opt=appUser", "所属部门", "appUser.depId",true, {
		lable : "所属部门",
		name : "Q_department.depName_S_LK",
		width : 160
	});
	var generalItems = [ kindWorkCombo, {
		lable : "人员名称",
		name : "Q_practiName_S_LK"
	}, {
		lable : "班组",
		name : "Q_teams_S_LK"
	}, {
		lable : "身份证号",
		name : "Q_idCard_S_LK"
	}, {
		name : "depName",
		valId : this.attenDepartmentId,
		xtype : "treecombowithchild",
		width : 160,
		editable : false,
		lable : "所属部门",
		url : __ctxPath + "/system/listDepartment.do?opt=practitioner",
		listeners :  {
			change : function(n) {
				var sp = this.getSelectePanel().currentSearchPanel.getForm().getFieldValues()["QVO_department.depId_L_EQ"][1] = "";
//				this.getSelectePanel().getSearchPanel().getForm().setValues({
//					"QVO_department.depId_L_EQ" : ""
//				});
//				console.log(this.sourcePanel.store.baseParams["QVO_department.depId_L_EQ"]);
			}.createDelegate(this)
		}
	}, {
		hidden : true,
		id : this.attenDepartmentId,
		name : "QVO_department.depId_L_EQ"
	}];
	var datagrid_config = {
		single : this.single,
		store : {
			fields : PractitionerListViewField
		},
		columns : [ {
			header : "",
			dataIndex : "practiStatus",
			width : 30,
			renderer : function(n) {
				if (n == "1") {
					return '<img title="激活" src="' + __ctxPath + '/img/btn/commons/001_effective.png"/>';
				} else {
					return '<img title="注销" src="' + __ctxPath + '/img/btn/commons/001_invalid.png"/>';
				}
			}
		}, {
			header : "人员姓名",
			dataIndex : "practiName"
		}, {
			header : "性别",
			dataIndex : "sexName"
		}, {
			width : 200,
			header : "所在企业",
			dataIndex : "corpInfo",
			renderer : function(n) {
				if (n == null) {
					return "";
				} else {
					return n.corpName;
				}
			}
		}, {
			width : 160,
			header : "身份证号",
			dataIndex : "idCard"
		}, {
			header : "从业工种",
			dataIndex : "kindWorkName"
		}, {
			header : "专业职称",
			dataIndex : "professionTitle"
		}, {
			header : "所属班组",
			dataIndex : "teams"
		}, {
			header : "电话",
			dataIndex : "mobile"
		} ],
	};
	// ==================================this.favoritesPanel=============================================//
	var target = null;
	if (this.collectEnable) {
		target = {
			title : "已选人员",
			single : this.single,
			collect : true,
			fields : PractitionerListViewField,
			columns : [ {
				header : "人员姓名",
				dataIndex : "practiName"
			}, {
				width : 160,
				header : "身份证号",
				dataIndex : "idCard"
			} ]
		};
	}

	var searchActionItems = [];
	if (isGranted("_PractitionerAdd")) {
		searchActionItems.push({
			xtype : "button",
			iconCls : "menu-business-practi",
			text : "添加人员",
			handler : this.fireBusinessEvent.createDelegate(this, [ "PractitionerListView", ListViewButtonsId.practitionerAdd ])
		});
	}
	PractitionerSelector.superclass.constructor.call(this, {
		configView : {
			title : this.title ? this.title : "企业人员选择"
		},
		source : {
			url : __ctxPath + "/archive/listPractitioner.do",
			base_params : this.params,
			search_config : {
				generalItems : generalItems,
				searchActionItems : searchActionItems
			},
			datagrid_view : {
				enableHdMenu : false,
				viewConfig : {
					forceFit : !this.collectEnable,
					enableRowBody : false,
					showPreview : false
				}
			},
			datagrid_config : datagrid_config
		},
		target : target
	});
};
Ext.extend(PractitionerSelector, Knight.ux.RelationSelector, {});