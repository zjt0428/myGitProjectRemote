var AttendamceSetForm = function() {
	var myCheckboxGroup = new Ext.form.CheckboxGroup({      
		   id:'myGroup',
		   xtype: 'checkboxgroup',
		   fieldLabel: '工作日',
		   columns: 7,
		   items: [
		        {boxLabel: '周一', name: 'mon'},
		        {boxLabel: '周二', name: 'tue'},
		        {boxLabel: '周三', name: 'web'},
		        {boxLabel: '周四', name: 'thu'},
		        {boxLabel: '周五', name: 'fri'},
		        {boxLabel: '周六', name: 'sat'},
		        {boxLabel: '周日', name: 'sun'}
		    ]
		});
	var items = [ {
		xtype : "panel",
		frame : false,
		autoWidth : true,
		autoHeight : true,
		border : false,
		layout : "table",
		bodyStyle : "margin-top:5px;margin-left: 30px; background-color: transparent;",
		layoutConfig : {
			columns : 1
		},
		items : [ {
			xtype : "panel",
			width : 620,
			height : 240,
			title : "考勤设置",
			layout : "form",
			style : "padding:3px 4px 1px 0px;",
			defaultType : "textfield",
			defaults : {
				width : 500
			},
			labelWidth : 100,
			labelAlign : "right",
			hideLabels : false,
			items : [ myCheckboxGroup,{
				xtype : "datetimefield",
				format : "H:i",
				width : 130,				
				fieldLabel : "上班时间",
				name : "attendamceSet.workSt"
			}, {
				xtype : "datetimefield",
				format : "H:i",
				width : 130,				
				fieldLabel : "下班时间",
				name : "attendamceSet.workEd"
			}, {
				xtype : "datetimefield",
				format : "Y-m-d",
				width : 130,				
				fieldLabel : "开始执行日期",
				name : "attendamceSet.execDt"
			},{
				xtype : "hidden",
				name : "attendamceSet.sid"
			},{
				fieldLabel : "工作日",
				width:130,
				name : "attendamceSet.workDays",
				hidden : true
			} ]
		}]
	} ];

	var tbar = new Ext.Toolbar({
		height : 30,
		items : [ {
			text : "保存",
			iconCls : "btn-save",
			handler : this.saveSet.createDelegate(this)
		} ]
	});
		
	AttendamceSetForm.superclass.constructor.call(this, {
		id : "attendamceSet ",
		title : "考勤设置",
		closable : true,
		iconCls : "menu-set-customer",
		border : false,
		autoScroll : true,
		labelAlign : "right",
		layout : "fit",
		tbar : tbar,
		defaultType : "textfield",
		url : __ctxPath + "/app/saveSet.do",
		reader : new Ext.data.JsonReader({root : "data"},AttendanceSetFieldMapping),
		items : items,
		listeners : {
			afterrender : this.loadFormData.createDelegate(this)
		}
	});
};
Ext.extend(AttendamceSetForm, Ext.form.FormPanel, {
	loadFormData : function() {		
		this.getForm().load({			
			url : __ctxPath + "/app/loadSet.do",
			waitMsg : "正在载入数据...",
			success : function(f, g) {
				var data = Ext.util.JSON.decode(g.response.responseText).data[0];
				if(data!=null){
					if(data.workDays!=null){
						var days = data.workDays;
						var day = new Array();
						day = days.split(",");
						var array = Ext.getCmp('myGroup').items;
						array.each(function(item){
							for(var i =0;i<day.length;i++){
								if(item.getName()==day[i]){
									item.setValue(true);   
								}
							}							
						});						
					}
				}
			}.createDelegate(this),
			failure : function(d, e) {
				$toast("载入失败");
			}
		});
	},
	saveSet:function(){
		var days="";
		var array = Ext.getCmp('myGroup').items;		
		array.each(function(item){			
			if(item.checked==true){
				if(days ==""){
					days = item.getName();
				}else{
					days = days +","+ item.getName(); 
				}				  
			}									
		});
		this.getForm().findField("attendamceSet.workDays").setValue(days);
				
		//this.setFieldValue("workDays",days );
		$formsubmit(this.getForm(), function(e, g) {
			$toast("保存成功！");
		}.createDelegate(this));
	},

});
