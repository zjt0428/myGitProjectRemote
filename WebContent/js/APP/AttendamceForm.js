var AttendamceForm = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.saveable = this.saveable ? true : false; // 保存/重置功能按钮
	
	var sginTime = new  Ext.form.TextField({
		fieldLabel : "签到时间",
		allowBlank : true,
		readOnly : true,
		maxLength : 8,
		width : 250,
		value:new Date().format('H:i'),
		name:"attendamce.sginTime"		
	});
	
	var sgouTime = new  Ext.form.TextField({
		fieldLabel : "签退时间",
		allowBlank : true,
		readOnly : true,
		maxLength : 8,
		width : 250,
		value:new Date().format('H:i'),
		name:"attendamce.sgouTime"		
	});
	 // 定期更新时间
/*	Ext.TaskMgr.start({
	    run : function() {
	    	currentTime.updateValue('当前时间：' + new Date().format('H:i:s'));
	  //   Ext.fly(currentTime.getEl()).update('当前时间：' + new Date().format('H:i:s'));
	    },
	    interval : 1000
	   });*/

	this.locationDetailGrid = new LocationDetailGrid(null, {
		saveable : false
	});
	this.inspectProjectRecordGrid = new InspectProjectRecordGrid({
		saveable : false
	},{
		parentForm : this,
		aid : this.aid
	});
	this.photoDetailGrid = new PhotoDetailGrid(null, {
		saveable : false
	});	

	var items = [ {
		xtype : "fieldset",
		title : "考勤信息",
		anchor : "98%",
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [{
				layout : "form",
				columnWidth :0.8,
				defaultType : "textfield",
				items : [{
					width : 250,
					fieldLabel : "姓名",
					name : "attendamce.userName"
				}, {
					xtype : "datetimefield",
//					format : "Y-m-d",
					width : 250,
					readOnly : true,
					allowBlank : true,
					editable : false,
					fieldLabel : "日期",
					name : "attendamce.sgDate",
					value : new Date()
				},sginTime, {
					width : 250,
					fieldLabel : "签到位置",
					name : "attendamce.sginLocation"
				},sgouTime,{
					width : 250,
					fieldLabel : "签退位置",
					name : "attendamce.sgouLocation"
				}  ]
			} ]
		}, {
			xtype : "textarea",			
			anchor : "90%",
			maxLength : 128,
			maxLengthText : MoreThanMaxLength,
			height : 48,
			fieldLabel : "备注",
			name : "attendamce.remark"
		} ]
	},{
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "100%",
		layout : "fit",
		items : [ this.locationDetailGrid ]
	},{
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "100%",
		layout : "fit",
		items : [ this.photoDetailGrid ]
	},{
		xtype : "panel",
		bodyStyle : "margin : 5px 0px 5px 0px",
		anchor : "100%",
		layout : "fit",
		items : [ this.inspectProjectRecordGrid ]
	}];
	AttendamceForm.superclass.constructor.call(this, {
		title : this.signType==1?"签到登记":"签退登记",
		width : 350,
		height: 500,
		form_config : {
			labelWidth : 75,
			object : "attendamce",
			saveable : this.saveable,
			url : __ctxPath + "/app/saveAttendamce.do?TYPE=" +this.signType,
			items : items,
			fieldMapping : AttendamceFieldMapping,
			hiddenField : AttendamceHiddenField
		}
	});
};
Ext.extend(AttendamceForm, Knight.ux.FormPanelWindow, {
	
	saveFormData : function() {		
		$formsubmit(this.getForm(), function(c, e) {
			$toast("信息操作成功！");
			if (this.callback) {
				this.callback.call(this);
			}
			this.close();
		}.createDelegate(this));
	},
	loadFormData : function() {
		if (!Ext.isEmpty(this.aid)){			
			this.getForm().load({
				url : __ctxPath + "/app/loadAttendamce.do?aid=" + this.aid,
				waitMsg : "正在载入数据...",
				success : function(g, h) {
					var data = Ext.util.JSON.decode(h.response.responseText).data[0];
					this.setFormSubModuleGrid(data.locationSet, this.locationDetailGrid);
					this.setFormSubModuleGrid(data.photoSet, this.photoDetailGrid);
				}.createDelegate(this),
				failure : function(c, d) {
					Ext.Msg.alert("出错", "载入数据失败!");
				}
			});
		} else {
			var fieldNames = [ "userId", "userName"];
			var values = [ curUserInfo.userId, curUserInfo.fullname];
			this.setMultiFieldValue(fieldNames, values);
		}
	}
});