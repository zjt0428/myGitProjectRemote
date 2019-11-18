var ProjectComponGrid = function(a, b) {
	Ext.apply(this, a || {});
	Ext.apply(this, b || {});
	this.currentDate = new Date();
	this.jackingDateTextFieldId = Ext.id();
	var tbarItems = [];
	
	var temp = 0;
	
	tbarItems.push({
		iconCls : "btn-head-add",
		text : "加节",
		handler : this.addSubModule2.createDelegate(this)
	});	
	tbarItems.push({
		xtype : "label",
		style : "margin:1px 0px 0px 5px;",
		html : "顶升时间 :"
	},{
		id : this.jackingDateTextFieldId,
		style : "margin:1px 0px 0px 5px;",
		xtype : "datetimefield",
		format : "Y-m-d H:i:s",
		allowBlank : false,
		width : 100,
		value : new Date()
//		handler : this.editJJtime.createDelegate(this)
	});	
	tbarItems.push({
		iconCls : "btn-head-add",
		text : "顶升人员",
		style : "margin:1px 0px 0px 5px;",
		handler : this.editJJuser.createDelegate(this)
	});	
	var columns = [{
		header : "项目ID",
		dataIndex : "projectId",
		hidden:true
		
	},{
		header : "零配件编号",
		dataIndex : "component",
		renderer : function(n) {
			return n.componSerial==null ? n.COMPONSERIAL:n.componSerial;
		}
	},{
		header : "零配件类别",
		dataIndex : "component",
		renderer : function(n) {
			return n.componCategoryName==null ? n.COMPONCATEGORYNAME:n.componCategoryName;
		}
	}, {
		header : "零配件名称",
		dataIndex : "component",
		renderer : function(n) {
			return n.componGenericName==null? n.COMPONGENERICNAME:n.componGenericName;
		}
	}, {
		header : "设备型号",
		dataIndex : "component",
		renderer : function(n) {
			return n.componSpecificName==null ? n.COMPONSPECIFICNAME:n.componSpecificName;
		}
	}, {
		header : "配件规格",
		dataIndex : "component",
		renderer : function(n) {
			return n.dimensions;
			return n.dimensions==null ? n.DIMENSIONS:n.dimensions;
		}
	}, {
		header : "计量单位",
		dataIndex : "component",
		renderer : function(n) {
			return n.calculate==null ? n.CALCULATE:n.calculate;
		}
	},{
		header : "安顶人员",
		dataIndex : "jjUserName"
	}, {
		header : "加节(顶升)数量",
		dataIndex : "counts"
	},
	{

		header : "安顶时间",
		dataIndex : "jjTime",
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
			record.data.jjTime = value;
			return value;
		}
	} ];
	ProjectComponGrid.superclass.constructor.call(this, Ext.apply({
		addForbidden : true,
		saveable : this.saveable,
		selectable : this.selectable,
		fields : JJComponListViewField,
		isTopContainer : true,
		title : "顶升加节配件",
		option : "加节零配件",
		tbarItems : tbarItems,
		height : this.height,
		columns : columns,
		recordcallback : this.recordcallback
		//delurl : __ctxPath + "/dispatch/multiDelComponDispatch.do"
	}, this.grid_config || {}));
};
Ext.extend(ProjectComponGrid, Knight.ux.SubModuleBaseGrid, {
	addSubModuleDate : function(data) {
		/*for (var i = 0; i < this.getStore().getCount(); i++) {
			if (this.getStore().getAt(i).data.componId == data.componId) {
				return;
			}
		}*/
		var jackingDate = Ext.getCmp(this.jackingDateTextFieldId).getValue().format('Y-m-d H')+":00:00";
		var RecordType = this.getStore().recordType;
		var record = new RecordType();
		Ext.apply(record.data, {
			installId : this.projectId,
			componId : data.componId,
			component : data,			
			counts : 1,
			jjTime : jackingDate
		});
		this.stopEditing();
		this.getStore().add(record);
		this.startEditing(0, 0);
		if (this.recordcallback) {
			this.recordcallback.call(this, record);
		}
	},
	addSubModule2 : function () {
		var jackingDate = Ext.getCmp(this.jackingDateTextFieldId).getValue().format('Y-m-d H:i:s');
		new ProjectComponSelector({
			collectEnable : true,
			params : {
				"Q_projectId_L_EQ" : this.projectId
			},
			callback : function(d) {
				
				temp = d.length;
				
				for (var i = 0; i < d.length; i++) {
					var data = d[i].data;
					var RecordType = this.getStore().recordType;
					var record = new RecordType();
					Ext.apply(record.data, {
						installId : this.projectId,
						componId : data.componId,
						component : data.component,						
						counts : data.addFestival,
						jjTime : jackingDate
					});
					this.stopEditing();
					this.getStore().add(record);
					this.startEditing(0, 0);
					if (this.recordcallback) {
						this.recordcallback.call(this, record);
					}
				}
				
				var practiName = "";
				new PractitionerSelector({
					collectEnable : true,
					callback : function(d) {
						for (var i = 0; i < d.length; i++) {
							var data = d[i].data;	
							practiName += data.practiName+","
						}
						for(var i = 0; i < temp; i++){
							console.info(this.getStore().getCount()-1)
							this.getStore().getAt(this.getStore().getCount()-1-i).set("jjUserName",
									practiName.substring(0,practiName.length-1));
						}
					}.createDelegate(this)
				}).show();
			}.createDelegate(this)
		}).show();				
	},
	editJJuser : function(){
		var a = this.getSelectionModel().getSelections();
		if (a.length == 0) {
			$toast("请选择要【添加】顶升人员的记录！");
			return;
		}
		var jackingDate = Ext.getCmp(this.jackingDateTextFieldId).getValue().format('Y-m-d H:i:s');
		new PractitionerSelector({
			single : false,
			callback : function(d) {
				var username = "";
				var i,j=0;
				for(i = 0;i<d.length;i++ ){
					username += d[i].data.practiName+",";
				}
				username = username.substring(0,username.length - 1);
				for(j = 0;j<a.length;j++ ){
					a[j].set("jjUserName",username);
					a[j].set("jjTime",jackingDate);
				}
			}.createDelegate(this)
		}).show();
	}
});