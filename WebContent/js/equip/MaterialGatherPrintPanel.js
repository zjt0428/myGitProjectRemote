var MaterialGatherPrintPanel = function(a) {
	this.printMaterialGatherId = Ext.id();
	this.previewtMaterialGatherId = Ext.id();
	this.exportMaterialGatherId = Ext.id();
	this.tree = new Ext.tree.TreePanel({
		title : "打印资料模块",
		collapsible : true,
		split : true,
		height : 800,
		width : 300,
		region : "west",
		useArrows : true,
		autoScroll : true,
		animate : true,
		enableDD : true,
		containerScroll : true,
		rootVisible : true,
		root : {
			nodeType : "async",
            text : "资料",
            cls : "folder"
		},
        listeners:{
            checkchange: function(node, state) {
                //if (node.parentNode != null&&!pNode.attributes.checked) {
                ////选中子节点让相应的父节点选中
                //    var pNode = node.parentNode;
                //        pNode.ui.toggleCheck(state);// 触发父节点被选中
                //        pNode.attributes.checked = state;
                //}
                if(node.childNodes){
                //选中父节点，全选子节点
                    for(var i=0;i<node.childNodes.length;i++){
                        var childNode = node.childNodes[i]
                        childNode.ui.toggleCheck(state);
                        childNode.attributes.checked = state;
                    }
                }
            }
        },
    dataUrl : __ctxPath + "/archive/loadMaterialGatherEquipment.do"
	});
	this.tree.getRootNode().expand(true);
	var items = [ {
		xtype : "hidden",
		name : "equipId"
	},{
		xtype : "panel",
		style : "padding:3px 0px 5px 0px;",
		anchor : "98%",
		items : [ {
			xtype : "panel",
			height : 40,
			frame : false,
			border : false,
			layout : "hbox",
			layoutConfig : {
				padding : "5",
				align : "middle"
			},
			defaults : {
				xtype : "label",
				margins : {
					top : 0,
					right : 4,
					bottom : 4,
					left : 4
				}
			},
			items : [ {
				xtype : "button",
				iconCls : "btn-anchor-point",
				text : "选择设备",
				handler : this.importEquip.createDelegate(this)
			}, {
				id : this.previewtMaterialGatherId,
				xtype : "button",
				disabled : true,
				iconCls : "btn-head-print",
				text : "资料预览",
				handler : this.printData.createDelegate(this)
			}, {
				id : this.printMaterialGatherId,
				xtype : "button",
				disabled : true,
				iconCls : "btn-head-print",
				text : "资料打印",
				handler : this.printData.createDelegate(this)
			}, {
                id : this.exportMaterialGatherId,
				xtype : "button",
				disabled : true,
				iconCls : "btn-head-exporter",
				text : "导出Doc",
				handler : this.exportDoc.createDelegate(this)
			}, {
				xtype : "button",
				iconCls : "btn-save",
				text : "数据保存",
				handler : this.saveData.createDelegate(this)
			}
            ]
		} ]
	}, {
		xtype : "fieldset",
		title : "设备信息",
		anchor : "98%",
		items : [ {
			xtype : "panel",
			layout : "column",
			items : [ {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "设备名称",
					name : "equipGenericName"
				}, {
					fieldLabel : "备案编号",
					name : "recordId"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "设备类别",
					name : "equipCategoryName"
				}, {
					fieldLabel : "出厂编号",
					name : "exwSerial"
				} ]
			}, {
				layout : "form",
				columnWidth : 0.33,
				defaultType : "textfield",
				defaults : {
					readOnly : true
				},
				items : [ {
					fieldLabel : "规格型号",
					name : "equipSpecificName"
				}, {
					fieldLabel : "出厂日期",
					name : "exwDate"
				} ]
			} ]
		} ]
	}, {
        xtype: "fieldset",
        title: "工程信息概况",
        anchor: "98%",
        items: [{
            xtype: "panel",
            layout: "column",
            items: [{
                layout: "form",
                columnWidth: 0.33,
                defaultType: "textfield",
                items: [{
                    fieldLabel: "项目名称",
                    name: "projectName"
                }, {
                    fieldLabel: "项目经理",
                    name: "projectManager"
                }, {
                    readOnly: true,
                    fieldLabel: "楼层数",
                    name: "floorNumber "
                }]
            }, {
                layout: "form",
                columnWidth: 0.67,
                defaultType: "textfield",
                defaults: {
                    readOnly: true
                },
                items: [{
                    anchor: "95%",
                    fieldLabel: "项目地址",
                    name: "address"
                }, {
                    xtype : "relationCompositeField",
                    readOnly : true,
                    allowBlank: true,
                    width : 300,
                    fieldLabel: "安装作业人员名单",
                    name: "installPractiNames",
                    fields : ["installConstructId","installPractiNames"],
                    relateModule : RelationModule.constructOperation.relateModule,
                    importhandler : this.importInstallPractiArchives.createDelegate(this)
                }, {
                    xtype : "relationCompositeField",
                    readOnly : true,
                    allowBlank: true,
                    width : 300,
                    fieldLabel: "拆卸作业人员名单",
                    name: "dismantlePractiNames",
                    fields : ["dismantleConstructId","dismantlePractiNames"],
                    relateModule : RelationModule.constructOperation.relateModule,
                    importhandler : this.importdismantlePractiArchives.createDelegate(this)
                }]
            }]
        }, {
            xtype: "panel",
            layout: "column",
            items: [{
                layout: "form",
                columnWidth: 0.33,
                defaultType: "textfield",
                defaults: {
                    readOnly: true
                },
                items: [{
					xtype : "relationCompositeField",
					disabled : false,
					fieldLabel : "施工单位",
					name : "constructionUnit",
					relateModule : RelationModule.customer.relateModule,
					importhandler : this.importCustomerArchives.createDelegate(this)
				},{
					xtype : "relationCompositeField",
					disabled : false,
					fieldLabel : "出租单位",
					name : "propertyName",
					relateModule : RelationModule.corp.relateModule,
					importhandler : this.importCorpInfoArchives.createDelegate(this)
				}]
            }, {
                layout: "form",
                columnWidth: 0.33,
                defaultType: "textfield",
                defaults: {
                    readOnly: true
                },
                items: [{
                    fieldLabel: "监理单位",
                    name: "supervisorUnit"
                },{
                	id : "constructionUnitTransfer",
                	hidden : true,
                    fieldLabel : "施工传参",
                    readOnly: false,
                    name : "constructionUnitTransfer"
                }]
            }, {
                layout: "form",
                columnWidth: 0.33,
                defaultType: "textfield",
                defaults: {
                    readOnly: true
                },
                items: [{
                    fieldLabel: "建设单位",
                    name: "buildUnit"
                },{
                	id : "propertyNameTransfer",
                	hidden : true,
                    fieldLabel : "出租传参",
                    readOnly: false,
                    name : "propertyNameTransfer"
                }]
            }]
        }]
    }, {
    xtype : "fieldset",
    title : "安全交底信息概况",
    anchor :"98%",
    items : [ {
        xtype : "panel",
        layout : "column",
        items : [{
            layout : "form",
            defaultType : "textfield",
            labelWidth : 130,
            items : [{
                fieldLabel : "叉车司机分项工程名称",
                name : "printData.chaCheSiJiName"
            },{
                fieldLabel : "作业部位",
                name : "printData.zuoYeBuWei"
            }]
        }, {
            layout : "form",
            defaultType : "textfield",
            labelWidth : 80,
            items : [{
                fieldLabel : "交底部门",
                name : "printData.jiaoTongBuMen"
            },{
                fieldLabel : "交底人",
                name : "printData.jiaoDiRen"
            }]
        }, {
            layout : "form",
            defaultType : "textfield",
            labelWidth : 80,
            items : [{
                type: 'date',
                fieldLabel : "施工期限",
                name : "printData.shiGongDate"
            }]
        }]
    }, {
        xtype : "panel",
        layout : "column",
        items : [{
            layout : "form",
            defaultType : "textfield",
            columnWidth: 0.6,
            labelWidth : 160,
            defaults : {
                width : 300,
                },
            items : [ {
                fieldLabel : "安拆交底分布分项工程",
                name : "printData.anChaiProject"
                }, {
                fieldLabel : "起重机操作分布分项工程",
                name : "printData.qiZhongProject"
                }, {
                fieldLabel : "指挥司索工分布分项工程",
                name : "printData.zhiHuiProject"
                }, {
                fieldLabel : "临时用电分布分项工程",
                name : "printData.linShiProject"
                }, {
                fieldLabel : "汽车吊吊装分布分项工程",
                name : "printData.qiCheDiaoProject"
                }, {
                fieldLabel : "电焊工分布分项工程",
                name : "printData.dianHanGongProject"
                }, {
                fieldLabel : "混凝土布料机分布分项工程",
                name : "printData.hunNinTuProject"
                }, {
                fieldLabel : "桥（门）式安拆分布分项工程",
                name : "printData.qiaoMenAnProject"
                }, {
                fieldLabel : "桥（门）式操作分布分项工程",
                name : "printData.qiaoMenCaoProject"
                }, {
                fieldLabel : "砂轮转机分布分项工程",
                name : "printData.shalunProject"
                }, {
                fieldLabel : "附着爬升分布分项工程",
                name : "printData.fuZhuoProject"
                }]
            }, {
            layout : "form",
            defaultType : "textfield",
            columnWidth: 0.33,
            items : [ {
                fieldLabel : "安拆工种",
                name : "printData.anChaiKindWork"
                }, {
                fieldLabel : "操作工种",
                name : "printData.caoZuoKindWork"
                }, {
                fieldLabel : "司索工工种",
                name : "printData.siSuoKindWork"
                }, {
                fieldLabel : "电工工种",
                name : "printData.dianGongKindWork"
                }, {
                fieldLabel : "吊装工种",
                name : "printData.diaoZhuangKindWork"
                }, {
                fieldLabel : "电焊工种",
                name : "printData.dianHanKindWork"
                }, {
                fieldLabel : "布料机工种",
                name : "printData.buLiaoKindWork"
                }, {
                fieldLabel : "桥（门）安拆工种",
                name : "printData.qiaoAnKindWork"
                }, {
                fieldLabel : "桥（门）操作工种",
                name : "printData.qiaoCaoKindWork"
                }, {
                fieldLabel : "砂轮转机工种",
                name : "printData.shaLunKindWork"
                }, {
                fieldLabel : "附着爬升工种",
                name : "printData.fuZhuoKindWork"
                } ]
            }]
        }, {
        anchor : "95%",
        maxLength : 500,
        maxLengthText : "消息内容只允许输入500个中文字符",
        xtype : "textarea",
        fieldLabel : "补充作业指导内容（500字符）",
        name : "printData.zuoYeZhiDao"
    }]
    },{
        xtype : "fieldset",
        title : "设备资料信息概况",
        anchor :"98%",
        items : [{
            xtype: "panel",
            layout: "column",
            items: [{
                layout: "form",
                defaultType: "textfield",
                columnWidth: 0.33,
                items: [{
                    fieldLabel : "安装合同编号",
                    name : "printData.installContractSerial"
                },{
                    fieldLabel : "拆除合同编号",
                    name : "printData.dismantleContractSerial"
                }]
            }, {
                layout: "form",
                defaultType: "textfield",
                columnWidth: 0.33,
                items: [{
                    fieldLabel : "维保合同编号",
                    name : "printData.repairContractSerial"
                },{
                    fieldLabel : "旁站作业时间",
                    name : "printData.pangZhanZuoYeDate"
                }]
            }, {
                layout: "form",
                defaultType: "textfield",
                columnWidth: 0.33,
                items: [{
                    fieldLabel : "旁站作业内容",
                    name : "printData.pangZhanZuoYeContent"
                },{
                    fieldLabel : "旁站作业人员",
                    name : "printData.pangZhanZuoYePerson"
                }]
            }]
        }]
    }];
	this.form = new Ext.form.FormPanel({
		region : "center",
		labelWidth : 110,
		frame : true,
		autoScroll : true,
		defaultType : "textfield",
		labelAlign : "right",
		labelSeparator : "：",
        url : __ctxPath + "/archive/saveDataPrintData.do",
        reader : new Ext.data.JsonReader({
            root : "data"
        }, printDataFieldMapping),
        listeners : {
            afterrender : this.loadFormData.createDelegate(this)
        },
		items : items
	});
	MaterialGatherPrintPanel.superclass.constructor.call(this, {
		id : "MaterialGatherPrintPanel",
		title : TabTitle.MATERIAL_GATHER_PRINT,
		iconCls : "menu-business-insure",
		layout : "border",
		items : [ this.tree, this.form ]
	});
};
Ext.extend(MaterialGatherPrintPanel, Ext.Panel, {
	importEquip : function() {
			Ext.getCmp("constructionUnitTransfer").reset();
			Ext.getCmp("propertyNameTransfer").reset();
        new ProjectSelector({
            single : true,
            callback : function(d) {
                var data = d[0].data;
                var fieldsContract = ["projectName","address","projectManager","constructionUnit","supervisorUnit","buildUnit"];
                var dataValue = [data.projectName,data.address,data.unCustomLinker,data.unCustomName,data.ctCustomName,data.supCustomName];
                for (var i = 0; i < fieldsContract.length; i++) {
                    this.form.getForm().findField(fieldsContract[i]).setValue(dataValue[i]);
                }
                this.projectId = data.projectId;
                var fields = ["equipId", "equipGenericName", "recordId", "equipCategoryName", "exwSerial", "equipSpecificName", "exwDate", "propertyName"];
                new EquipSelector({
                    single: true,
                    callback: function (d) {
                        var data = d[0].data;
                        for (var i = 0; i <= fields.length; i++) {
                            this.form.getForm().findField(fields[i]).setValue(data[fields[i]]);
                        }
                        this.equipId = data.equipId;
                        Ext.getCmp(this.printMaterialGatherId).enable();
                        Ext.getCmp(this.previewtMaterialGatherId).enable();
                        Ext.getCmp(this.exportMaterialGatherId).enable();
                    }.createDelegate(this)
                }).show();
            }.createDelegate(this)
        }).show();
	},
    importInstallPractiArchives : function(data){
        var data = data.constructPlanPractiSet;
        var installPractiNames ="";
        for(var i =0;i<data.length;i++){
            if(i==data.length-1) {
                installPractiNames += data[i].appUser.fullname;
            }else{
                installPractiNames += data[i].appUser.fullname + ",";
            }
        }
        this.form.getForm().findField("installPractiNames").setValue(installPractiNames);
        this.installConstructId = data.constructId;
    },
    importdismantlePractiArchives : function(data){
        var data = data.constructPlanPractiSet;
        var dismantlePractiNames ="";
        for(var i =0;i<data.length;i++){
            if(i==data.length-1){
                dismantlePractiNames +=data[i].appUser.fullname;
            }else{
                dismantlePractiNames +=data[i].appUser.fullname+",";
            }
        }
        this.form.getForm().findField("dismantlePractiNames").setValue(dismantlePractiNames);
        this.dismantleConstructId = data.constructId;
    },
    printData : function(v) {  
		var b = [];
		var CUIT = Ext.getCmp('constructionUnitTransfer').getValue();
		var PNIT = Ext.getCmp('propertyNameTransfer').getValue();
		var constructionUnitInsideTransfer = encodeURI(encodeURI(CUIT));
		var propertyNameInsideTransfer = encodeURI(encodeURI(PNIT));
        LODOP = getLodop();
        if(LODOP) {
            LODOP.PRINT_INIT("preview");
            //LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
            this.tree.root.cascade(function (a) {
                if (true === a.attributes.checked&& a.leaf === true) {
                    b.push(a.id);
                }

            }, this);
            LODOP.ADD_PRINT_HTM("5.05mm", "19.05mm", "RightMargin:19.05mm", "BottomMargin:5.05mm",
                "URL:" + "/archive/printMaterialGatherPrintData.do?catalogue=" + b
                +"&projectId="+this.projectId+"&equipId="+this.equipId+"&installConstructId="+this.installConstructId
                +"&dismantleConstructId="+this.dismantleConstructId+"&constructionUnit="+constructionUnitInsideTransfer+"&propertyName="+propertyNameInsideTransfer
            );
            if(v.text == "资料预览"){
                LODOP.PREVIEW();
            }else if(v.text == "资料打印"){
                LODOP.PRINT();
            }
        }
    } ,
	importCustomerArchives : function(data) {
//		this.setMultiFieldValue([ "constructionUnit" ], [ data.customerName ]);
		this.form.getForm().findField("constructionUnit").setValue(data.customerName);
		Ext.getCmp("constructionUnitTransfer").setValue(data.customerName);
	},
	importCorpInfoArchives : function(data) {
//		this.setMultiFieldValue([ "rentalUnits" ], [ data.corpName]);
		this.form.getForm().findField("propertyName").setValue(data.corpName);
		Ext.getCmp("propertyNameTransfer").setValue(data.corpName);
	},
    exportDoc : function () {
        var b = [];
        this.tree.root.cascade(function (a) {
            if (true === a.attributes.checked&& a.leaf === true) {
                b.push(a.text);
            }
        }, this);
        $openPostWindow(__ctxPath + "/archive/exportDocPrintData.do","导出Doc",{
            catalogue : b
        });
    },
    saveData : function(){
        $formsubmit(this.form.getForm(),function(a,b,c) {
            $toast("保存成功");
        },null,null)
    },
    loadFormData : function(){
        this.form.getForm().load({
            deferredRender : false,
            url : __ctxPath + "/archive/loadDataPrintData.do",
            waitMsg : "正在载入数据...",
            success : function(g, h) {
                var data = Ext.util.JSON.decode(h.response.responseText).data[0];
            }.createDelegate(this),
            failure : function(c, d) {
                Ext.Msg.alert("出错", "载入数据失败!");
            }
        });
    }
});