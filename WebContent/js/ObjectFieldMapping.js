
var AppUserFieldMapping = [
	{name:"appUser.userId",mapping:"userId"},
	{name:"appUser.username",mapping:"username"},
	{name:"appUser.password",mapping:"password"},
	{name:"appUser.fullname",mapping:"fullname"},
	{name:"appUser.email",mapping:"email"},
	{name:"appUser.phone",mapping:"phone"},
	{name:"appUser.mobile",mapping:"mobile"},
	{name:"appUser.sex",mapping:"sex"},
	{name:"appUser.address",mapping:"address"},
	{name:"appUser.zip",mapping:"zip"},
	{name:"appUser.createTime",mapping:"createTime"},
	{name:"appUser.keyFlag",mapping:"keyFlag"},
	{name:"appUser.status",mapping:"status"},
	{name:"appUser.depId",mapping:"depId"},
	{name:"appUser.userType",mapping:"userType"},
	{name:"appUser.employeeNum",mapping:"employeeNum"},
	{name:"appUser.userTypeName",mapping:"userTypeName"},
	{name:"appUser.userSerial",mapping:"userSerial"},
    {name:"appUser.corpInfo.corpId",mapping:"corpInfo.corpId"},
	{name:"appUser.corpInfo.corpName",mapping:"corpInfo.corpName"}
];
var AppUserHiddenField = [
	{xtype:"hidden",name:"appUser.userId"},
	{xtype:"hidden",name:"appUser.userType"},
	{xtype:"hidden",name:"appUser.corpInfo.corpId"}
];
//===========================================================================//
var AppRoleFieldMapping = [
	{name:"appRole.roleId",mapping:"roleId"},
	{name:"appRole.roleName",mapping:"roleName"},
	{name:"appRole.roleDesc",mapping:"roleDesc"},
	{name:"appRole.status",mapping:"status"},
	{name:"appRole.rights",mapping:"rights"},
	{name:"appRole.roleType",mapping:"roleType"},
	{name:"appRole.roleDepartment",mapping:"roleDepartment"},
	{name:"appRole.roleDepartmentId",mapping:"roleDepartmentId"},
	{name:"appRole.isDefaultIn",mapping:"isDefaultIn"}
];
var AppRoleHiddenField = [
	{xtype:"hidden",name:"appRole.roleId"},
	{xtype:"hidden",name:"appRole.rights"},
	{xtype:"hidden",name:"appRole.isDefaultIn"}
];
//===========================================================================//
var DepartmentFieldMapping = [
	{name:"department.depId",mapping:"depId"},
	{name:"department.depSerial",mapping:"depSerial"},
	{name:"department.depName",mapping:"depName"},
	{name:"department.depDesc",mapping:"depDesc"},
	{name:"department.depType",mapping:"depType"},
	{name:"department.parentId",mapping:"parentId"},
	{name:"department.sortField",mapping:"sortField"}
];
//===========================================================================//
var CorpInfoFieldMapping = [
	{name:"corpInfo.corpId",mapping:"corpId"},
	{name:"corpInfo.corpName",mapping:"corpName"},
	{name:"corpInfo.officeTel",mapping:"officeTel"},
	{name:"corpInfo.depId",mapping:"depId"},
	{name:"corpInfo.corpCode",mapping:"corpCode"},
	{name:"corpInfo.corpType",mapping:"corpType"},
	{name:"corpInfo.corpTypeName",mapping:"corpTypeName"},
	{name:"corpInfo.license",mapping:"license"},
	{name:"corpInfo.province",mapping:"province"},
	{name:"corpInfo.provinceName",mapping:"provinceName"},
	{name:"corpInfo.city",mapping:"city"},
	{name:"corpInfo.cityName",mapping:"cityName"},
	{name:"corpInfo.county",mapping:"county"},
	{name:"corpInfo.countyName",mapping:"countyName"},
	{name:"corpInfo.regAddress",mapping:"regAddress"},
	{name:"corpInfo.safetyProdCert",mapping:"safetyProdCert"},
	{name:"corpInfo.economic",mapping:"economic"},
	{name:"corpInfo.economicName",mapping:"economicName"},
	{name:"corpInfo.regPrin",mapping:"regPrin"},
	{name:"corpInfo.birthDate",mapping:"birthDate"},
	{name:"corpInfo.legalMan",mapping:"legalMan"},
	{name:"corpInfo.legalMobile",mapping:"legalMobile"},
	{name:"corpInfo.legalManIdcard",mapping:"legalManIdcard"},
	{name:"corpInfo.legalManDuty",mapping:"legalManDuty"},
	{name:"corpInfo.legalManProtitle",mapping:"legalManProtitle"},
	{name:"corpInfo.dutyman",mapping:"dutyman"},
	{name:"corpInfo.dutymanTel1",mapping:"dutymanTel1"},
	{name:"corpInfo.dutymanTel2",mapping:"dutymanTel2"},
	{name:"corpInfo.dutymanTel3",mapping:"dutymanTel3"},
	{name:"corpInfo.finance",mapping:"finance"},
	{name:"corpInfo.financeTel",mapping:"financeTel"},
	{name:"corpInfo.capital",mapping:"capital"},
	{name:"corpInfo.capitalTel",mapping:"capitalTel"},
	{name:"corpInfo.market",mapping:"market"},
	{name:"corpInfo.marketTel",mapping:"marketTel"},
	
	{name:"corpInfo.technologyTel",mapping:"technologyTel"},
	{name:"corpInfo.maintenanceTel",mapping:"maintenanceTel"},
	{name:"corpInfo.engineeringTel",mapping:"engineeringTel"},
	{name:"corpInfo.safeTel",mapping:"safeTel"},
	{name:"corpInfo.technology",mapping:"technology"},
	{name:"corpInfo.maintenance",mapping:"maintenance"},
	{name:"corpInfo.engineering",mapping:"engineering"},
	{name:"corpInfo.safe",mapping:"safe"},
	
	{name:"corpInfo.postalCode",mapping:"postalCode"},
	{name:"corpInfo.address",mapping:"address"},
	{name:"corpInfo.fax",mapping:"fax"},
	{name:"corpInfo.linkEmail",mapping:"linkEmail"},
	{name:"corpInfo.corpDesc",mapping:"corpDesc"},
	{name:"corpInfo.remark",mapping:"remark"},
	{name:"corpInfo.photo",mapping:"photo"},
	{name:"corpInfo.technology",mapping:"technology"},
	{name:"corpInfo.technologyTel",mapping:"technologyTel"},
	{name:"corpInfo.maintenance",mapping:"maintenance"},
	{name:"corpInfo.maintenanceTel",mapping:"maintenanceTel"},
	{name:"corpInfo.engineering",mapping:"engineering"},
	{name:"corpInfo.engineeringTel",mapping:"engineeringTel"},
	{name:"corpInfo.security",mapping:"security"},
	{name:"corpInfo.securityTel",mapping:"securityTel"},
	{name:"corpInfo.chiefEngineer",mapping:"chiefEngineer"},
	{name:"corpInfo.chiefEngineerTel",mapping:"chiefEngineerTel"},
	{name:"corpInfo.certNum",mapping:"certNum"},
	{name:"corpInfo.certLevel",mapping:"certLevel"},
	{name:"corpInfo.maintenances",mapping:"maintenances"},
	{name:"corpInfo.maintenancesTel",mapping:"maintenancesTel"},
	{name:"corpInfo.chiefEconomist",mapping:"chiefEconomist"},
	{name:"corpInfo.chiefEconomistTel",mapping:"chiefEconomistTel"},
	{name:"corpInfo.material",mapping:"material"},
	{name:"corpInfo.materialTel",mapping:"materialTel"},
	{name:"corpInfo.safety",mapping:"safety"},
	{name:"corpInfo.safetyTel",mapping:"safetyTel"},
	{name:"corpInfo.corpStatus",mapping:"corpStatus"},
	{name:"corpInfo.corpStatusName",mapping:"corpStatusName"},
	{name:"corpInfo.department.depId",mapping:"department.depId"},
	{name:"corpInfo.department.depName",mapping:"department.depName"}
];
var CorpInfoHiddenField = [
	{xtype:"hidden",name:"corpInfo.corpId"},
	{xtype:"hidden",name:"corpInfo.depId"},
	{xtype:"hidden",name:"corpInfo.photo"},
	{xtype:"hidden",name:"corpInfo.corpAccounts"}
];
var CorpInfoListViewField = [ "corpId", "corpName", "corpCode", "corpTypeName", "license", "birthDate", "legalMan", "legalMobile", "dutyman", "dutymanTel1", "corpStatus", "corpCert", "department","certLevel" ,"certNum"];

var DispatchAllocateInitListViewField = [ "disAllInitId","componCateGoryName", "equipVenderName", "equipSpecificName", "componGenericName", "dimensions", "calculate", "quantity","initStatusName"];
var AnnexDetailListViewField = [ "joinId","disAllInitId","componCateGoryName", "equipVenderName", "equipSpecificName", "componGenericName", "dimension", "calculate", "quantity","componCateGoryName"];
//===========================================================================//
var CorpCertFieldMapping = [
	{name:"corpCert.certId",mapping:"certId"},
	{name:"corpCert.corpId",mapping:"corpId"},
	{name:"corpCert.certNum",mapping:"certNum"},
	{name:"corpCert.corpCode",mapping:"corpCode"},
	{name:"corpCert.certType",mapping:"certType"},
	{name:"corpCert.certTypeName",mapping:"certTypeName"},
	{name:"corpCert.tradeType",mapping:"tradeType"},
	{name:"corpCert.tradeTypeName",mapping:"tradeTypeName"},
	{name:"corpCert.tradeBound",mapping:"tradeBound"},
	{name:"corpCert.tradeBoundName",mapping:"tradeBoundName"},
	{name:"corpCert.titleLevel",mapping:"titleLevel"},
	{name:"corpCert.titleLevelName",mapping:"titleLevelName"},
	{name:"corpCert.copyCertCount",mapping:"copyCertCount"},
	{name:"corpCert.noteNumber",mapping:"noteNumber"},
	{name:"corpCert.noteDate",mapping:"noteDate"},
	{name:"corpCert.organName",mapping:"organName"},
	{name:"corpCert.organDate",mapping:"organDate"},
	{name:"corpCert.endDate",mapping:"endDate"},
	{name:"corpCert.printNumber",mapping:"printNumber"},
	{name:"corpCert.mark",mapping:"mark"},
	{name:"corpCert.remark",mapping:"remark"},
	{name:"corpCert.isvalid",mapping:"isvalid"},
	{name:"corpCert.isvalidName",mapping:"isvalidName"},
	{name:"corpCert.defaultCert",mapping:"defaultCert"},
	{name:"corpCert.corpName",mapping:"corpName"}
];
var CorpCertHiddenField = [
	{xtype:"hidden",name:"corpCert.certId"},
	{xtype:"hidden",name:"corpCert.corpId"}
];
var CorpCertListViewField = [ "certId", "corpId", "corpName", "certNum", "certTypeName", "titleLevelName", "copyCertCount", "organName", "organDate", "makeDate", "isvalid", "isvalidName","endDate" ];
//===========================================================================//
var PractitionerFieldMapping = [
	{name:"practitioner.practiId",mapping:"practiId"},
	{name:"practitioner.bankDeposit",mapping:"bankDeposit"},
	{name:"practitioner.account",mapping:"account"},
	{name:"practitioner.corpId",mapping:"corpId"},
	{name:"practitioner.depId",mapping:"depId"},
	{name:"practitioner.userId",mapping:"userId"},
	{name:"practitioner.practiName",mapping:"practiName"},
	{name:"practitioner.sex",mapping:"sex"},
	{name:"practitioner.sexName",mapping:"sexName"},
	{name:"practitioner.idCard",mapping:"idCard"},
	{name:"practitioner.mobile",mapping:"mobile"},
	{name:"practitioner.birthDate",mapping:"birthDate"},
	{name:"practitioner.nation",mapping:"nation"},
	{name:"practitioner.nationName",mapping:"nationName"},
	{name:"practitioner.station",mapping:"station"},
	{name:"practitioner.baseSalary",mapping:"baseSalary"},
	{name:"practitioner.divisionDate",mapping:"divisionDate"},
	{name:"practitioner.kindWork",mapping:"kindWork"},
	{name:"practitioner.incumbent",mapping:"incumbent"},
	{name:"practitioner.separationDate",mapping:"separationDate"},
	{name:"practitioner.kindWorkName",mapping:"kindWorkName"},
	{name:"practitioner.degree",mapping:"degree"},
	{name:"practitioner.degreeName",mapping:"degreeName"},
	{name:"practitioner.eduLevel",mapping:"eduLevel"},
	{name:"practitioner.eduLevelName",mapping:"eduLevelName"},
	{name:"practitioner.university",mapping:"university"},
	{name:"practitioner.major",mapping:"major"},
	{name:"practitioner.professionTitle",mapping:"professionTitle"},
	{name:"practitioner.birthplace",mapping:"birthplace"},
	{name:"practitioner.homeTel",mapping:"homeTel"},
	{name:"practitioner.email",mapping:"email"},
	{name:"practitioner.address",mapping:"address"},
	{name:"practitioner.photo",mapping:"photo"},
	{name:"practitioner.remark",mapping:"remark"},
	{name:"practitioner.certFlag",mapping:"certFlag"},
	{name:"practitioner.teams",mapping:"teams"},
	{name:"practitioner.projectId",mapping:"projectId"},
	{name:"practitioner.projectName",mapping:"projectName"},
	{name:"practitioner.insureStatus",mapping:"insureStatus"},
	{name:"practitioner.insureStatusName",mapping:"insureStatusName"},
	{name:"practitioner.isAffiliate",mapping:"isAffiliate"},
	{name:"practitioner.clarificaStatus",mapping:"clarificaStatus"},
	{name:"practitioner.clarificaStatusName",mapping:"clarificaStatusName"},
	{name:"practitioner.corpInfo.corpId",mapping:"corpInfo.corpId"},
	{name:"practitioner.corpInfo.corpName",mapping:"corpInfo.corpName"},
	{name:"practitioner.department.depId",mapping:"department.depId"},
	{name:"practitioner.department.depName",mapping:"department.depName"},
	{name:"practitioner.appUser.userId",mapping:"appUser.userId"},
	{name:"practitioner.appUser.username",mapping:"appUser.username"},
	{name:"practitioner.appUser.password",mapping:"appUser.password"},
	{name:"practitioner.appUser.mobile",mapping:"appUser.mobile"},
	{name:"practitioner.appUser.depId",mapping:"appUser.depId"}
];
var PractitionerHiddenField = [
	{xtype:"hidden",name:"practitioner.practiId"},
	{xtype:"hidden",name:"practitioner.corpId"},
	{xtype:"hidden",name:"practitioner.projectId"},
	{xtype:"hidden",name:"practitioner.corpInfo.corpId"},
	{xtype:"hidden",name:"practitioner.userId"},
	{xtype:"hidden",name:"practitioner.insureStatus"},
	{xtype:"hidden",name:"practitioner.appUser.userId"},
	{xtype:"hidden",name:"practitioner.appUser.depId"},
	{xtype:"hidden",name:"practitioner.photo"}
];
var PractitionerListViewField = [ "practiId", "practiName","sexName", "idCard", "mobile", "station", "divisionDate", "separationDate", "incumbent", "kindWork", "kindWorkName", "baseSalary", "professionTitle", "homeTel", "email", "bankDeposit", "account", "teams", "certFlag", "practiStatus", "corpInfo", "department", "appUser", "projectId", "projectName","project","insureStatus","insureStatusName", "isAffiliate","clarificaStatusName","equipGenericName"];
//===========================================================================//
var PractiCertFieldMapping = [
	{name:"practiCert.certId",mapping:"certId"},
	{name:"practiCert.practiId",mapping:"practiId"},
	{name:"practiCert.certNum",mapping:"certNum"},
	{name:"practiCert.specialtyType",mapping:"specialtyType"},
	{name:"practiCert.specialtyTypeName",mapping:"specialtyTypeName"},
	{name:"practiCert.registrantOrganization",mapping:"registrantOrganization"},
	{name:"practiCert.practiKindwork",mapping:"practiKindwork"},
	{name:"practiCert.practiKindworkName",mapping:"practiKindworkName"},
	{name:"practiCert.awardDepart",mapping:"awardDepart"},
	{name:"practiCert.awardDepartName",mapping:"awardDepartName"},
	{name:"practiCert.awardDate",mapping:"awardDate"},
	{name:"practiCert.effectDate",mapping:"effectDate"},
	{name:"practiCert.contractDate",mapping:"contractDate"},
	{name:"practiCert.stampNum",mapping:"stampNum"},
	{name:"practiCert.qstate",mapping:"qstate"},
	{name:"practiCert.qstateName",mapping:"qstateName"},
	{name:"practiCert.mark",mapping:"mark"},
	{name:"practiCert.remark",mapping:"remark"},
	{name:"practiCert.practitioner.practiId",mapping:"practitioner.practiId"},
	{name:"practiCert.practitioner.practiName",mapping:"practitioner.practiName"},
	{name:"practiCert.practitioner.mobile",mapping:"practitioner.mobile"},
	{name:"practiCert.practitioner.idCard",mapping:"practitioner.idCard"}
];
var PractiCertHiddenField = [
	{xtype:"hidden",name:"practiCert.certId"},
	{xtype:"hidden",name:"practiCert.practitioner.practiId"}
];
var PractiCertListViewField = [ "certId", "certNum","registrantOrganization", "specialtyTypeName", "practiKindworkName", "awardDepart", "effectDate", "qstate", "practitioner" ,"awardDepartName"];
//===========================================================================//
var SupplierFieldMapping = [
	{name:"supplier.supplierId",mapping:"supplierId"},
	{name:"supplier.supplierName",mapping:"supplierName"},
	{name:"supplier.unitType",mapping:"unitType"},
	{name:"supplier.address",mapping:"address"},
	{name:"supplier.tel",mapping:"tel"},
	{name:"supplier.mainBusiness",mapping:"mainBusiness"},
	{name:"supplier.regCapital",mapping:"regCapital"},
	{name:"supplier.birthDate",mapping:"birthDate"},
	{name:"supplier.businessArea",mapping:"businessArea"},
	{name:"supplier.description",mapping:"description"},
	{name:"supplier.remark",mapping:"remark"},
	{name:"supplier.status",mapping:"status"},
	{name:"supplier.statusName",mapping:"statusName"},
	{name:"supplier.linkMan",mapping:"linkMan"},
	{name:"supplier.linkManPhone",mapping:"linkManPhone"}
];
var SupplierHiddenField = [
	{xtype:"hidden",name:"supplier.supplierId"},
	{xtype:"hidden",name:"supplier.supplierLinkers"},
	{xtype:"hidden",name:"supplier.supplierAccounts"}
];
var SupplierListViewField = [ "supplierId", "supplierName", "unitType", "address", "tel", "mainBusiness", "birthDate", "businessArea", "status", "supplierLinker", "supplierAccount","linkMan","linkManPhone" ];
var SupplierLinkerListViewField = [ "supplierLinkerId", "supplierId", "linkerType", "linkerTypeName", "linker", "duties", "tel", "officePhone", "birthDate", "interests", "remark", "defaultFlag" ];
var SupplierAccountListViewField = [ "supplierAccountId", "supplierId", "bankDeposit", "account", "address", "defaultFlag" ];
//===========================================================================//
var CustomerFieldMapping = [
	{name:"customer.customerId",mapping:"customerId"},
	{name:"customer.customerName",mapping:"customerName"},
	{name:"customer.customerNiceName",mapping:"customerNiceName"},
	{name:"customer.customerLevel",mapping:"customerLevel"},
	{name:"customer.unitType",mapping:"unitType"},
	{name:"customer.address",mapping:"address"},
	{name:"customer.tel",mapping:"tel"},
	{name:"customer.mainBusiness",mapping:"mainBusiness"},
	{name:"customer.regCapital",mapping:"regCapital"},
	{name:"customer.birthDate",mapping:"birthDate"},
	{name:"customer.businessArea",mapping:"businessArea"},
	{name:"customer.description",mapping:"description"},
	{name:"customer.remark",mapping:"remark"},
	{name:"customer.status",mapping:"status"},
	{name:"customer.statusName",mapping:"statusName"},
	{name:"customer.customerAttribute",mapping:"customerAttribute"}
];
var CustomerHiddenField = [
	{xtype:"hidden",name:"customer.customerId"},
	{xtype:"hidden",name:"customer.customerLinkers"},
	{xtype:"hidden",name:"customer.customerAccounts"}
];
var CustomerListViewField = [ "customerId", "customerName", "customerLevel", "unitType", "tel", "mainBusiness", "birthDate", "businessArea", "status", "customerLinker", "customerAccount","customerNiceName","customerLevelName","customerAttribute","customerAttributeName" ];
var CustomerLinkerListViewField = [ "customerLinkerId", "customerId", "linkerType", "linkerTypeName", "linker", "duties", "tel", "officePhone", "birthDate", "interests", "remark", "defaultFlag" ];
var CustomerAccountListViewField = [ "customerAccountId", "customerId", "bankDeposit", "account", "address", "defaultFlag" ];
//===========================================================================//
var ProjectFieldMapping = [
	{name:"project.projectId",mapping:"projectId"},
	{name:"project.projectSerial",mapping:"projectSerial"},
	{name:"project.projectName",mapping:"projectName"},
	{name:"project.projectType",mapping:"projectType"},
	{name:"project.projectTypeName",mapping:"projectTypeName"},
	{name:"project.depName",mapping:"depName"},
	{name:"project.province",mapping:"province"},
	{name:"project.provinceName",mapping:"provinceName"},
	{name:"project.city",mapping:"city"},
	{name:"project.cityName",mapping:"cityName"},
	{name:"project.county",mapping:"county"},
	{name:"project.countyName",mapping:"countyName"},
	{name:"project.street",mapping:"street"},
	{name:"project.address",mapping:"address"},
	{name:"project.scale",mapping:"scale"},
	{name:"project.scaleName",mapping:"scaleName"},
	{name:"project.startPlanDate",mapping:"startPlanDate"},
	{name:"project.endPlanDate",mapping:"endPlanDate"},
	{name:"project.projectCost",mapping:"projectCost"},
	{name:"project.cover",mapping:"cover"},
	{name:"project.overallHeight",mapping:"overallHeight"},
	{name:"project.ctCustomId",mapping:"ctCustomId"},
	{name:"project.ctCustomName",mapping:"ctCustomName"},
	{name:"project.ctCustomLinker",mapping:"ctCustomLinker"},
	{name:"project.ctCustomLinkTel",mapping:"ctCustomLinkTel"},
	{name:"project.unCustomId",mapping:"unCustomId"},
	{name:"project.unCustomName",mapping:"unCustomName"},
	{name:"project.unCustomLinker",mapping:"unCustomLinker"},
	{name:"project.unCustomLinkTel",mapping:"unCustomLinkTel"},
	{name:"project.supCustomId",mapping:"supCustomId"},
	{name:"project.supCustomName",mapping:"supCustomName"},
	{name:"project.supCustomLinker",mapping:"supCustomLinker"},
	{name:"project.supCustomLinkTel",mapping:"supCustomLinkTel"},
	{name:"project.remark",mapping:"remark"},
	{name:"project.practiId",mapping:"practiId"},
	{name:"project.practiName",mapping:"practiName"},
	{name:"project.projectPractiId",mapping:"projectPractiId"},
	{name:"project.projectPractiName",mapping:"projectPractiName"},
	{name:"project.projectMobile",mapping:"projectMobile"},
	{name:"project.materialPractiId",mapping:"materialPractiId"},
	{name:"project.materialPractiName",mapping:"materialPractiName"},
	{name:"project.materialMobile",mapping:"materialMobile"},
	{name:"project.reqsDesc",mapping:"reqsDesc"},
	{name:"project.statusName",mapping:"statusName"},
	{name:"project.expectEndDate",mapping:"expectEndDate"},
	{name:"project.constructPermit",mapping:"constructPermit"},
	{name:"project.projectRegister",mapping:"projectRegister"},
	{name:"project.leaseProjectHead",mapping:"leaseProjectHead"},
	{name:"project.department.depId",mapping:"depId"},
	{name:"project.contractId",mapping:"contractId"},
	{name:"project.customerNickName",mapping:"customerNickName"}
];
var ProjectHiddenField = [
	{xtype:"hidden",name:"project.projectId"},
	{xtype:"hidden",name:"project.ctCustomId"},
	{xtype:"hidden",name:"project.unCustomId"},
	{xtype:"hidden",name:"project.supCustomId"},
	{xtype:"hidden",name:"project.practiId"},
	{xtype:"hidden",name:"project.projectPractiId"},
	{xtype:"hidden",name:"project.materialPractiId"},
	{xtype:"hidden",name:"project.projectMobile"},
	{xtype:"hidden",name:"project.materialMobile"},
	{xtype:"hidden",name:"project.projectExpenses"}
];
var ProjectListViewField = [ "projectId","projectSerial","projectName","projectType","projectTypeName","projectPractiName" ,"materialPractiName","department","address","scale","scaleName",
						"startPlanDate","endPlanDate","projectCost","cover","overallHeight","unCustomLinker","unCustomLinkTel","practiName","expectEndDate","statusName","unCustomName",
						"ctCustomName","supCustomName","customerNickName","street","taxModeName","taxMode","province","depName","leaseProjectHead","cityName", "countyName","provinceName","unCustomId","contractId"];

var ProjectExpenseListViewField = [ "projectExpenseId", "projectId", "spendDate", "discription", "status", "expenseAmount", "expenseDesc", "remark" ];
//===========================================================================//
var ComponentFieldMapping = [
	{name:"component.componId",mapping:"componId"},
	{name:"component.totalCounts",mapping:"totalCounts"},
	{name:"component.periodReserve",mapping:"periodReserve"},
	{name:"component.unitprice",mapping:"unitprice"},
	{name:"component.componSerial",mapping:"componSerial"},
	{name:"component.componCategory",mapping:"componCategory"},
	{name:"component.componCategoryName",mapping:"componCategoryName"},
	{name:"component.componGeneric",mapping:"componGeneric"},
	{name:"component.componGenericName",mapping:"componGenericName"},
	{name:"component.componSpecific",mapping:"componSpecific"},
	{name:"component.componSpecificName",mapping:"componSpecificName"},
	{name:"component.componCode",mapping:"componCode"},
	{name:"component.dimensions",mapping:"dimensions"},
	{name:"component.purchaseDate",mapping:"purchaseDate"},
	{name:"component.scrapDate",mapping:"scrapDate"},
	{name:"component.calculate",mapping:"calculate"},
	{name:"component.rfidCode",mapping:"rfidCode"},
	{name:"component.supplierId",mapping:"supplierId"},
	{name:"component.supplierName",mapping:"supplierName"},
	{name:"component.supplierAdd",mapping:"supplierAdd"},
	{name:"component.supplierTel",mapping:"supplierTel"},
	{name:"component.practiId",mapping:"practiId"},
	{name:"component.practiName",mapping:"practiName"},
	{name:"component.mobile",mapping:"mobile"},
	{name:"component.assetValue",mapping:"assetValue"},
	{name:"component.depreciateRate",mapping:"depreciateRate"},
	{name:"component.totalRate",mapping:"totalRate"},
	{name:"component.presentValue",mapping:"presentValue"},
	{name:"component.depreciateDate",mapping:"depreciateDate"},
	{name:"component.consumeFlag",mapping:"consumeFlag"},
	{name:"component.consumeCounts",mapping:"consumeCounts"},
	{name:"component.knotFlag",mapping:"knotFlag"},
	{name:"component.boltFlag",mapping:"boltFlag"},
	{name:"component.parachuteFlag",mapping:"parachuteFlag"},
	{name:"component.wallAttacheFlag",mapping:"wallAttacheFlag"},
	{name:"component.deliverFromGodown",mapping:"deliverFromGodown"},
	{name:"component.yesFlag",mapping:"yesFlag"},
	{name:"component.noFlag",mapping:"noFlag"},
	{name:"component.parachuteCheckDate",mapping:"parachuteCheckDate"},
	{name:"component.leftcageSerial",mapping:"leftcageSerial"},
	{name:"component.leftcageCheckDate",mapping:"leftcageCheckDate"},
	{name:"component.rightcageSerial",mapping:"rightcageSerial"},
	{name:"component.rightcageCheckDate",mapping:"rightcageCheckDate"},
	{name:"component.knotMetric",mapping:"knotMetric"},
	{name:"component.brachium",mapping:"brachium"},
	{name:"component.storeId",mapping:"storeId"},
	{name:"component.storeName",mapping:"storeName"},
	{name:"component.equipId",mapping:"equipId"},
	{name:"component.exwSerial",mapping:"exwSerial"},
	{name:"component.propertyName",mapping:"propertyName"},
	{name:"component.recordId",mapping:"recordId"},
	{name:"component.status",mapping:"status"},
	{name:"component.userId",mapping:"userId"},
	{name:"component.userName",mapping:"userName"},
	{name:"component.statusName",mapping:"statusName"},
	{name:"component.batchNumber",mapping:"batchNumber"},
	{name:"component.equipVender",mapping:"equipVender"},
	{name:"component.storeCounts",mapping:"storeCounts"},
	{name:"component.equipVender",mapping:"equipVender"},
	{name:"component.equipVenderName",mapping:"equipVenderName"},
	{name:"component.categoryBriefCode",mapping:"categoryBriefCode"},
	{name:"component.number",mapping:"number"},
	{name:"component.department.depId",mapping:"department.depId"},
	{name:"component.department.depName",mapping:"department.depName"}
];
var ComponentHiddenField = [
	{xtype:"hidden",name:"component.componId"},
	{xtype:"hidden",name:"component.storeId"},
	{xtype:"hidden",name:"component.supplierId"},
	{xtype:"hidden",name:"component.practiId"},
	{xtype:"hidden",name:"component.userId"},
	{xtype:"hidden",name:"component.equipId"},
	{xtype:"hidden",name:"component.recordId"},
	{xtype:"hidden",name:"component.department.depId"},
	{xtype:"hidden",name:"component.storeHouseJoinComponents"},
	{xtype:"hidden",name:"component.depreciateDate"}
];

var ComponentListViewField = [ "componId", "componSerial", "componCategory", "pickupDate", "componCategoryName", "componGeneric", "componGenericName", "componSpecific", "componSpecificName", "componCode", "dimensions", "purchaseDate", "scrapDate", "calculate", "unitprice", "supplierName", "practiName", "assetValue", "presentValue", "storeId", "storeName", "equipId", "exwSerial", "consumeFlag", "parachuteFlag", "knotFlag", "boltFlag", "deliverFromGodown", "yesFlag", "noFlag", "leftcageCheckDate", "consumeCounts", "periodReserve", "knotMetric", "status", "statusName", "totalCounts", "inuseCounts", "unuseCounts","counts","leftcageSerial","equipVender","initcounts","equipVenderName","storeCounts" ];

//===========================================================================//
var EquipmentFieldMapping = [
    {name:"equipment.equipId",mapping:"equipId"},
	{name:"equipment.recordSerial",mapping:"recordSerial"},
	{name:"equipment.equipSerial",mapping:"equipSerial"},
	{name:"equipment.equipCategory",mapping:"equipCategory"},
	{name:"equipment.equipCategoryName",mapping:"equipCategoryName"},
	{name:"equipment.equipGeneric",mapping:"equipGeneric"},
	{name:"equipment.equipGenericName",mapping:"equipGenericName"},
	{name:"equipment.equipSpecific",mapping:"equipSpecific"},
	{name:"equipment.equipSpecificName",mapping:"equipSpecificName"},
	{name:"equipment.brachium",mapping:"brachium"},
	{name:"equipment.loadingWeight",mapping:"loadingWeight"},
	{name:"equipment.workingRange",mapping:"workingRange"},
	{name:"equipment.independentHeight",mapping:"independentHeight"},
	{name:"equipment.attachmentHeight",mapping:"attachmentHeight"},
	{name:"equipment.licenseNumber",mapping:"licenseNumber"},
	{name:"equipment.exwSerial",mapping:"exwSerial"},
	{name:"equipment.exwDate",mapping:"exwDate"},
	{name:"equipment.purchaseDate",mapping:"purchaseDate"},
	{name:"equipment.scrapDate",mapping:"scrapDate"},
	{name:"equipment.equipVender",mapping:"equipVender"},
	{name:"equipment.propertyEnt",mapping:"propertyEnt"},
	{name:"equipment.propertyName",mapping:"propertyName"},
	{name:"equipment.dutyman",mapping:"dutyman"},
	{name:"equipment.dutymanTel",mapping:"dutymanTel"},
	{name:"equipment.mortgage",mapping:"mortgage"},
	{name:"equipment.recordId",mapping:"recordId"},
	{name:"equipment.rfidCode",mapping:"rfidCode"},
	{name:"equipment.supplierId",mapping:"supplierId"},
	{name:"equipment.supplierName",mapping:"supplierName"},
	{name:"equipment.supplierAdd",mapping:"supplierAdd"},
	{name:"equipment.supplierTel",mapping:"supplierTel"},
	{name:"equipment.practiId",mapping:"practiId"},
	{name:"equipment.practiName",mapping:"practiName"},
	{name:"equipment.mobile",mapping:"mobile"},
	{name:"equipment.equipSource",mapping:"equipSource"},
	{name:"equipment.customerId",mapping:"customerId"},
	{name:"equipment.customerLinkerId",mapping:"customerLinkerId"},
	{name:"equipment.customerName",mapping:"customerName"},
	{name:"equipment.linkman",mapping:"linkman"},
	{name:"equipment.linkmanTel",mapping:"linkmanTel"},
	{name:"equipment.assetValue",mapping:"assetValue"},
	{name:"equipment.depreciateRate",mapping:"depreciateRate"},
	{name:"equipment.totalRate",mapping:"totalRate"},
	{name:"equipment.presentValue",mapping:"presentValue"},
	{name:"equipment.depreciateDate",mapping:"depreciateDate"},
	{name:"equipment.paymentType",mapping:"paymentType"},
	{name:"equipment.paymentTypeName",mapping:"paymentTypeName"},
	{name:"equipment.rentalUnit",mapping:"rentalUnit"},
	{name:"equipment.priceUnit",mapping:"priceUnit"},
	{name:"equipment.mortgageAmount",mapping:"mortgageAmount"},
	{name:"equipment.mortgagePeriods",mapping:"mortgagePeriods"},
	{name:"equipment.owingStartDate",mapping:"owingStartDate"},
	{name:"equipment.owingEndDate",mapping:"owingEndDate"},
	{name:"equipment.monthlyPayment",mapping:"monthlyPayment"},
	{name:"equipment.payeeId",mapping:"payeeId"},
	{name:"equipment.payeeName",mapping:"payeeName"},
	{name:"equipment.payeeAdd",mapping:"payeeAdd"},
	{name:"equipment.payeeTel",mapping:"payeeTel"},
	{name:"equipment.storeId",mapping:"storeId"},
	{name:"equipment.storeName",mapping:"storeName"},
	{name:"equipment.flowId",mapping:"flowId"},
	{name:"equipment.projectName",mapping:"projectName"},
	{name:"equipment.projectAddress",mapping:"projectAddress"},
	{name:"equipment.buildingNum",mapping:"buildingNum"},
	{name:"equipment.remark",mapping:"remark"},
	{name:"equipment.monitorSerial",mapping:"monitorSerial"},
	{name:"memo.businessStatus",mapping:"businessStatus"},
	{name:"memo.businessStatusName",mapping:"businessStatusName"},
	{name:"equipment.status",mapping:"status"},
	{name:"equipment.statusName",mapping:"statusName"},
	{name:"equipment.delFlag",mapping:"delFlag"},
	{name:"equipment.userId",mapping:"userId"},
	{name:"equipment.userName",mapping:"userName"},
	{name:"equipment.armTipWeight",mapping:"armTipWeight"},
	{name:"equipment.mostMoment",mapping:"mostMoment"},
	{name:"equipment.amplitudeForm",mapping:"amplitudeForm"},
	{name:"equipment.amplitudeSpeed",mapping:"amplitudeSpeed"},
	{name:"equipment.railFrameHeight",mapping:"railFrameHeight"},
	{name:"equipment.railUpHeight",mapping:"railUpHeight"},
	{name:"equipment.freedomHeight",mapping:"freedomHeight"},
	{name:"equipment.motorPower",mapping:"motorPower"},
	{name:"equipment.driveForm",mapping:"driveForm"},
	{name:"equipment.ssDriveForm",mapping:"ssDriveForm"},
	{name:"equipment.ratedLiftSpeed",mapping:"ratedLiftSpeed"},
	{name:"equipment.ratedCrewNum",mapping:"ratedCrewNum"},
	{name:"equipment.maxLiftHeight",mapping:"maxLiftHeight"},
	{name:"equipment.department.depId",mapping:"department.depId"},
	{name:"equipment.permissionFlag",mapping:"permissionFlag"},
	{name:"equipment.insureStatus",mapping:"insureStatus"},
	{name:"equipment.insureStatusName",mapping:"insureStatusName"},
	{name:"equipment.insureTime",mapping:"insureTime"},
	/*{name:"equipment.department.depName",mapping:"department.depName"}*/
];
var EquipmentHiddenField = [                            
	{xtype:"hidden",name:"equipment.equipId"},
	{xtype:"hidden",name:"equipment.storeId"},
	{xtype:"hidden",name:"equipment.projectId"},
	{xtype:"hidden",name:"equipment.propertyEnt"},
	{xtype:"hidden",name:"equipment.mortgage"},
	{xtype:"hidden",name:"equipment.supplierId"},
	{xtype:"hidden",name:"equipment.practiId"},
	{xtype:"hidden",name:"equipment.customerId"},
	{xtype:"hidden",name:"equipment.customerLinkerId"},
	{xtype:"hidden",name:"equipment.payeeId"},
	{xtype:"hidden",name:"equipment.userId"},
	{xtype:"hidden",name:"equipment.instalments"},
	{xtype:"hidden",name:"equipment.components"},
	{xtype:"hidden",name:"equipment.equipmentAffiliateds"}
];
var EquipmentListViewField = [ "equipId","recordSerial","storeId","equipSerial", "equipCategory", "equipCategoryName", "equipGeneric", "equipGenericName", 
	"equipSpecific", "equipSpecificName","equipVenderName","equipVender", "equipSourceName", "exwSerial", "purchaseDate", "scrapDate", "equipVender", 
	"propertyEnt", "propertyName", "mortgage", "recordId", "assetValue", "presentValue", "mortgageAmount", "finishedAmount", "remainderAmount", 
	"storeName", "payeeName", "monitorSerial", "storeStatus", "storeStatusName", "projectId", "projectName", "projectAddress", "businessStatus", 
	"businessStatus", "businessStatusName", "latestRepairDate", "latestInspectDate", "buildingNum","belongToArea","belongToAreaName",
	"loadingWeight","attachmentHeight","independentHeight","brachium","exwDate","equipmentAffiliatedSet","equipSerial","warehouseDate","statusName",
	"permissionFlag","insureTime","insureStatus","insureStatusName","status","department"];
var EquipmentAffiliatedListViewField = [ "equipAffiliatedId", "equipId", "componGenericName", "componSpecificName","componSpecific","dimensions","quantity", "remark" ];
//===========================================================================//
var ContractLeaseFieldMapping = [
	{name:"contractLease.contractId",mapping:"contractId"},
	{name:"contractLease.collectionRatio",mapping:"collectionRatio"},
	{name:"contractLease.contractSerial",mapping:"contractSerial"},
	{name:"contractLease.contractTheme",mapping:"contractTheme"},
	{name:"contractLease.contractCategory",mapping:"contractCategory"},
	{name:"contractLease.contractCategoryName",mapping:"contractCategoryName"},
	{name:"contractLease.fundType",mapping:"fundType"},
	{name:"contractLease.subcontract",mapping:"subcontract"},
	{name:"contractLease.paEnt",mapping:"paEnt"},
	{name:"contractLease.paModule",mapping:"paModule"},
	{name:"contractLease.paEntName",mapping:"paEntName"},
	{name:"contractLease.paEntLinkMan",mapping:"paEntLinkMan"},
	{name:"contractLease.paEntLinkTel",mapping:"paEntLinkTel"},
	{name:"contractLease.pbEnt",mapping:"pbEnt"},
	{name:"contractLease.pbModule",mapping:"pbModule"},
	{name:"contractLease.pbEntName",mapping:"pbEntName"},
	{name:"contractLease.pbEntLinkMan",mapping:"pbEntLinkMan"},
	{name:"contractLease.pbEntLinkTel",mapping:"pbEntLinkTel"},
	{name:"contractLease.enterpriseSerial",mapping:"enterpriseSerial"},
	{name:"contractLease.overallHeight",mapping:"overallHeight"},
	{name:"contractLease.buildingQuantity",mapping:"buildingQuantity"},
	{name:"contractLease.cover",mapping:"cover"},
	{name:"contractLease.salesmanId",mapping:"salesmanId"},
	{name:"contractLease.salesman",mapping:"salesman"},
	{name:"contractLease.salesmanTel",mapping:"salesmanTel"},
	{name:"contractLease.projectId",mapping:"projectId"},
	{name:"contractLease.projectSerial",mapping:"projectSerial"},
	{name:"contractLease.projectName",mapping:"projectName"},
	{name:"contractLease.address",mapping:"address"},
	{name:"contractLease.signingTime",mapping:"signingTime"},
	{name:"contractLease.contractAmount",mapping:"contractAmount"},
	{name:"contractLease.segmentQty",mapping:"segmentQty"},
	{name:"contractLease.wallAttacheQty",mapping:"wallAttacheQty"},
	{name:"contractLease.debitReceivable",mapping:"debitReceivable"},
	{name:"contractLease.deduct",mapping:"deduct"},
	{name:"contractLease.deductDesc",mapping:"deductDesc"},
	{name:"contractLease.remark",mapping:"remark"},
	{name:"contractLease.squareUpDate",mapping:"squareUpDate"},
	{name:"contractLease.contents",mapping:"contents"},
	{name:"contractLease.applyforState",mapping:"applyforState"},
	{name:"contractLease.applyforStateName",mapping:"applyforStateName"},
	{name:"contractLease.equipCount",mapping:"equipCount"},
	{name:"contractLease.practiCount",mapping:"practiCount"},
	{name:"contractLease.delFlag",mapping:"delFlag"},
	{name:"contractLease.fillContent",mapping:"fillContent"},
	{name:"contractLease.userId",mapping:"userId"},
	{name:"contractLease.userName",mapping:"userName"},
	{name:"contractLease.depId",mapping:"depId"},
	{name:"contractLease.sigingTime",mapping:"sigingTime"},
	{name:"contractLease.department.depId",mapping:"department.depId"},
	{name:"contractLease.department.depName",mapping:"department.depName"},
	{name:"contractLease.quantity",mapping:"quantity"},
	{name:"contractLease.assetsProperty",mapping:"assetsProperty"},
	{name:"contractLease.assetsPropertyName",mapping:"assetsPropertyName"},
	{name:"contractLease.buildingArea",mapping:"buildingArea"},
	{name:"contractLease.contractNo",mapping:"contractNo"},
	{name:"contractLease.competentDepartment",mapping:"competentDepartment"},
	{name:"contractLease.competentDepartmentId",mapping:"competentDepartmentId"},
	{name:"contractLease.taxMode",mapping:"taxMode"},
	{name:"contractLease.applicableTaxRate",mapping:"applicableTaxRate"},
	{name:"contractLease.signedArea",mapping:"signedArea"},
	{name:"contractLease.arrangeId",mapping:"arrangeId"},
	{name:"contractLease.belongToArea",mapping:"belongToArea"},
	{name:"contractLease.contractType",mapping:"contractType"},
	{name:"contractLease.contractTypeName",mapping:"contractTypeName"},
	{name:"contractLease.cooperationWay",mapping:"cooperationWay"},
	{name:"contractLease.cooperationWayName",mapping:"cooperationWayName"},
	{name:"contractLease.billUnitId",mapping:"billUnitId"},
	{name:"contractLease.billUnitName",mapping:"billUnitName"},
	{name:"contractLease.invoiceType",mapping:"invoiceType"},
	{name:"contractLease.invoiceTypeName",mapping:"invoiceTypeName"},
	{name:"contractLease.sumRefreshTime",mapping:"sumRefreshTime"},
	{name:"contractLease.materialPractiName",mapping:"materialPractiName"}
];
var ContractLeaseHiddenField = [
	{xtype:"hidden",name:"contractLease.arrangeId"},
	{xtype:"hidden",name:"contractLease.contractId"},
	{xtype:"hidden",name:"contractLease.fundType"},
	{xtype:"hidden",name:"contractLease.subcontract"},
	{xtype:"hidden",name:"contractLease.paEnt"},
	{xtype:"hidden",name:"contractLease.paModule"},
	{xtype:"hidden",name:"contractLease.pbEnt"},
	{xtype:"hidden",name:"contractLease.pbModule"},
	{xtype:"hidden",name:"contractLease.salesmanId"},
	{xtype:"hidden",name:"contractLease.projectId"},
	{xtype:"hidden",name:"contractLease.userId"},
	{xtype:"hidden",name:"contractLease.department.depId"},
	{xtype:"hidden",name:"contractLease.contractEquips"},
	{xtype:"hidden",name:"contractLease.contractEquipBriefs"},
	{xtype:"hidden",name:"contractLease.contractEquipOutlays"},
	{xtype:"hidden",name:"contractLease.contractEquipCosts"},
	{xtype:"hidden",name:"contractLease.contractPractiBriefs"},
	{xtype:"hidden",name:"contractLease.installPriceSets"},
	{xtype:"hidden",name:"contractLease.truckCranePriceSets"},
	{xtype:"hidden",name:"contractLease.contractCostitems"},
	{xtype:"hidden",name:"contractLease.safetyMonitorSettleLists"},
	{xtype:"hidden",name:"contractLease.belongToArea"},
	{xtype:"hidden",name:"contractLease.billUnitId"},
	{xtype:"hidden",name:"contractLease.contractInoutFrees"},
	{xtype:"hidden",name:"contractLease.contractOperatorFrees"},
//	{xtype:"hidden",name:"contractLease.paEntName"}
]; 
var ContractArrangeSelectorListViewField = ["arrangeId", "customerName","corpName","projectName","projectId","corpId","inEnt", "inEntModule", "inEntName", "inEntCertNum","inEntTitleLevel","customerId","arrangeSerial","provinceName","projectAddress"];
var ContractLeaseSelectorListViewField = ["arrangeId", "customerName","corpName","projectName","projectId","corpId"];
var ContractLeaseListViewField = ["contractId", "contractSerial", "contractTheme", "contractCategoryName", "subcontract", "fundType", "fundTypeName", "paEnt", "paModule", "paEntName", "paEntLinkMan", 
	"pbEnt", "pbModule", "pbEntName", "pbEntLinkMan", "enterpriseSerial", "cover", "salesmanId", "salesman", "collectionRatio", "projectId", "projectSerial", "projectName", "address", "signingTime", 
	"contractAmount", "applyforState", "applyforStateName", "providedDate","sentEquipQuantity","installEquipQuantity","usedQuantity","removeQuantity","equipCount","contractNo","competentDepartment",
	"taxMode","taxModeName","applicableTaxRate","signedArea","district","belongToAreaName","belongToArea","equipSerial","department","userName","equipSpecificNames","materialPractiName","settleType","editApproveState","leaseVersionId"];
var ContractEquipListViewField = [ "contractEquipId", "contractId", "equipId", "equipCategory", "equipCategoryName", "equipGeneric", "equipGenericName", "equipSpecific", "equipSpecificName", "recordId", "exwSerial", "recordSerial", "propertyEnt", "propertyName", "buildingNum", "startDate", "endDate", "initialHeight", "finalHeight", "rentStandard", "measurement", "tenancy", "wallAttacheQty", "summary", "remark" ];
var ContractEquipBriefListViewField = [ "ceBriefId", "contractId", "equipCategory", "equipCategoryName","equipSpecific", "equipSpecificName", "unit", "startDate", "endDate", "initialHeight", "finalHeight", "quantity", "rentStandard", "measurement", "tenancy","equipGeneric","dispatchable","approveable" ];
var ContractPractiBriefListViewField = [ "cpBriefId", "contractId", "kindWork", "kindWorkName", "quantity", "startDate", "expense", "measurement", "endDate", "summary", "remark" ];
var ContractCostitemListViewField = [ "costitemId", "contractId", "costitemName", "quantity", "expense", "measurement" ];
var ContractEquipCostListViewField = [ "contractEquipcostId", "contractId", "equipId", "equipCategory", "equipCategoryName", "equipGeneric", "equipGenericName", "equipSpecific", "equipSpecificName", "quantity", "embeddedCost", "liftingCost", "anchorCost", "extraCost", "summary" ];
var ContractEquipOutlayListViewField = [ "contractEquipoutlayId", "contractId", "equipId", "equipCategory", "equipCategoryName", "equipGeneric", "equipGenericName", "equipSpecific", "equipSpecificName", "equipVender", "quantity", "employOutlay", "installOutlay", "dismantleOutlay", "mantOutlay", "summary" ];
var InstalmentListViewField = [ "instalmentId", "relateId", "relateSerial", "relateModule", "relateModuleName", "periods", "payment", "payDate", "alreadyPayment", "remark", "status", "statusName" ];
var ReceivementListViewField = [ "receivementId", "relateId", "relateSerial", "relateModule", "relateModuleName", "periods", "receivement", "receiveDate", "alreadyReceivement", "issueInvoice", "invoiceType", "invoiceTypeName", "remark", "status", "statusName", "invoiceFlag" ];
var ContractInoutFreeListViewField = [ "inoutId", "contractId", "equipGenericName", "equipSpecificName", "rent", "rentUnit","dispatchable","approveable"];
var ContractOperatorFreeListViewField = [ "operatorId", "contractId", "equipGenericName", "equipSpecificName", "rent", "rentUnit","dispatchable","approveable"];
//===========================================================================//
var SettleContractFieldMapping = [
	{name:"settleContract.settleId",mapping:"settleId"},
	{name:"settleContract.sitesPrincipal",mapping:"sitesPrincipal"},
	{name:"settleContract.collectionRatio",mapping:"collectionRatio"},
	{name:"settleContract.settleSerial",mapping:"settleSerial"},
	{name:"settleContract.settleTheme",mapping:"settleTheme"},
	{name:"settleContract.settleDate",mapping:"settleDate"},
	{name:"settleContract.contractId",mapping:"contractId"},
	{name:"settleContract.contractSerial",mapping:"contractSerial"},
	{name:"settleContract.contractTheme",mapping:"contractTheme"},
	{name:"settleContract.paEnt",mapping:"paEnt"},
	{name:"settleContract.paModule",mapping:"paModule"},
	{name:"settleContract.paEntName",mapping:"paEntName"},
	{name:"settleContract.pbEnt",mapping:"pbEnt"},
	{name:"settleContract.pbModule",mapping:"pbModule"},
	{name:"settleContract.pbEntName",mapping:"pbEntName"},
	{name:"settleContract.projectId",mapping:"projectId"},
	{name:"settleContract.projectSerial",mapping:"projectSerial"},
	{name:"settleContract.projectName",mapping:"projectName"},
	{name:"settleContract.address",mapping:"address"},
	{name:"settleContract.startSettleDate",mapping:"startSettleDate"},
	{name:"settleContract.endSettleDate",mapping:"endSettleDate"},
	{name:"settleContract.settleAmount",mapping:"settleAmount"},
	{name:"settleContract.finishedAmount",mapping:"finishedAmount"},
	{name:"settleContract.arrearsAmount",mapping:"arrearsAmount"},
	{name:"settleContract.fundStatus",mapping:"fundStatus"},
	{name:"settleContract.fundStatusName",mapping:"fundStatusName"},
	{name:"settleContract.fundType",mapping:"fundType"},
	{name:"settleContract.fundTypeName",mapping:"fundTypeName"},
	{name:"settleContract.fundCategory",mapping:"fundCategory"},
	{name:"settleContract.fundCategoryName",mapping:"fundCategoryName"},
	{name:"settleContract.effective",mapping:"effective"},
	{name:"settleContract.effectiveName",mapping:"effectiveName"},
	{name:"settleContract.taxAmount",mapping:"taxAmount"},
	{name:"settleContract.taxRate",mapping:"taxRate"},
	{name:"settleContract.remark",mapping:"remark"},
	{name:"settleContract.userId",mapping:"userId"},
	{name:"settleContract.userName",mapping:"userName"},
	{name:"settleContract.providedDate",mapping:"providedDate"},
	{name:"settleContract.department.depId",mapping:"department.depId"},
	{name:"settleContract.department.depName",mapping:"department.depName"},
	{name:"settleContract.currentTotalAmount",mapping:"currentTotalAmount"},
	{name:"settleContract.currentNoTaxAmount",mapping:"currentNoTaxAmount"},
	{name:"settleContract.accumulatedAmount",mapping:"accumulatedAmount"},
	{name:"settleContract.contractNo",mapping:"contractNo"},
	{name:"settleContract.summaryReceivable",mapping:"summaryReceivable"},
	{name:"settleContract.summaryReceived",mapping:"summaryReceived"},
	{name:"settleContract.arrears",mapping:"arrears"},
	{name:"settleContract.leaseProjectHead",mapping:"leaseProjectHead"},
	{name:"settleContract.receivedAmount",mapping:"receivedAmount"}
];
var SettleContractHiddenField = [
	{xtype:"hidden",name:"settleContract.settleId"},
	{xtype:"hidden",name:"settleContract.contractId"},
	{xtype:"hidden",name:"settleContract.paEnt"},
	{xtype:"hidden",name:"settleContract.paModule"},
	{xtype:"hidden",name:"settleContract.pbEnt"},
	{xtype:"hidden",name:"settleContract.pbModule"},
	{xtype:"hidden",name:"settleContract.projectId"},
	{xtype:"hidden",name:"settleContract.fundStatus"},
	{xtype:"hidden",name:"settleContract.fundType"},
	{xtype:"hidden",name:"settleContract.fundCategory"},
	{xtype:"hidden",name:"settleContract.effective"},
	{xtype:"hidden",name:"settleContract.userId"},
	{xtype:"hidden",name:"settleContract.department.depId"},
	{xtype:"hidden",name:"settleContract.instalments"},
	{xtype:"hidden",name:"settleContract.receivements"},
	{xtype:"hidden",name:"settleContract.settleEquipBriefs"},
	{xtype:"hidden",name:"settleContract.settleComponBriefs"},
	{xtype:"hidden",name:"settleContract.settleItemBriefs"},
	{xtype:"hidden",name:"settleContract.amountReceives"},
	{xtype:"hidden",name:"settleContract.operatorSalaryStatements"},
	{xtype:"hidden",name:"settleContract.safetyMonitorSettleStatements"},
	{xtype:"hidden",name:"settleContract.safetyMonitorSettleLists"},
	{xtype:"hidden",name:"settleContract.otherExpenseStatements"},
	{xtype:"hidden",name:"settleContract.contractSerial"},
	{xtype:"hidden",name:"contractIds"},
//	{xtype:"hidden",name:"settleContract.accumulatedAmount"}
];
var SettleContractListViewField = [ "settleId", "settleSerial", "settleTheme", "contractId", "contractSerial", "paEntName", "projectId", "projectSerial", "projectName", 
                                    "address", "startSettleDate", "endSettleDate", "settleAmount", "finishedAmount", "balanceAmount", "collectionRatio", "taxAmount", "taxRate", 
                                    "fundStatusName", "fundType", "fundTypeName","fundCategory","fundCategoryName", "effective", "effectiveName", "sitesPrincipal", 
                                    "providedDate", "arrearsAmount", "contractNo","summaryReceivable","summaryReceived","arrears","materialPractiName","receivedAmount","userName",
                                    "settleType","closedStatus","invoiceType" ];
var SettleContractRecordListViewField = ["recordId", "settleId", "settleSerial", "settleTheme", "contractId", "contractSerial", "paEntName", "projectId", "projectSerial", "projectName", 
    "address", "startSettleDate", "endSettleDate", "settleAmount", "finishedAmount", "balanceAmount", "collectionRatio", "taxAmount", "taxRate", 
    "fundStatusName", "fundType", "fundTypeName","fundCategory","fundCategoryName", "effective", "effectiveName", "sitesPrincipal", 
    "providedDate", "arrearsAmount", "contractNo","summaryReceivable","summaryReceived","arrears","materialPractiName","receivedAmount","userName","settleType","closedStatus","userName","createTime","settleContract" ];
var SettleEquipBriefListViewField = [ "seBriefId", "settleId", "equipDiaryId","buildingNum", "recordSerial", "recordId", "exwSerial", "equipCategoryName", "equipSpecificName",
	"unit", "startSettleDate", "endSettleDate", "settleDays", "rentStandard", "measurement", "quantity", "daysRent", "deductRent", "summary", "remark", "monthTag", "taxRate",
	"preTaxAmount", "afterTaxAmount","taxes","contractId","equipId","equipment","activateDate"];
var SettleComponBriefListViewField = [ "scBriefId", "settleId", "buildingNum", "componDiaryId", "componId", "componSerial", "componCategoryName", "componSpecificName", "unit", 
	"startSettleDate", "endSettleDate", "settleDays", "rentStandard","measurement", "quantity", "daysRent", "deductRent", "summary", "remark", "equipId", "recordId", "monthTag", "taxRate", 
	"preTaxAmount", "afterTaxAmount","taxes","monthTag","equipSerial","equipCategoryName","equipSpecificName","exwSerial","contractId" ];
var SettleItemBriefListViewField = [ "siBriefId", "settleId", "buildingNum", "settleItemName", "quantity", "unitprice", "measurement", "deductRent", "itemCumulate", "summary", "remark", "equipId", 
	"recordId", "taxRate", "preTaxAmount", "afterTaxAmount","taxes","equipSerial","exwSerial","equipCategoryName","equipSpecificName","contractId","equipment", "equipDiaryId" ];
//===========================================================================//
var DispatchFieldMapping = [
	{name:"dispatch.dispatchId",mapping:"dispatchId"},
	{name:"dispatch.recordId",mapping:"recordId"},
	{name:"dispatch.exwSerial",mapping:"exwSerial"},
	{name:"dispatch.autocraneDepend",mapping:"autocraneDepend"},
	{name:"dispatch.autocraneDependName",mapping:"autocraneDependName"},
	{name:"dispatch.entManager",mapping:"entManager"},
	{name:"dispatch.dispatchSerial",mapping:"dispatchSerial"},
	{name:"dispatch.dispatchTheme",mapping:"dispatchTheme"},
	{name:"dispatch.relateId",mapping:"relateId"},
	{name:"dispatch.relateSerial",mapping:"relateSerial"},
	{name:"dispatch.relateTheme",mapping:"relateTheme"},
	{name:"dispatch.relateModule",mapping:"relateModule"},
	{name:"dispatch.relateModuleName",mapping:"relateModuleName"},
	{name:"dispatch.startPlanDate",mapping:"startPlanDate"},
	{name:"dispatch.projectId",mapping:"projectId"},
	{name:"dispatch.projectSerial",mapping:"projectSerial"},
	{name:"dispatch.projectName",mapping:"projectName"},
	{name:"dispatch.address",mapping:"address"},
	{name:"dispatch.projectManager",mapping:"projectManager"},
	{name:"dispatch.deliveryEntId",mapping:"deliveryEntId"},
	{name:"dispatch.deliveryEntName",mapping:"deliveryEntName"},
	{name:"dispatch.deliveryAddress",mapping:"deliveryAddress"},
	{name:"dispatch.receiveEntId",mapping:"receiveEntId"},
	{name:"dispatch.receiveEntName",mapping:"receiveEntName"},
	{name:"dispatch.receiveAddress",mapping:"receiveAddress"},
	{name:"dispatch.teams",mapping:"teams"},
	{name:"dispatch.practiId",mapping:"practiId"},
	{name:"dispatch.practiName",mapping:"practiName"},
	{name:"dispatch.autocraneAmount",mapping:"autocraneAmount"},
	{name:"dispatch.remark",mapping:"remark"},
	{name:"dispatch.userId",mapping:"userId"},
	{name:"dispatch.userName",mapping:"userName"},
	{name:"dispatch.depId",mapping:"depId"},
	{name:"dispatch.providedDate",mapping:"providedDate"},
	{name:"dispatch.applyforState",mapping:"applyforState"},
	{name:"dispatch.applyforStateName",mapping:"applyforStateName"},
	{name:"dispatch.fundStatus",mapping:"fundStatus"},
	{name:"dispatch.fundStatusName",mapping:"fundStatusName"},
	{name:"dispatch.department.depId",mapping:"department.depId"},
	{name:"dispatch.department.depName",mapping:"department.depName"},
	{name:"dispatch.contractId",mapping:"contractId"},
	{name:"dispatch.contractSerial",mapping:"contractSerial"},
	{name:"dispatch.competentDepartment",mapping:"competentDepartment"}
];
var DispatchHiddenField = [
    {xtype:"hidden",name:"dispatch.dispatchId"},
    {xtype:"hidden",name:"dispatch.relateId"},
    {xtype:"hidden",name:"dispatch.relateModule"},
    {xtype:"hidden",name:"dispatch.projectId"},
    {xtype:"hidden",name:"dispatch.userId"},
    {xtype:"hidden",name:"dispatch.deliveryEntId"},
    {xtype:"hidden",name:"dispatch.receiveEntId"},
    {xtype:"hidden",name:"dispatch.practiId"},
    {xtype:"hidden",name:"dispatch.department.depId"},
    {xtype:"hidden",name:"dispatch.dispatchEquips"},
    {xtype:"hidden",name:"dispatch.dispatchCompons"},
    {xtype:"hidden",name:"dispatch.dispatchPractis"},
    {xtype:"hidden",name:"dispatch.dispatchAutocranes"},
    {xtype:"hidden",name:"dispatch.towerCraneDispatchAllocates"},
    {xtype:"hidden",name:"dispatch.liftDispatchAllocates"},
    {xtype:"hidden",name:"dispatch.contractId"}
];
//===========================================================================//
var DispatchAllocateInitFieldMapping = [
    {name:"dispatchallocateInit.disAllInitId",mapping:"disAllInitId"},
    {name:"dispatchallocateInit.componCateGoryName",mapping:"componCateGoryName"},
    {name:"dispatchallocateInit.equipCateGoryName",mapping:"equipCateGoryName"},
    {name:"dispatchallocateInit.equipVender",mapping:"equipVender"},
    {name:"dispatchallocateInit.equipVenderName",mapping:"equipVenderName"},
    {name:"dispatchallocateInit.componGenericName",mapping:"componGenericName"},
    {name:"dispatchallocateInit.calculate",mapping:"calculate"},
    {name:"dispatchallocateInit.quantity",mapping:"quantity"},
    {name:"dispatchallocateInit.equipSpecific",mapping:"equipSpecific"},
    {name:"dispatchallocateInit.equipSpecificName",mapping:"equipSpecificName"},
    {name:"dispatchallocateInit.dimensions",mapping:"dimensions"},
    {name:"dispatchallocateInit.initStatus",mapping:"initStatus"}
];
var DispatchAllocateInitHiddenField = [
	{xtype:"hidden",name:"dispatchallocateInit.disAllInitId"},
	{xtype:"hidden",name:"dispatchallocateInit.componSpecificName"}
];
//===========================================================================//
var DispatchListViewField = [ "dispatchId", "dispatchSerial", "dispatchTheme","dispatchThemeName", "deliveryEntId", "deliveryEntName", "deliveryAddress", "receiveEntId", "receiveEntName", "receiveAddress", 
                              "teams", "practiId", "practiName", "autocraneAmount", "relateId", "relateSerial", "relateTheme", "relateModule", "relateModuleName", "autocraneDepend", "autocraneDependName", "startPlanDate", 
                              "projectId", "projectSerial", "projectName", "address", "projectManager", "entManager", "providedDate", "applyforState", "applyforStateName", "fundStatusName", "recordId", "exwSerial","counts", 
                              "effective", "effectiveName","componCategoryName","componGenericName", "userName","relateSerial","receiveAddress","isTransport","contractSerial","competentDepartment"];
var DispatchEquipListViewField = [ "dispatchEquipId", "dispatchId", "equipId", "buildingNum", "startDate", "endDate", "installHeight", "workStatus", "equipment" ];
var DispatchPractiListViewField = [ "dispatchPractiId", "dispatchId", "practiId", "startDate", "practitioner" ];
var DispatchComponListViewField = [ "dispatchComponId", "dispatchId", "componId", "counts","iniCounts", "startDate", "workStatus", "component", "storeName", "storeCounts","component.componGenericName" ];
var DispatchAutocraneListViewField = [ "dispatchAutocraneId", "dispatchId", "specificName", "rentStandard", "quantity", "machineTeam", "summary", "accountId", "remark" ];
var DispatchAllocateListViewField = [ "dispatchAllocateId", "dispatchId", "repairId", "allocateType", "componGenericName", "calculate", "quantity", "defective", "reissue", "verify", "specification", "remark" ];
var JJComponListViewField = [ "jjComponId", "installId", "componId", "counts", "component","jjUserName","jjTime","addFestival" ];
//===========================================================================//
var PickupFieldMapping = [
	{name:"pickup.pickupId",mapping:"pickupId"},
	{name:"pickup.pickupSerial",mapping:"pickupSerial"},
	{name:"pickup.pickupTheme",mapping:"pickupTheme"},
	{name:"pickup.pickupPurpose",mapping:"pickupPurpose"},
	{name:"pickup.description",mapping:"description"},
	{name:"pickup.recipients",mapping:"recipients"},
	{name:"pickup.recipientsDepName",mapping:"recipientsDepName"},
	{name:"pickup.pickupAmount",mapping:"pickupAmount"},
	{name:"pickup.paidAmount",mapping:"paidAmount"},
	{name:"pickup.totalAmount",mapping:"totalAmount"},
	{name:"pickup.pickupDate",mapping:"pickupDate"},
	{name:"pickup.relateId",mapping:"relateId"},
	{name:"pickup.relateSerial",mapping:"relateSerial"},
	{name:"pickup.relateTheme",mapping:"relateTheme"},
	{name:"pickup.relateModule",mapping:"relateModule"},
	{name:"pickup.relateModuleName",mapping:"relateModuleName"},
	{name:"pickup.pickupStatusName",mapping:"pickupStatusName"},
	{name:"pickup.projectName",mapping:"projectName"},
	{name:"pickup.userId",mapping:"userId"},
	{name:"pickup.userName",mapping:"userName"},
	{name:"pickup.depId",mapping:"depId"},
	{name:"pickup.remark",mapping:"remark"},
	{name:"pickup.providedDate",mapping:"providedDate"},
	{name:"pickup.department.depId",mapping:"department.depId"},
	{name:"pickup.department.depName",mapping:"department.depName"}
];
var PickupHiddenField = [
	{xtype:"hidden",name:"pickup.pickupId"},
	{xtype:"hidden",name:"pickup.relateId"},
	{xtype:"hidden",name:"pickup.relateModule"},
	{xtype:"hidden",name:"pickup.userId"},
	{xtype:"hidden",name:"pickup.recipientsDepName"},
	{xtype:"hidden",name:"pickup.equipment.equipId"},
	{xtype:"hidden",name:"pickup.department.depId"},
	{xtype:"hidden",name:"pickup.pickupComponents"}
];
var PickupListViewField = [ "pickupId", "pickupSerial", "pickupTheme","pickupPurpose", "pickupPurposeName", "recipients", "pickupDate", "relateId", "relateSerial", "relateTheme", "relateModule", "relateModuleName", "pickupStatus", "pickupStatusName", "providedDate", "pickupAmount", "paidAmount", "totalAmount", "equipment", "applyforState", "applyforStateName","projectName","project" ];
var PickupComponentListViewField = [ "pickupComponId", "pickupId", "componId", "consumeCounts", "unit", "quantity", "unitPrice", "summary", "componSerial", "componCategory", "componCategoryName", "componGeneric", "componGenericName", "componSpecific", "componSpecificName", "dimensions", "presentValue", "pickupDate", "returnDate", "returnStoreId", "returnStoreName", "remark", "userId", "userName", "status", "statusName" ];
//===========================================================================//
var PurchaseFieldMapping = [
	{name:"purchase.purchaseId",mapping:"purchaseId"},
	{name:"purchase.purchaseSerial",mapping:"purchaseSerial"},
	{name:"purchase.purchaseTheme",mapping:"purchaseTheme"},
	{name:"purchase.category",mapping:"category"},
	{name:"purchase.supplierId",mapping:"supplierId"},
	{name:"purchase.supplierName",mapping:"supplierName"},
	{name:"purchase.supplierTel",mapping:"supplierTel"},
	{name:"purchase.linker",mapping:"linker"},
	{name:"purchase.linkerTel",mapping:"linkerTel"},
	{name:"purchase.purchaserId",mapping:"purchaserId"},
	{name:"purchase.purchaserName",mapping:"purchaserName"},
	{name:"purchase.purchaserMobile",mapping:"purchaserMobile"},
	{name:"purchase.purchaserDepId",mapping:"purchaserDepId"},
	{name:"purchase.purchaserDepName",mapping:"purchaserDepName"},
	{name:"purchase.purCorpId",mapping:"purCorpId"},
	{name:"purchase.purCorpName",mapping:"purCorpName"},
	{name:"purchase.purchaseDate",mapping:"purchaseDate"},
	{name:"purchase.nowDate",mapping:"nowDate"},
	{name:"purchase.arrivalDate",mapping:"arrivalDate"},
	{name:"purchase.instruction",mapping:"instruction"},
	{name:"purchase.remark",mapping:"remark"},
	{name:"purchase.relateId",mapping:"relateId"},
	{name:"purchase.relateSerial",mapping:"relateSerial"},
	{name:"purchase.relateTheme",mapping:"relateTheme"},
	{name:"purchase.relateModule",mapping:"relateModule"},
	{name:"purchase.relateModuleName",mapping:"relateModuleName"},
	{name:"purchase.equipId",mapping:"equipId"},
	{name:"purchase.recordSerial",mapping:"recordSerial"},
	{name:"purchase.equipCategory",mapping:"equipCategory"},
	{name:"purchase.equipCategoryName",mapping:"equipCategoryName"},
	{name:"purchase.equipGeneric",mapping:"equipGeneric"},
	{name:"purchase.equipGenericName",mapping:"equipGenericName"},
	{name:"purchase.purchaseAmount",mapping:"purchaseAmount"},
	{name:"purchase.squareAccDate",mapping:"squareAccDate"},
	{name:"purchase.accDate",mapping:"accDate"},
	{name:"purchase.squareUpDate",mapping:"squareUpDate"},
	{name:"purchase.userId",mapping:"userId"},
	{name:"purchase.userName",mapping:"userName"},
	{name:"purchase.applicant",mapping:"applicant"},
	{name:"purchase.providedDate",mapping:"providedDate"},
	{name:"purchase.fundStatus",mapping:"fundStatus"},
	{name:"purchase.fundStatusName",mapping:"fundStatusName"},
	{name:"purchase.applyforStateName",mapping:"applyforStateName"},
	{name:"purchase.department.depId",mapping:"department.depId"},
	{name:"purchase.department.depName",mapping:"department.depName"}
];
var PurchaseHiddenField = [
	{xtype:"hidden",name:"purchase.purchaseId"},
	{xtype:"hidden",name:"purchase.supplierId"},
	{xtype:"hidden",name:"purchase.purchaserId"},
	{xtype:"hidden",name:"purchase.purCorpId"},
	{xtype:"hidden",name:"purchase.purchaserDepId"},
	{xtype:"hidden",name:"purchase.relateId"},
	{xtype:"hidden",name:"purchase.relateModule"},
	{xtype:"hidden",name:"purchase.equipId"},
	{xtype:"hidden",name:"purchase.equipCategory"},
	{xtype:"hidden",name:"purchase.equipGeneric"},
	{xtype:"hidden",name:"purchase.userId"},
	{xtype:"hidden",name:"purchase.department.depId"},
	{xtype:"hidden",name:"purchase.purchaseBriefs"},
	{xtype:"hidden",name:"purchase.squareAccDate"},
	{xtype:"hidden",name:"purchase.instalments"}
];
var PurchaseListViewField = [ "purchaseId", "purchaseSerial", "purchaseTheme","purchaseThemeName", "category","categoryName", "supplierName", "purchaserName", "purchaseDate", "relateSerial", "relateModuleName", "recordSerial", "purchaseAmount", "paymentAmount", "accDate", "providedDate", "fundStatusName", "applyforState", "applyforStateName" ];
var PurchaseBriefListViewField = [ "purchaseBriefId", "componId", "partsCategory","purchaseId", "briefName", "brand", "specific", "dimensions", "quantity", "unit", "unitPrice", "summary", "arrivalDate", "acceptanceDate", "userId", "userName", "status", "statusName" ];
var PurchaseAcceptanceListViewField = [ "pacceptanceId", "purchaseId", "acceptanceStatus", "acceptanceStatusName", "unqualified", "handleMethod", "handleMethodName", "arrivalPlanDate", "refundPlanDate", "userId", "userName", "providedDate", "remark" ];
//===========================================================================//
var PurchasePlanFieldMapping = [
{name:"purchasePlan.personName",mapping:"personName"},
{name:"purchasePlan.fillDate",mapping:"fillDate"},
{name:"purchasePlan.applicantName",mapping:"applicantName"},
{name:"purchasePlan.applicantDept",mapping:"applicantDept"},
{name:"purchasePlan.inquiryName",mapping:"inquiryName"},
{name:"purchasePlan.inquiryDate",mapping:"inquiryDate"},
{name:"purchasePlan.totalCost",mapping:"totalCost"},
{name:"purchasePlan.fillState",mapping:"fillState"},
{name:"purchasePlan.applyforState",mapping:"applyforState"},
{name:"purchasePlan.remark",mapping:"remark"},
{name:"purchasePlan.purchasePlanInquirys",mapping:"purchasePlanInquirys"},
{name:"purchasePlan.userId",mapping:"userId"},
{name:"purchasePlan.userName",mapping:"userName"}
];
var PurchasePlanHiddenField = [
{xtype:"hidden",name:"purchasePlan.purchasePlanId"},
{xtype:"hidden",name:"purchasePlan.userId"},
{xtype:"hidden",name:"purchasePlan.purchasePlanInquirys"}
];
var PurchasePlanListViewField = ["purchasePlanId","personName","fillDate","applicantName","applicantDept","inquiryName","inquiryDate","totalCost","remark","fillState","applyforState","applyforStateName"];
var PurchasePlanInquiryListViewField = ["planId","purchasePlanId","materialName","specific","unit","quantity","approvalQuantity","purchaseDate","inquiryPrice","summary"];
//===========================================================================//
var PurchaseAcceptanceFieldMapping = [
	{name:"purchaseAcceptance.pacceptanceId",mapping:"pacceptanceId"},
	{name:"purchaseAcceptance.purchaseId",mapping:"purchaseId"},
	{name:"purchaseAcceptance.acceptanceStatus",mapping:"acceptanceStatus"},
	{name:"purchaseAcceptance.acceptanceStatusName",mapping:"acceptanceStatusName"},
	{name:"purchaseAcceptance.unqualified",mapping:"unqualified"},
	{name:"purchaseAcceptance.handleMethod",mapping:"handleMethod"},
	{name:"purchaseAcceptance.handleMethodName",mapping:"handleMethodName"},
	{name:"purchaseAcceptance.arrivalPlanDate",mapping:"arrivalPlanDate"},
	{name:"purchaseAcceptance.refundPlanDate",mapping:"refundPlanDate"},
	{name:"purchaseAcceptance.userId",mapping:"userId"},
	{name:"purchaseAcceptance.userName",mapping:"userName"},
	{name:"purchaseAcceptance.providedDate",mapping:"providedDate"},
	{name:"purchaseAcceptance.remark",mapping:"remark"},
	{name:"purchaseAcceptance.department.depId",mapping:"department.depId"}
];
var PurchaseAcceptanceHiddenField = [
	{xtype:"hidden",name:"purchaseAcceptance.pacceptanceId"},
	{xtype:"hidden",name:"purchaseAcceptance.purchaseId"},
	{xtype:"hidden",name:"purchaseAcceptance.acceptanceStatus"},
	{xtype:"hidden",name:"purchaseAcceptance.handleMethod"},
	{xtype:"hidden",name:"purchaseAcceptance.userId"},
	{xtype:"hidden",name:"purchaseAcceptance.department.depId"},
	{xtype:"hidden",name:"purchaseAcceptance.purchaseBriefIds"},
	{xtype:"hidden",name:"purchaseAcceptance.receivements"}
];
//===========================================================================//
var BorrowFieldMapping = [
	{name:"borrow.borrowId",mapping:"borrowId"},
	{name:"borrow.borrowSerial",mapping:"borrowSerial"},
	{name:"borrow.borrowTheme",mapping:"borrowTheme"},
	{name:"borrow.borrowType",mapping:"borrowType"},
	{name:"borrow.borrowTypeName",mapping:"borrowTypeName"},
	{name:"borrow.inrelateId",mapping:"inrelateId"},
	{name:"borrow.inrelateModule",mapping:"inrelateModule"},
	{name:"borrow.inrelateModuleName",mapping:"inrelateModuleName"},
	{name:"borrow.inrelateName",mapping:"inrelateName"},
	{name:"borrow.inOfficeTel",mapping:"inOfficeTel"},
	{name:"borrow.inHandler",mapping:"inHandler"},
	{name:"borrow.inPhone",mapping:"inPhone"},
	{name:"borrow.outrelateId",mapping:"outrelateId"},
	{name:"borrow.outrelateModule",mapping:"outrelateModule"},
	{name:"borrow.outrelateModuleName",mapping:"outrelateModuleName"},
	{name:"borrow.outrelateName",mapping:"outrelateName"},
	{name:"borrow.outOfficeTel",mapping:"outOfficeTel"},
	{name:"borrow.outHandler",mapping:"outHandler"},
	{name:"borrow.outPhone",mapping:"outPhone"},
	{name:"borrow.borrowDate",mapping:"borrowDate"},
	{name:"borrow.returnDate",mapping:"returnDate"},
	{name:"borrow.instruction",mapping:"instruction"},
	{name:"borrow.remark",mapping:"remark"},
	{name:"borrow.userId",mapping:"userId"},
	{name:"borrow.userName",mapping:"userName"},
	{name:"borrow.providedDate",mapping:"providedDate"},
	{name:"borrow.fundStatusName",mapping:"fundStatusName"},
	{name:"borrow.applyforStateName",mapping:"applyforStateName"},
	{name:"borrow.renewDate",mapping:"renewDate"},
	{name:"borrow.squareAccDate",mapping:"squareAccDate"},
	{name:"borrow.department.depId",mapping:"department.depId"},
	{name:"borrow.department.depName",mapping:"department.depName"},
	{name:"borrow.address",mapping:"address"}
];
var BorrowHiddenField = [
	{xtype:"hidden",name:"borrow.borrowId"},
	{xtype:"hidden",name:"borrow.borrowType"},
	{xtype:"hidden",name:"borrow.inrelateId"},
	{xtype:"hidden",name:"borrow.inrelateModule"},
	{xtype:"hidden",name:"borrow.outrelateId"},
	{xtype:"hidden",name:"borrow.outrelateModule"},
	{xtype:"hidden",name:"borrow.userId"},
	{xtype:"hidden",name:"borrow.fundStatus"},
	{xtype:"hidden",name:"borrow.squareAccDate"},
	{xtype:"hidden",name:"borrow.applyforState"},
	{xtype:"hidden",name:"borrow.department.depId"},
	{xtype:"hidden",name:"borrow.borrowComponents"},
	{xtype:"hidden",name:"borrow.borrowEquips"},
	{xtype:"hidden",name:"borrow.instalments"},
	{xtype:"hidden",name:"borrow.receivements"},
	{xtype:"hidden",name:"borrow.borrowAcceptances"}
];
var ScrapApplyFieldMapping = [
                          {name:"scrapApply.scrapId",mapping:"scrapId"},
                          {name:"scrapApply.userName",mapping:"userName"},
                          {name:"scrapApply.userId",mapping:"userId"},
                          {name:"scrapApply.storeId",mapping:"storeId"},
                          {name:"scrapApply.locationId",mapping:"locationId"},
                          {name:"scrapApply.scrapSerial",mapping:"scrapSerial"},
                          {name:"scrapApply.applyDate",mapping:"applyDate"},
                          {name:"scrapApply.storeName",mapping:"storeName"},
                          {name:"scrapApply.storageLocation",mapping:"storageLocation"},
                          {name:"scrapApply.storageLocationName",mapping:"storageLocationName"},
                          {name:"scrapApply.status",mapping:"status"},
                          {name:"scrapApply.auditorName",mapping:"auditorName"},
                          {name:"scrapApply.auditorId",mapping:"auditorId"},
                          {name:"scrapApply.auditorDate",mapping:"auditorDate"},
                          {name:"scrapApply.approvName",mapping:"approvName"},
                          {name:"scrapApply.approvId",mapping:"approvId"},
                          {name:"scrapApply.approvDate",mapping:"approvDate"},
                          {name:"scrapApply.remark",mapping:"remark"},
                          {name:"scrapApply.scrapTheme",mapping:"scrapTheme"}
                          ];
var ScrapApplyHiddenField = [
{xtype:"hidden",name:"scrapApply.scrapId"}, 
{xtype:"hidden",name:"scrapApply.storeId"}, 
{xtype:"hidden",name:"scrapApply.locationId"}, 
{xtype:"hidden",name:"scrapApply.scrapDetails"}  
                         ];
var ScrapContractFieldMapping = [
                              {name:"scrapContract.contractId",mapping:"contractId"},
                              {name:"scrapContract.userName",mapping:"userName"},
                              {name:"scrapContract.userId",mapping:"userId"},
                              {name:"scrapContract.storeId",mapping:"storeId"},
                              {name:"scrapContract.locationId",mapping:"locationId"},
                              {name:"scrapContract.contractSerial",mapping:"contractSerial"},
                              {name:"scrapContract.contractDate",mapping:"contractDate"},
                              {name:"scrapContract.storeName",mapping:"storeName"},
                              {name:"scrapContract.storageLocation",mapping:"storageLocation"},
                              {name:"scrapContract.status",mapping:"status"},
                              {name:"scrapApply.paEntName",mapping:"paEntName"},
                              {name:"scrapApply.pbEntName",mapping:"pbEntName"},
                              {name:"scrapApply.assetAttributes",mapping:"assetAttributes"},
                              {name:"scrapApply.assetsProperty",mapping:"assetsProperty"},
                              {name:"scrapApply.reviewInfo",mapping:"reviewInfo"},
                              {name:"scrapContract.approvName",mapping:"approvName"},
                              {name:"scrapContract.approvId",mapping:"approvId"},
                              {name:"scrapContract.approvDate",mapping:"approvDate"},
                              {name:"scrapContract.remark",mapping:"remark"},
                              {name:"scrapContract.paEntName",mapping:"paEntName"},
                              {name:"scrapContract.customerName",mapping:"customerName"},
                              {name:"scrapContract.assetsProperty",mapping:"assetsProperty"},
                              {name:"scrapContract.assetsPropertyName",mapping:"assetsPropertyName"},
                              {name:"scrapContract.contractTheme",mapping:"contractTheme"}
                              ];
var ScrapContractHiddenField = [
{xtype:"hidden",name:"scrapContract.contractId"}, 
{xtype:"hidden",name:"scrapContract.storeId"}, 
{xtype:"hidden",name:"scrapContract.locationId"}, 
{xtype:"hidden",name:"scrapContract.scrapDetails"},
{xtype:"hidden",name:"scrapContract.scrapDetailSet"}

                             ];
var ScrapHandleFieldMapping = [
                               	 {name:"scrapHandle.handleId",mapping:"handleId"},
                                 {name:"scrapHandle.userName",mapping:"userName"},
                                 {name:"scrapHandle.userId",mapping:"userId"},
                                 {name:"scrapHandle.storeId",mapping:"storeId"},
                                 {name:"scrapHandle.locationId",mapping:"locationId"},
                                 {name:"scrapHandle.scrapSerial",mapping:"scrapSerial"},
                                 {name:"scrapHandle.applyDate",mapping:"applyDate"},
                                 {name:"scrapHandle.storeName",mapping:"storeName"},
                                 {name:"scrapHandle.storageLocation",mapping:"storageLocation"},
                                 {name:"scrapHandle.status",mapping:"status"},
                                 {name:"scrapHandle.approvName",mapping:"approvName"},
                                 {name:"scrapHandle.approvId",mapping:"approvId"},
                                 {name:"scrapHandle.approvDate",mapping:"approvDate"},
                                 {name:"scrapHandle.remark",mapping:"remark"}
                                 ];
var ScrapHandleHiddenField = [
{xtype:"hidden",name:"scrapHandle.handleId"}, 
{xtype:"hidden",name:"scrapHandle.storeId"}, 
{xtype:"hidden",name:"scrapHandle.locationId"}, 
{xtype:"hidden",name:"scrapHandle.scrapDetails"}  
                                ];
var BorrowListViewField = [ "borrowId", "borrowSerial", "borrowTheme", "borrowType", "borrowTypeName", "inrelateName", "outrelateName", "borrowDate", "returnDate", "providedDate", "fundStatusName", "applyforState", "applyforStateName", "address" ];
var ScrapHandleListViewField = ["handleId" ,"userName", "scrapSerial", "contractDate", "storeName", "storageLocation","applyforState","status","approvName","approvDate","remark","applyforStateName","scrapDetailSet","applyDate"];
var ScrapContractListViewField = ["contractId" ,"userName", "contractSerial",  "contractDate","scrapDate", "storeName", "storageLocation","applyforState","status","paEntName","pbEntName","assetAttributes","reviewInfo","approvName","approvDate","remark","applyforStateName","isReviewed","scrapDetailSet","storeId","locationId","contractTheme"];
var ScrapApplyListViewField = ["scrapId" ,"userName", "scrapSerial", "applyDate", "storeName", "storageLocation","applyforState","applyforStateName","scrapDetailSet","storeId","locationId","scrapTheme"];
var BorrowComponentListViewField = [ "borrowComponId", "borrowId", "componId", "componSerial", "componCategory", "componCategoryName", "componGeneric", "componGenericName", "consumeCounts", "returnCounts", "borrowCounts", "borrowDate", "returnDate", "returnStoreId", "returnStoreName", "userId", "userName", "status", "statusName","dimensions","exwSerial" ];
var BorrowEquipListViewField = [ "borrowEquipId", "borrowId", "equipId", "recordSerial", "equipCategory", "equipCategoryName", "equipGeneric","equipSpecific","equipSpecificName", "equipGenericName","equipSpecific", "borrowDate", "returnDate", "returnStoreId", "returnStoreName", "userId", "userName", "status", "statusName", "recordId", "exwSerial" ];
var BorrowAcceptanceListViewField = [ "bacceptanceId", "borrowId", "acceptanceStatus", "acceptanceStatusName", "unqualified", "handleMethod", "handleMethodName", "arrivalPlanDate", "refundPlanDate", "compensateAmount", "userId", "userName", "depId", "providedDate", "remark" ];
//===========================================================================//
var BorrowAcceptanceFieldMapping = [
	{name:"borrowAcceptance.bacceptanceId",mapping:"bacceptanceId"},
	{name:"borrowAcceptance.borrowId",mapping:"borrowId"},
	{name:"borrowAcceptance.acceptanceStatus",mapping:"acceptanceStatus"},
	{name:"borrowAcceptance.acceptanceStatusName",mapping:"acceptanceStatusName"},
	{name:"borrowAcceptance.unqualified",mapping:"unqualified"},
	{name:"borrowAcceptance.handleMethod",mapping:"handleMethod"},
	{name:"borrowAcceptance.handleMethodName",mapping:"handleMethodName"},
	{name:"borrowAcceptance.arrivalPlanDate",mapping:"arrivalPlanDate"},
	{name:"borrowAcceptance.refundPlanDate",mapping:"refundPlanDate"},
	{name:"borrowAcceptance.compensateAmount",mapping:"compensateAmount"},
	{name:"borrowAcceptance.userId",mapping:"userId"},
	{name:"borrowAcceptance.userName",mapping:"userName"},
	{name:"borrowAcceptance.depId",mapping:"depId"},
	{name:"borrowAcceptance.providedDate",mapping:"providedDate"},
	{name:"borrowAcceptance.remark",mapping:"remark"},
	{name:"borrowAcceptance.department.depId",mapping:"department.depId"}
];
var BorrowAcceptanceHiddenField = [
	{xtype:"hidden",name:"borrowAcceptance.bacceptanceId"},
	{xtype:"hidden",name:"borrowAcceptance.borrowId"},
	{xtype:"hidden",name:"borrowAcceptance.acceptanceStatus"},
	{xtype:"hidden",name:"borrowAcceptance.handleMethod"},
	{xtype:"hidden",name:"borrowAcceptance.userId"},
	{xtype:"hidden",name:"borrowAcceptance.department.depId"},
	{xtype:"hidden",name:"borrowAcceptance.borrowEquips"},
	{xtype:"hidden",name:"borrowAcceptance.borrowComponents"},
	{xtype:"hidden",name:"borrowAcceptance.instalments"},
	{xtype:"hidden",name:"borrowAcceptance.receivements"}
];
//===========================================================================//
var EquipFlowListViewField = [ "flowId", "flowSerial", "equipDiaryId", "dispatchEquipId", "equipId", "contractId", "dispatchId", "installId", "activateId", "employId", "dismantleId", "employInspectSchemaId", "flowState", "flowStateName", "contractLease", "dispatch", "equipDiary", "equipInstall", "equipActivate", "equipEmploy", "equipDismantle","equipVerify","verifyId","equipment","verifyDate" ];
var ComponDiaryListViewField = [ "componDiaryId", "componId", "componSerial", "componCategory", "componCategoryName", "componGeneric", "componGenericName", "exwSerial", "componSpecific", "componSpecificName", "dimensions", "calculate", "rfidCode", "consumeFlag", "parachuteFlag", "knotFlag", "wallAttacheFlag", "knotMetric", "brachium", "storeId", "storeName", "projectId", "projectSerial", "projectName", "address", "contractId", "flowId", "recordId", "dispatchUserName", 
                                 "businessId", "businessSerial", "businessTheme", "businessModule", "businessModuleName", "businessComponId", "relateId", "relateSerial", 
                                 "relateTheme", "relateModule", "relateModuleName", "counts", "startDate", "verifyDate", "warehouseCounts", "backsportCounts", "backsportStatus", 
                                 "status", "active", "activeName", "jackingPractiId", "jackingPractiName", "jackingTeams", "jackingDate", "jackingCounts", "jackingStauts", "jackingAccountId", 
                                 "dismantlePractiId", "dismantlePractiName", "dismantleTeams", "dismantleDate", "dismantleCounts", "dismantleStauts", "dismantleAccountId","jjStauts",
                                 "jjStautsName","equipVenderName","equipVender","jjUserName"];
var ComponDiaryListViewNewField = [ "componDiaryId", "componId", "componSerial", "componCategory", "componCategoryName", "componGeneric", "componGenericName", "exwSerial", "componSpecific", "componSpecificName", "dimensions", "calculate", "rfidCode", "consumeFlag", "parachuteFlag", "knotFlag", "wallAttacheFlag", "knotMetric", "brachium", "storeId", "storeName", "projectId", "projectSerial", "projectName", "address", "contractId", "flowId", "recordId", "dispatchUserName", 
                                 "businessId", "businessSerial", "businessTheme", "businessModule", "businessModuleName", "businessComponId", "relateId", "relateSerial", 
                                 "relateTheme", "relateModule", "relateModuleName", "counts", "startDate", "endDate", "warehouseCounts", "backsportCounts", "backsportStatus", 
                                 "status", "active", "activeName", "jackingPractiId", "jackingPractiName", "jackingTeams", "jackingDate", "jackingCounts", "jackingStauts", "jackingAccountId", 
                                 "dismantlePractiId", "dismantlePractiName", "dismantleTeams", "dismantleDate", "dismantleCounts", "dismantleStauts", "dismantleAccountId","jjStauts",
                                 "jjStautsName","component","component.componSerial","component.componCategoryName","component.componGenericName","component.exwSerial","component.componSpecificName",
                                 "component.dimensions","component.calculate","component.projectComponId" ];
var EquipDiaryListViewField = [ "equipDiaryId", "equipId", "equipCategoryName", "equipGenericName", "equipSpecificName", "recordId", "rfidCode", "exwDate", "exwSerial", "equipVender", 
	"startDate", "endDate", "activateDate", "projectId", "projectSerial", "projectName", "address", "buildingNum", "paEntName", "businessSerial", "businessModuleName", "relateSerial", 
	"relateModuleName", "verifyType","equipSerial","propertyName","contractId","lastBlockupDate" ];
var PractiDiaryListViewField = [ "practiDiaryId", "practiId", "practiName", "kindWork", "kindWorkName", "mobile", "station", "corpId", "corpName", "depId", "depName", "startDate", "endDate", "projectId", "projectSerial", "projectName", "contractId", "businessId", "businessSerial", "businessTheme", "businessModule", "businessModuleName", "businessPractiId", "relateId", "relateSerial", "relateTheme", "relateModule", "relateModuleName", "active", "activeName" ];
//===========================================================================//
var EquipInstallFieldMapping = [
	{name:"equipInstall.installId",mapping:"installId"},
	{name:"equipInstall.installSerial",mapping:"installSerial"},
	{name:"equipInstall.installTheme",mapping:"installTheme"},
	{name:"equipInstall.equipFlow.dispatch.dispatchSerial",mapping:"equipFlow.dispatch.dispatchSerial"},
	{name:"equipInstall.equipFlow.dispatch.dispatchTheme",mapping:"equipFlow.dispatch.dispatchTheme"},
	{name:"equipInstall.equipFlow.dispatchEquipId",mapping:"equipFlow.dispatchEquipId"},
	{name:"equipInstall.equipFlow.equipDiary.recordSerial",mapping:"equipFlow.equipDiary.recordSerial"},
	{name:"equipInstall.equipFlow.equipDiary.equipCategoryName",mapping:"equipFlow.equipDiary.equipCategoryName"},
	{name:"equipInstall.equipFlow.equipDiary.exwSerial",mapping:"equipFlow.equipDiary.exwSerial"},
	{name:"equipInstall.equipFlow.equipDiary.equipGenericName",mapping:"equipFlow.equipDiary.equipGenericName"},
	{name:"equipInstall.equipFlow.equipDiary.equipSpecificName",mapping:"equipFlow.equipDiary.equipSpecificName"},
	{name:"equipInstall.equipFlow.equipDiary.recordId",mapping:"equipFlow.equipDiary.recordId"},
	{name:"equipInstall.equipFlow.equipDiary.projectId",mapping:"equipFlow.equipDiary.projectId"},
	{name:"equipInstall.equipFlow.equipDiary.projectSerial",mapping:"equipFlow.equipDiary.projectSerial"},
	{name:"equipInstall.equipFlow.equipDiary.projectName",mapping:"equipFlow.equipDiary.projectName"},
	{name:"equipInstall.equipFlow.equipDiary.address",mapping:"equipFlow.equipDiary.address"},
	{name:"equipInstall.equipFlow.equipDiary.buildingNum",mapping:"equipFlow.equipDiary.buildingNum"},	
	{name:"equipInstall.startinDate",mapping:"startinDate",type:"date",dateFormat:"Y-m-d H:i:s"},
	{name:"equipInstall.endinDate",mapping:"endinDate",type:"date",dateFormat:"Y-m-d H:i:s"},
	{name:"equipInstall.spendTime",mapping:"spendTime"},
	{name:"equipInstall.practiCount",mapping:"practiCount"},
	{name:"equipInstall.principalId",mapping:"principalId"},
	{name:"equipInstall.brachium",mapping:"brachium"},
	{name:"equipInstall.principal",mapping:"principal"},
	{name:"equipInstall.principalTel",mapping:"principalTel"},
	{name:"equipInstall.partake",mapping:"partake"},
	{name:"equipInstall.installHeight",mapping:"installHeight"},
	{name:"equipInstall.installHeight",mapping:"installHeight"},
	{name:"equipInstall.currentInstallHeight",mapping:"currentInstallHeight"},
	{name:"equipInstall.knotCounts",mapping:"knotCounts"},
	{name:"equipInstall.wallAttacheQty",mapping:"wallAttacheQty"},
	{name:"equipInstall.remark",mapping:"remark"},
	{name:"equipInstall.userId",mapping:"userId"},
	{name:"equipInstall.userName",mapping:"userName"},
	{name:"equipInstall.firstAttach",mapping:"firstAttach"},
	{name:"equipInstall.firstKnotCount",mapping:"firstKnotCount"},
	{name:"equipInstall.providedDate",mapping:"providedDate"},
	{name:"equipInstall.department.depId",mapping:"department.depId"},
	{name:"equipInstall.department.depName",mapping:"department.depName"},
	{name:"equipInstall.contractSerial",mapping:"contractSerial"},
	{name:"equipInstall.belongToArea",mapping:"belongToArea"},
	{name:"equipInstall.equipmentNo",mapping:"equipmentNo"},
	{name:"equipInstall.exwDate",mapping:"exwDate"},
	{name:"equipInstall.equipVender",mapping:"equipVender"},
	{name:"equipInstall.approachNumber",mapping:"approachNumber"},
	{name:"equipInstall.competentDepartment",mapping:"competentDepartment"},
	{name:"equipInstall.wallAttachePoleNum",mapping:"wallAttachePoleNum"},
	{name:"equipInstall.wallAttacheFrameNum",mapping:"wallAttacheFrameNum"},
	{name:"equipInstall.wallAttachePoleCount",mapping:"wallAttachePoleCount"},
	{name:"equipInstall.knotCount",mapping:"knotCount"},
	{name:"equipInstall.wallAttacheFrameCount",mapping:"wallAttacheFrameCount"}
];
var EquipInstallHiddenField = [
	{xtype:"hidden",name:"equipInstall.installId"},
	{xtype:"hidden",name:"equipInstall.equipFlow.dispatchEquipId"},
	{xtype:"hidden",name:"equipInstall.principalId"},
	{xtype:"hidden",name:"equipInstall.userId"},
	{xtype:"hidden",name:"equipInstall.department.depId"},
	{xtype:"hidden",name:"equipInstall.componDiarys"},
	{xtype:"hidden",name:"equipInstall.practiDiarys"},
	{xtype:"hidden",name:"equipInstall.jjCompons"},
	{xtype:"hidden",name:"equipInstall.installFees"},
	{xtype:"hidden",name:"equipInstall.autocraneFees"},
	{xtype:"hidden",name:"equipInstall.installDismantelTeams"},
	{xtype:"hidden",name:"equipInstall.autocraneUnits"},
	{xtype:"hidden",name:"equipInstall.belongToArea"}
];
var ProductPlanListViewField = [ "productPlanId", "startDate", "endDate", "userId", "userName"];

var ProductPlanFieldMapping = [
                             	{name:"productPlan.productPlanId",mapping:"productPlanId"},
                             	{name:"productPlan.startDate",mapping:"startDate"},
                             	{name:"productPlan.endDate",mapping:"endDate"},
                             	{name:"productPlan.userId",mapping:"userId"},
                             	{name:"productPlan.userName",mapping:"userName"}
                             ];
var ProductPlanHiddenField = [
                            	{xtype:"hidden",name:"productPlan.productPlanId"},
                            	{xtype:"hidden",name:"productPlan.userId"}

                            ];
var EquipInstallListViewField = [ "installId", "installSerial", "installTheme", "partake","startinDate", "endinDate", "principal", "installHeight", "knotCounts", "wallAttacheQty", "providedDate", "longitude", "latitude", "address", "applyforState", "applyforStateName", "fileAttaches", "equipFlow","belongToArea","contractSerial",
	"equipVender","competentDepartment","approachNumber","wallAttachePoleNum","wallAttacheFrameNum","wallAttachePoleCount","wallAttacheFrameCount","currentInstallHeight","brachium"];
//===========================================================================//
var EquipActivateFieldMapping = [
	{name:"equipActivate.activateId",mapping:"activateId"},
	{name:"equipActivate.activateSerial",mapping:"activateSerial"},
	{name:"equipActivate.activateDate",mapping:"activateDate"},
	{name:"equipActivate.contractNo",mapping:"contractNo"},
	{name:"equipActivate.equipFlow.equipInstall.installSerial",mapping:"equipFlow.equipInstall.installSerial"},
	{name:"equipActivate.equipFlow.equipInstall.installTheme",mapping:"equipFlow.equipInstall.installTheme"},
	{name:"equipActivate.equipFlow.equipInstall.startinDate",mapping:"equipFlow.equipInstall.startinDate"},
	{name:"equipActivate.equipFlow.equipInstall.installHeight",mapping:"equipFlow.equipInstall.installHeight"},
	{name:"equipActivate.equipFlow.equipDiary.recordSerial",mapping:"equipFlow.equipDiary.recordSerial"},
	{name:"equipActivate.equipFlow.equipDiary.equipCategoryName",mapping:"equipFlow.equipDiary.equipCategoryName"},
	{name:"equipActivate.equipFlow.equipDiary.equipGenericName",mapping:"equipFlow.equipDiary.equipGenericName"},
	{name:"equipActivate.equipFlow.equipDiary.equipSpecificName",mapping:"equipFlow.equipDiary.equipSpecificName"},
	{name:"equipActivate.equipFlow.equipDiary.recordId",mapping:"equipFlow.equipDiary.recordId"},
	{name:"equipActivate.equipFlow.equipDiary.exwSerial",mapping:"equipFlow.equipDiary.exwSerial"},
	{name:"equipActivate.equipFlow.equipDiary.propertyName",mapping:"equipFlow.equipDiary.propertyName"},
	{name:"equipActivate.equipFlow.equipDiary.projectSerial",mapping:"equipFlow.equipDiary.projectSerial"},
	{name:"equipActivate.equipFlow.equipDiary.projectName",mapping:"equipFlow.equipDiary.projectName"},
	{name:"equipActivate.equipFlow.equipDiary.address",mapping:"equipFlow.equipDiary.address"},
	{name:"equipActivate.equipFlow.equipDiary.equipSerial",mapping:"equipFlow.equipDiary.equipSerial"},
	{name:"equipActivate.equipFlow.equipDiary.equipVender",mapping:"equipFlow.equipDiary.equipVender"},
	{name:"equipActivate.equipFlow.contractLease.paEntName",mapping:"equipFlow.contractLease.paEntName"},
	{name:"equipActivate.equipFlow",mapping:"equipFlow"},
	{name:"equipActivate.deliveryEntName",mapping:"deliveryEntName"},
	{name:"equipActivate.verifyDate",mapping:"verifyDate"},
	{name:"equipActivate.measurement",mapping:"measurement"},
	{name:"equipActivate.rentStandard",mapping:"rentStandard"},
	{name:"equipActivate.emEnt",mapping:"emEnt"},
	{name:"equipActivate.emEntName",mapping:"emEntName"},
	{name:"equipActivate.remark",mapping:"remark"},
	{name:"equipActivate.userId",mapping:"userId"},
	{name:"equipActivate.userName",mapping:"userName"},
	{name:"equipActivate.providedDate",mapping:"providedDate"},
	{name:"equipActivate.appointmentDate",mapping:"appointmentDate"},
	{name:"equipActivate.department.depId",mapping:"department.depId"},
	{name:"equipActivate.department.depName",mapping:"department.depName"},
	{name:"equipActivate.equipFlow.equipDiary.buildingNum",mapping:"equipFlow.equipDiary.buildingNum"},
	{name:"equipActivate.equipFlow.equipInstall.approachNumber",mapping:"equipFlow.equipInstall.approachNumber"}
];
var EquipActivateHiddenField = [
	{xtype:"hidden",name:"equipActivate.activateId"},
	{xtype:"hidden",name:"equipActivate.contractId"},
	{xtype:"hidden",name:"equipActivate.equipFlow.flowId"},
	{xtype:"hidden",name:"equipActivate.equipment.equipId"},
	{xtype:"hidden",name:"equipActivate.emEnt"},
	{xtype:"hidden",name:"equipActivate.userId"},
	{xtype:"hidden",name:"equipActivate.department.depId"}
];
var EquipActivateListViewField = [ "activateId", "activateSerial", "activateDate", "emEntName", "effective", "effectiveName", "acceptanceDate", "appointmentDate",
                                   "effectiveDate","contractSerial","equipFlow"];
//===========================================================================//
var EquipContractLeaseFieldMapping = [
{name:"equipContractLease.activateId",mapping:"activateId"},
{name:"equipContractLease.activateSerial",mapping:"activateSerial"},
{name:"equipContractLease.activateDate",mapping:"activateDate"},
{name:"equipContractLease.acceptanceDate",mapping:"acceptanceDate"},
{name:"equipContractLease.contractSerial",mapping:"contractSerial"},
{name:"equipContractLease.installSerial",mapping:"installSerial"},
{name:"equipContractLease.installTheme",mapping:"installTheme"},
{name:"equipContractLease.startinDate",mapping:"startinDate"},
{name:"equipContractLease.installHeight",mapping:"installHeight"},
{name:"equipContractLease.recordSerial",mapping:"recordSerial"},
{name:"equipContractLease.equipCategoryName",mapping:"equipCategoryName"},
{name:"equipContractLease.equipGenericName",mapping:"equipGenericName"},
{name:"equipContractLease.equipSpecificName",mapping:"equipSpecificName"},
{name:"equipContractLease.recordId",mapping:"recordId"},
{name:"equipContractLease.exwSerial",mapping:"exwSerial"},
{name:"equipContractLease.propertyName",mapping:"propertyName"},
{name:"equipContractLease.projectSerial",mapping:"projectSerial"},
{name:"equipContractLease.projectName",mapping:"projectName"},
{name:"equipContractLease.address",mapping:"address"},
{name:"equipContractLease.emEnt",mapping:"emEnt"},
{name:"equipContractLease.emEntName",mapping:"emEntName"},
{name:"equipContractLease.remark",mapping:"remark"},
{name:"equipContractLease.userId",mapping:"userId"},
{name:"equipContractLease.userName",mapping:"userName"},
{name:"equipContractLease.providedDate",mapping:"providedDate"},
{name:"equipContractLease.appointmentDate",mapping:"appointmentDate"},
{name:"equipContractLease.department.depId",mapping:"department.depId"},
{name:"equipContractLease.department.depName",mapping:"department.depName"}
];
var EquipContractLeaseHiddenField = [
{xtype:"hidden",name:"equipContractLease.activateId"},
{xtype:"hidden",name:"equipContractLease.emEnt"},
{xtype:"hidden",name:"equipContractLease.userId"},
{xtype:"hidden",name:"equipContractLease.department.depId"}
];              

var EquipContractLeaseListViewField = [ "activateId", "activateSerial", "activateDate", "emEntName", "effective", "effectiveName", "acceptanceDate", "appointmentDate", "contractSerial", "buildingNum","recordId","exwSerial","equipGenericName","projectName","address" ];

 //===========================================================================//
var EquipBlockupFieldMapping = [
	{name:"equipBlockup.blockupType",mapping:"blockupType"},
	{name:"equipBlockup.blockupId",mapping:"blockupId"},
	{name:"equipBlockup.blockupSerial",mapping:"blockupSerial"},
	{name:"equipBlockup.blockupDate",mapping:"blockupDate"},
	{name:"equipBlockup.reActivateDate",mapping:"reActivateDate"},
	{name:"equipBlockup.remark",mapping:"remark"},
	{name:"equipBlockup.userId",mapping:"userId"},
	{name:"equipBlockup.corpId",mapping:"corpId"},
	{name:"equipBlockup.userName",mapping:"userName"},
	{name:"equipBlockup.providedDate",mapping:"providedDate"},
	{name:"equipBlockup.equipFlow",mapping:"equipFlow"},
	{name:"equipBlockup.relateIds",mapping:"relateIds"},
	{name:"equipBlockup.equipFlow.equipActivate.activateSerial",mapping:"equipFlow.equipActivate.activateSerial"},
	{name:"equipBlockup.equipFlow.equipDiary.equipGenericName",mapping:"equipFlow.equipDiary.equipGenericName"},
	{name:"equipBlockup.equipFlow.equipDiary.equipSpecificName",mapping:"equipFlow.equipDiary.equipSpecificName"},
	{name:"equipBlockup.equipFlow.equipActivate.activateDate",mapping:"equipFlow.equipActivate.activateDate"},
	{name:"equipBlockup.equipFlow.equipDiary.recordId",mapping:"equipFlow.equipDiary.recordId"},
	{name:"equipBlockup.equipFlow.equipActivate.activateDate",mapping:"equipFlow.equipActivate.activateDate"},
	{name:"equipBlockup.equipFlow.equipDiary.exwSerial",mapping:"equipFlow.equipDiary.exwSerial"},
	{name:"equipBlockup.equipFlow.equipDiary.projectName",mapping:"equipFlow.equipDiary.projectName"},
	{name:"equipBlockup.equipFlow.equipDiary.address",mapping:"equipFlow.equipDiary.address"},
	{name:"equipBlockup.equipFlow.equipDiary.equipSerial",mapping:"equipFlow.equipDiary.equipSerial"},
	{name:"equipBlockup.equipFlow.equipDiary.recordSerial",mapping:"equipFlow.equipDiary.recordSerial"},
	{name:"equipBlockup.equipFlow.contractLease.paEntName",mapping:"equipFlow.contractLease.paEntName"},
	{name:"equipBlockup.equipFlow.contractLease.contractNo",mapping:"equipFlow.contractLease.contractNo"},
	{name:"equipBlockup.department.depId",mapping:"department.depId"},
	{name:"equipBlockup.department.depName",mapping:"department.depName"}
//	{name:"equipBlockup.blockupType",mapping:"equipBlockup.blockupType"},
//	{name:"equipBlockup.blockupTypeName",mapping:"equipBlockup.blockupTypeName"}
];
var EquipBlockupHiddenField = [
	{xtype:"hidden",name:"equipBlockup.blockupId"},
	{xtype:"hidden",name:"equipBlockup.userId"},
	{xtype:"hidden",name:"equipBlockup.userName"},
	{xtype:"hidden",name:"equipBlockup.corpId"},
	{xtype:"hidden",name:"equipBlockup.equipFlow.equipId"},
	{xtype:"hidden",name:"equipBlockup.equipFlow.flowId"},
	{xtype:"hidden",name:"equipBlockup.department.depId"}, 
	{xtype:"hidden",name:"equipBlockup.equipFlowEmploySerials"},
	{xtype:"hidden",name:"equipBlockup.relateIds"},
	{xtype:"hidden",name:"equipBlockup.isScraped"},
	{xtype:"hidden",name:"equipBlockup.warehouseId"},
//	{xtype:"hidden",name:"equipBlockup.blockupType"}
];
var EquipBlockupListViewField = [ "blockupId", "blockupSerial", "blockupDate", "reactivateDate", "effective", "effectiveName", "equipFlow","blockupType","blockupTypeName","corpId","remark"];
//===========================================================================//
var EquipEmployFieldMapping = [
	{name:"equipEmploy.employId",mapping:"employId"},
	{name:"equipEmploy.employSerial",mapping:"employSerial"},
	{name:"equipEmploy.employTheme",mapping:"employTheme"},
	{name:"equipEmploy.equipFlow.contractLease.paEntName",mapping:"equipFlow.contractLease.paEntName"},
	{name:"equipEmploy.equipFlow.equipInstall.installSerial",mapping:"equipFlow.equipInstall.installSerial"},
	{name:"equipEmploy.equipFlow.equipInstall.installHeight",mapping:"equipFlow.equipInstall.installHeight"},
	{name:"equipEmploy.equipFlow.equipInstall.knotCounts",mapping:"equipFlow.equipInstall.knotCounts"},
	{name:"equipEmploy.equipFlow.equipInstall.wallAttacheQty",mapping:"equipFlow.equipInstall.wallAttacheQty"},
	{name:"equipEmploy.equipFlow.equipDiary.exwSerial",mapping:"equipFlow.equipDiary.exwSerial"},
	{name:"equipEmploy.equipFlow.equipDiary.recordSerial",mapping:"equipFlow.equipDiary.recordSerial"},
	{name:"equipEmploy.equipFlow.equipDiary.equipCategoryName",mapping:"equipFlow.equipDiary.equipCategoryName"},
	{name:"equipEmploy.equipFlow.equipDiary.equipGenericName",mapping:"equipFlow.equipDiary.equipGenericName"},
	{name:"equipEmploy.equipFlow.equipDiary.equipSpecificName",mapping:"equipFlow.equipDiary.equipSpecificName"},
	{name:"equipEmploy.equipFlow.equipDiary.recordId",mapping:"equipFlow.equipDiary.recordId"},
	{name:"equipEmploy.equipFlow.equipDiary.projectSerial",mapping:"equipFlow.equipDiary.projectSerial"},
	{name:"equipEmploy.equipFlow.equipDiary.projectName",mapping:"equipFlow.equipDiary.projectName"},
	{name:"equipEmploy.equipFlow.equipDiary.address",mapping:"equipFlow.equipDiary.address"},
	{name:"equipEmploy.employDate",mapping:"employDate",type:"date",dateFormat:"Y-m-d H:i:s"},
	{name:"equipEmploy.approachDate",mapping:"approachDate",type:"date",dateFormat:"Y-m-d H:i:s"},
	{name:"equipEmploy.principalId",mapping:"principalId"},
	{name:"equipEmploy.principal",mapping:"principal"},
	{name:"equipEmploy.principalTel",mapping:"principalTel"},
	{name:"equipEmploy.captainId",mapping:"captainId"},
	{name:"equipEmploy.captain",mapping:"captain"},
	{name:"equipEmploy.captainTel",mapping:"captainTel"},
	{name:"equipEmploy.partake",mapping:"partake"},
	{name:"equipEmploy.installHeight",mapping:"installHeight"},
	{name:"equipEmploy.knotCounts",mapping:"knotCounts"},
	{name:"equipEmploy.wallAttacheQty",mapping:"wallAttacheQty"},
	{name:"equipEmploy.endPlanDate",mapping:"endPlanDate",type:"date",dateFormat:"Y-m-d H:i:s"},
	{name:"equipEmploy.remark",mapping:"remark"},
	{name:"equipEmploy.userId",mapping:"userId"},
	{name:"equipEmploy.corpId",mapping:"corpId"},
	{name:"equipEmploy.userName",mapping:"userName"},
	{name:"equipEmploy.providedDate",mapping:"providedDate"},
	{name:"equipEmploy.equipFlow.flowId",mapping:"equipFlow.flowId"},
	{name:"equipEmploy.department.depId",mapping:"department.depId"},
	{name:"equipEmploy.department.depName",mapping:"department.depName"}
];
var EquipEmployHiddenField = [
	{xtype:"hidden",name:"equipEmploy.employId"},
	{xtype:"hidden",name:"equipEmploy.principalId"},
	{xtype:"hidden",name:"equipEmploy.captainId"},
	{xtype:"hidden",name:"equipEmploy.userId"},
	{xtype:"hidden",name:"equipEmploy.equipFlow.flowId"},
	{xtype:"hidden",name:"equipEmploy.department.depId"},
	{xtype:"hidden",name:"equipEmploy.componDiarys"},
	{xtype:"hidden",name:"equipEmploy.practiDiarys"}
];
var EquipEmployListViewField = [ "employId", "employSerial", "employTheme", "employDate", "principal", "endPlanDate", "providedDate", "applyforState", "applyforStateName", "equipFlow" ];
//===========================================================================//
var EquipDismantleFieldMapping = [
	{name:"equipDismantle.dismantleId",mapping:"dismantleId"},
	{name:"equipDismantle.dismantleSerial",mapping:"dismantleSerial"},
	{name:"equipDismantle.dismantleTheme",mapping:"dismantleTheme"},
	{name:"equipDismantle.equipFlow.equipDiary.recordSerial",mapping:"equipFlow.equipDiary.recordSerial"},
	{name:"equipDismantle.equipFlow.equipDiary.equipCategoryName",mapping:"equipFlow.equipDiary.equipCategoryName"},
	{name:"equipDismantle.equipFlow.equipDiary.equipGenericName",mapping:"equipFlow.equipDiary.equipGenericName"},
	{name:"equipDismantle.equipFlow.equipDiary.equipSpecificName",mapping:"equipFlow.equipDiary.equipSpecificName"},
	{name:"equipDismantle.equipFlow.equipDiary.recordId",mapping:"equipFlow.equipDiary.recordId"},
	{name:"equipDismantle.equipFlow.equipDiary.exwSerial",mapping:"equipFlow.equipDiary.exwSerial"},
	{name:"equipDismantle.equipFlow.equipDiary.exwDate",mapping:"equipFlow.equipDiary.exwDate"},
	{name:"equipDismantle.equipFlow.equipDiary.projectSerial",mapping:"equipFlow.equipDiary.projectSerial"},
	{name:"equipDismantle.equipFlow.equipDiary.projectName",mapping:"equipFlow.equipDiary.projectName"},
	{name:"equipDismantle.equipFlow.equipDiary.address",mapping:"equipFlow.equipDiary.address"},
	{name:"equipDismantle.equipFlow.equipDiary.activateDate",mapping:"equipFlow.equipDiary.activateDate"},
	{name:"equipDismantle.equipFlow.equipDiary.equipSerial",mapping:"equipFlow.equipDiary.equipSerial"},
	{name:"equipDismantle.equipFlow.equipDiary.buildingNum",mapping:"equipFlow.equipDiary.buildingNum"},
	{name:"equipDismantle.equipFlow.equipDiary.equipVender",mapping:"equipFlow.equipDiary.equipVender"},
	{name:"equipDismantle.equipFlow.equipDiary.address",mapping:"equipFlow.equipDiary.address"},
	{name:"equipDismantle.startdisDate",mapping:"startdisDate",type:"date",dateFormat:"Y-m-d H:i:s"},
	{name:"equipDismantle.enddisDate",mapping:"enddisDate",type:"date",dateFormat:"Y-m-d H:i:s"},
	{name:"equipDismantle.spendTime",mapping:"spendTime"},
	{name:"equipDismantle.principalId",mapping:"principalId"},
	{name:"equipDismantle.principal",mapping:"principal"},
	{name:"equipDismantle.partake",mapping:"partake"},
	{name:"equipDismantle.dismantleHeight",mapping:"dismantleHeight"},
	{name:"equipDismantle.userId",mapping:"userId"},
	{name:"equipDismantle.userName",mapping:"userName"},
	{name:"equipDismantle.providedDate",mapping:"providedDate"},
	{name:"equipDismantle.remark",mapping:"remark"},
	{name:"equipDismantle.personNum",mapping:"personNum"},
	{name:"equipDismantle.equipFlow.flowId",mapping:"equipFlow.flowId"},
	{name:"equipDismantle.department.depId",mapping:"department.depId"},
	{name:"equipDismantle.department.depName",mapping:"department.depName"},
	{name:"equipDismantle.installId",mapping:"installId"},
	{name:"equipDismantle.knotDisQty",mapping:"knotDisQty"},
	{name:"equipDismantle.wallAttacheDisQty",mapping:"wallAttacheDisQty"},
	{name:"equipDismantle.wallAttachePoleQty",mapping:"wallAttachePoleQty"},
	{name:"equipDismantle.wallAttacheFrameQty",mapping:"wallAttacheFrameQty"}
];
var EquipDismantleHiddenField = [
	{xtype:"hidden",name:"equipDismantle.dismantleId"},
	{xtype:"hidden",name:"equipDismantle.installId"},
	{xtype:"hidden",name:"equipDismantle.managerId"},
	{xtype:"hidden",name:"equipDismantle.userId"},
	{xtype:"hidden",name:"equipDismantle.department.depId"},
	{xtype:"hidden",name:"equipDismantle.equipFlow.flowId"},
	{xtype:"hidden",name:"equipDismantle.componDiarys"},
	{xtype:"hidden",name:"equipDismantle.practiDiarys"},
	{xtype:"hidden",name:"equipDismantle.installFees"},
	{xtype:"hidden",name:"equipDismantle.autocraneFees"},
	{xtype:"hidden",name:"equipDismantle.installDismantelTeams"},
	{xtype:"hidden",name:"equipDismantle.autocraneUnits"}
];
var EquipDismantleListViewField = [ "dismantleId", "dismantleSerial", "dismantleTheme", "startdisDate", "enddisDate", "principal", "providedDate", "longitude", "latitude", "address", "applyforState", "applyforStateName", "fileAttaches", "equipFlow","knotCounts","wallAttacheQty" ];
//===========================================================================//
var EquipWarehouseFieldMapping = [
	{name:"equipWarehouse.warehouseId",mapping:"warehouseId"},
	{name:"equipWarehouse.warehouseSerial",mapping:"warehouseSerial"},
	{name:"equipWarehouse.warehouseDate",mapping:"warehouseDate"},
	{name:"equipWarehouse.principal",mapping:"principal"},
	{name:"equipWarehouse.principalTel",mapping:"principalTel"},
	{name:"equipWarehouse.storeId",mapping:"storeId"},
	{name:"equipWarehouse.storeName",mapping:"storeName"},
	{name:"equipWarehouse.overallUnit",mapping:"overallUnit"},
	{name:"equipWarehouse.receiveMan",mapping:"receiveMan"},
	{name:"equipWarehouse.attachSerial",mapping:"attachSerial"},
	{name:"equipWarehouse.equipFlow.equipDiary.recordSerial",mapping:"equipFlow.equipDiary.recordSerial"},
	{name:"equipWarehouse.equipFlow.equipDiary.equipCategoryName",mapping:"equipFlow.equipDiary.equipCategoryName"},
	{name:"equipWarehouse.equipFlow.equipDiary.equipGenericName",mapping:"equipFlow.equipDiary.equipGenericName"},
	{name:"equipWarehouse.equipFlow.equipDiary.equipSpecificName",mapping:"equipFlow.equipDiary.equipSpecificName"},
	{name:"equipWarehouse.equipFlow.equipDiary.exwSerial",mapping:"equipFlow.equipDiary.exwSerial"},
	{name:"equipWarehouse.equipFlow.equipDiary.exwDate",mapping:"equipFlow.equipDiary.exwDate"},
	{name:"equipWarehouse.equipFlow.equipDiary.recordId",mapping:"equipFlow.equipDiary.recordId"},
	{name:"equipWarehouse.equipFlow.equipDiary.projectSerial",mapping:"equipFlow.equipDiary.projectSerial"},
	{name:"equipWarehouse.equipFlow.equipDiary.projectName",mapping:"equipFlow.equipDiary.projectName"},
	{name:"equipWarehouse.equipFlow.equipDiary.address",mapping:"equipFlow.equipDiary.address"},
	{name:"equipWarehouse.equipFlow.equipDiary.equipSerial",mapping:"equipFlow.equipDiary.equipSerial"},
	{name:"equipWarehouse.equipFlow.equipDiary.equipVender",mapping:"equipFlow.equipDiary.equipVender"},
	{name:"equipWarehouse.equipFlow.contractLease.contractNo",mapping:"equipFlow.contractLease.contractNo"},
	{name:"equipWarehouse.userId",mapping:"userId"},
	{name:"equipWarehouse.corpId",mapping:"corpId"},
	{name:"equipWarehouse.userName",mapping:"userName"},
	{name:"equipWarehouse.vehicleNum",mapping:"vehicleNum"},
	{name:"equipWarehouse.vehiclePerson",mapping:"vehiclePerson"},
	{name:"equipWarehouse.providedDate",mapping:"providedDate"},
	{name:"equipWarehouse.applyforState",mapping:"applyforState"},
	{name:"equipWarehouse.applyforStateName",mapping:"applyforStateName"},
	{name:"equipWarehouse.department.depId",mapping:"department.depId"},
	{name:"equipWarehouse.department.depName",mapping:"department.depName"}
];
var EquipWarehouseHiddenField = [
	{xtype:"hidden",name:"equipWarehouse.warehouseId"},
	{xtype:"hidden",name:"equipWarehouse.storeId"},
	{xtype:"hidden",name:"equipWarehouse.userId"},
	{xtype:"hidden",name:"equipWarehouse.corpId"},
	{xtype:"hidden",name:"equipWarehouse.receiveManId"},
	{xtype:"hidden",name:"equipWarehouse.department.depId"},
	{xtype:"hidden",name:"equipWarehouse.equipFlow.flowId"},
	{xtype:"hidden",name:"equipWarehouse.equipWarehouseCompons"},
    {xtype:"hidden",name:"equipWarehouse.warehouseDate"}
];
var EquipWarehouseListViewField = [ "warehouseId", "warehouseSerial", "warehouseDate", "providedDate", "applyforState", "applyforStateName", "equipFlow","corpId","storeName"];
var EquipWarehouseComponListViewField = [ "warehouseComponId", "warehouseId", "warehouseWaitCounts", "warehouseCounts", "warehouseResult", "warehouseResultName", "description", "maintContent", "remark", "status", "statusName", "componDiary","componGenericName",
                                          "componSpecificName","calculate","counts","dimensions","equipVender","equipVenderName"];
var ComponIntoStoreDetailViewField = [ "detailId", "rowId", "waitCounts", "counts", "result", "resultName", "description", "maintContent", "remark", "status", "statusName", "component" ];
var ComponIntoStoreListViewField = [ "rowId", "serial", "intoDate", "applyforState", "applyforStateName","principal","storeName","projectId","projectName","address","projectSerial","contractNo","receiveMan","remark","contractId" ];
var ComponIntoStoreFieldMapping = [
	{name:"componIntoStore.rowId",mapping:"rowId"},
	{name:"componIntoStore.receiveMan",mapping:"receiveMan"},
	{name:"componIntoStore.contractNo",mapping:"contractNo"},
	{name:"componIntoStore.serial",mapping:"serial"},
	{name:"componIntoStore.intoDate",mapping:"intoDate"},
	{name:"componIntoStore.principal",mapping:"principal"},
	{name:"componIntoStore.principalTel",mapping:"principalTel"},
	{name:"componIntoStore.storeId",mapping:"storeId"},
	{name:"componIntoStore.storeName",mapping:"storeName"},
	{name:"componIntoStore.overallUnit",mapping:"overallUnit"},
	{name:"componIntoStore.projectSerial",mapping:"projectSerial"},
	{name:"componIntoStore.projectName",mapping:"projectName"},
	{name:"componIntoStore.address",mapping:"address"},
	{name:"componIntoStore.userId",mapping:"userId"},
	{name:"componIntoStore.userName",mapping:"userName"},
	{name:"componIntoStore.providedDate",mapping:"providedDate"},
	{name:"componIntoStore.applyforState",mapping:"applyforState"},
	{name:"componIntoStore.applyforStateName",mapping:"applyforStateName"},
	{name:"componIntoStore.originalSerial",mapping:"originalSerial"},
	{name:"componIntoStore.licensePlate",mapping:"licensePlate"},
	{name:"componIntoStore.driver",mapping:"driver"},
	{name:"componIntoStore.remark",mapping:"remark"},
	{name:"componIntoStore.department.depId",mapping:"department.depId"},
	{name:"componIntoStore.department.depName",mapping:"department.depName"},
	{name:"componIntoStore.projectId",mapping:"projectId"},
	{name:"componIntoStore.contractId",mapping:"contractId"}
];
  var ComponIntoStoreHiddenField = [
  	{xtype:"hidden",name:"componIntoStore.rowId"},
  	{xtype:"hidden",name:"componIntoStore.receiveManId"},
	{xtype:"hidden",name:"componIntoStore.userId"},
	{xtype:"hidden",name:"componIntoStore.storeId"},
	{xtype:"hidden",name:"componIntoStore.department.depId"},
	{xtype:"hidden",name:"componIntoStore.equipWarehouseCompons"},
	{xtype:"hidden",name:"componIntoStore.attachmentStorages"}
];

//===========================================================================//
var EquipDetectFieldMapping = [
	{name:"equipDetect.detectId",mapping:"detectId"},
	{name:"equipDetect.detectSerial",mapping:"detectSerial"},
	{name:"equipDetect.relateId",mapping:"relateId"},
	{name:"equipDetect.relateSerial",mapping:"relateSerial"},
	{name:"equipDetect.relateModule",mapping:"relateModule"},
	{name:"equipDetect.relateModuleName",mapping:"relateModuleName"},
	{name:"equipDetect.emEntName",mapping:"emEntName"},
	{name:"equipDetect.supEntName",mapping:"supEntName"},
	{name:"equipDetect.licenseNumber",mapping:"licenseNumber"},
	{name:"equipDetect.installPrincipal",mapping:"installPrincipal"},
	{name:"equipDetect.installCertNum",mapping:"installCertNum"},
	{name:"equipDetect.projectPrincipal",mapping:"projectPrincipal"},
	{name:"equipDetect.projectCertNum",mapping:"projectCertNum"},
	{name:"equipDetect.safetyPrincipal",mapping:"safetyPrincipal"},
	{name:"equipDetect.safetyCertNum",mapping:"safetyCertNum"},
	{name:"equipDetect.detectDate",mapping:"detectDate"},
	{name:"equipDetect.redetectDate",mapping:"redetectDate"},
	{name:"equipDetect.equipFlow.equipDiary.recordSerial",mapping:"equipFlow.equipDiary.recordSerial"},
	{name:"equipDetect.equipFlow.equipDiary.equipCategoryName",mapping:"equipFlow.equipDiary.equipCategoryName"},
	{name:"equipDetect.equipFlow.equipDiary.equipGenericName",mapping:"equipFlow.equipDiary.equipGenericName"},
	{name:"equipDetect.equipFlow.equipDiary.equipSpecificName",mapping:"equipFlow.equipDiary.equipSpecificName"},
	{name:"equipDetect.equipFlow.equipDiary.recordId",mapping:"equipFlow.equipDiary.recordId"},
	{name:"equipDetect.equipFlow.equipDiary.exwSerial",mapping:"equipFlow.equipDiary.exwSerial"},
	{name:"equipDetect.equipFlow.equipDiary.projectSerial",mapping:"equipFlow.equipDiary.projectSerial"},
	{name:"equipDetect.equipFlow.equipDiary.projectName",mapping:"equipFlow.equipDiary.projectName"},
	{name:"equipDetect.equipFlow.equipDiary.address",mapping:"equipFlow.equipDiary.address"},
	{name:"equipDetect.detectEnt",mapping:"detectEnt"},
	{name:"equipDetect.detectEntName",mapping:"detectEntName"},
	{name:"equipDetect.detectAmount",mapping:"detectAmount"},
	{name:"equipDetect.reportDate",mapping:"reportDate"},
	{name:"equipDetect.remark",mapping:"remark"}
];
var EquipDetectHiddenField = [
	{xtype:"hidden",name:"equipDetect.detectId"},
	{xtype:"hidden",name:"equipDetect.relateId"},
	{xtype:"hidden",name:"equipDetect.relateModule"},
	{xtype:"hidden",name:"equipDetect.equipFlow.flowId"},
	{xtype:"hidden",name:"equipDetect.detectEnt"},
	{xtype:"hidden",name:"equipDetect.equipDetectStatements"}
];
var EquipDetectListViewField = [ "detectId", "detectSerial", "detectDate", "relateSerial", "relateModuleName", "detectAmount", "paymentAmount", "balanceAmount", "emEntName", "supEntName", "licenseNumber", "installPrincipal", "installCertNum", "projectPrincipal", "projectCertNum", "safetyPrincipal", "safetyCertNum", "detectEntName", "equipFlow" ];
var AntiFallDetectionListViewField = ["antiFallId","antiFallNum","detectNum","status","antiFallFee","startDate","endDate","userId"]; 
var AntiFallDetectionFieldMapping = [
{name:"antiFallDetection.antiFallId",mapping:"antiFallId"},
{name:"antiFallDetection.antiFallNum",mapping:"antiFallNum"},   
{name:"antiFallDetection.detectNum",mapping:"detectNum"},   
{name:"antiFallDetection.startDate",mapping:"startDate"},   
{name:"antiFallDetection.endDate",mapping:"endDate"},   
{name:"antiFallDetection.status",mapping:"status"},
{name:"antiFallDetection.projectName",mapping:"projectName"},
{name:"antiFallDetection.recordId",mapping:"recordId"},
{name:"antiFallDetection.exwSerial",mapping:"exwSerial"},
{name:"antiFallDetection.userId",mapping:"userId"},
{name:"antiFallDetection.antiFallFee",mapping:"antiFallFee"}
                                     ];
var AntiFallHiddenField = [
                   	{xtype:"hidden",name:"antiFallDetection.antiFallId"},
                	{xtype:"hidden",name:"antiFallDetection.delFlag"}
                   	];
var EquipDetectStatementListViewField = [ "detectStatementId", "detectId", "detectType", "detectResult", "detectDate", "detector", "statementAmount" ];
//===========================================================================//
var SafeCheckListViewField = ["safeCheckId","projectName","buildingNum","status","equipGenericName","equipGeneric","equipSpecificName","equipSpecific","checkStaff","checkDate","statusName"]; 
var SafeCheckFieldMapping = [
{name:"safeCheck.safeCheckId",mapping:"safeCheckId"},  
{name:"safeCheck.status",mapping:"status"},   
{name:"safeCheck.statusName",mapping:"statusName"}, 
{name:"safeCheck.projectName",mapping:"projectName"},   
{name:"safeCheck.buildingNum",mapping:"buildingNum"}, 
{name:"safeCheck.equipGeneric",mapping:"equipGeneric"},   
{name:"safeCheck.equipGenericName",mapping:"equipGenericName"},  
{name:"safeCheck.equipSpecific",mapping:"equipSpecific"},
{name:"safeCheck.equipSpecificName",mapping:"equipSpecificName"},
{name:"safeCheck.checkStaff",mapping:"checkStaff"},
{name:"safeCheck.checkDate",mapping:"checkDate"},
//{name:"safeCheck.project.projectId",mapping:"project.projectId"},
//{name:"safeCheck.component.componId",mapping:"component.componId"},
{name:"safeCheck.safeCheckContents",mapping:"safeCheckContents"}
];
var SafeCheckHiddenField = [
	{xtype:"hidden",name:"safeCheck.safeCheckId"},
	//{xtype:"hidden",name:"safeCheck.project.projectId"},
	//{xtype:"hidden",name:"safeCheck.component.componId"},
	{xtype:"hidden",name:"safeCheck.status"},
	{xtype:"hidden",name:"safeCheck.safeCheckContents"}
];
var SafeCheckGridListViewField = ["safeCheckContentId","safeCheckId","checkContent","rectificationStatus","inspectionResult","inspectionResultContent","inspectionResultSet","recordId","exwSerial","enclosuerBeforRectification","enclosuerAfterRectification","rectificationExplain"];
//===========================================================================//
var EquipVerifyFieldMapping = [
	{name:"equipVerify.verifyId",mapping:"verifyId"},
	{name:"equipVerify.verifySerial",mapping:"verifySerial"},
	{name:"equipVerify.relateId",mapping:"relateId"},
	{name:"equipVerify.relateSerial",mapping:"relateSerial"},
	{name:"equipVerify.relateModule",mapping:"relateModule"},
	{name:"equipVerify.relateModuleName",mapping:"relateModuleName"},
	{name:"equipVerify.equipFlow.equipDiary.recordSerial",mapping:"equipFlow.equipDiary.recordSerial"},
	{name:"equipVerify.equipFlow.equipDiary.equipCategoryName",mapping:"equipFlow.equipDiary.equipCategoryName"},
	{name:"equipVerify.equipFlow.equipDiary.equipGenericName",mapping:"equipFlow.equipDiary.equipGenericName"},
	{name:"equipVerify.equipFlow.equipDiary.equipSpecificName",mapping:"equipFlow.equipDiary.equipSpecificName"},
	{name:"equipVerify.equipFlow.equipDiary.recordId",mapping:"equipFlow.equipDiary.recordId"},
	{name:"equipVerify.equipFlow.equipDiary.equipSpecific",mapping:"equipFlow.equipDiary.equipSpecific"},
	{name:"equipVerify.equipFlow.equipDiary.projectSerial",mapping:"equipFlow.equipDiary.projectSerial"},
	{name:"equipVerify.equipFlow.equipDiary.projectName",mapping:"equipFlow.equipDiary.projectName"},
	{name:"equipVerify.equipFlow.equipDiary.equipSerial",mapping:"equipFlow.equipDiary.equipSerial"},
	{name:"equipVerify.equipFlow.equipDiary.address",mapping:"equipFlow.equipDiary.address"},
	{name:"equipVerify.equipFlow.contractLease.pbEntName",mapping:"equipFlow.contractLease.pbEntName"},
	{name:"equipVerify.inEnt",mapping:"inEnt"},
	{name:"equipVerify.inEntName",mapping:"inEntName"},
	{name:"equipVerify.emEnt",mapping:"emEnt"},
	{name:"equipVerify.emEntName",mapping:"emEntName"},
	{name:"equipVerify.supEnt",mapping:"supEnt"},
	{name:"equipVerify.supEntName",mapping:"supEntName"},
	{name:"equipVerify.leaseEnt",mapping:"leaseEnt"},
//	{name:"equipVerify.leaseEntName",mapping:"leaseEntName"},
	{name:"equipVerify.verifyDate",mapping:"verifyDate"},
	{name:"equipVerify.verifyResult",mapping:"verifyResult"},
	{name:"equipVerify.suggest",mapping:"suggest"},
	{name:"equipVerify.remark",mapping:"remark"},
	{name:"equipVerify.practiName",mapping:"practiName"}
];
var EquipVerifyHiddenField = [
	{xtype:"hidden",name:"equipVerify.verifyId"},
	{xtype:"hidden",name:"equipVerify.relateId"},
	{xtype:"hidden",name:"equipVerify.relateModule"},
	{xtype:"hidden",name:"equipVerify.equipFlow.equipId"},
	{xtype:"hidden",name:"equipVerify.equipFlow.flowId"},
	{xtype:"hidden",name:"equipVerify.inEnt"},
	{xtype:"hidden",name:"equipVerify.emEnt"},
	{xtype:"hidden",name:"equipVerify.supEnt"},
	{xtype:"hidden",name:"equipVerify.leaseEnt"},
	{xtype:"hidden",name:"equipVerify.verifyStandards"}
];
var EquipVerifyListViewField = [ "verifyId", "verifySerial", "relateSerial", "relateModuleName", "verifyDate", "verifyResult", "equipFlow","equipCategoryNumber","effective","effectiveName","address","exwSerial","projectName","equipSerial","recordId"];
//===========================================================================//
var EquipInspectFieldMapping = [
	{name:"equipInspect.inspectId",mapping:"inspectId"},
	{name:"equipInspect.licensePlate",mapping:"licensePlate"},
	{name:"equipInspect.inspectSerial",mapping:"inspectSerial"},
	{name:"equipInspect.cycleTimes",mapping:"cycleTimes"},
	{name:"equipInspect.thisEndCycleDate",mapping:"thisEndCycleDate"},
	{name:"equipInspect.inspectDate",mapping:"inspectDate",type:"date",dateFormat:"Y-m-d H:i:s"},
	{name:"equipInspect.inspectPepoles",mapping:"inspectPepoles"},
	{name:"equipInspect.inspectResult",mapping:"inspectResult"},
	{name:"equipInspect.inspectResultName",mapping:"inspectResultName"},
	{name:"equipInspect.status",mapping:"status"},
	{name:"equipInspect.statusName",mapping:"statusName"},
	{name:"equipInspect.licensePlate",mapping:"licensePlate"},
	{name:"equipInspect.equipInspectSchema.belongToAreaName",mapping:"equipInspectSchema.belongToAreaName"},
	{name:"equipInspect.equipInspectSchema.equipDiary.projectName",mapping:"equipInspectSchema.equipDiary.projectName"},
	{name:"equipInspect.equipInspectSchema.equipDiary.exwSerial",mapping:"equipInspectSchema.equipDiary.exwSerial"},
	{name:"equipInspect.equipInspectSchema.equipDiary.equipSerial",mapping:"equipInspectSchema.equipDiary.equipSerial"},
	{name:"equipInspect.equipInspectSchema.equipDiary.equipGenericName",mapping:"equipInspectSchema.equipDiary.equipGenericName"},
	{name:"equipInspect.equipInspectSchema.equipDiary.equipSpecificName",mapping:"equipInspectSchema.equipDiary.equipSpecificName"},
	{name:"equipInspect.equipInspectSchema.equipDiary.verifyType",mapping:"equipInspectSchema.equipDiary.verifyType"},
	{name:"equipInspect.rectifyResultName",mapping:"rectifyResultName"},
	{name:"equipInspect.rectifyDate",mapping:"rectifyDate"},
	{name:"equipInspect.rectifyUsername",mapping:"rectifyUsername"},
	{name:"equipInspect.rectifyIntroduce",mapping:"rectifyIntroduce"},
	{name:"equipInspect.inspectRectify",mapping:"inspectRectify"}
];
var EquipInspectHiddenField = [
	{xtype:"hidden",name:"equipInspect.inspectId"},
	{xtype:"hidden",name:"equipInspect.equipInspectDetails"},
	{xtype:"hidden",name:"equipInspect.costInspects"},
	{xtype:"hidden",name:"equipInspect,inspectRectifyId"},
	{xtype:"hidden",name:"equipInspect.equipInspectSchema.equipDiary.verifyType"}
];
var EquipInspectListViewField = [ "inspectId", "inspectSerial", "cycleTimes", "thisEndCycleDate", "inspectDate", "inspectResult", "inspectResultName", "status", "statusName", "remark", "longitude", 
	"latitude", "address", "licensePlate", "fileAttaches", "repairStatus", "equipInspectSchema", "paEntName","inspectPepoles","equipSourceName","rectifyResultName","rectifyDate","rectifyUsername",
	"rectifyIntroduce" ,"rectificationName","depName", "sealStatus","sealStatusName","materialPractiName"];
//===========================================================================//
var EquipMaintFieldMapping = [
	{name:"equipMaint.maintId",mapping:"maintId"},
	{name:"equipMaint.corpId",mapping:"corpId"},
	{name:"equipMaint.maintSerial",mapping:"maintSerial"},
	{name:"equipMaint.cycleTimes",mapping:"cycleTimes"},
	{name:"equipMaint.thisEndCycleDate",mapping:"thisEndCycleDate"},
	{name:"equipMaint.maintDate",mapping:"maintDate",type:"date",dateFormat:"Y-m-d H:i:s"},
	{name:"equipMaint.lastMaintDate",mapping:"lastMaintDate",type:"date",dateFormat:"Y-m-d H:i:s"},
	{name:"equipMaint.maintPepoles",mapping:"maintPepoles"},
	{name:"equipMaint.maintResult",mapping:"maintResult"},
	{name:"equipMaint.maintResultName",mapping:"maintResultName"},
	{name:"equipMaint.status",mapping:"status"},
	{name:"equipMaint.statusName",mapping:"statusName"},
	{name:"equipMaint.practiName",mapping:"practiName"},
	
	{name:"equipMaint.basics",mapping:"basics"},
	{name:"equipMaint.amplitude",mapping:"amplitude"},
	{name:"equipMaint.rotation",mapping:"rotation"},
	{name:"equipMaint.lift",mapping:"lift"},
	{name:"equipMaint.electric",mapping:"electric"},
	{name:"equipMaint.safe",mapping:"safe"},
	{name:"equipMaint.wire",mapping:"wire"},
	{name:"equipMaint.hook",mapping:"hook"},
	{name:"equipMaint.drum",mapping:"drum"},
	{name:"equipMaint.counterweight",mapping:"counterweight"},
	{name:"equipMaint.cab",mapping:"cab"},
	{name:"equipMaint.complete",mapping:"complete"},
	{name:"equipMaint.brake",mapping:"brake"},
	{name:"equipMaint.licensePlate",mapping:"licensePlate"},
	{name:"equipMaint.summary",mapping:"summary"},
	
	{name:"equipMaint.equipMaintSchema.maintTypeName",mapping:"equipMaintSchema.maintTypeName"},
	{name:"equipMaint.equipMaintSchema.equipment.projectName",mapping:"equipMaintSchema.equipment.projectName"},
	{name:"equipMaint.equipMaintSchema.equipment.exwSerial",mapping:"equipMaintSchema.equipment.exwSerial"},
	{name:"equipMaint.equipMaintSchema.equipment.recordId",mapping:"equipMaintSchema.equipment.recordId"},
	{name:"equipMaint.equipMaintSchema.equipment.equipVender",mapping:"equipMaintSchema.equipment.equipVender"},
	{name:"equipMaint.equipMaintSchema.equipment.equipSpecificName",mapping:"equipMaintSchema.equipment.equipSpecificName"},
	{name:"equipMaint.equipMaintSchema.equipment.exwDate",mapping:"equipMaintSchema.equipment.exwDate"},
	{name:"equipMaint.equipMaintSchema.equipment.recordSerial",mapping:"equipMaintSchema.equipment.recordSerial"}
	/*,
	{name:"equipMaint.equipment.equipVender",mapping:"equipment.equipVender"},
	{name:"equipMaint.equipment.equipSpecificName",mapping:"equipment.equipSpecificName"},
	{name:"equipMaint.equipment.exwDate",mapping:"equipment.exwDate"},
	{name:"equipMaint.equipment.recordId",mapping:"equipment.recordId"}*/
];
var EquipMaintHiddenField = [
{xtype:"hidden",name:"equipMaint.corpId"},
	{xtype:"hidden",name:"equipMaint.maintId"},
	{xtype:"hidden",name:"equipMaint.equipment.equipId"},
	{xtype:"hidden",name:"equipMaint.equipMaintDetails"},
    {xtype:"hidden",name:"equipMaint.equipMaintCompons"}
];
var EquipMaintListViewField = [ "maintId", "maintSerial", "cycleTimes", "maintDate","lastMaintDate", "thisEndCycleDate", "maintResult", "maintResultName", "status", "statusName", "repairStatus", "equipMaintSchema","corpId","equipment","practiName" ];
var EquipMaintDetailListViewField = [ "maintDetailId", "maintId", "substance", "detailResult", "detailResultName", "description", "maintFlag", "component" ];
var EquipMaintComponListViewField = [ "maintComponId", "maintId", "componId", "counts", "unitPrice", "summary", "remark", "component","component.componGenericName" ];
//===========================================================================//
var EquipInspectSchemaFieldMapping = [
	{name:"equipInspectSchema.userName",mapping:"userName"},
	{name:"equipInspectSchema.applyDate",mapping:"applyDate"},
	{name:"equipInspectSchema.inspectSchemaId",mapping:"inspectSchemaId"},
	{name:"equipInspectSchema.cycleActivateDate",mapping:"cycleActivateDate",type:"date",dateFormat:"Y-m-d H:i:s"},
	{name:"equipInspectSchema.belongToArea",mapping:"belongToArea"},
	{name:"equipInspectSchema.belongToAreaName",mapping:"belongToAreaName"},
	{name:"equipInspectSchema.cycleDays",mapping:"cycleDays"},
	{name:"equipInspectSchema.timesInCycle",mapping:"timesInCycle"},
	{name:"equipInspectSchema.description",mapping:"description"},
	{name:"equipInspectSchema.equipDiary.projectName",mapping:"equipDiary.projectName"},
	{name:"equipInspectSchema.equipDiary.recordId",mapping:"equipDiary.recordId"},
	{name:"equipInspectSchema.equipDiary.exwSerial",mapping:"equipDiary.exwSerial"},
	{name:"equipInspectSchema.generatedOpportunity",mapping:"generatedOpportunity"},
	{name:"equipInspectSchema.generatedOpportunityName",mapping:"generatedOpportunityName"},
	{name:"equipInspectSchema.generatedCycle",mapping:"generatedCycle"},
	{name:"equipInspectSchema.generatedCycleName",mapping:"generatedCycleName"},
];
var EquipInspectSchemaHiddenField = [
	{xtype:"hidden",name:"equipInspectSchema.inspectSchemaId"},
	{xtype:"hidden",name:"equipInspectSchema.userId"},
	{xtype:"hidden",name:"equipInspectSchema.flowId"},
	{xtype:"hidden",name:"equipInspectSchema.relateId"},
	{xtype:"hidden",name:"equipInspectSchema.relateSerial"},
	{xtype:"hidden",name:"equipInspectSchema.relateModule"},
	{xtype:"hidden",name:"equipInspectSchema.equipDiary.equipDiaryId"}
];
var EquipInspectSchemaListViewField = [ "inspectSchemaId", "relateSerial", "cycleActivateDate", "cycleDays", "timesInCycle", "inspectTimes", "active", "equipDiary","belongToArea", "belongToAreaName",
	"createTimes","userName","generatedCycleName"];
var EquipInspectDetailListViewField = [ "inspectDetailId", "inspectId", "position", "substance", "detailResult", "detailResultName", "description", "inspectFlag", "detailPepoles", "component" ];
//===========================================================================//
var EquipMaintSchemaFieldMapping = [
	{name:"equipMaintSchema.maintSchemaId",mapping:"maintSchemaId"},
	{name:"equipMaintSchema.cycleActivateDate",mapping:"cycleActivateDate",type:"date",dateFormat:"Y-m-d H:i:s"},
	{name:"equipMaintSchema.cycleDays",mapping:"cycleDays"},
	{name:"equipMaintSchema.timesInCycle",mapping:"timesInCycle"},
	{name:"equipMaintSchema.maintType",mapping:"maintType"},
	{name:"equipMaintSchema.maintTypeName",mapping:"maintTypeName"},
	{name:"equipMaintSchema.description",mapping:"description"},
/*	{name:"equipMaintSchema.equipDiary.projectName",mapping:"equipDiary.projectName"},
	{name:"equipMaintSchema.equipDiary.recordId",mapping:"equipDiary.recordId"},*/
	{name:"equipMaintSchema.recordId",mapping:"recordId"},
/*	{name:"equipMaintSchema.equipDiary.exwSerial",mapping:"equipDiary.exwSerial"},*/
	{name:"equipMaintSchema.exwSerial",mapping:"exwSerial"},
	{name:"equipMaintSchema.equipment.exwSerial",mapping:"equipment.exwSerial"},
	{name:"equipMaintSchema.equipment.projectName",mapping:"equipment.projectName"},
	{name:"equipMaintSchema.equipment.recordId",mapping:"equipment.recordId"},
	{name:"equipMaintSchema.cycleActivateDate",mapping:"cycleActivateDate"}
];
var EquipMaintSchemaHiddenField = [
	{xtype:"hidden",name:"equipMaintSchema.maintSchemaId"},
	{xtype:"hidden",name:"equipMaintSchema.flowId"},
	{xtype:"hidden",name:"equipMaintSchema.relateId"},
	{xtype:"hidden",name:"equipMaintSchema.relateSerial"},
	{xtype:"hidden",name:"equipMaintSchema.relateModule"},
	{xtype:"hidden",name:"equipMaintSchema.maintType"},
	{xtype:"hidden",name:"equipMaintSchema.equipment.equipId"},
	{xtype:"hidden",name:"equipMaintSchema.maintSchemaStandards"}
];
var EquipMaintSchemaListViewField = [ "maintSchemaId", "flowId", "relateSerial", "cycleActivateDate", "cycleDays", "timesInCycle", "maintType", "maintTypeName", "maintTimes", "active" ,"equipId" ,"equipment","recordId","exwSerial"];
//===========================================================================//
var EquipHitchFieldMapping = [
	{name:"equipHitch.hitchId",mapping:"hitchId"},
	{name:"equipHitch.location",mapping:"location"},
	{name:"equipHitch.content",mapping:"content"},
	{name:"equipHitch.hitchSerial",mapping:"hitchSerial"},
	{name:"equipHitch.relateId",mapping:"relateId"},
	{name:"equipHitch.relateSerial",mapping:"relateSerial"},
	{name:"equipHitch.relateModule",mapping:"relateModule"},
	{name:"equipHitch.relateModuleName",mapping:"relateModuleName"},
	{name:"equipHitch.projectId",mapping:"projectId"},
	{name:"equipHitch.equipId",mapping:"equipId"},
	{name:"equipHitch.spendDate",mapping:"spendDate"},
	{name:"equipHitch.hitchResult",mapping:"hitchResult"},
	{name:"equipHitch.description",mapping:"description"},
	{name:"equipHitch.remark",mapping:"remark"},
	{name:"equipHitch.handleDate",mapping:"handleDate"},
	{name:"equipHitch.handleResult",mapping:"handleResult"},
	{name:"equipHitch.handleMans",mapping:"handleMans"},
	{name:"equipHitch.handleDescription",mapping:"handleDescription"},
	{name:"equipHitch.status",mapping:"status"},
	{name:"equipHitch.statusName",mapping:"statusName"},
	{name:"equipHitch.userId",mapping:"userId"},
	{name:"equipHitch.userName",mapping:"userName"},
	{name:"equipHitch.providedDate",mapping:"providedDate"},
	{name:"equipHitch.applyforState",mapping:"applyforState"},
	{name:"equipHitch.applyforStateName",mapping:"applyforStateName"},
	{name:"equipHitch.department.depId",mapping:"department.depId"},
	{name:"equipHitch.department.depName",mapping:"department.depName"},
	{name:"equipHitch.project.projectName",mapping:"project.projectName"},
	{name:"equipHitch.equipment.recordId",mapping:"equipment.recordId"},
	{name:"equipHitch.equipment.exwSerial",mapping:"equipment.exwSerial"}
];
var EquipHitchHiddenField = [
	{xtype:"hidden",name:"equipHitch.hitchId"},
	{xtype:"hidden",name:"equipHitch.relateId"},
	{xtype:"hidden",name:"equipHitch.relateModule"},
	{xtype:"hidden",name:"equipHitch.projectId"},
	{xtype:"hidden",name:"equipHitch.equipId"},
	{xtype:"hidden",name:"equipHitch.userId"},
	{xtype:"hidden",name:"equipHitch.department.depId"}
];
var EquipHitchListViewField = [ "hitchId", "hitchSerial", "relateSerial", "spendDate", "handleDate", "handleResult", "handleMans", "status", "statusName", "applyforState", "applyforStateName", "project", "equipment" ];
//===========================================================================//
var EquipRepairFieldMapping = [
	{name:"equipRepair.repairId",mapping:"repairId"},
	{name:"equipRepair.teamId",mapping:"teamId"},
	{name:"equipRepair.teamName",mapping:"teamName"},
	{name:"equipRepair.repairSerial",mapping:"repairSerial"},
	{name:"equipRepair.repairDate",mapping:"repairDate"},
	{name:"equipRepair.damageDate",mapping:"damageDate"},
	{name:"equipRepair.buildingNum",mapping:"buildingNum"},
	{name:"equipRepair.relateId",mapping:"relateId"},
	{name:"equipRepair.relateSerial",mapping:"relateSerial"},
	{name:"equipRepair.relateModule",mapping:"relateModule"},
	{name:"equipRepair.relateModuleName",mapping:"relateModuleName"},
	{name:"equipRepair.repairManId",mapping:"repairManId"},
	{name:"equipRepair.repairMan",mapping:"repairMan"},
	{name:"equipRepair.licensePlate",mapping:"licensePlate"},
	{name:"equipRepair.schemaName",mapping:"schemaName"},
	{name:"equipRepair.renewalDescription",mapping:"renewalDescription"},
	{name:"equipRepair.renewalDate",mapping:"renewalDate"},
	{name:"equipRepair.repairAmount",mapping:"repairAmount"},
	{name:"equipRepair.repairResult",mapping:"repairResult"},
	{name:"equipRepair.repairResultName",mapping:"repairResultName"},
	{name:"equipRepair.preventiveMeasures",mapping:"preventiveMeasures"},
	{name:"equipRepair.remark",mapping:"remark"},
	{name:"equipRepair.status",mapping:"status"},
	{name:"equipRepair.statusName",mapping:"statusName"},
	{name:"equipRepair.userId",mapping:"userId"},
	{name:"equipRepair.userName",mapping:"userName"},
	{name:"equipRepair.providedDate",mapping:"providedDate"},
	{name:"equipRepair.applyforState",mapping:"applyforState"},
	{name:"equipRepair.applyforStateName",mapping:"applyforStateName"},
	{name:"equipRepair.department.depId",mapping:"department.depId"},
	{name:"equipRepair.department.depName",mapping:"department.depName"},
	{name:"equipRepair.project.projectId",mapping:"project.projectId"},
	{name:"equipRepair.project.projectName",mapping:"project.projectName"},
	{name:"equipRepair.project.address",mapping:"project.address"},
	{name:"equipRepair.equipment.equipId",mapping:"equipment.equipId"},
	{name:"equipRepair.equipment.recordSerial",mapping:"equipment.recordSerial"},
	{name:"equipRepair.equipment.recordId",mapping:"equipment.recordId"},
	{name:"equipRepair.equipment.exwSerial",mapping:"equipment.exwSerial"},
	{name:"equipRepair.equipment.equipCategoryName",mapping:"equipment.equipCategoryName"},
	{name:"equipRepair.equipment.equipGenericName",mapping:"equipment.equipGenericName"},
	{name:"equipRepair.equipment.equipSpecificName",mapping:"equipment.equipSpecificName"},
	{name:"equipRepair.equipment.storeName",mapping:"equipment.storeName"},
	{name:"equipRepair.phenomenon",mapping:"phenomenon"},
	{name:"equipRepair.runningState",mapping:"runningState"},
	{name:"equipRepair.licensePlate",mapping:"licensePlate"},
	{name:"equipRepair.runningStateName",mapping:"runningStateName"},
	{name:"equipRepair.equipment.warehouseDate",mapping:"equipment.warehouseDate"},
	{name:"equipRepair.completionedDate",mapping:"completionedDate"}
];
var EquipRepairHiddenField = [
	{xtype:"hidden",name:"equipRepair.repairId"},
	{xtype:"hidden",name:"equipRepair.teamName"},
	{xtype:"hidden",name:"equipRepair.relateId"},
	{xtype:"hidden",name:"equipRepair.relateSerial"},
	{xtype:"hidden",name:"equipRepair.relateModule"},
	{xtype:"hidden",name:"equipRepair.repairManId"},
	{xtype:"hidden",name:"equipRepair.userId"},
	{xtype:"hidden",name:"equipRepair.department.depId"},
	{xtype:"hidden",name:"equipRepair.project.projectId"},
	{xtype:"hidden",name:"equipRepair.equipment.equipId"},
	{xtype:"hidden",name:"equipRepair.equipRepairOldCompons"},
	{xtype:"hidden",name:"equipRepair.equipRepairNewCompons"},
	{xtype:"hidden",name:"equipRepair.equipRepairLocations"},
	{xtype:"hidden",name:"equipRepair.equipRepairVehicles"},
	{xtype:"hidden",name:"equipRepair.towerCraneDispatchAllocates"},
	{xtype:"hidden",name:"equipRepair.liftDispatchAllocates"},
	{xtype:"hidden",name:"equipRepair.equipFlow.equipId"}
];
var EquipRepairListViewField = [ "repairId", "repairSerial", "relateId", "relateSerial", "relateModuleName", "buildingNum", "repairManId", "repairMan", "schemaName", "renewalDescription", "renewalDate", "repairAmount", "repairResult", "repairResultName", "repairDate", "damageDate", "preventiveMeasures", "remark", "status", "statusName", "userId", "userName", "providedDate", "phenomenon", "runningState", "runningStateName", "applyforState", "applyforStateName", "project", "equipment","licensePlate","teamName","equipFlow","repairDate","repairAmount","repairResultName","storeName"];
var EquipRepairComponListViewField = [ "repairComponId", "repairId", "counts", "remark", "type", "unitPrice", "summary", "component","faultLocation","unit","componGenericName","componSpecificName" ];
var EquipRepairLocationListViewField = [ "repairLocationId", "repairId", "faultLocation", "spendDate", "phenomenon", "diagnosis", "remark", "troubleshootDate", "repairTime", "unitPrice", "labour", "labourCharges", "cumulativeDowntime","repairTeam" ];
var EquipRepairVehicleListViewField = [ "repairVehicleId", "repairId", "licensePlate", "vehicleModel", "vehicleAmount", "remark"];
//===========================================================================//
var InsureEquipFieldMapping = [
	{name:"insureEquip.insureId",mapping:"insureId"},
	{name:"insureEquip.insureSerial",mapping:"insureSerial"},
	{name:"insureEquip.startInsureDate",mapping:"startInsureDate"},
	{name:"insureEquip.endInsureDate",mapping:"endInsureDate"},
	{name:"insureEquip.coverage",mapping:"coverage"},
	{name:"insureEquip.insureProgram",mapping:"insureProgram"},
	{name:"insureEquip.insureProgramName",mapping:"insureProgramName"},
	{name:"insureEquip.premium",mapping:"premium"},
	{name:"insureEquip.insuranceCompany",mapping:"insuranceCompany"},
	{name:"insureEquip.claimPhone",mapping:"claimPhone"},
	{name:"insureEquip.linkman",mapping:"linkman"},
	{name:"insureEquip.stopInsureDate",mapping:"stopInsureDate"},
	{name:"insureEquip.recoverInsureDate",mapping:"recoverInsureDate"},
	{name:"insureEquip.remark",mapping:"remark"},
	{name:"insureEquip.equipment.equipId",mapping:"equipment.equipId"},
	{name:"insureEquip.equipment.equipGenericName",mapping:"equipment.equipGenericName"},
	{name:"insureEquip.equipment.equipSpecificName",mapping:"equipment.equipSpecificName"},
	{name:"insureEquip.equipment.recordId",mapping:"equipment.recordId"},
	{name:"insureEquip.equipment.exwSerial",mapping:"equipment.exwSerial"},
	{name:"insureEquip.equipment.propertyName",mapping:"equipment.propertyName"},
	{name:"insureEquip.project.projectId",mapping:"project.projectId"},
	{name:"insureEquip.project.projectName",mapping:"project.projectName"},
	{name:"insureEquip.project.address",mapping:"project.address"}
];
var InsureEquipHiddenField = [
	{xtype:"hidden",name:"insureEquip.insureId"},
	{xtype:"hidden",name:"insureEquip.project.projectId"},
	{xtype:"hidden",name:"insureEquip.equipment.equipId"},
	{xtype:"hidden",name:"insureEquip.insureClaims"}
];
var InsureEquipListViewField = [ "insureId", "insureSerial", "startInsureDate", "endInsureDate", "coverage", "insuranceCompany", "claimPhone", "equipment", "project" ];
var InsureClaimListViewField = [ "insureClaimId", "insureId", "insureSerial", "bankDeposit", "account", "equipId", "claimDate", "claimReson", "wastageAmount", "compensateAmount" ];
//===========================================================================//
var MoneyLendFieldMapping = [
	{name:"moneyLend.lendId",mapping:"lendId"},
	{name:"moneyLend.lendSerial",mapping:"lendSerial"},
	{name:"moneyLend.lendTheme",mapping:"lendTheme"},
	{name:"moneyLend.paymentEntId",mapping:"paymentEntId"},
	{name:"moneyLend.paymentModule",mapping:"paymentModule"},
	{name:"moneyLend.paymentEntName",mapping:"paymentEntName"},
	{name:"moneyLend.paymentEntAccountId",mapping:"paymentEntAccountId"},
	{name:"moneyLend.paymentBank",mapping:"paymentBank"},
	{name:"moneyLend.paymentAccount",mapping:"paymentAccount"},
	{name:"moneyLend.practiId",mapping:"practiId"},
	{name:"moneyLend.practiName",mapping:"practiName"},
	{name:"moneyLend.practiTel",mapping:"practiTel"},
	{name:"moneyLend.lendDate",mapping:"lendDate"},
	{name:"moneyLend.lendAmount",mapping:"lendAmount"},
	{name:"moneyLend.arrearsAmount",mapping:"arrearsAmount"},
	{name:"moneyLend.backDate",mapping:"backDate"},
	{name:"moneyLend.lendbackStatus",mapping:"lendbackStatus"},
	{name:"moneyLend.description",mapping:"description"},
	{name:"moneyLend.userId",mapping:"userId"},
	{name:"moneyLend.userName",mapping:"userName"},
	{name:"moneyLend.providedDate",mapping:"providedDate"},
	{name:"moneyLend.department.depId",mapping:"department.depId"},
	{name:"moneyLend.department.depName",mapping:"department.depName"}
];
var MoneyLendHiddenField = [
	{xtype:"hidden",name:"moneyLend.lendId"},
	{xtype:"hidden",name:"moneyLend.paymentEntId"},
	{xtype:"hidden",name:"moneyLend.paymentModule"},
	{xtype:"hidden",name:"moneyLend.paymentEntAccountId"},
	{xtype:"hidden",name:"moneyLend.practiId"},
	{xtype:"hidden",name:"moneyLend.userId"},
	{xtype:"hidden",name:"moneyLend.department.depId"}
];
var MoneyLendListViewField = [ "lendId", "lendSerial", "lendTheme", "practiId", "practiName", "lendDate", "lendAmount", "backAmount", "arrearsAmount", "backDate", "lendbackStatus", "lendbackStatusName", "applyforState", "applyforStateName" ];
//===========================================================================//
var MoneyBackFieldMapping = [
	{name:"moneyBack.backId",mapping:"backId"},
	{name:"moneyBack.backSerial",mapping:"backSerial"},
	{name:"moneyBack.backTheme",mapping:"backTheme"},
	{name:"moneyBack.receiveEntId",mapping:"receiveEntId"},
	{name:"moneyBack.receiveModule",mapping:"receiveModule"},
	{name:"moneyBack.receiveEntName",mapping:"receiveEntName"},
	{name:"moneyBack.receiveEntAccountId",mapping:"receiveEntAccountId"},
	{name:"moneyBack.receiveBank",mapping:"receiveBank"},
	{name:"moneyBack.receiveAccount",mapping:"receiveAccount"},
	{name:"moneyBack.lendId",mapping:"lendId"},
	{name:"moneyBack.lendSerial",mapping:"lendSerial"},
	{name:"moneyBack.lendTheme",mapping:"lendTheme"},
	{name:"moneyBack.lendPractiId",mapping:"lendPractiId"},
	{name:"moneyBack.lendPractiName",mapping:"lendPractiName"},
	{name:"moneyBack.lendAmount",mapping:"lendAmount"},
	{name:"moneyBack.practiId",mapping:"practiId"},
	{name:"moneyBack.practiName",mapping:"practiName"},
	{name:"moneyBack.practiTel",mapping:"practiTel"},
	{name:"moneyBack.backDate",mapping:"backDate"},
	{name:"moneyBack.backAmount",mapping:"backAmount"},
	{name:"moneyBack.arrearsAmount",mapping:"arrearsAmount"},
	{name:"moneyBack.description",mapping:"description"},
	{name:"moneyBack.userId",mapping:"userId"},
	{name:"moneyBack.userName",mapping:"userName"},
	{name:"moneyBack.providedDate",mapping:"providedDate"},
	{name:"moneyBack.department.depId",mapping:"department.depId"},
	{name:"moneyBack.department.depName",mapping:"department.depName"}
];
var MoneyBackHiddenField = [
	{xtype:"hidden",name:"moneyBack.backId"},
	{xtype:"hidden",name:"moneyBack.receiveEntId"},
	{xtype:"hidden",name:"moneyBack.receiveModule"},
	{xtype:"hidden",name:"moneyBack.receiveEntAccountId"},
	{xtype:"hidden",name:"moneyBack.lendId"},
	{xtype:"hidden",name:"moneyBack.lendTheme"},
	{xtype:"hidden",name:"moneyBack.lendPractiId"},
	{xtype:"hidden",name:"moneyBack.practiId"},
	{xtype:"hidden",name:"moneyBack.userId"},
	{xtype:"hidden",name:"moneyBack.department.depId"}
];
var MoneyBackListViewField = [ "backId", "backSerial", "backTheme", "lendSerial", "practiName", "backDate", "backAmount", "arrearsAmount", "applyforState", "applyforStateName" ];
//===========================================================================//
var InvoiceIssueFieldMapping = [
	{name:"invoiceIssue.invoiceIssueId",mapping:"invoiceIssueId"},
	{name:"invoiceIssue.invoiceSerial",mapping:"invoiceSerial"},
	{name:"invoiceIssue.invoiceTheme",mapping:"invoiceTheme"},
	{name:"invoiceIssue.invoiceItem",mapping:"invoiceItem"},
	{name:"invoiceIssue.issueDate",mapping:"issueDate"},
	{name:"invoiceIssue.issueAmount",mapping:"issueAmount"},
	{name:"invoiceIssue.invoiceType",mapping:"invoiceType"},
	{name:"invoiceIssue.invoiceTypeName",mapping:"invoiceTypeName"},
	{name:"invoiceIssue.handleEntId",mapping:"handleEntId"},
	{name:"invoiceIssue.handleEntName",mapping:"handleEntName"},
	{name:"invoiceIssue.issuePractiId",mapping:"issuePractiId"},
	{name:"invoiceIssue.issuePractiName",mapping:"issuePractiName"},
	{name:"invoiceIssue.taxRate",mapping:"taxRate"},
	{name:"invoiceIssue.taxAmount",mapping:"taxAmount"},
	{name:"invoiceIssue.relateId",mapping:"relateId"},
	{name:"invoiceIssue.relateSerial",mapping:"relateSerial"},
	{name:"invoiceIssue.relateTheme",mapping:"relateTheme"},
	{name:"invoiceIssue.relateModule",mapping:"relateModule"},
	{name:"invoiceIssue.relateModuleName",mapping:"relateModuleName"},
	{name:"invoiceIssue.relateAmount",mapping:"relateAmount"},
	{name:"invoiceIssue.hasIssueAmount",mapping:"hasIssueAmount"},
	{name:"invoiceIssue.description",mapping:"description"},
	{name:"invoiceIssue.remark",mapping:"remark"},
	{name:"invoiceIssue.userId",mapping:"userId"},
	{name:"invoiceIssue.userName",mapping:"userName"},
	{name:"invoiceIssue.providedDate",mapping:"providedDate"},
	{name:"invoiceIssue.department.depId",mapping:"department.depId"},
	{name:"invoiceIssue.department.depName",mapping:"department.depName"},
	{name:"invoiceIssue.issueStatus",mapping:"issueStatus"},
	{name:"invoiceIssue.issueStatusName",mapping:"issueStatusName"},
	{name:"invoiceIssue.invoiceContent",mapping:"invoiceContent"},
	{name:"invoiceIssue.invoiceContentName",mapping:"invoiceContentName"},
	{name:"invoiceIssue.invoiceStatus",mapping:"invoiceStatus"},
	{name:"invoiceIssue.invoiceStatusName",mapping:"invoiceStatusName"}
];
var InvoiceIssueHiddenField = [
	{xtype:"hidden",name:"invoiceIssue.invoiceIssueId"},
	{xtype:"hidden",name:"invoiceIssue.handleEntId"},
	{xtype:"hidden",name:"invoiceIssue.issuePractiId"},
	{xtype:"hidden",name:"invoiceIssue.relateId"},
	{xtype:"hidden",name:"invoiceIssue.relateModule"},
	{xtype:"hidden",name:"invoiceIssue.userId"},
	{xtype:"hidden",name:"invoiceIssue.department.depId"}
];
var InvoiceIssueListViewField = [ "invoiceIssueId", "invoiceSerial", "invoiceItem", "issueDate", "issueAmount", "handleEntName", "issuePractiName", "relateSerial", "relateModuleName", "taxRate", "taxAmount", "issueStatusName", "applyforState", "applyforStateName" ];
//===========================================================================//
var InvoiceCollectFieldMapping = [
	{name:"invoiceCollect.invoiceCollectId",mapping:"invoiceCollectId"},
	{name:"invoiceCollect.invoiceSerial",mapping:"invoiceSerial"},
	{name:"invoiceCollect.invoiceTheme",mapping:"invoiceTheme"},
	{name:"invoiceCollect.invoiceItem",mapping:"invoiceItem"},
	{name:"invoiceCollect.collectDate",mapping:"collectDate"},
	{name:"invoiceCollect.collectAmount",mapping:"collectAmount"},
	{name:"invoiceCollect.invoiceType",mapping:"invoiceType"},
	{name:"invoiceCollect.invoiceTypeName",mapping:"invoiceTypeName"},
	{name:"invoiceCollect.issueEnterprise",mapping:"issueEnterprise"},
	{name:"invoiceCollect.description",mapping:"description"},
	{name:"invoiceCollect.relateId",mapping:"relateId"},
	{name:"invoiceCollect.relateSerial",mapping:"relateSerial"},
	{name:"invoiceCollect.relateTheme",mapping:"relateTheme"},
	{name:"invoiceCollect.relateModule",mapping:"relateModule"},
	{name:"invoiceCollect.relateModuleName",mapping:"relateModuleName"},
	{name:"invoiceCollect.relateAmount",mapping:"relateAmount"},
	{name:"invoiceCollect.hasCollectAmount",mapping:"hasCollectAmount"},
	{name:"invoiceCollect.collectStatus",mapping:"collectStatus"},
	{name:"invoiceCollect.collectStatusName",mapping:"collectStatusName"},
	{name:"invoiceCollect.userId",mapping:"userId"},
	{name:"invoiceCollect.userName",mapping:"userName"},
	{name:"invoiceCollect.providedDate",mapping:"providedDate"},
	{name:"invoiceCollect.department.depId",mapping:"department.depId"},
	{name:"invoiceCollect.department.depName",mapping:"department.depName"}
];
var InvoiceCollectHiddenField = [
	{xtype:"hidden",name:"invoiceCollect.invoiceCollectId"},
	{xtype:"hidden",name:"invoiceCollect.relateId"},
	{xtype:"hidden",name:"invoiceCollect.relateModule"},
	{xtype:"hidden",name:"invoiceCollect.userId"},
	{xtype:"hidden",name:"invoiceCollect.department.depId"}
];
var InvoiceCollectListViewField = [ "invoiceCollectId", "invoiceSerial", "invoiceItem", "collectDate", "collectAmount", "invoiceTypeName", "issueEnterprise", "relateSerial", "relateModuleName", "collectStatusName", "applyforState", "applyforStateName" ];
//===========================================================================//
var AmountReceiveFieldMapping = [
	{name:"amountReceive.amountReceiveId",mapping:"amountReceiveId"},
	{name:"amountReceive.amountSerial",mapping:"amountSerial"},
	{name:"amountReceive.amountTheme",mapping:"amountTheme"},
	{name:"amountReceive.voucher",mapping:"voucher"},
	{name:"amountReceive.receiveEntId",mapping:"receiveEntId"},
	{name:"amountReceive.receiveModule",mapping:"receiveModule"},
	{name:"amountReceive.receiveEntName",mapping:"receiveEntName"},
	{name:"amountReceive.receiveEntAccountId",mapping:"receiveEntAccountId"},
	{name:"amountReceive.receiveBank",mapping:"receiveBank"},
	{name:"amountReceive.receiveAccount",mapping:"receiveAccount"},
	{name:"amountReceive.receiveAmount",mapping:"receiveAmount"},
	{name:"amountReceive.paymentId",mapping:"paymentId"},
	{name:"amountReceive.paymentModule",mapping:"paymentModule"},
	{name:"amountReceive.paymentName",mapping:"paymentName"},
	{name:"amountReceive.paymentAccountId",mapping:"paymentAccountId"},
	{name:"amountReceive.paymentBank",mapping:"paymentBank"},
	{name:"amountReceive.paymentAccount",mapping:"paymentAccount"},
	{name:"amountReceive.paymentType",mapping:"paymentType"},
	{name:"amountReceive.paymentTypeName",mapping:"paymentTypeName"},
	{name:"amountReceive.receiveDate",mapping:"receiveDate"},
	{name:"amountReceive.practiId",mapping:"practiId"},
	{name:"amountReceive.practiName",mapping:"practiName"},
	{name:"amountReceive.relateId",mapping:"relateId"},
	{name:"amountReceive.relateSerial",mapping:"relateSerial"},
	{name:"amountReceive.relateTheme",mapping:"relateTheme"},
	{name:"amountReceive.relateModule",mapping:"relateModule"},
	{name:"amountReceive.relateModuleName",mapping:"relateModuleName"},
	{name:"amountReceive.relateAmount",mapping:"relateAmount"},
	{name:"amountReceive.hasReceiveAmount",mapping:"hasReceiveAmount"},
	{name:"amountReceive.projectId",mapping:"projectId"},
	{name:"amountReceive.reimburseType",mapping:"reimburseType"},
	{name:"amountReceive.reimburseTypeName",mapping:"reimburseTypeName"},
	{name:"amountReceive.projectSerial",mapping:"projectSerial"},
	{name:"amountReceive.projectName",mapping:"projectName"},
	{name:"amountReceive.address",mapping:"address"},
	{name:"amountReceive.remark",mapping:"remark"},
	{name:"amountReceive.receiveStatus",mapping:"receiveStatus"},
	{name:"amountReceive.receiveStatusName",mapping:"receiveStatusName"},
	{name:"amountReceive.receivableDebit",mapping:"receivableDebit"},
	{name:"amountReceive.userId",mapping:"userId"},
	{name:"amountReceive.userName",mapping:"userName"},
	{name:"amountReceive.depId",mapping:"depId"},
	{name:"amountReceive.providedDate",mapping:"providedDate"},
	{name:"amountReceive.department.depId",mapping:"department.depId"},
	{name:"amountReceive.department.depName",mapping:"department.depName"},
	{name:"amountReceive.contractLease.contractId",mapping:"contractLease.contractId"}
];
var AmountReceiveHiddenField = [
	{xtype:"hidden",name:"amountReceive.amountReceiveId"},
	{xtype:"hidden",name:"amountReceive.receiveEntId"},
	{xtype:"hidden",name:"amountReceive.receiveModule"},
	{xtype:"hidden",name:"amountReceive.receiveEntAccountId"},
	{xtype:"hidden",name:"amountReceive.paymentId"},
	{xtype:"hidden",name:"amountReceive.paymentModule"},
	{xtype:"hidden",name:"amountReceive.paymentAccountId"},
	{xtype:"hidden",name:"amountReceive.practiId"},
	{xtype:"hidden",name:"amountReceive.relateId"},
	{xtype:"hidden",name:"amountReceive.relateModule"},
	{xtype:"hidden",name:"amountReceive.projectId"},
	{xtype:"hidden",name:"amountReceive.userId"},
	{xtype:"hidden",name:"amountReceive.department.depId"},
	{xtype:"hidden",name:"amountReceive.amountEquipShares"},
	{xtype:"hidden",name:"amountReceive.amountReceiveShares"},
	{xtype:"hidden",name:"amountReceive.contractLease.contractId"}
];
var AmountReceiveListViewField = [ "amountReceiveId", "amountSerial", "amountTheme", "receiveEntName", "receiveAmount", "paymentName", "receiveDate",
                                   "practiName", "relateId", "relateSerial", "relateModule", "relateModuleName", "receiveStatusName", "projectName", "providedDate", 
                                   "applyforState", "applyforStateName","userName","contractSerial","contractNo","contractLease" ];
var AmountReceiveShareListViewField = [ "receiveShareId", "amountReceiveId", "receivementId", "relateId", "relateSerial", "relateModule", "relateModuleName", "periods", "receivement", "receiveDate", "alreadyReceivement", "issueInvoice", "invoiceType", "invoiceTypeName", "remark", "presentReceivement" ];
//===========================================================================//
var AdvanceReceiveFieldMapping = [
    {name:"advanceReceive.adreceiveId",mapping:"adreceiveId"},
    {name:"advanceReceive.userId",mapping:"userId"},
    {name:"advanceReceive.userName",mapping:"userName"},
    {name:"advanceReceive.advanceSerial",mapping:"advanceSerial"},
    {name:"advanceReceive.advanceTheme",mapping:"advanceTheme"},
    {name:"advanceReceive.providedDate",mapping:"providedDate"},
    {name:"advanceReceive.advanceDate",mapping:"advanceDate"},
    {name:"advanceReceive.advanceReceiveAmount",mapping:"advanceReceiveAmount"},
    {name:"advanceReceive.receiveEntId",mapping:"receiveEntId"},
    {name:"advanceReceive.receiveModule",mapping:"receiveModule"},
    {name:"advanceReceive.receiveEntName",mapping:"receiveEntName"},
    {name:"advanceReceive.paymentId",mapping:"paymentId"},
    {name:"advanceReceive.paymentModule",mapping:"paymentModule"},
    {name:"advanceReceive.paymentName",mapping:"paymentName"},
    {name:"advanceReceive.paymentType",mapping:"paymentType"},
    {name:"advanceReceive.practiId",mapping:"practiId"},
    {name:"advanceReceive.practiName",mapping:"practiName"},
    {name:"advanceReceive.remark",mapping:"remark"},
    {name:"advanceReceive.applyforState",mapping:"applyforState"},
    {name:"advanceReceive.delFlag",mapping:"delFlag"},
    {name:"advanceReceive.department.depId",mapping:"department.depId"},
    {name:"advanceReceive.department.depName",mapping:"department.depName"},
    {name:"advanceReceive.contractLease.contractId",mapping:"contractLease.contractId"},
    {name:"advanceReceive.contractLease.address",mapping:"contractLease.address"},
    {name:"advanceReceive.contractLease.projectName",mapping:"contractLease.projectName"},
    {name:"advanceReceive.contractLease.contractNo",mapping:"contractLease.contractNo"}
];
var AdvanceReceiveHiddenField = [
	{xtype:"hidden",name:"advanceReceive.adreceiveId"},
	{xtype:"hidden",name:"advanceReceive.receiveEntId"},
	{xtype:"hidden",name:"advanceReceive.receiveModule"},
	{xtype:"hidden",name:"advanceReceive.paymentId"},
	{xtype:"hidden",name:"advanceReceive.paymentModule"},
	{xtype:"hidden",name:"advanceReceive.practiId"},
	{xtype:"hidden",name:"advanceReceive.userId"},
	{xtype:"hidden",name:"advanceReceive.department.depId"},
	{xtype:"hidden",name:"advanceReceive.contractLease.contractId"},
];
var AdvanceReceiveListViewField = [ "adreceiveId", "userId", "userName", "advanceSerial", "advanceTheme", "providedDate", "receiveEntId",
                                   "receiveModule", "receiveEntName", "paymentId", "paymentModule", "paymentName", "paymentType", "practiId", "practiName", 
                                   "remark", "applyforState","applyforStateName","department.depName","department.depId","contractLease.contractId","delFlag","contractLease.projectName","contractLease.contractNo",
                                   "advanceReceiveAmount","advanceDate","contractLease"];
//===========================================================================//
var AmountPaymentFieldMapping = [
	{name:"amountPayment.amountPaymentId",mapping:"amountPaymentId"},
	{name:"amountPayment.amountSerial",mapping:"amountSerial"},
	{name:"amountPayment.amountTheme",mapping:"amountTheme"},
	{name:"amountPayment.paymentEntId",mapping:"paymentEntId"},
	{name:"amountPayment.paymentModule",mapping:"paymentModule"},
	{name:"amountPayment.paymentEntName",mapping:"paymentEntName"},
	{name:"amountPayment.paymentEntAccountId",mapping:"paymentEntAccountId"},
	{name:"amountPayment.paymentBank",mapping:"paymentBank"},
	{name:"amountPayment.paymentAccount",mapping:"paymentAccount"},
	{name:"amountPayment.paymentAmount",mapping:"paymentAmount"},
	{name:"amountPayment.receiveId",mapping:"receiveId"},
	{name:"amountPayment.receiveModule",mapping:"receiveModule"},
	{name:"amountPayment.receiveName",mapping:"receiveName"},
	{name:"amountPayment.receiveAccountId",mapping:"receiveAccountId"},
	{name:"amountPayment.receiveBank",mapping:"receiveBank"},
	{name:"amountPayment.receiveAccount",mapping:"receiveAccount"},
	{name:"amountPayment.paymentType",mapping:"paymentType"},
	{name:"amountPayment.paymentTypeName",mapping:"paymentTypeName"},
	{name:"amountPayment.paymentDate",mapping:"paymentDate"},
	{name:"amountPayment.practiId",mapping:"practiId"},
	{name:"amountPayment.practiName",mapping:"practiName"},
	{name:"amountPayment.feesType",mapping:"feesType"},
	{name:"amountPayment.feesTypeName",mapping:"feesTypeName"},
	{name:"amountPayment.paymentContent",mapping:"paymentContent"},
	{name:"amountPayment.relateId",mapping:"relateId"},
	{name:"amountPayment.relateSerial",mapping:"relateSerial"},
	{name:"amountPayment.recordId",mapping:"recordId"},
	{name:"amountPayment.relateTheme",mapping:"relateTheme"},
	{name:"amountPayment.relateModule",mapping:"relateModule"},
	{name:"amountPayment.relateModuleName",mapping:"relateModuleName"},
	{name:"amountPayment.relateAmount",mapping:"relateAmount"},
	{name:"amountPayment.hasPaymentAmount",mapping:"hasPaymentAmount"},
	{name:"amountPayment.payableDebit",mapping:"payableDebit"},
	{name:"amountPayment.projectId",mapping:"projectId"},
	{name:"amountPayment.projectSerial",mapping:"projectSerial"},
	{name:"amountPayment.projectName",mapping:"projectName"},
	{name:"amountPayment.address",mapping:"address"},
	{name:"amountPayment.remark",mapping:"remark"},
	{name:"amountPayment.paymentStatus",mapping:"paymentStatus"},
	{name:"amountPayment.paymentStatusName",mapping:"paymentStatusName"},
	{name:"amountPayment.userId",mapping:"userId"},
	{name:"amountPayment.userName",mapping:"userName"},
	{name:"amountPayment.providedDate",mapping:"providedDate"},
	{name:"amountPayment.deliveryDate",mapping:"deliveryDate"},
	{name:"amountPayment.department.depId",mapping:"department.depId"},
	{name:"amountPayment.department.depName",mapping:"department.depName"}
];
var AmountPaymentHiddenField = [
	{xtype:"hidden",name:"amountPayment.amountPaymentId"},
	{xtype:"hidden",name:"amountPayment.paymentEntId"},
	{xtype:"hidden",name:"amountPayment.paymentModule"},
	{xtype:"hidden",name:"amountPayment.paymentEntAccountId"},
	{xtype:"hidden",name:"amountPayment.receiveId"},
	{xtype:"hidden",name:"amountPayment.receiveModule"},
	{xtype:"hidden",name:"amountPayment.receiveAccountId"},
	{xtype:"hidden",name:"amountPayment.practiId"},
	{xtype:"hidden",name:"amountPayment.relateId"},
	{xtype:"hidden",name:"amountPayment.relateModule"},
	{xtype:"hidden",name:"amountPayment.projectId"},
	{xtype:"hidden",name:"amountPayment.userId"},
	{xtype:"hidden",name:"amountPayment.department.depId"},
	{xtype:"hidden",name:"amountPayment.amountEquipShares"},
	{xtype:"hidden",name:"amountPayment.amountPaymentShares"}
];
var AmountPaymentListViewField = [ "amountPaymentId", "amountSerial", "amountTheme", "paymentEntName", "paymentAmount", "receiveName", "paymentDate", "practiName", "relateId", "relateSerial", "recordId", "relateTheme", "relateModule", "relateModuleName", "projectName", "relateAmount", "hasPaymentAmount", "payableDebit", "paymentStatusName", "providedDate", "applyforState", "applyforStateName" ];
var AmountEquipShareListViewField = [ "amountEquipShareId", "relateId", "relateSerial", "relateModule", "relateModuleName", "amountDate", "presentAmount", "equipId", "recordSerial", "equipCategory", "equipCategoryName", "equipGeneric", "equipGenericName", "equipSpecific", "equipSpecificName", "recordId", "exwSerial", "propertyEnt", "propertyName" ];
var AmountPaymentShareListViewField = [ "paymentShareId", "amountPaymentId", "instalmentId", "relateId", "relateSerial", "relateModule", "relateModuleName", "periods", "payment", "payDate", "alreadyPayment", "remark", "presentPayment" ];

//===========================================================================//
var DeductFieldMapping = [
	{name:"deduct.deductId",mapping:"deductId"},
	{name:"deduct.deductSerial",mapping:"deductSerial"},
	{name:"deduct.contractId",mapping:"contractId"},
	{name:"deduct.contractSerial",mapping:"contractSerial"},
	{name:"deduct.contractTheme",mapping:"contractTheme"},
	{name:"deduct.contractAmount",mapping:"contractAmount"},
	{name:"deduct.disbursement",mapping:"disbursement"},
	{name:"deduct.proportion",mapping:"proportion"},
	{name:"deduct.cardinal",mapping:"cardinal"},
	{name:"deduct.acardinalName",mapping:"acardinalName"},
	{name:"deduct.proportionType",mapping:"proportionType"},
	{name:"deduct.proportionTypeName",mapping:"proportionTypeName"},
	{name:"deduct.deductTotalAmount",mapping:"deductTotalAmount"},
	{name:"deduct.remark",mapping:"remark"},
	{name:"deduct.userId",mapping:"userId"},
	{name:"deduct.userName",mapping:"userName"},
	{name:"deduct.depId",mapping:"depId"},
	{name:"deduct.providedDate",mapping:"providedDate"},
	{name:"deduct.applyforPassDate",mapping:"applyforPassDate"},
	{name:"deduct.department.depId",mapping:"department.depId"},
	{name:"deduct.department.depName",mapping:"department.depName"}
];
var DeductHiddenField = [
	{xtype:"hidden",name:"deduct.deductId"},
	{xtype:"hidden",name:"deduct.contractId"},
	{xtype:"hidden",name:"deduct.userId"},
	{xtype:"hidden",name:"deduct.depId"},
	{xtype:"hidden",name:"deduct.department.depId"},
	{xtype:"hidden",name:"deduct.deductPractis"}
];
var DeductListViewField = [ "deductId", "deductSerial", "contractSerial", "contractTheme", "acardinalName", "proportionTypeName", "deductTotalAmount", "applyforState", "applyforStateName" ];
//===========================================================================//
var SalaryFieldMapping = [
	{name:"salary.salaryId",mapping:"salaryId"},
	{name:"salary.salarySerial",mapping:"salarySerial"},
	{name:"salary.salaryTheme",mapping:"salaryTheme"},
	{name:"salary.monthId",mapping:"monthId"},
	{name:"salary.salaryMonth",mapping:"salaryMonth"},
	{name:"salary.entId",mapping:"entId"},
	{name:"salary.entName",mapping:"entName"},
	{name:"salary.entAccountId",mapping:"entAccountId"},
	{name:"salary.bank",mapping:"bank"},
	{name:"salary.account",mapping:"account"},
	{name:"salary.salaryAmount",mapping:"salaryAmount"},
	{name:"salary.deductPassDate",mapping:"deductPassDate",type:"date",dateFormat:"Y-m-d H:i:s"},
	{name:"salary.remark",mapping:"remark"},
	{name:"salary.userId",mapping:"userId"},
	{name:"salary.userName",mapping:"userName"},
	{name:"salary.providedDate",mapping:"providedDate"},
	{name:"salary.department.depId",mapping:"department.depId"},
	{name:"salary.department.depName",mapping:"department.depName"}
];
var SalaryHiddenField = [
	{xtype:"hidden",name:"salary.salaryId"},
	{xtype:"hidden",name:"salary.monthId"},
	{xtype:"hidden",name:"salary.entId"},
	{xtype:"hidden",name:"salary.entAccountId"},
	{xtype:"hidden",name:"salary.userId"},
	{xtype:"hidden",name:"salary.department.depId"},
	{xtype:"hidden",name:"salary.salaryPractis"}
];
var SalaryListViewField = [ "salaryId", "salarySerial", "salaryTheme", "salaryMonth", "entName", "bank", "account", "salaryAmount", "applyforState", "applyforStateName" ];
//===========================================================================//
var ReimburseFieldMapping = [
	{name:"reimburse.reimburseId",mapping:"reimburseId"},
	{name:"reimburse.reimburseSerial",mapping:"reimburseSerial"},
	{name:"reimburse.reimburseTheme",mapping:"reimburseTheme"},
	{name:"reimburse.paymentEntId",mapping:"paymentEntId"},
	{name:"reimburse.paymentModule",mapping:"paymentModule"},
	{name:"reimburse.paymentEntName",mapping:"paymentEntName"},
	{name:"reimburse.paymentEntAccountId",mapping:"paymentEntAccountId"},
	{name:"reimburse.paymentBank",mapping:"paymentBank"},
	{name:"reimburse.receiveAccount",mapping:"paymentAccount"},
	{name:"reimburse.receiveBank",mapping:"receiveBank"},
	{name:"reimburse.receiveAccount",mapping:"receiveAccount"},
	{name:"reimburse.practiId",mapping:"practiId"},
	{name:"reimburse.practiName",mapping:"practiName"},
	{name:"reimburse.practiTel",mapping:"practiTel"},
	{name:"reimburse.reimburseMonth",mapping:"reimburseMonth"},
	{name:"reimburse.ticketCount",mapping:"ticketCount"},
	{name:"reimburse.reimburseAmount",mapping:"reimburseAmount"},
	{name:"reimburse.askforAmount",mapping:"askforAmount"},
	{name:"reimburse.description",mapping:"description"},
	{name:"reimburse.arrearsAmount",mapping:"arrearsAmount"},
	{name:"reimburse.relateId",mapping:"relateId"},
	{name:"reimburse.relateSerial",mapping:"relateSerial"},
	{name:"reimburse.relateTheme",mapping:"relateTheme"},
	{name:"reimburse.relateModule",mapping:"relateModule"},
	{name:"reimburse.relateModuleName",mapping:"relateModuleName"},
	{name:"reimburse.equipId",mapping:"equipId"},
	{name:"reimburse.recordSerial",mapping:"recordSerial"},
	{name:"reimburse.equipCategory",mapping:"equipCategory"},
	{name:"reimburse.equipCategoryName",mapping:"equipCategoryName"},
	{name:"reimburse.equipGeneric",mapping:"equipGeneric"},
	{name:"reimburse.equipGenericName",mapping:"equipGenericName"},
	{name:"reimburse.equipSpecific",mapping:"equipSpecific"},
	{name:"reimburse.equipSpecificName",mapping:"equipSpecificName"},
	{name:"reimburse.recordId",mapping:"recordId"},
	{name:"reimburse.customerId",mapping:"customerId"},
	{name:"reimburse.customerName",mapping:"customerName"},
	{name:"reimburse.customerTel",mapping:"customerTel"},
	{name:"reimburse.projectId",mapping:"projectId"},
	{name:"reimburse.projectSerial",mapping:"projectSerial"},
	{name:"reimburse.projectName",mapping:"projectName"},
	{name:"reimburse.address",mapping:"address"},
	{name:"reimburse.userId",mapping:"userId"},
	{name:"reimburse.userName",mapping:"userName"},
	{name:"reimburse.depId",mapping:"depId"},
	{name:"reimburse.providedDate",mapping:"providedDate"},
	{name:"reimburse.department.depId",mapping:"department.depId"},
	{name:"reimburse.department.depName",mapping:"department.depName"}
];
var ReimburseHiddenField = [
	{xtype:"hidden",name:"reimburse.reimburseId"},
	{xtype:"hidden",name:"reimburse.paymentEntId"},
	{xtype:"hidden",name:"reimburse.paymentModule"},
	{xtype:"hidden",name:"reimburse.paymentEntAccountId"},
	{xtype:"hidden",name:"reimburse.practiId"},
	{xtype:"hidden",name:"reimburse.relateId"},
	{xtype:"hidden",name:"reimburse.relateModule"},
	{xtype:"hidden",name:"reimburse.equipId"},
	{xtype:"hidden",name:"reimburse.equipCategory"},
	{xtype:"hidden",name:"reimburse.equipGeneric"},
	{xtype:"hidden",name:"reimburse.equipSpecific"},
	{xtype:"hidden",name:"reimburse.customerId"},
	{xtype:"hidden",name:"reimburse.projectId"},
	{xtype:"hidden",name:"reimburse.userId"},
	{xtype:"hidden",name:"reimburse.department.depId"},
	{xtype:"hidden",name:"reimburse.reimburseTickets"}
];
var ReimburseListViewField = [ "reimburseId", "reimburseSerial", "reimburseTheme", "practiName", "reimburseMonth", "reimburseAmount", "askforAmount", "relateSerial", "relateModule", "relateModuleName", "applyforState", "applyforStateName" ];
var ReimburseTicketListViewField = [ "ticketId", "reimburseId", "reimburseType", "reimburseTypeName", "ticketDate", "ticketQuantity", "specificName", "modelName", "unitPrice", "quantity", "summary", "remark", "carId", "licensePlate" ];
//===========================================================================//
var DeductScaleFieldMapping = [
	{name:"deductScale.deductScaleId",mapping:"deductScaleId"},
	{name:"deductScale.scaleStart",mapping:"scaleStart"},
	{name:"deductScale.scaleEnd",mapping:"scaleEnd"},
	{name:"deductScale.scalePercent",mapping:"scalePercent"},
	{name:"deductScale.scaleType",mapping:"scaleType"}
];
var DeductScaleHiddenField = [
	{xtype:"hidden",name:"deductScale.deductScales"}
];
//===========================================================================//
var AnnounceFieldMapping = [
	{name:"announce.announceId",mapping:"announceId"},
	{name:"announce.announceTitle",mapping:"announceTitle"},
	{name:"announce.announceType",mapping:"announceType"},
	{name:"announce.announce",mapping:"announce"},
	{name:"announce.userId",mapping:"userId"},
	{name:"announce.userName",mapping:"userName"},
	{name:"announce.providedDate",mapping:"providedDate"},
	{name:"announce.department.depId",mapping:"department.depId"},
	{name:"announce.department.depName",mapping:"department.depName"}
];
var AnnounceHiddenField = [
	{xtype:"hidden",name:"announce.announceId"},
	{xtype:"hidden",name:"announce.userId"},
	{xtype:"hidden",name:"announce.department.depId"},
	{xtype:"hidden",name:"announce.announcePractis"},
	{xtype:"hidden",name:"announce.announceDeps"}
];
var AnnounceListViewField = [ "announceId", "announceTitle", "announceType", "announce", "publish", "userName", "providedDate", "department" ];
//===========================================================================//
var InventoryFieldMapping = [
	{name:"inventory.inventoryId",mapping:"inventoryId"},
	{name:"inventory.inventorySerial",mapping:"inventorySerial"},
	{name:"inventory.inventoryTheme",mapping:"inventoryTheme"},
	{name:"inventory.repertoryCategory",mapping:"repertoryCategory"},
	{name:"inventory.repertoryCategoryName",mapping:"repertoryCategoryName"},
	{name:"inventory.startTime",mapping:"startTime",type:"date",dateFormat:"Y-m-d H:i:s"},
	{name:"inventory.endTime",mapping:"endTime",type:"date",dateFormat:"Y-m-d H:i:s"},
	{name:"inventory.userId",mapping:"userId"},
	{name:"inventory.userName",mapping:"userName"},
	{name:"inventory.providedDate",mapping:"providedDate"},
	{name:"inventory.department.depId",mapping:"department.depId"},
	{name:"inventory.department.depName",mapping:"department.depName"}
];
var InventoryHiddenField = [
	{xtype:"hidden",name:"inventory.inventoryId"},
	{xtype:"hidden",name:"inventory.userId"},
	{xtype:"hidden",name:"inventory.department.depId"},
	{xtype:"hidden",name:"inventory.inventoryCategorys"}
];
//===========================================================================//
var PractiCreditFieldMapping = [
	{name:"practiCredit.creditId",mapping:"creditId"},
	{name:"practiCredit.practiId",mapping:"practiId"},
	{name:"practiCredit.practiName",mapping:"practiName"},
	{name:"practiCredit.practiKindwork",mapping:"practiKindwork"},
	{name:"practiCredit.practiKindworkName",mapping:"practiKindworkName"},
	{name:"practiCredit.creditType",mapping:"creditType"},
	{name:"practiCredit.creditTypeName",mapping:"creditTypeName"},
	{name:"practiCredit.reason",mapping:"reason"},
	{name:"practiCredit.description",mapping:"description"},
	{name:"practiCredit.appraiseOrg",mapping:"appraiseOrg"},
	{name:"practiCredit.appraiseDate",mapping:"appraiseDate"},
	{name:"practiCredit.remark",mapping:"remark"}
];
var PractiCreditHiddenField = [
	{xtype:"hidden",name:"practiCredit.creditId"},
	{xtype:"hidden",name:"practiCredit.practiId"},
	{xtype:"hidden",name:"practiCredit.practiKindwork"}
];
//===========================================================================//
var StoreHouseFieldMapping = [
	{name:"storeHouse.storeId",mapping:"storeId"},
	{name:"storeHouse.storeSerial",mapping:"storeSerial"},
	{name:"storeHouse.storeName",mapping:"storeName"},
	{name:"storeHouse.address",mapping:"address"},
	{name:"storeHouse.area",mapping:"area"},
	{name:"storeHouse.linker",mapping:"linker"},
	{name:"storeHouse.linkTel",mapping:"linkTel"}
];
var StoreHouseHiddenField = [
	{xtype:"hidden",name:"storeHouse.storeId"}
];
var StoreHouseListViewField = [ "storeId", "storeSerial", "storeName", "address", "area", "linker", "linkTel","taskId","CONSUME_COUNTS","STORE_NAME"];
var StoreEquipStockListViewField = [ "equipStockId", "storeId", "equipId", "projectId", "stockType", "boundDate", "equipment", "project", "storeHouse", "exwSerial" ];
var StoreComponStockListViewField = [ "componStockId", "storeId", "componId", "projectId", "stockType", "counts", "boundDate", "component", "project", "storeHouse" ];
//===========================================================================//
var VerifyItemListViewField = [ "itemId", "itemName", "itemParent", "itemParentName", "vitemType", "vitemTypeName", "path", "level" ];
var VerifyItemDemandListViewField = [ "demandId", "itemId", "demandDes" ];
var VerifyStandardListViewField = [ "standardId", "relateId", "relateModule", "itemName", "parentName", "level", "demandDes", "standardResult", "remark", "summary" ];
//===========================================================================//
var CarFieldMapping = [
	{name:"car.carId",mapping:"carId"},
	{name:"car.idCard",mapping:"idCard"},
	{name:"car.licensePlate",mapping:"licensePlate"},
	{name:"car.sedan",mapping:"sedan"},
	{name:"car.propertyName",mapping:"propertyName"},
	{name:"car.engineNumber",mapping:"engineNumber"},
	{name:"car.scrapDate",mapping:"scrapDate",type:"date",dateFormat:"Y-m-d"},
	{name:"car.nominalLoad",mapping:"nominalLoad"},
	{name:"car.purchaseDate",mapping:"purchaseDate",type:"date",dateFormat:"Y-m-d"},
	{name:"car.propertyBelong",mapping:"propertyBelong"},
	{name:"car.driver",mapping:"driver"},
	{name:"car.driverPhone",mapping:"driverPhone"},
	{name:"car.disbursement",mapping:"disbursement"},
	{name:"car.remark",mapping:"remark"},
	{name:"car.status",mapping:"status"},
	{name:"car.statusName",mapping:"statusName"},
	{name:"car.delFlag",mapping:"delFlag"},
	{name:"car.carExpenseSet",mapping:"carExpenseSet"},
	{name:"car.carExpenses",mapping:"carExpenses"}
];
var CarHiddenField = [
	{xtype:"hidden",name:"car.carId"},
	{xtype:"hidden",name:"car.carExpenses"},
	{xtype:"hidden",name:"car.status"}
];
var CarListViewField = [ "carId", "licensePlate", "idCard", "sedan", "propertyName", "nominalLoad", "propertyBelong", "driver", "driverPhone", "disbursement", "status", "statusName" ];
var CarExpenseListViewField = [ "carExpenseId", "carId", "expense", "paymentAmount", "instructions", "practiName", "mileage", "oilWear", "spendDate", "remark" ];
//=============================================================================================================================================//
var LogisticsTransportFieldMapping = [
	{name:"logisticsTransport.transportId",mapping:"transportId"},
	{name:"logisticsTransport.dispatchId",mapping:"dispatchId"},
	{name:"logisticsTransport.autocraneDepend",mapping:"autocraneDepend"},
	{name:"logisticsTransport.autocraneDependName",mapping:"autocraneDependName"},
	{name:"logisticsTransport.kilometers",mapping:"kilometers"},
	{name:"logisticsTransport.transportSerial",mapping:"transportSerial"},
	{name:"logisticsTransport.transportTheme",mapping:"transportTheme"},
	{name:"logisticsTransport.batchNumber",mapping:"batchNumber"},
	{name:"logisticsTransport.deliveryDate",mapping:"deliveryDate"},
	{name:"logisticsTransport.expectedArriveDate",mapping:"expectedArriveDate"},
	{name:"logisticsTransport.deliveryMan",mapping:"deliveryMan"},
	{name:"logisticsTransport.deliveryPhone",mapping:"deliveryPhone"},
	{name:"logisticsTransport.deliveryEntId",mapping:"deliveryEntId"},
	{name:"logisticsTransport.deliveryEntName",mapping:"deliveryEntName"},
	{name:"logisticsTransport.receiveMan",mapping:"receiveMan"},
	{name:"logisticsTransport.receivePhone",mapping:"receivePhone"},
	{name:"logisticsTransport.receiveEntId",mapping:"receiveEntId"},
	{name:"logisticsTransport.knotCounts",mapping:"knotCounts"},
	{name:"logisticsTransport.strengthenCounts",mapping:"strengthenCounts"},
	{name:"logisticsTransport.knotBoltCounts",mapping:"knotBoltCounts"},
	{name:"logisticsTransport.wallAttacheQty",mapping:"wallAttacheQty"},
	{name:"logisticsTransport.projectPrincipal",mapping:"projectPrincipal"},
	{name:"logisticsTransport.finishedAmount",mapping:"finishedAmount"},
	{name:"logisticsTransport.remainderAmount",mapping:"remainderAmount"},
	{name:"logisticsTransport.equipment.equipId",mapping:"equipment.equipId"},
	{name:"logisticsTransport.equipment.exwSerial",mapping:"equipment.exwSerial"},
	{name:"logisticsTransport.equipment.equipSpecificName",mapping:"equipment.equipSpecificName"},
	{name:"logisticsTransport.equipment.recordId",mapping:"equipment.recordId"},
	{name:"logisticsTransport.receiveEntName",mapping:"receiveEntName"},
	{name:"logisticsTransport.materialPark",mapping:"materialPark"},
	{name:"logisticsTransport.transportAmount",mapping:"transportAmount"},
	{name:"logisticsTransport.projectId",mapping:"projectId"},
	{name:"logisticsTransport.projectSerial",mapping:"projectSerial"},
	{name:"logisticsTransport.projectName",mapping:"projectName"},
	{name:"logisticsTransport.address",mapping:"address"},
	{name:"logisticsTransport.signMan",mapping:"signMan"},
	{name:"logisticsTransport.signDate",mapping:"signDate"},
	{name:"logisticsTransport.signResult",mapping:"signResult"},
	{name:"logisticsTransport.statusName",mapping:"statusName"},
	{name:"logisticsTransport.fundStatusName",mapping:"fundStatusName"},
	{name:"logisticsTransport.remark",mapping:"remark"},
	{name:"logisticsTransport.transportEntName",mapping:"transportEntName"},
	{name:"logisticsTransport.transportContactTel",mapping:"transportContactTel"},
	{name:"logisticsTransport.transportBankDeposit",mapping:"transportBankDeposit"},
	{name:"logisticsTransport.transportBankAccount",mapping:"transportBankAccount"},
	{name:"logisticsTransport.shipmentsTheme",mapping:"shipmentsTheme"},
	{name:"logisticsTransport.dispatchDate",mapping:"dispatchDate"},
	{name:"logisticsTransport.relateSerial",mapping:"relateSerial"},
	{name:"logisticsTransport.originator",mapping:"originator"},
	{name:"logisticsTransport.licensePlate",mapping:"licensePlate"},
	{name:"logisticsTransport.driver",mapping:"driver"},
	{name:"logisticsTransport.driverPhone",mapping:"driverPhone"},
	{name:"logisticsTransport.originalSerial",mapping:"originalSerial"}
];
var LogisticsTransportHiddenField = [
	{xtype:"hidden",name:"logisticsTransport.transportId"},
	{xtype:"hidden",name:"logisticsTransport.dispatchId"},
	{xtype:"hidden",name:"logisticsTransport.deliveryEntId"},
	{xtype:"hidden",name:"logisticsTransport.receiveEntId"},
	{xtype:"hidden",name:"logisticsTransport.equipment.equipId"},
	{xtype:"hidden",name:"logisticsTransport.projectId"},
	{xtype:"hidden",name:"logisticsTransport.projectSerial"},
	{xtype:"hidden",name:"logisticsTransport.logisticsTrandetails"},
	{xtype:"hidden",name:"logisticsTransport.logisticsDestributions"},
	{xtype:"hidden",name:"logisticsTransport.logisticsTranDistributionbutions"},
	{xtype:"hidden",name:"logisticsTransport.logisticsTrancarfees"},
	{xtype:"hidden",name:"logisticsTransport.transportSerial"}
];
var LogisticsTransportListViewField = [ "transportId", "transportSerial", "deliveryDate", "deliveryMan", "deliveryEntId", "deliveryEntName", "receiveEntId", "receiveEntName", "knotCounts", "strengthenCounts", "knotBoltCounts", "wallAttacheQty", "projectPrincipal", "finishedAmount", "remainderAmount", "transportAmount", "projectId", "projectName", "projectSerial", "address", "signDate", "summary", "transportEntName", "transportContactTel", "transportBankDeposit", "transportBankAccount", "autocraneDepend", "autocraneDependName", "status", "statusName", "fundStatus", "fundStatusName", "equipment","applyforState", "signResult","shipmentsTheme","dispatchDate","relateSerial","originator","licensePlate","driver","driverPhone","relateSerial","acceptTime","approveTime","remark" ];
var LogisticsTrandetailListViewField = [ "trandetailId", "transportId", "dispatchId", "dispatchSerial", "dispatchTheme", "carId", "licensePlate", "driver", "driverPhone", "counts", "signCounts", "remark", "dispatchCompon","iniCounts","calculate","dimensions","componGenericName","equipVender","component"];
var LogisticsTrancarfeeListViewField = [ "trancarfeeId", "transportId", "carId", "licensePlate", "motorcoach", "unitPrice", "sedan", "propertyName", "amount", "remark" ];
var LogisticsDestributionListViewField = [ "destributionId", "transportId", "quantity", "componSpecific","componSpecificName", "componGenericName", "componGeneric"];
var LogisticsTranDestributionListViewField = [ "destributionId", "transportId", "dimensions","quantity", "componSpecific","calculate","componSpecificName","commSpecificName", "componGenericName"
								, "componGeneric","fillCounts","equipVender","disAllInitId","chargeNum","price","amount"];
//=============================================================================================================================================//
var LogisticsBacksportFieldMapping = [
	{name:"logisticsBacksport.backsportId",mapping:"backsportId"},
	{name:"logisticsBacksport.autocraneDepend",mapping:"autocraneDepend"},
	{name:"logisticsBacksport.autocraneDependName",mapping:"autocraneDependName"},
	{name:"logisticsBacksport.kilometers",mapping:"kilometers"},
	{name:"logisticsBacksport.backsportSerial",mapping:"backsportSerial"},
	{name:"logisticsBacksport.backsportTheme",mapping:"backsportTheme"},
	{name:"logisticsBacksport.batchNumber",mapping:"batchNumber"},
	{name:"logisticsBacksport.deliveryDate",mapping:"deliveryDate"},
	{name:"logisticsBacksport.expectedArriveDate",mapping:"expectedArriveDate"},
	{name:"logisticsBacksport.deliveryMan",mapping:"deliveryMan"},
	{name:"logisticsBacksport.deliveryPhone",mapping:"deliveryPhone"},
	{name:"logisticsBacksport.receiveMan",mapping:"receiveMan"},
	{name:"logisticsBacksport.receivePhone",mapping:"receivePhone"},
	{name:"logisticsBacksport.materialPark",mapping:"materialPark"},
	{name:"logisticsTransport.knotCounts",mapping:"knotCounts"},
	{name:"logisticsTransport.strengthenCounts",mapping:"strengthenCounts"},
	{name:"logisticsTransport.knotBoltCounts",mapping:"knotBoltCounts"},
	{name:"logisticsTransport.wallAttacheQty",mapping:"wallAttacheQty"},
	{name:"logisticsTransport.projectPrincipal",mapping:"projectPrincipal"},
	{name:"logisticsTransport.finishedAmount",mapping:"finishedAmount"},
	{name:"logisticsTransport.remainderAmount",mapping:"remainderAmount"},
	{name:"logisticsTransport.equipment.equipId",mapping:"equipment.equipId"},
	{name:"logisticsTransport.equipment.exwSerial",mapping:"equipment.exwSerial"},
	{name:"logisticsTransport.equipment.equipSpecificName",mapping:"equipment.equipSpecificName"},
	{name:"logisticsTransport.equipment.recordId",mapping:"equipment.recordId"},
	{name:"logisticsBacksport.backsportAmount",mapping:"backsportAmount"},
	{name:"logisticsBacksport.projectId",mapping:"projectId"},
	{name:"logisticsBacksport.projectSerial",mapping:"projectSerial"},
	{name:"logisticsBacksport.projectName",mapping:"projectName"},
	{name:"logisticsBacksport.address",mapping:"address"},
	{name:"logisticsBacksport.signMan",mapping:"signMan"},
	{name:"logisticsBacksport.signDate",mapping:"signDate"},
	{name:"logisticsBacksport.signResult",mapping:"signResult"},
	{name:"logisticsBacksport.statusName",mapping:"statusName"},
	{name:"logisticsBacksport.fundStatusName",mapping:"fundStatusName"},
	{name:"logisticsBacksport.remark",mapping:"remark"},
	{name:"logisticsBacksport.backsportEntName",mapping:"backsportEntName"},
	{name:"logisticsBacksport.backsportContactTel",mapping:"backsportContactTel"},
	{name:"logisticsBacksport.backsportBankDeposit",mapping:"backsportBankDeposit"},
	{name:"logisticsBacksport.backsportBankAccount",mapping:"backsportBankAccount"},
	{name:"logisticsBacksport.summary",mapping:"summary"}
];
var LogisticsBacksportHiddenField = [
	{xtype:"hidden",name:"logisticsBacksport.backsportId"},
	{xtype:"hidden",name:"logisticsBacksport.equipment.equipId"},
	{xtype:"hidden",name:"logisticsBacksport.projectId"},
	{xtype:"hidden",name:"logisticsBacksport.projectSerial"},
	{xtype:"hidden",name:"logisticsBacksport.logisticsBackdetails"},
	{xtype:"hidden",name:"logisticsBacksport.logisticsBackdetail2s"},
	{xtype:"hidden",name:"logisticsBacksport.isCompon"},
	{xtype:"hidden",name:"logisticsBacksport.logisticsBackcarfees"}
];
var LogisticsBacksportListViewField = [ "backsportId", "backsportSerial", "deliveryDate", "deliveryMan", "knotCounts", "strengthenCounts", "knotBoltCounts", "wallAttacheQty", "projectPrincipal", "finishedAmount", "remainderAmount", "backsportAmount", "projectId", "projectSerial", "projectName", "address", "signDate", "autocraneDepend", "autocraneDependName", "status", "statusName", "fundStatus", "fundStatusName", "summary", "backsportEntName", "backsportContactTel", "backsportBankDeposit", "backsportBankAccount", "equipment","isCompon", "signResult"];
var LogisticsBackdetailListViewField = [ "backdetailId", "backsportId", "carId", "licensePlate", "driver", "driverPhone", "counts", "remark", "componDiary" ];
var LogisticsBackdetail2ListViewField = [ "backdetailId", "backsportId", "carId", "licensePlate", "driver", "driverPhone", "counts", "remark", "component" ];
var LogisticsBackcarfeeListViewField = [ "backcarfeeId", "backsportId", "carId", "licensePlate", "motorcoach", "unitPrice", "sedan", "propertyName", "amount", "remark" ];
//=============================================================================================================================================//
var VerifySelfFieldMapping = [
	{name:"verifySelf.selfId",mapping:"selfId"},
	{name:"verifySelf.selfSerial",mapping:"selfSerial"},
	{name:"verifySelf.relateId",mapping:"relateId"},
	{name:"verifySelf.relateModule",mapping:"relateModule"},
	{name:"verifySelf.equipFlow.flowId",mapping:"equipFlow.flowId"},
	{name:"verifySelf.equipFlow.equipDiary.projectName",mapping:"equipFlow.equipDiary.projectName"},
	{name:"verifySelf.equipFlow.equipDiary.address",mapping:"equipFlow.equipDiary.address"},
	{name:"verifySelf.equipFlow.equipDiary.equipGenericName",mapping:"equipFlow.equipDiary.equipGenericName"},
	{name:"verifySelf.equipFlow.equipDiary.equipSpecificName",mapping:"equipFlow.equipDiary.equipSpecificName"},
	{name:"verifySelf.equipFlow.equipDiary.recordId",mapping:"equipFlow.equipDiary.recordId"},
	{name:"verifySelf.equipFlow.equipDiary.equipVender",mapping:"equipFlow.equipDiary.equipVender"},
	{name:"verifySelf.equipFlow.equipDiary.exwSerial",mapping:"equipFlow.equipDiary.exwSerial"},
	{name:"verifySelf.equipFlow.equipDiary.exwDate",mapping:"equipFlow.equipDiary.exwDate"},
	{name:"verifySelf.equipFlow.equipInstall.installHeight",mapping:"equipFlow.equipInstall.installHeight"},
	{name:"verifySelf.equipFlow.equipInstall.principal",mapping:"equipFlow.equipInstall.principal"},
	{name:"verifySelf.inEnt",mapping:"inEnt"},
	{name:"verifySelf.inEntName",mapping:"inEntName"},
	{name:"verifySelf.inEntCertNum",mapping:"inEntCertNum"},
	{name:"verifySelf.inEntCertType",mapping:"inEntCertType"},
	{name:"verifySelf.maxHeight",mapping:"maxHeight"},
	{name:"verifySelf.selfVerifyMan",mapping:"selfVerifyMan"},
	{name:"verifySelf.userId",mapping:"userId"},
	{name:"verifySelf.userName",mapping:"userName"},
	{name:"verifySelf.providedDate",mapping:"providedDate"},
	{name:"verifySelf.remark",mapping:"remark"},
	{name:"verifySelf.department.depId",mapping:"department.depId"},
	{name:"verifySelf.department.depName",mapping:"department.depName"},
	{name:"verifySelf.selfStandards",mapping:"selfStandards"},
	{name:"verifySelf.checkAmplitude",mapping:"checkAmplitude"}
];
var VerifySelfHiddenField = [
	{xtype:"hidden",name:"verifySelf.selfId"},
	{xtype:"hidden",name:"verifySelf.relateId"},
	{xtype:"hidden",name:"verifySelf.relateModule"},
	{xtype:"hidden",name:"verifySelf.equipFlow.flowId"},
	{xtype:"hidden",name:"verifySelf.inEnt"},
	{xtype:"hidden",name:"verifySelf.userId"},
	{xtype:"hidden",name:"verifySelf.department.depId"},
	{xtype:"hidden",name:"verifySelf.selfStandards"}
];
var VerifySelfListViewField = [ "selfId", "selfSerial", "inEntName", "equipFlow" ];
//=============================================================================================================================================//
var RiskFieldMapping=[
	{name:"risk.riskId",mapping:"riskId"},
	{name:"risk.riskSerial",mapping:"riskSerial"},
	{name:"risk.riskTheme",mapping:"riskTheme"},
	{name:"risk.checkDepartment",mapping:"checkDepartment"},
	{name:"risk.checkCustom",mapping:"checkCustom"},
	{name:"risk.checkCustomName",mapping:"checkCustomName"},
	{name:"risk.inspector",mapping:"inspector"},
	{name:"risk.rectifyEnt",mapping:"rectifyEnt"},
	{name:"risk.rectifyEntName",mapping:"rectifyEntName"},
	{name:"risk.riskDesc",mapping:"riskDesc"},
	{name:"risk.improvePerson",mapping:"improvePerson"},
	{name:"risk.improveDate",mapping:"improveDate"},
	{name:"risk.checkPerson",mapping:"checkPerson"},
	{name:"risk.checkDate",mapping:"checkDate"},
	{name:"risk.reviewOpinion",mapping:"reviewOpinion"},
	{name:"risk.reviewPerson",mapping:"reviewPerson"},
	{name:"risk.reviewDate",mapping:"reviewDate"},
	{name:"risk.status",mapping:"status"},
	{name:"risk.equipment.equipId",mapping:"equipment.equipId"},
	{name:"risk.equipment.equipGenericName",mapping:"equipment.equipGenericName"},
	{name:"risk.equipment.equipSpecificName",mapping:"equipment.equipSpecificName"},
	{name:"risk.equipment.recordId",mapping:"equipment.recordId"},
	{name:"risk.equipment.exwSerial",mapping:"equipment.exwSerial"},
	{name:"risk.project.projectId",mapping:"project.projectId"},
	{name:"risk.project.projectName",mapping:"project.projectName"},
	{name:"risk.project.address",mapping:"project.address"}
];
var RiskHiddenField = [
	{xtype:"hidden",name:"risk.riskId"},
	{xtype:"hidden",name:"risk.checkCustom"},
	{xtype:"hidden",name:"risk.rectifyEnt"},
	{xtype:"hidden",name:"risk.equipment.equipId"},
	{xtype:"hidden",name:"risk.project.projectId"}
];
var RiskListViewField = [ "riskId", "riskSerial", "checkCustomName", "improvePerson", "checkDate", "status", "equipment", "project" ];
//=============================================================================================================================================//
var RiskReportFieldMapping = [
	{name:"riskReport.riskReportId",mapping:"riskReportId"},
	{name:"riskReport.reportSerial",mapping:"reportSerial"},
	{name:"riskReport.checkPosition",mapping:"checkPosition"},
	{name:"riskReport.improvePerson",mapping:"improvePerson"},
	{name:"riskReport.completeDate",mapping:"completeDate"},
	{name:"riskReport.improveDesc",mapping:"improveDesc"},
	{name:"riskReport.improveResult",mapping:"improveResult"},
	{name:"riskReport.remark",mapping:"remark"},
	{name:"riskReport.risk.riskId",mapping:"risk.riskId"},
	{name:"riskReport.risk.riskSerial",mapping:"risk.riskSerial"},
	{name:"riskReport.risk.checkCustomName",mapping:"risk.checkCustomName"},
	{name:"riskReport.risk.equipment.equipGenericName",mapping:"risk.equipment.equipGenericName"},
	{name:"riskReport.risk.equipment.exwSerial",mapping:"risk.equipment.exwSerial"},
	{name:"riskReport.risk.equipment.recordId",mapping:"risk.equipment.recordId"},
	{name:"riskReport.risk.equipment.equipSpecificName",mapping:"risk.equipment.equipSpecificName"},
	{name:"riskReport.risk.project.projectName",mapping:"risk.project.projectName"},
	{name:"riskReport.risk.project.address",mapping:"risk.project.address"}
];
var RiskReportHiddenField = [
	{xtype:"hidden",name:"riskReport.riskReportId"},
	{xtype:"hidden",name:"riskReport.risk.riskId"}
];
var RiskReportListViewField = [ "riskReportId", "reportSerial", "checkPosition", "improvePerson", "completeDate", "improveResult", "risk" ];
//===========================================================================//
var AccidentFieldMapping = [
	{name:"accident.accidentId",mapping:"accidentId"},
	{name:"accident.accidentSerial",mapping:"accidentSerial"},
	{name:"accident.accidentDate",mapping:"accidentDate"},
	{name:"accident.responsibleUnit",mapping:"responsibleUnit"},
	{name:"accident.responsible",mapping:"responsible"},
	{name:"accident.accidentCategory",mapping:"accidentCategory"},
	{name:"accident.accidentLevel",mapping:"accidentLevel"},
	{name:"accident.accidentLevelName",mapping:"accidentLevelName"},
	{name:"accident.injuries",mapping:"injuries"},
	{name:"accident.deaths",mapping:"deaths"},
	{name:"accident.category",mapping:"category"},
	{name:"accident.economicLosses",mapping:"economicLosses"},
	{name:"accident.accidentDesc",mapping:"accidentDesc"},
	{name:"accident.accidentReason",mapping:"accidentReason"},
	{name:"accident.accidentResult",mapping:"accidentResult"},
	{name:"accident.equipRepairDesc",mapping:"equipRepairDesc"},
	{name:"accident.providedDate",mapping:"providedDate"},
	{name:"accident.address",mapping:"address"},
	{name:"accident.accidentReportId",mapping:"accidentReportId"},
	{name:"accident.status",mapping:"status"},
	{name:"accident.equipment.equipId",mapping:"equipment.equipId"},
	{name:"accident.equipment.equipGenericName",mapping:"equipment.equipGenericName"},
	{name:"accident.equipment.equipSpecificName",mapping:"equipment.equipSpecificName"},
	{name:"accident.equipment.recordId",mapping:"equipment.recordId"},
	{name:"accident.equipment.exwSerial",mapping:"equipment.exwSerial"},
	{name:"accident.project.projectId",mapping:"project.projectId"},
	{name:"accident.project.projectName",mapping:"project.projectName"}
];
var AccidentHiddenField = [
	{xtype:"hidden",name:"accident.accidentId"},
	{xtype:"hidden",name:"accident.equipment.equipId"},
	{xtype:"hidden",name:"accident.project.projectId"}
];
var AccidentListViewField = [ "accidentId", "accidentSerial", "accidentDate", "responsibleUnit", "responsible", "accidentCategory", "accidentLevel", "accidentLevelName", "providedDate", "address", "status", "equipment", "project" ];
//=============================================================================================================================================//
var AccidentReportFieldMapping = [
	{name:"accidentReport.accidentReportId",mapping:"accidentReportId"},
	{name:"accidentReport.reportSerial",mapping:"reportSerial"},
	{name:"accidentReport.providedDate",mapping:"providedDate"},
	{name:"accidentReport.providedUnit",mapping:"providedUnit"},
	{name:"accidentReport.prevent",mapping:"prevent"},
	{name:"accidentReport.participants",mapping:"participants"},
	{name:"accidentReport.accident.accidentId",mapping:"accident.accidentId"},
	{name:"accidentReport.accident.accidentCategory",mapping:"accident.accidentCategory"},
	{name:"accidentReport.accident.responsible",mapping:"accident.responsible"},
	{name:"accidentReport.accident.accidentSerial",mapping:"accident.accidentSerial"},
	{name:"accidentReport.accident.accidentLevelName",mapping:"accident.accidentLevelName"},
	{name:"accidentReport.accident.accidentDate",mapping:"accident.accidentDate"},
	{name:"accidentReport.accident.address",mapping:"accident.address"},
	{name:"accidentReport.accident.responsibleUnit",mapping:"accident.responsibleUnit"},
	{name:"accidentReport.accident.equipment.equipGenericName",mapping:"accident.equipment.equipGenericName"},
	{name:"accidentReport.accident.equipment.equipSpecificName",mapping:"accident.equipment.equipSpecificName"},
	{name:"accidentReport.accident.equipment.recordId",mapping:"accident.equipment.recordId"},
	{name:"accidentReport.accident.equipment.exwSerial",mapping:"accident.equipment.exwSerial"},
	{name:"accidentReport.accident.project.projectName",mapping:"accident.project.projectName"}
];
var AccidentReportHiddenField = [
    {xtype:"hidden",name:"accidentReport.accidentReportId"},
	{xtype:"hidden",name:"accidentReport.accident.accidentId"}
];
var AccidentReportListViewField = [ "accidentReportId", "reportSerial", "providedDate", "providedUnit", "prevent", "participants", "accident" ];
//===========================================================================//
var SecureProtocolFieldMapping = [
	{name:"secureProtocol.protocolId",mapping:"protocolId"},
	{name:"secureProtocol.protocolSerial",mapping:"protocolSerial"},
	{name:"secureProtocol.providedDate",mapping:"providedDate"},
	{name:"secureProtocol.emEnt",mapping:"emEnt"},
	{name:"secureProtocol.emEntModule",mapping:"emEntModule"},
	{name:"secureProtocol.emEntName",mapping:"emEntName"},
	{name:"secureProtocol.inEnt",mapping:"inEnt"},
	{name:"secureProtocol.inEntModule",mapping:"inEntModule"},
	{name:"secureProtocol.inEntName",mapping:"inEntName"},
	{name:"secureProtocol.inEntCertNum",mapping:"inEntCertNum"},
	{name:"secureProtocol.inEntTitleLevel",mapping:"inEntTitleLevel"},
	{name:"secureProtocol.finalHeight",mapping:"finalHeight"},
	{name:"secureProtocol.wallAttacheQty",mapping:"wallAttacheQty"},
	{name:"secureProtocol.remark",mapping:"remark"},
	{name:"secureProtocol.relateModule",mapping:"relateModule"},
	{name:"secureProtocol.project.projectId",mapping:"project.projectId"},
	{name:"secureProtocol.project.projectName",mapping:"project.projectName"},
	{name:"secureProtocol.project.address",mapping:"project.address"},
	{name:"secureProtocol.contractLease.contractId",mapping:"contractLease.contractId"},
	{name:"secureProtocol.equipment.equipId",mapping:"equipment.equipId"},
	{name:"secureProtocol.equipment.equipGenericName",mapping:"equipment.equipGenericName"},
	{name:"secureProtocol.equipment.equipSpecificName",mapping:"equipment.equipSpecificName"},
	{name:"secureProtocol.equipment.recordId",mapping:"equipment.recordId"},
	{name:"secureProtocol.equipment.exwSerial",mapping:"equipment.exwSerial"}
];
var SecureProtocolHiddenField = [
	{xtype:"hidden",name:"secureProtocol.protocolId"},
	{xtype:"hidden",name:"secureProtocol.emEnt"},
	{xtype:"hidden",name:"secureProtocol.emEntModule"},
	{xtype:"hidden",name:"secureProtocol.inEnt"},
	{xtype:"hidden",name:"secureProtocol.inEntModule"},
	{xtype:"hidden",name:"secureProtocol.relateModule"},
	{xtype:"hidden",name:"secureProtocol.project.projectId"},
	{xtype:"hidden",name:"secureProtocol.contractLease.contractId"},
	{xtype:"hidden",name:"secureProtocol.equipment.equipId"}
];
var SecureProtocolListViewField = [ "protocolId", "protocolSerial", "providedDate", "emEntName", "inEntName", "project", "equipment" ];
//===========================================================================//
var IndisProtocolFieldMapping = [
	{name:"indisProtocol.protocolId",mapping:"protocolId"},
	{name:"indisProtocol.protocolSerial",mapping:"protocolSerial"},
	{name:"indisProtocol.providedDate",mapping:"providedDate"},
	{name:"indisProtocol.emEnt",mapping:"emEnt"},
	{name:"indisProtocol.emEntModule",mapping:"emEntModule"},
	{name:"indisProtocol.emEntName",mapping:"emEntName"},
	{name:"indisProtocol.inEnt",mapping:"inEnt"},
	{name:"indisProtocol.inEntModule",mapping:"inEntModule"},
	{name:"indisProtocol.inEntName",mapping:"inEntName"},
	{name:"indisProtocol.inEntCertNum",mapping:"inEntCertNum"},
	{name:"indisProtocol.inEntTitleLevel",mapping:"inEntTitleLevel"},
	{name:"indisProtocol.initialHeight",mapping:"initialHeight"},
	{name:"indisProtocol.finalHeight",mapping:"finalHeight"},
	{name:"indisProtocol.wallAttacheQty",mapping:"wallAttacheQty"},
	{name:"indisProtocol.remark",mapping:"remark"},
	{name:"indisProtocol.relateModule",mapping:"relateModule"},
	{name:"indisProtocol.project.projectId",mapping:"project.projectId"},
	{name:"indisProtocol.project.projectName",mapping:"project.projectName"},
	{name:"indisProtocol.project.address",mapping:"project.address"},
	{name:"indisProtocol.contractLease.contractId",mapping:"contractLease.contractId"}
];
var IndisProtocolHiddenField = [
	{xtype:"hidden",name:"indisProtocol.protocolId"},
	{xtype:"hidden",name:"indisProtocol.emEnt"},
	{xtype:"hidden",name:"indisProtocol.emEntModule"},
	{xtype:"hidden",name:"indisProtocol.inEnt"},
	{xtype:"hidden",name:"indisProtocol.inEntModule"},
	{xtype:"hidden",name:"indisProtocol.relateModule"},
	{xtype:"hidden",name:"indisProtocol.project.projectId"},
	{xtype:"hidden",name:"indisProtocol.contractLease.contractId"},
	{xtype:"hidden",name:"indisProtocol.indisProtocolEquips"}
];
var IndisProtocolListViewField = [ "protocolId", "protocolSerial", "providedDate", "emEntName", "inEntName", "inEntCertNum", "project" ];
var IndisProtocolEquipListViewField = [ "protocolEquipId", "protocolId", "quantity", "height", "amount", "summary", "equipment" ];
//===========================================================================//
var IndisSchemaFieldMapping = [
	{name:"indisSchema.schemaId",mapping:"schemaId"},
	{name:"indisSchema.schemaSerial",mapping:"schemaSerial"},
	{name:"indisSchema.providedDate",mapping:"providedDate"},
	{name:"indisSchema.emEnt",mapping:"emEnt"},
	{name:"indisSchema.emEntModule",mapping:"emEntModule"},
	{name:"indisSchema.emEntName",mapping:"emEntName"},
	{name:"indisSchema.inEnt",mapping:"inEnt"},
	{name:"indisSchema.inEntModule",mapping:"inEntModule"},
	{name:"indisSchema.inEntName",mapping:"inEntName"},
	{name:"indisSchema.inEntCertNum",mapping:"inEntCertNum"},
	{name:"indisSchema.inEntTitleLevel",mapping:"inEntTitleLevel"},
	{name:"indisSchema.technicalDirector",mapping:"technicalDirector"},
	{name:"indisSchema.technicalPhone",mapping:"technicalPhone"},
	{name:"indisSchema.secureDirector",mapping:"secureDirector"},
	{name:"indisSchema.securePhone",mapping:"securePhone"},
	{name:"indisSchema.schemaDesigner",mapping:"schemaDesigner"},
	{name:"indisSchema.schemaPhone",mapping:"schemaPhone"},
	{name:"indisSchema.overallHeight",mapping:"overallHeight"},
	{name:"indisSchema.finalHeight",mapping:"finalHeight"},
	{name:"indisSchema.blockNumber",mapping:"blockNumber"},
	{name:"indisSchema.remark",mapping:"remark"},
	{name:"indisSchema.boomLength",mapping:"boomLength"},
	{name:"indisSchema.axisPosition",mapping:"axisPosition"},
	{name:"indisSchema.projectPrincipal",mapping:"projectPrincipal"},
	{name:"indisSchema.userId",mapping:"userId"},
	{name:"indisSchema.userName",mapping:"userName"},
	{name:"indisSchema.depId",mapping:"depId"},
	{name:"indisSchema.department.depId",mapping:"department.depId"},
	{name:"indisSchema.department.depName",mapping:"department.depName"},
	{name:"indisSchema.issuer",mapping:"issuer"},
	{name:"indisSchema.issuerDepartment",mapping:"issuerDepartment"},
	{name:"indisSchema.applyforUserId",mapping:"applyforUserId"},
	{name:"indisSchema.applyforState",mapping:"applyforState"},
	{name:"indisSchema.applyforStateName",mapping:"applyforStateName"},
	{name:"indisSchema.indisSchemaPractis",mapping:"indisSchemaPractis"},
	{name:"indisSchema.relateModule",mapping:"relateModule"},
	{name:"indisSchema.project.projectId",mapping:"project.projectId"},
	{name:"indisSchema.project.projectName",mapping:"project.projectName"},
	{name:"indisSchema.project.address",mapping:"project.address"},
	//{name:"indisSchema.contractLease.contractId",mapping:"contractLease.contractId"},
	{name:"indisSchema.equipment.equipId",mapping:"equipment.equipId"},
	{name:"indisSchema.equipment.equipGenericName",mapping:"equipment.equipGenericName"},
	{name:"indisSchema.equipment.equipSpecificName",mapping:"equipment.equipSpecificName"},
	{name:"indisSchema.equipment.recordId",mapping:"equipment.recordId"},
	{name:"indisSchema.equipment.exwSerial",mapping:"equipment.exwSerial"}
];
var IndisSchemaHiddenField = [
	{xtype:"hidden",name:"indisSchema.schemaId"},
	{xtype:"hidden",name:"indisSchema.userId"},
	{xtype:"hidden",name:"indisSchema.department.depId"},
	{xtype:"hidden",name:"indisSchema.indisSchemaPractis"},
	{xtype:"hidden",name:"indisSchema.emEnt"},
	{xtype:"hidden",name:"indisSchema.emEntModule"},
	{xtype:"hidden",name:"indisSchema.inEnt"},
	{xtype:"hidden",name:"indisSchema.inEntModule"},
	{xtype:"hidden",name:"indisSchema.relateModule"},
	{xtype:"hidden",name:"indisSchema.project.projectId"},
	//{xtype:"hidden",name:"indisSchema.contractLease.contractId"},
	{xtype:"hidden",name:"indisSchema.equipment.equipId"}
];
var IndisSchemaListViewField = [ "schemaId", "schemaSerial", "providedDate", "emEntName", "inEntName", "project", "equipment", "blockNumber", "issuer", "issuerDepartment", "applyforUserId", "applyforState", "applyforStateName" ];
var IndisSchemaPractiListViewField = [ "schemaPractiId", "schemaId", "certId", "practiId", "practiName", "certNum", "practiKindwork" ];
//===========================================================================//
var IndisNoticeFieldMapping = [
	{name:"indisNotice.noticeId",mapping:"noticeId"},
	{name:"indisNotice.contractNumber",mapping:"contractNumber"},
	{name:"indisNotice.constructId",mapping:"constructId"},
	{name:"indisNotice.plannedDate",mapping:"plannedDate"},
	{name:"indisNotice.workDate",mapping:"workDate"},
	{name:"indisNotice.remark",mapping:"remark"},
	{name:"indisNotice.relateModule",mapping:"relateModule"},
	{name:"indisNotice.acceptNumber",mapping:"acceptNumber"},
	{name:"indisNotice.indisSchema.project.projectName",mapping:"indisSchema.project.projectName"},
	{name:"indisNotice.indisSchema.project.address",mapping:"indisSchema.project.address"},
	{name:"indisNotice.indisSchema.equipment.equipGenericName",mapping:"indisSchema.equipment.equipGenericName"},
	{name:"indisNotice.indisSchema.equipment.equipSpecificName",mapping:"indisSchema.equipment.equipSpecificName"},
	{name:"indisNotice.indisSchema.equipment.recordId",mapping:"indisSchema.equipment.recordId"},
	{name:"indisNotice.indisSchema.equipment.exwSerial",mapping:"indisSchema.equipment.exwSerial"},
	{name:"indisNotice.indisSchema.inEntName",mapping:"indisSchema.inEntName"},
	{name:"indisNotice.indisSchema.inEntCertNum",mapping:"indisSchema.inEntCertNum"},
	{name:"indisNotice.indisSchema.inEntTitleLevel",mapping:"indisSchema.inEntTitleLevel"}
];
var IndisNoticeHiddenField = [
    {xtype:"hidden",name:"indisNotice.noticeId"},
    {xtype:"hidden",name:"indisNotice.relateModule"},
    {xtype:"hidden",name:"indisNotice.indisNoticePractis"},
    {xtype:"hidden",name:"indisNotice.indisNoticeManagers"},
	{xtype:"hidden",name:"indisNotice.schemaId"},
	{xtype:"hidden",name:"indisNotice.constructId"}
];
var IndisNoticeListViewField = [ "noticeId","contractNumber", "plannedDate", "remark", "relateModule", "indisSchema","constructOperation","constructId","certNum","certLevel" ];
var IndisNoticePractiListViewField = [ "noticePractiId", "noticeId", "certId", "practiId", "practiName", "certNum", "practiKindwork","idCard","mobile","type" ];
var IndisNoticeConstructListViewField = [ "noticeConstructId", "noticeId", "certId", "practiId", "practiName", "certNum", "practiKindwork","idCard","mobile"];
//===========================================================================//
var ContingencyPlanFieldMapping = [
	{name:"contingencyPlan.contingencyId",mapping:"contingencyId"},
	{name:"contingencyPlan.contingencySerial",mapping:"contingencySerial"},
	{name:"contingencyPlan.providedDate",mapping:"providedDate"},
	{name:"contingencyPlan.emEnt",mapping:"emEnt"},
	{name:"contingencyPlan.emEntModule",mapping:"emEntModule"},
	{name:"contingencyPlan.emEntName",mapping:"emEntName"},
	{name:"contingencyPlan.inEnt",mapping:"inEnt"},
	{name:"contingencyPlan.inEntModule",mapping:"inEntModule"},
	{name:"contingencyPlan.inEntName",mapping:"inEntName"},
	{name:"contingencyPlan.inEntCertNum",mapping:"inEntCertNum"},
	{name:"contingencyPlan.inEntTitleLevel",mapping:"inEntTitleLevel"},
	{name:"contingencyPlan.overallHeight",mapping:"overallHeight"},
	{name:"contingencyPlan.finalHeight",mapping:"finalHeight"},
	{name:"contingencyPlan.contingencyPhone",mapping:"contingencyPhone"},
	{name:"contingencyPlan.remark",mapping:"remark"},
	{name:"contingencyPlan.relateModule",mapping:"relateModule"},
	{name:"contingencyPlan.project.projectId",mapping:"project.projectId"},
	{name:"contingencyPlan.project.projectName",mapping:"project.projectName"},
	{name:"contingencyPlan.project.address",mapping:"project.address"},
	{name:"contingencyPlan.contractLease.contractId",mapping:"contractLease.contractId"},
	{name:"contingencyPlan.equipment.equipId",mapping:"equipment.equipId"},
	{name:"contingencyPlan.equipment.equipGenericName",mapping:"equipment.equipGenericName"},
	{name:"contingencyPlan.equipment.equipSpecificName",mapping:"equipment.equipSpecificName"},
	{name:"contingencyPlan.equipment.recordId",mapping:"equipment.recordId"},
	{name:"contingencyPlan.equipment.exwSerial",mapping:"equipment.exwSerial"}
];
var ContingencyPlanHiddenField = [
	{xtype:"hidden",name:"contingencyPlan.contingencyId"},
	{xtype:"hidden",name:"contingencyPlan.emEnt"},
	{xtype:"hidden",name:"contingencyPlan.emEntModule"},
	{xtype:"hidden",name:"contingencyPlan.inEnt"},
	{xtype:"hidden",name:"contingencyPlan.inEntModule"},
	{xtype:"hidden",name:"contingencyPlan.relateModule"},
	{xtype:"hidden",name:"contingencyPlan.project.projectId"},
	{xtype:"hidden",name:"contingencyPlan.contractLease.contractId"},
	{xtype:"hidden",name:"contingencyPlan.equipment.equipId"},
	{xtype:"hidden",name:"contingencyPlan.contingencyWorkers"}
];
var ContingencyPlanListViewField = [ "contingencyId", "contingencySerial", "providedDate", "emEntName", "inEntName", "contingencyPhone", "project", "equipment" ];
var ContingencyWorkerListViewField = [ "workerId", "contingencyId", "name", "duties", "contingencyDuties", "phone" ];
//===========================================================================//
var IndisPrecheckFieldMapping = [
	{name:"indisPrecheck.precheckId",mapping:"precheckId"},
	{name:"indisPrecheck.precheckSerial",mapping:"precheckSerial"},
	{name:"indisPrecheck.providedDate",mapping:"providedDate"},
	{name:"indisPrecheck.inEnt",mapping:"inEnt"},
	{name:"indisPrecheck.inEntModule",mapping:"inEntModule"},
	{name:"indisPrecheck.inEntName",mapping:"inEntName"},
	{name:"indisPrecheck.inEntCertNum",mapping:"inEntCertNum"},
	{name:"indisPrecheck.inEntTitleLevel",mapping:"inEntTitleLevel"},
	{name:"indisPrecheck.initialHeight",mapping:"initialHeight"},
	{name:"indisPrecheck.finalHeight",mapping:"finalHeight"},
	{name:"indisPrecheck.wallAttacheQty",mapping:"wallAttacheQty"},
	{name:"indisPrecheck.buildingNum",mapping:"buildingNum"},
	{name:"indisPrecheck.remark",mapping:"remark"},
	{name:"indisPrecheck.relateModule",mapping:"relateModule"},
	{name:"indisPrecheck.project.projectId",mapping:"project.projectId"},
	{name:"indisPrecheck.project.projectName",mapping:"project.projectName"},
	{name:"indisPrecheck.project.address",mapping:"project.address"},
	{name:"indisPrecheck.contractLease.contractId",mapping:"contractLease.contractId"},
	{name:"indisPrecheck.equipment.equipId",mapping:"equipment.equipId"},
	{name:"indisPrecheck.equipment.equipGenericName",mapping:"equipment.equipGenericName"},
	{name:"indisPrecheck.equipment.equipSpecificName",mapping:"equipment.equipSpecificName"},
	{name:"indisPrecheck.equipment.recordId",mapping:"equipment.recordId"},
	{name:"indisPrecheck.equipment.exwSerial",mapping:"equipment.exwSerial"}
];
var IndisPrecheckHiddenField = [
	{xtype:"hidden",name:"indisPrecheck.precheckId"},
	{xtype:"hidden",name:"indisPrecheck.inEnt"},
	{xtype:"hidden",name:"indisPrecheck.inEntModule"},
	{xtype:"hidden",name:"indisPrecheck.relateModule"},
	{xtype:"hidden",name:"indisPrecheck.project.projectId"},
	{xtype:"hidden",name:"indisPrecheck.contractLease.contractId"},
	{xtype:"hidden",name:"indisPrecheck.equipment.equipId"},
	{xtype:"hidden",name:"indisPrecheck.verifyStandards"}
];
var IndisPrecheckListViewField = [ "precheckId", "precheckSerial", "providedDate", "inEntName", "buildingNum", "project", "equipment" ];
//===========================================================================//
var IndisBasecheckFieldMapping = [
	{name:"indisBasecheck.basecheckId",mapping:"basecheckId"},
	{name:"indisBasecheck.basecheckSerial",mapping:"basecheckSerial"},
	{name:"indisBasecheck.providedDate",mapping:"providedDate"},
	{name:"indisBasecheck.emEnt",mapping:"emEnt"},
	{name:"indisBasecheck.emEntModule",mapping:"emEntModule"},
	{name:"indisBasecheck.emEntName",mapping:"emEntName"},
	{name:"indisBasecheck.inEnt",mapping:"inEnt"},
	{name:"indisBasecheck.inEntModule",mapping:"inEntModule"},
	{name:"indisBasecheck.inEntName",mapping:"inEntName"},
	{name:"indisBasecheck.buildingNum",mapping:"buildingNum"},
	{name:"indisBasecheck.managerProject",mapping:"managerProject"},
	{name:"indisBasecheck.managerPhone",mapping:"managerPhone"},
	{name:"indisBasecheck.remark",mapping:"remark"},
	{name:"indisBasecheck.relateModule",mapping:"relateModule"},
	{name:"indisBasecheck.project.projectId",mapping:"project.projectId"},
	{name:"indisBasecheck.project.projectName",mapping:"project.projectName"},
	{name:"indisBasecheck.project.address",mapping:"project.address"},
	{name:"indisBasecheck.contractLease.contractId",mapping:"contractLease.contractId"},
	{name:"indisBasecheck.equipment.equipId",mapping:"equipment.equipId"},
	{name:"indisBasecheck.equipment.equipGenericName",mapping:"equipment.equipGenericName"},
	{name:"indisBasecheck.equipment.equipSpecificName",mapping:"equipment.equipSpecificName"},
	{name:"indisBasecheck.equipment.recordId",mapping:"equipment.recordId"},
	{name:"indisBasecheck.equipment.exwSerial",mapping:"equipment.exwSerial"}
];
var IndisBasecheckHiddenField = [
	{xtype:"hidden",name:"indisBasecheck.basecheckId"},
	{xtype:"hidden",name:"indisBasecheck.emEnt"},
	{xtype:"hidden",name:"indisBasecheck.emEntModule"},
	{xtype:"hidden",name:"indisBasecheck.inEnt"},
	{xtype:"hidden",name:"indisBasecheck.inEntModule"},
	{xtype:"hidden",name:"indisBasecheck.relateModule"},
	{xtype:"hidden",name:"indisBasecheck.project.projectId"},
	{xtype:"hidden",name:"indisBasecheck.contractLease.contractId"},
	{xtype:"hidden",name:"indisBasecheck.equipment.equipId"},
	{xtype:"hidden",name:"indisBasecheck.verifyStandards"}
];
var IndisBasecheckListViewField = [ "basecheckId", "basecheckSerial", "providedDate", "emEntName", "inEntName", "project", "equipment" ];
//===========================================================================//
var TechnicalDisclosureFieldMapping = [
	{name:"technicalDisclosure.disclosureId",mapping:"disclosureId"},
	{name:"technicalDisclosure.disclosureSerial",mapping:"disclosureSerial"},
	{name:"technicalDisclosure.providedDate",mapping:"providedDate"},
	{name:"technicalDisclosure.height",mapping:"height"},
	{name:"technicalDisclosure.brachium",mapping:"brachium"},
	{name:"technicalDisclosure.constructeEntname",mapping:"constructeEntname"},
	{name:"technicalDisclosure.erectingEquipart",mapping:"erectingEquipart"},
	{name:"technicalDisclosure.deliveryEquipart",mapping:"deliveryEquipart"},
	{name:"technicalDisclosure.acceptanceMan",mapping:"acceptanceMan"},
	{name:"technicalDisclosure.relevanceMan",mapping:"relevanceMan"},
	{name:"technicalDisclosure.disclosureMan",mapping:"disclosureMan"},
	{name:"technicalDisclosure.disclosureItem",mapping:"disclosureItem"},
	{name:"technicalDisclosure.disclosureDate",mapping:"disclosureDate"},
	{name:"technicalDisclosure.contents",mapping:"contents"},
	{name:"technicalDisclosure.replenishContents",mapping:"replenishContents"},
	{name:"technicalDisclosure.remark",mapping:"remark"},
	{name:"technicalDisclosure.relateModule",mapping:"relateModule"},
	{name:"technicalDisclosure.project.projectId",mapping:"project.projectId"},
	{name:"technicalDisclosure.project.projectName",mapping:"project.projectName"},
	{name:"technicalDisclosure.project.address",mapping:"project.address"},
	{name:"technicalDisclosure.equipment.equipId",mapping:"equipment.equipId"},
	{name:"technicalDisclosure.equipment.equipGenericName",mapping:"equipment.equipGenericName"},
	{name:"technicalDisclosure.equipment.equipSpecificName",mapping:"equipment.equipSpecificName"},
	{name:"technicalDisclosure.equipment.recordId",mapping:"equipment.recordId"},
	{name:"technicalDisclosure.equipment.exwSerial",mapping:"equipment.exwSerial"}
];
var TechnicalDisclosureHiddenField = [
	{xtype:"hidden",name:"technicalDisclosure.disclosureId"},
	{xtype:"hidden",name:"technicalDisclosure.relateModule"},
	{xtype:"hidden",name:"technicalDisclosure.project.projectId"},
	{xtype:"hidden",name:"technicalDisclosure.equipment.equipId"}
];
var TechnicalDisclosureListViewField = [ "disclosureId", "disclosureSerial", "providedDate", "height", "brachium", "disclosureItem", "constructeEntname", "disclosureMan", "disclosureDate", "project", "equipment","relateModule" ];
//===========================================================================//
var MemoFieldMapping = [
	{name:"memo.memoId",mapping:"memoId"},
	{name:"memo.memoSerial",mapping:"memoSerial"},
	{name:"memo.memoTheme",mapping:"memoTheme"},
	{name:"memo.practiId",mapping:"practiId"},
	{name:"memo.practiName",mapping:"practiName"},
	{name:"memo.incidentType",mapping:"incidentType"},
	{name:"memo.incidentTypeName",mapping:"incidentTypeName"},
	{name:"memo.projectId",mapping:"projectId"},
	{name:"memo.projectName",mapping:"projectName"},
	{name:"memo.address",mapping:"address"},
	{name:"memo.equipId",mapping:"equipId"},
	{name:"memo.equipGeneric",mapping:"equipGeneric"},
	{name:"memo.equipGenericName",mapping:"equipGenericName"},
	{name:"memo.recordId",mapping:"recordId"},
	{name:"memo.exwSerial",mapping:"exwSerial"},
	{name:"memo.customId",mapping:"customId"},
	{name:"memo.customName",mapping:"customName"},
	{name:"memo.processStatus",mapping:"processStatus"},
	{name:"memo.status",mapping:"status"},
	{name:"memo.remark",mapping:"remark"},
	{name:"memo.userId",mapping:"userId"},
	{name:"memo.userName",mapping:"userName"}
];
var MemoHiddenField = [
	{xtype:"hidden",name:"memo.memoId"},
	{xtype:"hidden",name:"memo.practiId"},
	{xtype:"hidden",name:"memo.projectId"},
	{xtype:"hidden",name:"memo.equipId"},
	{xtype:"hidden",name:"memo.equipGeneric"},
	{xtype:"hidden",name:"memo.customId"},
	{xtype:"hidden",name:"memo.memoDeputys"},
	{xtype:"hidden",name:"memo.userId"},
	{xtype:"hidden",name:"memo.userName"},
	{xtype:"hidden",name:"memo.memoDetails"}
];
var MemoListViewField = [ "memoId", "memoSerial", "memoTheme", "practiName", "incidentTypeName", "projectName", "equipGenericName", "recordId", "exwSerial", "customName", "processStatus", "status" ];
var MemoDetailListViewField = [ "memoDetailId", "memoId", "dealwithDate", "planFinishedDate", "contents", "finished", "remark" ];
var MemoDeputyListViewField = [ "memoDeputyId", "memoId", "practiId", "practiName" ];
//===========================================================================//
var InstallManageFieldMapping = [
	{name:"installManage.installId",mapping:"installId"},
	{name:"installManage.recordId",mapping:"recordId"},
	{name:"installManage.projectName",mapping:"projectName"},
	{name:"installManage.startinDate",mapping:"startinDate"},
	{name:"installManage.endinDate",mapping:"endinDate"},
	{name:"installManage.wallAttacheQty",mapping:"wallAttacheQty"},
	{name:"installManage.brachium",mapping:"brachium"},
	{name:"installManage.installHeight",mapping:"installHeight"},
	{name:"installManage.longitude",mapping:"longitude"},
	{name:"installManage.latitude",mapping:"latitude"},
	{name:"installManage.userId",mapping:"userId"},
	{name:"installManage.userName",mapping:"userName"},
	{name:"installManage.providedDate",mapping:"providedDate"}
];
var InstallManageHiddenField = [];
var InstallManageListViewField = [ "installId", "recordId", "projectName", "startinDate", "endinDate", "wallAttacheQty", "brachium", "installHeight", "longitude", "latitude", "address", "userName", "providedDate", "fileAttaches", "equipFlow" ];
//===========================================================================//
var DismantleManageFieldMapping = [
	{name:"dismantleManage.dismantleId",mapping:"dismantleId"},
	{name:"dismantleManage.recordId",mapping:"recordId"},
	{name:"dismantleManage.projectName",mapping:"projectName"},
	{name:"dismantleManage.startdisDate",mapping:"startdisDate"},
	{name:"dismantleManage.enddisDate",mapping:"enddisDate"},
	{name:"dismantleManage.dismantleHeight",mapping:"dismantleHeight"},
	{name:"dismantleManage.longitude",mapping:"longitude"},
	{name:"dismantleManage.latitude",mapping:"latitude"},
	{name:"dismantleManage.userId",mapping:"userId"},
	{name:"dismantleManage.userName",mapping:"userName"},
	{name:"dismantleManage.providedDate",mapping:"providedDate"}
];
var DismantleManageHiddenField = [];
var DismantleManageListViewField = [ "dismantleId", "recordId", "projectName", "startdisDate", "enddisDate", "dismantleHeight", "longitude", "latitude", "address", "userName", "fileAttaches", "equipFlow" ];
//===========================================================================//
var InspectManageFieldMapping = [
	{name:"inspectManage.inspectId",mapping:"inspectId"},
	{name:"inspectManage.projectName",mapping:"projectName"},
	{name:"inspectManage.inspectDate",mapping:"inspectDate"},
	{name:"inspectManage.inspectPepoles",mapping:"inspectPepoles"},
	{name:"inspectManage.inspectResult",mapping:"inspectResult"},
	{name:"inspectManage.inspectResultName",mapping:"inspectResultName"},
	{name:"inspectManage.remark",mapping:"remark"},
	{name:"inspectManage.longitude",mapping:"longitude"},
	{name:"inspectManage.latitude",mapping:"latitude"},
	{name:"inspectManage.userId",mapping:"userId"},
	{name:"inspectManage.userName",mapping:"userName"},
	{name:"inspectManage.providedDate",mapping:"providedDate"},
	{name:"inspectManage.fileAttaches",mapping:"fileAttaches"}
];
var InspectManageHiddenField = [];
var InspectManageListViewField = [ "inspectId", "projectName", "inspectDate", "inspectPepoles", "inspectResult", "inspectResultName", "remark", "longitude", "latitude", "address", "userId", "userName", "providedDate", "fileAttaches", "equipInspectSchema" ];
//===========================================================================//
var TeamsAccountFieldMapping = [
	{name:"teamsAccount.teamsAccountId",mapping:"teamsAccountId"},
	{name:"teamsAccount.teamsAccountSerial",mapping:"teamsAccountSerial"},
	{name:"teamsAccount.projectId",mapping:"projectId"},
	{name:"teamsAccount.projectName",mapping:"projectName"},
	{name:"teamsAccount.practiId",mapping:"practiId"},
	{name:"teamsAccount.practiName",mapping:"practiName"},
	{name:"teamsAccount.teams",mapping:"teams"},
	{name:"teamsAccount.accountStartDate",mapping:"accountStartDate"},
	{name:"teamsAccount.accountEndDate",mapping:"accountEndDate"},
	{name:"teamsAccount.knotPrice",mapping:"knotPrice"},
	{name:"teamsAccount.wallAttachePrice",mapping:"wallAttachePrice"},
	{name:"teamsAccount.deductAmount",mapping:"deductAmount"},
	{name:"teamsAccount.paymentAmount",mapping:"paymentAmount"},
	{name:"teamsAccount.finishedAmount",mapping:"finishedAmount"},
	{name:"teamsAccount.knotAmount",mapping:"knotAmount"},
	{name:"teamsAccount.wallAmount",mapping:"wallAmount"},
	{name:"teamsAccount.autocraneAmount",mapping:"autocraneAmount"},
	{name:"teamsAccount.lgisticsAmount",mapping:"lgisticsAmount"},
	{name:"teamsAccount.otherAmount",mapping:"otherAmount"},
	{name:"teamsAccount.practiAmount",mapping:"practiAmount"},
	{name:"teamsAccount.fundStatus",mapping:"fundStatus"},
	{name:"teamsAccount.fundStatusName",mapping:"fundStatusName"},
	{name:"teamsAccount.effective",mapping:"effective"},
	{name:"teamsAccount.userId",mapping:"userId"},
	{name:"teamsAccount.userName",mapping:"userName"},
	{name:"teamsAccount.providedDate",mapping:"providedDate"}
];
var TeamsAccountHiddenField = [
	{xtype:"hidden",name:"teamsAccount.teamsAccountId"},
	{xtype:"hidden",name:"teamsAccount.projectId"},
	{xtype:"hidden",name:"teamsAccount.practiId"},
	{xtype:"hidden",name:"teamsAccount.userId"},
	{xtype:"hidden",name:"teamsAccount.teamsAccountKnots"},
	{xtype:"hidden",name:"teamsAccount.teamsAccountWalls"},
	{xtype:"hidden",name:"teamsAccount.teamsAccountAutocranes"},
	{xtype:"hidden",name:"teamsAccount.teamsAccountLogisticses"},
	{xtype:"hidden",name:"teamsAccount.teamsAccountOthers"},
	{xtype:"hidden",name:"teamsAccount.teamsAccountPractis"}
];
var TeamsAccountListViewField = [ "teamsAccountId", "teamsAccountSerial", "projectId", "projectSerial", "projectName", "address", "practiId", "practiName", "teams", "accountStartDate", "accountEndDate", "knotPrice", "wallAttachePrice", "deductAmount", "paymentAmount", "finishedAmount", "knotAmount", "wallAmount", "autocraneAmount", "lgisticsAmount", "otherAmount", "practiAmount", "fundStatus", "fundStatusName", "effective", "userId", "userName", "providedDate", "teamsAccountKnotList", "teamsAccountWallList", "teamsAccountAutocraneList" ];
var TeamsAccountKnotListViewField = [ "accountKnotId", "teamsAccountId", "accountDate", "knotType", "knotTypeName", "recordId", "buildingNum", "componGeneric", "componGenericName", "componSpecific", "componSpecificName", "quantity", "measurement", "accountPrice", "deductQuantity", "summary", "projectId", "projectName", "practiId", "practiName", "counts", "knotMetric" ];
var TeamsAccountWallListViewField = [ "accountWallId", "teamsAccountId", "accountDate", "wallType", "wallTypeName", "recordId", "buildingNum", "componGeneric", "componGenericName", "componSpecific", "componSpecificName", "measurement", "quantity", "accountPrice", "deductQuantity", "projectId", "projectName", "practiId", "practiName", "summary" ];
var TeamsAccountAutocraneListViewField = [ "accountAutocraneId", "teamsAccountId", "accountDate", "amountType", "specificName", "quantity", "measurement", "machineTeam", "accountPrice", "deductQuantity", "projectId", "projectName", "practiId", "practiName", "summary" ];
var TeamsAccountLogisticsListViewField = [ "accountLogisticseId", "teamsAccountId", "amountType", "specificName", "quantity", "projectId", "projectName", "practiId", "practiName", "measurement", "accountPrice", "summary" ];
var TeamsAccountOtherListViewField = [ "accountOthereId", "teamsAccountId", "otherName", "specificName", "quantity", "measurement", "accountPrice", "projectId", "projectName", "practiId", "practiName", "summary" ];
var TeamsAccountPractiListViewField = [ "accountPractieId", "teamsAccountId", "practiId", "practiName", "remark", "baseSalary", "presentAmount", "deductAmount", "projectId", "projectName", "summary" ];
//===========================================================================//
var ContractArrangeFieldMapping = [
	{name:"contractArrange.arrangeId",mapping:"arrangeId"},
	{name:"contractArrange.arrangeSerial",mapping:"arrangeSerial"},
	{name:"contractArrange.arrangeType",mapping:"arrangeType"},
	{name:"contractArrange.province",mapping:"province"},
	{name:"contractArrange.provinceName",mapping:"provinceName"},
	{name:"contractArrange.customerId",mapping:"customerId"},
	{name:"contractArrange.customerName",mapping:"customerName"},
	{name:"contractArrange.customerAddress",mapping:"customerAddress"},
	{name:"contractArrange.linker",mapping:"linker"},
	{name:"contractArrange.linkerTel",mapping:"linkerTel"},
	{name:"contractArrange.corpId",mapping:"corpId"},
	{name:"contractArrange.corpName",mapping:"corpName"},
	{name:"contractArrange.dutyman",mapping:"dutyman"},
	{name:"contractArrange.inEnt",mapping:"inEnt"},
	{name:"contractArrange.inEntModule",mapping:"inEntModule"},
	{name:"contractArrange.inEntName",mapping:"inEntName"},
	{name:"contractArrange.inEntCertNum",mapping:"inEntCertNum"},
	{name:"contractArrange.inEntTitleLevel",mapping:"inEntTitleLevel"},
	{name:"contractArrange.equipCategory",mapping:"equipCategory"},
	{name:"contractArrange.equipCategoryName",mapping:"equipCategoryName"},
	{name:"contractArrange.quantity",mapping:"quantity"},
	{name:"contractArrange.projectId",mapping:"projectId"},
	{name:"contractArrange.projectName",mapping:"projectName"},
	{name:"contractArrange.projectAddress",mapping:"projectAddress"},
	{name:"contractArrange.projectTimeLimit",mapping:"projectTimeLimit"},
	{name:"contractArrange.overallHeight",mapping:"overallHeight"},
	{name:"contractArrange.projectStatus",mapping:"projectStatus"},
	{name:"contractArrange.startDate",mapping:"startDate"},
	{name:"contractArrange.userId",mapping:"userId"},
	{name:"contractArrange.userName",mapping:"userName"},
	{name:"contractArrange.providedDate",mapping:"providedDate"},
	{name:"contractArrange.applyforState",mapping:"applyforState"},
	{name:"contractArrange.applyforStateName",mapping:"applyforStateName"},
	{name:"contractArrange.contractType",mapping:"contractType"},
	{name:"contractArrange.contractTypeName",mapping:"contractTypeName"},
	{name:"contractArrange.cooperationWay",mapping:"cooperationWay"},
	{name:"contractArrange.cooperationWayName",mapping:"cooperationWayName"},
	{name:"contractArrange.competentDepartment",mapping:"competentDepartment"}
];
var ContractArrangeHiddenField = [
{xtype:"hidden",name:"contractArrange.inEnt"},
{xtype:"hidden",name:"contractArrange.inEntModule"},
	{xtype:"hidden",name:"contractArrange.arrangeId"},
	{xtype:"hidden",name:"contractArrange.arrangeType"},
	{xtype:"hidden",name:"contractArrange.province"},
	{xtype:"hidden",name:"contractArrange.customerId"},
	{xtype:"hidden",name:"contractArrange.corpId"},
	{xtype:"hidden",name:"contractArrange.equipCategory"},
	{xtype:"hidden",name:"contractArrange.projectId"},
	{xtype:"hidden",name:"contractArrange.userId"},
	{xtype:"hidden",name:"contractArrange.applyforState"},
	{xtype:"hidden",name:"contractArrange.contractArrangeEquipments"},
	{xtype:"hidden",name:"contractArrange.contractArrangeSituations"}
];
var ContractArrangeListViewField = [ "arrangeId", "arrangeSerial", "equipCategory", "equipCategoryName", "province", "provinceName", "customerId", "customerName", "customerAddress", "linker", "linkerTel", "corpId", "corpName", "dutyman", "dutymanTel", "quantity", "projectId", "projectName", "projectAddress", "projectTimeLimit", "overallHeight", "projectStatus", "startDate", "userId", "userName", "providedDate", "applyforState", "applyforStateName","inEnt", "inEntModule", "inEntName", "inEntCertNum" ,"competentDepartment" ];
var ContractArrangeEquipmentListViewField = [ "arrangeEquipId", "arrangeId", "equipGenericName", "equipVender", "equipSpecificName", "quantity", "overallHeight", "appearanceCost", "embeddedCost", "settleMethod","aboveZeroHeight","baseHeight","mololayerArea","brachium","initialHeight","finalHeight","supplierName","startDate","endDate","planEndDate","exwSerial","recordId","equipId","buildingNum"];
//===========================================================================//
var ContractArrangeSituationFieldMapping = [
	{name:"contractArrangeSituation.arrangeSituationId",mapping:"arrangeSituationId"},
	{name:"contractArrangeSituation.arrangeId",mapping:"arrangeId"},
	{name:"contractArrangeSituation.equipCategory",mapping:"equipCategory"},
	{name:"contractArrangeSituation.equipCategoryName",mapping:"equipCategoryName"},
	{name:"contractArrangeSituation.receiveEntName",mapping:"receiveEntName"},
	{name:"contractArrangeSituation.projectName",mapping:"projectName"},
	{name:"contractArrangeSituation.demand",mapping:"demand"},
	{name:"contractArrangeSituation.installHeight",mapping:"installHeight"},
	{name:"contractArrangeSituation.duration",mapping:"duration"},
	{name:"contractArrangeSituation.equipSpecificName",mapping:"equipSpecificName"},
	{name:"contractArrangeSituation.baseDescribe",mapping:"baseDescribe"},
	{name:"contractArrangeSituation.propertyName",mapping:"propertyName"},
	{name:"contractArrangeSituation.equipSource",mapping:"equipSource"},
	{name:"contractArrangeSituation.equipVender",mapping:"equipVender"},
	{name:"contractArrangeSituation.icSerial",mapping:"icSerial"},
	{name:"contractArrangeSituation.remark",mapping:"remark"}
];
var ContractArrangeSituationHiddenField = [
	{xtype:"hidden",name:"contractArrangeSituation.arrangeSituationId"},
	{xtype:"hidden",name:"contractArrangeSituation.arrangeId"},
	{xtype:"hidden",name:"contractArrangeSituation.equipCategory"}
];
var ContractArrangeSituationListViewField = [ "arrangeSituationId", "arrangeId", "equipCategory", "equipCategoryName", "receiveEntName", "projectName", "demand", "installHeight", "duration", "equipSpecificName", "baseDescribe", "propertyName", "equipSource", "equipVender", "icSerial", "remark" ];
//===========================================================================//
var OverduePaymentFieldMapping = [
	{name:"overduePayment.overduePaymentId",mapping:"overduePaymentId"},
	{name:"overduePayment.overduePaymentSerial",mapping:"overduePaymentSerial"},
	{name:"overduePayment.customerId",mapping:"customerId"},
	{name:"overduePayment.customerName",mapping:"customerName"},
	{name:"overduePayment.corpId",mapping:"corpId"},
	{name:"overduePayment.corpName",mapping:"corpName"}
];
var OverduePaymentHiddenField = [
	{xtype:"hidden",name:"overduePayment.overduePaymentId"},
	{xtype:"hidden",name:"overduePayment.customerId"},
	{xtype:"hidden",name:"overduePayment.corpId"}
];
var OverduePaymentListViewField = [ "overduePaymentId", "overduePaymentSerial", "customerId", "customerName", "corpId", "corpName" ];
//===========================================================================//
var RentContractFieldMapping = [
	{name:"rentContract.rentId",mapping:"rentId"},
	{name:"rentContract.rentSerial",mapping:"rentSerial"},
	{name:"rentContract.rentTheme",mapping:"rentTheme"},
	{name:"rentContract.contractor",mapping:"contractor"},
	{name:"rentContract.propertyName",mapping:"propertyName"},
	{name:"rentContract.contractId",mapping:"contractId"},
	{name:"rentContract.contractSerial",mapping:"contractSerial"},
	{name:"rentContract.contractTheme",mapping:"contractTheme"},
	{name:"rentContract.paEnt",mapping:"paEnt"},
	{name:"rentContract.paModule",mapping:"paModule"},
	{name:"rentContract.paEntName",mapping:"paEntName"},
	{name:"rentContract.pbEnt",mapping:"pbEnt"},
	{name:"rentContract.pbModule",mapping:"pbModule"},
	{name:"rentContract.pbEntName",mapping:"pbEntName"},
	{name:"rentContract.projectId",mapping:"projectId"},
	{name:"rentContract.projectSerial",mapping:"projectSerial"},
	{name:"rentContract.projectName",mapping:"projectName"},
	{name:"rentContract.address",mapping:"address"},
	{name:"rentContract.startRentDate",mapping:"startRentDate"},
	{name:"rentContract.endRentDate",mapping:"endRentDate"},
	{name:"rentContract.rentAmount",mapping:"rentAmount"},
	{name:"rentContract.deductAmount",mapping:"deductAmount"},
	{name:"rentContract.paymentAmount",mapping:"paymentAmount"},
	{name:"rentContract.finishedAmount",mapping:"finishedAmount"},
	{name:"rentContract.fundStatus",mapping:"fundStatus"},
	{name:"rentContract.fundStatusName",mapping:"fundStatusName"},
	{name:"rentContract.effective",mapping:"effective"},
	{name:"rentContract.effectiveName",mapping:"effectiveName"},
	{name:"rentContract.remark",mapping:"remark"},
	{name:"rentContract.userId",mapping:"userId"},
	{name:"rentContract.userName",mapping:"userName"},
	{name:"rentContract.depId",mapping:"depId"},
	{name:"rentContract.providedDate",mapping:"providedDate"},
	{name:"rentContract.department.depId",mapping:"department.depId"},
	{name:"rentContract.department.depName",mapping:"department.depName"},
	{name:"rentContract.arrearsAmount",mapping:"arrearsAmount"}
];
var RentContractHiddenField = [
	{xtype:"hidden",name:"rentContract.rentId"},
	{xtype:"hidden",name:"rentContract.contractId"},
	{xtype:"hidden",name:"rentContract.paEnt"},
	{xtype:"hidden",name:"rentContract.paModule"},
	{xtype:"hidden",name:"rentContract.pbEnt"},
	{xtype:"hidden",name:"rentContract.pbModule"},
	{xtype:"hidden",name:"rentContract.projectId"},
	{xtype:"hidden",name:"rentContract.fundStatus"},
	{xtype:"hidden",name:"rentContract.effective"},
	{xtype:"hidden",name:"rentContract.userId"},
	{xtype:"hidden",name:"rentContract.department.depId"},
	{xtype:"hidden",name:"rentContract.instalments"},
	{xtype:"hidden",name:"rentContract.rentEquipBriefs"},
	{xtype:"hidden",name:"rentContract.rentComponBriefs"},
	{xtype:"hidden",name:"rentContract.rentItemBriefs"},
	{xtype:"hidden",name:"rentContract.rentDeductBriefs"}
];
var RentContractListViewField = [ "rentId", "rentSerial", "rentTheme", "contractor", "propertyName", "contractId", "contractSerial", "contractTheme", "paEnt", "paModule", "paEntName", "pbEnt", "pbModule", "pbEntName", "projectId", "projectSerial", "projectName", "address", "startRentDate", "endRentDate", "rentAmount", "deductAmount", "paymentAmount", "finishedAmount", "fundStatus", "fundStatusName", "effective", "effectiveName", "remark", "userId", "userName", "depId", "providedDate", "arrearsAmount" ];
var RentEquipBriefListViewField = [ "rentEquipBriefId", "rentId", "equipId", "recordSerial", "recordId", "exwSerial", "equipCategoryName", "equipSpecificName", "buildingNum", "unit", "startRentDate", "endRentDate", "rentDays", "rentStandard", "measurement", "quantity", "daysRent", "deductRent", "summary", "remark","monthTag" ];
var RentComponBriefListViewField = [ "rentComponBriefId", "rentId", "componId", "componCategoryName", "componSpecificName", "unit", "startRentDate", "endRentDate", "rentDays", "rentStandard", "measurement", "quantity", "daysRent", "deductRent", "summary", "equipId", "recordId", "remark" ];
var RentItemBriefListViewField = [ "rentItemBriefId", "rentId", "rentItemName", "quantity", "unitprice", "measurement", "deductRent", "itemCumulate", "summary", "equipId", "recordId", "remark" ];
var RentDeductBriefListViewField = [ "rentDeductBriefId", "rentId", "equipId", "equipCategoryName", "equipSpecificName", "recordId", "quantity", "unitprice", "measurement", "summary", "remark" ];
//===========================================================================//
var ConstructOperationFieldMapping = [
	{name:"constructOperation.constructId",mapping:"constructId"},
	{name:"constructOperation.constructSerial",mapping:"constructSerial"},
	{name:"constructOperation.constructTheme",mapping:"constructTheme"},
	{name:"constructOperation.constructDate",mapping:"constructDate"},
	{name:"constructOperation.effective",mapping:"effective"},
	{name:"constructOperation.userName",mapping:"userName"},
	{name:"constructOperation.providedDate",mapping:"providedDate"},
	{name:"constructOperation.buildingNum",mapping:"buildingNum"},
	{name:"constructOperation.paEntName",mapping:"paEntName"},
	{name:"constructOperation.certNum",mapping:"certNum"},
	{name:"constructOperation.certLevel",mapping:"certLevel"},
	{name:"constructOperation.pbEntName",mapping:"pbEntName"},
	{name:"constructOperation.actualPractiNameIds",mapping:"actualPractiNameIds"},
	{name:"constructOperation.actualPractiNames",mapping:"actualPractiNames"},
	{name:"constructOperation.summary",mapping:"summary"},
	{name:"constructOperation.projectPrincipal",mapping:"projectPrincipal"},
	{name:"constructOperation.teams",mapping:"teams"},
	{name:"constructOperation.finishedAmount",mapping:"finishedAmount"},
	{name:"constructOperation.remainderAmount",mapping:"remainderAmount"},
	{name:"constructOperation.planHeight",mapping:"planHeight"},
	{name:"constructOperation.realHeight",mapping:"realHeight"},
	{name:"constructOperation.fundStatusName",mapping:"fundStatusName"},
	{name:"constructOperation.fundStatus",mapping:"fundStatus"},
	{name:"constructOperation.remark",mapping:"remark"},
	{name:"constructOperation.project.projectId",mapping:"project.projectId"},
	{name:"constructOperation.project.projectName",mapping:"project.projectName"},
	{name:"constructOperation.project.address",mapping:"project.address"},
	{name:"constructOperation.equipment.equipId",mapping:"equipment.equipId"},
	{name:"constructOperation.equipment.exwSerial",mapping:"equipment.exwSerial"},
	{name:"constructOperation.equipment.propertyName",mapping:"equipment.propertyName"},
	{name:"constructOperation.equipment.recordId",mapping:"equipment.recordId"},
	{name:"constructOperation.equipment.equipSpecificName",mapping:"equipment.equipSpecificName"},
	{name:"constructOperation.constructOperationPlanTasks",mapping:"constructOperationPlanTasks"},
	{name:"constructOperation.constructOperationRealTasks",mapping:"constructOperationRealTasks"},
	{name:"constructOperation.constructPlanPractis",mapping:"constructPlanPractis"},
	{name:"constructOperation.constructManagers",mapping:"constructManagers"},
	{name:"constructOperation.constructRealPractis",mapping:"constructRealPractis"}
];
var ConstructOperationHiddenField = [
	{xtype:"hidden",name:"constructOperation.constructId"},
	{xtype:"hidden",name:"constructOperation.project.projectId"},
	{xtype:"hidden",name:"constructOperation.equipment.equipId"},
	{xtype:"hidden",name:"constructOperation.constructOperationPlanTasks"},
	{xtype:"hidden",name:"constructOperation.constructOperationRealTasks"},
	{xtype:"hidden",name:"constructOperation.constructPlanPractis"},
	{xtype:"hidden",name:"constructOperation.constructRealPractis"},
	{xtype:"hidden",name:"constructOperation.constructManagers"},
	{xtype:"hidden",name:"constructOperation.certLevel"},
	{xtype:"hidden",name:"constructOperation.certNum"}
];




var ConstructPractiListViewField = [ "constructPractiId", "constructId","practiId", "practitioner", "userId", "appUser", "practiCert","type","kindWorkName","practiName","idCard","mobile","certNum" ];

var ConstructOperationListViewField = [ "constructId", "constructSerial", "constructTheme", "constructDate", "effective", "effectiveName", "userName", "providedDate", "buildingNum", "paEntName","certLevel","certNum", "pbEntName", "practiNames", "fundStatusName", "summary", "remark", "projectPrincipal", "teams", "finishedAmount", "remainderAmount", "planHeight", "realHeight", "project", "equipment","constructPlanPractiSet" ];
var ConstructOperationTaskListViewField = [ "constructTaskId", "constructId", "contents", "unit", "taskType", "quantity", "unitPrice", "summary", "remark" ];
//===========================================================================//
//===============APP======================
var AttendamceListViewField = [ "aid", "userId", "userName", "sgDate", "sginTime", "sginLocation", "sgouTime", "sgouLocation", "remark", "createDt", "sgSum", "sgWeekday","depName","equipment","project" ];
var LocationDetailListViewField = [ "lid", "aid", "upTime", "location" ];
var AttendamcePhotoListViewField = ["fileId","dependId","dependName","fileName","filePath","createtime" ];
var AttendamceFieldMapping = [
	{name:"attendamce.aid",mapping:"aid"},
	{name:"attendamce.userId",mapping:"userId"},
	{name:"attendamce.userName",mapping:"userName"},
	{name:"attendamce.sgDate",mapping:"sgDate"},
	{name:"attendamce.sginTime",mapping:"sginTime"},
	{name:"attendamce.sginLocation",mapping:"sginLocation"},
	{name:"attendamce.sgouTime",mapping:"sgouTime"},
	{name:"attendamce.sgouLocation",mapping:"sgouLocation"},
	{name:"attendamce.remark",mapping:"remark"}
];
var AttendamceHiddenField = [
	{xtype:"hidden",name:"attendamce.aid"},
	{xtype:"hidden",name:"attendamce.userId"}
];

var TransApprovelListViewField = ["insid","applyDt","flowName","flowType","content","depname","stateName","chkUserName","days","userName"];
var MyApprovelListViewField = ["instance.insid","instance.applyDt","instance.flowName","instance.flowType","instance.content","instance.depname","instance.stateName","chkUserName","instance.days","instance.userName"];
var CopyToMyListViewField = ["copid","instance.insid","instance.applyDt","instance.flowName","instance.flowType","instance.content","instance.depname","instance.stateName","chkUserName","instance.days","instance.userName"];
var TransApproveFieldMapping=[
	{name:"flowInstance.insid",mapping:"insid"},
	{name:"flowInstance.userid",mapping:"userid"},
	{name:"flowInstance.userName",mapping:"userName"},
	{name:"flowInstance.applyDt",mapping:"applyDt"},
	{name:"flowInstance.depid",mapping:"depid"},
	{name:"flowInstance.depname",mapping:"depname"},
	{name:"flowInstance.content",mapping:"content"},
	{name:"flowInstance.flowType",mapping:"flowType"},
	{name:"flowInstance.flowName",mapping:"flowName"},
	{name:"flowInstance.flowId",mapping:"flowId"},
	{name:"flowInstance.chkUserid",mapping:"chkUserid"},
	{name:"flowInstance.chkUserName",mapping:"chkUserName"},
	{name:"flowInstance.state",mapping:"state"},
	{name:"flowInstance.stateName",mapping:"stateName"},
	{name:"flowInstance.copyUserNames",mapping:"copyUserNames"},
	{name:"flowInstance.flowDesc",mapping:"flowDesc"},
	{name:"flowInstance.seq",mapping:"seq"},
	{name:"flowInstance.lastSeq",mapping:"lastSeq"},
	{name:"flowInstance.days",mapping:"days"}
  ];
var TransApproveHiddenField = [
 	{xtype:"hidden",name:"flowInstance.insid"},
 	{xtype:"hidden",name:"flowInstance.userid"},
 	{xtype:"hidden",name:"flowInstance.flowId"}
 ];
var TransProcessListViewField = ["pid","insid","nodeid","chkUserid","chkUserName","chkDate","chkResult","chkOpinion"];
var AppDispatchListViewField = ["disid","dispatchSerial","projName","disMode","disDate","disTypeName","dispatcher","remark","sendWarehouseName","receiveWarehouseName"];
var AppDispatchFieldMapping = [
  	{name:"appDispatch.disid",mapping:"disid"},
	{name:"appDispatch.disDate",mapping:"disDate"},
	{name:"appDispatch.dispatchSerial",mapping:"dispatchSerial"},
	{name:"appDispatch.projId",mapping:"projId"},
	{name:"appDispatch.projName",mapping:"projName"},
	{name:"appDispatch.disType",mapping:"disType"}, 
	{name:"appDispatch.disTypeName",mapping:"disTypeName"},
	{name:"appDispatch.dispatcher",mapping:"dispatcher"},
	{name:"appDispatch.remark",mapping:"remark"},
	{name:"appDispatch.createDt",mapping:"createDt"},
	{name:"appDispatch.createBy",mapping:"createBy"},
	{name:"appDispatch.createByName",mapping:"createByName"},
	{name:"appDispatch.fileAttaches",mapping:"fileAttaches"},
	{name:"appDispatch.sendWarehouseName",mapping:"sendWarehouseName"},
	{name:"appDispatch.receiveWarehouseName",mapping:"receiveWarehouseName"}
 ];
var AppDispatchHiddenField = [
	{xtype:"hidden",name:"appDispatch.disid"},
	{xtype:"hidden",name:"appDispatch.projId"}
];
var AppDispatchComListViewField = ["compDeid","disid","compId","compName","dimensions","stockNum","disNum"];
var AppDispatchEquipListViewField = ["equipDeid","disid","equipId","equipName","equipSpec","recordId","disNum"];
var AppLogisticsListViewField = ["logiId","deliveryDate","sendWarehouseName","receiveWarehouseName","deliveryMan","propertyName","summary"];
var AppLogisticsFieldMapping = [
    {name:"appLogistics.logiId",mapping:"logiId"},
    {name:"appLogistics.deliveryDate",mapping:"deliveryDate"},
    {name:"appLogistics.deliveryMan",mapping:"deliveryMan"},
    {name:"appLogistics.propertyName",mapping:"propertyName"},
    {name:"appLogistics.sendWarehouseName",mapping:"sendWarehouseName"},
    {name:"appLogistics.receiveWarehouseName",mapping:"receiveWarehouseName"},
    {name:"appLogistics.licensePlate",mapping:"licensePlate"},
    {name:"appLogistics.summary",mapping:"summary"},
    {name:"appLogistics.signMan",mapping:"signMan"},
    {name:"appLogistics.signAddress",mapping:"signAddress"},
    {name:"appLogistics.signDate",mapping:"signDate"},
    {name:"appLogistics.signResult",mapping:"signResult"},
    {name:"appLogistics.fileAttaches",mapping:"fileAttaches"}
];
var AppLogisticsHiddenField = [
    {xtype:"hidden",name:"appLogistics.logiId"}
];
var AppLogisticsComListViewField = ["logiCompId","logiId","logiNum","tAppComponDispatchDetail.compName","tAppComponDispatchDetail.dimensions","tAppComponDispatchDetail.recordId","receNum"];
var AppLogisticsEquipListViewField = ["logiEquipId","logiId","logiNum","tAppEquipDispatchDetail.equipName","tAppEquipDispatchDetail.equipSpec","tAppEquipDispatchDetail.recordId","receNum"];


var AppRepairListViewField = ["repid","repairDt","buildingNum","equipId","equipSpec","recordSerial","exwSerial","projName","procMan","location","reportDt","faultLevel","procResult","state","stateName","createByname","faultDesc","repTimes","repScheme","repReason","repMan","disDate","repairType","repairTypeName", "repFee", "disRemark","equipSerial"];
var AppRepairComListViewField = ["rcid","repid","compName","compSpec","compNum"];
var AppRepairCostListViewField = ["repaircostId","relateId","hoursContent","maintenanceHours","price","amount","remarks"];
var AppRepairFieldMapping = [
    {name:"appRepair.repid",mapping:"repid"}, 
	{name:"appRepair.equipId",mapping:"equipId"}, 
	{name:"appRepair.equipSpec",mapping:"equipSpec"}, 
	{name:"appRepair.recordSerial",mapping:"recordSerial"}, 
	{name:"appRepair.exwSerial",mapping:"exwSerial"},
	{name:"appRepair.projName",mapping:"projName"}, 
	{name:"appRepair.reportDt",mapping:"reportDt"}, 
	{name:"appRepair.faultLevel",mapping:"faultLevel"}, 
	{name:"appRepair.faultDesc",mapping:"faultDesc"}, 
	{name:"appRepair.procMan",mapping:"procMan"}, 
	{name:"appRepair.location",mapping:"location"}, 
	{name:"appRepair.disMan",mapping:"disMan"},
	{name:"appRepair.disManName",mapping:"disManName"},
	{name:"appRepair.repairDt",mapping:"repairDt"}, 
	{name:"appRepair.repScheme",mapping:"repScheme"}, 
	{name:"appRepair.procResult",mapping:"procResult"}, 
	{name:"appRepair.repMan",mapping:"repMan"}, 
	{name:"appRepair.repTimes",mapping:"repTimes"}, 
	{name:"appRepair.repFee",mapping:"repFee"}, 
	{name:"appRepair.state",mapping:"state"}, 
	{name:"appRepair.stateName",mapping:"stateName"}, 
	{name:"appRepair.createDt",mapping:"createDt"}, 
	{name:"appRepair.createBy",mapping:"createBy"}, 
	{name:"appRepair.fileAttaches",mapping:"fileAttaches"}, 
	{name:"appRepair.hasview",mapping:"hasview"},
	{name:"appRepair.disDate",mapping:"disDate"}, 
	{name:"appRepair.repairTypeName",mapping:"repairTypeName"}, 
	{name:"appRepair.createByname",mapping:"createByname"}   	
  ];
var AppRepairHiddenField = [
  	{xtype:"hidden",name:"appRepair.repid"},
  	{xtype:"hidden",name:"appRepair.equipId"},
  	{xtype:"hidden",name:"appRepair.appRepairCostGrids"}
  ];
var AttendanceSetFieldMapping = [
 	{name:"attendamceSet.sid",mapping:"sid"},
 	{name:"attendamceSet.workDays",mapping:"workDays"},
 	{name:"attendamceSet.workSt",mapping:"workSt"},
 	{name:"attendamceSet.workEd",mapping:"workEd"},
 	{name:"attendamceSet.execDt",mapping:"execDt"},
 	{name:"attendamceSet.state",mapping:"state"},
 	{name:"attendamceSet.createDt",mapping:"createDt"}
];
var AttendamceSetHiddenField = [
	{xtype:"hidden",name:"attendamceSet.sid"},
	{xtype:"hidden",name:"attendamceSet.workDays"}
 ];
var FlowDefineListViewField = ["flowid","flowName","createDt","createByName","nodes"];
var FlowDefineNodeListViewField = ["nid","seq","nodeName","chkRoleName","chkRoleid"];
var FlowDefineFieldMapping=[
	{name:"flowDefine.flowid",mapping:"flowid"},
	{name:"flowDefine.flowName",mapping:"flowName"},
	{name:"flowDefine.createDt",mapping:"createDt"},
	{name:"flowDefine.createByName",mapping:"createByName"},
	{name:"flowDefine.createBy",mapping:"createBy"},
	{name:"flowDefine.nodes",mapping:"nodes"}
];
var FlowDefineHiddenField = [
   	{xtype:"hidden",name:"flowDefine.flowid"},
	{xtype:"hidden",name:"flowDefine.createBy"},
	{xtype:"hidden",name:"flowDefine.nodes"}
];
//===========================================================================//
var EquipWarehouseAbnormalFieldMapping = [
 	{name:"equipWarehouseAbnormal.abnormalId",mapping:"abnormalId"},
	{name:"equipWarehouseAbnormal.warehouseId",mapping:"warehouseId"},
	{name:"equipWarehouseAbnormal.projectName",mapping:"projectName"},
	{name:"equipWarehouseAbnormal.address",mapping:"address"},
	{name:"equipWarehouseAbnormal.principal",mapping:"principal"},
	{name:"equipWarehouseAbnormal.recordId",mapping:"recordId"},
	{name:"equipWarehouseAbnormal.equipGenericName",mapping:"equipGenericName"},
	{name:"equipWarehouseAbnormal.equipSpecificName",mapping:"equipSpecificName"},
	{name:"equipWarehouseAbnormal.exwSerial",mapping:"exwSerial"}
];
var EquipWarehouseAbnormalHiddenField = [
	{xtype:"hidden",name:"equipWarehouseAbnormal.abnormalId"},
	{xtype:"hidden",name:"equipWarehouseAbnormal.warehouseId"},
	{xtype:"hidden",name:"equipWarehouseAbnormal.equipWarehouseAbnormalCompons"}
];
var EquipWarehouseAbnormalListViewField = [ "abnormalId", "warehouseId", "projectName", "address", "principal", "recordId", "equipGenericName", "equipSpecificName", "exwSerial" ];
var EquipWarehouseAbnormalComponListViewField = [ "abnormalComponId", "abnormalId", "componGenericName", "componSpecificName", "dimensions", "calculate", "dispatchCounts", "warehouseWaitCounts", "warehouseCounts", "warehouseResultName", "statusName" ];
//===========================================================================//
var FileAttachListViewField = [ "fileId", "dependId", "dependName", "fileName", "filePath", "createtime", "ext", "fileType", "note", "creator" ];
//===========================================================================//
var AutocraneFieldMapping = [
 	{name:"autocrane.autocraneId",mapping:"autocraneId"},
	{name:"autocrane.autocraneSerial",mapping:"autocraneSerial"},
	{name:"autocrane.emEntName",mapping:"emEntName"},
	{name:"autocrane.inEntName",mapping:"inEntName"},
	{name:"autocrane.autocraneDepend",mapping:"autocraneDepend"},
	{name:"autocrane.autocraneDependName",mapping:"autocraneDependName"},
	{name:"autocrane.autocraneAmount",mapping:"autocraneAmount"},
	{name:"autocrane.paymentAmount",mapping:"paymentAmount"},
	{name:"autocrane.balanceAmount",mapping:"balanceAmount"},
	{name:"autocrane.remark",mapping:"remark"},
	{name:"autocrane.userId",mapping:"userId"},
	{name:"autocrane.userName",mapping:"userName"},
	{name:"autocrane.providedDate",mapping:"providedDate"},
	{name:"autocrane.effective",mapping:"effective"},
	{name:"autocrane.effectiveName",mapping:"effectiveName"},
	{name:"autocrane.fundStatus",mapping:"fundStatus"},
	{name:"autocrane.fundStatusName",mapping:"fundStatusName"},
	{name:"autocrane.autocraneExpenses",mapping:"autocraneExpenses"},
	{name:"autocrane.project.projectId",mapping:"project.projectId"},
	{name:"autocrane.project.projectName",mapping:"project.projectName"},
	{name:"autocrane.project.address",mapping:"project.address"},
	{name:"autocrane.equipment.equipId",mapping:"equipment.equipId"},
	{name:"autocrane.equipment.exwSerial",mapping:"equipment.exwSerial"},
	{name:"autocrane.equipment.recordId",mapping:"equipment.recordId"},
	{name:"autocrane.equipment.equipSpecificName",mapping:"equipment.equipSpecificName"}
];
var AutocraneHiddenField = [
	{xtype:"hidden",name:"autocrane.autocraneId"},
	{xtype:"hidden",name:"autocrane.project.projectId"},
	{xtype:"hidden",name:"autocrane.equipment.equipId"},
	{xtype:"hidden",name:"autocrane.userId"},
	{xtype:"hidden",name:"autocrane.effective"},
	{xtype:"hidden",name:"autocrane.fundStatus"},
	{xtype:"hidden",name:"autocrane.autocraneExpenses"}
];
var AutocraneListViewField = [ "autocraneId", "autocraneSerial", "emEntName", "inEntName", "autocraneDepend", "autocraneDependName", "autocraneAmount", "paymentAmount", "balanceAmount", "remark", "userId", "userName", "providedDate", "effective", "effectiveName", "fundStatusName", "project", "equipment" ];
var AutocraneExpenseListViewField = [ "autocraneExpenseId", "autocraneId", "specificName", "accountPrice", "quantity", "machineTeam", "summary", "remark" ];
//===========================================================================//
var EnterFactoryNoticeListViewField = ["factoryNoticeId","userName","providedDate","projectTel","startDate","installDate","conditions","craneFee","startLincense","regulators","lawContent","commandContent","otherContent","project","practitioner","regulatorsName","enterFactoryEquips"];
var EnterFactoryNoticeFieldMapping = [
    {name:"enterFactoryNotice.factoryNoticeId",mapping:"factoryNoticeId"},
    {name:"enterFactoryNotice.userName",mapping:"userName"},
    {name:"enterFactoryNotice.providedDate",mapping:"providedDate"},
    {name:"enterFactoryNotice.projectTel",mapping:"projectTel"},
    {name:"enterFactoryNotice.startDate",mapping:"startDate",type:"date",dateFormat:"Y-m-d H:i:s"},
    {name:"enterFactoryNotice.installDate",mapping:"installDate",type:"date",dateFormat:"Y-m-d H:i:s"},
    {name:"enterFactoryNotice.conditions",mapping:"conditions"},
    {name:"enterFactoryNotice.craneFee",mapping:"craneFee"},
    {name:"enterFactoryNotice.startLincense",mapping:"startLincense"},
    {name:"enterFactoryNotice.regulators",mapping:"regulators"},
    {name:"enterFactoryNotice.regulatorsName",mapping:"regulatorsName"},
    {name:"enterFactoryNotice.lawContent",mapping:"lawContent"},
    {name:"enterFactoryNotice.commandContent",mapping:"commandContent"},
    {name:"enterFactoryNotice.otherContent",mapping:"otherContent"},
    {name:"enterFactoryNotice.delFlag",mapping:"delFlag"},
    {name:"enterFactoryNotice.project.projectId",mapping:"project.projectId"},
    {name:"enterFactoryNotice.project.projectName",mapping:"project.projectName"},
    {name:"enterFactoryNotice.project.address",mapping:"project.address"},
    {name:"enterFactoryNotice.practitioner.practiId",mapping:"practitioner.practiId"},
    {name:"enterFactoryNotice.practitioner.practiName",mapping:"practitioner.practiName"},
    {name:"enterFactoryNotice.enterFactoryEquips",mapping:"enterFactoryEquips"}
];
var EnterFactoryNoticeHiddenField = [
    {xtype:"hidden",name:"enterFactoryNotice.factoryNoticeId"},
    {xtype:"hidden",name:"enterFactoryNotice.delFlag"},
    {xtype:"hidden",name:"enterFactoryNotice.project.projectId"},
    {xtype:"hidden",name:"enterFactoryNotice.practitioner.practiId"},
    {xtype:"hidden",name:"enterFactoryNotice.regulators"},
    {xtype:"hidden",name:"enterFactoryNotice.enterFactoryEquips"}
];
var EnterFactoryEquipListViewField = ["enFactoryEquipId","factoryNoticeId","equipGenericName","equipSpecificName","counts","initHeight","contractHeight","wallAttacheQty","brachium"];
//===========================================================================//
var ExitFactoryNoticeListViewField = ["exitFactoryNoticeId","userName","providedDate","projectTel","startDate","installDate","conditions","craneFee","startLincense","regulators","otherContent","project","practitioner","regulatorsName","exitFactoryEquips"];
var ExitFactoryNoticeFieldMapping = [
    {name:"exitFactoryNotice.exitFactoryNoticeId",mapping:"exitFactoryNoticeId"},
    {name:"exitFactoryNotice.userName",mapping:"userName"},
    {name:"exitFactoryNotice.providedDate",mapping:"providedDate"},
    {name:"exitFactoryNotice.projectTel",mapping:"projectTel"},
    {name:"exitFactoryNotice.startDate",mapping:"startDate",type:"date",dateFormat:"Y-m-d H:i:s"},
    {name:"exitFactoryNotice.installDate",mapping:"installDate",type:"date",dateFormat:"Y-m-d H:i:s"},
    {name:"exitFactoryNotice.conditions",mapping:"conditions"},
    {name:"exitFactoryNotice.craneFee",mapping:"craneFee"},
    {name:"exitFactoryNotice.startLincense",mapping:"startLincense"},
    {name:"exitFactoryNotice.regulators",mapping:"regulators"},
    {name:"exitFactoryNotice.regulatorsName",mapping:"regulatorsName"},
    {name:"exitFactoryNotice.otherContent",mapping:"otherContent"},
    {name:"exitFactoryNotice.delFlag",mapping:"delFlag"},
    {name:"exitFactoryNotice.project.projectId",mapping:"project.projectId"},
    {name:"exitFactoryNotice.project.projectName",mapping:"project.projectName"},
    {name:"exitFactoryNotice.project.address",mapping:"project.address"},
    {name:"exitFactoryNotice.practitioner.practiId",mapping:"practitioner.practiId"},
    {name:"exitFactoryNotice.practitioner.practiName",mapping:"practitioner.practiName"},
    {name:"exitFactoryNotice.exitFactoryEquips",mapping:"exitFactoryEquips"}
];
var ExitFactoryNoticeHiddenField = [
    {xtype:"hidden",name:"exitFactoryNotice.factoryNoticeId"},
    {xtype:"hidden",name:"exitFactoryNotice.delFlag"},
    {xtype:"hidden",name:"exitFactoryNotice.project.projectId"},
    {xtype:"hidden",name:"exitFactoryNotice.practitioner.practiId"},
    {xtype:"hidden",name:"exitFactoryNotice.regulators"},
    {xtype:"hidden",name:"exitFactoryNotice.exitFactoryEquips"}
];
var ExitFactoryEquipListViewField = ["exitFactoryEquipId","exitFactoryNoticeId","equipGenericName","equipSpecificName","counts","initHeight","contractHeight","wallAttacheQty","brachium"];

//===========================================================================//
                        
var BasicPreEmbeddingNoticeListViewField = ["preEmbeddingNoticeId","userName","providedDate","projectTel","startDate","installDate","reinforcementCondition","conditions","craneFee","otherContent","project","practitioner","basicPreEmbeddingEquips"];
var BasicPreEmbeddingNoticeFieldMapping = [
	{name:"basicPreEmbeddingNotice.preEmbeddingNoticeId",mapping:"preEmbeddingNoticeId"},
	{name:"basicPreEmbeddingNotice.userName",mapping:"userName"},
	{name:"basicPreEmbeddingNotice.providedDate",mapping:"providedDate"},
	{name:"basicPreEmbeddingNotice.projectTel",mapping:"projectTel"},
	{name:"basicPreEmbeddingNotice.startDate",mapping:"startDate",type:"date",dateFormat:"Y-m-d H:i:s"},
	{name:"basicPreEmbeddingNotice.installDate",mapping:"installDate",type:"date",dateFormat:"Y-m-d H:i:s"},
	{name:"basicPreEmbeddingNotice.reinforcementCondition",mapping:"reinforcementCondition"},
	{name:"basicPreEmbeddingNotice.conditions",mapping:"conditions"},
	{name:"basicPreEmbeddingNotice.craneFee",mapping:"craneFee"},
	{name:"basicPreEmbeddingNotice.otherContent",mapping:"otherContent"},
	{name:"basicPreEmbeddingNotice.delFlag",mapping:"delFlag"},
	{name:"basicPreEmbeddingNotice.project.projectId",mapping:"project.projectId"},
	{name:"basicPreEmbeddingNotice.project.projectName",mapping:"project.projectName"},
	{name:"basicPreEmbeddingNotice.project.address",mapping:"project.address"},
	{name:"basicPreEmbeddingNotice.practitioner.practiId",mapping:"practitioner.practiId"},
	{name:"basicPreEmbeddingNotice.practitioner.practiName",mapping:"practitioner.practiName"},
	{name:"enterFactoryNotice.basicPreEmbeddingEquips",mapping:"basicPreEmbeddingEquips"}
];
var BasicPreEmbeddingNoticeHiddenField = [
	{xtype:"hidden",name:"basicPreEmbeddingNotice.preEmbeddingNoticeId"},
	{xtype:"hidden",name:"basicPreEmbeddingNotice.delFlag"},
	{xtype:"hidden",name:"basicPreEmbeddingNotice.project.projectId"},
	{xtype:"hidden",name:"basicPreEmbeddingNotice.practitioner.practiId"},
	{xtype:"hidden",name:"basicPreEmbeddingNotice.regulators"},
	{xtype:"hidden",name:"basicPreEmbeddingNotice.basicPreEmbeddingEquips"}
];
var BasicPreEmbeddingEquipListViewField = ["preEmbeddingEquipId","preEmbeddingNoticeId","equipGenericName","equipSpecificName","counts"];
var printDataFieldMapping = [
    {name:"printData.printDataId",mapping:"printDataId"},
    {name:"printData.chaCheSiJiName",mapping:"chaCheSiJiName"},
    {name:"printData.zuoYeBuWei",mapping:"zuoYeBuWei"},
    {name:"printData.jiaoTongBuMen",mapping:"jiaoTongBuMen"},
    {name:"printData.jiaoDiRen",mapping:"jiaoDiRen"},
    {name:"printData.shiGongDate",mapping:"shiGongDate"},
    {name:"printData.anChaiProject",mapping:"anChaiProject"},
    {name:"printData.qiZhongProject",mapping:"qiZhongProject"},
    {name:"printData.zhiHuiProject",mapping:"zhiHuiProject"},
    {name:"printData.linShiProject",mapping:"linShiProject"},
    {name:"printData.qiCheDiaoProject",mapping:"qiCheDiaoProject"},
    {name:"printData.dianHanGongProject",mapping:"dianHanGongProject"},
    {name:"printData.hunNinTuProject",mapping:"hunNinTuProject"},
    {name:"printData.qiaoMenAnProject",mapping:"qiaoMenAnProject"},
    {name:"printData.qiaoMenCaoProject",mapping:"qiaoMenCaoProject"},
    {name:"printData.shalunProject",mapping:"shalunProject"},
    {name:"printData.fuZhuoProject",mapping:"fuZhuoProject"},
    {name:"printData.anChaiKindWork",mapping:"anChaiKindWork"},
    {name:"printData.caoZuoKindWork",mapping:"caoZuoKindWork"},
    {name:"printData.siSuoKindWork",mapping:"siSuoKindWork"},
    {name:"printData.dianGongKindWork",mapping:"dianGongKindWork"},
    {name:"printData.diaoZhuangKindWork",mapping:"diaoZhuangKindWork"},
    {name:"printData.dianHanKindWork",mapping:"dianHanKindWork"},
    {name:"printData.buLiaoKindWork",mapping:"buLiaoKindWork"},
    {name:"printData.qiaoAnKindWork",mapping:"qiaoAnKindWork"},
    {name:"printData.qiaoCaoKindWork",mapping:"qiaoCaoKindWork"},
    {name:"printData.shaLunKindWork",mapping:"shaLunKindWork"},
    {name:"printData.fuZhuoKindWork",mapping:"fuZhuoKindWork"},
    {name:"printData.zuoYeZhiDao",mapping:"zuoYeZhiDao"},
    {name:"printData.installContractSerial",mapping:"installContractSerial"},
    {name:"printData.dismantleContractSerial",mapping:"dismantleContractSerial"},
    {name:"printData.repairContractSerial",mapping:"repairContractSerial"},
    {name:"printData.pangZhanZuoYeDate",mapping:"pangZhanZuoYeDate"},
    {name:"printData.pangZhanZuoYeContent",mapping:"pangZhanZuoYeContent"},
    {name:"printData.pangZhanZuoYePerson",mapping:"pangZhanZuoYePerson"}
];

var SideStationFieldMapping = [
	{name:"sideStation.stationId",mapping:"stationId"},
	{name:"sideStation.stationSerial",mapping:"stationSerial"},
	{name:"sideStation.category",mapping:"category"},
	{name:"sideStation.details",mapping:"details"}
];
var SideStationHiddenField = [
	{xtype:"hidden",name:"sideStation.stationId"}
];
var SideStationListViewField = [ "stationId", "stationSerial", "category", "details"];

var SideSystemFieldMapping = [
	{name:"sideSystem.sideId",mapping:"sideId"},
	{name:"sideSystem.projectName",mapping:"projectName"},
	{name:"sideSystem.operationDate",mapping:"operationDate"},
	{name:"sideSystem.operationDetail",mapping:"operationDetail"},
	{name:"sideSystem.equipGeneric",mapping:"equipGeneric"},
	{name:"sideSystem.equipGenericName",mapping:"equipGenericName"},
	{name:"sideSystem.equipCategory",mapping:"equipCategory"},
	{name:"sideSystem.equipCategoryName",mapping:"equipCategoryName"},
	{name:"sideSystem.operationPersonnel",mapping:"operationPersonnel"},
	{name:"sideSystem.reportingPersonnel",mapping:"reportingPersonnel"},
	{name:"sideSystem.measure",mapping:"measure"},
	{name:"sideSystem.sideReportings",mapping:"sideReportings"}
];
var SideSystemHiddenField = [
	{xtype:"hidden",name:"sideSystem.sideId"},
	{xtype:"hidden",name:"sideSystem.sideReportings"},
];
var SideSystemListViewField = [ "sideId", "projectName", "operationDate", "operationDetail", "equipGeneric", 
                                "equipGenericName", "equipCategory", "equipCategoryName", "operationPersonnel",
                                "reportingPersonnel", "measure"];
var SideReportingListViewField = [ "reportingId", "sideId", "reportingDetail", "examineUpshot", "existQuestion"];

var MaterialsCommodityFieldMapping = [
{name:"materialsCommodity.commodityId",mapping:"commodityId"},
{name:"materialsCommodity.assetsProperty",mapping:"assetsProperty"},
{name:"materialsCommodity.commodity",mapping:"commodity"},
{name:"materialsCommodity.whetherUsing",mapping:"whetherUsing"},
{name:"materialsCommodity.dailyRent",mapping:"dailyRent"},
{name:"materialsCommodity.rentUnit",mapping:"rentUnit"},
{name:"materialsCommodity.compensationCosts",mapping:"compensationCosts"},
{name:"materialsCommodity.compensationUnit",mapping:"compensationUnit"}
];
var MaterialsCommodityHiddenField = [
{xtype:"hidden",name:"materialsCommodity.commodityId"}                                     
];
var MaterialsCommodityListViewField = [ "commodityId", "assetsProperty", "commodity", "whetherUsing", "dailyRent", "rentUnit", "compensationCosts","compensationUnit" ];    

var MaterialsAmortizationField = [
{xtype:"hidden",name:"materialsAmortization.amortizationId"}                                     
];
var MaterialsSpecificationsFieldMapping = [
{name:"materialsSpecifications.specificationsId",mapping:"specificationsId"},
{name:"materialsSpecifications.materialsCommodity.commodityId",mapping:"materialsCommodity.commodityId"},
{name:"materialsSpecifications.materialsCommodity.commodity",mapping:"materialsCommodity.commodity"},
{name:"materialsSpecifications.specifications",mapping:"specifications"},
{name:"materialsSpecifications.mnemonics",mapping:"mnemonics"},
{name:"materialsSpecifications.whetherUsing",mapping:"whetherUsing"},
{name:"materialsSpecifications.firstUnitConversion",mapping:"firstUnitConversion"},
{name:"materialsSpecifications.secondUnitConversion",mapping:"secondUnitConversion"},
{name:"materialsSpecifications.firstConvertedQuantity",mapping:"firstConvertedQuantity"},
{name:"materialsSpecifications.secondConvertedQuantity",mapping:"secondConvertedQuantity"}
];
var MaterialsSpecificationsHiddenField = [
{xtype:"hidden",name:"materialsSpecifications.specificationsId"}                               
];
var MaterialsSpecificationsListViewField = [ "specificationsId", "materialsCommodity.commodityId", "materialsCommodity.commodity", "specifications", "mnemonics", "whetherUsing", "firstUnitConversion", "secondUnitConversion", "firstConvertedQuantity", "secondConvertedQuantity" ];

var MaterialsDamageFieldMapping = [
{name:"materialsDamage.damageId",mapping:"damageId"},
{name:"materialsDamage.materialsCommodity.commodityId",mapping:"materialsCommodity.commodityId"},
{name:"materialsDamage.materialsCommodity.commodity",mapping:"materialsCommodity.commodity"},
{name:"materialsDamage.feesType",mapping:"feesType"},
{name:"materialsDamage.damageType",mapping:"damageType"},
{name:"materialsDamage.measurementUnit",mapping:"measurementUnit"},
{name:"materialsDamage.whetherUsing",mapping:"whetherUsing"},
{name:"materialsDamage.damageUnitPrice",mapping:"damageUnitPrice"}
];
var MaterialsDamageHiddenField = [
{xtype:"hidden",name:"materialsDamage.damageId"}                    
];

var MaterialsDamageListViewField = [ "damageId", "materialsCommodity.commodityId", "materialsCommodity.commodity", "feesType", "damageType", "measurementUnit", "whetherUsing", "damageUnitPrice" ];


//===========================================================================//


var MaterialsDamageListViewField = [ "damageId", "materialsCommodity.commodityId", "materialsCommodity.commodity", "feesType", "damageType", "measurementUnit", "whetherUsing", "damageUnitPrice" ];

var MaterialsAmortizationListViewField = [ "amortizationId","materialsCommodity.commodityId", "materialsCommodity.commodity",  "totalAmortizationMonths", "yearAmortizationRate","materialsCommodity" ];

var MaterialsAmortizationFieldMapping = [
{name:"materialsAmortization.amortizationId",mapping:"amortizationId"},
{name:"materialsAmortization.materialsCommodity.commodityId",mapping:"materialsCommodity.commodityId"},
{name:"materialsAmortization.materialsCommodity.commodity",mapping:"materialsCommodity.commodity"},
{name:"materialsAmortization.totalAmortizationMonths",mapping:"totalAmortizationMonths"},
{name:"materialsAmortization.yearAmortizationRate",mapping:"yearAmortizationRate"}
];

//----------------------


var AmortizationInitializationFieldMapping = [
{name:"amortizationInitialization.initializationId",mapping:"initializationId"},
{name:"amortizationInitialization.materialsAmortization.amortizationId",mapping:"materialsAmortization.amortizationId"},
{name:"amortizationInitialization.materialsAmortization.materialsCommodity.commodity",mapping:"materialsAmortization.materialsCommodity.commodity"},

{name:"amortizationInitialization.quantity",mapping:"quantity"},
{name:"amortizationInitialization.originalValue",mapping:"originalValue"},

{name:"amortizationInitialization.formationTime",mapping:"formationTime"},
{name:"amortizationInitialization.materialsAmortization.totalAmortizationMonths",mapping:"materialsAmortization.totalAmortizationMonths"},
{name:"amortizationInitialization.amortizedMonths",mapping:"amortizedMonths"},
{name:"amortizationInitialization.amortizedAmount",mapping:"amortizedAmount"},

{name:"amortizationInitialization.notyetAmortizedMonths",mapping:"notyetAmortizedMonths"},
{name:"amortizationInitialization.notyetAmortizedAmount",mapping:"notyetAmortizedAmount"},

];
var AmortizationInitializationField = [
{xtype:"hidden",name:"amortizationInitialization.initializationId"},
];
var MaterialsScrapHiddenField = [
{xtype:"hidden",name:"materialsScrap.scrapId"}
];
var MaterialsScrapFieldMapping = [
{name:"materialsScrap.scrapId",mapping:"scrapId"},
{name:"materialsScrap.materialsCommodity.commodityId",mapping:"materialsCommodity.commodityId"},
{name:"materialsScrap.materialsCommodity.commodity",mapping:"materialsCommodity.commodity"},
{name:"materialsScrap.feesType",mapping:"feesType"},
{name:"materialsScrap.scrapType",mapping:"scrapType"},
{name:"materialsScrap.whetherUsing",mapping:"whetherUsing"},
{name:"materialsScrap.measurementUnit",mapping:"measurementUnit"},
{name:"materialsScrap.scrapUnitPrice",mapping:"scrapUnitPrice"},

];

var MaterialsScrapListViewField = [ "scrapId", "materialsCommodity.commodityId", "materialsCommodity.commodity", "feesType", "measurementUnit", "whetherUsing", "scrapUnitPrice","scrapType" ];

var AssembleAndDisassembleFeeFieldMapping = [
{name:"assembleAndDisassembleFee.feeId",mapping:"feeId"},
{name:"assembleAndDisassembleFee.materialsCommodity.commodityId",mapping:"materialsCommodity.commodityId"},
{name:"assembleAndDisassembleFee.materialsCommodity.commodity",mapping:"materialsCommodity.commodity"},
{name:"assembleAndDisassembleFee.feesType",mapping:"feesType"},
{name:"assembleAndDisassembleFee.feeCategory",mapping:"feeCategory"},
{name:"assembleAndDisassembleFee.feesTypeName",mapping:"feesTypeName"},
{name:"assembleAndDisassembleFee.measurementUnit",mapping:"measurementUnit"},
{name:"assembleAndDisassembleFee.whetherUsing",mapping:"whetherUsing"},
{name:"assembleAndDisassembleFee.theoriesValueConversion",mapping:"theoriesValueConversion"},
{name:"assembleAndDisassembleFee.unitConversion",mapping:"unitConversion"},
{name:"assembleAndDisassembleFee.chargeUnitPrice",mapping:"chargeUnitPrice"}
];
var AssembleAndDisassembleFeeHiddenField = [
{xtype:"hidden",name:"assembleAndDisassembleFee.feeId"}
];
var AssembleAndDisassembleFeeListViewField = [ "feeId", "materialsCommodity.commodityId", "materialsCommodity.commodity", "feesTypeName", "measurementUnit", "whetherUsing", "theoriesValueConversion", "unitConversion", "chargeUnitPrice" ];


//===========================================================================//
var lendListFieldMapping = [
	{name:"corpCert.oddNumber",mapping:"oddNumber"},
	{name:"corpCert.projectName",mapping:"projectName"},
	{name:"corpCert.lessee",mapping:"lessee"},
	{name:"corpCert.storage",mapping:"storage"},
	{name:"corpCert.makeDate",mapping:"makeDate"},
	{name:"corpCert.status",mapping:"status"},
	{name:"corpCert.storage",mapping:"storage"},
	{name:"corpCert.locator",mapping:"locator"},
	{name:"corpCert.freight",mapping:"freight"},
	{name:"corpCert.tradeBoundName",mapping:"tradeBoundName"},
	{name:"corpCert.titleLevel",mapping:"titleLevel"},
	{name:"corpCert.titleLevelName",mapping:"titleLevelName"},
	{name:"corpCert.copyCertCount",mapping:"copyCertCount"},
	{name:"corpCert.noteNumber",mapping:"noteNumber"},
	{name:"corpCert.noteDate",mapping:"noteDate"},
	{name:"corpCert.organName",mapping:"organName"},
	{name:"corpCert.organDate",mapping:"organDate"},
	{name:"corpCert.endDate",mapping:"endDate"},
	{name:"corpCert.printNumber",mapping:"printNumber"},
	{name:"corpCert.mark",mapping:"mark"},
	{name:"corpCert.remark",mapping:"remark"},
	{name:"corpCert.isvalid",mapping:"isvalid"},
	{name:"corpCert.isvalidName",mapping:"isvalidName"},
	{name:"corpCert.defaultCert",mapping:"defaultCert"},
	{name:"corpCert.corpName",mapping:"corpName"}
];
var lendListHiddenField = [
	{xtype:"hidden",name:"corpCert.certId"},
	{xtype:"hidden",name:"corpCert.corpId"}
];
var lendtListViewField = [ "oddNumber", "projectName", "lessee", "storage", "makeDate", "status", "storage", "locator", "organDate", "freight", "isvalid", "isvalidName" ];

var AmortizationInitializationListViewField = [ "initializationId", "materialsAmortization.materialsCommodity.commodity", "materialsAmortization.amortizationId", "materialsAmortization.totalAmortizationMonths", "formationTime", "unit", "quantity", "originalValue", "amortizedMonths", "amortizedAmount", "notyetAmortizedMonths", "notyetAmortizedAmount" ];

var MaterialsDispatchFieldMapping = [
                                     {name:"materialsDispatch.materialsId",mapping:"materialsId"},
                                     {name:"materialsDispatch.dispatchSerial",mapping:"dispatchSerial"},
                                     {name:"materialsDispatch.dispatchTheme",mapping:"dispatchTheme"},
                                     {name:"materialsDispatch.applyDate",mapping:"applyDate"},
                                     {name:"materialsDispatch.userId",mapping:"userId"},
                                     {name:"materialsDispatch.userName",mapping:"userName"},
                                     {name:"materialsDispatch.storeId",mapping:"storeId"},
                                     {name:"materialsDispatch.storeName",mapping:"storeName"},
                                     {name:"materialsDispatch.locationId",mapping:"locationId"},
                                     {name:"materialsDispatch.storageLocation",mapping:"storageLocation"},
                                     {name:"materialsDispatch.status",mapping:"status"},
                                     {name:"materialsDispatch.contractId",mapping:"contractId"},
                                     {name:"materialsDispatch.contractSerial",mapping:"contractSerial"},
                                     {name:"materialsDispatch.contractNumber",mapping:"contractNumber"},
                                     {name:"materialsDispatch.pbEntId",mapping:"pbEntId"},
                                     {name:"materialsDispatch.pbEntName",mapping:"pbEntName"},
                                     {name:"materialsDispatch.projectId",mapping:"projectId"},
                                     {name:"materialsDispatch.projectName",mapping:"projectName"},
                                     {name:"materialsDispatch.vehicleNum",mapping:"vehicleNum"},
                                     {name:"materialsDispatch.vehiclePerson",mapping:"vehiclePerson"},
                                     {name:"materialsDispatch.applyforState",mapping:"applyforState"},
                                     {name:"materialsDispatch.applyforStateName",mapping:"applyforStateName"},
                                     {name:"materialsDispatch.address",mapping:"address"},
                                     {name:"materialsDispatch.remark",mapping:"remark"}
                                     ];
var MaterialsDispatchHiddenField = [
{xtype:"hidden",name:"materialsDispatch.materialsId"},
{xtype:"hidden",name:"materialsDispatch.storeId"},
{xtype:"hidden",name:"materialsDispatch.locationId"},
{xtype:"hidden",name:"materialsDispatch.contractNumber"},
{xtype:"hidden",name:"materialsDispatch.address"},
{xtype:"hidden",name:"materialsDispatch.projectId"},
{xtype:"hidden",name:"materialsDispatch.dispatchMaterialss"}              
                             ];
 var MaterialsDispatchListViewField = ["materialsId","dispatchSerial","applyDate","userId","userName","storeName","storageLocation","status","contractId","contractSerial","pbEntId","pbEntName","projectName","vehicleNum","vehiclePerson","applyforState","applyforStateName","effective", "effectiveName","measurementUnit","dispatchMaterialsSet","dispatchTheme","address","projectId","storeId","locationId"];
  
 var MaterialsPackageFieldMapping = [
     {name:"materialsPackage.packageId",mapping:"packageId"},
     {name:"materialsPackage.packageSerial",mapping:"packageSerial"},
     {name:"materialsPackage.applyDate",mapping:"applyDate"},
     {name:"materialsPackage.userId",mapping:"userId"},
     {name:"materialsPackage.userName",mapping:"userName"},
     {name:"materialsPackage.storeId",mapping:"storeId"},
     {name:"materialsPackage.storeName",mapping:"storeName"},
     {name:"materialsPackage.locationId",mapping:"locationId"},
     {name:"materialsPackage.storageLocation",mapping:"storageLocation"},
     {name:"materialsPackage.status",mapping:"status"},
     {name:"materialsPackage.contractId",mapping:"contractId"},
     {name:"materialsPackage.contractSerial",mapping:"contractSerial"},
     {name:"materialsPackage.pbEntId",mapping:"pbEntId"},
     {name:"materialsPackage.pbEntName",mapping:"pbEntName"},
     {name:"materialsPackage.projectId",mapping:"projectId"},
     {name:"materialsPackage.projectName",mapping:"projectName"},
     {name:"materialsPackage.packageDate",mapping:"packageDate"},
     {name:"materialsPackage.attachSerial",mapping:"attachSerial"},
     {name:"materialsPackage.rentType",mapping:"rentType"},
     {name:"materialsPackage.rentTypeName",mapping:"rentTypeName"},
     {name:"materialsPackage.vehicleNum",mapping:"vehicleNum"},
     {name:"materialsPackage.vehiclePerson",mapping:"vehiclePerson"},
     {name:"materialsPackage.qrCode",mapping:"qrCode"},
     {name:"materialsPackage.tranportAmount",mapping:"tranportAmount"},
     {name:"materialsPackage.tranportCaculateType",mapping:"tranportCaculateType"},
     {name:"materialsPackage.dispatchAuditorId",mapping:"dispatchAuditorId"},
     {name:"materialsPackage.dispatchAuditorName",mapping:"dispatchAuditorName"},
     {name:"materialsPackage.dispatchAuditorDate",mapping:"dispatchAuditorDate"},
     {name:"materialsPackage.orderAuditorId",mapping:"orderAuditorId"},
     {name:"materialsPackage.orderAuditorName",mapping:"orderAuditorName"},
     {name:"materialsPackage.orderAuditorDate",mapping:"orderAuditorDate"},
     {name:"materialsPackage.applyforState",mapping:"applyforState"},
     {name:"materialsPackage.applyforStateName",mapping:"applyforStateName"},
     {name:"materialsPackage.handingCharge",mapping:"handingCharge"},
     {name:"materialsPackage.packAmount",mapping:"packAmount"},
     {name:"materialsPackage.materialsId",mapping:"materialsId"},
     {name:"materialsPackage.delFlag",mapping:"delFlag"},
     {name:"materialsPackage.receiveId",mapping:"receiveId"},
     {name:"materialsPackage.receiveName",mapping:"receiveName"},
     {name:"materialsPackage.remark",mapping:"remark"}
 ];
 var MaterialsPackageHiddenField = [
{xtype:"hidden",name:"materialsPackage.packageId"},
{xtype:"hidden",name:"materialsPackage.pbEntId"},
{xtype:"hidden",name:"materialsPackage.pbEntName"},
{xtype:"hidden",name:"materialsPackage.projectId"},
{xtype:"hidden",name:"materialsPackage.storeId"},
{xtype:"hidden",name:"materialsPackage.locationId"},
{xtype:"hidden",name:"materialsPackage.materialsId"},
{xtype:"hidden",name:"materialsPackage.receiveId"},
{xtype:"hidden",name:"materialsPackage.packageDetails"},
{xtype:"hidden",name:"materialsPackage.costDetails"}
                                     ];
 var MaterialsPackageListViewField = ["packageId","packageSerial","applyDate","userId","userName","storeName","storageLocation","status","contractId","contractSerial","pbEntId","pbEntName","projectName","packageDate","attachSerial","rentType","vehicleNum","vehiclePerson",
    "qrCode","tranportAmount","tranportCaculateType","dispatchAuditorId","dispatchAuditorName","dispatchAuditorDate","orderAuditorId","orderAuditorName","orderAuditorDate","applyforState","applyforStateName","dispatchMaterialsSet","handingCharge","packAmount","receiveName",
    "acceptTime","approveTime","rentTypeName"];
 

var TakeStockListViewField = [];

var MaterialsPlanListViewField = [ "materialsPlanId","documentSerial","projectName","reportingTime","projectType","projectTypeName","userId","userName","planType","planTypeName","assetsProperty","assetsPropertyName","applyforState","applyforStateName","address" ];

var MaterialsPlanFieldMapping = [
{name:"materialsPlan.materialsPlanId",mapping:"materialsPlanId"},                       
{name:"materialsPlan.title",mapping:"title"},
{name:"materialsPlan.belongToArea",mapping:"belongToArea"},
{name:"materialsPlan.belongToAreaName",mapping:"belongToAreaName"},
{name:"materialsPlan.confirmingPerson",mapping:"confirmingPerson"},
{name:"materialsPlan.userId",mapping:"userId"},
{name:"materialsPlan.userName",mapping:"userName"},
{name:"materialsPlan.confirmationDate",mapping:"confirmationDate"},
{name:"materialsPlan.reportingTime",mapping:"reportingTime"},
{name:"materialsPlan.engineeringSchedule",mapping:"engineeringSchedule"},
{name:"materialsPlan.approver",mapping:"approver"},
{name:"materialsPlan.remark",mapping:"remark"},
{name:"materialsPlan.projectId",mapping:"projectId"},
{name:"materialsPlan.projectName",mapping:"projectName"},
{name:"materialsPlan.approvalDate",mapping:"approvalDate"},
{name:"materialsPlan.assetsProperty",mapping:"assetsProperty"},
{name:"materialsPlan.assetsPropertyName",mapping:"assetsPropertyName"},
{name:"materialsPlan.projectType",mapping:"projectType"},
{name:"materialsPlan.projectTypeName",mapping:"projectTypeName"},
{name:"materialsPlan.planType",mapping:"planType"},
{name:"materialsPlan.planTypeName",mapping:"planTypeName"},
{name:"materialsPlan.applyforState",mapping:"applyforState"},
{name:"materialsPlan.applyforStateName",mapping:"applyforStateName"},
{name:"materialsPlan.documentSerial",mapping:"documentSerial"}
];
var DemandDetailListViewField = ["demandId","materialsPlanId","serialNum","mnemonicCode","commodity","specifications","brand","unit","demandNum","auxiliaryUnit","auxiliaryNum","startDate","secondConvertedQuantity"];
var MaterialsPlanHiddenField = [
{xtype:"hidden",name:"materialsPlan.materialsPlanId"},
{xtype:"hidden",name:"materialsPlan.projectId"},
{xtype:"hidden",name:"materialsPlan.address"},
{xtype:"hidden",name:"materialsPlan.userId"},
{xtype:"hidden",name:"materialsPlan.demandId"},
{xtype:"hidden",name:"materialsPlan.demandDetails"}
];

var TruckPlanListViewField = 

["truckPlanId","truckPlanSerial","truckPlanTheme","providedDate","projectId","projectName","customerId","customerName","startDate","applyforState","applyforStateName"];
var TruckPlanFieldMapping = [
{name:"truckPlan.truckPlanId",mapping:"truckPlanId"},
{name:"truckPlan.truckPlanSerial",mapping:"truckPlanSerial"},
{name:"truckPlan.truckPlanTheme",mapping:"truckPlanTheme"},
{name:"truckPlan.applyforState",mapping:"applyforState"},
{name:"truckPlan.applyforStateName",mapping:"applyforStateName"},
{name:"truckPlan.userId",mapping:"userId"},
{name:"truckPlan.userName",mapping:"userName"},
{name:"truckPlan.providedDate",mapping:"providedDate"},
{name:"truckPlan.customerId",mapping:"customerId"},
{name:"truckPlan.customerName",mapping:"customerName"},
{name:"truckPlan.projectId",mapping:"projectId"},
{name:"truckPlan.projectName",mapping:"projectName"},
{name:"truckPlan.sigingTime",mapping:"sigingTime"},
{name:"truckPlan.practiId",mapping:"practiId"},
{name:"truckPlan.practiName",mapping:"practiName"},
{name:"truckPlan.projectManger",mapping:"projectManger"},
{name:"truckPlan.tel",mapping:"tel"},
{name:"truckPlan.pbEnt",mapping:"pbEnt"},
{name:"truckPlan.pbModule",mapping:"pbModule"},
{name:"truckPlan.pbEntName",mapping:"pbEntName"},
{name:"truckPlan.pbEntLinkMan",mapping:"pbEntLinkMan"},
{name:"truckPlan.pbEntLinkTel",mapping:"pbEntLinkTel"},
{name:"truckPlan.startDate",mapping:"startDate"},
{name:"truckPlan.projectaddress",mapping:"projectaddress"}
//{name:"truckPlan.remark",mapping:"remark"},
//{name:"truckPlan.fileAttaches",mapping:"fileAttaches"},
];

var TruckPlanHiddenField = [
{xtype:"hidden",name:"truckPlan.truckPlanId"},
{xtype:"hidden",name:"truckPlan.customerId"},
{xtype:"hidden",name:"truckPlan.applyforState"},
{xtype:"hidden",name:"truckPlan.corpId"},
{xtype:"hidden",name:"truckPlan.corpId"},
{xtype:"hidden",name:"truckPlan.userId"},
{xtype:"hidden",name:"truckPlan.projectId"}
]

var ExeuntPlanListViewField = ["exeuntPlanId","exeuntPlanSerial","declareDate","projectId","projectName","projectType","projectTypeName","planApplicant","belongToArea","belongToAreaName","planType","planTypeName","assetsProperty","assetsPropertyName","backStoreId","backStoreName","workFlow","title","projectSchedule","remark","userId","applyforState","applyforStateName"];
var ExeuntPlanFieldMapping = [
	{name:"exeuntPlan.exeuntPlanId",mapping:"exeuntPlanId"},
	{name:"exeuntPlan.exeuntPlanSerial",mapping:"exeuntPlanSerial"},
	{name:"exeuntPlan.declareDate",mapping:"declareDate"},
	{name:"exeuntPlan.projectId",mapping:"projectId"},
	{name:"exeuntPlan.projectName",mapping:"projectName"},
	{name:"exeuntPlan.projectType",mapping:"projectType"},
	{name:"exeuntPlan.planApplicant",mapping:"planApplicant"},
	{name:"exeuntPlan.belongToArea",mapping:"belongToArea"},
	{name:"exeuntPlan.belongToAreaName",mapping:"belongToAreaName"},
	{name:"exeuntPlan.planType",mapping:"planType"},
	{name:"exeuntPlan.planTypeName",mapping:"planTypeName"},
	{name:"exeuntPlan.assetsProperty",mapping:"assetsProperty"},
	{name:"exeuntPlan.backStoreId",mapping:"backStoreId"},
	{name:"exeuntPlan.backStoreName",mapping:"backStoreName"},
	{name:"exeuntPlan.workFlow",mapping:"workFlow"},
	{name:"exeuntPlan.title",mapping:"title"},
	{name:"exeuntPlan.projectSchedule",mapping:"projectSchedule"},
	{name:"exeuntPlan.remark",mapping:"remark"},
	{name:"exeuntPlan.userId",mapping:"userId"},
	{name:"exeuntPlan.applyforState",mapping:"applyforState"}
];
var ExeuntPlanHiddenField = [
	                            {xtype:"hidden",name:"exeuntPlan.exeuntPlanId"},
	                            {xtype:"hidden",name:"exeuntPlan.exeuntPlanSerial"},
	                            {xtype:"hidden",name:"exeuntPlan.userId"},
	                            {xtype:"hidden",name:"exeuntPlan.projectId"},
	                            {xtype:"hidden",name:"exeuntPlan.backStoreId"}
                            ];
var DemandDetailForExeuntPlanListViewField = ["demandId","exeuntPlanId","serialNum","mnemonicCode","commodity","specifications","brand","unit","demandNum","auxiliaryUnit","auxiliaryNum","exeuntDate"];
var BaseDepotFieldMapping = [
                             {name:"baseDepot.depotId",mapping:"depotId"},
                             {name:"baseDepot.depotName",mapping:"depotName"},
                             {name:"baseDepot.address",mapping:"address"},
                             {name:"baseDepot.linkman",mapping:"linkman"},
                             {name:"baseDepot.permission",mapping:"permission"},
                             {name:"baseDepot.jurisdiction",mapping:"jurisdiction"},
                             {name:"baseDepot.description",mapping:"description"}
                             ];
var BaseDepotHiddenField = [
	{xtype:"hidden",name:"baseDepot.depotId"},
	{xtype:"hidden",name:"baseDepot.baseDepotPermissions"}
];
var BaseDepotListViewField = [ "depotId", "depotName", "linkman", "address", "permission", "jurisdiction", "description" ];    


var BaseLocationFieldMapping = [
 	{name:"baseLocation.locationId",mapping:"locationId"},
 	{name:"baseLocation.baseDepot.depotId",mapping:"baseDepot.depotId"},
 	{name:"baseLocation.locationSerial",mapping:"locationSerial"},
 	{name:"baseLocation.locationName",mapping:"locationName"},
	{name:"baseLocation.depotName",mapping:"depotName"},
	{name:"baseLocation.address",mapping:"address"},
 	{name:"baseLocation.linkman",mapping:"linkman"},
 	{name:"baseLocation.permission",mapping:"permission"},
 	{name:"baseLocation.description",mapping:"description"}
];
var BaseLocationHiddenField = [
	{xtype:"hidden",name:"baseLocation.locationId"},
	{xtype:"hidden",name:"baseLocation.baseDepot.depotId"},
	{xtype:"hidden",name:"baseLocation.baseLocationPermissions"}
];
var BaseLocationListViewField = [ "locationId","locationSerial","locationName", "depotName", "linkman", "address", "permission", "description" ]; 

var ContractMaterialsListViewField = ["contractmaId","applyforState","applyforStateName","contractNumber","contractTheme","contractCategory","contractCategoryName",
                                      "projectId","projectName","contractSerial","paEntName","pbEntName","contractNumber","taxCaculateType","taxCaculateTypeName","taxRate",
                                      "rentalRate","address","sigingTime","competentDepartment","tranportCaculateType","tranportCaculateTypeName"];
var ContractMaterialsFieldMapping = [
    {name:"contractMaterials.contractmaId",mapping:"contractmaId"},                                 
    {name:"contractMaterials.applyforState",mapping:"applyforState"},
    {name:"contractMaterials.applyforStateName",mapping:"applyforStateName"},
	{name:"contractMaterials.assetsProperty",mapping:"assetsProperty"},
	{name:"contractMaterials.assetsPropertyName",mapping:"assetsPropertyName"},
	{name:"contractMaterials.projectTypeName",mapping:"projectTypeName"},
	{name:"contractMaterials.projectType",mapping:"projectType"},
    {name:"contractMaterials.contractTheme",mapping:"contractTheme"},
    {name:"contractMaterials.contractSerial",mapping:"contractSerial"},
    {name:"contractMaterials.contractCategory",mapping:"contractCategory"},
    {name:"contractMaterials.contractCategoryName",mapping:"contractCategoryName"},
    {name:"contractMaterials.belongToArea",mapping:"belongToArea"},
    {name:"contractMaterials.belongToAreaName",mapping:"belongToAreaName"},
    {name:"contractMaterials.projectId",mapping:"projectId"},
    {name:"contractMaterials.projectName",mapping:"projectName"},
    {name:"contractMaterials.buildingArea",mapping:"buildingArea"},
    {name:"contractMaterials.sigingTime",mapping:"sigingTime"},
    {name:"contractMaterials.taxRate",mapping:"taxRate"},
    {name:"contractMaterials.contractNumber",mapping:"contractNumber"},
    {name:"contractMaterials.paEnt",mapping:"paEnt"},
    {name:"contractMaterials.paModule",mapping:"paModule"},
    {name:"contractMaterials.paEntName",mapping:"paEntName"},
    {name:"contractMaterials.paEntLinkMan",mapping:"paEntLinkMan"},
    {name:"contractMaterials.tranportCaculateType",mapping:"tranportCaculateType"},
    {name:"contractMaterials.tranportCaculateTypeName",mapping:"tranportCaculateTypeName"},
    {name:"contractMaterials.finSettingAmount",mapping:"finSettingAmount"},
    {name:"contractMaterials.province",mapping:"province"},
    {name:"contractMaterials.provinceName",mapping:"provinceName"},
    {name:"contractMaterials.city",mapping:"city"},
    {name:"contractMaterials.cityName",mapping:"cityName"},
    {name:"contractMaterials.county",mapping:"county"},
    {name:"contractMaterials.countyName",mapping:"countyName"},
    {name:"contractMaterials.pbEnt",mapping:"pbEnt"},
    {name:"contractMaterials.pbModule",mapping:"pbModule"},
    {name:"contractMaterials.pbEntName",mapping:"pbEntName"},
    {name:"contractMaterials.pbEntLinkMan",mapping:"pbEntLinkMan"},
    {name:"contractMaterials.taxCaculateType",mapping:"taxCaculateType"},
    {name:"contractMaterials.taxCaculateTypeName",mapping:"taxCaculateTypeName"},
    {name:"contractMaterials.finReceivableAmount",mapping:"finReceivableAmount"},
    {name:"contractMaterials.freight",mapping:"freight"},
    {name:"contractMaterials.rentalRate",mapping:"rentalRate"},
    {name:"contractMaterials.preReceivable",mapping:"preReceivable"},
    {name:"contractMaterials.contractAmount",mapping:"contractAmount"},
    {name:"contractMaterials.validationAmount",mapping:"validationAmount"},
    {name:"contractMaterials.competentDepartment",mapping:"competentDepartment"},
    {name:"contractMaterials.remark",mapping:"remark"},
    {name:"contractMaterials.address",mapping:"address"},
    {name:"appUser.username",mapping:"username"},
    {name:"appUser.fullname",mapping:"fullname"},
    {name:"appUser.mobile",mapping:"mobile"}
];
var ContractMaterialsHiddenField = [
    {xtype:"hidden",name:"contractMaterials.contractmaId"},
    {xtype:"hidden",name:"contractMaterials.projectId"},
    {xtype:"hidden",name:"contractMaterials.paEnt"},
	{xtype:"hidden",name:"contractMaterials.paModule"},
	{xtype:"hidden",name:"contractMaterials.pbEnt"},
	{xtype:"hidden",name:"contractMaterials.pbModule"},
	{xtype:"hidden",name:"contractMaterials.assetsProperty"},
	{xtype:"hidden",name:"contractMaterials.projectType"},
	{xtype:"hidden",name:"contractMaterials.belongToArea"},
	{xtype:"hidden",name:"contractMaterials.materialsDetails"},
	{xtype:"hidden",name:"contractMaterials.priceSettings"},
	{xtype:"hidden",name:"contractMaterials.matDamages"},
	{xtype:"hidden",name:"contractMaterials.costHandles"},
	{xtype:"hidden",name:"contractMaterials.compensationScraps"}
]


var CeaseReportFieldMapping = [
   {name:"ceaseReport.ceaseId",mapping:"ceaseId"},
   {name:"ceaseReport.ceaseSerial",mapping:"ceaseSerial"},
   {name:"ceaseReport.userId",mapping:"userId"},
   {name:"ceaseReport.userName",mapping:"userName"},
   {name:"ceaseReport.status",mapping:"status"},
   {name:"ceaseReport.statusName",mapping:"statusName"},
   {name:"ceaseReport.ceaseTitle",mapping:"ceaseTitle"},
   {name:"ceaseReport.startDate",mapping:"startDate"},
   {name:"ceaseReport.endDate",mapping:"endDate"},
   {name:"ceaseReport.applyDate",mapping:"applyDate"},
   {name:"ceaseReport.settledAmount",mapping:"settledAmount"},
   {name:"ceaseReport.finishAmount",mapping:"finishAmount"},
   {name:"ceaseReport.backoff",mapping:"backoff"},
   {name:"ceaseReport.tranportCaculateType",mapping:"tranportCaculateType"},
   {name:"ceaseReport.tranportCaculateTypeName",mapping:"tranportCaculateTypeName"},
   {name:"ceaseReport.caculateRule",mapping:"caculateRule"},
   {name:"ceaseReport.caculateRuleName",mapping:"caculateRuleName"},
   {name:"ceaseReport.contractMaterials.contractSerial",mapping:"contractMaterials.contractSerial"},
   {name:"ceaseReport.contractMaterials.contractCategoryName",mapping:"contractMaterials.contractCategoryName"},
   {name:"ceaseReport.contractMaterials.competentDepartment",mapping:"contractMaterials.competentDepartment"},
   {name:"ceaseReport.contractMaterials.projectName",mapping:"contractMaterials.projectName"},
   {name:"ceaseReport.contractMaterials.taxCaculateTypeName",mapping:"contractMaterials.taxCaculateTypeName"},
   {name:"ceaseReport.contractMaterials.rentalRate",mapping:"contractMaterials.rentalRate"},
   {name:"ceaseReport.contractMaterials.contractTheme",mapping:"contractMaterials.contractTheme"},
   {name:"ceaseReport.contractMaterials.taxRate",mapping:"contractMaterials.taxRate"},
   {name:"ceaseReport.contractMaterials.paEntName",mapping:"contractMaterials.paEntName"},
   {name:"ceaseReport.contractMaterials.pbEntName",mapping:"contractMaterials.pbEntName"}
   ];	
var CeaseReportHiddenField = [
	{xtype:"hidden",name:"ceaseReport.ceaseId"},          
	{xtype:"hidden",name:"ceaseReport.userId"},          
	{xtype:"hidden",name:"ceaseReport.tranportCaculateType"},          
	{xtype:"hidden",name:"ceaseReport.contractMaterials.contractmaId"},          
	{xtype:"hidden",name:"ceaseReport.ceaseReportDetails"}         
];
var CeaseReportListViewField = ["ceaseId","ceaseSerial","userName","settledAmount","applyDate","startDate","endDate","status","statusName",
     "ceaseTitle","contractMaterials.contractSerial","contractMaterials.projectName","contractMaterials.paEntName","contractMaterials"]; 
var CeaseReportDetailViewField = ["detailId", "ceaseId","item", "amount"];

var TakeStockFieldMapping = [
	{name:"takeStock.takeStockId",mapping:"takeStockId"},
	{name:"takeStock.invoicesSerial",mapping:"invoicesSerial"},
	{name:"takeStock.userId",mapping:"userId"},
	{name:"takeStock.userName",mapping:"userName"},
	{name:"takeStock.takeStockDate",mapping:"takeStockDate"},
	{name:"takeStock.storeId",mapping:"storeId"},
	{name:"takeStock.storeName",mapping:"storeName"},
	{name:"takeStock.applyforState",mapping:"applyforState"},
	{name:"takeStock.remark",mapping:"remark"},
	{name:"takeStock.baldetails",mapping:"baldetails"},
	{name:"takeStock.locationId",mapping:"locationId"},
	{name:"takeStock.locationName",mapping:"locationName"}
];
var TakeStockHiddenField = [
	{xtype:"hidden",name:"takeStock.takeStockId"},
	{xtype:"hidden",name:"takeStock.baldetails"},
	{xtype:"hidden",name:"takeStock.storeId"},
	{xtype:"hidden",name:"takeStock.locationId"}
];
var TakeStockListViewField = ["takeStockId","invoicesSerial","userId","userName","takeStockDate","storeId","storeName","applyforState","applyforStateName","remark","locationId","locationName"];


var StorePersonnelAuthorizationMapping = [
	 {name:"takeStock.userName",mapping:"userName"},
	 {name:"takeStock.fullName",mapping:"fullName"},
	 {name:"takeStock.department",mapping:"department"},
	 {name:"takeStock.phoneNumber",mapping:"phoneNumber"}
];


var AnchPriceListMapping = [
	 {name:"takeStock.engineeringArea",mapping:"engineeringArea"},
	 {name:"takeStock.componSpecificName",mapping:"componSpecificName"},
	 {name:"takeStock.anchType",mapping:"anchType"},
	 {name:"takeStock.caculate",mapping:"caculate"},
	 {name:"takeStock.projectPrice",mapping:"projectPrice"},
	 {name:"takeStock.caculate",mapping:"caculate"},
	 {name:"takeStock.unitPrice",mapping:"unitPrice"}
];
AnchPriceListViewField = ["engineeringArea","componSpecificName","anchType","caculate","projectPrice","caculate","unitPrice"];

var InstallDismantlePriceFieldMapping = [
     {name:"installDismantlePrice.priceId",mapping:"priceId"},
     {name:"installDismantlePrice.belongToArea",mapping:"belongToArea"},
     {name:"installDismantlePrice.equipSpecific",mapping:"equipSpecific"},
     {name:"installDismantlePrice.equipGenericName",mapping:"equipGenericName"},
     {name:"installDismantlePrice.installDismantleType",mapping:"installDismantleType"},
     {name:"installDismantlePrice.measurementUnit",mapping:"measurementUnit"},
     {name:"installDismantlePrice.installDismantleTypeName",mapping:"installDismantleTypeName"},
     {name:"installDismantlePrice.projectPrice",mapping:"projectPrice"},
     {name:"installDismantlePrice.teamPrice",mapping:"teamPrice"}
     ];
var InstallDismantlePriceHiddenField = [
{xtype:"hidden",name:"installDismantlePrice.priceId"}  
];
var InstallDismantlePriceListViewField = ["priceId","belongToArea","equipSpecific","equipGenericName","installDismantleType","measurementUnit","installDismantleTypeName","projectPrice","teamPrice","belongToAreaName","equipSpecificName"];


var BaseDepotInitFieldMapping = [
	{name:"baseDepotInit.depotInitId",mapping:"depotInitId"},
 	{name:"baseDepotInit.baseDepot.depotId",mapping:"baseDepot.depotId"},
 	{name:"baseDepotInit.depotName",mapping:"depotName"},
 	{name:"baseDepotInit.mnemonics",mapping:"mnemonics"},
	{name:"baseDepotInit.commodity",mapping:"commodity"},
	{name:"baseDepotInit.specifications",mapping:"specifications"},
 	{name:"baseDepotInit.quantity",mapping:"quantity"},
 	{name:"baseDepotInit.unit",mapping:"unit"},
 	{name:"baseDepotInit.conversion",mapping:"conversion"},
 	{name:"baseDepotInit.supplementQuantity",mapping:"supplementQuantity"},
 	{name:"baseDepotInit.supplementUnit",mapping:"supplementUnit"},
 	{name:"baseDepotInit.supplementTotal",mapping:"supplementTotal"},
 	{name:"baseDepotInit.specificationsId",mapping:"specificationsId"},
 	{name:"baseDepotInit.effective",mapping:"effective"},
 	{name:"baseDepotInit.total",mapping:"total"}
];
var BaseDepotInitHiddenField = [
   	{xtype:"hidden",name:"baseDepotInit.depotInitId"},
   	{xtype:"hidden",name:"baseDepotInit.effective"},
   	{xtype:"hidden",name:"baseDepotInit.specificationsId"},
   	{xtype:"hidden",name:"baseDepotInit.baseDepot.depotId"},
   	{xtype:"hidden",name:"baseDepotInit.baseDepotInitDetails"}
 ];
var BaseDepotInitListViewField = [ "depotInitId","mnemonics","depotName", "commodity", "specifications", "total","unit","supplementQuantity","supplementUnit","conversion","supplementTotal","effective","effectiveName"]; 
var BaseDepotInitDetailListViewField = [ "detailId","locationId","locationName","quantity","depotInitId","supplementQuantity","unit","conversion","supplementUnit"];
var StoreDetailGridListViewField = ["storeName", "counts"];

var ProjectDepotInitFieldMapping = [
 	{name:"projectDepotInit.projectInitId",mapping:"projectInitId"},
  	{name:"projectDepotInit.projectId",mapping:"projectId"},
  	{name:"projectDepotInit.projectSerial",mapping:"projectSerial"},
  	{name:"projectDepotInit.projectName",mapping:"projectName"},
 	{name:"projectDepotInit.unCustomName",mapping:"unCustomName"},
 	{name:"projectDepotInit.address",mapping:"address"},
  	{name:"projectDepotInit.total",mapping:"total"},
  	{name:"projectDepotInit.initPerson",mapping:"initPerson"},
  	{name:"projectDepotInit.effective",mapping:"effective"},
  	{name:"projectDepotInit.contractSerial",mapping:"contractSerial"},
  	{name:"projectDepotInit.contractId",mapping:"contractId"},
  	{name:"projectDepotInit.initDate",mapping:"initDate"}
];
 var ProjectDepotInitHiddenField = [
	{xtype:"hidden",name:"projectDepotInit.projectInitId"},
	{xtype:"hidden",name:"projectDepotInit.effective"},
	{xtype:"hidden",name:"projectDepotInit.projectId"},
	{xtype:"hidden",name:"projectDepotInit.contractId"},
	{xtype:"hidden",name:"projectDepotInit.projectDepotInitDetails"}
];
var ProjectDepotInitListViewField = [ "projectInitId","projectId","projectName","projectSerial", "address", "unCustomName", "total","projectDepotInitDetailSet","initDate","initPerson","contractSerial","effective","effectiveName"]; 
var ProjectDepotInitDetailListViewField = [ "detailId","projectInitId","mnemonics","commodity","specifications","quantity","unit","supplementQuantity","supplementUnit","convertedQuantity","specificationsId"];

var ReceiveManageFieldMapping = [
	{name:"receiveManage.receiveId",mapping:"receiveId"},
	{name:"receiveManage.status",mapping:"status"},
	{name:"receiveManage.statusName",mapping:"statusName"},
	{name:"receiveManage.receiveSerial",mapping:"receiveSerial"},
	{name:"receiveManage.userId",mapping:"userId"},
	{name:"receiveManage.userName",mapping:"userName"},
	{name:"receiveManage.receiveMan",mapping:"receiveMan"},
	{name:"receiveManage.provideDate",mapping:"provideDate"},
	{name:"receiveManage.receiveTheme",mapping:"receiveTheme"},
	{name:"receiveManage.receiveDate",mapping:"receiveDate"},
	{name:"receiveManage.depotId",mapping:"depotId"},
	{name:"receiveManage.depotName",mapping:"depotName"},
	{name:"receiveManage.totalAmount",mapping:"totalAmount"},
	{name:"receiveManage.receivePurpose",mapping:"receivePurpose"},
	{name:"receiveManage.remark",mapping:"remark"},
	{name:"receiveManage.delFlag",mapping:"delFlag"},
	{name:"receiveManage.applyforState",mapping:"applyforState"},
	{name:"receiveManage.applyforStateName",mapping:"applyforStateName"}
];
var ReceiveManageHiddenField = [
    {xtype:"hidden",name:"receiveManage.depotId"},
	{xtype:"hidden",name:"receiveManage.receiveId"},
	{xtype:"hidden",name:"receiveManage.userId"},
 ];
var ReceiveManageListViewField = ["receiveId","status","receiveSerial","receiveTheme","receiveDate","depotId","depotName","applyforState", "applyforStateName","receiveMan","statusName"]
var ReceiveManageDetailListViewField =["detailId","receiveId","commodity","specifications","mnemonics","unit","locationCounts","receiveCounts","price","amount","returnDate","returnCounts","remark"]

var LostCompensationFieldMapping = [
    {name:"lostCompensation.lostId",mapping:"lostId"},
    {name:"lostCompensation.applyforState",mapping:"applyforState"},
    {name:"lostCompensation.applyforStateName",mapping:"applyforStateName"},
    {name:"lostCompensation.lostSerial",mapping:"lostSerial"},
    {name:"lostCompensation.userId",mapping:"userId"},
    {name:"lostCompensation.userName",mapping:"userName"},
    {name:"lostCompensation.applyDate",mapping:"applyDate"},
    {name:"lostCompensation.contractSerial",mapping:"contractSerial"},
    {name:"lostCompensation.projectName",mapping:"projectName"},
    {name:"lostCompensation.address",mapping:"address"},
    {name:"lostCompensation.paEntName",mapping:"paEntName"},
    {name:"lostCompensation.compensationDate",mapping:"compensationDate"},
    {name:"lostCompensation.totalCompensation",mapping:"totalCompensation"},
    {name:"lostCompensation.lostTheme",mapping:"lostTheme"},
    {name:"lostCompensation.recheckDate",mapping:"recheckDate"},
    {name:"lostCompensation.recheckMan",mapping:"recheckMan"},
    {name:"lostCompensation.checkDate",mapping:"checkDate"},
    {name:"lostCompensation.checkMan",mapping:"checkMan"},
    {name:"lostCompensation.explain",mapping:"explain"},
    {name:"lostCompensation.contractNumber",mapping:"contractNumber"},
    {name:"lostCompensation.contractMaterials.contractmaId",mapping:"contractMaterials.contractmaId"}
];
var LostCompensationHiddenField = [
    {xtype:"hidden",name:"lostCompensation.lostId"},
    {xtype:"hidden",name:"lostCompensation.userId"},  
    {xtype:"hidden",name:"lostCompensation.lostCompensationDetails"},  
    {xtype:"hidden",name:"lostCompensation.contractNumber"},
    {xtype:"hidden",name:"lostCompensation.contractMaterials.contractmaId"}
];
var LostCompensationListViewField = ["lostId","applyforState","applyforStateName","lostSerial","userId","userName","applyDate","contractSerial",
        "projectName","paEntName","compensationDate","totalCompensation","lostTheme","checkDate","recheckDate","contractMaterials","checkMan","recheckMan"];
var LostCompensationDetailListViewField = ["detailId","lostId","commodity","mnemonics","specifications","specificationsId","unit","oweQuantity",
         "lostQuantity","supplementUnit","supplementQuantity","compensationCosts","totalCosts","conversionNum","commodityId"];

var OtherBusinessFieldMapping = [
     {name:"otherBusiness.otherBusinessId",mapping:"otherBusinessId"},
     {name:"otherBusiness.applyforState",mapping:"applyforState"},
     {name:"otherBusiness.applyforStateName",mapping:"applyforStateName"},
     {name:"otherBusiness.userId",mapping:"userId"},
     {name:"otherBusiness.userName",mapping:"userName"},
     {name:"otherBusiness.otherBusinessSerial",mapping:"otherBusinessSerial"},
     {name:"otherBusiness.chargeableTime",mapping:"chargeableTime"},
     {name:"otherBusiness.contractId",mapping:"contractId"},
     {name:"otherBusiness.contractSerial",mapping:"contractSerial"},
     {name:"otherBusiness.projectName",mapping:"projectName"},
     {name:"otherBusiness.paEntName",mapping:"paEntName"},
     {name:"otherBusiness.totalCosts",mapping:"totalCosts"},
     {name:"otherBusiness.remark",mapping:"remark"},
     {name:"otherBusiness.baseDepot.depotId",mapping:"baseDepot.depotId"},
     {name:"otherBusiness.baseDepot.depotName",mapping:"baseDepot.depotName"},
     {name:"otherBusiness.affiliatedSerial",mapping:"affiliatedSerial"},
     {name:"otherBusiness.contractNumber",mapping:"contractNumber"}
];
var OtherBusinessHiddenField = [
     {xtype:"hidden",name:"otherBusiness.otherBusinessId"},
     {xtype:"hidden",name:"otherBusiness.userId"},
     {xtype:"hidden",name:"otherBusiness.contractId"},
     {xtype:"hidden",name:"otherBusiness.contractNumber"},
     {xtype:"hidden",name:"otherBusiness.otherBusinessDetails"}
];
var OtherBusinessListViewField = ["otherBusinessId","applyforState","applyforStateName","userId","userName","otherBusinessSerial","chargeableTime",
                                  "contractId","contractSerial","projectName","paEntName","totalCosts","baseDepotId","baseDepotName","affiliatedSerial",
                                  "contractNumber","delFlag"];
var OtherBusinessDetailListViewField = ["detailId","otherBusinessId","feesType","calculationMethod","fee","calculationMethodName","feesTypeName"];

var OtherBetsFieldMapping = [
     {name:"otherBets.otherBetsId",mapping:"otherBetsId"},
     {name:"otherBets.applyforState",mapping:"applyforState"},
     {name:"otherBets.applyforStateName",mapping:"applyforStateName"},
     {name:"otherBets.userId",mapping:"userId"},
     {name:"otherBets.userName",mapping:"userName"},
     {name:"otherBets.otherBetsSerial",mapping:"otherBetsSerial"},
     {name:"otherBets.chargeableTime",mapping:"chargeableTime"},
     {name:"otherBets.contractId",mapping:"contractId"},
     {name:"otherBets.contractNo",mapping:"contractNo"},
     {name:"otherBets.projectName",mapping:"projectName"},
     {name:"otherBets.paEntName",mapping:"paEntName"},
     {name:"otherBets.totalCosts",mapping:"totalCosts"},
     {name:"otherBets.baseDepotId",mapping:"baseDepotId"},
     {name:"otherBets.baseDepotName",mapping:"baseDepotName"},
     {name:"otherBets.affiliatedSerial",mapping:"affiliatedSerial"},
     {name:"otherBets.contractNumber",mapping:"contractNumber"},
     {name:"otherBets.equipSerial",mapping:"equipSerial"},
 	 {name:"otherBets.equipVender",mapping:"equipVender"},
 	 {name:"otherBets.equipSpecificName",mapping:"equipSpecificName"},
 	 {name:"otherBets.equipSpecific",mapping:"equipSpecific"},
 	 {name:"otherBets.feeTypeName",mapping:"feeTypeName"}
];
var OtherBetsHiddenField = [
    {xtype:"hidden",name:"otherBets.otherBetsId"},
    {xtype:"hidden",name:"otherBets.userId"},
    {xtype:"hidden",name:"otherBets.contractId"},
    {xtype:"hidden",name:"otherBets.contractNumber"},
    {xtype:"hidden",name:"otherBets.otherBetsDetails"},
    {xtype:"hidden",name:"otherBets.equipSpecific"}
];
var OtherBetsListViewField = ["otherBetsId","applyforState","applyforStateName","userId","userName","otherBetsSerial","chargeableTime","contractId","contractNo","projectName","paEntName","totalCosts","affiliatedSerial"
                              ,"equipSpecificName","equipSerial","feeTypeName","remark"];
var OtherBetsDetailListViewField = ["detailId","otherBetsId","feesType","calculationMethod","fee","calculationMethodName","feesTypeName","remark"];

var RecycleManageFieldMapping = [
     {name:"recycleManage.recycleId",mapping:"recycleId"},
     {name:"recycleManage.applyforState",mapping:"applyforState"},
     {name:"recycleManage.applyforStateName",mapping:"applyforStateName"},
     {name:"recycleManage.recycleSerial",mapping:"recycleSerial"},
     {name:"recycleManage.baseDepot.depotId",mapping:"baseDepot.depotId"},
     {name:"recycleManage.baseDepot.depotName",mapping:"baseDepot.depotName"},
     {name:"recycleManage.userId",mapping:"userId"},
     {name:"recycleManage.userName",mapping:"userName"},
     {name:"recycleManage.applyDate",mapping:"applyDate"},
     {name:"recycleManage.recycleDate",mapping:"recycleDate"},
     {name:"recycleManage.recycleType",mapping:"recycleType"},
     {name:"recycleManage.recycleTypeName",mapping:"recycleTypeName"},
     {name:"recycleManage.affiliatedSerial",mapping:"affiliatedSerial"},
     {name:"recycleManage.transportNumber",mapping:"transportNumber"},
     {name:"recycleManage.transportMan",mapping:"transportMan"},
     {name:"recycleManage.handingCharge",mapping:"handingCharge"},
     {name:"recycleManage.packageCharge",mapping:"packageCharge"},
     {name:"recycleManage.damage",mapping:"damage"},
     {name:"recycleManage.receivePeople",mapping:"receivePeople"},
     {name:"recycleManage.sendReceiveMan",mapping:"sendReceiveMan"},
     {name:"recycleManage.sendReceiveDate",mapping:"sendReceiveDate"},
     {name:"recycleManage.invoiceCheckMan",mapping:"invoiceCheckMan"},
     {name:"recycleManage.invoiceCheckDate",mapping:"invoiceCheckDate"},
     {name:"recycleManage.remark",mapping:"remark"},
     {name:"recycleManage.contractMaterials.contractNumber",mapping:"contractMaterials.contractNumber"},
     {name:"recycleManage.contractMaterials.projectName",mapping:"contractMaterials.projectName"},
     {name:"recycleManage.contractMaterials.paEntName",mapping:"contractMaterials.paEntName"},
     {name:"recycleManage.contractMaterials.contractSerial",mapping:"contractMaterials.contractSerial"},
     {name:"recycleManage.contractMaterials.contractmaId",mapping:"contractMaterials.contractmaId"}
];
var RecycleManageHiddenField = [
	{xtype:"hidden",name:"recycleManage.recycleId"}, 
	{xtype:"hidden",name:"recycleManage.contractMaterials.contractmaId"}, 
	{xtype:"hidden",name:"recycleManage.baseDepot.depotId"}, 
	{xtype:"hidden",name:"recycleManage.userId"}, 
	{xtype:"hidden",name:"recycleManage.recycleManageDetails"}, 
	{xtype:"hidden",name:"recycleManage.recycleManageFees"}, 
	{xtype:"hidden",name:"recycleManage.compensationDamages"}, 
	{xtype:"hidden",name:"recycleManage.materialsRecycleCountTemps"}, 
	{xtype:"hidden",name:"recycleManage.temporaryStorages"}, 
	{xtype:"hidden",name:"recycleManage.contractMaterials.contractNumber"}
];
var RecycleManageListViewField = ["recycleId","applyforState","applyforStateName","recycleSerial","baseDepot.depotName","applyDate","recycleDate","recycleType","recycleTypeName",
     "contractMaterials.projectName","contractMaterials","userName","contractMaterials.contractSerial","receivePeople","transportNumber","handingCharge","damage","affiliatedSerial","packageCharge", "baseDepot"];
var RecycleManageDetailListViewField = ["detailId","commodity","commodityId","mnemonics","specifications","specificationsId","unit","inputCount",
                                        "truckLoadingCount","packageCount","supplementUnit","supplementQuantity","remark","conversionNum"];
var CompensationDamageListViewField = ["compensationId","recycleId","commodity","commodityId","damageId","damageType","measurementUnit","damageUnitPrice","quantity","damageAmount"];

var TruckCranePriceFieldMapping = [
    {name:"truckCranePrice.priceId",mapping:"priceId"},
	{name:"truckCranePrice.belongToArea",mapping:"belongToArea"},
	{name:"truckCranePrice.belongToAreaName",mapping:"belongToAreaName"},
	{name:"truckCranePrice.truckCraneSpecific",mapping:"truckCraneSpecific"},
	{name:"truckCranePrice.truckCraneSpecificName",mapping:"truckCraneSpecificName"},
	{name:"truckCranePrice.projectPrice",mapping:"projectPrice"},
	{name:"truckCranePrice.teamPrice",mapping:"teamPrice"}
	];
var TruckCranePriceHiddenField = [
{xtype:"hidden",name:"truckCranePrice.priceId"}  
];
var TruckCranePriceListViewField = ["priceId","belongToArea","belongToAreaName","truckCraneSpecific","truckCraneSpecificName","projectPrice","teamPrice"];


var AnnexDetailsListMapping = [
   	 {name:"takeStock.engineeringArea",mapping:"engineeringArea"},
   	 {name:"takeStock.componSpecificName",mapping:"componSpecificName"},
   	 {name:"takeStock.caculate",mapping:"caculate"},
   	 {name:"takeStock.projectPrice",mapping:"projectPrice"},
   	 {name:"takeStock.caculate",mapping:"caculate"},
   	 {name:"takeStock.unitPrice",mapping:"unitPrice"},
   	 {name:"takeStock.equipVender",mapping:"equipVender"},
   	 {name:"takeStock.quantity",mapping:"quantity"}
   ];
AnnexDetailsListViewField = ["engineeringArea","componSpecificName","anchType","caculate","projectPrice","caculate","unitPrice","equipVender","initStatus"];

var MaterialsDetailListViewField = ["madetailId","contractmaId","commodityId","commodity","measurementUnit","caculateUnit","planLease","startDate","exitDate"];

var MaterialsRepairListViewField = ["materialsRepairId","storeId","storeName","applyforState","applyforStateName","repairSerial","repairPersonnel","repairTheme","repairDate","storeName","beforeRepairLocation","repairCost","repairSituation","remark","teamName","teamId","affiliatedSerial","userName"];

var MaterialsRepairFieldMapping = [
    {name:"materialsRepair.materialsRepairId",mapping:"materialsRepairId"},
    {name:"materialsRepair.applyforState",mapping:"applyforState"},
    {name:"materialsRepair.applyforStateName",mapping:"applyforStateName"},
    {name:"materialsRepair.repairSerial",mapping:"repairSerial"},
    {name:"materialsRepair.repairPersonnel",mapping:"repairPersonnel"},
    {name:"materialsRepair.repairTheme",mapping:"repairTheme"},
    {name:"materialsRepair.userId",mapping:"userId"},
    {name:"materialsRepair.userName",mapping:"userName"},
    {name:"materialsRepair.repairDate",mapping:"repairDate"},
    {name:"materialsRepair.storeId",mapping:"storeId"},
    {name:"materialsRepair.storeName",mapping:"storeName"},
    {name:"materialsRepair.teamId",mapping:"teamId"},
    {name:"materialsRepair.repairCost",mapping:"repairCost"},
    {name:"materialsRepair.repairSituation",mapping:"repairSituation"},
    {name:"materialsRepair.affiliatedSerial",mapping:"affiliatedSerial"},
    {name:"materialsRepair.remark",mapping:"remark"}
];

var MaterialsRepairHiddenField = [
    {xtype:"hidden",name:"materialsRepair.materialsRepairId"},
    {xtype:"hidden",name:"materialsRepair.storeId"},
    {xtype:"hidden",name:"materialsRepair.userId"},
    {xtype:"hidden",name:"materialsRepair.beforeMaterialsRepairs"},
    {xtype:"hidden",name:"materialsRepair.teamName"},
    {xtype:"hidden",name:"materialsRepair.afterMaterialsRepairs"}
];

var AfterMaterialsRepairListViewField = ["afterRepairId","materialsRepairId","mnemonicCode","commodity","specifications","measurementUnit","quantity","auxiliaryNum","enterLocation","secondUnitConversion","locationId","specificationsId","storeNum","conversionNum","commodityId"];

var BeforeMaterialsRepairListViewField = ["beforeRepairId","materialsRepairId","mnemonicCode","commodity","specifications","measurementUnit","quantity","auxiliaryNum","storageLocation","locationId","secondUnitConversion","specificationsId","storeNum","conversionNum","commodityId"];

var ApplyMakeListViewField = ["applyMakeId","applyforState","applyforStateName","makeSerial","makeMan","makeDate","assetsProperty","assetsPropertyName","storeName","makeTheme","approveMan","approveDate","completeDate","remark","startDate","delFlag","effective"];

var ApplyMakeFieldMapping = [
   {name:"applyMake.applyMakeId",mapping:"applyMakeId"},
   {name:"applyMake.applyforState",mapping:"applyforState"},
   {name:"applyMake.applyforStateName",mapping:"applyforStateName"},
   {name:"applyMake.makeSerial",mapping:"makeSerial"},
   {name:"applyMake.makeMan",mapping:"makeMan"},
   {name:"applyMake.makeDate",mapping:"makeDate"},
   {name:"applyMake.assetsProperty",mapping:"assetsProperty"},
   {name:"applyMake.assetsPropertyName",mapping:"assetsPropertyName"},
   {name:"applyMake.storeId",mapping:"storeId"},
   {name:"applyMake.storeName",mapping:"storeName"},
   {name:"applyMake.makeTheme",mapping:"makeTheme"},
   {name:"applyMake.approveMan",mapping:"approveMan"},
   {name:"applyMake.approveDate",mapping:"approveDate"},
   {name:"applyMake.startDate",mapping:"startDate"},
   {name:"applyMake.completeDate",mapping:"completeDate"},
   {name:"applyMake.remark",mapping:"remark"}
];

var ApplyMakeHiddenField = [
	{xtype:"hidden",name:"applyMake.applyMakeId"}, 
	{xtype:"hidden",name:"applyMake.storeId"},
	{xtype:"hidden",name:"applyMake.productMakes"},
];

var ProductMakeListViewField = ["productMakeId","applyMakeId","mnemonics","commodity","commodityId","specificationsId","specifications","measurementUnit","makeQuanity","secondUnitConversion","auxiliaryNum","auxiliaryQuantity"];

var InstallPriceSetListViewField = ["installPriceId","contractId","belongToAreaName","equipSpecificName","installDismantleTypeName","measurementUnit","projectPrice"];
var TruckCranePriceSetListViewField = ["tcPriceId","contractId","belongToAreaName","truckCraneSpecificName","projectPrice"];

var LostHandleListViewField = ["lostId","applyforState","applyforStateName","lostSerial","userName","lostDate","contractSerial","paEntName","projectName","projectAddress","costTotal","contractNo","equipSerial","equipSpecificName","projectId"];

var LostHandleFieldMapping = [
    {name:"lostHandle.lostId",mapping:"lostId"},
    {name:"lostHandle.applyforState",mapping:"applyforState"},
    {name:"lostHandle.applyforStateName",mapping:"applyforStateName"},
    {name:"lostHandle.lostSerial",mapping:"lostSerial"},
    {name:"lostHandle.userId",mapping:"userId"},
    {name:"lostHandle.userName",mapping:"userName"},
    {name:"lostHandle.lostDate",mapping:"lostDate"},
    {name:"lostHandle.contractId",mapping:"contractId"},
    {name:"lostHandle.contractSerial",mapping:"contractSerial"},
    {name:"lostHandle.contractNo",mapping:"contractNo"},
    {name:"lostHandle.paEntName",mapping:"paEntName"},
    {name:"lostHandle.pbEntName",mapping:"pbEntName"},
    {name:"lostHandle.projectId",mapping:"projectId"},
    {name:"lostHandle.projectName",mapping:"projectName"},
    {name:"lostHandle.projectAddress",mapping:"projectAddress"},
    {name:"lostHandle.costTotal",mapping:"costTotal"},
    {name:"lostHandle.subsidiarySerial",mapping:"subsidiarySerial"},
    {name:"lostHandle.department.depId",mapping:"department.depId"},
	{name:"lostHandle.department.depName",mapping:"department.depName"},
	{name:"lostHandle.equipSerial",mapping:"equipSerial"},
	{name:"lostHandle.equipVender",mapping:"equipVender"},
	{name:"lostHandle.equipSpecificName",mapping:"equipSpecificName"},
	{name:"lostHandle.equipSpecific",mapping:"equipSpecific"}	
];

var LostHandleHiddenField = [
    {xtype:"hidden",name:"lostHandle.lostId"},
    {xtype:"hidden",name:"lostHandle.contractId"},
    {xtype:"hidden",name:"lostHandle.userId"},
    {xtype:"hidden",name:"lostHandle.projectId"},
	{xtype:"hidden",name:"lostHandle.department.depId"},
	{xtype:"hidden",name:"lostHandle.lostDetails"},
	{xtype:"hidden",name:"lostHandle.equipSpecific"}
]

var LostDetailListViewField = ["lostDetailId","lostId","componId","commodityId","commodity","componSpecific","projectId","projectComponId",
	"counts","lostCounts","lostCost","damageCounts","damageCosts","totals","describe","component","loseDescribe","calculate","disAllInitId"];

var AttachmentStorageListViewField = ["attachmentId","rowId","disAllInitId","componGeneric","componSpecific","componCategory","dimensions","measurementUnit","projectCounts","counts","componVender","remark",
	"damageDescription","damageCount","damageUnit","damagePrice","damageAmount"];

var CostInspectListViewField = ["costInspectId","inspectId","workContent","hoursInspect","price","amount","remark","depName"];

var InstallFeeListViewField = ["installFeeId","installId","equipSpecificName","feesTypeName","unit","number","projectPrice","chargesSubtotal","startTime","remark","createTime"];
var AutocraneFeeListViewField = ["autocraneFeeId","installId","truckCraneSpecific","number","machineTeam","projectPrice","chargesSubtotal","startTime","remark","createTime"];
var InstallDismantelTeamListViewField = ["InstallDismantelTeamId","installId","equipSpecificName","feesType","unit","number","insDisTeam","teamPrice","chargesSubtotal","startTime","remark","feesTypeName","createTime"];
var AutocraneUnitListViewField = ["autocraneUnitId","installId","truckCraneSpecific","number","machineTeam","autocraneUnit","teamPrice","chargesSubtotal","startTime","remark","createTime"];

var SettleMaterialsFieldMapping =[
	{name:"settleMaterials.settleId",mapping:"settleId"},
	{name:"settleMaterials.settleSerial",mapping:"settleSerial"},
	{name:"settleMaterials.settleMan",mapping:"settleMan"},
	{name:"settleMaterials.settleDate",mapping:"settleDate"},
	{name:"settleMaterials.settleTitle",mapping:"settleTitle"},
	{name:"settleMaterials.startDate",mapping:"startDate"},
	{name:"settleMaterials.endDate",mapping:"endDate"},
	{name:"settleMaterials.tranportCaculateType",mapping:"tranportCaculateType"},
	{name:"settleMaterials.tranportCaculateTypeName",mapping:"tranportCaculateTypeName"},
	{name:"settleMaterials.transFeeCaculateType",mapping:"transFeeCaculateType"},
	{name:"settleMaterials.contractmaId",mapping:"contractmaId"},
	{name:"settleMaterials.contractSerial",mapping:"contractSerial"},
	{name:"settleMaterials.contractTheme",mapping:"contractTheme"},
	{name:"settleMaterials.projectName",mapping:"projectName"},
	{name:"settleMaterials.paEntName",mapping:"paEntName"},
	{name:"settleMaterials.pbEntName",mapping:"pbEntName"},
	{name:"settleMaterials.contractCategory",mapping:"contractCategory"},
	{name:"settleMaterials.contractCategoryName",mapping:"contractCategoryName"},
	{name:"settleMaterials.taxRate",mapping:"taxRate"},
	{name:"settleMaterials.rentalRate",mapping:"rentalRate"},
	{name:"settleMaterials.taxCaculateType",mapping:"taxCaculateType"},
	{name:"settleMaterials.taxCaculateTypeName",mapping:"taxCaculateTypeName"},
	{name:"settleMaterials.contractAmount",mapping:"contractAmount"},
 	{name:"settleMaterials.finSettingAmount",mapping:"finSettingAmount"},
	{name:"settleMaterials.settledAmount",mapping:"settledAmount"},
	{name:"settleMaterials.handoverAmount",mapping:"handoverAmount"},
	{name:"settleMaterials.writedownAmount",mapping:"writedownAmount"},
	{name:"settleMaterials.financiaType",mapping:"financiaType"},
	{name:"settleMaterials.settleDepId",mapping:"settleDepId"},
	{name:"settleMaterials.settleDepName",mapping:"settleDepName"},
	{name:"settleMaterials.transFeeAmount",mapping:"transFeeAmount"},
	{name:"settleMaterials.status",mapping:"status"},
	{name:"settleMaterials.backOff",mapping:"backOff"},
	{name:"settleMaterials.otherFeeAmount",mapping:"otherFeeAmount"}
];
var SettleMaterialsHiddenField = [
     {xtype:"hidden",name:"settleMaterials.settleId"},
     {xtype:"hidden",name:"settleMaterials.contractmaId"},
     {xtype:"hidden",name:"settleMaterials.tranportCaculateType"},
     {xtype:"hidden",name:"settleMaterials.settleDepId"},
     {xtype:"hidden",name:"settleMaterials.settleFeeDetails"}
 ];
var SettleMaterialsListViewField = ["settleId","settleSerial","settleMan","settleDate","settleTitle","startDate",
                                	"endDate","tranportCaculateType","tranportCaculateTypeName","transFeeCaculateType","contractSerial",
                                	"contractmaId","contractTheme","projectName","paEntName","pbEntName","contractCategory","contractCategoryName",
                                	"taxRate","rentalRate","taxCaculateType","taxCaculateTypeName","contractAmount","finSettingAmount","settledAmount",
                                	"handoverAmount","writedownAmount","financiaType","settleDepId","settleDepName","transFeeAmount","otherFeeAmount","status","statusName"];
var SettleProjectFieldMapping =[
	{name:"settleProject.settleId",mapping:"settleId"},
	{name:"settleProject.settleSerial",mapping:"settleSerial"},
	{name:"settleProject.settleMan",mapping:"settleMan"},
	{name:"settleProject.settleDate",mapping:"settleDate"},
	{name:"settleProject.settleTitle",mapping:"settleTitle"},
	{name:"settleProject.startDate",mapping:"startDate"},
	{name:"settleProject.endDate",mapping:"endDate"},
	{name:"settleProject.contractSerial",mapping:"contractSerial"},
	{name:"settleProject.contractCategory",mapping:"contractCategory"},
	{name:"settleProject.contractCategoryName",mapping:"contractCategoryName"},
	{name:"settleProject.projectName",mapping:"projectName"},
	{name:"settleProject.taxMode",mapping:"taxMode"},
	{name:"settleProject.taxModeName",mapping:"taxModeName"},
	{name:"settleProject.taxRate",mapping:"taxRate"},
	{name:"settleProject.rentalRate",mapping:"rentalRate"},
	{name:"settleProject.rentalPrice",mapping:"rentalPrice"},
	{name:"settleProject.contractId",mapping:"contractId"},
	{name:"settleProject.initialSettleAmount",mapping:"initialSettleAmount"},
	{name:"settleProject.currentSettleAmount",mapping:"currentSettleAmount"},
	{name:"settleProject.totalSettleAmount",mapping:"totalSettleAmount"},
	{name:"settleProject.backOff",mapping:"backOff"},
	{name:"settleProject.depName",mapping:"depName"},
	{name:"settleProject.depId",mapping:"depId"},
	{name:"settleProject.settleProjectState",mapping:"settleProjectState"},
	{name:"settleProject.settleProjectStateName",mapping:"settleProjectStateName"}
];
var SettleProjectHiddenField = [
	{xtype:"hidden",name:"settleProject.settleId"},
	{xtype:"hidden",name:"settleProject.contractId"},
	{xtype:"hidden",name:"settleProject.settleProjectState"},
	{xtype:"hidden",name:"settleProject.settleProjectDetails"}
 ];


var SettleProjectListViewField = ["settleId","settleSerial","settleMan","settleDate","settleTitle","startDate",
	"endDate","contractSerial","contractCategory","projectName","taxMode","depId","depName","taxRate","rentalRate",
	"rentalPrice","initialSettleAmount","currentSettleAmount","totalSettleAmount","backOff","contractId",
	"settleProjectState","settleProjectStateName","currentSettleAmount"];
var SettleFeeViewField = ["settleFeeId", "item", "amount"];


var AllocationProjectFieldMapping = [
      {name:"allocationProject.allocationId",mapping:"allocationId"},
      {name:"allocationProject.applyforState",mapping:"applyforState"},
      {name:"allocationProject.applyforStateName",mapping:"applyforStateName"},
      {name:"allocationProject.allocationSerial",mapping:"allocationSerial"},
      {name:"allocationProject.userId",mapping:"userId"},
      {name:"allocationProject.userName",mapping:"userName"},
      {name:"allocationProject.makeDate",mapping:"makeDate"},
      {name:"allocationProject.assetsProperty",mapping:"assetsProperty"},
      {name:"allocationProject.assetsPropertyName",mapping:"assetsPropertyName"},
      {name:"allocationProject.allocationDate",mapping:"allocationDate"},
      {name:"allocationProject.allocationType",mapping:"allocationType"},
      {name:"allocationProject.allocationTypeName",mapping:"allocationTypeName"},
      {name:"allocationProject.outContractId",mapping:"outContractId"},
      {name:"allocationProject.outContractSerial",mapping:"outContractSerial"},
      {name:"allocationProject.outProjectId",mapping:"outProjectId"},
      {name:"allocationProject.outProjectName",mapping:"outProjectName"},
      {name:"allocationProject.inContractId",mapping:"inContractId"},
      {name:"allocationProject.inContractSerial",mapping:"inContractSerial"},
      {name:"allocationProject.inProjectId",mapping:"inProjectId"},
      {name:"allocationProject.inProjectName",mapping:"inProjectName"},
      {name:"allocationProject.allocationTheme",mapping:"allocationTheme"},
      {name:"allocationProject.vehicleNum",mapping:"vehicleNum"},
      {name:"allocationProject.vehiclePerson",mapping:"vehiclePerson"},
      {name:"allocationProject.outProjectConsignor",mapping:"outProjectConsignor"},
      {name:"allocationProject.inProjectConsignee",mapping:"inProjectConsignee"},
      {name:"allocationProject.attachSerial",mapping:"attachSerial"},
      {name:"allocationProject.auditorName",mapping:"auditorName"},
      {name:"allocationProject.auditorDate",mapping:"auditorDate"},
      {name:"allocationProject.remark",mapping:"remark"},
      {name:"allocationProject.delFlag",mapping:"delFlag"}
];
var AllocationProjectListViewField=["allocationId","applyforState","applyforStateName","allocationSerial","userName","allocationDate","allocationTypeName","outProjectName","inProjectName","outContractSerial","inContractSerial","vehicleNum","makeDate","attachSerial"];
var AllocationProjectHiddenField=[
      {xtype:"hidden",name:"allocationProject.allocationId"},
      {xtype:"hidden",name:"allocationProject.outContractId"},
      {xtype:"hidden",name:"allocationProject.outProjectId"},
      {xtype:"hidden",name:"allocationProject.inContractId"},
      {xtype:"hidden",name:"allocationProject.inProjectId"},
      {xtype:"hidden",name:"allocationProject.userId"},
      {xtype:"hidden",name:"allocationProject.allocationDetails"}
];
var AllocationDetailListViewField=["detailId","allocationId","mnemonicCode","commodity","specfications","projectId","projectTotal","measurementUnit","allocationCounts","surplusCounts","remark","specficationsId","commodityId","secondUnitConversion","secondConvertedQuantity","auxiliaryQuantity"];

var RentFeeDetailViewField=["id","equipmentNo","recordId","equipSpecificName","activateDate","startDate","endDate","rentStandard","rentUnit","feeType"];
var InstallFeeDetailViewField=["id","equipmentNo","startTime","equipSpecificName","feesTypeName","unit","number","projectPrice","chargesSubtotal"];
var AutoCraneFeeDetailViewField=["id","startTime","equipmentNo","truckCraneSpecific","number","machineTeam","projectPrice","chargesSubtotal"];
var LostFeeDetailViewField=["id","lostDate","commodity","componSpecific","lostCounts","lostCosts","damageCounts","damageCosts","totals","describe"];
var OtherFeeDetailViewField=["id","chargeableTime","feesTypeName","calculationMethodName","fee"];
var StoreMaterialsListViewField=[ "storeMaterialsId","counts","materialsSpecificationsss","materialsSpecifications.specifications","materialsSpecifications.mnemonics","materialsSpecifications.materialsCommodity","materialsSpecifications.materialsCommodity.assetsProperty","materialsSpecifications.materialsCommodity.commodity","materialsSpecifications.materialsCommodity.dailyRent","materialsSpecifications.materialsCommodity.compensationCosts"];

var LeaseApplicationFieldMapping = [
	{name : "leaseApplication.applicationId", mapping : "applicationId"},
	{name : "leaseApplication.applicationSerial", mapping : "applicationSerial"},
	{name : "leaseApplication.userId", mapping : "userId"},
	{name : "leaseApplication.userName", mapping : "userName"},
	{name : "leaseApplication.leaseTheme", mapping : "leaseTheme"},
	{name : "leaseApplication.fillDate", mapping : "fillDate"},
	{name : "leaseApplication.project", mapping : "project"},
	{name : "leaseApplication.project.projectId", mapping : "project.projectId"},
	{name : "leaseApplication.project.projectName", mapping : "project.projectName"},
	{name : "leaseApplication.assetsProperty", mapping : "assetsProperty"},
	{name : "leaseApplication.assetsPropertyName", mapping : "assetsPropertyName"},
	{name : "leaseApplication.applyingUnit", mapping : "applyingUnit"},
	{name : "leaseApplication.taxRate", mapping : "taxRate"},
	{name : "leaseApplication.paymentMethod", mapping : "paymentMethod"},
	{name : "leaseApplication.paymentMethodName", mapping : "paymentMethodName"},
	{name : "leaseApplication.suppliers", mapping : "suppliers"},
	{name : "leaseApplication.approachDate", mapping : "approachDate"},
	{name : "leaseApplication.manufacturer", mapping : "manufacturer"},
	{name : "leaseApplication.otherRequirements", mapping : "otherRequirements"},
	{name : "leaseApplication.status", mapping : "status"}
];
var LeaseApplicationHiddenField = [
	{xtype : "hidden", name : "leaseApplication.applicationId"},
	{xtype : "hidden", name : "leaseApplication.userId"},
	{xtype : "hidden", name : "leaseApplication.leaseLists"},
	{xtype : "hidden", name : "leaseApplication.project.projectId"},
	{xtype : "hidden", name : "leaseApplication.status"}
];
var LeaseApplicationListViewField = ["applicationId", "applicationSerial", "leaseTheme", "userName", 
	"fillDate", "project", "taxRate", "applyingUnit", "suppliers", "status", "statusName"];
var LeaseListListViewField = ["listId", "applicationId", "specificationsId", "commodityId", "commodity", "mnemonics", 
	"measurementUnit", "specifications", "quantity", "taxUnitPrice", "estimatedAmount"];

var LeaseContractFieldMapping = [
	{name : "leaseContract.leaseId", mapping : "leaseId"},
	{name : "leaseContract.leaseSerial", mapping : "leaseSerial"},
	{name : "leaseContract.leaseIdentifier", mapping : "leaseIdentifier"},
	{name : "leaseContract.leaseTheme", mapping : "leaseTheme"},
	{name : "leaseContract.project", mapping : "project"},
	{name : "leaseContract.project.projectId", mapping : "project.projectId"},
	{name : "leaseContract.project.projectName", mapping : "project.projectName"},
	{name : "leaseContract.project.address", mapping : "project.address"},
	{name : "leaseContract.depId", mapping : "depId"},
	{name : "leaseContract.depName", mapping : "depName"},
	{name : "leaseContract.contractId", mapping : "contractId"},
	{name : "leaseContract.lesseeUnit", mapping : "lesseeUnit"},
	{name : "leaseContract.useUnit", mapping : "useUnit"},
	{name : "leaseContract.leaseUnit", mapping : "leaseUnit"},
	{name : "leaseContract.leaseUnitAddress", mapping : "leaseUnitAddress"},
	{name : "leaseContract.leaseUnitLink", mapping : "leaseUnitLink"},
	{name : "leaseContract.signingDate", mapping : "signingDate"},
	{name : "leaseContract.accountingMethod", mapping : "accountingMethod"},
	{name : "leaseContract.taxMethod", mapping : "taxMethod"},
	{name : "leaseContract.billingMethods", mapping : "billingMethods"},
	{name : "leaseContract.taxRate", mapping : "taxRate"},
	{name : "leaseContract.discountRentalRate", mapping : "discountRentalRate"},
	{name : "leaseContract.discount", mapping : "discount"},
	{name : "leaseContract.freight", mapping : "freight"},
	{name : "leaseContract.contractAmount", mapping : "contractAmount"},
	{name : "leaseContract.settlementAmount", mapping : "settlementAmount"},
	{name : "leaseContract.amountReceived", mapping : "amountReceived"},
	{name : "leaseContract.authorizedAmount", mapping : "authorizedAmount"},
	{name : "leaseContract.userId", mapping : "userId"},
	{name : "leaseContract.userName", mapping : "userName"},
	{name : "leaseContract.fillDate", mapping : "fillDate"},
	{name : "leaseContract.status", mapping : "status"},
	{name : "leaseContract.statusName", mapping : "statusName"},
	{name : "leaseContract.remarks", mapping : "remarks"}
];
var LeaseContractHiddenField = [
	{xtype : "hidden", name : "leaseContract.leaseId"},
	{xtype : "hidden", name : "leaseContract.project.projectId"},
	{xtype : "hidden", name : "leaseContract.contractId"},
	{xtype : "hidden", name : "leaseContract.userId"},
	{xtype : "hidden", name : "leaseContract.status"},
	{xtype : "hidden", name : "leaseContract.leaseMaterialsInventorys"},
	{xtype : "hidden", name : "leaseContract.leasePriceSettings"},
	{xtype : "hidden", name : "leaseContract.leaseSpoiledIndemnitys"},
	{xtype : "hidden", name : "leaseContract.leaseScrapCompensations"},
	{xtype : "hidden", name : "leaseContract.leaseExpenseHandlings"}
];
var LeaseContractListViewField = ["leaseId", "leaseSerial", "leaseIdentifier", "leaseTheme", "project", 
	"signingDate", "accountingMethod","accountingMethodName", "taxMethod", "taxRate", "discountRentalRate", "discount",
	"freight", "contractAmount",  "settlementAmount", "amountReceived", "authorizedAmount", "userId",
	"userName", "fillDate", "status", "statusName", "remarks", "lesseeUnit", "useUnit", "leaseUnit",
	"leaseUnitAddress", "leaseUnitLink", "depId", "depName", "contractId"];

var LeaseMaterialsInventoryListViewField = ["inventoryId", "leaseId", "commodityId", "commodity", "measurementUnit", 
	"dailyRent", "plannedLeaseQuantity"];
var LeasePriceSettingListViewField = ["priceId", "leaseId", "specificationsId", "commodityId", "commodity", "specifications",
	"measurementUnit", "dailyRent", "compensationCosts"];
var LeaseSpoiledIndemnityListViewField = ["spoiledId", "leaseId", "damageId", "commodityId", "commodity", "damageType", 
	"measurementUnit", "damageUnitPrice"];
var LeaseScrapCompensationListViewField = ["compensationId", "leaseId", "scrapId", "commodityId", "commodity", "scrapType",
	"scrapUnitPrice", "measurementUnit"];
var LeaseExpenseHandlingListViewField = ["expenseId", "leaseId", "feeId", "commodityId", "commodity", "feesType", "measurementUnit", 
	"theoriesValueConversion", "unitConversion", "chargeUnitPrice"];
var LeaseMaterialsRecordListViewField = ["recordId", "leaseId", "materialsSpecifications"];

var GoodsRecipientFieldMapping = [
	{name : "goodsRecipient.recipientId", mapping : "recipientId"},
	{name : "goodsRecipient.recipientSerial", mapping : "recipientSerial"},
	{name : "goodsRecipient.recipientTheme", mapping : "recipientTheme"},
	{name : "goodsRecipient.userId", mapping : "userId"},
	{name : "goodsRecipient.userName", mapping : "userName"},
	{name : "goodsRecipient.fillDate", mapping : "fillDate"},
	{name : "goodsRecipient.depotId", mapping : "depotId"},
	{name : "goodsRecipient.depotName", mapping : "depotName"},
	{name : "goodsRecipient.locationId", mapping : "locationId"},
	{name : "goodsRecipient.locationName", mapping : "locationName"},
	{name : "goodsRecipient.leaseContract", mapping : "leaseContract"},
	{name : "goodsRecipient.leaseContract.leaseId", mapping : "leaseContract.leaseId"},
	{name : "goodsRecipient.leaseContract.leaseIdentifier", mapping : "leaseContract.leaseIdentifier"},
	{name : "goodsRecipient.project", mapping : "project"},
	{name : "goodsRecipient.project.projectId", mapping : "project.projectId"},
	{name : "goodsRecipient.project.projectName", mapping : "project.projectName"},
	{name : "goodsRecipient.leaseUnit", mapping : "leaseUnit"},
	{name : "goodsRecipient.lesseeUnit", mapping : "lesseeUnit"},
	{name : "goodsRecipient.subsidiarySerial", mapping : "subsidiarySerial"},
	{name : "goodsRecipient.deliveryDate", mapping : "deliveryDate"},
	{name : "goodsRecipient.rentType", mapping : "rentType"},
	{name : "goodsRecipient.rentTypeName", mapping : "rentTypeName"},
	{name : "goodsRecipient.transportVehicle", mapping : "transportVehicle"},
	{name : "goodsRecipient.transportPersonnel", mapping : "transportPersonnel"},
	{name : "goodsRecipient.auditor", mapping : "auditor"},
	{name : "goodsRecipient.approveDate", mapping : "approveDate"},
	{name : "goodsRecipient.subsidiaryAuditor", mapping : "subsidiaryAuditor"},
	{name : "goodsRecipient.subsidiaryApproveDate", mapping : "subsidiaryApproveDate"},
	{name : "goodsRecipient.remarks", mapping : "remarks"},
	{name : "goodsRecipient.status", mapping : "status"}
];
var GoodsRecipientHiddenField = [
	{xtype : "hidden", name : "goodsRecipient.recipientId"},
	{xtype : "hidden", name : "goodsRecipient.userId"},
	{xtype : "hidden", name : "goodsRecipient.depotId"},
	{xtype : "hidden", name : "goodsRecipient.locationId"},
	{xtype : "hidden", name : "goodsRecipient.leaseContract.leaseId"},
	{xtype : "hidden", name : "goodsRecipient.project.projectId"},
	{xtype : "hidden", name : "goodsRecipient.status"},
	{xtype : "hidden", name : "goodsRecipient.recipientLists"}
];
var GoodsRecipientListViewField = ["recipientId", "recipientSerial", "recipientTheme", "userId", "userName",
	"fillDate", "depotName", "leaseContract.leaseIdentifier", "project.projectName", "leaseUnit",
	"lesseeUnit", "subsidiarySerial", "deliveryDate", "rentType", "rentTypeName", "locationName", 
	"transportVehicle", "transportPersonnel", "auditor", "approveDate", "subsidiaryAuditor", "subsidiaryApproveDate", 
	"remarks", "status", "statusName"];
var RecipientListListViewField = ["listId", "recipientId", "specificationsId", "commodityId", "mnemonics", "commodity", "specifications", 
	"measurementUnit", "recipientQuantity", "assistUnit", "assistQuantity", "coefficient", "remarks"];
var LeaseStockListViewField = ["stockId", "leaseId", "materialsSpecifications", "quantity"];

var ReturnGoodsFieldMapping = [
	{name : "returnGoods.returnId", mapping : "returnId"},
	{name : "returnGoods.returnSerial", mapping : "returnSerial"},
	{name : "returnGoods.returnTheme", mapping : "returnTheme"},
	{name : "returnGoods.userId", mapping : "userId"},
	{name : "returnGoods.userName", mapping : "userName"},
	{name : "returnGoods.fillDate", mapping : "fillDate"},
	{name : "returnGoods.depotId", mapping : "depotId"},
	{name : "returnGoods.depotName", mapping : "depotName"},
	{name : "returnGoods.locationId", mapping : "locationId"},
	{name : "returnGoods.locationName", mapping : "locationName"},
	{name : "returnGoods.leaseContract", mapping : "leaseContract"},
	{name : "returnGoods.leaseContract.leaseId", mapping : "leaseContract.leaseId"},
	{name : "returnGoods.leaseContract.leaseIdentifier", mapping : "leaseContract.leaseIdentifier"},
	{name : "returnGoods.project", mapping : "project"},
	{name : "returnGoods.project.projectId", mapping : "project.projectId"},
	{name : "returnGoods.project.projectName", mapping : "project.projectName"},
	{name : "returnGoods.leaseUnit", mapping : "leaseUnit"},
	{name : "returnGoods.lesseeUnit", mapping : "lesseeUnit"},
	{name : "returnGoods.returnDate", mapping : "returnDate"},
	{name : "returnGoods.subsidiarySerial", mapping : "subsidiarySerial"},
	{name : "returnGoods.deliveryDate", mapping : "deliveryDate"},
	{name : "returnGoods.returnType", mapping : "returnType"},
	{name : "returnGoods.transportVehicle", mapping : "transportVehicle"},
	{name : "returnGoods.transportPersonnel", mapping : "transportPersonnel"},
	{name : "returnGoods.auditor", mapping : "auditor"},
	{name : "returnGoods.approveDate", mapping : "approveDate"},
	{name : "returnGoods.subsidiaryAuditor", mapping : "subsidiaryAuditor"},
	{name : "returnGoods.subsidiaryApproveDate", mapping : "subsidiaryApproveDate"},
	{name : "returnGoods.remarks", mapping : "remarks"},
	{name : "returnGoods.status", mapping : "status"}
];
var ReturnGoodsHiddenField = [
	{xtype : "hidden", name : "returnGoods.returnId"},
	{xtype : "hidden", name : "returnGoods.userId"},
	{xtype : "hidden", name : "returnGoods.project.projectId"},
	{xtype : "hidden", name : "returnGoods.depotId"},
	{xtype : "hidden", name : "returnGoods.locationId"},
	{xtype : "hidden", name : "returnGoods.leaseContract.leaseId"},
	{xtype : "hidden", name : "returnGoods.status"},
	{xtype : "hidden", name : "returnGoods.returnLists"},
];
var ReturnGoodsListViewField = ["returnId", "returnSerial", "returnTheme", "userId", "userName", "fillDate",
	"leaseContract", "project", "leaseUnit", "lesseeUnit","returnDate", "subsidiarySerial", "deliveryDate", 
	"returnType", "depotName", "transportVehicle","transportPersonnel", "auditor", "approveDate", "subsidiaryAuditor",
	"subsidiaryApproveDate", "remarks", "status", "statusName", "depotName", "locationName"];
var ReturnListListViewField = ["listId", "returnId", "commodityId", "specificationsId", "mnemonics", "commodity","specifications",
	"measurementUnit", "returnQuantity", "assistUnit", "assistQuantity", "coefficient", "remarks"];

var LeaseSettlementFieldMapping = [
	{name : "leaseSettlement.settlementId", mapping : "settlementId"},
	{name : "leaseSettlement.settlementSerial", mapping : "settlementSerial"},
	{name : "leaseSettlement.settlementTheme", mapping : "settlementTheme"},
	{name : "leaseSettlement.userId", mapping : "userId"},
	{name : "leaseSettlement.userName", mapping : "userName"},
	{name : "leaseSettlement.fillDate", mapping : "fillDate"},
	{name : "leaseSettlement.leaseContract", mapping : "leaseContract"},
	{name : "leaseSettlement.leaseContract.leaseIdentifier", mapping : "leaseContract.leaseIdentifier"},
	{name : "leaseSettlement.leaseContract.contractAmount", mapping : "leaseContract.contractAmount"},
	{name : "leaseSettlement.leaseContract.leaseId", mapping : "leaseContract.leaseId"},
	{name : "leaseSettlement.leaseContract.depName", mapping : "leaseContract.depName"},
	{name : "leaseSettlement.project", mapping : "project"},
	{name : "leaseSettlement.project.projectId", mapping : "project.projectId"},
	{name : "leaseSettlement.project.projectName", mapping : "project.projectName"},
	{name : "leaseSettlement.lessor", mapping : "lessor"},
	{name : "leaseSettlement.tenantry", mapping : "tenantry"},
	{name : "leaseSettlement.settlement", mapping : "settlement"},
	{name : "leaseSettlement.leaseType", mapping : "leaseType"},
	{name : "leaseSettlement.startDate", mapping : "startDate"},
	{name : "leaseSettlement.endDate", mapping : "endDate"},
	{name : "leaseSettlement.leaseMoney", mapping : "leaseMoney"},
	{name : "leaseSettlement.currentSettlementAmount", mapping : "currentSettlementAmount"},
	{name : "leaseSettlement.alreadySettlementAmount", mapping : "alreadySettlementAmount"},
	{name : "leaseSettlement.alreadyPaymentAmount", mapping : "alreadyPaymentAmount"},
	{name : "leaseSettlement.freight", mapping : "freight"},
	{name : "leaseSettlement.accountingType", mapping : "accountingType"},
	{name : "leaseSettlement.serviceCharge", mapping : "serviceCharge"},
	{name : "leaseSettlement.loseCharge", mapping : "loseCharge"},
	{name : "leaseSettlement.remarks", mapping : "remarks"},
	{name : "leaseSettlement.status", mapping : "status"},
	{name : "leaseSettlement.insideSettlementAmount", mapping : "insideSettlementAmount"}
];
var LeaseSettlementHiddenField = [
	{xtype : "hidden", name : "leaseSettlement.settlementId"},
	{xtype : "hidden", name : "leaseSettlement.userId"},
	{xtype : "hidden", name : "leaseSettlement.leaseContract.leaseId"},
	{xtype : "hidden", name : "leaseSettlement.project.projectId"},
	{xtype : "hidden", name : "leaseSettlement.status"},
	{xtype : "hidden", name : "leaseSettlement.settlementLists"},
	{xtype : "hidden", name : "leaseSettlement.insideSettlementLists"},
	{xtype : "hidden", name : "leaseSettlement.leasedLostDetails"},
	{xtype : "hidden", name : "leaseSettlement.leaseOtherBusinessDetails"},
	{xtype : "hidden", name : "leaseSettlement.leaseSettlementBlockUps"},
	{xtype : "hidden", name : "leaseSettlement.leaseSettlementInsideBlockUps"}
];
var LeaseSettlementListViewField = ["settlementId", "settlementSerial", "settlementTheme", "userId", "userName",
	"fillDate", "leaseContract", "project", "lessor", "tenantry", "leaseType", "settlement", "startDate", "endDate", 
	"leaseMoney", "currentSettlementAmount", "alreadySettlementAmount", "alreadyPaymentAmount", "freight", "accountingType",
	"serviceCharge", "loseCharge", "remarks", "status", "statusName"];
var SettlementListListViewField = ["listId", "commodityId", "specificationsId", "settlementId", "receiptDate", "receiptType", "mnemonics", 
	"commodity", "specifications", "quantity", "auxiliaryNum", "dailyRent", "measurementUnit", "unitConversion", "convertedQuantity", "conversionDays",
	"amount","relateSerial","beginDate","stopDate","totalRent"];
var InsideSettlementListListViewField = ["insideId", "commodityId", "specificationsId", "settlementId", "receiptDate", "receiptType", "mnemonics", 
   "commodity", "specifications", "quantity", "auxiliaryNum", "dailyRent", "measurementUnit", "unitConversion", "convertedQuantity", "conversionDays",
   "amount","relateSerial","beginDate","stopDate","totalRent"];

var LeasePaymentFieldMapping = [
	{name : "leasePayment.paymentId", mapping : "paymentId"},
	{name : "leasePayment.paymentSerial", mapping : "paymentSerial"},
	{name : "leasePayment.paymentTheme", mapping : "paymentTheme"},
	{name : "leasePayment.leaseContract", mapping : "leaseContract"},
	{name : "leasePayment.leaseContract.leaseId", mapping : "leaseContract.leaseId"},
	{name : "leasePayment.leaseContract.leaseIdentifier", mapping : "leaseContract.leaseIdentifier"},
	{name : "leasePayment.leaseContract.contractAmount", mapping : "leaseContract.contractAmount"},
	{name : "leasePayment.tenantry", mapping : "tenantry"},
	{name : "leasePayment.lessor", mapping : "lessor"},
	{name : "leasePayment.paymentDate", mapping : "paymentDate"},
	{name : "leasePayment.paymentAmount", mapping : "paymentAmount"},
	{name : "leasePayment.alreadyPaymentAmount", mapping : "alreadyPaymentAmount"},
	{name : "leasePayment.amountPayable", mapping : "amountPayable"},
	{name : "leasePayment.accountingType", mapping : "accountingType"},
	{name : "leasePayment.accountingTypeName", mapping : "accountingTypeName"},
	{name : "leasePayment.purpose", mapping : "purpose"},
	{name : "leasePayment.isInvoice", mapping : "isInvoice"},
	{name : "leasePayment.userId", mapping : "userId"},
	{name : "leasePayment.userName", mapping : "userName"},
	{name : "leasePayment.fillDate", mapping : "fillDate"},
	{name : "leasePayment.status", userName : "status"}
];
var LeasePaymentHiddenField = [
	{xtype : "hidden", name : "leasePayment.paymentId"},
	{xtype : "hidden", name : "leasePayment.leaseContract.leaseId"},
	{xtype : "hidden", name : "leasePayment.userId"},
	{xtype : "hidden", name : "leasePayment.status"},
	{xtype : "hidden", name : "leasePayment.settlementInfos"},
];
var LeasePaymentListViewField = ["paymentId", "paymentSerial", "paymentTheme", "leaseContract", "leaseMoney",
	"tenantry", "lessor", "paymentDate", "paymentAmount", "alreadyPaymentAmount", "amountPayable", "accountingType",
	"accountingTypeName", "purpose", "isInvoice", "userId", "userName", "fillDate", "status", "statusName"];
var SettlementInfoListViewField = ["infoId", "paymentId", "commodityId", "mnemonics", "commodity", "specifications",
	"settlementDays", "measurementUnit", "quantity", "unitPrice", "amount", "remarks"];

var AllocationDepotFieldMapping = [
    {name:"allocationDepot.allocationId",mapping:"allocationId"},
    {name:"allocationDepot.applyforState",mapping:"applyforState"},
    {name:"allocationDepot.applyforStateName",mapping:"applyforStateName"},
    {name:"allocationDepot.allocationSerial",mapping:"allocationSerial"},
    {name:"allocationDepot.userId",mapping:"userId"},
    {name:"allocationDepot.userName",mapping:"userName"},
    {name:"allocationDepot.inputDate",mapping:"inputDate"},
    {name:"allocationDepot.allocationTheme",mapping:"allocationTheme"},
    {name:"allocationDepot.allocationDate",mapping:"allocationDate"},
    {name:"allocationDepot.allocationType",mapping:"allocationType"},
    {name:"allocationDepot.allocationTypeName",mapping:"allocationTypeName"},
    {name:"allocationDepot.outDepotId",mapping:"outDepotId"},
    {name:"allocationDepot.outDepotName",mapping:"outDepotName"},
    {name:"allocationDepot.inDepotId",mapping:"inDepotId"},
    {name:"allocationDepot.inDepotName",mapping:"inDepotName"},
    {name:"allocationDepot.assetsProperty",mapping:"assetsProperty"},
    {name:"allocationDepot.assetsPropertyName",mapping:"assetsPropertyName"},
    {name:"allocationDepot.applicantMan",mapping:"applicantMan"},
    {name:"allocationDepot.chargeMan",mapping:"chargeMan"},
    {name:"allocationDepot.contactTel",mapping:"contactTel"},
    {name:"allocationDepot.vehicleNum",mapping:"vehicleNum"},
    {name:"allocationDepot.vehiclePerson",mapping:"vehiclePerson"},
    {name:"allocationDepot.outDepotConsignor",mapping:"outDepotConsignor"},
    {name:"allocationDepot.inDepotConsignee",mapping:"inDepotConsignee"},
    {name:"allocationDepot.attachSerial",mapping:"attachSerial"},
    {name:"allocationDepot.remark",mapping:"remark"},
    {name:"allocationDepot.delFlag",mapping:"delFlag"}
];
var AllocationDepotListViewField=["allocationId","applyforState","applyforStateName","allocationSerial","allocationTheme","userName","allocationDate","allocationTypeName","outDepotName","inDepotName","inProjectName","inDepotId","outDepotId","chargeMan"];
var AllocationDepotHiddenField=[
    {xtype:"hidden",name:"allocationDepot.allocationId"},
    {xtype:"hidden",name:"allocationDepot.inDepotId"},
    {xtype:"hidden",name:"allocationDepot.outDepotId"},
    {xtype:"hidden",name:"allocationDepot.userId"},
    {xtype:"hidden",name:"allocationDepot.allocationDepotDetails"}
];
var AllocationDepotDetailListViewField=["detailId","allocationId","mnemonicCode","commodity","specifications","measurementUnit","outLocationId","outLocationName","quantity","allocationCounts","inLocationId","inLocationName","surplusCounts","specificationsId","storeId","secondConvertedQuantity","auxiliaryQuantity"];

var PriceSettingListViewField = ["priceId","contractmaId","commodityId","commodity","dailyRent","compensationCost","specificationsId","specifications"];
var MatDamageListViewField = ["matDamageId","contractmaId","commodityId","commodity","damageId","damageType","measurementUnit","damageUnitPrice"];
var CostHandleListViewField = ["costHandleId","contractmaId","commodityId","commodity","measurementUnit","feeId","chargeUnitPrice","feesType","feesTypeName","theoriesValueConversion","auxiliaryUnit","feeCategory"];

var DispatchMaterialsListViewField = ["dispatchId","materialsId","mnemonics","commodityId","commodity","specifications","measurementUnit","dispatchCounts","secondUnitConversion","secondConvertedQuantity","auxiliaryQuantity","specificationsId","materialsStoreId"];

var CompensationScrapListViewField = ["compensationId","contractId","commodityId","commodity","measurementUnit","scrapUnitPrice","scrapType","scrapId"];
var CostDetailListViewField = ["costId","packageId","commodity","feesType","feesTypeName","chargeUnitPrice","chargeQuantity","chargeAmount","chargeMode","leaseAmount","feeCategory"];
var PackageDetailListViewField = ["detailId","packageId","mnemonics","commodityId","commodity","specificationsId","specifications","measurementUnit","dispatchNumber","rentQuantity","loadQuantity","packageQuantity","secondUnitConversion","convertedQuantity","remark","auxiliaryQuantity","dispatchId"];

var MaterialsInStockListViewField = ["materialsInStockId","commodity","specifications","unit","number","auxiliaryUnit","auxiliaryNum","inStorageDate","inStorageType","inStorageLocation","inStorageDepot","relateBusiness","documentSerial","remark"];

var OtherMaterialStockListViewField = ["otherMaterialStockId","omsSerial","userName","handleDate","storeName","handleTypeName","storageLocation","applyforState","applyforStateName","storeId","locationId","handleType","handleTypeName"];
var OtherMaterialStockFieldMapping = [
	{name:"otherMaterialStock.otherMaterialStockId",mapping:"otherMaterialStockId"},                                 
	{name:"otherMaterialStock.omsSerial",mapping:"omsSerial"},
	{name:"otherMaterialStock.userId",mapping:"userId"},
	{name:"otherMaterialStock.userName",mapping:"userName"},
	{name:"otherMaterialStock.handleDate",mapping:"handleDate"},
	{name:"otherMaterialStock.storeId",mapping:"storeId"},
	{name:"otherMaterialStock.storeName",mapping:"storeName"},
	{name:"otherMaterialStock.locationId",mapping:"locationId"},
	{name:"otherMaterialStock.storageLocation",mapping:"storageLocation"},
	{name:"otherMaterialStock.handleType",mapping:"handleType"},
	{name:"otherMaterialStock.handleTypeName",mapping:"handleTypeName"},
	{name:"otherMaterialStock.remark",mapping:"remark"},
	{name:"otherMaterialStock.applyforState",mapping:"applyforState"},
	{name:"otherMaterialStock.delFlag",mapping:"delFlag"}
];
var OtherMaterialStockHiddenField = [
	{xtype:"hidden",name:"otherMaterialStock.otherMaterialStockId"},
	{xtype:"hidden",name:"otherMaterialStock.userId"},
	{xtype:"hidden",name:"otherMaterialStock.storeId"},
	{xtype:"hidden",name:"otherMaterialStock.locationId"},
	{xtype:"hidden",name:"otherMaterialStock.applicationDetails"}
];

var HandleMakeFieldMapping = [
	{name:"handleMake.handleId",mapping:"handleId"}, 
	{name:"handleMake.handleSerial",mapping:"handleSerial"},
	{name:"handleMake.handleTheme",mapping:"handleTheme"},
	{name:"handleMake.applyMake",mapping:"applyMake"},
	{name:"handleMake.applyMake.applyMakeId",mapping:"applyMake.applyMakeId"},
	{name:"handleMake.userId",mapping:"userId"},
	{name:"handleMake.userName",mapping:"userName"},
	{name:"handleMake.fillDate",mapping:"fillDate"},
	{name:"handleMake.producers",mapping:"producers"},
	{name:"handleMake.applyMake.storeId",mapping:"applyMake.storeId"},
	{name:"handleMake.applyMake.storeName",mapping:"applyMake.storeName"},
	{name:"handleMake.applyMake.assetsProperty",mapping:"applyMake.assetsProperty"},
	{name:"handleMake.applyMake.assetsPropertyName",mapping:"applyMake.assetsPropertyName"},
	{name:"handleMake.planFinishDate",mapping:"planFinishDate"},
	{name:"handleMake.remarks",mapping:"remarks"},
	{name:"handleMake.status",mapping:"status"},
	{name:"handleMake.teamId",mapping:"teamId"}
];
var HandleMakeHiddenField = [
	{xtype:"hidden",name:"handleMake.handleId"},
	{xtype:"hidden",name:"handleMake.applyMake.applyMakeId"},
	{xtype:"hidden",name:"handleMake.userId"},
	{xtype:"hidden",name:"handleMake.applyMake.storeId"},
	{xtype:"hidden",name:"handleMake.applyMake.assetsProperty"},
	{xtype:"hidden",name:"handleMake.makeProducts"},
	{xtype:"hidden",name:"handleMake.consumeProducts"},
	{xtype:"hidden",name:"handleMake.status"},
	{xtype:"hidden",name:"handleMake.teamName"},
];
var HandleMakeListViewField = ["handleId", "applyMake", "handleSerial", "handleTheme", "userName", "fillDate", "producers",
	 "remarks", "status", "statusName","planFinishDate"];
var MakeProductListViewField = ["productId", "handleId", "commodityId", "commodity", "specificationsId", "specifications",
	"mnemonics", "measurementUnit", "makeQuantity","auxiliaryQuantity","convertedQuantity","enterLocationId","enterLocationName"];
var ConsumeProductListViewField = ["consumeId","handleId","commodityId","commodity","specificationsId","specifications",
     "mnemonics","measurementUnit","quantity","consumeQuantity","auxiliaryQuantity","convertedQuantity","exitLocationId","exitLocationName"];

var MaterialsRemodelFieldMapping = [
    {name:"materialsRemodel.remodelId",mapping:"remodelId"},
    {name:"materialsRemodel.applyforState",mapping:"applyforState"},
    {name:"materialsRemodel.applyforStateName",mapping:"applyforStateName"},
    {name:"materialsRemodel.remodelSerial",mapping:"remodelSerial"},
    {name:"materialsRemodel.userId",mapping:"userId"},
    {name:"materialsRemodel.userName",mapping:"userName"},
    {name:"materialsRemodel.applyDate",mapping:"applyDate"},
    {name:"materialsRemodel.assetsProperty",mapping:"assetsProperty"},
    {name:"materialsRemodel.assetsPropertyName",mapping:"assetsPropertyName"},
    {name:"materialsRemodel.producerId",mapping:"producerId"},
    {name:"materialsRemodel.producer",mapping:"producer"},
    {name:"materialsRemodel.producationTheme",mapping:"producationTheme"},
    {name:"materialsRemodel.remodelType",mapping:"remodelType"},
    {name:"materialsRemodel.remodelTypeName",mapping:"remodelTypeName"},
    {name:"materialsRemodel.planFinishDate",mapping:"planFinishDate"},
    {name:"materialsRemodel.approveMan",mapping:"approveMan"},
    {name:"materialsRemodel.approveDate",mapping:"approveDate"},
    {name:"materialsRemodel.remark",mapping:"remark"},
    {name:"materialsRemodel.baseDepot.depotId",mapping:"baseDepot.depotId"},
    {name:"materialsRemodel.baseDepot.depotName",mapping:"baseDepot.depotName"}
];
var MaterialsRemodelHiddenField =[
	{xtype:"hidden",name:"materialsRemodel.remodelId"},
	{xtype:"hidden",name:"materialsRemodel.userId"},
	{xtype:"hidden",name:"materialsRemodel.producerId"},
	{xtype:"hidden",name:"materialsRemodel.beforeRemodels"},
	{xtype:"hidden",name:"materialsRemodel.afterRemodels"}              
 ];
var MaterialsRemodelListViewField = [ "remodelId", "applyforState", "applyforStateName", "remodelSerial",
	"userId", "userName", "applyDate", "assetsProperty", "assetsPropertyName", "producerId", "producer",
	"producationTheme", "remodelType", "remodelTypeName", "planFinishDate", "approveMan", "approveDate",
	"baseDepot" ];

var LeaseRepairFieldMapping = [
	{name:"leaseRepair.repairId",mapping:"repairId"},
	{name:"leaseRepair.repairSerial",mapping:"repairSerial"},
	{name:"leaseRepair.userId",mapping:"userId"},
	{name:"leaseRepair.userName",mapping:"userName"},
	{name:"leaseRepair.fillDate",mapping:"fillDate"},
	{name:"leaseRepair.leaseContract",mapping:"leaseContract"},
	{name:"leaseRepair.leaseContract.leaseId",mapping:"leaseContract.leaseId"},
	{name:"leaseRepair.leaseContract.leaseIdentifier",mapping:"leaseContract.leaseIdentifier"},
	{name:"leaseRepair.leaseContract.leaseUnit",mapping:"leaseContract.leaseUnit"},
	{name:"leaseRepair.leaseContract.project.projectName",mapping:"leaseContract.project.projectName"},
	{name:"leaseRepair.repairTheme",mapping:"repairTheme"},
	{name:"leaseRepair.repairDate",mapping:"repairDate"},
	{name:"leaseRepair.depId",mapping:"depId"},
	{name:"leaseRepair.depName",mapping:"depName"},
	{name:"leaseRepair.remark",mapping:"remark"},
	{name:"leaseRepair.status",mapping:"status"},
	{name:"leaseRepair.statusName",mapping:"statusName"}
];
var LeaseRepairHiddenField = [
	{xtype:"hidden",name:"leaseRepair.repairId"},
	{xtype:"hidden",name:"leaseRepair.userId"},
	{xtype:"hidden",name:"leaseRepair.depId"},
	{xtype:"hidden",name:"leaseRepair.status"},
	{xtype:"hidden",name:"leaseRepair.leaseContract.leaseId"},
	{xtype:"hidden",name:"leaseRepair.leaseRepairBefores"},
	{xtype:"hidden",name:"leaseRepair.leaseRepairAfters"}
];
var LeaseRepairListViewField = [ "repairId", "repairSerial", "userId", "userName", "fillDate", "repairTheme",
	"leaseContract", "repairDate", "depId", "depName", "remark", "status", "statusName"];
var LeaseRepairBeforeListViewField = [ "beforeId", "materialsSpecifications", "repairQuantity", "repertoryQuantity",
	"assistQuantity" ];
var LeaseRepairAfterListViewField = [ "afterId", "materialsSpecifications", "repairQuantity", "assistQuantity" ];

var ProjectRepairFieldMapping = [
	{name:"projectRepair.repairId",mapping:"repairId"},
	{name:"projectRepair.repairSerial",mapping:"repairSerial"},
	{name:"projectRepair.userId",mapping:"userId"},
	{name:"projectRepair.userName",mapping:"userName"},
	{name:"projectRepair.fillDate",mapping:"fillDate"},
	{name:"projectRepair.contractMaterials",mapping:"contractMaterials"},
	{name:"projectRepair.contractMaterials.contractmaId",mapping:"contractMaterials.contractmaId"},
	{name:"projectRepair.contractMaterials.contractSerial",mapping:"contractMaterials.contractSerial"},
	{name:"projectRepair.contractMaterials.projectName",mapping:"contractMaterials.projectName"},
	{name:"projectRepair.contractMaterials.address",mapping:"contractMaterials.address"},
	{name:"projectRepair.repairTheme",mapping:"repairTheme"},
	{name:"projectRepair.repairDate",mapping:"repairDate"},
	{name:"projectRepair.depId",mapping:"depId"},
	{name:"projectRepair.depName",mapping:"depName"},
	{name:"projectRepair.remark",mapping:"remark"},
	{name:"projectRepair.status",mapping:"status"},
	{name:"projectRepair.statusName",mapping:"statusName"}
];
var ProjectRepairHiddenField = [
	{xtype:"hidden",name:"projectRepair.repairId"},
	{xtype:"hidden",name:"projectRepair.userId"},
	{xtype:"hidden",name:"projectRepair.contractMaterials.contractmaId"},
	{xtype:"hidden",name:"projectRepair.projectRepairBefores"},
	{xtype:"hidden",name:"projectRepair.projectRepairAfters"},
	{xtype:"hidden",name:"projectRepair.status"}
];
var ProjectRepairListViewField = [ "repairId", "repairSerial", "userId", "userName", "fillDate", "contractMaterials",
	"repairTheme", "repairDate", "depId", "depName", "remark", "status", "statusName" ];
var ProjectRepairBeforeListViewField = [ "beforeId", "repairId", "materialsSpecifications", "repairQuantity",
	"repertoryQuantity", "assistQuantity" ];
var ProjectRepairAfterListViewField = [ "afterId", "repairId", "materialsSpecifications", "repairQuantity",
	"repertoryQuantity", "assistQuantity" ];

var SettleMaterialsDetailViewField =["id","specificationsId","receiptDate","receiptType","relateSerial","commodity","specifications","unit","quantity",
      "supplementUnit","supplementQuantity","days","compensationUnit","dailyRent","amount","beginDate","stopDate","operationWay","conversionNum","rentAmount"];
var SettleMaterialsDetailSecondViewField = ["id","receiptDate","receiptType","relateSerial","commodity","damageType","unit","quantity","compensationUnit","amount"];
var SettleMaterialsDetailOtherFeeViewField = ["id","receiptDate","receiptType","relateSerial","depotName","calculationMethod","feesType","amount"];


var LeasedLostCompensationFieldMapping = [
    {name:"leasedLostCompensation.lostId",mapping:"lostId"},
    {name:"leasedLostCompensation.applyforState",mapping:"applyforState"},
    {name:"leasedLostCompensation.applyforStateName",mapping:"applyforStateName"},
    {name:"leasedLostCompensation.lostSerial",mapping:"lostSerial"},
    {name:"leasedLostCompensation.userId",mapping:"userId"},
    {name:"leasedLostCompensation.userName",mapping:"userName"},
    {name:"leasedLostCompensation.applyDate",mapping:"applyDate"},
    {name:"leasedLostCompensation.contractSerial",mapping:"contractSerial"},
    {name:"leasedLostCompensation.projectName",mapping:"projectName"},
    {name:"leasedLostCompensation.address",mapping:"address"},
    {name:"leasedLostCompensation.paEntName",mapping:"paEntName"},
    {name:"leasedLostCompensation.compensationDate",mapping:"compensationDate"},
    {name:"leasedLostCompensation.totalCompensation",mapping:"totalCompensation"},
    {name:"leasedLostCompensation.lostTheme",mapping:"lostTheme"},
    {name:"leasedLostCompensation.recheckDate",mapping:"recheckDate"},
    {name:"leasedLostCompensation.recheckMan",mapping:"recheckMan"},
    {name:"leasedLostCompensation.checkDate",mapping:"checkDate"},
    {name:"leasedLostCompensation.checkMan",mapping:"checkMan"},
    {name:"leasedLostCompensation.explain",mapping:"explain"},
    {name:"leasedLostCompensation.contractNumber",mapping:"contractNumber"},
    {name:"leasedLostCompensation.projectId",mapping:"projectId"},
    {name:"leasedLostCompensation.leaseContract.leaseId",mapping:"leaseContract.leaseId"}
];
var LeasedLostCompensationHiddenField = [
    {xtype:"hidden",name:"leasedLostCompensation.lostId"},
    {xtype:"hidden",name:"leasedLostCompensation.userId"},  
    {xtype:"hidden",name:"leasedLostCompensation.leasedLostCompensationDetails"},  
    {xtype:"hidden",name:"leasedLostCompensation.contractNumber"},
    {xtype:"hidden",name:"leasedLostCompensation.leaseContract.leaseId"},
    {xtype:"hidden",name:"leasedLostCompensation.projectId"}
];
var LeasedLostCompensationListViewField = ["lostId","applyforState","applyforStateName","lostSerial","userId","userName","applyDate","contractSerial",
        "projectName","paEntName","compensationDate","totalCompensation","lostTheme","checkDate","recheckDate","contractMaterials","checkMan","recheckMan"];
var LeasedLostCompensationDetailListViewField = ["detailId","lostId","commodity","mnemonics","specifications","specificationsId","unit","oweQuantity",
         "lostQuantity","supplementUnit","supplementQuantity","compensationCosts","totalCosts","conversionNum"];
var LeasedLostDetailField = ["detailId","settlementId","commodity","specifications","receiptDate","receiptType","unit","quantity","supplementQuantity",
         "supplementUnit","compensationUnit","amount","relateSerial"];

var TemporaryStorageListViewField = ["temporaryId","commodity","mnemonics","specifications","unit","temporaryQuantity","supplementUnit",
                                     "supplementQuantity","conversionNum","remark","commodityId","specificationsId"];

var PumpTruckListViewField = ["pumpId","licensePlate","pumpType","pumpTypeName","pumpNumber","pumpNumberName","releaseDate"];
var PumpTruckFieldMapping = [
 {name:"pumpTruck.pumpId",mapping:"pumpId"},
 {name:"pumpTruck.licensePlate",mapping:"licensePlate"},
 {name:"pumpTruck.pumpType",mapping:"pumpType"},
 {name:"pumpTruck.pumpTypeName",mapping:"pumpTypeName"},
 {name:"pumpTruck.pumpNumber",mapping:"pumpNumber"},
 {name:"pumpTruck.pumpNumberName",mapping:"pumpNumberName"},
 {name:"pumpTruck.releaseDate",mapping:"releaseDate"},
 {name:"pumpTruck.issuingAuthority",mapping:"issuingAuthority"},
 {name:"pumpTruck.vehiclePermit",mapping:"vehiclePermit"},
 {name:"pumpTruck.expirationDate",mapping:"expirationDate"},
 {name:"pumpTruck.remark",mapping:"remark"},
 {name:"pumpTruck.delFlag",mapping:"delFlag"},
 ];
var PumpTruckHiddenField =[
    {xtype:"hidden",name:"pumpTruck.pumpId"}
];

var TemporaryReturnListViewField = ["returnId","userName","returnSerial","applyforState","applyforStateName","licensePlate","driver",
      "depotName","projectId","projectName","applyDate","packageDate","deliveryMan","acceptTime","approveTime","contractMaterials"];
var TemporaryReturnFieldMapping = [
    {name:"temporaryReturn.returnId",mapping:"returnId"},
     {name:"temporaryReturn.userId",mapping:"userId"},
     {name:"temporaryReturn.userName",mapping:"userName"},
     {name:"temporaryReturn.returnSerial",mapping:"returnSerial"},
     {name:"temporaryReturn.applyforState",mapping:"applyforState"},
     {name:"temporaryReturn.applyforStateName",mapping:"applyforStateName"},
     {name:"temporaryReturn.licensePlate",mapping:"licensePlate"},
     {name:"temporaryReturn.driver",mapping:"driver"},
     {name:"temporaryReturn.depotId",mapping:"depotId"},
     {name:"temporaryReturn.depotName",mapping:"depotName"},
     {name:"temporaryReturn.projectId",mapping:"projectId"},
     {name:"temporaryReturn.projectName",mapping:"projectName"},
     {name:"temporaryReturn.contractMaterials.contractSerial",mapping:"contractMaterials.contractSerial"},
     {name:"temporaryReturn.contractMaterials.contractmaId",mapping:"contractMaterials.contractmaId"},
     {name:"temporaryReturn.applyDate",mapping:"applyDate"},
     {name:"temporaryReturn.packageDate",mapping:"packageDate"},
     {name:"temporaryReturn.deliveryMan",mapping:"deliveryMan"},
     {name:"temporaryReturn.affiliatedSerial",mapping:"affiliatedSerial"}
     ];
var TemporaryReturnHiddenField = [
	{xtype:"hidden",name:"temporaryReturn.returnId"},
	{xtype:"hidden",name:"temporaryReturn.projectId"},
	{xtype:"hidden",name:"temporaryReturn.temporaryReturnDetails"},
	{xtype:"hidden",name:"temporaryReturn.chargeHandles"},
	{xtype:"hidden",name:"temporaryReturn.contractMaterials.contractmaId"},
	{xtype:"hidden",name:"temporaryReturn.depotId"}
 ];
var TemporaryReturnDetailListViewField = ["detailId","returnId","mnemonics","commodityId","commodity","specificationsId","specifications","unit",
 "returnQuantity","supplementUnit","supplementQuantity","remark","conversionNum","temporaryQuantity"];
var ChargeHandleListViewField = ["handleId","returnId","commodity","feesType","feesTypeName","chargeUnitPrice","chargeQuantity","chargeAmount","chargeMode","leaseAmount","feeCategory"];

var ReturnTempStoreFieldMapping = ["tempId","materialsSpecifications","depotName","quantity","depotId" ];
var SettleMaterialsDetailCeaseReportViewField = ["ceaseId","ceaseTitle","ceaseSerial","projectName","paEntName","settledAmount","startDate","endDate"];

var LeaseBlockUpFieldMapping = [
   {name:"leaseBlockUp.blockId",mapping:"blockId"},
   {name:"leaseBlockUp.blockSerial",mapping:"blockSerial"},
   {name:"leaseBlockUp.userId",mapping:"userId"},
   {name:"leaseBlockUp.userName",mapping:"userName"},
   {name:"leaseBlockUp.status",mapping:"status"},
   {name:"leaseBlockUp.statusName",mapping:"statusName"},
   {name:"leaseBlockUp.blockTitle",mapping:"blockTitle"},
   {name:"leaseBlockUp.startDate",mapping:"startDate"},
   {name:"leaseBlockUp.endDate",mapping:"endDate"},
   {name:"leaseBlockUp.applyDate",mapping:"applyDate"},
   {name:"leaseBlockUp.settledAmount",mapping:"settledAmount"},
   {name:"leaseBlockUp.finishAmount",mapping:"finishAmount"},
   {name:"leaseBlockUp.backoff",mapping:"backoff"},
   {name:"leaseBlockUp.tranportCaculateType",mapping:"tranportCaculateType"},
   {name:"leaseBlockUp.tranportCaculateTypeName",mapping:"tranportCaculateTypeName"},
   {name:"leaseBlockUp.caculateRule",mapping:"caculateRule"},
   {name:"leaseBlockUp.caculateRuleName",mapping:"caculateRuleName"},
   {name:"leaseBlockUp.leaseContract.leaseIdentifier",mapping:"leaseContract.leaseIdentifier"},
   {name:"leaseBlockUp.leaseContract.depName",mapping:"leaseContract.depName"},
   {name:"leaseBlockUp.leaseContract.project.projectName",mapping:"leaseContract.project.projectName"},
   {name:"leaseBlockUp.leaseContract.taxMethod",mapping:"leaseContract.taxMethod"},
   {name:"leaseBlockUp.leaseContract.taxMethodName",mapping:"leaseContract.taxMethodName"},
   {name:"leaseBlockUp.leaseContract.lesseeUnit",mapping:"leaseContract.lesseeUnit"},
   {name:"leaseBlockUp.leaseContract.discountRentalRate",mapping:"leaseContract.discountRentalRate"},
   {name:"leaseBlockUp.leaseContract.leaseTheme",mapping:"leaseContract.leaseTheme"},
   {name:"leaseBlockUp.leaseContract.taxRate",mapping:"leaseContract.taxRate"},
   {name:"leaseBlockUp.leaseContract.leaseId",mapping:"leaseContract.leaseId"},
   {name:"leaseBlockUp.leaseContract.leaseUnit",mapping:"leaseContract.leaseUnit"},
   {name:"leaseBlockUp.insideAmount",mapping:"insideAmount"},
   {name:"leaseBlockUp.blockupDays",mapping:"blockupDays"}
   ];	
var LeaseBlockUpHiddenField = [
	{xtype:"hidden",name:"leaseBlockUp.blockId"},          
	{xtype:"hidden",name:"leaseBlockUp.userId"},          
	{xtype:"hidden",name:"leaseBlockUp.tranportCaculateType"},          
	{xtype:"hidden",name:"leaseBlockUp.leaseContract.taxMethod"},          
	{xtype:"hidden",name:"leaseBlockUp.leaseContract.leaseId"},          
	{xtype:"hidden",name:"leaseBlockUp.leaseBlockUpDetails"},         
	{xtype:"hidden",name:"leaseBlockUp.insideBlockUpDetails"}
];
var LeaseBlockUpListViewField = ["blockId","blockSerial","userName","settledAmount","applyDate","startDate","endDate","status","statusName",
     "blockTitle","leaseContract","insideAmount","contractSerial","blockupDays"]; 
var LeaseBlockUpDetailViewField = ["detailId", "blockId","item", "amount"];
var LeaseContractMaterialsViewField = ["specificationsId","specifications","commodityId","commodity","mnemonics","firstUnitConversion","secondConvertedQuantity","secondUnitConversion"];

var OtherLeaseBusinessFieldMapping =[
    {name:"otherLeaseBusiness.otherId",mapping:"otherId"},
	{name:"otherLeaseBusiness.applyforState",mapping:"applyforState"},
	{name:"otherLeaseBusiness.applyforStateName",mapping:"applyforStateName"},
	{name:"otherLeaseBusiness.userId",mapping:"userId"},
	{name:"otherLeaseBusiness.userName",mapping:"userName"},
	{name:"otherLeaseBusiness.businessSerial",mapping:"businessSerial"},
	{name:"otherLeaseBusiness.chargeableTime",mapping:"chargeableTime"},
	{name:"otherLeaseBusiness.projectName",mapping:"projectName"},
	{name:"otherLeaseBusiness.totalCosts",mapping:"totalCosts"},
	{name:"otherLeaseBusiness.affiliatedSerial",mapping:"affiliatedSerial"},
	{name:"otherLeaseBusiness.remark",mapping:"remark"},
	{name:"otherLeaseBusiness.leaseContract.leaseId",mapping:"leaseContract.leaseId"},
	{name:"otherLeaseBusiness.leaseContract.leaseUnit",mapping:"leaseContract.leaseUnit"},
	{name:"otherLeaseBusiness.leaseContract.leaseIdentifier",mapping:"leaseContract.leaseIdentifier"},
	{name:"otherLeaseBusiness.baseDepot.depotId",mapping:"baseDepot.depotId"},
	{name:"otherLeaseBusiness.baseDepot.depotName",mapping:"baseDepot.depotName"}
];
var OtherLeaseBusinessHiddenField = [
    {xtype:"hidden",name:"otherLeaseBusiness.otherId"},
    {xtype:"hidden",name:"otherLeaseBusiness.userId"},
    {xtype:"hidden",name:"otherLeaseBusiness.leaseContract.leaseId"},
    {xtype:"hidden",name:"otherLeaseBusiness.leaseContract.leaseSerial"},
    {xtype:"hidden",name:"otherLeaseBusiness.otherLeaseDetails"}
 ];
var OtherLeaseBusinessListViewField = ["otherId","applyforState","applyforStateName","userId","userName","businessSerial","chargeableTime",
                                  "projectName","totalCosts","affiliatedSerial","leaseContract"];

var LeaseSettlementBlockUpViewField = ["detailId","blockTitle","blockSerial","projectName","leaseUnit","settledAmount","startDate","endDate","blockId","insideAmount"];
var LeaseOtherBusinessDetailViewField = ["detailId","receiptDate","receiptType","relateSerial","depotName","calculationMethod","feesType","amount","otherId"];
var OperatorSalaryStatementViewField = ["statementId","settleId","equipId","buildingNum","equipCategoryName","equipSpecificName","equipSerial","startSettleDate","endSettleDate","settleDays","taxRate",
	"salary","foodAllowance","preTaxAmount","afterTaxAmount","taxes","remark","equipDiaryId","recordSerial","recordId","exwSerial","unit","rentStandard","measurement","quantity","daysRent",
	"deductRent","summary","monthTag","costTotal","contractId","equipment","activateDate"];
var SafetyMonitorSettleStatementViewField = ["statementId","settleId","equipId","buildingNum","equipCategoryName","equipSpecificName","equipSerial","startSettleDate","endSettleDate","settleDays",
	"rentStandard","rentUnit","taxRate","preTaxAmount","afterTaxAmount","taxes","equipDiaryId","recordSerial","recordId","exwSerial","unit","quantity","daysRent","deductRent","summary","monthTag",
	"remark","contractId","equipment", "installFee","activateDate"];
var OtherExpenseStatementViewField = ["statementId","settleId","equipId","expenseItem","number","price","unit","amount","taxRate","preTaxAmount","afterTaxAmount","taxes","buildingNum","equipSerial",
	"exwSerial","equipSpecificName","contractId","equipment","equipDiaryId"];

var SafetyMonitorSettleStatement2ViewField = ["daysRent","statementId","settleId","equipId","buildingNum","equipCategoryName","equipSpecificName","equipSerial","startSettleDate","endSettleDate","settleDays","rentStandard","rentUnit","taxRate","preTaxAmount","afterTaxAmount","taxes"];


var SafetyMonitorSettleListViewField = ["settleId","daysRent","statementId","equipId","buildingNum","equipCategoryName","equipSpecificName","equipSerial","startSettleDate","endSettleDate","rentStandard","rentUnit","daysRent","equipGenericName","dispatchable","approveable"];



var SafetyMonitorSettleListViewField = ["listId","contractId","equipId","buildingNum","equipCategoryName","equipSpecificName","equipSerial","startSettleDate","endSettleDate","rentStandard","rentUnit","daysRent","equipGenericName"];


var SafetyMonitorSettleListViewFieldMapping = [
	{name:"safetyMonitorSettle.listId",mapping:"listId"},
	{name:"safetyMonitorSettle.contractId",mapping:"contractIdId"},
	{name:"safetyMonitorSettle.equipId",mapping:"equipId"},
	{name:"safetyMonitorSettle.buildingNum",mapping:"buildingNum"},
	{name:"safetyMonitorSettle.equipCategoryName",mapping:"equipCategoryName"},
	{name:"safetyMonitorSettle.equipSpecificName",mapping:"equipSpecificName"},
	{name:"safetyMonitorSettle.equipSerial",mapping:"equipSerial"},
	{name:"safetyMonitorSettle.startSettleDate",mapping:"startSettleDate"},
	{name:"safetyMonitorSettle.endSettleDate",mapping:"endSettleDate"},
	{name:"safetyMonitorSettle.rentStandard",mapping:"rentStandard"},
	{name:"safetyMonitorSettle.rentUnit",mapping:"rentUnit"},
	{name:"safetyMonitorSettle.daysRent",mapping:"daysRent"},
	
];
//===========================================================================//
var EquipInsuranceFieldMapping = [
    {name:"equipInsurance.insureId",mapping:"insureId"},
    {name:"equipInsurance.insureSerial",mapping:"insureSerial"},
    {name:"equipInsurance.startInsureDate",mapping:"startInsureDate"},
    {name:"equipInsurance.endInsureDate",mapping:"endInsureDate"},
    {name:"equipInsurance.totalPremium",mapping:"totalPremium"},
    {name:"equipInsurance.effective",mapping:"effective"},
    {name:"equipInsurance.effectiveName",mapping:"effectiveName"},
    {name:"equipInsurance.insuranceCompany",mapping:"insuranceCompany"},
    {name:"equipInsurance.claimPhone",mapping:"claimPhone"},
    {name:"equipInsurance.linkman",mapping:"linkman"},
    {name:"equipInsurance.linkmanPhone",mapping:"linkmanPhone"},
    {name:"equipInsurance.equipNum",mapping:"equipNum"},
    {name:"equipInsurance.remark",mapping:"remark"},
    {name:"equipInsurance.delFlag",mapping:"delFlag"},
    {name:"equipInsurance.exwSerial",mapping:"exwSerial"},
    {name:"equipInsurance.storeName",mapping:"storeName"},
    {name:"equipInsurance.equipSerial",mapping:"equipSerial"},
    {name:"equipInsurance.projectName",mapping:"projectName"},
    {name:"equipInsurance.equipSpecific",mapping:"equipSpecific"},
    {name:"equipInsurance.equipGeneric",mapping:"equipGeneric"},
	{name:"equipInsurance.userId",mapping:"userId"},
	{name:"equipInsurance.userName",mapping:"userName"},
	{name:"equipInsurance.providedDate",mapping:"providedDate"},
	{name:"equipInsurance.department.depId",mapping:"department.depId"},
	{name:"equipInsurance.department.depName",mapping:"department.depName"},
	{name:"equipInsurance.claims",mapping:"claims"},

];
var EquipInsuranceHiddenField = [                            
	{xtype:"hidden",name:"equipInsurance.insureId"},
	{xtype:"hidden",name:"equipInsurance.equipInsuranceDetails"},
	{xtype:"hidden",name:"equipInsurance.userId"},
	{xtype:"hidden",name:"equipInsurance.department.depId"}
];
var EquipInsuranceListViewField = [ "insureId","insureSerial","startInsureDate","endInsureDate","totalPremium","insuranceCompany","claimPhone","linkman","equipNum",
                                    "remark","delFlag","effective","effectiveName","exwSerial","storeName","equipSerial","projectName","equipSpecific","equipGeneric","claims"];
var EquipInsuranceDetailListViewField = [ "detailId","insureId","equipWorth","insuranceCategory","premium","contractId","contractNo","projectName","address","remark","equipment","equipId","startInsureDate","defaultFlag"];
var EquipmentInsuranceFormField = ["insureId","applyforState","applyforStateName","contractNo","projectName","signingTime","contractAmount","equipCount","paEntName","pbEntName"];
var EquipInsuranceRecordListViewField = [ "id","startInsureDate", "endInsureDate", "insureSerial", "insuranceCompany","claimPhone", "linkman", "insuranceCategory", "equipWorth","premium", "contractId", "projectName", "remark","linkmanPhone" ];

var EquipInsuranceDetailFieldMapping = [
	{name:"equipInsuranceDetail.detailId",mapping:"detailId"},
	{name:"equipInsuranceDetail.insureId",mapping:"insureId"},
	{name:"equipInsuranceDetail.equipId",mapping:"equipId"},
	{name:"equipInsuranceDetail.equipment",mapping:"equipment"},
	{name:"equipInsuranceDetail.equipWorth",mapping:"equipWorth"},
	{name:"equipInsuranceDetail.insuranceCategory",mapping:"insuranceCategory"},
	{name:"equipInsuranceDetail.contractId",mapping:"contractId"},
	{name:"equipInsuranceDetail.contractNo",mapping:"contractNo"},
	{name:"equipInsuranceDetail.projectName",mapping:"projectName"},
	{name:"equipInsuranceDetail.address",mapping:"address"},
	{name:"equipInsuranceDetail.remark",mapping:"remark"},
	{name:"equipInsuranceDetail.acculmatedpremium",mapping:"acculmatedpremium"},
	{name:"equipInsuranceDetail.acculmatedclaim",mapping:"acculmatedclaim"},
	{name:"equipInsuranceDetail.equipInsuranceClaimRecord",mapping:"equipInsuranceClaimRecord"}
];

var EquipmentInsuranceFormField = ["insureId","applyforState","applyforStateName","contractNo","projectName","signingTime","contractAmount","equipCount","paEntName","pbEntName"];

var EquipInsuranceClaimListViewField = [ "claimId","insureSerial", "insureId", "insureClaimSerial", "bankDeposit", "depositAccount", "claimDate", "costAmount", "claimAmount", "claimReason","equipId","equipment"
	,"contractId","projectName","remark","delFlag","insuranceCompany","insuranceCategory","equipGeneric","equipSpecific","exwSerial","equipSerial","storeName","claimAmount"];
var EquipInsuranceClaimRecordFieldMapping = [
    {name:"equipInsuranceClaimRecord.claimId",mapping:"claimId"},
    {name:"equipInsuranceClaimRecord.insureId",mapping:"insureId"},
    {name:"equipInsuranceClaimRecord.insureSerial",mapping:"insureSerial"},
    {name:"equipInsuranceClaimRecord.bankDeposit",mapping:"bankDeposit"},
    {name:"equipInsuranceClaimRecord.depositAccount",mapping:"depositAccount"},
    {name:"equipInsuranceClaimRecord.applyforState",mapping:"applyforState"},
    {name:"equipInsuranceClaimRecord.applyforStateName",mapping:"applyforStateName"},
    {name:"equipInsuranceClaimRecord.claimDate",mapping:"claimDate"},
    {name:"equipInsuranceClaimRecord.costAmount",mapping:"costAmount"},
    {name:"equipInsuranceClaimRecord.claimAmount",mapping:"claimAmount"},
    {name:"equipInsuranceClaimRecord.claimReason",mapping:"claimReason"},
    {name:"equipInsuranceClaimRecord.equipId",mapping:"equipId"},
    {name:"equipInsuranceClaimRecord.equipment",mapping:"equipment"},
    {name:"equipInsuranceClaimRecord.contractId",mapping:"contractId"},
    {name:"equipInsuranceClaimRecord.projectName",mapping:"projectName"},
    {name:"equipInsuranceClaimRecord.remark",mapping:"remark"},
    {name:"equipInsuranceClaimRecord.delFlag",mapping:"delFlag"},
    {name:"equipInsuranceClaimRecord.insuranceCompany",mapping:"insuranceCompany"},
    {name:"equipInsuranceClaimRecord.equipGeneric",mapping:"equipGeneric"},
    {name:"equipInsuranceClaimRecord.equipSpecific",mapping:"equipSpecific"},
    {name:"equipInsuranceClaimRecord.exwSerial",mapping:"exwSerial"},
    {name:"equipInsuranceClaimRecord.equipSerial",mapping:"equipSerial"},
    {name:"equipInsuranceClaimRecord.storeName",mapping:"storeName"},
	{name:"equipInsuranceClaimRecord.insuranceCategory",mapping:"insuranceCategory"}
];
var ClosedSettleInfoFieldMapping = [
    {name:"closedSettleInfo.closeSettleId",mapping:"closeSettleId"},
    {name:"closedSettleInfo.months",mapping:"months"},
    {name:"closedSettleInfo.closedStatus",mapping:"closedStatus"}
];
var ClosedSettleInfoListViewField = ["closeSettleId","closedStatus","months"];

var SettleContractEquipListViewField = ["equipId","equipGenericName","exwSerial","equipSerial","equipSummary","componSummary","itemSummary","operatorSummary","safeSummary","otherSummary"];

var EquipInstallReviewListViewField = [ "equipFlow","reviewId", "reviewCheckAttach", "reviewConclusion", "installId", "reviewStatus", "rejectReason", "relateId", "relateModule", 
	"relateModuleName","address","buildingNum","equipSerial","exwSerial","equipGenericName","projectName","address" ,"recordId"];

var EquipAddReduceDetailListViewField = [ "addReduceId", "relateModule", "executerId", "executerName", "executeDate", "knotNum", "wallAttachNum", "knotCounts", "wallAttacheQty","relateId","wallAttachePoleNum","wallAttacheFrameNum","wallAttachePoleQty","wallAttacheFrameQty","equipment","wallAttacheDisQty","knotDisQty"
	,"installHeight","currentInstallHeight","brachium"];

var EquipAddReduceDetailFieldMapping = [
    {name:"equipAddReduceDetail.addReduceId",mapping:"addReduceId"},
    {name:"equipAddReduceDetail.relateId",mapping:"relateId"},
    {name:"equipAddReduceDetail.relateModule",mapping:"relateModule"},
    {name:"equipAddReduceDetail.executerId",mapping:"executerId"},
    {name:"equipAddReduceDetail.executerName",mapping:"executerName"},
    {name:"equipAddReduceDetail.executeDate",mapping:"executeDate"},
    {name:"equipAddReduceDetail.knotNum",mapping:"knotNum"},
    {name:"equipAddReduceDetail.wallAttacheNum",mapping:"wallAttacheNum"},
    {name:"equipAddReduceDetail.equipGeneric",mapping:"equipGeneric"},
    {name:"equipAddReduceDetail.equipSpecific",mapping:"equipSpecific"},
    {name:"equipAddReduceDetail.projectName",mapping:"projectName"},
    {name:"equipAddReduceDetail.exwSerial",mapping:"exwSerial"},
    {name:"equipAddReduceDetail.equipSerial",mapping:"equipSerial"},
    {name:"equipAddReduceDetail.recordSerial",mapping:"recordSerial"},
    {name:"equipAddReduceDetail.contractSerial",mapping:"contractSerial"},
    {name:"equipAddReduceDetail.fileAttaches",mapping:"fileAttaches"},
    {name:"equipAddReduceDetail.checkAttaches",mapping:"checkAttaches"},
    {name:"equipAddReduceDetail.wallAttachPoleNum",mapping:"wallAttachPoleNum"},
    {name:"equipAddReduceDetail.wallAttachFrameNum",mapping:"wallAttachFrameNum"}
];
var EquipInstallReviewFieldMapping = [
    {name:"equipInstallReview.reviewId",mapping:"reviewId"},
    {name:"equipInstallReview.reviewCheckAttach",mapping:"reviewCheckAttach"},
    {name:"equipInstallReview.reviewConclusion",mapping:"reviewConclusion"},
    {name:"equipInstallReview.installId",mapping:"installId"},
    {name:"equipInstallReview.reviewStatus",mapping:"reviewStatus"},
    {name:"equipInstallReview.rejectReason",mapping:"rejectReason"},
    {name:"equipInstallReview.relateId",mapping:"relateId"},
    {name:"equipInstallReview.relateModule",mapping:"relateModule"},
    {name:"equipInstallReview.equipId",mapping:"equipId"},
    {name:"equipInstallReview.equipGeneric",mapping:"equipGeneric"},
    {name:"equipInstallReview.equipSpecific",mapping:"equipSpecific"},
    {name:"equipInstallReview.projectName",mapping:"projectName"},
    {name:"equipInstallReview.exwSerial",mapping:"exwSerial"},
    {name:"equipInstallReview.equipSerial",mapping:"equipSerial"},
    {name:"equipInstallReview.recordSerial",mapping:"recordSerial"},
    {name:"equipInstallReview.contractSerial",mapping:"contractSerial"},
    {name:"equipInstallReview.fileAttaches",mapping:"fileAttaches"},
    {name:"equipInstallReview.checkAttaches",mapping:"checkAttaches"}
];

var InspectSelfInitListViewField = ["initId","inspectType","inspectTypeName","inspectItem"];
var InspectSelfInitDetailListViewField = ["initDetailId","initId","inspectType","detailContent"];
var InspectSelfChooseListViewField = ["chooseId","initId","inspectType","inspectTypeName","inspectItem"];
var InspectSelfChooseDetailListViewField = ["detailId","chooseId","inspectType","detailContent"];
var InspectSelfInitFieldMapping = [
	{name:"inspectSelfInit.initId",mapping:"initId"},
	{name:"inspectSelfInit.inspectType",mapping:"inspectType"},
	{name:"inspectSelfInit.inspectTypeName",mapping:"inspectTypeName"},
	{name:"inspectSelfInit.inspectItem",mapping:"inspectItem"},
	{name:"inspectSelfInit.inspectSelfInitDetails",mapping:"inspectSelfInitDetails"}
	];
var InspectSelfInitHiddenField = [                            
	{xtype:"hidden",name:"inspectSelfInit.initId"},
	{xtype:"hidden",name:"inspectSelfInit.inspectType"},
	{xtype:"hidden",name:"inspectSelfInit.inspectSelfInitDetails"}
];
var InspectSelfInitDetailFieldMapping = [
	{name:"inspectSelfInitDetail.initDetailId",mapping:"initDetailId"},
	{name:"inspectSelfInitDetail.initId",mapping:"initId"},
	{name:"inspectSelfInitDetail.inspectType",mapping:"inspectType"},
	{name:"inspectSelfInitDetail.inspectTypeName",mapping:"inspectTypeName"},
	{name:"inspectSelfInitDetail.detailContent",mapping:"detailContent"}
	];
var InspectSelfInitDetailHiddenField = [                            
	{xtype:"hidden",name:"inspectSelfInitDetail.initDetailId"},
	{xtype:"hidden",name:"inspectSelfInitDetail.initId"},
	{xtype:"hidden",name:"inspectSelfInitDetail.inspectType"}
	];

var InspectSelfChooseFieldMapping = [
	{name:"inspectSelfChoose.chooseId",mapping:"chooseId"},
	{name:"inspectSelfChoose.initId",mapping:"initId"},
	{name:"inspectSelfChoose.inspectType",mapping:"inspectType"},
	{name:"inspectSelfChoose.inspectTypeName",mapping:"inspectTypeName"},
	{name:"inspectSelfChoose.inspectItem",mapping:"inspectItem"},
	{name:"inspectSelfChoose.inspectSelfChooseDetails",mapping:"inspectSelfChooseDetails"}
	
	];
var InspectSelfChooseHiddenField = [                            
	{xtype:"hidden",name:"inspectSelfChoose.chooseId"},
	{xtype:"hidden",name:"inspectSelfChoose.initId"},
	{xtype:"hidden",name:"inspectSelfChoose.inspectType"},
	{xtype:"hidden",name:"inspectSelfChoose.inspectSelfChooseDetails"}
	];
var InspectSelfChooseDetailFieldMapping = [
	{name:"inspectSelfChooseDetail.detailId",mapping:"detailId"},
	{name:"inspectSelfChooseDetail.chooseId",mapping:"chooseId"},
	{name:"inspectSelfChooseDetail.inspectType",mapping:"inspectType"},
	{name:"inspectSelfChooseDetail.inspectTypeName",mapping:"inspectTypeName"},
	{name:"inspectSelfChooseDetail.detailContent",mapping:"detailContent"},
	{name:"inspectSelfChooseDetail.inspectSelfChoose.chooseId",mapping:"inspectSelfInit.chooseId"},
	{name:"inspectSelfChooseDetail.inspectSelfChoose.initId",mapping:"inspectSelfInit.initId"},
	{name:"inspectSelfChooseDetail.inspectSelfChoose.inspectType",mapping:"inspectSelfInit.inspectType"},
	{name:"inspectSelfChooseDetail.inspectSelfChoose.inspectTypeName",mapping:"inspectSelfInit.inspectTypeName"},
	{name:"inspectSelfChooseDetail.inspectSelfChoose.inspectItem",mapping:"inspectSelfInit.inspectItem"},
	];
var InspectSelfChooseDetailHiddenField = [                            
	{xtype:"hidden",name:"inspectSelfChooseDetail.detailId"},
	{xtype:"hidden",name:"inspectSelfChooseDetail.chooseId"},
	{xtype:"hidden",name:"inspectSelfChooseDetail.inspectType"},
	{xtype:"hidden",name:"inspectSelfChooseDetail.inspectSelfInit.chooseId"},
	{xtype:"hidden",name:"inspectSelfChooseDetail.inspectSelfInit.initId"},
	{xtype:"hidden",name:"inspectSelfChooseDetail.inspectSelfInit.inspectType"}
	];

var PractiDispatchListViewField = ["dispatchId","dispatchSerial","practiId","practitioner",
	"projectNameHis","projectName","kindWorkNameHis","kindWorkName","teamsHis","teams",
	"discloseState","discloseStateName","remark","applyforState","applyforStateName","userName","createTime"];
var PractiDispatchFieldMapping = [
	{name:"practiDispatch.dispatchId",mapping:"dispatchId"},
	{name:"practiDispatch.dispatchSerial",mapping:"dispatchSerial"},
	{name:"practiDispatch.practiId",mapping:"practiId"},
	{name:"practiDispatch.practitioner.practiName",mapping:"practitioner.practiName"},
	{name:"practiDispatch.practitioner.corpInfo.corpName",mapping:"practitioner.corpInfo.corpName"},
	{name:"practiDispatch.practitioner.department.depName",mapping:"practitioner.department.depName"},
	{name:"practiDispatch.practitioner.mobile",mapping:"practitioner.mobile"},
	{name:"practiDispatch.teamsHis",mapping:"teamsHis"},
	{name:"practiDispatch.teams",mapping:"teams"},
	{name:"practiDispatch.projectIdHis",mapping:"projectIdHis"},
	{name:"practiDispatch.projectNameHis",mapping:"projectNameHis"},
	{name:"practiDispatch.projectId",mapping:"projectId"},
	{name:"practiDispatch.projectName",mapping:"projectName"},
	{name:"practiDispatch.kindWorkHis",mapping:"kindWorkHis"},
	{name:"practiDispatch.kindWorkNameHis",mapping:"kindWorkNameHis"},
	{name:"practiDispatch.kindWork",mapping:"kindWork"},
	{name:"practiDispatch.kindWorkName",mapping:"kindWorkName"},
	{name:"practiDispatch.userId",mapping:"userId"},
	{name:"practiDispatch.userName",mapping:"userName"},
	{name:"practiDispatch.discloseState",mapping:"discloseState"},
	{name:"practiDispatch.discloseStateName",mapping:"discloseStateName"},
	{name:"practiDispatch.remark",mapping:"remark"},
	{name:"practiDispatch.applyforState",mapping:"applyforState"},
	{name:"practiDispatch.applyforStateName",mapping:"applyforStateName"}
	];
var PractiDispatchHiddenField = [                            
	{xtype:"hidden",name:"practiDispatch.dispatchId"},
	{xtype:"hidden",name:"practiDispatch.practiId"},
	{xtype:"hidden",name:"practiDispatch.projectIdHis"},
	{xtype:"hidden",name:"practiDispatch.projectId"},
	{xtype:"hidden",name:"practiDispatch.kindWorkHis"},
	{xtype:"hidden",name:"practiDispatch.kindWork"},
	{xtype:"hidden",name:"practiDispatch.userId"},
	{xtype:"hidden",name:"practiDispatch.discloseState"},
	{xtype:"hidden",name:"practiDispatch.applyforState"}
];

//===========================================================================//
var PractiInsuranceFieldMapping = [
	{name:"practiInsurance.insureId",mapping:"insureId"},
	{name:"practiInsurance.insureSerial",mapping:"insureSerial"},
	{name:"practiInsurance.startInsureDate",mapping:"startInsureDate"},
    {name:"practiInsurance.endInsureDate",mapping:"endInsureDate"},
    {name:"practiInsurance.totalPremium",mapping:"totalPremium"},
    {name:"practiInsurance.effective",mapping:"effective"},
    {name:"practiInsurance.effectiveName",mapping:"effectiveName"},
    {name:"practiInsurance.insuranceCompany",mapping:"insuranceCompany"},
    {name:"practiInsurance.claimPhone",mapping:"claimPhone"},
    {name:"practiInsurance.linkman",mapping:"linkman"},
    {name:"practiInsurance.linkmanPhone",mapping:"linkmanPhone"},
    {name:"practiInsurance.practiNum",mapping:"practiNum"},
    {name:"practiInsurance.practiMaxNum",mapping:"practiMaxNum"},
    {name:"practiInsurance.practiAmount",mapping:"practiAmount"},
    {name:"practiInsurance.remark",mapping:"remark"},
    {name:"practiInsurance.delFlag",mapping:"delFlag"},
    {name:"practiInsurance.projectName",mapping:"projectName"},
	{name:"practiInsurance.userId",mapping:"userId"},
	{name:"practiInsurance.userName",mapping:"userName"},
	{name:"practiInsurance.providedDate",mapping:"providedDate"},
	{name:"practiInsurance.insuranceType",mapping:"insuranceType"},
	{name:"practiInsurance.insuranceTypeName",mapping:"insuranceTypeName"},
	{name:"practiInsurance.department.depId",mapping:"department.depId"},
	{name:"practiInsurance.department.depName",mapping:"department.depName"},
	{name:"practiInsurance.corpId",mapping:"corpId"},
	{name:"practiInsurance.corpName",mapping:"corpName"},
	{name:"practiInsurance.claims",mapping:"claims"},
	{name:"practiInsurance.claimAmount",mapping:"claimAmount"},
	{name:"practiInsurance.claimiPhone",mapping:"claimiPhone"},
	{name:"practiInsurance.practiFull",mapping:"practiFull"},
	{name:"practiInsurance.practiInsuranceDetails",mapping:"practiInsuranceDetails"}

  ];
var PractiInsuranceHiddenField = [                            
	{xtype:"hidden",name:"practiInsurance.insureId"},
	{xtype:"hidden",name:"practiInsurance.corpId"},
	{xtype:"hidden",name:"practiInsurance.practiInsuranceDetails"},
	{xtype:"hidden",name:"practiInsurance.userId"},
	{xtype:"hidden",name:"practiInsurance.department.depId"}
  ];
var PractiInsuranceListViewField = [ "insureId","insureSerial","startInsureDate","endInsureDate","totalPremium","insuranceCompany","claimPhone","linkman","practiNum",
                  "remark","delFlag","effective","effectiveName","claims","corpName","practiMaxNum","claimAmount","claimiPhone","practiAmount"];
var PractiInsuranceDetailListViewField = [ "detailId","insureId","practiId","practiInsurance","practitioner","kindWork","kindWorkName","premium","contractId","contractNo","projectId","projectName","address","remark","acculmatedpremium","acculmatedclaim","startInsureDate","defaultFlag","delFlag"];
var PractiInsuranceClaimRecordListViewField = [ "claimId","insureId","insureSerial" ,"bankDeposit" ,"depositAccount" ,"claimPhone","claimDate" ,"costAmount" ,"claimAmount" ,"claimReason" ,"practiId" ,"practitioner","contractId","projectId","projectName","remark","delFlag" ];
var PractiInsuranceSouthViewField = ["contractId","insureId","applyforState","applyforStateName","contractNo","projectName","signingTime","contractAmount","equipCount","paEntName","pbEntName"];
var PractiInsuranceDetailFormField = ["practiId","practiName","corpName","projectId","projectName","incumbent","idCard","depName","teams","insureStatusName","sex","station","allPremium","allClaimAmount"];
var PractiInsureClaimRecordGridField = ["claimId","insureSerial","insuranceCompany","insuranceTypeName","practiName","sexName","idCard","projectId","projectName","bankDeposit","depositAccount","claimPhone","claimDate","costAmount","claimAmount",
                                        "claimReason","corpName","kindWorkName","claimPhone","linkman","linkmanPhone"];
var PractiInsureRecordGridField = ["detailId","startInsureDate","endInsureDate","insureSerial","insuranceTypeName","premium","insuranceCompany","linkman","claimPhone","remark","corpName","kindWorkName","claimPhone","linkmanPhone"];
var PractiInsuranceClaimRecordFieldMapping = [
	{name:"practiInsuranceClaimRecord.insureId",mapping:"insureId"},
	{name:"practiInsuranceClaimRecord.insureSerial",mapping:"insureSerial"},
	{name:"practiInsuranceClaimRecord.bankDeposit",mapping:"bankDeposit"},
	{name:"practiInsuranceClaimRecord.depositAccount",mapping:"depositAccount"},
	{name:"practiInsuranceClaimRecord.claimDate",mapping:"claimDate"},
	{name:"practiInsuranceClaimRecord.costAmount",mapping:"costAmount"},
	{name:"practiInsuranceClaimRecord.claimAmount",mapping:"claimAmount"},
	{name:"practiInsuranceClaimRecord.claimReason",mapping:"claimReason"},
	{name:"practiInsuranceClaimRecord.practiId",mapping:"practiId"},
	{name:"practiInsuranceClaimRecord.contractId",mapping:"contractId"},
	{name:"practiInsuranceClaimRecord.claimId",mapping:"claimId"},
	{name:"practiInsuranceClaimRecord.projectId",mapping:"projectId"},
	{name:"practiInsuranceClaimRecord.projectName",mapping:"projectName"},
	{name:"practiInsuranceClaimRecord.practiName",mapping:"practiName"},
	{name:"practiInsuranceClaimRecord.sexName",mapping:"sexName"},
	{name:"practiInsuranceClaimRecord.idCard",mapping:"idCard"},
	{name:"practiInsuranceClaimRecord.depName",mapping:"depName"},
	{name:"practiInsuranceClaimRecord.projectName",mapping:"projectName"},
	{name:"practiInsuranceClaimRecord.corpName",mapping:"corpName"},
	{name:"practiInsuranceClaimRecord.insuranceCompany",mapping:"insuranceCompany"},
	{name:"practiInsuranceClaimRecord.insuranceTypeName",mapping:"insuranceTypeName"},
	{name:"practiInsuranceClaimRecord.startInsureDate",mapping:"startInsureDate"},
	{name:"practiInsuranceClaimRecord.linkMan",mapping:"linkMan"},
	{name:"practiInsuranceClaimRecord.linkmanPhone",mapping:"linkmanPhone"},
	{name:"practiInsuranceClaimRecord.endInsureDate",mapping:"endInsureDate"},
	{name:"practiInsuranceClaimRecord.claimPhone",mapping:"claimPhone"}
];
//===========================================================================//
var SafeClarificationFieldMapping = [
	{name:"safeClarification.clarificaId",mapping:"clarificaId"},
	{name:"safeClarification.clarificaSerial",mapping:"clarificaSerial"},
	{name:"safeClarification.projectId",mapping:"projectId"},
    {name:"safeClarification.projectName",mapping:"projectName"},
    {name:"safeClarification.address",mapping:"address"},
    {name:"safeClarification.copeId",mapping:"copeId"},
    {name:"safeClarification.copeName",mapping:"copeName"},
    {name:"safeClarification.clarificaManId",mapping:"clarificaManId"},
    {name:"safeClarification.clarificaMan",mapping:"clarificaMan"},
    {name:"safeClarification.remark",mapping:"remark"},
    {name:"safeClarification.clarificaImage",mapping:"clarificaImage"},
    {name:"safeClarification.clarificaTime",mapping:"clarificaTime"},
    {name:"safeClarification.clarificaHeadId",mapping:"clarificaHeadId"},
    {name:"safeClarification.clarificaHead",mapping:"clarificaHead"},
    {name:"safeClarification.userId",mapping:"userId"},
    {name:"safeClarification.delFlag",mapping:"delFlag"}
  ];
var SafeClarificationHiddenField = [                            
	{xtype:"hidden",name:"safeClarification.clarificaId"},
	{xtype:"hidden",name:"safeClarification.projectId"},
	{xtype:"hidden",name:"safeClarification.copeId"},
	{xtype:"hidden",name:"safeClarification.clarificaManId"},
	{xtype:"hidden",name:"safeClarification.clarificaHeadId"},
  ];
var SafeClarificationListViewField = [ "clarificaId","clarificaSerial","projectId","projectName","address","copeId","copeName","clarificaManId","clarificaMan","remark","clarificaImage","clarificaTime","delFlag","clarificaHeadId","clarificaHead","userId"];
//===========================================================================//
var SafetyEducationFieldMapping = [
	{name:"safetyEducation.safetyId",mapping:"safetyId"},
	{name:"safetyEducation.safetySerial",mapping:"safetySerial"},
	{name:"safetyEducation.safetyDetail",mapping:"safetyDetail"},
    {name:"safetyEducation.teachManId",mapping:"teachManId"},
    {name:"safetyEducation.teachMan",mapping:"teachMan"},
    {name:"safetyEducation.educaManId",mapping:"educaManId"},
    {name:"safetyEducation.educaMan",mapping:"educaMan"},
    {name:"safetyEducation.edcationImage",mapping:"edcationImage"},
    {name:"safetyEducation.edcationTime",mapping:"edcationTime"},
    {name:"safetyEducation.remark",mapping:"remark"},
    {name:"safetyEducation.userId",mapping:"userId"},
    {name:"safetyEducation.delFlag",mapping:"delFlag"}
  ];
var SafetyEducationHiddenField = [                            
	{xtype:"hidden",name:"safetyEducation.safetyId"},
	{xtype:"hidden",name:"safetyEducation.teachManId"},
	{xtype:"hidden",name:"safetyEducation.educaManId"},
  ];
var SafetyEducationListViewField = [ "safetyId","safetySerial","safetyDetail","safetyDetail","teachManId","teachMan","educaManId","educaMan","edcationImage","edcationTime","remark","delFlag","userId"];
//===========================================================================//
var PractiEvaluationFieldMapping = [
	{name:"practiEvaluation.evaluaId",mapping:"evaluaId"},
	{name:"practiEvaluation.evaluaSerial",mapping:"evaluaSerial"},
	{name:"practiEvaluation.evaluaDate",mapping:"evaluaDate"},
	{name:"practiEvaluation.evaluaMan",mapping:"evaluaMan"},
	{name:"practiEvaluation.evaluaManId",mapping:"evaluaManId"},
	{name:"practiEvaluation.acceptMan",mapping:"acceptMan"},
	{name:"practiEvaluation.acceptManId",mapping:"acceptManId"},
	{name:"practiEvaluation.evaluaStar",mapping:"evaluaStar"},
	{name:"practiEvaluation.evaluaContent",mapping:"evaluaContent"},
	{name:"practiEvaluation.delFlag",mapping:"delFlag"}
];
var PractiEvaluationHiddenField = [
	{xtype:"hidden",name:"practiEvaluation.evaluaId"},
	{xtype:"hidden",name:"practiEvaluation.evaluaManId"},
	{xtype:"hidden",name:"practiEvaluation.acceptManId"}
];

var PractiEvaluationListViewField = [ "evaluaId","evaluaSerial","evaluaDate","evaluaMan","evaluaManId","acceptMan","acceptManId","evaluaStar","evaluaContent","delFlag"];

var PractiLeaveListViewField = ["leaveId","leaveTime","remark","userName","effective","createTime","effectiveName","practiId","practitioner"];
var PractiLeaveFieldMapping = [
	{name:"practiLeave.leaveId",mapping:"leaveId"},
	{name:"practiLeave.leaveTime",mapping:"leaveTime"},
	{name:"practiLeave.remark",mapping:"remark"},
	{name:"practiLeave.userId",mapping:"userId"},
	{name:"practiLeave.userName",mapping:"userName"},
	{name:"practiLeave.createTime",mapping:"createTime"},
	{name:"practiLeave.effective",mapping:"effective"},
	{name:"practiLeave.effectiveName",mapping:"effectiveName"},
	{name:"practiLeave.practiId",mapping:"practiId"},
	{name:"practiLeave.practitioner.practiId",mapping:"practitioner.practiId"},
	{name:"practiLeave.practitioner.practiName",mapping:"practitioner.practiName"},
	{name:"practiLeave.practitioner.corpInfo.corpName",mapping:"practitioner.corpInfo.corpName"},
	{name:"practiLeave.practitioner.department.depName",mapping:"practitioner.department.depName"},
	{name:"practiLeave.practitioner.mobile",mapping:"practitioner.mobile"},
	{name:"practiLeave.practitioner.kindWorkName",mapping:"practitioner.kindWorkName"}
	
];
var PractiLeaveHiddenField = [
	{xtype:"hidden",name:"practiLeave.leaveId"},
	{xtype:"hidden",name:"practiLeave.userId"},
	{xtype:"hidden",name:"practiLeave.effective"}
];var PractiLeaveListViewField = ["leaveId","leaveTime","remark","userName","effective","createTime","effectiveName","practiId","practitioner"];
var PractiLeaveFieldMapping = [
	{name:"practiLeave.leaveId",mapping:"leaveId"},
	{name:"practiLeave.leaveTime",mapping:"leaveTime"},
	{name:"practiLeave.remark",mapping:"remark"},
	{name:"practiLeave.userId",mapping:"userId"},
	{name:"practiLeave.userName",mapping:"userName"},
	{name:"practiLeave.createTime",mapping:"createTime"},
	{name:"practiLeave.effective",mapping:"effective"},
	{name:"practiLeave.effectiveName",mapping:"effectiveName"},
	{name:"practiLeave.practiId",mapping:"practiId"},
	{name:"practiLeave.practitioner.practiId",mapping:"practitioner.practiId"},
	{name:"practiLeave.practitioner.practiName",mapping:"practitioner.practiName"},
	{name:"practiLeave.practitioner.corpInfo.corpName",mapping:"practitioner.corpInfo.corpName"},
	{name:"practiLeave.practitioner.department.depName",mapping:"practitioner.department.depName"},
	{name:"practiLeave.practitioner.mobile",mapping:"practitioner.mobile"},
	{name:"practiLeave.practitioner.kindWorkName",mapping:"practitioner.kindWorkName"}
	
];
var PractiLeaveHiddenField = [
	{xtype:"hidden",name:"practiLeave.leaveId"},
	{xtype:"hidden",name:"practiLeave.userId"},
	{xtype:"hidden",name:"practiLeave.effective"}
];
//===========================================================================//
var InspectProjectRecordFieldMapping = [
	{name:"inspectProjectRecord.inprojectId",mapping:"inprojectId"},
	{name:"inspectProjectRecord.inprojectSerial",mapping:"inprojectSerial"},
	{name:"inspectProjectRecord.inprojectDate",mapping:"inprojectDate"},
	{name:"inspectProjectRecord.inprojectItem",mapping:"inprojectItem"},
	{name:"inspectProjectRecord.inprojectType",mapping:"inprojectType"},
	{name:"inspectProjectRecord.inprojectTypeName",mapping:"inprojectTypeName"},
	{name:"inspectProjectRecord.inprojectImage",mapping:"inprojectImage"},
	{name:"inspectProjectRecord.inprojectState",mapping:"inprojectState"},
	{name:"inspectProjectRecord.delFlag",mapping:"delFlag"},
	{name:"inspectProjectRecord.attendamce",mapping:"attendamce"},
	{name:"inspectProjectRecord.attendamce.aid",mapping:"attendamce.aid"},
	{name:"inspectProjectRecord.attendamce.equipment.equipSerial",mapping:"attendamce.equipment.equipSerial"},
	{name:"inspectProjectRecord.attendamce.project.projectName",mapping:"attendamce.project.projectName"},
];
var InspectProjectRecordHiddenField = [
	{xtype:"hidden",name:"inspectProjectRecord.inprojectId"},
	{xtype:"hidden",name:"inspectProjectRecord.attendamce.aid"}
];

var InspectProjectRecordListViewField = [ "inprojectId","inprojectSerial","inprojectDate","inprojectItem","inprojectType","inprojectTypeName","inprojectState",
                                          "delFlag","attendamce","inprojectImageList"];
//===========================================================================//
var LaborPayFieldMapping = [
	{name:"laborPay.laborPayId",mapping:"laborPayId"},
	{name:"laborPay.laborPaySerial",mapping:"laborPaySerial"},
	{name:"laborPay.contractNo",mapping:"contractNo"},
	{name:"laborPay.paEnt",mapping:"paEnt"},
	{name:"laborPay.paEntName",mapping:"paEntName"},
	{name:"laborPay.startSettleDate",mapping:"startSettleDate"},
	{name:"laborPay.endSettleDate",mapping:"endSettleDate"},
	{name:"laborPay.equipId",mapping:"equipId"},
	{name:"laborPay.laborSettId",mapping:"laborSettId"},
	{name:"laborPay.rate",mapping:"rate"},
	{name:"laborPay.createDate",mapping:"createDate"},
	{name:"laborPay.periodPayDate",mapping:"periodPayDate"},
	{name:"laborPay.endPayDate",mapping:"endPayDate"},
	{name:"laborPay.copeAmount",mapping:"copeAmount"},
	{name:"laborPay.payState",mapping:"payState"},
	{name:"laborPay.payStateName",mapping:"payStateName"},
	{name:"laborPay.paidAmount",mapping:"paidAmount"},
	{name:"laborPay.pendingAmount",mapping:"pendingAmount"},
	{name:"laborPay.laborSettle",mapping:"laborSettle"},
	{name:"laborPay.laborSettle.leaseProjectHead",mapping:"laborSettle.leaseProjectHead"},
	{name:"laborPay.equipment",mapping:"equipment"},
	{name:"laborPay.equipment.equipGenericName",mapping:"equipment.equipGenericName"},
	{name:"laborPay.equipment.equipSpecificName",mapping:"equipment.equipSpecificName"},
	{name:"laborPay.equipment.equipSerial",mapping:"equipment.equipSerial"}
];
var LaborPayHiddenField = [
	{xtype:"hidden",name:"laborPay.laborPayId"},
	{xtype:"hidden",name:"laborPay.paEnt"}
];
var LaborPayListViewField = ["laborPayId","laborPaySerial","contractNo","paEntName","startSettleDate","endSettleDate","equipId","laborSettId","createDate","periodPayDate","endPayDate","copeAmount",
                             "payStateName","paidAmount","pendingAmount"];

var LaborPayDetailListViewField = ["detailId","laborPayId","detailSerial","payDate","receivableAmount","copeAmount","paidAmount","issueAmount","pendingAmount","balanceAmount"];


var LaborSettleFieldMapping = [
	{name:"laborSettle.laborSettId",mapping:"laborSettId"},
	{name:"laborSettle.laborSettSerial",mapping:"laborSettSerial"},
	{name:"laborSettle.settleId",mapping:"settleId"},
	{name:"laborSettle.applyforState",mapping:"applyforState"},
	{name:"laborSettle.applyforStateName",mapping:"applyforStateName"},
	{name:"laborSettle.payState",mapping:"payState"},
	{name:"laborSettle.payStateName",mapping:"payStateName"},
	{name:"laborSettle.userId",mapping:"userId"},
	{name:"laborSettle.userName",mapping:"userName"},
	{name:"laborSettle.contractNo",mapping:"contractNo"},
	{name:"laborSettle.paEnt",mapping:"paEnt"},
	{name:"laborSettle.paEntName",mapping:"paEntName"},
	{name:"laborSettle.pbEnt",mapping:"pbEnt"},
	{name:"laborSettle.pbEntName",mapping:"pbEntName"},
	{name:"laborSettle.startSettleDate",mapping:"startSettleDate"},
	{name:"laborSettle.endSettleDate",mapping:"endSettleDate"},
	{name:"laborSettle.leaseProjectHead",mapping:"leaseProjectHead"},
	{name:"laborSettle.costTotal",mapping:"costTotal"},
	{name:"laborSettle.afterTaxAmount",mapping:"afterTaxAmount"},
	{name:"laborSettle.createDate",mapping:"createDate"},
	{name:"laborSettle.practiType",mapping:"practiType"},
	{name:"laborSettle.practiTypeName",mapping:"practiTypeName"},
	{name:"laborSettle.deductions",mapping:"deductions"},
	{name:"laborSettle.laborFree",mapping:"laborFree"},
	{name:"laborSettle.statementId",mapping:"statementId"},
	{name:"laborSettle.equipId",mapping:"equipId"},
	{name:"laborSettle.settleLogo",mapping:"settleLogo"},
	{name:"laborSettle.department.depId",mapping:"department.depId"},
	{name:"laborSettle.department.depName",mapping:"department.depName"},
	{name:"laborSettle.settleContract.laborSettSerial",mapping:"settleContract.laborSettSerial"},
	{name:"laborSettle.settleContract.summaryReceivable",mapping:"settleContract.summaryReceivable"},
	{name:"laborSettle.settleContract.fundCategoryName",mapping:"settleContract.fundCategoryName"},
	{name:"laborSettle.settleContract.settleTheme",mapping:"settleContract.settleTheme"},
	{name:"laborSettle.settleContract.summaryReceived",mapping:"settleContract.summaryReceived"},
	{name:"laborSettle.settleContract.fundTypeName",mapping:"settleContract.fundTypeName"},
	{name:"laborSettle.settleContract.arrears",mapping:"settleContract.arrears"},
	{name:"laborSettle.settleContract.contractTheme",mapping:"settleContract.contractTheme"},
	{name:"laborSettle.settleContract.finishedAmount",mapping:"settleContract.finishedAmount"},
	{name:"laborSettle.settleContract.projectSerial",mapping:"settleContract.projectSerial"},
	{name:"laborSettle.settleContract.arrearsAmount",mapping:"settleContract.arrearsAmount"},
	{name:"laborSettle.settleContract.taxRate",mapping:"settleContract.taxRate"},
];
var LaborSettleHiddenField = [
	{xtype:"hidden",name:"laborSettle.laborSettId"},
	{xtype:"hidden",name:"laborSettle.paEnt"},
	{xtype:"hidden",name:"laborSettle.pbEnt"},
];
var LaborSettleListViewField = ["laborSettId","contractNo","paEntName","projectName","startSettleDate","endSettleDate","leaseProjectHead","costTotal","afterTaxAmount","createDate","applyforStateName","applyforState",
                         "payStateName","payState","paidAmount"];

var ContractLeaseVersionFieldMapping = [
	{name:"contractLeaseVersion.leaseVersionId",mapping:"leaseVersionId"},
	{name:"contractLeaseVersion.leaseSerial",mapping:"leaseSerial"},
	{name:"contractLeaseVersion.saveTime",mapping:"saveTime"},
	{name:"contractLeaseVersionVersion.saveUserId",mapping:"saveUserId"},
	{name:"contractLeaseVersion.saveUserName",mapping:"saveUserName"},
	{name:"contractLeaseVersion.contractId",mapping:"contractId"},
	{name:"contractLeaseVersion.collectionRatio",mapping:"collectionRatio"},
	{name:"contractLeaseVersion.contractSerial",mapping:"contractSerial"},
	{name:"contractLeaseVersion.contractTheme",mapping:"contractTheme"},
	{name:"contractLeaseVersion.contractCategory",mapping:"contractCategory"},
	{name:"contractLeaseVersion.contractCategoryName",mapping:"contractCategoryName"},
	{name:"contractLeaseVersion.fundType",mapping:"fundType"},
	{name:"contractLeaseVersion.subcontract",mapping:"subcontract"},
	{name:"contractLeaseVersion.paEnt",mapping:"paEnt"},
	{name:"contractLeaseVersion.paModule",mapping:"paModule"},
	{name:"contractLeaseVersion.paEntName",mapping:"paEntName"},
	{name:"contractLeaseVersion.paEntLinkMan",mapping:"paEntLinkMan"},
	{name:"contractLeaseVersion.paEntLinkTel",mapping:"paEntLinkTel"},
	{name:"contractLeaseVersion.pbEnt",mapping:"pbEnt"},
	{name:"contractLeaseVersion.pbModule",mapping:"pbModule"},
	{name:"contractLeaseVersion.pbEntName",mapping:"pbEntName"},
	{name:"contractLeaseVersion.pbEntLinkMan",mapping:"pbEntLinkMan"},
	{name:"contractLeaseVersion.pbEntLinkTel",mapping:"pbEntLinkTel"},
	{name:"contractLeaseVersion.enterpriseSerial",mapping:"enterpriseSerial"},
	{name:"contractLeaseVersion.overallHeight",mapping:"overallHeight"},
	{name:"contractLeaseVersion.buildingQuantity",mapping:"buildingQuantity"},
	{name:"contractLeaseVersion.cover",mapping:"cover"},
	{name:"contractLeaseVersion.salesmanId",mapping:"salesmanId"},
	{name:"contractLeaseVersion.salesman",mapping:"salesman"},
	{name:"contractLeaseVersion.salesmanTel",mapping:"salesmanTel"},
	{name:"contractLeaseVersion.projectId",mapping:"projectId"},
	{name:"contractLeaseVersion.projectSerial",mapping:"projectSerial"},
	{name:"contractLeaseVersion.projectName",mapping:"projectName"},
	{name:"contractLeaseVersion.address",mapping:"address"},
	{name:"contractLeaseVersion.signingTime",mapping:"signingTime"},
	{name:"contractLeaseVersion.contractAmount",mapping:"contractAmount"},
	{name:"contractLeaseVersion.segmentQty",mapping:"segmentQty"},
	{name:"contractLeaseVersion.wallAttacheQty",mapping:"wallAttacheQty"},
	{name:"contractLeaseVersion.debitReceivable",mapping:"debitReceivable"},
	{name:"contractLeaseVersion.deduct",mapping:"deduct"},
	{name:"contractLeaseVersion.deductDesc",mapping:"deductDesc"},
	{name:"contractLeaseVersion.remark",mapping:"remark"},
	{name:"contractLeaseVersion.squareUpDate",mapping:"squareUpDate"},
	{name:"contractLeaseVersion.contents",mapping:"contents"},
	{name:"contractLeaseVersion.applyforState",mapping:"applyforState"},
	{name:"contractLeaseVersion.applyforStateName",mapping:"applyforStateName"},
	{name:"contractLeaseVersion.equipCount",mapping:"equipCount"},
	{name:"contractLeaseVersion.practiCount",mapping:"practiCount"},
	{name:"contractLeaseVersion.delFlag",mapping:"delFlag"},
	{name:"contractLeaseVersion.fillContent",mapping:"fillContent"},
	{name:"contractLeaseVersion.userId",mapping:"userId"},
	{name:"contractLeaseVersion.userName",mapping:"userName"},
	{name:"contractLeaseVersion.depId",mapping:"depId"},
	{name:"contractLeaseVersion.sigingTime",mapping:"sigingTime"},
	{name:"contractLeaseVersion.department.depId",mapping:"department.depId"},
	{name:"contractLeaseVersion.department.depName",mapping:"department.depName"},
	{name:"contractLeaseVersion.quantity",mapping:"quantity"},
	{name:"contractLeaseVersion.assetsProperty",mapping:"assetsProperty"},
	{name:"contractLeaseVersion.assetsPropertyName",mapping:"assetsPropertyName"},
	{name:"contractLeaseVersion.buildingArea",mapping:"buildingArea"},
	{name:"contractLeaseVersion.contractNo",mapping:"contractNo"},
	{name:"contractLeaseVersion.competentDepartment",mapping:"competentDepartment"},
	{name:"contractLeaseVersion.competentDepartmentId",mapping:"competentDepartmentId"},
	{name:"contractLeaseVersion.taxMode",mapping:"taxMode"},
	{name:"contractLeaseVersion.applicableTaxRate",mapping:"applicableTaxRate"},
	{name:"contractLeaseVersion.signedArea",mapping:"signedArea"},
	{name:"contractLeaseVersion.arrangeId",mapping:"arrangeId"},
	{name:"contractLeaseVersion.belongToArea",mapping:"belongToArea"},
	{name:"contractLeaseVersion.contractType",mapping:"contractType"},
	{name:"contractLeaseVersion.contractTypeName",mapping:"contractTypeName"},
	{name:"contractLeaseVersion.cooperationWay",mapping:"cooperationWay"},
	{name:"contractLeaseVersion.cooperationWayName",mapping:"cooperationWayName"},
	{name:"contractLeaseVersion.billUnitId",mapping:"billUnitId"},
	{name:"contractLeaseVersion.billUnitName",mapping:"billUnitName"},
	{name:"contractLeaseVersion.invoiceType",mapping:"invoiceType"},
	{name:"contractLeaseVersion.invoiceTypeName",mapping:"invoiceTypeName"},
	{name:"contractLeaseVersion.materialPractiName",mapping:"materialPractiName"}
];
var ContractLeaseVersionHiddenField = [
	{xtype:"hidden",name:"contractLeaseVersion.leaseVersionId"},
	{xtype:"hidden",name:"contractLeaseVersion.arrangeId"},
	{xtype:"hidden",name:"contractLeaseVersion.contractId"},
	{xtype:"hidden",name:"contractLeaseVersion.fundType"},
	{xtype:"hidden",name:"contractLeaseVersion.subcontract"},
	{xtype:"hidden",name:"contractLeaseVersion.paEnt"},
	{xtype:"hidden",name:"contractLeaseVersion.paModule"},
	{xtype:"hidden",name:"contractLeaseVersion.pbEnt"},
	{xtype:"hidden",name:"contractLeaseVersion.pbModule"},
	{xtype:"hidden",name:"contractLeaseVersion.salesmanId"},
	{xtype:"hidden",name:"contractLeaseVersion.projectId"},
	{xtype:"hidden",name:"contractLeaseVersion.userId"},
	{xtype:"hidden",name:"contractLeaseVersion.department.depId"},
	{xtype:"hidden",name:"contractLeaseVersion.contractEquipVersions"},
	{xtype:"hidden",name:"contractLeaseVersion.contractEquipBriefVersions"},
	{xtype:"hidden",name:"contractLeaseVersion.contractEquipOutlayVersions"},
	{xtype:"hidden",name:"contractLeaseVersion.contractEquipCostVersions"},
	{xtype:"hidden",name:"contractLeaseVersion.contractPractiBriefVersions"},
	{xtype:"hidden",name:"contractLeaseVersion.installPriceSetVersions"},
	{xtype:"hidden",name:"contractLeaseVersion.truckCranePriceSetVersions"},
	{xtype:"hidden",name:"contractLeaseVersion.contractCostitemVersions"},
	{xtype:"hidden",name:"contractLeaseVersion.safetyMonitorSettleListVersions"},
	{xtype:"hidden",name:"contractLeaseVersion.belongToArea"},
	{xtype:"hidden",name:"contractLeaseVersion.billUnitId"},
	{xtype:"hidden",name:"contractLeaseVersion.contractInoutFreeVersions"},
	{xtype:"hidden",name:"contractLeaseVersion.contractOperatorFreeVersions"}
];
var ContractEquipBriefVersionListViewField = ["briefVersionId", "leaseVersionId", "ceBriefId", "contractId", "equipCategory", "equipCategoryName","equipSpecific", "equipSpecificName", "unit", "startDate", "endDate", "initialHeight", "finalHeight", "quantity", "rentStandard", "measurement", "tenancy","equipGeneric","dispatchable" ];
var ContractInoutFreeVersionListViewField = [ "inoutVersionId", "leaseVersionId", "inoutId", "contractId", "equipGenericName", "equipSpecificName", "rent", "rentUnit","dispatchable"];
var SafetyMonitorSettleVersionListViewField = ["safetyVersionId", "leaseVersionId", "settleId","daysRent","statementId","equipId","buildingNum","equipCategoryName","equipSpecificName","equipSerial","startSettleDate","endSettleDate","rentStandard","rentUnit","daysRent","equipGenericName","dispatchable"];
var ContractOperatorFreeVersionListViewField = [ "operatorVersionId", "leaseVersionId", "operatorId", "contractId", "equipGenericName", "equipSpecificName", "rent", "rentUnit","dispatchable"];

var DepotTransfersFieldMapping = [
  {name:"depotTransfers.depottId",mapping:"depottId"},
  {name:"depotTransfers.applyforState",mapping:"applyforState"},
  {name:"depotTransfers.applyforStateName",mapping:"applyforStateName"},
  {name:"depotTransfers.transfersNum",mapping:"transfersNum"},
  {name:"depotTransfers.userId",mapping:"userId"},
  {name:"depotTransfers.userName",mapping:"userName"},
  {name:"depotTransfers.inputDate",mapping:"inputDate"},
  {name:"depotTransfers.transfersTheme",mapping:"transfersTheme"},
  {name:"depotTransfers.transfersDate",mapping:"transfersDate"},
  {name:"depotTransfers.outDepotId",mapping:"outDepotId"},
  {name:"depotTransfers.outDepotName",mapping:"outDepotName"},
  {name:"depotTransfers.inDepotId",mapping:"inDepotId"},
  {name:"depotTransfers.inDepotName",mapping:"inDepotName"},
  {name:"depotTransfers.vehicleNum",mapping:"vehicleNum"},
  {name:"depotTransfers.vehiclePerson",mapping:"vehiclePerson"},
  {name:"depotTransfers.outDepotPerson",mapping:"outDepotPerson"},
  {name:"depotTransfers.outPersonId",mapping:"outPersonId"},
  {name:"depotTransfers.inDepotPerson",mapping:"inDepotPerson"},
  {name:"depotTransfers.inPersonId",mapping:"inPersonId"},
  {name:"depotTransfers.delFlag",mapping:"delFlag"},
  {name:"depotTransfers.department.depId",mapping:"department.depId"}

];
   //var AllocationDepotListViewField=["allocationId","applyforState","applyforStateName","allocationSerial","allocationTheme","userName","allocationDate","allocationTypeName","outDepotName","inDepotName","inProjectName","inDepotId","outDepotId","chargeMan"];
   var DepotTransfersListViewField=["depottId","applyforState","applyforStateName","transfersNum","userId","userName","inputDate",
                     "transfersTheme","transfersDate","outDepotName","outDepotId","inDepotId","inDepotName","vehicleNum","vehiclePerson","outDepotPerson","outDepotPerson","outPersonId","inDepotPerson","inPersonId"];

   var DepotTransfersHiddenField=[
       {xtype:"hidden",name:"depotTransfers.depottId"},
   {xtype:"hidden",name:"depotTransfers.inDepotId"},
   {xtype:"hidden",name:"depotTransfers.outDepotId"},
   {xtype:"hidden",name:"depotTransfers.outPersonId"},
   {xtype:"hidden",name:"depotTransfers.inPersonId"},
   {xtype:"hidden",name:"depotTransfers.userId"},
   {xtype:"hidden",name:"depotTransfers.transfersDetails"},
   {xtype:"hidden",name:"depotTransfers.transfersEquipDetails"}
   ];
   var TransfersDetailListViewField=["tdetailId","depottId","equipSpecific","specificationsId","specifications","measurementUnit","quantity","transfersCounts","surplusCounts"];
   var TransfersEquipDetailListViewField=["edetailId","depottId","storeId","equipment","department"];