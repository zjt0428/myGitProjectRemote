--工作备忘录
CREATE TABLE T_MEMO
(
  MEMO_ID                    BIGINT IDENTITY PRIMARY KEY,
  MEMO_SERIAL                VARCHAR(64) NOT NULL,           --事件编号
  MEMO_THEME                 VARCHAR(96) NOT NULL,           --事件主题
  PRACTI_ID                  BIGINT NOT NULL,                --经办人员(来源企业人员档案)
  PRACTI_NAME                VARCHAR(64) NOT NULL,           --经办人员姓名
  INCIDENT_TYPE              VARCHAR(6) NULL,                --事件类型(表码表 BM_INCIDENT_TYPE)
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  ADDRESS                    VARCHAR(256) NULL,              --项目所属地(省+市+区+街道)
  EQUIP_ID                   BIGINT NULL,                    --关联设备(来源设备档案)
  EQUIP_GENERIC              VARCHAR(6) NULL,                --设备名称(表码 BM_EQUIP_GENERIC)
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  EXW_SERIAL                 VARCHAR(64)  NULL,              --出厂编号
  CUSTOM_ID                  BIGINT NULL,                    --关联客户(客户档案)
  CUSTOM_NAME                VARCHAR(64) NULL,               --关联客户
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  PROCESS_STATUS             CHAR(1) NOT NULL,               --状态(表码值 1:已完成,2:未完成)
  STATUS                     CHAR(1) NOT NULL,               --状态(表码值 0:未归档,1:已归档)
  REMARK                     VARCHAR(512) NULL               --备注
);
--工作备忘录工作代理人(可填写多个,来源于员工档案)
CREATE TABLE T_MEMO_DEPUTY
(
  MEMO_DEPUTY_ID             BIGINT IDENTITY PRIMARY KEY,
  MEMO_ID                    BIGINT NULL,                    --备忘录ID
  PRACTI_ID                  BIGINT NOT NULL,                --人员档案ID
  PRACTI_NAME                VARCHAR(64) NOT NULL            --经办人员姓名
);
--工作备忘录明细
CREATE TABLE T_MEMO_DETAIL
(
  MEMO_DETAIL_ID             BIGINT IDENTITY PRIMARY KEY,
  MEMO_ID                    BIGINT NULL,                    --事件ID
  DEALWITH_DATE              CHAR(10) NOT NULL,              --办理日期(默认为当前时间)
  PLAN_FINISHED_DATE         CHAR(10) NOT NULL,              --计划完成时间
  CONTENTS                   VARCHAR(1024) NULL,             --办理内容
  FINISHED                   CHAR(1) NOT NULL,               --完成情况(表码值 0:未完成,1:完成)
  REMARK                     VARCHAR(512) NULL               --备注
);
--系统业务消息管理
CREATE TABLE T_BUSINESS_MESSAGE
(
  MESSAGE_ID                 BIGINT IDENTITY PRIMARY KEY,
  MESSAGE                    VARCHAR(512) NOT NULL,          --消息内容
  RECEIVE_TEL                VARCHAR(16) NOT NULL,           --消息接收手机号
  RECEIVE_NAME               VARCHAR(64) NULL,               --接收人
  SENDER_ID                  BIGINT NULL,                    --发送人ID
  SENDER_NAME                VARCHAR(64) NULL,               --发送人
  SEND_FLAG                  CHAR(1) NOT NULL,               --发送状态(表码值 0:未发送,1:已发送,2:发送失败)
  SEND_TIME                  DATETIME NULL,                  --发送时间
  REPLY_CODE                 VARCHAR(6) NULL,                --发送响应代码
  CREATE_TIME                DATETIME NOT NULL               --创建时间
);
--系统公告
CREATE TABLE T_ANNOUNCE
(
  ANNOUNCE_ID                BIGINT IDENTITY PRIMARY KEY,
  ANNOUNCE_TITLE             VARCHAR(64) NULL,               --公告标题
  ANNOUNCE_TYPE              VARCHAR(24) NULL,               --公告类别
  ANNOUNCE                   VARCHAR(4000) NULL,             --公告内容
  PUBLISH                    CHAR(1) NOT NULL,               --发布状态(表码值 0:未发布,1:发布)
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
CREATE TABLE T_ANNOUNCE_CATEGORY
(
  ANNOUNCE_CATEGORY_ID       BIGINT IDENTITY PRIMARY KEY,
  ANNOUNCE_ID                BIGINT NOT NULL,                --系统公告ID
  USER_ID                    BIGINT NULL,                    --阅读对象ID
  USER_NAME                  VARCHAR(64) NULL,               --阅读对象
  DEP_ID                     BIGINT NULL,                    --阅读对象部门ID
  DEP_NAME                   VARCHAR(20) NULL,               --阅读对象部门
  SCOPE_DEP_ID               BIGINT NULL,                    --阅读对象全部门ID
  SCOPE_DEP_NAME             VARCHAR(20) NULL,               --阅读对象全部门
  CATEGORY                   CHAR(1) NOT NULL                --发布范围(表码值 0:个人,1:部门,2:全部门)
);
CREATE TABLE T_ANNOUNCE_USER
(
  ANNOUNCE_USER_ID           BIGINT IDENTITY PRIMARY KEY,
  USER_ID                    BIGINT NOT NULL,                --系统公告ID
  USER_NAME                  VARCHAR(64) NULL,               --阅读对象
  ANNOUNCE_ID                BIGINT NOT NULL,                --阅读对象ID
  PUBLISH_TIME               DATETIME NOT NULL,              --发布时间
  READ_FLAG                  CHAR(1) NOT NULL,               --阅读标识(表码值 0:未阅读,1:已阅读)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--检验项目
CREATE TABLE T_VERIFY_ITEM
(
  ITEM_ID                    BIGINT IDENTITY PRIMARY KEY,
  ITEM_NAME                  VARCHAR(128) NOT NULL,          --项目名称
  ITEM_PARENT                BIGINT NULL,                    --父级项目
  VITEM_TYPE                 VARCHAR(4) NOT NULL DEFAULT '0',--项目类型(表码值 VITEM_TYPE)
  PATH                       VARCHAR(256) NULL,              --路径
  LEVEL                      INT NOT NULL,                   --层次
  DEL_FLAG                   CHAR(1) NOT NULL DEFAULT 1      --删除标识(表码值 0:删除,1:正常)
);
--检验项目要求
CREATE TABLE T_VERIFY_ITEM_DEMAND
(
  DEMAND_ID                  BIGINT IDENTITY PRIMARY KEY,
  ITEM_ID                    BIGINT NOT NULL,                --检验项目ID
  DEMAND_DES                 VARCHAR(512) NULL               --检验要求
);
--具体业务检验项目要求
CREATE TABLE T_VERIFY_STANDARD
(
  STANDARD_ID                BIGINT IDENTITY PRIMARY KEY,
  RELATE_ID                  BIGINT NOT NULL,                --关联业务
  RELATE_MODULE              VARCHAR(32) NOT NULL,           --关联业务模块
  ITEM_NAME                  VARCHAR(128) NOT NULL,          --检测项目
  PARENT_NAME                VARCHAR(128) NULL,              --检测分类
  LEVEL                      INT NOT NULL,                   --层次
  DEMAND_DES                 VARCHAR(512) NOT NULL,          --检测要求
  STANDARD_RESULT            VARCHAR(32) NULL,               --检测结果(表码值 合格,不合格)
  REMARK                     VARCHAR(512) NULL,              --检测结论
  SUMMARY                    VARCHAR(512) NULL               --检测摘要
);
--分期付款
CREATE TABLE T_INSTALMENT
(
  INSTALMENT_ID              BIGINT IDENTITY PRIMARY KEY,
  RELATE_ID                  BIGINT NOT NULL,                --关联业务
  RELATE_SERIAL              VARCHAR(64) NOT NULL,           --关联业务编号
  RELATE_MODULE              VARCHAR(32) NOT NULL,           --关联业务模块
  PERIODS                    SMALLINT NOT NULL,              --期数
  PAYMENT                    NUMERIC(12, 2) NOT NULL,        --预计付款额
  PAY_DATE                   CHAR(10) NOT NULL,              --付款日期
  ALREADY_PAYMENT            NUMERIC(12, 2) NOT NULL,        --已付金额
  REMARK                     VARCHAR(256) NULL,              --分期付款备注
  STATUS                     CHAR(1) NOT NULL                --付款状态(表码值 0:待付款,1:付款中,2:已付款)
);
--分期回款
CREATE TABLE T_RECEIVEMENT
(
  RECEIVEMENT_ID             BIGINT IDENTITY PRIMARY KEY,
  RELATE_ID                  BIGINT NOT NULL,                --关联业务
  RELATE_SERIAL              VARCHAR(64) NOT NULL,           --关联业务编号
  RELATE_MODULE              VARCHAR(32) NOT NULL,           --关联业务模块
  PERIODS                    SMALLINT NOT NULL,              --期数
  RECEIVEMENT                NUMERIC(12, 2) NOT NULL,        --预计回款额
  RECEIVE_DATE               CHAR(10) NOT NULL,              --回款日期
  ALREADY_RECEIVEMENT        NUMERIC(12, 2) NOT NULL,        --已回金额
  ISSUE_INVOICE              CHAR(1) NOT NULL,               --先开发票(表码值 0:否,1:是)
  INVOICE_TYPE               VARCHAR(6) NULL,                --票据类型(表码 BM_INVOICE_TYPE)
  REMARK                     VARCHAR(256) NULL,              --分期回款备注
  STATUS                     CHAR(1) NOT NULL                --回款状态(表码值 5:待回款,6:回款中,7:已回款)
);
--受理信息表
CREATE TABLE T_FORM_ACCEPT
(
  ACCEPT_ID                  BIGINT IDENTITY PRIMARY KEY,
  RELATE_ID                  BIGINT NOT NULL,        
  RELATE_MODULE              VARCHAR(32) NOT NULL,   
  ACCEPT_USERID              BIGINT NOT NULL,                --受理人ID
  ACCEPT_USERNAME            VARCHAR(32) NOT NULL,           --受理人
  ACCEPT_DEP                 VARCHAR(128) NOT NULL,          --受理单位
  ACCEPT_TIME                SMALLDATETIME NOT NULL,         --受理时间
  ACCEPT_OPINION             CHAR(1) NOT NULL,               --受理方式(表码值 0:不通过,1:通过)
  ACCEPT_REMARK              VARCHAR(512) NULL               --备注(可填写审批意见)
);
--审批信息表
CREATE TABLE T_FORM_APPROVE
(
  APPROVE_ID                 BIGINT IDENTITY PRIMARY KEY,
  RELATE_ID                  BIGINT NOT NULL,        
  RELATE_MODULE              VARCHAR(32) NOT NULL,   
  APPROVE_USERID             BIGINT NOT NULL,                --审批人
  APPROVE_USERNAME           VARCHAR(32) NOT NULL,           --审批人
  APPROVE_DEP                VARCHAR(128) NOT NULL,          --审批单位
  APPROVE_TIME               SMALLDATETIME NOT NULL,         --审批时间
  APPROVE_OPINION            CHAR(1) NOT NULL,               --受理方式(表码值 0:不通过,1:通过)
  APPROVE_REMARK             VARCHAR(512) NULL               --备注(可填写审批意见)
);
--企业档案信息
CREATE TABLE T_CORP_INFO
(
  CORP_ID                    BIGINT IDENTITY PRIMARY KEY,
  CORP_NAME                  VARCHAR(64) NOT NULL,           --企业名称
  DEP_ID                     BIGINT NOT NULL,                --所属部门
  CORP_CODE                  VARCHAR(32) NULL,               --企业简码
  CORP_TYPE                  VARCHAR(128) NULL,              --企业类型(多表码 BM_CORP_TYPE) 
  LICENSE                    VARCHAR(32) NULL,               --工商营业执照
  PROVINCE                   CHAR(6) NULL,                   --注册所在省(表码) 
  CITY                       CHAR(6) NULL,                   --注册所在市(表码) 
  COUNTY                     CHAR(6) NULL,                   --注册所在区(表码) 
  REG_ADDRESS                VARCHAR(128) NULL,              --注册所在地(省市区简称)
  SAFETY_PROD_CERT           VARCHAR(32) NULL,               --安全生产许可证编号
  ECONOMIC                   VARCHAR(6) NULL,                --企业工商登记类型(表码 BM_ECON_TYPE)
  REG_PRIN                   NUMERIC(12, 2) NULL,            --注册资本(万元)
  BIRTH_DATE                 CHAR(10) NULL,                  --成立日期
  LEGAL_MAN                  VARCHAR(32) NOT NULL,           --企业法人
  LEGAL_MOBILE               VARCHAR(16) NULL,               --法人联系电话
  LEGAL_MAN_IDCARD           VARCHAR(18) NULL,               --企业法人身份证号
  LEGAL_MAN_DUTY             VARCHAR(50) NULL,               --企业法人职务
  LEGAL_MAN_PROTITLE         VARCHAR(50) NULL,               --企业法人职称
  DUTYMAN                    VARCHAR(32) NULL,               --企业责任人
  DUTYMAN_TEL1               VARCHAR(16) NULL,               --企业责任人联系手机
  DUTYMAN_TEL2               VARCHAR(16) NULL,               --企业责任人联系手机
  DUTYMAN_TEL3               VARCHAR(16) NULL,               --企业责任人联系手机
  FINANCE                    VARCHAR(32) NULL,               --财务责任人
  FINANCE_TEL                VARCHAR(16) NULL,               --财务责任人联系手机
  CAPITAL                    VARCHAR(32) NULL,               --资产责任人
  CAPITAL_TEL                VARCHAR(16) NULL,               --资产责任人联系手机
  MARKET                     VARCHAR(32) NULL,               --市场责任人
  MARKET_TEL                 VARCHAR(16) NULL,               --市场责任人联系手机
  POSTAL_CODE                CHAR(6) NULL,                   --邮政编码
  ADDRESS                    VARCHAR(128) NULL,              --通讯地址
  FAX                        VARCHAR(16) NULL,               --传真号码
  OFFICE_TEL                 VARCHAR(16) NULL,               --办公电话
  LINK_EMAIL                 VARCHAR(128) NULL,              --邮件地址
  CORP_DESC                  VARCHAR(256) NULL,              --企业简介
  REMARK                     VARCHAR(256) NULL,              --备注
  PHOTO                      BIGINT NULL,                    --企业照片
  CERT_ID                    BIGINT NULL,                    --企业默认资质
  CORP_STATUS                CHAR(1) NOT NULL,               --企业状态(表码值 0:注销,1:激活)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--企业帐户信息
CREATE TABLE T_CORP_ACCOUNT
(
  CORP_ACCOUNT_ID            BIGINT IDENTITY PRIMARY KEY,
  CORP_ID                    BIGINT NOT NULL,        
  BANK_DEPOSIT               VARCHAR(64) NOT NULL,           --开户行
  ACCOUNT                    VARCHAR(32) NOT NULL,           --账号
  BALANCE                    NUMERIC(16, 2) NULL,            --帐户余额
  ADDRESS                    VARCHAR(128) NULL               --开户行地址
);
--企业资质证书信息
CREATE TABLE T_CORP_CERT
(
  CERT_ID                    BIGINT IDENTITY PRIMARY KEY,
  CORP_ID                    BIGINT NOT NULL,        
  CERT_NUM                   VARCHAR(32) NOT NULL,           --资质证书编号
  CORP_CODE                  VARCHAR(32) NULL,               --组织机构代码
  CERT_TYPE                  VARCHAR(6) NOT NULL,            --资质类型(表码 BM_APTITUDEKIND)
  TRADE_TYPE                 VARCHAR(6) NULL,                --资质序列(表码 BM_TRADETYPE)
  TRADE_BOUND                VARCHAR(8) NULL,                --专业类别(表码 BM_TRADETYPEBOUND)
  TITLE_LEVEL                VARCHAR(6) NULL,                --资质最高等级(表码 BM_CERT_LEVEL)
  COPY_CERT_COUNT            SMALLINT NULL,                  --证书副本数量
  NOTE_NUMBER                VARCHAR(32) NULL,               --首次批准资质文号
  NOTE_DATE                  CHAR(10) NULL,                  --首次批准资质日期
  ORGAN_NAME                 VARCHAR(64) NULL,               --发证单位
  ORGAN_DATE                 CHAR(10) NULL,                  --发证日期 YYYY-MM-DD
  END_DATE                   CHAR(10) NULL,                  --证书有效日期 YYYY-MM-DD
  PRINT_NUMBER               VARCHAR(32) NULL,               --证书正本流水号
  MARK                       VARCHAR(512) NULL,              --资质内容
  DEFAULT_CERT               CHAR(1) NOT NULL,               --默认资质(表码值 0:非默认,1:默认)
  REMARK                     VARCHAR(256) NULL,              --备注
  ISVALID                    CHAR(1) NOT NULL,               --证书状态(表码值 1:正常,4:过期)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--从业人员档案信息
CREATE TABLE T_PRACTITIONER
(
  PRACTI_ID                  BIGINT IDENTITY PRIMARY KEY,
  CORP_ID                    BIGINT NOT NULL,        
  DEP_ID                     BIGINT NULL,                    --所属部门
  USERID                     BIGINT NULL,                    --系统帐户
  PRACTI_NAME                VARCHAR(64) NOT NULL,           --人员姓名
  SEX                        CHAR(1) NULL,                   --性别(表码:0:女\1:男)
  ID_CARD                    VARCHAR(18) NULL,               --身份证号
  MOBILE                     VARCHAR(16) NULL,               --手机号
  BIRTH_DATE                 CHAR(10) NULL,                  --出生日期 YYYY-MM-DD
  NATION                     VARCHAR(6) NULL,                --民族(表码 BM_NATION)
  STATION                    VARCHAR(32) NULL,               --岗位
  DIVISION_DATE              CHAR(10) NULL,                  --入司日期 YYYY-MM-DD
  SEPARATION_DATE            CHAR(10) NULL,                  --离职日期 YYYY-MM-DD
  INCUMBENT                  CHAR(1) NULL,                   --在职状态(表码值 0:离职,1:在职)
  KIND_WORK                  VARCHAR(6) NULL,                --从业工种(表码 BM_KIND_WORK)
  BASE_SALARY                NUMERIC(12, 2) NULL,            --基本工资
  DEGREE                     VARCHAR(6) NULL,                --学位(表码 BM_DEGREE)
  EDU_LEVEL                  VARCHAR(6) NULL,                --学历(表码 BM_EDULEVEL)
  UNIVERSITY                 VARCHAR(64) NULL,               --毕业院校
  MAJOR                      VARCHAR(64) NULL,               --学历专业
  PROFESSION_TITLE           VARCHAR(64) NULL,               --专业职称
  BIRTHPLACE                 VARCHAR(16) NULL,               --籍贯
  HOME_TEL                   VARCHAR(16) NULL,               --家庭电话
  EMAIL                      VARCHAR(128) NULL,              --邮件地址
  ADDRESS                    VARCHAR(128) NULL,              --联系地址
  PHOTO                      BIGINT NULL,                    --照片信息
  BANK_DEPOSIT               VARCHAR(64) NULL,               --开户行
  ACCOUNT                    VARCHAR(32) NULL,               --账号
  REMARK                     VARCHAR(256) NULL,              --备注
  TEAMS                      VARCHAR(32) NULL,               --班组
  PROJECT_ID                 BIGINT NULL,                    --当前项目ID
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  CERT_FLAG                  CHAR(1) NULL,                   --证书状态(表码值 0:无证书,1:有证书)
  PRACTI_STATUS              CHAR(1) NOT NULL,               --人员状态(表码值 0:注销,1:激活)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--从业资格记录
CREATE TABLE T_PRACTI_RESUME
(
  RESUME_ID                  BIGINT IDENTITY PRIMARY KEY,
  PRACTI_DIARY_ID            BIGINT NOT NULL,                --从业记录(人员日历)
  PRACTI_ID                  BIGINT NOT NULL,                --人员ID(人员档案)
  PROJECT_ID                 BIGINT NOT NULL,                --项目ID(项目档案)
  EQUIP_ID                   BIGINT NOT NULL,                --设备ID(设备档案)
  PROJECT_NAME               VARCHAR(64) NOT NULL,           --项目名称
  PRACTI_NAME                VARCHAR(64) NOT NULL,           --人员姓名
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号  
  PRACTI_KINDWORK            VARCHAR(6) NOT NULL,            --从业工种(表码 BM_KIND_WORK)
  START_DATE                 SMALLDATETIME NOT NULL,         --开始时间
  END_DATE                   SMALLDATETIME NOT NULL,         --结束时间
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--奖惩记录
CREATE TABLE T_PRACTI_CREDIT
(
  CREDIT_ID                  BIGINT IDENTITY PRIMARY KEY,
  PRACTI_ID                  BIGINT NOT NULL,                --人员ID
  PRACTI_NAME                VARCHAR(64) NOT NULL,           --人员姓名
  PRACTI_KINDWORK            VARCHAR(6) NOT NULL,            --从业工种(表码 BM_KIND_WORK)
  CREDIT_TYPE                CHAR(1) NOT NULL,               --信用类型(表码值 1:荣誉,0:处罚)
  REASON                     VARCHAR(512) NULL,              --事由
  DESCRIPTION                VARCHAR(4000) NULL,             --内容
  APPRAISE_ORG               VARCHAR(128) NOT NULL,          --审核部门
  APPRAISE_DATE              CHAR(10) NOT NULL,              --评定日期 YYYY-MM-DD
  REMARK                     VARCHAR(256) NULL,              --备注
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)  
);
--从业资格证书信息
CREATE TABLE T_PRACTI_CERT
(
  CERT_ID                    BIGINT IDENTITY PRIMARY KEY,
  PRACTI_ID                  BIGINT NOT NULL,                --人员ID
  CERT_NUM                   VARCHAR(32) NOT NULL,           --资质证书编号
  SPECIALTY_TYPE             VARCHAR(6) NOT NULL,            --注册类型及等级(表码 BM_SPECIALTY_TYPE)
  PRACTI_KINDWORK            VARCHAR(6) NOT NULL,            --从业工种(表码 BM_KIND_WORK)
  AWARD_DEPART               VARCHAR(64) NULL,               --发证单位
  AWARD_DATE                 CHAR(10) NOT NULL,              --发证日期 YYYY-MM-DD
  EFFECT_DATE                CHAR(10) NOT NULL,              --证书有效日期 YYYY-MM-DD
  CONTRACT_DATE              CHAR(10) NULL,                  --合同截止日
  STAMP_NUM                  VARCHAR(64) NULL,               --执业印章号
  MARK                       VARCHAR(512) NULL,              --资质内容
  REMARK                     VARCHAR(256) NULL,              --备注
  QSTATE                     CHAR(1) NOT NULL,               --证书状态(表码值 1:正常,4:过期)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--供应商模块
CREATE TABLE T_SUPPLIER
(
  SUPPLIER_ID                BIGINT IDENTITY PRIMARY KEY,
  SUPPLIER_NAME              VARCHAR(64) NOT NULL,           --单位名称
  UNIT_TYPE                  VARCHAR(32) NULL,               --单位类型
  ADDRESS                    VARCHAR(128) NULL,              --办公地址
  TEL                        VARCHAR(16) NULL,               --办公电话
  MAIN_BUSINESS              VARCHAR(128) NULL,              --主营业务
  REG_CAPITAL                NUMERIC(12, 2) NULL,            --注册资金
  BIRTH_DATE                 CHAR(10) NULL,                  --成立时间
  BUSINESS_AREA              VARCHAR(128) NULL,              --业务区域
  DESCRIPTION                VARCHAR(256) NULL,              --企业简介
  REMARK                     VARCHAR(256) NULL,              --备注
  SUPPLIER_LINKER_ID         BIGINT NULL,                    --供应商默认联系人
  SUPPLIER_ACCOUNT_ID        BIGINT NULL,                    --供应商默认帐户信息
  STATUS                     CHAR(1) NOT NULL,               --供应商状态(表码值 0:注销,1:激活)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
CREATE TABLE T_SUPPLIER_LINKER
(
  SUPPLIER_LINKER_ID         BIGINT IDENTITY PRIMARY KEY,
  SUPPLIER_ID                BIGINT NULL,        
  LINKER_TYPE                VARCHAR(6) NOT NULL,            --联系人类别(表码 BM_LINKER_TYPE)
  LINKER                     VARCHAR(32) NOT NULL,           --姓名
  DUTIES                     VARCHAR(32) NULL,               --职务
  TEL                        VARCHAR(16) NULL,               --手机
  OFFICE_PHONE               VARCHAR(16) NULL,               --办公电话
  BIRTH_DATE                 CHAR(10) NULL,                  --生日
  INTERESTS                  VARCHAR(128) NULL,              --兴趣爱好
  REMARK                     VARCHAR(256) NULL               --备注
);
CREATE TABLE T_SUPPLIER_ACCOUNT
(
  SUPPLIER_ACCOUNT_ID        BIGINT IDENTITY PRIMARY KEY,
  SUPPLIER_ID                BIGINT NULL,        
  BANK_DEPOSIT               VARCHAR(64) NOT NULL,           --开户行
  ACCOUNT                    VARCHAR(32) NOT NULL,           --账号
  ADDRESS                    VARCHAR(128) NULL               --开户行地址
);
--客户模块
CREATE TABLE T_CUSTOMER
(
  CUSTOMER_ID                BIGINT IDENTITY PRIMARY KEY,
  CUSTOMER_NAME              VARCHAR(64) NOT NULL,           --客户名称
  CUSTOMER_LEVEL             VARCHAR(32) NULL,               --客户级别
  UNIT_TYPE                  VARCHAR(32) NULL,               --客户类型
  ADDRESS                    VARCHAR(128) NULL,              --办公地址
  TEL                        VARCHAR(16) NULL,               --办公电话
  MAIN_BUSINESS              VARCHAR(128) NULL,              --主营业务
  REG_CAPITAL                NUMERIC(12, 2) NULL,            --注册资金
  BIRTH_DATE                 CHAR(10) NULL,                  --成立时间
  BUSINESS_AREA              VARCHAR(128) NULL,              --业务区域
  DESCRIPTION                VARCHAR(256) NULL,              --简介
  REMARK                     VARCHAR(256) NULL,              --备注
  CUSTOMER_LINKER_ID         BIGINT NULL,                    --客户默认联系人
  CUSTOMER_ACCOUNT_ID        BIGINT NULL,                    --客户默认帐户信息
  STATUS                     CHAR(1) NOT NULL,               --客户状态(表码值 0:注销,1:激活)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
CREATE TABLE T_CUSTOMER_LINKER
(
  CUSTOMER_LINKER_ID         BIGINT IDENTITY PRIMARY KEY,
  CUSTOMER_ID                BIGINT NULL,        
  LINKER_TYPE                VARCHAR(6) NOT NULL,            --联系人职务类别(表码 BM_LINKER_TYPE)
  LINKER                     VARCHAR(32) NOT NULL,           --姓名
  DUTIES                     VARCHAR(32) NULL,               --项目名称
  TEL                        VARCHAR(16) NULL,               --手机
  OFFICE_PHONE               VARCHAR(16) NULL,               --办公电话
  BIRTH_DATE                 CHAR(10) NULL,                  --生日
  INTERESTS                  VARCHAR(128) NULL,              --兴趣爱好
  REMARK                     VARCHAR(256) NULL               --备注
);
CREATE TABLE T_CUSTOMER_ACCOUNT
(
  CUSTOMER_ACCOUNT_ID        BIGINT IDENTITY PRIMARY KEY,
  CUSTOMER_ID                BIGINT NULL,        
  BANK_DEPOSIT               VARCHAR(64) NOT NULL,           --开户行
  ACCOUNT                    VARCHAR(32) NOT NULL,           --账号
  ADDRESS                    VARCHAR(128) NULL               --开户行地址
);
--物流车辆
CREATE TABLE T_CAR
(
  CAR_ID                     BIGINT IDENTITY PRIMARY KEY,
  LICENSE_PLATE              VARCHAR(16) NOT NULL,           --车牌号
  ID_CARD                    VARCHAR(18) NULL,               --身份证号
  SEDAN                      VARCHAR(32) NOT NULL,           --车型/品牌型号
  PROPERTY_NAME              VARCHAR(64) NOT NULL,           --产权人
  ENGINE_NUMBER              VARCHAR(64) NULL,               --发动机号
  SCRAP_DATE                 SMALLDATETIME NULL,             --报废时间
  NOMINAL_LOAD               NUMERIC(12, 2) NULL,            --额定载重量
  PURCHASE_DATE              SMALLDATETIME NOT NULL,         --购买时间
  PROPERTY_BELONG            CHAR(1) NULL,                   --产权归属(表码值 0:自有,1:租赁)
  DRIVER                     VARCHAR(64) NULL,               --司机
  DRIVER_PHONE               VARCHAR(16) NULL,               --司机电话
  DISBURSEMENT               NUMERIC(12, 2) NULL DEFAULT 0,  --累计支出金额
  STATUS                     CHAR(1) NOT NULL DEFAULT 0,     --状态(表码值 0:在用,1:闲置)
  REMARK                     VARCHAR(512) NULL,              --备注
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--车辆费用支出
CREATE TABLE T_CAR_EXPENSE
(
  CAR_EXPENSE_ID             BIGINT IDENTITY PRIMARY KEY,
  CAR_ID                     BIGINT NOT NULL,                --车辆ID
  EXPENSE                    VARCHAR(64) NOT NULL,           --费用项目
  PAYMENT_AMOUNT             NUMERIC(12, 2) NOT NULL,        --支出金额
  INSTRUCTIONS               VARCHAR(512) NULL,              --用途说明
  PRACTI_NAME                VARCHAR(64) NULL,               --经办人
  SPEND_DATE                 CHAR(10) NULL,                  --发生时间
  MILEAGE                    VARCHAR(64) NULL,               --里程
  OIL_WEAR                   VARCHAR(64) NULL,               --油耗
  REMARK                     VARCHAR(512) NULL              --备注
);
--项目信息
CREATE TABLE T_PROJECT
(
  PROJECT_ID                 BIGINT IDENTITY PRIMARY KEY,
  PROJECT_SERIAL             VARCHAR(64) NOT NULL,           --项目编号(XM+YYYYMMDD+00)
  PROJECT_NAME               VARCHAR(64) NOT NULL,           --项目名称
  PROJECT_TYPE               VARCHAR(6) NOT NULL,            --项目类别(表码 BM_PROJECT_TYPE)
  DEP_NAME                   VARCHAR(128) NULL,              --所属主管部门
  PROVINCE                   CHAR(6) NOT NULL,               --项目所属地区-省(编码)
  CITY                       CHAR(6) NOT NULL,               --项目所属地区-市(编码)
  COUNTY                     CHAR(6) NOT NULL,               --项目所属地区-区(编码)
  STREET                     VARCHAR(128) NULL,              --项目所属地区-街道
  ADDRESS                    VARCHAR(256) NULL,              --项目所属地(省+市+区+街道)
  SCALE                      VARCHAR(6) NOT NULL,            --项目规模(表码 BM_PROJECT_SCALE)
  START_PLAN_DATE            CHAR(10) NULL,                  --计划开工日期
  END_PLAN_DATE              CHAR(10) NULL,                  --计划峻工日期
  PROJECT_COST               NUMERIC(12, 2) NULL,            --工程造价(万元)
  COVER                      NUMERIC(12, 2) NULL,            --总建筑面积(㎡)
  OVERALL_HEIGHT             NUMERIC(12, 2) NULL,            --楼层高度(㎡)
  REMARK                     VARCHAR(256) NULL,              --备注
  CT_CUSTOM_ID               BIGINT NULL,                    --建设单位ID(客户档案)
  CT_CUSTOM_NAME             VARCHAR(64) NULL,               --建设单位名称
  CT_CUSTOM_LINKER           VARCHAR(32) NULL,               --建设单位姓名
  CT_CUSTOM_LINK_TEL         VARCHAR(16) NULL,               --建设单位手机
  UN_CUSTOM_ID               BIGINT NULL,                    --施工单位ID(客户档案)
  UN_CUSTOM_NAME             VARCHAR(64) NULL,               --施工单位名称
  UN_CUSTOM_LINKER           VARCHAR(32) NULL,               --施工单位姓名
  UN_CUSTOM_LINK_TEL         VARCHAR(16) NULL,               --施工单位手机
  SUP_CUSTOM_ID              BIGINT NULL,                    --监理单位ID(客户档案)
  SUP_CUSTOM_NAME            VARCHAR(64) NULL,               --监理单位名称
  SUP_CUSTOM_LINKER          VARCHAR(32) NULL,               --监理单位姓名
  SUP_CUSTOM_LINK_TEL        VARCHAR(16) NULL,               --监理单位手机
  PRACTI_ID                  BIGINT NULL,                    --销售人员ID
  PRACTI_NAME                VARCHAR(64) NULL,               --销售人员姓名
  REQS_DESC                  VARCHAR(512) NULL,              --需求说明
  EXPECT_END_DATE            CHAR(10) NULL,                  --预计完成时间
  STATUS                     CHAR(1) NOT NULL,               --状态(表码值 0:作废,1:跟进,2:成交,3:完成)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--项目商务记录
CREATE TABLE T_PROJECT_EXPENSE(
  PROJECT_EXPENSE_ID         BIGINT IDENTITY PRIMARY KEY,
  PROJECT_ID                 BIGINT NOT NULL,                --项目ID
  SPEND_DATE                 CHAR(10) NULL,                  --发生时间
  DISCRIPTION                VARCHAR(64) NULL,               --内容描述
  STATUS                     VARCHAR(32) NULL,               --完成状态
  EXPENSE_AMOUNT             NUMERIC(12, 2) NULL,            --发生费用(可选填)
  EXPENSE_DESC               VARCHAR(64) NULL,               --费用说明(可选填)
  REMARK                     VARCHAR(264) NULL               --备注
);
--仓库信息
CREATE TABLE T_STORE_HOUSE
(
  STORE_ID                   BIGINT IDENTITY PRIMARY KEY,
  STORE_SERIAL               VARCHAR(64) NOT NULL,           --仓库编号(CK+两位流水号)
  STORE_NAME                 VARCHAR(64) NOT NULL,           --仓库名称
  ADDRESS                    VARCHAR(256) NULL,              --仓库地址
  AREA                       NUMERIC(12, 2) NULL,            --仓库面积
  LINKER                     VARCHAR(32) NULL,               --仓管负责人
  LINK_TEL                   VARCHAR(16) NULL,               --联系手机
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--设备出入库信息
CREATE TABLE T_STORE_EQUIP_STOCK
(
  EQUIP_STOCK_ID             BIGINT IDENTITY PRIMARY KEY,
  STORE_ID                   BIGINT NOT NULL,                --仓库ID
  EQUIP_ID                   BIGINT NOT NULL,                --租赁设备(设备档案)
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  BOUND_DATE                 CHAR(10) NULL,                  --出入库时间
  STOCK_TYPE                 CHAR(1) NOT NULL                --出入库类型(表码值 2:出库,5:入库)
);
--配件出入库信息
CREATE TABLE T_STORE_COMPON_STOCK
(
  COMPON_STOCK_ID            BIGINT IDENTITY PRIMARY KEY,
  STORE_ID                   BIGINT NOT NULL,                --仓库ID
  COMPON_ID                  BIGINT NOT NULL,                --配件信息(配件档案)
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  COUNTS                     SMALLINT NOT NULL,              --调配数量
  BOUND_DATE                 CHAR(10) NULL,                  --出入库时间
  STOCK_TYPE                 CHAR(1) NOT NULL                --出入库类型(表码值 2:出库,5:入库)
);
--零配件信息
CREATE TABLE T_COMPONENT
(
  COMPON_ID                  BIGINT IDENTITY PRIMARY KEY,
  COMPON_SERIAL              VARCHAR(64) NOT NULL,           --产品编号(类别别名+YYYYMMDD+000000)
  COMPON_CATEGORY            VARCHAR(12) NOT NULL,           --零配件类别(表码 BM_REPERTORY_CATEGORY)
  COMPON_GENERIC             VARCHAR(6) NOT NULL,            --零配件名称(表码 BM_COMPONENT_GENERIC)
  COMPON_SPECIFIC            VARCHAR(6) NULL,                --设备型号(表码 BM_COMPONENT_SPECIFIC)
  COMPON_CODE                VARCHAR(64) NULL,               --配件代码
  DIMENSIONS                 VARCHAR(64) NULL,               --规格特征
  PURCHASE_DATE              SMALLDATETIME NULL,             --采购日期
  SCRAP_DATE                 SMALLDATETIME NULL,             --报废日期
  CALCULATE                  VARCHAR(8) NOT NULL,            --计量单位
  UNITPRICE                  NUMERIC(12, 2) NULL,            --费用单价
  RFID_CODE                  VARCHAR(64) NULL,               --RFID号
  SUPPLIER_ID                BIGINT NULL,                    --供应商(来源供应商档案)
  SUPPLIER_NAME              VARCHAR(64) NULL,               --供应商名称
  SUPPLIER_ADD               VARCHAR(128) NULL,              --联系地址
  SUPPLIER_TEL               VARCHAR(16) NULL,               --联系电话
  PRACTI_ID                  BIGINT NULL,                    --经办人员(来源企业人员档案)
  PRACTI_NAME                VARCHAR(64) NULL,               --经办人员姓名
  MOBILE                     VARCHAR(11) NULL,               --经办人员手机号
  ASSET_VALUE                NUMERIC(12, 2) NOT NULL,        --资产原值
  DEPRECIATE_RATE            NUMERIC(5, 2) NOT NULL,         --折旧率(%)
  TOTAL_RATE                 NUMERIC(5, 2) NOT NULL,         --累计折旧率(%)
  PRESENT_VALUE              NUMERIC(12, 2) NOT NULL,        --资产现值(=原值X累计折旧率)/资产总计
  BATCH_NUMBER               VARCHAR(24) NOT NULL,           --产品录入批次号
  DEPRECIATE_DATE            CHAR(10) NULL,                  --折旧更新日期(现值更新)
  STORE_ID                   BIGINT NULL,                    --仓库ID(仓库档案)
  EQUIP_ID                   BIGINT NULL,                    --设备ID(设备档案)
  CONSUME_FLAG               CHAR(1) NOT NULL,               --易耗品标识(表码值 0:非易耗品,1:易耗品)
  PARACHUTE_FLAG             CHAR(1) NOT NULL,               --防坠器标识(表码值 0:非防坠器,1:防坠器)
  WALL_ATTACHE_FLAG          CHAR(1) NOT NULL,               --附墙标识(表码值 0:非附墙,1:附墙)
  KNOT_FLAG                  CHAR(1) NOT NULL,               --标准节标识(表码值 0:非标准节,1:标准节)
  BOLT_FLAG                  CHAR(1) NOT NULL,               --螺栓标识(表码值 0:非螺栓,1:螺栓)
  PARACHUTE_CHECK_DATE       CHAR(10) NULL,                  --防坠器检查日期
  CONSUME_COUNTS             INT NOT NULL,                   --库存数量
  LEFTCAGE_SERIAL            VARCHAR(64) NULL,               --左笼编号
  LEFTCAGE_CHECK_DATE        CHAR(10) NULL,                  --左笼检测日期
  RIGHTCAGE_SERIAL           VARCHAR(64) NULL,               --右笼编号
  RIGHTCAGE_CHECK_DATE       CHAR(10) NULL,                  --右笼检测日期
  KNOT_METRIC                NUMERIC(12, 2) NULL,            --标准节长度
  PERIOD_RESERVE             SMALLINT NULL,                  --期初库存
  BRACHIUM                   NUMERIC(12, 2) NULL,            --臂长
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(32) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  STATUS                     CHAR(1) NOT NULL,               --当前状态(表码值 0:在用,1:闲置,2:借用,3:领用,6:报废,7:遗失,9:注销)
  STATUS_DATE                SMALLDATETIME NOT NULL,         --当前状态变化日期(盘点时使用)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--设备信息
CREATE TABLE T_EQUIPMENT
(
  EQUIP_ID                   BIGINT IDENTITY PRIMARY KEY,
  RECORD_SERIAL              VARCHAR(64) NOT NULL,           --设备编号(设备名称代码+YYYYMMSS+000)
  EQUIP_CATEGORY             VARCHAR(12) NOT NULL,           --设备类别(表码 BM_REPERTORY_CATEGORY)
  EQUIP_GENERIC              VARCHAR(6) NOT NULL,            --设备名称(表码 BM_EQUIP_GENERIC)
  EQUIP_SPECIFIC             VARCHAR(6) NOT NULL,            --规格型号(表码 BM_EQUIP_SPECIFIC)
  EQUIP_SOURCE               VARCHAR(6) NOT NULL,            --设备来源(表码 BM_EQUIP_SOURCE)
  BRACHIUM                   NUMERIC(12, 2) NULL,            --臂长(M)
  LOADING_WEIGHT             NUMERIC(12, 2) NULL,            --最大载重量(T)
  INDEPENDENT_HEIGHT         NUMERIC(12, 2) NULL,            --最大独立高度(M)
  ATTACHMENT_HEIGHT          NUMERIC(12, 2) NULL,            --最高附着高度(M)
  LICENSE_NUMBER             VARCHAR(24) NULL,               --制造许可证号(表码 取值 BM_LICENSE_NUMBER)
  EXW_SERIAL                 VARCHAR(64) NOT NULL,           --出厂编号
  EXW_DATE                   CHAR(10) NOT NULL,              --出厂日期
  PURCHASE_DATE              SMALLDATETIME NOT NULL,         --采购日期
  SCRAP_DATE                 SMALLDATETIME NOT NULL,         --报废日期
  EQUIP_VENDER               VARCHAR(128) NOT NULL,          --制造厂家(表码 取值 BM_EQUIP_VENDER)
  PROPERTY_ENT               BIGINT NOT NULL,                --产权单位(企业档案)
  PROPERTY_NAME              VARCHAR(64) NOT NULL,           --产权单位名称
  DUTYMAN                    VARCHAR(32) NOT NULL,           --产权单位责任人
  DUTYMAN_TEL                VARCHAR(16) NULL,               --产权单位责任人联系电话
  MORTGAGE                   CHAR(1) NOT NULL,               --按揭(表码值 0:现付,1:按揭)
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  RFID_CODE                  VARCHAR(64) NULL,               --RFID号
  SUPPLIER_ID                BIGINT NULL,                    --供应商(来源供应商档案)
  SUPPLIER_NAME              VARCHAR(64) NULL,               --供应商名称
  SUPPLIER_ADD               VARCHAR(128) NULL,              --联系地址
  SUPPLIER_TEL               VARCHAR(16) NULL,               --联系电话
  PRACTI_ID                  BIGINT NULL,                    --经办人员(来源企业人员档案)
  PRACTI_NAME                VARCHAR(64) NULL,               --经办人员姓名
  MOBILE                     VARCHAR(11) NULL,               --经办人员手机号
  CUSTOMER_ID                BIGINT NULL,                    --所属客户ID
  CUSTOMER_LINKER_ID         BIGINT NULL,                    --所属客户联系ID
  CUSTOMER_NAME              VARCHAR(64) NULL,               --客户名称
  LINKMAN                    VARCHAR(32) NULL,               --姓名
  LINKMAN_TEL                VARCHAR(16) NULL,               --手机
  ASSET_VALUE                NUMERIC(12, 2) NOT NULL,        --资产原值
  DEPRECIATE_RATE            NUMERIC(5, 2) NOT NULL,         --折旧率(%)
  TOTAL_RATE                 NUMERIC(5, 2) NOT NULL,         --累计折旧率(%)
  PRESENT_VALUE              NUMERIC(12, 2) NOT NULL,        --资产现值(=原值X累计折旧率)
  DEPRECIATE_DATE            CHAR(10) NOT NULL,              --折旧更新日期(现值更新)
  RENTAL_UNIT                NUMERIC(12, 2) NULL,            --租赁单价
  PRICE_UNIT                 VARCHAR(8) NULL,                --单价单位
  MORTGAGE_AMOUNT            NUMERIC(12, 2) NULL,            --总按揭额
  FINISHED_AMOUNT            NUMERIC(12, 2) NOT NULL,        --已付金额
  REMAINDER_AMOUNT           NUMERIC(12, 2) NOT NULL,        --未付金额
  MORTGAGE_PERIODS           SMALLINT NULL,                  --总贷款期数
  PAYMENT_TYPE               VARCHAR(6) NULL,                --付款方式(表码 BM_PAYMENT_TYPE)
  OWING_START_DATE           CHAR(10) NULL,                  --开始时间
  OWING_END_DATE             CHAR(10) NULL,                  --结束时间
  MONTHLY_PAYMENT            NUMERIC(12, 2) NULL,            --月还款额
  PAYEE_ID                   BIGINT NULL,                    --收款方
  PAYEE_NAME                 VARCHAR(64) NULL,               --收款方名称
  PAYEE_ADD                  VARCHAR(128) NULL,              --收款方联系地址
  PAYEE_TEL                  VARCHAR(16) NULL,               --收款方联系电话
  REMARK                     VARCHAR(256) NULL,              --备注
  MONITOR_SERIAL             VARCHAR(32) NULL,               --设备监控装置编号
  FUND_STATUS                CHAR(1) NULL,                   --款项状态(表码值 0:待付款,1:付款中,2:已付款)
  STORE_ID                   BIGINT NULL,                    --仓库ID(仓库档案)
  STORE_STATUS               CHAR(1) NULL,                   --库存状态(表码值 2:出库,5:入库,9:未入库)
  FLOW_ID                    BIGINT NULL,                    --当前流程ID
  EQUIP_DIARY_ID             BIGINT NULL,                    --当前流程记录ID
  PROJECT_ID                 BIGINT NULL,                    --当前项目ID
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  PROJECT_ADDRESS            VARCHAR(256) NULL,              --项目地址
  LATEST_REPAIR_DATE         SMALLDATETIME NULL,             --最近维修登记时间
  LATEST_INSPECT_DATE        DATETIME NULL,                  --最近巡检时间
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(32) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  BUSINESS_STATUS            CHAR(1) NOT NULL DEFAULT '0',   --当前业务状态(设备当前被操作的业务内容 0:待用,1:合同,2:调度,3:安装,4:检测,5:验收,6:启用,7:报停,8:使用,9:拆卸,A:入库)
  STATUS                     CHAR(1) NOT NULL,               --当前状态(表码值 0:在用,1:闲置,2:借用,4:停用,6:报废,7:遗失,9:注销)
  STATUS_DATE                SMALLDATETIME NOT NULL,         --当前状态变化日期(盘点时用)
  DEL_FLAG                   CHAR(1) NOT NULL,               --删除标识(表码值 0:删除,1:正常)
  CONSTRAINT UQ_T_EQUIPMENT1 UNIQUE (RECORD_SERIAL),
  CONSTRAINT UQ_T_EQUIPMENT2 UNIQUE (EXW_SERIAL)
);
--设备备注部件信息
CREATE TABLE T_EQUIPMENT_AFFILIATED
(
  EQUIP_AFFILIATED_ID        BIGINT IDENTITY PRIMARY KEY,
  EQUIP_ID                   BIGINT NULL,                    --设备标识
  COMPON_CATEGORY_NAME       VARCHAR(64) NULL,               --配件类别
  COMPON_GENERIC_NAME        VARCHAR(64) NULL,               --配件名称
  COMPON_SPECIFIC_NAME       VARCHAR(64) NULL,               --规格型号
  REMARK                     VARCHAR(256) NULL               --备注
);
--租赁合同(甲方合同:本方付款;乙方合同:本方收款)
CREATE TABLE T_CONTRACT_LEASE
(
  CONTRACT_ID                BIGINT IDENTITY PRIMARY KEY,
  CONTRACT_SERIAL            VARCHAR(64) NOT NULL,           --合同编号(HT-+YYYYMMDD+00)
  CONTRACT_THEME             VARCHAR(96) NOT NULL,           --合同主题
  SUBCONTRACT                CHAR(1) NOT NULL,               --合同类别(表码值 0:旧版,1:分包)
  CONTRACT_CATEGORY          VARCHAR(6) NULL,                --合同类别(表码 BM_CONTRACT_CATEGORY)
  FUND_TYPE                  CHAR(1) NOT NULL,               --款项类别(表码值 0:付款,1:收款)
  PA_ENT                     BIGINT NOT NULL,                --甲方单位/承租方(企业档案/客户档案)
  PA_MODULE                  VARCHAR(32) NOT NULL,           --甲方模块
  PA_ENT_NAME                VARCHAR(64) NOT NULL,           --甲方单位名称
  PA_ENT_LINK_MAN            VARCHAR(20) NULL,               --甲方单位联系人
  PA_ENT_LINK_TEL            VARCHAR(16) NULL,               --甲方单位联系电话
  PB_ENT                     BIGINT NOT NULL,                --乙方单位/出租方(企业档案/客户档案)
  PB_MODULE                  VARCHAR(32) NOT NULL,           --乙方模块
  PB_ENT_NAME                VARCHAR(64) NOT NULL,           --乙方单位名称
  PB_ENT_LINK_MAN            VARCHAR(20) NULL,               --乙方单位联系人
  PB_ENT_LINK_TEL            VARCHAR(16) NULL,               --乙方单位联系电话
  ENTERPRISE_SERIAL          VARCHAR(64) NULL,               --企业名录批号
  OVERALL_HEIGHT             NUMERIC(12, 2) NULL,            --建筑最大高度
  BUILDING_QUANTITY          INT NULL,                       --建筑物数
  COVER                      NUMERIC(12, 2) NULL,            --建筑面积
  SALESMAN_ID                BIGINT NULL,                    --销售人员ID(来源员工档案,计取提成的人员)
  SALESMAN                   VARCHAR(32) NULL,               --销售人员
  SALESMAN_TEL               VARCHAR(11) NULL,               --手机号
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  PROJECT_SERIAL             VARCHAR(64) NULL,               --项目编号
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  ADDRESS                    VARCHAR(256) NULL,              --项目所属地(省+市+区+街道)
  SIGNING_TIME               CHAR(10) NULL,                  --签订时间(默认当前时间)
  CONTRACT_AMOUNT            NUMERIC(12, 2) NOT NULL,        --合同金额
  SEGMENT_QTY                SMALLINT NULL,                  --总标准节加高数
  WALL_ATTACHE_QTY           SMALLINT NULL,                  --总附墙数
  DEBIT_RECEIVABLE           NUMERIC(12, 2) NOT NULL,        --应收款(合同金额-总回款额,每次有回款记录时去计算应收款)
  DEDUCT                     CHAR(1) NOT NULL,               --是否提成(表码值 0:无提成,1:有提成)
  DEDUCT_DESC                VARCHAR(64) NULL,               --提成类型
  REMARK                     VARCHAR(256) NULL,              --备注
  CONTENTS                   VARCHAR(4000) NULL,             --合同明细
  SQUARE_UP_DATE             CHAR(10) NULL,                  --预计款项结清时间
  APPLYFOR_STATE             CHAR(1) NOT NULL,               --当前状态(表码值 0:新增,1:待审核,2:待审批,3:待调度,4:待执行,5:执行中,6:完成,7:作废待审,8:作废待批,9:作废)
  EFFECTIVE                  CHAR(1) NOT NULL,               --启用标识(表码值 0:未启用,1:已启用)
  EQUIP_COUNT                SMALLINT NOT NULL,              --设备总数
  PRACTI_COUNT               SMALLINT NOT NULL,              --人员总数
  COLLECTION_RATIO           VARCHAR(2) NULL,                --计划收款比例
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(32) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --填报时间
  BARGAIN                    TEXT NULL,                      --合同内容
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--租赁设备清单
CREATE TABLE T_CONTRACT_EQUIP_BRIEF
(
  CE_BRIEF_ID                BIGINT IDENTITY PRIMARY KEY,
  CONTRACT_ID                BIGINT NOT NULL,                --合同ID
  EQUIP_CATEGORY             VARCHAR(12) NOT NULL,           --租赁设备类别(表码 BM_REPERTORY_CATEGORY)
  EQUIP_SPECIFIC_NAME        VARCHAR(64) NULL,               --租赁设备规格
  UNIT                       VARCHAR(16) NULL,               --单位
  START_DATE                 CHAR(10) NOT NULL,              --预计进场时间
  END_DATE                   CHAR(10) NULL,                  --预计退场时间
  INITIAL_HEIGHT             VARCHAR(8) NULL,                --首次安装高度
  FINAL_HEIGHT               VARCHAR(8) NULL,                --最终安装高度
  QUANTITY                   SMALLINT NOT NULL,              --数量
  RENT_STANDARD              NUMERIC(12, 2) NOT NULL,        --租金标准(读取值,表码 BM_RENT_STANDARD)
  MEASUREMENT                VARCHAR(16) NOT NULL,           --租金计量单位(读取值,表码 BM_MEASUREMENT)
  TENANCY                    SMALLINT NULL                   --租期
);
--租赁设备明细
CREATE TABLE T_CONTRACT_EQUIP
(
  CONTRACT_EQUIP_ID          BIGINT IDENTITY PRIMARY KEY,
  CONTRACT_ID                BIGINT NULL,                    --合同ID
  EQUIP_ID                   BIGINT NOT NULL,                --租赁设备(设备档案)
  RECORD_SERIAL              VARCHAR(64) NOT NULL,           --设备编号
  EQUIP_CATEGORY             VARCHAR(12) NOT NULL,           --租赁设备类别(表码 BM_REPERTORY_CATEGORY)
  EQUIP_GENERIC              VARCHAR(6) NOT NULL,            --设备名称(表码 BM_EQUIP_GENERIC)
  EQUIP_SPECIFIC             VARCHAR(6) NOT NULL,            --规格型号(表码 BM_EQUIP_SPECIFIC)
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  EXW_SERIAL                 VARCHAR(64) NULL,               --出厂编号
  PROPERTY_ENT               BIGINT NOT NULL,                --产权单位(企业档案)
  PROPERTY_NAME              VARCHAR(64) NOT NULL,           --产权单位名称
  BUILDING_NUM               VARCHAR(64) NULL,               --楼号
  START_DATE                 CHAR(10) NOT NULL,              --预计进场时间
  END_DATE                   CHAR(10) NULL,                  --预计退场时间
  INITIAL_HEIGHT             VARCHAR(8) NULL,                --首次安装高度/安装高度(m)
  FINAL_HEIGHT               VARCHAR(8) NULL,                --最终安装高度/建筑高度(m)
  RENT_STANDARD              NUMERIC(12, 2) NULL,            --租金标准(读取值,表码 BM_RENT_STANDARD)
  MEASUREMENT                VARCHAR(16) NULL,               --租金计量单位(表码 BM_MEASUREMENT)
  TENANCY                    SMALLINT NULL,                  --租期
  WALL_ATTACHE_QTY           SMALLINT NULL,                  --附墙道数<分包>
  REMARK                     VARCHAR(256) NULL               --备注<分包>
);
--租赁设备费用
CREATE TABLE T_CONTRACT_EQUIP_OUTLAY 
(
  CONTRACT_EQUIPOUTLAY_ID    BIGINT IDENTITY PRIMARY KEY,
  CONTRACT_ID                BIGINT NOT NULL,                --租赁合同ID
  EQUIP_ID                   BIGINT NOT NULL,                --租赁设备(设备档案)
  EQUIP_CATEGORY             VARCHAR(12) NOT NULL,           --租赁设备类别(表码 BM_REPERTORY_CATEGORY)
  EQUIP_GENERIC              VARCHAR(6) NOT NULL,            --设备名称(表码 BM_EQUIP_GENERIC)
  EQUIP_SPECIFIC             VARCHAR(6) NOT NULL,            --规格型号(表码 BM_EQUIP_SPECIFIC)
  EQUIP_VENDER               VARCHAR(64) NOT NULL,           --品牌
  QUANTITY                   INT NULL,                       --数量
  EMPLOY_OUTLAY              NUMERIC(12, 2) NULL,            --机械使用费用(元/月/台)
  INSTALL_OUTLAY             NUMERIC(12, 2) NULL,            --安装进场费(元/次/台)
  DISMANTLE_OUTLAY           NUMERIC(12, 2) NULL,            --拆卸退场费(元/次/台)
  MANT_OUTLAY                NUMERIC(12, 2) NULL,            --维护保养费(元/月/台)
  SUMMARY                    NUMERIC(12, 2) NOT NULL         --小计
);
--租赁设备费用
CREATE TABLE T_CONTRACT_EQUIP_COST 
(
  CONTRACT_EQUIPCOST_ID      BIGINT IDENTITY PRIMARY KEY,
  CONTRACT_ID                BIGINT NOT NULL,                --租赁合同ID
  EQUIP_ID                   BIGINT NOT NULL,                --租赁设备(设备档案)
  EQUIP_CATEGORY             VARCHAR(12) NOT NULL,           --租赁设备类别(表码 BM_REPERTORY_CATEGORY)
  EQUIP_GENERIC              VARCHAR(6) NOT NULL,            --设备名称(表码 BM_EQUIP_GENERIC)
  EQUIP_SPECIFIC             VARCHAR(6) NOT NULL,            --规格型号(表码 BM_EQUIP_SPECIFIC)
  QUANTITY                   INT NULL,                       --数量
  EMBEDDED_COST              NUMERIC(12, 2) NULL,            --机械预埋件(元/套)
  LIFTING_COST               NUMERIC(12, 2) NULL,            --顶升加节费(元/节)
  ANCHOR_COST                NUMERIC(12, 2) NULL,            --锚固费(元/套)
  EXTRA_COST                 NUMERIC(12, 2) NULL,            --特殊按拆设备费
  SUMMARY                    NUMERIC(12, 2) NOT NULL         --小计
);
--租赁人员清单
CREATE TABLE T_CONTRACT_PRACTI_BRIEF
(
  CP_BRIEF_ID                BIGINT IDENTITY PRIMARY KEY,
  CONTRACT_ID                BIGINT NOT NULL,                --合同ID
  KIND_WORK                  VARCHAR(6) NOT NULL,            --从业工种(表码 BM_KIND_WORK)
  QUANTITY                   SMALLINT NOT NULL,              --人数
  START_DATE                 CHAR(10) NULL,                  --预计进场时间
  END_DATE                   CHAR(10) NULL,                  --工作结束时间
  EXPENSE                    NUMERIC(12, 2) NOT NULL,        --费用标准
  MEASUREMENT                VARCHAR(16) NULL,               --租金计量单位(表码 BM_MEASUREMENT)
  SUMMARY                    NUMERIC(12, 2) NULL,            --工资小计(元)
  REMARK                     VARCHAR(128) NULL               --备注
);
--租赁项目清单
CREATE TABLE T_CONTRACT_COSTITEM
(
  COSTITEM_ID                BIGINT IDENTITY PRIMARY KEY,
  CONTRACT_ID                BIGINT NOT NULL,                --合同ID
  COSTITEM_NAME              VARCHAR(64) NOT NULL,           --费用项目(表码 BM_CONTRACT_COSTITEM)
  QUANTITY                   SMALLINT NOT NULL,              --数量
  EXPENSE                    NUMERIC(12, 2) NOT NULL,        --费用标准
  MEASUREMENT                VARCHAR(16) NOT NULL            --租金计量单位(表码 BM_MEASUREMENT)
);
--合同结算
CREATE TABLE T_SETTLE_CONTRACT
(
  SETTLE_ID                  BIGINT IDENTITY PRIMARY KEY,
  SETTLE_SERIAL              VARCHAR(64) NOT NULL,           --结算单号
  SETTLE_THEME               VARCHAR(96) NOT NULL,           --结算主题
  CONTRACT_ID                BIGINT NOT NULL,                --合同ID
  CONTRACT_SERIAL            VARCHAR(64) NOT NULL,           --合同编号
  CONTRACT_THEME             VARCHAR(96) NOT NULL,           --合同主题
  PA_ENT                     BIGINT NOT NULL,                --承租/甲方单位(企业档案/客户档案)
  PA_MODULE                  VARCHAR(32) NOT NULL,           --承租/甲方模块
  PA_ENT_NAME                VARCHAR(64) NOT NULL,           --承租/甲方单位名称
  PB_ENT                     BIGINT NOT NULL,                --出租/乙方单位(企业档案/客户档案)
  PB_MODULE                  VARCHAR(32) NOT NULL,           --出租/乙方模块
  PB_ENT_NAME                VARCHAR(64) NOT NULL,           --出租/乙方单位名称
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  PROJECT_SERIAL             VARCHAR(64) NULL,               --项目编号
  PROJECT_NAME               VARCHAR(64) NOT NULL,           --项目名称
  ADDRESS                    VARCHAR(256) NULL,              --项目所属地(省+市+区+街道)
  SITES_PRINCIPAL            VARCHAR(64) NULL,               --工地负责人
  START_SETTLE_DATE          CHAR(10) NOT NULL,              --结算起始时间
  END_SETTLE_DATE            CHAR(10) NOT NULL,              --结算结束时间
  SETTLE_AMOUNT              NUMERIC(12, 2) NOT NULL,        --结算总金额
  FINISHED_AMOUNT            NUMERIC(12, 2) NOT NULL,        --完成金额
  TAX_AMOUNT                 NUMERIC(12, 2) NULL,            --税金
  TAX_RATE                   NUMERIC(12, 3) NULL,            --税率
  FUND_STATUS                CHAR(1) NOT NULL,               --款项状态(表码值 0:待付款,1:付款中,2:已付款,5:待回款,6:回款中,7:已回款)
  FUND_TYPE                  CHAR(1) NOT NULL,               --款项类别(表码值 0:付款,1:收款)
  EFFECTIVE                  CHAR(1) NOT NULL,               --生效标识(表码值 0:未生效,1:生效)
  REMARK                     VARCHAR(256) NULL,              --备注
  COLLECTION_RATIO           VARCHAR(2) NULL,                --计划收款比例
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(32) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --填报时间
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--结算设备清单
CREATE TABLE T_SETTLE_EQUIP_BRIEF
(
  SE_BRIEF_ID                BIGINT IDENTITY PRIMARY KEY,
  SETTLE_ID                  BIGINT NOT NULL,                --结算ID
  EQUIP_DIARY_ID             BIGINT NULL,                    --设备日历ID
  EQUIP_ID                   BIGINT NULL,                    --租赁设备(设备档案)
  RECORD_SERIAL              VARCHAR(64) NULL,               --设备编号
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  EXW_SERIAL                 VARCHAR(64) NULL,               --出厂编号
  EQUIP_CATEGORY_NAME        VARCHAR(64) NOT NULL,           --设备类别/品名(引用表码 BM_REPERTORY_CATEGORY)
  EQUIP_SPECIFIC_NAME        VARCHAR(64) NOT NULL,           --规格型号(引用表码 BM_EQUIP_SPECIFIC)
  BUILDING_NUM               VARCHAR(64) NULL,               --楼号
  UNIT                       VARCHAR(16) NOT NULL,           --单位
  START_SETTLE_DATE          CHAR(10) NOT NULL,              --启用日
  END_SETTLE_DATE            CHAR(10) NOT NULL,              --截止日
  SETTLE_DAYS                SMALLINT NOT NULL,              --计费天数
  RENT_STANDARD              NUMERIC(12, 2) NOT NULL,        --租金标准
  MEASUREMENT                VARCHAR(6) NOT NULL,            --租金单位
  QUANTITY                   SMALLINT NOT NULL,              --租赁数量
  DAYS_RENT                  NUMERIC(12, 3) NOT NULL,        --日租金
  DEDUCT_RENT                NUMERIC(12, 2) NOT NULL,        --应扣租金
  SUMMARY                    NUMERIC(12, 2) NOT NULL,        --租金累计
  REMARK                     VARCHAR(256) NULL               --备注
);
--结算零配件清单
CREATE TABLE T_SETTLE_COMPON_BRIEF
(
  SC_BRIEF_ID                BIGINT IDENTITY PRIMARY KEY,
  SETTLE_ID                  BIGINT NOT NULL,                --结算ID
  COMPON_DIARY_ID            BIGINT NULL,                    --零配件日历ID
  COMPON_ID                  BIGINT NULL,                    --租赁零配件(零配件档案)
  COMPON_SERIAL              VARCHAR(64) NULL,               --零配件编号
  COMPON_CATEGORY_NAME       VARCHAR(64) NOT NULL,           --设备类别/品名(引用表码 BM_REPERTORY_CATEGORY)
  COMPON_SPECIFIC_NAME       VARCHAR(64) NULL,               --设备型号(引用表码 BM_COMPONENT_SPECIFIC)
  BUILDING_NUM               VARCHAR(64) NULL,               --楼号
  UNIT                       VARCHAR(16) NOT NULL,           --单位
  START_SETTLE_DATE          CHAR(10) NOT NULL,              --启用日
  END_SETTLE_DATE            CHAR(10) NOT NULL,              --截止日
  SETTLE_DAYS                SMALLINT NOT NULL,              --计费天数
  RENT_STANDARD              NUMERIC(12, 2) NOT NULL,        --租金标准
  MEASUREMENT                VARCHAR(6) NOT NULL,            --租金单位
  QUANTITY                   SMALLINT NOT NULL,              --租赁数量
  DAYS_RENT                  NUMERIC(12, 3) NOT NULL,        --日租金
  DEDUCT_RENT                NUMERIC(12, 2) NOT NULL,        --应扣租金
  SUMMARY                    NUMERIC(12, 2) NOT NULL,        --租金累计
  EQUIP_ID                   BIGINT NULL,                    --租赁设备(设备档案)
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  REMARK                     VARCHAR(256) NULL               --备注
);
--结算其他费用清单
CREATE TABLE T_SETTLE_ITEM_BRIEF
(
  SI_BRIEF_ID                BIGINT IDENTITY PRIMARY KEY,
  SETTLE_ID                  BIGINT NOT NULL,                --结算ID
  BUILDING_NUM               VARCHAR(64) NULL,               --楼号
  SETTLE_ITEM_NAME           VARCHAR(64) NOT NULL,           --费用项目
  QUANTITY                   SMALLINT NOT NULL,              --数量
  UNITPRICE                  NUMERIC(12, 3) NOT NULL,        --费用单价
  MEASUREMENT                VARCHAR(16) NOT NULL,           --租金计量单位(表码 BM_MEASUREMENT)
  DEDUCT_RENT                NUMERIC(12, 2) NOT NULL,        --应扣租金
  ITEM_CUMULATE              NUMERIC(12, 2) NOT NULL,        --费用累计
  SUMMARY                    NUMERIC(12, 2) NOT NULL,        --租金累计
  EQUIP_ID                   BIGINT NULL,                    --租赁设备(设备档案)
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  REMARK                     VARCHAR(256) NULL               --备注
);
--调度信息表
CREATE TABLE T_DISPATCH
(
  DISPATCH_ID                BIGINT IDENTITY PRIMARY KEY,
  DISPATCH_SERIAL            VARCHAR(64) NOT NULL,           --调度单号(DD+YYYYMMDD+00)
  DISPATCH_THEME             VARCHAR(96) NOT NULL,           --调度主题
  RELATE_ID                  BIGINT NOT NULL,                --关联业务(来源合同管理/安装管理/使用管理/拆卸管理)
  RELATE_SERIAL              VARCHAR(64) NOT NULL,           --关联业务编号
  RELATE_THEME               VARCHAR(96) NOT NULL,           --关联业务主题
  RELATE_MODULE              VARCHAR(32) NOT NULL,           --关联业务模块
  START_PLAN_DATE            CHAR(10) NOT NULL,              --计划进场时间
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  PROJECT_SERIAL             VARCHAR(64) NULL,               --项目编号
  PROJECT_NAME               VARCHAR(64) NOT NULL,           --项目名称
  ADDRESS                    VARCHAR(256) NULL,              --项目所属地(省+市+区+街道)
  PROJECT_MANAGER            VARCHAR(32) NULL,               --承租单位负责人
  ENT_MANAGER                VARCHAR(32) NULL,               --公司负责人
  TEAMS                      VARCHAR(32) NULL,               --班组名称
  PRACTI_ID                  BIGINT NULL,                    --班组负责人ID
  PRACTI_NAME                VARCHAR(32) NULL,               --班组负责人
  DELIVERY_ENT_ID            BIGINT NULL,                    --出货单位(数据来源企业档案)
  DELIVERY_ENT_NAME          VARCHAR(64) NULL,               --出货单位
  DELIVERY_ADDRESS           VARCHAR(128) NULL,              --出货地址
  RECEIVE_ENT_ID             BIGINT NULL,                    --承租单位(数据来源客户档案)
  RECEIVE_ENT_NAME           VARCHAR(64) NULL,               --承租单位
  RECEIVE_ADDRESS            VARCHAR(128) NULL,              --收货地址
  AUTOCRANE_AMOUNT           NUMERIC(12, 2) NOT NULL,        --应付汽吊费总计
  FUND_STATUS                CHAR(1) NOT NULL,               --款项状态(表码值 0:待付款-初始,2:已付款-付款管理中有关联这条运输数据,且审批通过)
  REMARK                     VARCHAR(256) NULL,              --调度备注
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  EXW_SERIAL                 VARCHAR(64) NULL,               --出厂编号
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(32) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  AUTOCRANE_DEPEND           VARCHAR(6) NULL,                --汽车吊所属单位(表码 AUTOCRANE_DEPEND)
  PROVIDED_DATE              CHAR(10) NOT NULL,              --填报时间
  APPLYFOR_STATE             CHAR(1) NOT NULL,               --申请状态(表码值 0:待提交,1:待受理,2:待审批,3:通过,4:否决,5:完成)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--调度设备表
CREATE TABLE T_DISPATCH_EQUIP
(
  DISPATCH_EQUIP_ID          BIGINT IDENTITY PRIMARY KEY,
  DISPATCH_ID                BIGINT NOT NULL,                --调度ID
  EQUIP_ID                   BIGINT NOT NULL,                --租赁设备(设备档案)
  BUILDING_NUM               VARCHAR(64) NULL,               --楼号
  START_DATE                 SMALLDATETIME NOT NULL,         --预计开始时间
  END_DATE                   SMALLDATETIME NOT NULL,         --预计结束时间
  INSTALL_HEIGHT             NUMERIC(12, 2) NULL,            --安装高度
  WORK_STATUS                CHAR(1) NOT NULL                --调配执行表码值 0:未安装,1:在使用,2:已拆卸)
);
--调度零配件表
CREATE TABLE T_DISPATCH_COMPON
(
  DISPATCH_COMPON_ID         BIGINT IDENTITY PRIMARY KEY,
  DISPATCH_ID                BIGINT NOT NULL,                --调度ID
  COMPON_ID                  BIGINT NOT NULL,                --零配件(零配件档案)
  START_DATE                 SMALLDATETIME NOT NULL,         --预计开始时间
  COUNTS                     SMALLINT NOT NULL,              --调度数量
  WORK_STATUS                CHAR(1) NOT NULL                --调配执行(表码值 0:未调配,1:已调配出库)
);
--调度人员表
CREATE TABLE T_DISPATCH_PRACTI
(
  DISPATCH_PRACTI_ID         BIGINT IDENTITY PRIMARY KEY,
  DISPATCH_ID                BIGINT NOT NULL,                --调度ID
  PRACTI_ID                  BIGINT NOT NULL,                --企业人员(企业人员档案)
  START_DATE                 SMALLDATETIME NOT NULL          --预计进场时间
);
--调度汽车吊
CREATE TABLE T_DISPATCH_AUTOCRANE
(
  DISPATCH_AUTOCRANE_ID      BIGINT IDENTITY PRIMARY KEY,
  DISPATCH_ID                BIGINT NOT NULL,                --调度ID
  SPECIFIC_NAME              VARCHAR(64) NULL,               --型号
  RENT_STANDARD              NUMERIC(12, 2) NOT NULL,        --单价
  QUANTITY                   SMALLINT NOT NULL,              --数量
  MACHINE_TEAM               VARCHAR(64) NULL,               --台班
  SUMMARY                    NUMERIC(12, 2) NOT NULL,        --合计
  ACCOUNT_ID                 BIGINT NULL,                    --核算标识
  REMARK                     VARCHAR(256) NULL               --备注
);
--配货清单
CREATE TABLE T_DISPATCH_ALLOCATE
(
  DISPATCH_ALLOCATE_ID       BIGINT IDENTITY PRIMARY KEY,
  DISPATCH_ID                BIGINT NULL,                    --调度ID
  ALLOCATE_TYPE              CHAR(1) NOT NULL,               --类型(表码值 T:塔吊,S:升降机)
  COMPON_GENERIC_NAME        VARCHAR(64) NULL,               --配件名称
  CALCULATE                  VARCHAR(8) NULL,                --单位
  QUANTITY                   SMALLINT NULL,                  --数量
  DEFECTIVE                  VARCHAR(16) NULL,               --欠工地
  REISSUE                    VARCHAR(16) NULL,               --配货
  VERIFY                     VARCHAR(16) NULL,               --核对
  SPECIFICATION              VARCHAR(16) NULL,               --规格
  REMARK                     VARCHAR(256) NULL               --备注
);
--物流运输
CREATE TABLE T_LOGISTICS_TRANSPORT
(
  TRANSPORT_ID               BIGINT IDENTITY PRIMARY KEY,
  TRANSPORT_SERIAL           VARCHAR(64) NULL,               --物流单号
  TRANSPORT_THEME            VARCHAR(96) NOT NULL,           --物流运输主题
  BATCH_NUMBER               VARCHAR(32) NULL,               --批次号
  DELIVERY_DATE              CHAR(10) NOT NULL,              --发货时间
  DELIVERY_MAN               VARCHAR(64) NOT NULL,           --发货人(默认为登陆用户的姓名,仍可修改)
  DELIVERY_PHONE             VARCHAR(16) NULL,               --发货人联系电话(默认为登陆用户的手机号,仍可修改)
  DELIVERY_ENT_ID            BIGINT NULL,                    --发货单位ID
  DELIVERY_ENT_NAME          VARCHAR(64) NULL,               --发货单位
  EXPECTED_ARRIVE_DATE       CHAR(10) NOT NULL,              --预计到达时间
  RECEIVE_MAN                VARCHAR(64) NULL,               --接货人
  RECEIVE_PHONE              VARCHAR(16) NULL,               --接货人联系电话
  RECEIVE_ENT_ID             BIGINT NULL,                    --接货单位ID
  RECEIVE_ENT_NAME           VARCHAR(64) NULL,               --接货单位  
  MATERIAL_PARK              VARCHAR(256) NULL,              --停放地
  TRANSPORT_AMOUNT           NUMERIC(12, 2) NOT NULL,        --运输费
  PROJECT_ID                 BIGINT NOT NULL,                --项目ID(项目档案)
  PROJECT_SERIAL             VARCHAR(64) NOT NULL,           --项目编号
  PROJECT_NAME               VARCHAR(64) NOT NULL,           --项目名称
  ADDRESS                    VARCHAR(256) NOT NULL,          --收货地址(默认为项目地址,仍可修改)
  EQUIP_ID                   BIGINT NULL,                    --备案编号
  KNOT_COUNTS                SMALLINT NULL,                  --标准节数
  STRENGTHEN_COUNTS          SMALLINT NULL,                  --加强节数
  KNOT_BOLT_COUNTS           SMALLINT NULL,                  --标准节螺栓数
  WALL_ATTACHE_QTY           SMALLINT NULL,                  --附墙数
  PROJECT_PRINCIPAL          VARCHAR(64) NULL,               --项目负责人
  FINISHED_AMOUNT            NUMERIC(12, 2) NOT NULL,        --已付金额
  REMAINDER_AMOUNT           NUMERIC(12, 2) NOT NULL,        --未付金额
  SIGN_MAN                   VARCHAR(64) NULL,               --签收人
  SIGN_DATE                  CHAR(10) NULL,                  --签收时间
  SIGN_RESULT                VARCHAR(512) NULL,              --签收结果
  AUTOCRANE_DEPEND           VARCHAR(6) NULL,                --汽车吊所属单位(表码 AUTOCRANE_DEPEND)
  TRANSPORT_ENT_NAME         VARCHAR(64) NULL,               --运输单位
  TRANSPORT_CONTACT_TEL      VARCHAR(16) NULL,               --运输单位联系电话
  TRANSPORT_BANK_DEPOSIT     VARCHAR(64) NULL,               --开户行
  TRANSPORT_BANK_ACCOUNT     VARCHAR(32) NULL,               --银行账号
  KILOMETERS                 VARCHAR(16) NULL,               --公里数
  SUMMARY                    NUMERIC(12, 2) NULL,            --费用合计
  REMARK                     VARCHAR(512) NULL,              --备注
  STATUS                     CHAR(1) NOT NULL,               --状态(表码值 0:发货中-保存后未签收的状态,1:已签收-点了已签收的物流单)
  FUND_STATUS                CHAR(1) NOT NULL,               --款项状态(表码值 0:待付款-初始,2:已付款-付款管理中有关联这条运输数据,且审批通过)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--物流运输清单
CREATE TABLE T_LOGISTICS_TRANDETAIL
(
  TRANDETAIL_ID              BIGINT IDENTITY PRIMARY KEY,
  TRANSPORT_ID               BIGINT NULL,                    --物流运输ID
  DISPATCH_ID                BIGINT NOT NULL,                --调度信息(只能显示该项目下的调度单)
  DISPATCH_SERIAL            VARCHAR(64) NOT NULL,           --调度单号
  DISPATCH_THEME             VARCHAR(96) NOT NULL,           --调度主题
  CAR_ID                     BIGINT NULL,                    --运输车辆
  LICENSE_PLATE              VARCHAR(16) NOT NULL,           --车号(来源车辆档案,用户也可手动输入)
  DRIVER                     VARCHAR(64) NULL,               --司机(默认车辆档案中信息,仍可修改)
  DRIVER_PHONE               VARCHAR(16) NULL,               --司机联系电话(同前面)
  DISPATCH_COMPON_ID         BIGINT NOT NULL,                --调度零配件ID
  COUNTS                     SMALLINT NOT NULL,              --运输数量
  SIGN_COUNTS                SMALLINT NOT NULL,              --签收数量
  REMARK                     VARCHAR(512) NULL               --备注
);
--物流运输运输费清单
CREATE TABLE T_LOGISTICS_TRANCARFEE
(
  TRANCARFEE_ID              BIGINT IDENTITY PRIMARY KEY,
  TRANSPORT_ID               BIGINT NULL,                    --物流运输ID
  CAR_ID                     BIGINT NULL,                    --运输车辆
  LICENSE_PLATE              VARCHAR(16) NULL,               --车号(来源车辆档案,用户也可手动输入)
  SEDAN                      VARCHAR(32) NULL,               --车型
  MOTORCOACH                 VARCHAR(32) NULL,               --车次台班
  UNIT_PRICE                 NUMERIC(12, 2) NULL,            --单价
  PROPERTY_NAME              VARCHAR(64) NULL,               --产权归属
  AMOUNT                     NUMERIC(12, 2) NOT NULL,        --费用
  REMARK                     VARCHAR(512) NULL               --备注
);
--物流回场
CREATE TABLE T_LOGISTICS_BACKSPORT
(
  BACKSPORT_ID               BIGINT IDENTITY PRIMARY KEY,
  BACKSPORT_SERIAL           VARCHAR(64) NULL,               --物流单号
  BACKSPORT_THEME            VARCHAR(96) NOT NULL,           --物流运输主题
  BATCH_NUMBER               VARCHAR(32) NULL,               --批次号
  DELIVERY_DATE              CHAR(10) NOT NULL,              --发货时间
  EXPECTED_ARRIVE_DATE       CHAR(10) NOT NULL,              --预计到达时间
  DELIVERY_MAN               VARCHAR(64) NOT NULL,           --发货人(默认为登陆用户的姓名,仍可修改)
  DELIVERY_PHONE             VARCHAR(16) NULL,               --发货人联系电话(默认为登陆用户的手机号,仍可修改)
  RECEIVE_MAN                VARCHAR(64) NULL,               --接货人
  RECEIVE_PHONE              VARCHAR(16) NULL,               --接货人联系电话
  MATERIAL_PARK              VARCHAR(256) NULL,              --停放地
  BACKSPORT_AMOUNT           NUMERIC(12, 2) NOT NULL,        --运输费
  PROJECT_ID                 BIGINT NOT NULL,                --项目ID(项目档案)
  PROJECT_SERIAL             VARCHAR(64) NOT NULL,           --项目编号
  PROJECT_NAME               VARCHAR(64) NOT NULL,           --项目名称
  ADDRESS                    VARCHAR(256) NOT NULL,          --收货地址(默认为项目地址,仍可修改)
  EQUIP_ID                   BIGINT NULL,                    --备案编号
  KNOT_COUNTS                SMALLINT NULL,                  --标准节数
  STRENGTHEN_COUNTS          SMALLINT NULL,                  --加强节数
  KNOT_BOLT_COUNTS           SMALLINT NULL,                  --标准节螺栓数
  WALL_ATTACHE_QTY           SMALLINT NULL,                  --附墙数
  PROJECT_PRINCIPAL          VARCHAR(64) NULL,               --项目负责人
  FINISHED_AMOUNT            NUMERIC(12, 2) NOT NULL,        --已付金额
  REMAINDER_AMOUNT           NUMERIC(12, 2) NOT NULL,        --未付金额
  SIGN_MAN                   VARCHAR(64) NULL,               --签收人
  SIGN_DATE                  CHAR(10) NULL,                  --签收时间
  SIGN_RESULT                VARCHAR(512) NULL,              --签收结果
  AUTOCRANE_DEPEND           VARCHAR(6) NULL,                --汽车吊所属单位(表码 AUTOCRANE_DEPEND)
  KILOMETERS                 VARCHAR(16) NULL,               --公里数
  SUMMARY                    NUMERIC(12, 2) NULL,            --费用合计
  BACKSPORT_ENT_NAME         VARCHAR(64) NULL,               --运输单位
  BACKSPORT_CONTACT_TEL      VARCHAR(16) NULL,               --运输单位联系电话
  BACKSPORT_BANK_DEPOSIT     VARCHAR(64) NULL,               --开户行
  BACKSPORT_BANK_ACCOUNT     VARCHAR(32) NULL,               --银行账号
  REMARK                     VARCHAR(512) NULL,              --备注
  STATUS                     CHAR(1) NOT NULL,               --状态(表码值 0:发货中-保存后未签收的状态,1:已签收-点了已签收的物流单)
  FUND_STATUS                CHAR(1) NOT NULL,               --款项状态(表码值 0:待付款-初始,2:已付款-付款管理中有关联这条运输数据,且审批通过)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--物流回场清单
CREATE TABLE T_LOGISTICS_BACKDETAIL
(
  BACKDETAIL_ID              BIGINT IDENTITY PRIMARY KEY,
  BACKSPORT_ID               BIGINT NOT NULL,                --物流回场ID
  CAR_ID                     BIGINT NULL,                    --运输车辆
  LICENSE_PLATE              VARCHAR(16) NOT NULL,           --车号(来源车辆档案,用户也可手动输入)
  DRIVER                     VARCHAR(64) NULL,               --司机(默认车辆档案中信息,仍可修改)
  DRIVER_PHONE               VARCHAR(16) NULL,               --司机联系电话(同前面)
  COMPON_DIARY_ID            BIGINT NOT NULL,                --零配件调配ID
  COUNTS                     SMALLINT NOT NULL,              --运输数量
  REMARK                     VARCHAR(512) NULL               --备注
);
--物流回场运输费清单
CREATE TABLE T_LOGISTICS_BACKCARFEE
(
  BACKCARFEE_ID              BIGINT IDENTITY PRIMARY KEY,
  BACKSPORT_ID               BIGINT NULL,                    --物流回场ID
  CAR_ID                     BIGINT NULL,                    --运输车辆
  LICENSE_PLATE              VARCHAR(16) NULL,               --车号(来源车辆档案,用户也可手动输入)
  MOTORCOACH                 VARCHAR(32) NULL,               --车次台班
  UNIT_PRICE                 NUMERIC(12, 2) NULL,            --单价
  SEDAN                      VARCHAR(32) NULL,               --车型
  PROPERTY_NAME              VARCHAR(64) NULL,               --产权归属
  AMOUNT                     NUMERIC(12, 2) NOT NULL,        --费用
  REMARK                     VARCHAR(512) NULL               --备注
);
--设备日历表
CREATE TABLE T_EQUIPMENT_DIARY
(
  EQUIP_DIARY_ID             BIGINT IDENTITY PRIMARY KEY,
  EQUIP_ID                   BIGINT NOT NULL,                --设备信息ID
  RECORD_SERIAL              VARCHAR(64) NOT NULL,           --设备编号
  EQUIP_CATEGORY             VARCHAR(12) NOT NULL,           --设备类别(表码 BM_REPERTORY_CATEGORY)
  EQUIP_GENERIC              VARCHAR(6) NOT NULL,            --设备名称(表码 BM_EQUIP_GENERIC)
  EQUIP_SPECIFIC             VARCHAR(6) NOT NULL,            --规格型号(表码 BM_EQUIP_SPECIFIC)
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  RFID_CODE                  VARCHAR(64) NULL,               --RFID号
  EXW_SERIAL                 VARCHAR(64) NULL,               --出厂编号
  EXW_DATE                   CHAR(10) NULL,                  --出厂日期
  EQUIP_VENDER               VARCHAR(128) NULL,              --制造厂家
  PROPERTY_ENT               BIGINT NOT NULL,                --产权单位(企业档案)
  PROPERTY_NAME              VARCHAR(64) NOT NULL,           --产权单位名称
  STORE_ID                   BIGINT NULL,                    --仓库ID(仓库档案)
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  PROJECT_SERIAL             VARCHAR(64) NULL,               --项目编号
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  PROVINCE                   CHAR(6) NULL,                   --项目所属地区-省(编码)
  CITY                       CHAR(6) NULL,                   --项目所属地区-市(编码)
  COUNTY                     CHAR(6) NULL,                   --项目所属地区-区(编码)
  STREET                     VARCHAR(128) NULL,              --项目所属地区-街道
  ADDRESS                    VARCHAR(256) NULL,              --项目所属地(省+市+区+街道)
  BUILDING_NUM               VARCHAR(64) NULL,               --楼号
  CONTRACT_ID                BIGINT NULL,                    --合同ID(合同信息)
  PA_ENT_NAME                VARCHAR(64) NULL,               --甲方(承租方)单位名称
  FLOW_ID                    BIGINT NULL,                    --调度设备流程ID
  BUSINESS_ID                BIGINT NOT NULL,                --关联业务(来源调度管理/借用管理)
  BUSINESS_SERIAL            VARCHAR(64) NOT NULL,           --关联业务编号
  BUSINESS_THEME             VARCHAR(96) NULL,               --关联业务主题
  BUSINESS_MODULE            VARCHAR(32) NOT NULL,           --关联业务模块
  BUSINESS_EQUIP_ID          BIGINT NOT NULL,                --关联业务中设备信息ID
  RELATE_ID                  BIGINT NOT NULL,                --当前业务(来源安装管理/使用管理/拆卸管理)
  RELATE_SERIAL              VARCHAR(64) NOT NULL,           --当前业务编号
  RELATE_THEME               VARCHAR(96) NULL,               --当前业务主题
  RELATE_MODULE              VARCHAR(32) NOT NULL,           --当前业务模块
  START_DATE                 SMALLDATETIME NULL,             --进场日期
  END_DATE                   SMALLDATETIME NULL,             --退场日期
  ACTIVATE_DATE              CHAR(10) NULL,                  --启用日期
  LAST_SETTLE_DATE           CHAR(10) NULL,                  --最近结算截止日期
  LAST_BLOCKUP_DATE          CHAR(10) NULL,                  --最近停用时间
  VERIFY_TYPE                CHAR(1) NULL,                   --检测类型(表码值 T:塔式类型,S:升降机类型)
  STATUS                     CHAR(1) NOT NULL,               --库存状态(表码值 0:待出库<提交>,1:出库中<审批通过>,2:已出库<物流运输>,5:已入库)
  ACTIVE                     CHAR(1) NOT NULL                --激活任务(表码值 0:未激活,1:激活)
);
--零配件日历表
CREATE TABLE T_COMPONENT_DIARY
(
  COMPON_DIARY_ID            BIGINT IDENTITY PRIMARY KEY,
  COMPON_ID                  BIGINT NOT NULL,                --零配件(零配件档案)
  COMPON_SERIAL              VARCHAR(64) NOT NULL,           --零配件编号
  COMPON_CATEGORY            VARCHAR(12) NOT NULL,           --零配件类别(表码 BM_REPERTORY_CATEGORY)
  COMPON_GENERIC             VARCHAR(6) NOT NULL,            --零配件名称(表码 BM_COMPONENT_GENERIC)
  COMPON_SPECIFIC            VARCHAR(6) NULL,                --设备型号(表码 BM_COMPONENT_SPECIFIC)
  DIMENSIONS                 VARCHAR(64) NULL,               --规格特征
  CALCULATE                  VARCHAR(8) NOT NULL,            --计量单位
  RFID_CODE                  VARCHAR(64) NULL,               --RFID号
  CONSUME_FLAG               CHAR(1) NOT NULL,               --易耗品标识(表码值 0:非易耗品,1:易耗品)
  PARACHUTE_FLAG             CHAR(1) NOT NULL,               --防坠器标识(表码值 0:非防坠器,1:防坠器)
  WALL_ATTACHE_FLAG          CHAR(1) NOT NULL,               --附墙标识(表码值 0:非附墙,1:附墙)
  KNOT_FLAG                  CHAR(1) NOT NULL,               --标准节标识(表码值 0:非标准节,1:标准节)
  KNOT_METRIC                NUMERIC(12, 2) NULL,            --标准节长度
  BRACHIUM                   NUMERIC(12, 2) NULL,            --臂长
  STORE_ID                   BIGINT NULL,                    --仓库ID(仓库档案)
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  PROJECT_SERIAL             VARCHAR(64) NULL,               --项目编号
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  ADDRESS                    VARCHAR(256) NULL,              --项目所属地(省+市+区+街道)
  CONTRACT_ID                BIGINT NULL,                    --合同ID(合同信息)
  FLOW_ID                    BIGINT NULL,                    --调度设备流程ID
  BUSINESS_ID                BIGINT NOT NULL,                --关联业务(来源调度管理/借用管理/领用管理)
  BUSINESS_SERIAL            VARCHAR(64) NOT NULL,           --关联业务编号
  BUSINESS_THEME             VARCHAR(96) NULL,               --关联业务主题
  BUSINESS_MODULE            VARCHAR(32) NOT NULL,           --关联业务模块
  BUSINESS_COMPON_ID         BIGINT NOT NULL,                --关联业务中设备信息ID
  RELATE_ID                  BIGINT NOT NULL,                --当前业务(来源安装管理/使用管理/拆卸管理)
  RELATE_SERIAL              VARCHAR(64) NOT NULL,           --当前业务编号
  RELATE_THEME               VARCHAR(96) NULL,               --当前业务主题
  RELATE_MODULE              VARCHAR(32) NOT NULL,           --当前业务模块
  COUNTS                     SMALLINT NOT NULL,              --调配数量
  START_DATE                 SMALLDATETIME NULL,             --开始时间
  END_DATE                   SMALLDATETIME NULL,             --结束日期
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  DISPATCH_USER_NAME         VARCHAR(32) NULL,               --调度人
  WAREHOUSE_COUNTS           SMALLINT NOT NULL,              --已核实回场数量
  BACKSPORT_COUNTS           SMALLINT NOT NULL,              --回场数量
  BACKSPORT_STATUS           CHAR(1) NOT NULL,               --回场状态(表码值 0:待回场,1:回场中,2:已回场)
  STATUS                     CHAR(1) NOT NULL,               --状态(表码值 0:待出库,1:出库中,2:已出库,5:已入库,6:报废,7:遗失,8:转场)
  ACTIVE                     CHAR(1) NOT NULL,               --激活任务(表码值 0:未激活,1:激活)
  JACKING_PRACTI_ID          BIGINT NULL,                    --顶升班组负责人ID
  JACKING_PRACTI_NAME        VARCHAR(32) NULL,               --顶升班组负责人
  JACKING_TEAMS              VARCHAR(32) NULL,               --顶升班组
  JACKING_COUNTS             SMALLINT NOT NULL,              --顶升数量
  JACKING_STAUTS             CHAR(1) NULL,                   --顶升状态(0:待安装,1:首次安装,2:顶升)
  JACKING_DATE               SMALLDATETIME NULL,             --顶升时间
  JACKING_ACCOUNT_ID         BIGINT NULL,                    --顶升核算标识
  DISMANTLE_PRACTI_ID        BIGINT NULL,                    --拆卸班组负责人ID
  DISMANTLE_PRACTI_NAME      VARCHAR(32) NULL,               --拆卸班组负责人
  DISMANTLE_TEAMS            VARCHAR(32) NULL,               --拆卸班组
  DISMANTLE_DATE             SMALLDATETIME NULL,             --拆卸时间
  DISMANTLE_COUNTS           SMALLINT NOT NULL,              --拆卸数量
  DISMANTLE_ACCOUNT_ID       BIGINT NULL,                    --拆卸核算标识
  DISMANTLE_STAUTS           CHAR(1) NULL                    --拆卸状态(0:待拆卸,3:已拆卸)  
);
--人员日历表
CREATE TABLE T_PRACTI_DIARY
(
  PRACTI_DIARY_ID            BIGINT IDENTITY PRIMARY KEY,
  PRACTI_ID                  BIGINT NOT NULL,                --人员信息ID
  PRACTI_NAME                VARCHAR(64) NOT NULL,           --人员姓名
  KIND_WORK                  VARCHAR(6) NOT NULL,            --从业工种(表码 BM_KIND_WORK)
  MOBILE                     VARCHAR(11) NULL,               --手机号
  STATION                    VARCHAR(32) NULL,               --岗位
  CORP_ID                    BIGINT NOT NULL,                --所属企业
  CORP_NAME                  VARCHAR(64) NOT NULL,           --企业名称
  DEP_ID                     BIGINT NOT NULL,                --所属部门
  DEP_NAME                   VARCHAR(128) NOT NULL,          --部门名称
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  PROJECT_SERIAL             VARCHAR(64) NULL,               --项目编号
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  CONTRACT_ID                BIGINT NULL,                    --合同ID(合同信息)
  FLOW_ID                    BIGINT NULL,                    --调度设备流程ID
  BUSINESS_ID                BIGINT NOT NULL,                --当前业务(来源调度管理)
  BUSINESS_SERIAL            VARCHAR(64) NOT NULL,           --当前业务编号
  BUSINESS_THEME             VARCHAR(96) NULL,               --当前业务主题
  BUSINESS_MODULE            VARCHAR(32) NOT NULL,           --当前业务模块
  BUSINESS_PRACTI_ID         BIGINT NOT NULL,                --当前业务中设备信息ID
  RELATE_ID                  BIGINT NOT NULL,                --关联业务(来源安装管理/使用管理/拆卸管理)
  RELATE_SERIAL              VARCHAR(64) NOT NULL,           --关联业务编号
  RELATE_THEME               VARCHAR(96) NULL,               --关联业务主题
  RELATE_MODULE              VARCHAR(32) NOT NULL,           --关联业务模块
  START_DATE                 SMALLDATETIME NULL,             --进场日期
  END_DATE                   SMALLDATETIME NULL,             --退场日期
  ACTIVE                     CHAR(1) NOT NULL                --激活任务(表码值 0:未激活,1:激活)
);
CREATE TABLE T_EQUIPMENT_FLOW
(
  FLOW_ID                    BIGINT IDENTITY PRIMARY KEY,
  FLOW_SERIAL                VARCHAR(64) NOT NULL,           --流程编号
  EQUIP_DIARY_ID             BIGINT NOT NULL,                --设备日历ID
  EQUIP_ID                   BIGINT NOT NULL,                --设备信息ID
  DISPATCH_EQUIP_ID          BIGINT NOT NULL,                --合同调度设备ID
  CONTRACT_ID                BIGINT NOT NULL,                --合同ID
  DISPATCH_ID                BIGINT NOT NULL,                --合同调度ID(调度管理)
  INSTALL_ID                 BIGINT NULL,                    --安装告知ID
  ACTIVATE_ID                BIGINT NULL,                    --启用信息ID
  EMPLOY_ID                  BIGINT NULL,                    --使用告知ID
  DISMANTLE_ID               BIGINT NULL,                    --拆卸告知ID
  EMPLOY_INSPECT_SCHEMA_ID   BIGINT NULL,                    --使用巡检计划ID
  FLOW_STATE                 CHAR(1) NOT NULL                --流程标识(表码值 0:等待中,1:安装中,2:安装完成,3:使用中,4:使用完成,5:拆卸中,6:拆卸完成,7:转场入库中,8:入库结束)
);
--安装管理
CREATE TABLE T_EQUIPMENT_INSTALL
(
  INSTALL_ID                 BIGINT IDENTITY PRIMARY KEY,
  INSTALL_SERIAL             VARCHAR(64) NOT NULL,           --安装编号
  INSTALL_THEME              VARCHAR(96) NOT NULL,           --安装主题
  STARTIN_DATE               SMALLDATETIME NOT NULL,         --进场日期
  ENDIN_DATE                 SMALLDATETIME NOT NULL,         --退场日期
  SPEND_TIME                 BIGINT NOT NULL,                --安装用时
  PRACTI_COUNT               SMALLINT NOT NULL,              --人员总数
  INSTALL_HEIGHT             NUMERIC(12, 2) NULL,            --安装高度
  PRINCIPAL_ID               BIGINT NULL,                    --安装负责人(来源员工档案)
  PRINCIPAL                  VARCHAR(32) NULL,               --安装负责人
  PRINCIPAL_TEL              VARCHAR(16) NULL,               --安装负责人联系方式
  PARTAKE                    VARCHAR(512) NULL,              --参与人员(安装人)
  KNOT_COUNTS                SMALLINT NULL,                  --本次标准节数
  WALL_ATTACHE_QTY           SMALLINT NULL,                  --本次附墙数
  BRACHIUM                   NUMERIC(12, 2) NULL,            --臂长
  REMARK                     VARCHAR(256) NULL,              --备注
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  LONGITUDE                  VARCHAR(16) NULL,               --经度
  LATITUDE                   VARCHAR(16) NULL,               --纬度
  ADDRESS                    VARCHAR(128) NULL,              --地址
  FLOW_ID                    BIGINT NOT NULL,                --流程ID
  APPLYFOR_STATE             CHAR(1) NOT NULL,               --申请状态(表码值 0:待提交,1:待受理,2:待审批,3:完成,4:待调度)
  FILE_ATTACHES              VARCHAR(1024) NULL,             --附件ID
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--启用管理
CREATE TABLE T_EQUIPMENT_ACTIVATE
(
  ACTIVATE_ID                BIGINT IDENTITY PRIMARY KEY,
  ACTIVATE_SERIAL            VARCHAR(64) NOT NULL,           --启用编号
  ACTIVATE_DATE              SMALLDATETIME NOT NULL,         --启用时间
  EM_ENT                     BIGINT NULL,                    --使用单位(默认为关联业务单号中对应项目的施工单位)
  EM_ENT_NAME                VARCHAR(64) NULL,               --使用单位名称
  ACCEPTANCE_DATE            CHAR(10) NULL,                  --验收时间
  CONTRACT_SERIAL            VARCHAR(64) NULL,               --合同编号
  REMARK                     VARCHAR(256) NULL,              --备注
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  APPOINTMENT_DATE           CHAR(10) NULL,                  --司机上岗日期
  FLOW_ID                    BIGINT NOT NULL,                --流程ID
  EFFECTIVE                  CHAR(1) NOT NULL,               --生效标识(表码值 0:未生效,1:生效)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--停用管理
CREATE TABLE T_EQUIPMENT_BLOCKUP
(
  BLOCKUP_ID                 BIGINT IDENTITY PRIMARY KEY,
  BLOCKUP_SERIAL             VARCHAR(64) NOT NULL,           --停用编号
  BLOCKUP_DATE               SMALLDATETIME NOT NULL,         --停用时间
  REACTIVATE_DATE            CHAR(10) NULL,                  --恢复启用时间
  REMARK                     VARCHAR(256) NULL,              --备注
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  EFFECTIVE                  CHAR(1) NOT NULL,               --生效标识(表码值 0:未生效,1:生效)
  FLOW_ID                    BIGINT NOT NULL                 --流程ID
);
--使用管理
CREATE TABLE T_EQUIPMENT_EMPLOY
(
  EMPLOY_ID                  BIGINT IDENTITY PRIMARY KEY,
  EMPLOY_SERIAL              VARCHAR(64) NOT NULL,           --使用编号
  EMPLOY_THEME               VARCHAR(96) NOT NULL,           --使用主题
  EMPLOY_DATE                SMALLDATETIME NULL,             --启用时间(作废)
  END_PLAN_DATE              SMALLDATETIME NULL,             --预计结束时间
  PRINCIPAL_ID               BIGINT NULL,                    --使用负责人(来源员工档案)
  PRINCIPAL                  VARCHAR(32) NULL,               --使用负责人
  PRINCIPAL_TEL              VARCHAR(16) NULL,               --使用负责人联系方式
  PARTAKE                    VARCHAR(512) NULL,              --参与人员(开机人)
  CAPTAIN_ID                 BIGINT NULL,                    --机长(来源员工档案)
  CAPTAIN                    VARCHAR(32) NULL,               --机长
  CAPTAIN_TEL                VARCHAR(16) NULL,               --机长联系电话
  REMARK                     VARCHAR(256) NULL,              --备注
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  FLOW_ID                    BIGINT NOT NULL,                --流程ID
  APPLYFOR_STATE             CHAR(1) NOT NULL,               --申请状态(表码值 0:待提交,1:待受理,2:待审批,3:完成,4:待调度)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--拆卸管理
CREATE TABLE T_EQUIPMENT_DISMANTLE
(
  DISMANTLE_ID               BIGINT IDENTITY PRIMARY KEY,
  DISMANTLE_SERIAL           VARCHAR(64) NOT NULL,           --拆卸单号
  DISMANTLE_THEME            VARCHAR(96) NOT NULL,           --拆卸主题
  STARTDIS_DATE              SMALLDATETIME NOT NULL,         --实际进场时间(格式:年月日时,例如:2013年6月25日10时)
  ENDDIS_DATE                SMALLDATETIME NOT NULL,         --实际退场时间(单位:年月日时)
  SPEND_TIME                 BIGINT NOT NULL,                --拆卸用时(单位:小时,=(实际)进场时间—(实际)退场时间)
  PRINCIPAL_ID               BIGINT NULL,                    --拆卸负责人(来源员工档案)
  PRINCIPAL                  VARCHAR(32) NULL,               --拆卸负责人
  PARTAKE                    VARCHAR(512) NULL,              --参与人员(拆卸人)
  DISMANTLE_HEIGHT           VARCHAR(8) NULL,                --拆卸高度
  REMARK                     VARCHAR(256) NULL,              --备注
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  LONGITUDE                  VARCHAR(16) NULL,               --经度
  LATITUDE                   VARCHAR(16) NULL,               --纬度
  ADDRESS                    VARCHAR(128) NULL,              --地址
  FLOW_ID                    BIGINT NOT NULL,                --流程ID
  APPLYFOR_STATE             CHAR(1) NOT NULL,               --申请状态(表码值 0:待提交,1:待受理,2:待审批,3:完成,4:待调度)
  FILE_ATTACHES              VARCHAR(1024) NULL,             --附件ID
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--转场入库
CREATE TABLE T_EQUIPMENT_WAREHOUSE
(
  WAREHOUSE_ID               BIGINT IDENTITY PRIMARY KEY,
  WAREHOUSE_SERIAL           VARCHAR(64) NOT NULL,           --单号(企业简码+RK+年月日+2位流水号)
  WAREHOUSE_DATE             CHAR(10) NOT NULL,              --入库时间(默认当前时间)
  PRINCIPAL                  VARCHAR(32) NULL,               --负责人(可选填)
  PRINCIPAL_TEL              VARCHAR(16) NULL,               --联系电话(可选填)
  STORE_ID                   BIGINT NOT NULL,                --仓库ID(仓库档案)
  OVERALL_UNIT               CHAR(1) NOT NULL,               --整机是否入库(勾选方式)
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  FLOW_ID                    BIGINT NOT NULL,                --流程ID
  APPLYFOR_STATE             CHAR(1) NOT NULL,               --申请状态(表码值 0:待提交,2:待审批,3:完成)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--转场入库零配件明细
CREATE TABLE T_EQUIPMENT_WAREHOUSE_COMPON
(
  WAREHOUSE_COMPON_ID        BIGINT IDENTITY PRIMARY KEY,
  WAREHOUSE_ID               BIGINT NULL,        
  COMPON_DIARY_ID            BIGINT NOT NULL,                --安拆过程零配件信息
  WAREHOUSE_WAIT_COUNTS      SMALLINT NOT NULL,              --未入库数量
  WAREHOUSE_COUNTS           SMALLINT NOT NULL,              --入库数量
  WAREHOUSE_RESULT           VARCHAR(6) NOT NULL,            --验收结果(表码 BM_INSPECT_RESULT)
  DESCRIPTION                VARCHAR(256) NULL,              --结果说明(可选填)
  MAINT_CONTENT              VARCHAR(256) NULL,              --维保内容(可选填)
  REMARK                     VARCHAR(256) NULL,              --备注
  STATUS                     CHAR(1) NOT NULL                --入库状态(表码值 0:待入库,1:入库,6:遗失,7:报废)
  COMPON_GENERIC_NAME VARCHAR(64) NULL ,                     --配件名称
  COMPON_SPECIFIC_NAME VARCHAR(64) NULL,                     --配件型号
  CALCULATE VARCHAR(8) NOT NULL,                             --计量单位
  COUNTS INT NULL,                                           --库存数量
  DIMENSIONS VARCHAR(64) NULL                                --规格特征
);
--入库异常
CREATE TABLE T_EQUIPMENT_WAREHOUSE_ABNORMAL
(
  ABNORMAL_ID                BIGINT IDENTITY PRIMARY KEY,
  WAREHOUSE_ID               BIGINT NULL,        
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  ADDRESS                    VARCHAR(256) NULL,              --项目所属地
  PRINCIPAL                  VARCHAR(32) NULL,               --负责人
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  EQUIP_GENERIC_NAME         VARCHAR(64) NULL,               --设备名称
  EQUIP_SPECIFIC_NAME        VARCHAR(64) NULL,               --规格型号
  EXW_SERIAL                 VARCHAR(64) NULL                --出厂编号
);
--入库异常明细
CREATE TABLE T_EQUIPMENT_WAREHOUSE_ABNORMAL_COMPON
(
  ABNORMAL_COMPON_ID         BIGINT IDENTITY PRIMARY KEY,
  ABNORMAL_ID                BIGINT NULL,
  COMPON_GENERIC_NAME        VARCHAR(64) NOT NULL,           --零配件名称
  COMPON_SPECIFIC_NAME       VARCHAR(64) NULL,               --设备型号
  DIMENSIONS                 VARCHAR(64) NULL,               --规格特征
  CALCULATE                  VARCHAR(8) NOT NULL,            --计量单位  
  DISPATCH_COUNTS            SMALLINT NOT NULL,              --调配数量
  WAREHOUSE_WAIT_COUNTS      SMALLINT NOT NULL,              --待入库数量
  WAREHOUSE_COUNTS           SMALLINT NOT NULL,              --入库数量
  WAREHOUSE_RESULT_NAME      VARCHAR(64) NOT NULL,           --验收结果
  STATUS_NAME                VARCHAR(64) NOT NULL            --入库状态
);
--安全协议
CREATE TABLE T_SECURE_PROTOCOL
(
  PROTOCOL_ID                BIGINT IDENTITY PRIMARY KEY,
  PROTOCOL_SERIAL            VARCHAR(64) NOT NULL,           --协议编号(企业简码+AQ+年月日+2位流水号)
  PROVIDED_DATE              CHAR(10) NOT NULL,              --填报日期(默认为当前日期)
  EM_ENT                     BIGINT NOT NULL,                --使用单位(来原合同中的"承租方",仍可手动修改,来源客户档案)
  EM_ENT_MODULE              VARCHAR(32) NOT NULL,           --使用单位模块(企业档案/客户档案)
  EM_ENT_NAME                VARCHAR(64) NOT NULL,           --使用单位名称
  IN_ENT                     BIGINT NOT NULL,                --安装单位(来源合同中的"出租方",仍可手动修改,来源企业信息)
  IN_ENT_MODULE              VARCHAR(32) NOT NULL,           --安装单位模块(企业档案/客户档案)
  IN_ENT_NAME                VARCHAR(64) NOT NULL,           --安装单位名称
  IN_ENT_CERT_NUM            VARCHAR(32) NULL,               --安装资质证书编号
  IN_ENT_TITLE_LEVEL         VARCHAR(64) NULL,               --安装资质等级(表码 BM_CERT_LEVEL)
  PROJECT_ID                 BIGINT NOT NULL,                --项目ID(来源合同中项目信息)
  EQUIP_ID                   BIGINT NULL,                    --关联设备(来源设备档案)
  CONTRACT_ID                BIGINT NOT NULL,                --合同信息
  FINAL_HEIGHT               VARCHAR(8) NULL,                --最终安装高度(M)
  WALL_ATTACHE_QTY           SMALLINT NULL,                  --附墙道数
  REMARK                     VARCHAR(512) NULL,              --备注
  RELATE_MODULE              VARCHAR(32) NOT NULL            --模块类型(EQUIP_INSTALL:安装模块,EQUIP_DISMANTLE:拆卸模块)
);
--安拆协议
CREATE TABLE T_INDIS_PROTOCOL
(
  PROTOCOL_ID                BIGINT IDENTITY PRIMARY KEY,
  PROTOCOL_SERIAL            VARCHAR(64) NOT NULL,           --协议编号(企业简码+AC+年月日+2位流水号)
  PROVIDED_DATE              CHAR(10) NOT NULL,              --填报日期(默认为当前日期)
  EM_ENT                     BIGINT NOT NULL,                --使用单位(来原合同中的"承租方",仍可手动修改,来源客户档案)
  EM_ENT_MODULE              VARCHAR(32) NOT NULL,           --使用单位模块(企业档案/客户档案)
  EM_ENT_NAME                VARCHAR(64) NOT NULL,           --使用单位名称
  IN_ENT                     BIGINT NOT NULL,                --安装单位(来源合同中的"出租方",仍可手动修改,来源企业信息)
  IN_ENT_MODULE              VARCHAR(32) NOT NULL,           --安装单位模块(企业档案/客户档案)
  IN_ENT_NAME                VARCHAR(64) NOT NULL,           --安装单位名称
  IN_ENT_CERT_NUM            VARCHAR(24) NULL,               --安装资质证书编号
  IN_ENT_TITLE_LEVEL         VARCHAR(32) NULL,               --安装资质等级(表码 BM_CERT_LEVEL)
  PROJECT_ID                 BIGINT NOT NULL,                --项目ID(来源合同中项目信息)
  CONTRACT_ID                BIGINT NOT NULL,                --合同信息
  INITIAL_HEIGHT             VARCHAR(8) NULL,                --安装高度
  FINAL_HEIGHT               VARCHAR(8) NULL,                --最终安装高度
  WALL_ATTACHE_QTY           SMALLINT NULL,                  --附墙道数
  REMARK                     VARCHAR(512) NULL,              --备注
  RELATE_MODULE              VARCHAR(32) NOT NULL            --模块类型(EQUIP_INSTALL:安装模块,EQUIP_DISMANTLE:拆卸模块)
);
--安拆协议设备清单
CREATE TABLE T_INDIS_PROTOCOL_EQUIP
(
  PROTOCOL_EQUIP_ID          BIGINT IDENTITY PRIMARY KEY,
  PROTOCOL_ID                BIGINT NOT NULL,                --安拆协议ID
  EQUIP_ID                   BIGINT NULL,                    --关联设备(来源合同设备档案)
  HEIGHT                     NUMERIC(12, 2) NULL,            --安装高度
  QUANTITY                   SMALLINT NOT NULL,              --数量
  AMOUNT                     NUMERIC(12, 2) NOT NULL,        --安装总费用(元/台)
  SUMMARY                    NUMERIC(12, 2) NOT NULL         --安装费用小计(元)=安装总费用*数量
);
--安拆方案
CREATE TABLE T_INDIS_SCHEMA
(
  SCHEMA_ID                  BIGINT IDENTITY PRIMARY KEY,
  SCHEMA_SERIAL              VARCHAR(64) NOT NULL,           --编号(企业简码+FA+年月日+2位流水号)
  PROVIDED_DATE              CHAR(10) NOT NULL,              --填报日期(默认为当前日期)
  EM_ENT                     BIGINT NOT NULL,                --使用单位(来原合同中的"承租方",仍可手动修改,来源客户档案)
  EM_ENT_MODULE              VARCHAR(32) NOT NULL,           --使用单位模块(企业档案/客户档案)
  EM_ENT_NAME                VARCHAR(64) NOT NULL,           --使用单位名称
  IN_ENT                     BIGINT NOT NULL,                --安装单位(来源合同中的"出租方",仍可手动修改,来源企业信息)
  IN_ENT_MODULE              VARCHAR(32) NOT NULL,           --安装单位模块(企业档案/客户档案)
  IN_ENT_NAME                VARCHAR(64) NOT NULL,           --安装单位名称
  IN_ENT_CERT_NUM            VARCHAR(24) NULL,               --安装资质证书编号
  IN_ENT_TITLE_LEVEL         VARCHAR(32) NULL,               --安装资质等级(表码 BM_CERT_LEVEL)
  PROJECT_ID                 BIGINT NOT NULL,                --项目ID(来源合同中项目信息)
  CONTRACT_ID                BIGINT NOT NULL,                --合同信息
  EQUIP_ID                   BIGINT NULL,                    --关联设备(来源合同设备档案)
  TECHNICAL_DIRECTOR         VARCHAR(32) NULL,               --技术负责人(可选填)
  TECHNICAL_PHONE            VARCHAR(16) NULL,               --电话
  SECURE_DIRECTOR            VARCHAR(32) NULL,               --安全负责人(可选填)
  SECURE_PHONE               VARCHAR(16) NULL,               --电话
  SCHEMA_DESIGNER            VARCHAR(32) NULL,               --方案编制人(可选填)
  SCHEMA_PHONE               VARCHAR(16) NULL,               --电话
  OVERALL_HEIGHT             NUMERIC(12, 2) NULL,            --建筑高度(M)
  FINAL_HEIGHT               VARCHAR(8) NULL,                --最终安装高度(M)
  REMARK                     VARCHAR(512) NULL,              --备注
  RELATE_MODULE              VARCHAR(32) NOT NULL            --模块类型(EQUIP_INSTALL:安装模块,EQUIP_DISMANTLE:拆卸模块)
);
--应急预案
CREATE TABLE T_CONTINGENCY_PLAN
(
  CONTINGENCY_ID             BIGINT IDENTITY PRIMARY KEY,
  CONTINGENCY_SERIAL         VARCHAR(64) NOT NULL,           --应急预案编号(企业简码+YJ+年月日+2位流水号)、填报日期(默认为当前日期)
  PROVIDED_DATE              CHAR(10) NOT NULL,              --填报日期(默认为当前日期)
  EM_ENT                     BIGINT NOT NULL,                --使用单位(来原合同中的"承租方",仍可手动修改,来源客户档案)
  EM_ENT_MODULE              VARCHAR(32) NOT NULL,           --使用单位模块(企业档案/客户档案)
  EM_ENT_NAME                VARCHAR(64) NOT NULL,           --使用单位名称
  IN_ENT                     BIGINT NOT NULL,                --安装单位(来源合同中的"出租方",仍可手动修改,来源企业信息)
  IN_ENT_MODULE              VARCHAR(32) NOT NULL,           --安装单位模块(企业档案/客户档案)
  IN_ENT_NAME                VARCHAR(64) NOT NULL,           --安装单位名称
  IN_ENT_CERT_NUM            VARCHAR(24) NULL,               --安装资质证书编号
  IN_ENT_TITLE_LEVEL         VARCHAR(32) NULL,               --安装资质等级(表码 BM_CERT_LEVEL)
  PROJECT_ID                 BIGINT NOT NULL,                --项目ID(来源合同中项目信息)
  CONTRACT_ID                BIGINT NOT NULL,                --合同信息
  EQUIP_ID                   BIGINT NULL,                    --关联设备(来源合同设备档案)
  OVERALL_HEIGHT             NUMERIC(12, 2) NULL,            --建筑高度(M)
  FINAL_HEIGHT               VARCHAR(8) NULL,                --最终安装高度(M)
  CONTINGENCY_PHONE          VARCHAR(16) NULL,               --应急办公电话
  REMARK                     VARCHAR(512) NULL,              --备注
  RELATE_MODULE              VARCHAR(32) NOT NULL            --模块类型(EQUIP_INSTALL:安装模块,EQUIP_DISMANTLE:拆卸模块)
);
--应急预案人员
CREATE TABLE T_CONTINGENCY_WORKER
(
  WORKER_ID                  BIGINT IDENTITY PRIMARY KEY,
  CONTINGENCY_ID             BIGINT NOT NULL,                --预案ID
  NAME                       VARCHAR(32) NULL,               --姓名
  DUTIES                     VARCHAR(32) NULL,               --职务
  CONTINGENCY_DUTIES         VARCHAR(32) NULL,               --应急救援职务
  PHONE                      VARCHAR(16) NULL                --电话
);
--安拆前检查
CREATE TABLE T_INDIS_PRECHECK
(
  PRECHECK_ID                BIGINT IDENTITY PRIMARY KEY,
  PRECHECK_SERIAL            VARCHAR(64) NOT NULL,           --编号(企业简码+JC+年月日+2位流水号)
  PROVIDED_DATE              CHAR(10) NOT NULL,              --填报日期(默认为当前日期)
  IN_ENT                     BIGINT NOT NULL,                --安装单位(来源合同中的"出租方",仍可手动修改,来源企业信息)
  IN_ENT_MODULE              VARCHAR(32) NOT NULL,           --安装单位模块(企业档案/客户档案)
  IN_ENT_NAME                VARCHAR(64) NOT NULL,           --安装单位名称
  IN_ENT_CERT_NUM            VARCHAR(24) NULL,               --安装资质证书编号
  IN_ENT_TITLE_LEVEL         VARCHAR(32) NULL,               --安装资质等级(表码 BM_CERT_LEVEL)
  PROJECT_ID                 BIGINT NOT NULL,                --项目ID(来源合同中项目信息)
  CONTRACT_ID                BIGINT NOT NULL,                --合同信息
  EQUIP_ID                   BIGINT NULL,                    --关联设备(来源合同设备档案)
  BUILDING_NUM               VARCHAR(64) NULL,               --楼号
  INITIAL_HEIGHT             VARCHAR(8) NULL,                --安装高度
  FINAL_HEIGHT               VARCHAR(8) NULL,                --最终安装高度
  WALL_ATTACHE_QTY           SMALLINT NULL,                  --附墙道数
  REMARK                     VARCHAR(512) NULL,              --备注
  RELATE_MODULE              VARCHAR(32) NOT NULL            --模块类型(EQUIP_INSTALL:安装模块,EQUIP_DISMANTLE:拆卸模块)
);
--基础验收
CREATE TABLE T_INDIS_BASECHECK
(
  BASECHECK_ID               BIGINT IDENTITY PRIMARY KEY,
  BASECHECK_SERIAL           VARCHAR(64) NOT NULL,           --编号(企业简码+YS+年月日+2位流水号)
  PROVIDED_DATE              CHAR(10) NOT NULL,              --填报日期(默认为当前日期)
  EM_ENT                     BIGINT NOT NULL,                --使用单位(来原合同中的"承租方",仍可手动修改,来源客户档案)
  EM_ENT_MODULE              VARCHAR(32) NOT NULL,           --使用单位模块(企业档案/客户档案)
  EM_ENT_NAME                VARCHAR(64) NOT NULL,           --使用单位名称
  IN_ENT                     BIGINT NOT NULL,                --安装单位(来源合同中的"出租方",仍可手动修改,来源企业信息)
  IN_ENT_MODULE              VARCHAR(32) NOT NULL,           --安装单位模块(企业档案/客户档案)
  IN_ENT_NAME                VARCHAR(64) NOT NULL,           --安装单位名称
  PROJECT_ID                 BIGINT NOT NULL,                --项目ID(来源合同中项目信息)
  CONTRACT_ID                BIGINT NOT NULL,                --合同信息
  EQUIP_ID                   BIGINT NULL,                    --关联设备(来源合同设备档案)
  BUILDING_NUM               VARCHAR(64) NULL,               --楼号(可选填)
  MANAGER_PROJECT            VARCHAR(32) NULL,               --项目经理
  MANAGER_PHONE              VARCHAR(16) NULL,               --联系电话
  REMARK                     VARCHAR(512) NULL,              --备注
  RELATE_MODULE              VARCHAR(32) NOT NULL            --模块类型(EQUIP_INSTALL:安装模块,EQUIP_DISMANTLE:拆卸模块)
);
--技术交底
CREATE TABLE T_TECHNICAL_DISCLOSURE
(
  DISCLOSURE_ID              BIGINT IDENTITY PRIMARY KEY,
  DISCLOSURE_SERIAL          VARCHAR(64) NOT NULL,           --编号信息(JD+年月日+2位流水号)
  PROVIDED_DATE              CHAR(10) NOT NULL,              --填报日期(默认为当前日期)
  HEIGHT                     VARCHAR(8) NULL,                --高度
  BRACHIUM                   NUMERIC(12, 2) NULL,            --臂长
  CONSTRUCTE_ENTNAME         VARCHAR(64) NULL,               --施工单位
  ERECTING_EQUIPART          VARCHAR(64) NULL,               --起重设备配备
  DELIVERY_EQUIPART          VARCHAR(64) NULL,               --运输设备配备
  ACCEPTANCE_MAN             VARCHAR(64) NULL,               --接受人
  RELEVANCE_MAN              VARCHAR(64) NULL,               --关联人员
  DISCLOSURE_MAN             VARCHAR(64) NULL,               --交底人
  DISCLOSURE_DATE            CHAR(10) NULL,                  --交底日期
  DISCLOSURE_ITEM            VARCHAR(64) NULL,               --交底项目
  CONTENTS                   VARCHAR(4000) NULL,             --交底内容(注:默认内容参见打印样式表,默认内容仍可编辑,字数控制在2500个)
  REPLENISH_CONTENTS         VARCHAR(4000) NULL,             --其他针对性安全技术交底(同上)
  REMARK                     VARCHAR(512) NULL,              --备注
  PROJECT_ID                 BIGINT NOT NULL,                --项目ID(来源合同中项目信息 项目名称/项目地址)
  EQUIP_ID                   BIGINT NOT NULL,                --关联设备(来源合同设备档案 备案编号/出厂编号/设备名称/规格型号)
  RELATE_MODULE              VARCHAR(32) NOT NULL            --模块类型(EQUIP_INSTALL:安装模块,EQUIP_DISMANTLE:拆卸模块)
);
--隐患上报
CREATE TABLE T_RISK
(
  RISK_ID                    BIGINT IDENTITY PRIMARY KEY,
  RISK_SERIAL                VARCHAR(64) NOT NULL,           --通知编号(企业简码+ZG+年月日+2位流水号)
  RISK_THEME                 VARCHAR(96) NOT NULL,           --通知主题
  EQUIP_ID                   BIGINT NOT NULL,                --整改设备(来源设备档案)
  PROJECT_ID                 BIGINT NOT NULL,                --项目ID(来源项目信息)
  CHECK_DEPARTMENT           VARCHAR(64) NOT NULL,           --检查部门
  CHECK_CUSTOM               BIGINT NOT NULL,                --检查单位ID(来源客户档案)
  CHECK_CUSTOM_NAME          VARCHAR(64) NOT NULL,           --检查单位
  INSPECTOR                  VARCHAR(32) NULL,               --参加检查人
  RECTIFY_ENT                BIGINT NOT NULL,                --整改单位ID(来源企业档案)
  RECTIFY_ENT_NAME           VARCHAR(64) NOT NULL,           --整改单位
  RISK_DESC                  VARCHAR(4000) NOT NULL,         --现场存在的问题
  IMPROVE_PERSON             VARCHAR(32) NULL,               --整改负责人
  IMPROVE_DATE               CHAR(10) NULL,                  --整改日期
  CHECK_PERSON               VARCHAR(32) NULL,               --检查负责人
  CHECK_DATE                 CHAR(10) NULL,                  --检查日期
  REVIEW_OPINION             VARCHAR(4000) NULL,             --复查意见
  REVIEW_PERSON              VARCHAR(32) NULL,               --复查负责人
  REVIEW_DATE                CHAR(10) NULL,                  --复查日期
  RISK_REPORT_ID             BIGINT NULL,                    --反馈ID
  STATUS                     CHAR(1) NOT NULL                --状态(表码值 0:未结案,1:已结案<根据事故报告>)
);
--整改反馈
CREATE TABLE T_RISK_REPORT
(
  RISK_REPORT_ID             BIGINT IDENTITY PRIMARY KEY,
  RISK_ID                    BIGINT NOT NULL,        
  REPORT_SERIAL              VARCHAR(64) NOT NULL,           --反馈编号(企业简码+FK+年月日+2位流水号)
  CHECK_POSITION             VARCHAR(64) NULL,               --检查部位(由用户手动输入)
  IMPROVE_PERSON             VARCHAR(32) NULL,               --整改负责人
  COMPLETE_DATE              CHAR(10) NULL,                  --完成时间
  IMPROVE_DESC               VARCHAR(4000) NULL,             --整改结果说明(为文本框,字数要求500字以上)
  IMPROVE_RESULT             CHAR(1) NULL,                   --整改结果(表码值 0:整改不可行,1:整改可行)
  REMARK                     VARCHAR(4000) NULL              --其他需要说明的问题(为文本框,字数要求500字以上,可选填)
);
--事故登记
CREATE TABLE T_ACCIDENT
(
  ACCIDENT_ID                BIGINT IDENTITY PRIMARY KEY,
  ACCIDENT_SERIAL            VARCHAR(64) NOT NULL,           --事故编号(企业简码+SG+年月日+2位流水号)
  ACCIDENT_DATE              CHAR(10) NOT NULL,              --事故发生时间
  EQUIP_ID                   BIGINT NOT NULL,                --事故设备(来源设备档案)
  PROJECT_ID                 BIGINT NOT NULL,                --项目ID(来源项目信息)
  ADDRESS                    VARCHAR(256) NOT NULL,          --项目地址
  RESPONSIBLE_UNIT           VARCHAR(64) NULL,               --事故责任单位 
  ACCIDENT_CATEGORY          VARCHAR(64) NOT NULL,           --事故类别
  ACCIDENT_LEVEL             VARCHAR(6) NOT NULL,            --事故级别(表码 ACCIDENT_LEVEL 0:一般事故,1:较大事故,2:重大事故,3:特别重大事故)
  INJURIES                   INT NOT NULL DEFAULT 0,         --受伤人数
  DEATHS                     INT NOT NULL DEFAULT 0,         --死亡人数
  RESPONSIBLE                VARCHAR(32) NOT NULL,           --主要责任人
  ECONOMIC_LOSSES            VARCHAR(64) NULL,               --经济损失
  ACCIDENT_DESC              VARCHAR(1024) NULL,             --事故概况
  ACCIDENT_REASON            VARCHAR(1024) NULL,             --事故原因
  ACCIDENT_RESULT            VARCHAR(1024) NULL,             --事故处理结果
  EQUIP_REPAIR_DESC          VARCHAR(1024) NULL,             --设备修复情况
  PROVIDED_DATE              CHAR(10) NOT NULL,              --填报时间
  ACCIDENT_REPORT_ID         BIGINT NULL,                    --事故报告ID
  STATUS                     CHAR(1) NOT NULL                --状态(已结案:根据事故报告、未结案)
);
--事故报告
CREATE TABLE T_ACCIDENT_REPORT
(
  ACCIDENT_REPORT_ID         BIGINT IDENTITY PRIMARY KEY,
  ACCIDENT_ID                BIGINT NOT NULL,                --事故登记
  REPORT_SERIAL              VARCHAR(64) NOT NULL,           --报告编号(企业简码+BG+年月日+2位流水号)
  PROVIDED_DATE              CHAR(10) NOT NULL,              --填报时间
  PROVIDED_UNIT              VARCHAR(64) NOT NULL,           --填报单位 
  PREVENT                    VARCHAR(1024) NULL,             --预防措施
  PARTICIPANTS               VARCHAR(1024) NULL              --参加事故分析人员
);
--自检报告
CREATE TABLE T_VERIFY_SELF
(
  SELF_ID                    BIGINT IDENTITY PRIMARY KEY,
  SELF_SERIAL                VARCHAR(64) NOT NULL,           --自检编号(企业简码+ZJ+年月日+2位流水号)
  FLOW_ID                    BIGINT NOT NULL,                --设备流程ID
  RELATE_ID                  BIGINT NOT NULL,                --关联业务ID
  RELATE_MODULE              VARCHAR(32) NOT NULL,           --关联业务类型
  IN_ENT                     BIGINT NOT NULL,                --安装单位(企业档案)
  IN_ENT_NAME                VARCHAR(64) NOT NULL,           --安装单位名称
  IN_ENT_CERT_NUM            VARCHAR(24) NULL,               --安装单位资质证书编号
  IN_ENT_CERT_TYPE           VARCHAR(64) NULL,               --安装单位资质类型
  MAX_HEIGHT                 VARCHAR(8) NULL,                --检查高度(可选填)
  SELF_VERIFY_MAN            VARCHAR(32) NULL,               --检查人(可选填)
  USER_ID                    BIGINT NOT NULL,                --填报用户ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --填报用户姓名
  DEP_ID                     BIGINT NOT NULL,                --填报所属部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --填报日期
  REMARK                     VARCHAR(512) NULL,              --备注
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--检测信息
CREATE TABLE T_EQUIPMENT_DETECT
(
  DETECT_ID                  BIGINT IDENTITY PRIMARY KEY,
  DETECT_SERIAL              VARCHAR(64) NOT NULL,           --检测编号
  FLOW_ID                    BIGINT NOT NULL,                --设备流程ID
  RELATE_ID                  BIGINT NOT NULL,                --关联业务(来源安装管理/使用管理)
  RELATE_SERIAL              VARCHAR(64) NOT NULL,           --关联业务编号
  RELATE_MODULE              VARCHAR(32) NOT NULL,           --关联业务模块
  DETECT_ENT                 BIGINT NULL,                    --检测单位(来源企业管理)
  DETECT_ENT_NAME            VARCHAR(64) NOT NULL,           --检测单位名称
  DETECT_AMOUNT              NUMERIC(12, 2) NOT NULL,        --检测费用
  PAYMENT_AMOUNT             NUMERIC(12, 2) NOT NULL,        --检测已付费用
  EM_ENT_NAME                VARCHAR(64) NULL,               --使用单位(来源项目档案的施工单位)
  SUP_ENT_NAME               VARCHAR(64) NULL,               --监理单位(来源项目档案的监理单位)
  LICENSE_NUMBER             VARCHAR(24) NULL,               --安全生产许可证号(来源企业资质中的资质证书编号)，
  INSTALL_PRINCIPAL          VARCHAR(64) NULL,               --安装单位主要负责人(来源员工档案)
  INSTALL_CERT_NUM           VARCHAR(32) NULL,               --证书编号(来源从业资格证的证书编号)
  PROJECT_PRINCIPAL          VARCHAR(64) NULL,               --安装单位项目负责人(来源员工档案)
  PROJECT_CERT_NUM           VARCHAR(32) NULL,               --证书编号(来源从业资格证的证书编号)
  SAFETY_PRINCIPAL           VARCHAR(64) NULL,               --安装单位专职安全生产管理人员(来源员工档案)
  SAFETY_CERT_NUM            VARCHAR(32) NULL,               --证书编号(来源从业资格证的证书编号)
  REMARK                     VARCHAR(256) NULL,              --备注
  DEL_FLAG                   CHAR(1) NOT NULL,               --删除标识(表码值 0:删除,1:正常)
  CONSTRAINT UQ_T_EQUIPMENT_DETECT1 UNIQUE (DETECT_SERIAL)
);
--检测信息(检查明细)
CREATE TABLE T_EQUIPMENT_DETECT_STATEMENT
(
  DETECT_STATEMENT_ID        BIGINT IDENTITY PRIMARY KEY,
  DETECT_ID                  BIGINT NULL,                    --检测ID
  DETECT_TYPE                VARCHAR(128) NOT NULL,          --检测类型
  DETECT_RESULT              VARCHAR(128) NOT NULL,          --检测结论
  DETECT_DATE                CHAR(10) NULL,                  --检测日期
  DETECTOR                   VARCHAR(32) NOT NULL,           --检测人员
  STATEMENT_AMOUNT           NUMERIC(12, 2) NULL             --检测费用
);
--验收信息
CREATE TABLE T_EQUIPMENT_VERIFY
(
  VERIFY_ID                  BIGINT IDENTITY PRIMARY KEY,
  VERIFY_SERIAL              VARCHAR(64) NOT NULL,           --验收编号
  FLOW_ID                    BIGINT NOT NULL,                --设备流程ID
  RELATE_ID                  BIGINT NOT NULL,                --关联业务(来源安装管理/使用管理)
  RELATE_SERIAL              VARCHAR(64) NOT NULL,           --关联业务编号
  RELATE_MODULE              VARCHAR(32) NOT NULL,           --关联业务模块
  IN_ENT                     BIGINT NULL,                    --安装单位(默认为用户所属单位)
  IN_ENT_NAME                VARCHAR(64) NULL,               --安装单位名称
  EM_ENT                     BIGINT NULL,                    --使用单位(默认为关联业务单号中对应项目的所属单位)
  EM_ENT_NAME                VARCHAR(64) NULL,               --使用单位名称
  SUP_ENT                    BIGINT NULL,                    --监理单位(默认为关联业务单号中对应项目的所属单位)
  SUP_ENT_NAME               VARCHAR(64) NULL,               --监理单位名称
  LEASE_ENT                  BIGINT NULL,                    --租赁单位(默认为用户所属单位)
  LEASE_ENT_NAME             VARCHAR(64) NULL,               --租赁单位名称
  VERIFY_DATE                CHAR(10) NULL,                  --验收日期
  VERIFY_RESULT              VARCHAR(128) NULL,              --验收结论
  SUGGEST                    VARCHAR(256) NULL,              --验收意见
  REMARK                     VARCHAR(256) NULL,              --备注
  DEL_FLAG                   CHAR(1) NOT NULL,               --删除标识(表码值 0:删除,1:正常)
  CONSTRAINT UQ_T_EQUIPMENT_VERIFY1 UNIQUE (VERIFY_SERIAL)
);
--巡检计划
CREATE TABLE T_EQUIPMENT_INSPECT_SCHEMA
(
  INSPECT_SCHEMA_ID          BIGINT IDENTITY PRIMARY KEY,
  FLOW_ID                    BIGINT NOT NULL,                --设备流程ID
  EQUIP_DIARY_ID             BIGINT NOT NULL,                --设备日历ID
  RELATE_ID                  BIGINT NOT NULL,                --关联业务(来源安装管理/使用管理)
  RELATE_SERIAL              VARCHAR(64) NOT NULL,           --关联业务编号
  RELATE_MODULE              VARCHAR(32) NOT NULL,           --关联业务模块
  CYCLE_ACTIVATE_DATE        DATETIME NOT NULL,              --周期起始时间(默认为启用日)
  CYCLE_DAYS                 SMALLINT NOT NULL,              --巡检周期(天数)
  TIMES_IN_CYCLE             SMALLINT NOT NULL,              --计划巡检次数
  DESCRIPTION                VARCHAR(256) NOT NULL,          --巡检说明
  CYCLE_TIMES                SMALLINT NOT NULL,              --当前周期数
  CYCLE_DAYS_TIMES           SMALLINT NULL,                  --当前周期内执行次数
  INSPECT_TIMES              SMALLINT NULL,                  --完成巡检次数
  THIS_START_CYCLE_DATE      DATETIME NOT NULL,              --当前周期起始时间(初始为周期起始时间)
  THIS_END_CYCLE_DATE        DATETIME NOT NULL,              --当前周期截止时间(巡检周期的截止日期)
  NEXT_FORM_TIME             DATETIME NOT NULL,              --下一巡检单生成时间
  NEXT_START_CYCLE_DATE      DATETIME NOT NULL,              --下一周期时间
  ACTIVE                     CHAR(1) NOT NULL,               --计划状态(表码值 0:未激活,1:激活,2:中止)  
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--巡检管理
CREATE TABLE T_EQUIPMENT_INSPECT
(
  INSPECT_ID                 BIGINT IDENTITY PRIMARY KEY,
  INSPECT_SERIAL             VARCHAR(64) NOT NULL,           --巡检单号
  INSPECT_SCHEMA_ID          BIGINT NOT NULL,                --巡检计划ID
  CYCLE_TIMES                SMALLINT NOT NULL,              --当前频次(第几周期)
  THIS_END_CYCLE_DATE        DATETIME NOT NULL,              --当前周期截止时间(巡检周期的截止日期)
  INSPECT_DATE               DATETIME NULL,                  --实际巡检时间(实际巡检时间)
  INSPECT_PEPOLES            VARCHAR(128) NULL,              --巡检人员
  LICENSE_PLATE              VARCHAR(16) NULL,               --巡检车牌号
  INSPECT_RESULT             VARCHAR(6) NULL,                --整机巡检结果(表码 BM_INSPECT_RESULT)
  REMARK                     VARCHAR(256) NULL,              --备注
  LONGITUDE                  VARCHAR(16) NULL,               --经度
  LATITUDE                   VARCHAR(16) NULL,               --纬度
  ADDRESS                    VARCHAR(128) NULL,              --地址
  REPAIR_STATUS              CHAR(1) NOT NULL,               --维修状态(表码值 0:未维修,1:已维修)
  FILE_ATTACHES              VARCHAR(1024) NULL,             --附件ID
  STATUS                     CHAR(1) NOT NULL                --状态(表码值 0:未完成,1:完成,2:逾期)
);
--巡检内容
CREATE TABLE T_EQUIPMENT_INSPECT_DETAIL
(
  INSPECT_DETAIL_ID          BIGINT IDENTITY PRIMARY KEY,
  INSPECT_ID                 BIGINT NOT NULL,                --巡检管理ID
  POSITION                   VARCHAR(128) NULL,              --巡检部位
  SUBSTANCE                  VARCHAR(512) NULL,              --巡检内容
  COMPON_ID                  BIGINT NULL,                    --配件信息(零配件档案)
  DETAIL_RESULT              VARCHAR(6) NULL,                --巡检结果(表码 BM_INSPECT_RESULT)
  DESCRIPTION                VARCHAR(256) NULL,              --结果说明
  DETAIL_PEPOLES             VARCHAR(256) NULL,              --巡检人员
  INSPECT_FLAG               VARCHAR(30) NULL                --巡检结果标记
);
--故障/隐患信息
CREATE TABLE T_EQUIPMENT_HITCH
(
  HITCH_ID                   BIGINT IDENTITY PRIMARY KEY,
  HITCH_SERIAL               VARCHAR(64) NOT NULL,           --故障单号
  RELATE_ID                  BIGINT NULL,                    --关联业务(来源巡检管理/保养管理/转场管理/人工填写)
  RELATE_SERIAL              VARCHAR(64) NOT NULL,           --关联业务编号
  RELATE_MODULE              VARCHAR(32) NULL,               --关联业务模块
  PROJECT_ID                 BIGINT NOT NULL,                --项目ID(项目档案)
  EQUIP_ID                   BIGINT NOT NULL,                --设备信息ID
  SPEND_DATE                 CHAR(10) NULL,                  --发生时间(巡检时间/保养时间/转场时间/人工填写)
  HITCH_RESULT               VARCHAR(64) NULL,               --故障/隐患结果(巡检结果/维保结果/转场检查结果/人工填写)
  DESCRIPTION                VARCHAR(256) NULL,              --故障隐患说明(可选填)
  LOCATION                   VARCHAR(128) NULL,              --故障部位
  CONTENT                    VARCHAR(512) NULL,              --故障内容
  REMARK                     VARCHAR(256) NULL,              --备注(可选填)
  HANDLE_DATE                CHAR(10) NULL,                  --处理时间(默认当前时间)
  HANDLE_RESULT              VARCHAR(256) NULL,              --处理结果
  HANDLE_MANS                VARCHAR(256) NULL,              --处理人员
  HANDLE_DESCRIPTION         VARCHAR(256) NULL,              --处理说明(可选填)
  STATUS                     CHAR(1) NOT NULL,               --状态(表码值 0:待处理,1:已处理)
  USER_ID                    BIGINT NULL,                    --登记人ID
  USER_NAME                  VARCHAR(64) NULL,               --登记人
  DEP_ID                     BIGINT NULL,                    --所属主管部门
  PROVIDED_DATE              CHAR(10) NULL,                  --登记时间
  APPLYFOR_STATE             CHAR(1) NULL                    --申请状态(表码值 0:待提交,1:待受理,2:待审批,3:完成)
);
--维修管理
CREATE TABLE T_EQUIPMENT_REPAIR
(
  REPAIR_ID                  BIGINT IDENTITY PRIMARY KEY,
  REPAIR_SERIAL              VARCHAR(64) NOT NULL,           --维修单号
  RELATE_ID                  BIGINT NULL,                    --关联业务(来源使用管理/巡检管理/保养管理/转场管理/人工填写)
  RELATE_SERIAL              VARCHAR(64) NOT NULL,           --关联业务编号
  RELATE_MODULE              VARCHAR(32) NULL,               --关联业务模块
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  EQUIP_ID                   BIGINT NOT NULL,                --设备信息ID
  BUILDING_NUM               VARCHAR(64) NULL,               --楼号
  REPAIR_MAN_ID              BIGINT NULL,                    --维修人员(来源人员档案/允许手工填写)作废
  REPAIR_MAN                 VARCHAR(256) NULL,              --维修人员(人员信息/多人)
  SCHEMA_NAME                VARCHAR(4000) NULL,             --维修方案
  PHENOMENON                 VARCHAR(512) NULL,              --故障描述
  RUNNING_STATE	             CHAR(1) NULL,                   --设备运行状态(表码值 0:已停待俢;1:有问题(可以使用);2:现场处理(暂时可以使用))
  DAMAGE_DATE                CHAR(10) NULL,                  --故障日期
  RENEWAL_DESCRIPTION        VARCHAR(256) NULL,              --更换部件说明(默认为无)
  RENEWAL_DATE               CHAR(10) NULL,                  --更换配件日期
  REPAIR_AMOUNT              NUMERIC(12, 2) NULL,            --维修费用(绑定到设备中,计算设备成本和毛利率时计算此费用)
  REPAIR_RESULT              VARCHAR(6) NULL,                --维修结果(表码 BM_INSPECT_RESULT)
  PREVENTIVE_MEASURES        VARCHAR(512) NULL,              --预防措施建议(可选填)
  REPAIR_DATE                CHAR(10) NULL,                  --解决日期
  REMARK                     VARCHAR(256) NULL,              --备注(可选填)
  STATUS                     CHAR(1) NOT NULL,               --状态(表码值 0:待处理,1:已处理)
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              SMALLDATETIME NOT NULL,         --登记时间
  APPLYFOR_STATE             CHAR(1) NOT NULL                --申请状态(表码值 0:待提交,1:待受理,2:待审批,3:完成)
);
--维修管理-内容
CREATE TABLE T_EQUIPMENT_REPAIR_LOCATION
(
  REPAIR_LOCATION_ID         BIGINT IDENTITY PRIMARY KEY,
  REPAIR_ID                  BIGINT NULL,                    --维修信息ID
  FAULT_LOCATION             VARCHAR(6) NULL,                --故障部位(表码 BM_FAULT_LOCATION)
  SPEND_DATE                 DATETIME NULL,                  --故障发生时间(精确到分钟)
  PHENOMENON                 VARCHAR(512) NULL,              --故障现象(300个字数)
  DIAGNOSIS                  VARCHAR(6) NULL,                --故障诊断(表码 BM_FAULT_DIAGNOSIS)
  TROUBLESHOOT_DATE          DATETIME NULL,                  --故障排除时间(精确到分钟)
  REPAIR_TIME                SMALLINT NULL,                  --维修耗时(小时)
  CUMULATIVE_DOWNTIME        SMALLINT NULL,                  --累计停机时间(故障排除时间-故障发生时间/可手动修改)
  UNIT_PRICE                 NUMERIC(12, 2) NOT NULL,        --单价
  LABOUR                     SMALLINT NOT NULL,              --维修人数
  LABOUR_CHARGES             NUMERIC(12, 2) NULL,            --人工费用
  REMARK                     VARCHAR(256) NULL               --备注
); 
--维修管理-部件
CREATE TABLE T_EQUIPMENT_REPAIR_COMPON
(
  REPAIR_COMPON_ID           BIGINT IDENTITY PRIMARY KEY,
  REPAIR_ID                  BIGINT NULL,                    --维修单(级联删除设空)
  COMPON_ID                  BIGINT NOT NULL,                --故障部件(零部件档案库)
  COUNTS                     SMALLINT NOT NULL,              --损坏数量/更换数量
  UNIT_PRICE                 NUMERIC(12, 2) NOT NULL,        --单价
  SUMMARY                    NUMERIC(12, 2) NOT NULL,        --小计
  REMARK                     VARCHAR(256) NULL,              --备注(可选填)
  TYPE                       CHAR(1) NOT NULL                --类型(表码值 0:原配件,1:更换配件)
);
--维修管理-车辆
CREATE TABLE T_EQUIPMENT_REPAIR_VEHICLE
(
  REPAIR_VEHICLE_ID          BIGINT IDENTITY PRIMARY KEY,
  REPAIR_ID                  BIGINT NULL,                    --维修单(级联删除设空)
  LICENSE_PLATE              VARCHAR(16) NULL,               --车牌号
  VEHICLE_MODEL              VARCHAR(32) NULL,               --车辆型号
  VEHICLE_AMOUNT             NUMERIC(12, 2) NOT NULL,        --费用
  REMARK                     VARCHAR(256) NULL               --备注(可选填)
);
--保养方案
CREATE TABLE T_EQUIPMENT_MAINT_SCHEMA
(
  MAINT_SCHEMA_ID            BIGINT IDENTITY PRIMARY KEY,
  FLOW_ID                    BIGINT NOT NULL,                --设备流程ID
  EQUIP_DIARY_ID             BIGINT NOT NULL,                --设备日历ID
  RELATE_ID                  BIGINT NOT NULL,                --关联业务(来源安装管理/使用管理)
  RELATE_SERIAL              VARCHAR(64) NOT NULL,           --关联业务编号
  RELATE_MODULE              VARCHAR(32) NOT NULL,           --关联业务模块
  CYCLE_ACTIVATE_DATE        DATETIME NOT NULL,              --周期起始时间(默认为启用日)
  CYCLE_DAYS                 SMALLINT NOT NULL,              --保养周期(天数)
  TIMES_IN_CYCLE             SMALLINT NOT NULL,              --计划保养次数
  MAINT_TYPE                 VARCHAR(6) NOT NULL,            --保养级别(表码 MAINT_TYPE)
  DESCRIPTION                VARCHAR(256) NULL,              --保养说明
  MAINT_TIMES                SMALLINT NULL,                  --完成保养次数
  CYCLE_TIMES                SMALLINT NOT NULL,              --当前周期数
  CYCLE_DAYS_TIMES           SMALLINT NULL,                  --当前周期内执行次数
  THIS_START_CYCLE_DATE      DATETIME NOT NULL,              --当前周期起始时间(初始为周期起始时间)
  THIS_END_CYCLE_DATE        DATETIME NOT NULL,              --当前周期截止时间(巡检周期的截止日期)
  NEXT_FORM_TIME             DATETIME NOT NULL,              --下一巡检单生成时间
  NEXT_START_CYCLE_DATE      DATETIME NOT NULL,              --下一周期时间
  ACTIVE                     CHAR(1) NOT NULL,               --计划状态(表码值 0:未激活,1:激活)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--保养管理
CREATE TABLE T_EQUIPMENT_MAINT
(
  MAINT_ID                   BIGINT IDENTITY PRIMARY KEY,
  MAINT_SERIAL               VARCHAR(64) NOT NULL,           --保养单号
  MAINT_SCHEMA_ID            BIGINT NOT NULL,                --保养计划ID
  CYCLE_TIMES                SMALLINT NOT NULL,              --当前频次(第几周期)
  THIS_END_CYCLE_DATE        DATETIME NOT NULL,              --当前周期截止时间(保养周期的截止日期)
  MAINT_DATE                 DATETIME NULL,                  --实际保养时间(实际保养时间)
  MAINT_PEPOLES              VARCHAR(128) NULL,              --保养人员
  MAINT_RESULT               VARCHAR(6) NULL,                --整机保养结果(表码 BM_INSPECT_RESULT)
  REPAIR_STATUS              CHAR(1) NOT NULL,               --维修状态(表码值 0:未维修,1:已维修)
  STATUS                     CHAR(1) NOT NULL                --状态(表码值 0:未完成,1:完成,2:逾期)
);
--保养内容
CREATE TABLE T_EQUIPMENT_MAINT_DETAIL
(
  MAINT_DETAIL_ID            BIGINT IDENTITY PRIMARY KEY,
  MAINT_ID                   BIGINT NOT NULL,                --保养信息ID
  SUBSTANCE                  VARCHAR(128) NULL,              --保养内容
  COMPON_ID                  BIGINT NULL,                    --保养部位(零配件档案)
  DETAIL_RESULT              VARCHAR(6) NULL,                --保养结果(表码 BM_INSPECT_RESULT)
  DESCRIPTION                VARCHAR(256) NULL,              --结果说明
  MAINT_FLAG                 VARCHAR(30) NULL                --保养结果标记
);
--保险信息
CREATE TABLE T_INSURE_EQUIPMENT
(
  INSURE_ID                  BIGINT IDENTITY PRIMARY KEY,
  INSURE_SERIAL              VARCHAR(64) NOT NULL,           --保单号
  EQUIP_ID                   BIGINT NOT NULL,                --保险设备(来源设备档案)
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  START_INSURE_DATE          CHAR(10) NOT NULL,              --起保日期
  END_INSURE_DATE            CHAR(10) NOT NULL,              --终止日期
  COVERAGE                   NUMERIC(12, 2) NOT NULL,        --投保单价(万元)
  INSURE_PROGRAM             VARCHAR(96) NULL,               --保险项目(多选表码 BM_INSURE_PROGRAM)
  PREMIUM                    NUMERIC(12, 2) NOT NULL,        --保险费(元)
  INSURANCE_COMPANY          VARCHAR(64) NULL,               --保险公司
  CLAIM_PHONE                VARCHAR(16) NOT NULL,           --理赔电话
  LINKMAN                    VARCHAR(32) NOT NULL,           --联系人
  STOP_INSURE_DATE           CHAR(10) NULL,                  --停保日期
  RECOVER_INSURE_DATE        CHAR(10) NULL,                  --复保日期
  REMARK                     VARCHAR(256) NULL,              --备注
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--理赔记录
CREATE TABLE T_INSURE_CLAIM
(
  INSURE_CLAIM_ID            BIGINT IDENTITY PRIMARY KEY,
  INSURE_ID                  BIGINT NOT NULL,        
  INSURE_SERIAL              VARCHAR(64) NOT NULL,           --保单号(来源保单信息)
  BANK_DEPOSIT               VARCHAR(64) NULL,               --开户行
  ACCOUNT                    VARCHAR(32) NULL,               --账号
  EQUIP_ID                   BIGINT NOT NULL,                --保险设备
  CLAIM_DATE                 CHAR(10) NOT NULL,              --理赔时间
  CLAIM_RESON                VARCHAR(256) NULL,              --理赔事由
  WASTAGE_AMOUNT             NUMERIC(12, 2) NOT NULL,        --损失额
  COMPENSATE_AMOUNT          NUMERIC(12, 2) NOT NULL         --赔偿额
);
--领用信息表
CREATE TABLE T_PICKUP
(
  PICKUP_ID                  BIGINT IDENTITY PRIMARY KEY,
  PICKUP_SERIAL              VARCHAR(64) NOT NULL,           --领用单号
  PICKUP_THEME               VARCHAR(96) NOT NULL,           --领用主题
  DESCRIPTION                VARCHAR(256) NULL,              --用途说明
  RECIPIENTS                 VARCHAR(32) NOT NULL,           --领用人
  PICKUP_DATE                CHAR(10) NOT NULL,              --领用时间
  RELATE_ID                  BIGINT NULL,                    --关联业务(来源合同管理/安装管理/使用管理/检测管理)
  RELATE_SERIAL              VARCHAR(64) NULL,               --关联业务编号
  RELATE_THEME               VARCHAR(96) NULL,               --关联业务主题
  RELATE_MODULE              VARCHAR(32) NULL,               --关联业务模块
  EQUIP_ID                   BIGINT NULL,                    --关联设备
  PICKUP_STATUS              CHAR(1) NOT NULL,               --当前状态(表码值 0:待领用,1:领用,2:归还中,3:归还)
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  APPLYFOR_STATE             CHAR(1) NOT NULL,               --申请状态(表码值 0:待提交,1:待受理,2:待审批,3:完成)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--领用零配件信息表
CREATE TABLE T_PICKUP_COMPONENT
(
  PICKUP_COMPON_ID           BIGINT IDENTITY PRIMARY KEY,
  PICKUP_ID                  BIGINT NOT NULL,                --领用单
  COMPON_ID                  BIGINT NOT NULL,                --零配件
  COMPON_SERIAL              VARCHAR(64) NOT NULL,           --零配件编号
  COMPON_CATEGORY            VARCHAR(12) NOT NULL,           --零配件类别(表码 BM_REPERTORY_CATEGORY)
  COMPON_GENERIC             VARCHAR(6) NOT NULL,            --零配件名称(表码 BM_COMPONENT_GENERIC)
  COMPON_SPECIFIC            VARCHAR(6) NULL,                --规格型号(表码 BM_COMPONENT_SPECIFIC)
  UNIT                       VARCHAR(32) NULL,               --单位
  QUANTITY                   SMALLINT NULL,                  --领用数量
  UNIT_PRICE                 NUMERIC(12, 2) NULL,            --单价
  SUMMARY                    NUMERIC(12, 2) NULL,            --合计(数量*单价)
  PRESENT_VALUE              NUMERIC(12, 2) NOT NULL,        --资产现值
  PICKUP_DATE                CHAR(10) NOT NULL,              --领用时间
  RETURN_DATE                CHAR(10) NULL,                  --归还时间
  RETURN_STORE_ID            BIGINT NULL,                    --仓库ID
  RETURN_STORE_NAME          VARCHAR(64) NULL,               --仓库名称
  REMARK                     VARCHAR(256) NULL,              --备注
  USER_ID                    BIGINT NULL,                    --最终登记人ID
  USER_NAME                  VARCHAR(64) NULL,               --最终登记人
  STATUS                     CHAR(1) NOT NULL                --当前状态(表码值 0:待领用,1:已领用,3:已归还)
);
--采购管理
CREATE TABLE T_PURCHASE
(
  PURCHASE_ID                BIGINT IDENTITY PRIMARY KEY,
  PURCHASE_SERIAL            VARCHAR(64) NOT NULL,           --采购编号
  PURCHASE_THEME             VARCHAR(96) NOT NULL,           --采购主题
  CATEGORY                   VARCHAR(32) NOT NULL,           --采购类别
  SUPPLIER_ID                BIGINT NOT NULL,                --供应商(来源供应商档案)
  SUPPLIER_NAME              VARCHAR(64) NOT NULL,           --供应商名称
  SUPPLIER_TEL               VARCHAR(16) NULL,               --办公电话
  LINKER                     VARCHAR(32) NULL,               --联系人姓名
  LINKER_TEL                 VARCHAR(16) NULL,               --联系人手机
  PURCHASER_ID               BIGINT NOT NULL,                --采购人(默认为当前用户所属单位与用户)
  PURCHASER_NAME             VARCHAR(64) NOT NULL,           --采购人员姓名
  PURCHASER_MOBILE           VARCHAR(11) NULL,               --手机号
  PURCHASER_DEP_ID           BIGINT NOT NULL,                --采购所属部门ID
  PURCHASER_DEP_NAME         VARCHAR(128) NOT NULL,          --采购所属部门
  PUR_CORP_ID                BIGINT NOT NULL,                --采购所属企业ID
  PUR_CORP_NAME              VARCHAR(64) NOT NULL,           --采购所属企业
  PURCHASE_DATE              CHAR(10) NOT NULL,              --采购时间(默认为当前时间)
  ARRIVAL_DATE               CHAR(10) NOT NULL,              --预计到货时间
  INSTRUCTION                VARCHAR(256) NULL,              --采购说明
  REMARK                     VARCHAR(1024) NULL,             --采购备注
  RELATE_ID                  BIGINT NULL,                    --关联业务(来源合同管理/调度管理/使用管理/维保管理)
  RELATE_SERIAL              VARCHAR(64) NULL,               --关联业务编号
  RELATE_THEME               VARCHAR(96) NULL,               --关联业务主题
  RELATE_MODULE              VARCHAR(32) NULL,               --关联业务模块
  EQUIP_ID                   BIGINT NULL,                    --设备信息
  RECORD_SERIAL              VARCHAR(64) NULL,               --设备编号
  EQUIP_CATEGORY             VARCHAR(12) NULL,               --设备类别(表码 BM_REPERTORY_CATEGORY)
  EQUIP_GENERIC              VARCHAR(6) NULL,                --设备名称(表码 BM_EQUIP_GENERIC)
  PURCHASE_AMOUNT            NUMERIC(12, 2) NOT NULL,        --采购总金额
  PAYMENT_AMOUNT             NUMERIC(12, 2) NOT NULL,        --已付总金额
  SQUARE_UP_DATE             CHAR(10) NULL,                  --预计款项结清时间
  ACC_DATE                   CHAR(10) NULL,                  --验收结束时间
  APPLICANT                  VARCHAR(64) NULL,               --申请人
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  SQUARE_ACC_DATE            CHAR(10) NULL,                  --预计验收款项到帐时间
  APPLYFOR_STATE             CHAR(1) NOT NULL,               --申请状态(表码值 0:待提交,1:待受理,2:待审批,3:待验收,4:换货,5:退货退款,6:完成)
  FUND_STATUS                CHAR(1) NOT NULL,               --款项状态(表码值 0:待付款,1:付款中,2:已付款)
  FUND_ACC_STATUS            CHAR(1) NULL,                   --验收赔付款项状态(表码值 5:代收款,6:收款中,7:已收款)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--验收结果表
CREATE TABLE T_PURCHASE_ACCEPTANCE
(
  PACCEPTANCE_ID             BIGINT IDENTITY PRIMARY KEY,
  PURCHASE_ID                BIGINT NOT NULL,                --采购ID
  ACCEPTANCE_STATUS          CHAR(1) NOT NULL,               --验收结果(表码值  1:合格,2:不合格)
  UNQUALIFIED                VARCHAR(256) NULL,              --不合格原因
  HANDLE_METHOD              VARCHAR(6) NULL,                --处理方式(表码值  4:换货,5:退货退款,7:其他)
  ARRIVAL_PLAN_DATE          CHAR(10) NULL,                  --预计到货时间(换货 填写)
  REFUND_PLAN_DATE           CHAR(10) NULL,                  --预计退款到账时间(退货退款 填写)
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  REMARK                     VARCHAR(256) NULL               --备注
);
--采购设备/零配件清单
CREATE TABLE T_PURCHASE_BRIEF
(
  PURCHASE_BRIEF_ID          BIGINT IDENTITY PRIMARY KEY,
  PURCHASE_ID                BIGINT NOT NULL,                --采购ID
  COMPON_ID                  BIGINT NULL,                    --配件标识
  BRIEF_NAME                 VARCHAR(64) NOT NULL,           --采购项目名称
  BRAND                      VARCHAR(128) NULL,              --品牌
  SPECIFIC                   VARCHAR(32) NOT NULL,           --规格型号
  QUANTITY                   SMALLINT NOT NULL,              --数量
  UNIT                       VARCHAR(6) NOT NULL,            --单位
  UNIT_PRICE                 NUMERIC(12, 2) NOT NULL,        --单价(元)
  SUMMARY                    NUMERIC(12, 2) NOT NULL,        --小计(元)
  ARRIVAL_DATE               CHAR(10) NOT NULL,              --到货时间
  ACCEPTANCE_DATE            CHAR(10) NULL,                  --验收时间
  USER_ID                    BIGINT NULL,                    --最终登记人ID
  USER_NAME                  VARCHAR(64) NULL,               --最终登记人
  STATUS                     CHAR(1) NOT NULL                --当前状态(表码值 0:未验收,1:合格,2:不合格,4:换货,5:退货退款)
);
--借用管理
CREATE TABLE T_BORROW
(
  BORROW_ID                  BIGINT IDENTITY PRIMARY KEY,
  BORROW_SERIAL              VARCHAR(64) NOT NULL,           --借用编号
  BORROW_THEME               VARCHAR(96) NOT NULL,           --借用主题
  BORROW_TYPE                CHAR(1) NOT NULL,               --借用类别(表码值 0:借进,1:借出)
  INRELATE_ID                BIGINT NOT NULL,                --借用单位(来源企业档案/客户档案)
  INRELATE_MODULE            VARCHAR(32) NOT NULL,           --关联单位模块
  INRELATE_NAME              VARCHAR(64) NOT NULL,           --借用单位
  IN_OFFICE_TEL              VARCHAR(16) NULL,               --办公电话
  IN_HANDLER                 VARCHAR(32) NULL,               --借用经办人
  IN_PHONE                   VARCHAR(16) NULL,               --联系手机
  OUTRELATE_ID               BIGINT NOT NULL,                --借出单位(来源企业档案/客户档案)
  OUTRELATE_MODULE           VARCHAR(32) NOT NULL,           --关联单位模块
  OUTRELATE_NAME             VARCHAR(64) NOT NULL,           --借出单位
  OUT_OFFICE_TEL             VARCHAR(16) NULL,               --办公电话
  OUT_HANDLER                VARCHAR(32) NOT NULL,           --借出经办人
  OUT_PHONE                  VARCHAR(16) NULL,               --联系手机
  BORROW_DATE                CHAR(10) NOT NULL,              --借用时间
  RETURN_DATE                CHAR(10) NOT NULL,              --归还时间
  INSTRUCTION                VARCHAR(256) NULL,              --借用说明
  REMARK                     VARCHAR(1024) NULL,             --备注
  RENEW_DATE                 CHAR(10) NULL,                  --续借时间
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  SQUARE_ACC_DATE            CHAR(10) NULL,                  --预计验收款项到帐时间
  APPLYFOR_STATE             CHAR(1) NOT NULL,               --申请状态(表码值 0:待提交,1:待受理,2:待审批,3:待验收,4:续借待审,5:续借待批,6:完成)
  FUND_STATUS                CHAR(1) NULL,                   --款项状态(表码值 0:待付款,1:付款中,2:已付款,5:待收款,6:收款中,7:已收款)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--归还验收结果表
CREATE TABLE T_BORROW_ACCEPTANCE
(
  BACCEPTANCE_ID             BIGINT IDENTITY PRIMARY KEY,
  BORROW_ID                  BIGINT NOT NULL,                --借用ID
  ACCEPTANCE_STATUS          CHAR(1) NOT NULL,               --验收结果(表码值  1:不合格,2:合格)
  UNQUALIFIED                VARCHAR(256) NULL,              --不合格原因
  HANDLE_METHOD              VARCHAR(6) NOT NULL,            --处理方式(表码值  3:报损维修,4:遗失/重新购买)
  ARRIVAL_PLAN_DATE          CHAR(10) NULL,                  --预计报损维修完成时间(报损维修 填写)
  COMPENSATE_AMOUNT          NUMERIC(12, 2) NULL,            --赔款金额
  REFUND_PLAN_DATE           CHAR(10) NULL,                  --预计到款到账时间(遗失/重新购买 填写)
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  REMARK                     VARCHAR(256) NULL               --备注
);
CREATE TABLE T_BORROW_EQUIP
(
  BORROW_EQUIP_ID            BIGINT IDENTITY PRIMARY KEY,
  BORROW_ID                  BIGINT NOT NULL,                --借用ID
  EQUIP_ID                   BIGINT NOT NULL,                --设备ID
  RECORD_SERIAL              VARCHAR(64) NOT NULL,           --设备编号
  EQUIP_CATEGORY             VARCHAR(12) NOT NULL,           --设备类别(表码 BM_REPERTORY_CATEGORY)
  EQUIP_GENERIC              VARCHAR(6) NOT NULL,            --设备名称(表码 BM_EQUIP_GENERIC)
  BORROW_DATE                CHAR(10) NOT NULL,              --借用时间
  RETURN_DATE                CHAR(10) NULL,                  --归还时间
  RETURN_STORE_ID            BIGINT NULL,                    --仓库ID
  RETURN_STORE_NAME          VARCHAR(64) NULL,               --仓库名称
  USER_ID                    BIGINT NULL,                    --最终登记人ID
  USER_NAME                  VARCHAR(64) NULL,               --最终登记人
  STATUS                     CHAR(1) NOT NULL                --状态(表码值 0:待归还,3:报损,4:遗失,5:归还)
);
CREATE TABLE T_BORROW_COMPONENT
(
  BORROW_COMPON_ID           BIGINT IDENTITY PRIMARY KEY,
  BORROW_ID                  BIGINT NOT NULL,                --借用ID
  COMPON_ID                  BIGINT NOT NULL,                --零配件ID
  COMPON_SERIAL              VARCHAR(64) NOT NULL,           --零配件编号
  COMPON_CATEGORY            VARCHAR(12) NOT NULL,           --零配件类别(表码 BM_REPERTORY_CATEGORY)
  COMPON_GENERIC             VARCHAR(6) NOT NULL,            --零配件名称(表码 BM_COMPONENT_GENERIC)
  BORROW_DATE                CHAR(10) NOT NULL,              --借用时间
  BORROW_COUNTS              SMALLINT NULL,                  --借用数量
  CONSUME_COUNTS             SMALLINT NULL,                  --库存数量
  RETURN_DATE                CHAR(10) NULL,                  --归还时间
  RETURN_STORE_ID            BIGINT NULL,                    --仓库ID
  RETURN_STORE_NAME          VARCHAR(64) NULL,               --仓库名称
  USER_ID                    BIGINT NULL,                    --最终登记人ID
  USER_NAME                  VARCHAR(64) NULL,               --最终登记人
  STATUS                     CHAR(1) NOT NULL                --状态(表码值 0:未还,3:报损,4:遗失,5:归还)
);
--借款信息
CREATE TABLE T_MONEY_LEND
(
  LEND_ID                    BIGINT IDENTITY PRIMARY KEY,
  LEND_SERIAL                VARCHAR(64) NOT NULL,           --借款单号
  LEND_THEME                 VARCHAR(96) NULL,               --借款主题
  PAYMENT_ENT_ID             BIGINT NOT NULL,                --付款方(来源企业档案)
  PAYMENT_MODULE             VARCHAR(32) NOT NULL,           --付款方模块
  PAYMENT_ENT_NAME           VARCHAR(64) NOT NULL,           --付款方
  PAYMENT_ENT_ACCOUNT_ID     BIGINT NULL,                    --付款帐户信息
  PAYMENT_BANK               VARCHAR(64) NULL,               --付款开户行
  PAYMENT_ACCOUNT            VARCHAR(32) NULL,               --付款账号
  PRACTI_ID                  BIGINT NOT NULL,                --借款人员(默认操作用户,也可编辑导入企业人员档案)
  PRACTI_NAME                VARCHAR(64) NOT NULL,           --借款人员
  PRACTI_TEL                 VARCHAR(16) NULL,               --借款人员联系方式
  LEND_DATE                  CHAR(10) NOT NULL,              --借款日期
  LEND_AMOUNT                NUMERIC(12, 2) NOT NULL,        --借款金额
  ARREARS_AMOUNT             NUMERIC(12, 2) NOT NULL,        --申请时欠款总额(系统自动累计原借款的总额=借款总额-还款总额)
  BACK_DATE                  CHAR(10) NULL,                  --预计还款时间
  DESCRIPTION                VARCHAR(512) NULL,              --借款用途说明
  BACK_AMOUNT                NUMERIC(12, 2) NOT NULL,        --还款金额
  LENDBACK_STATUS            CHAR(1) NULL,                   --还款状态(表码值 0:未完成,1:完成)
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  APPLYFOR_STATE             CHAR(1) NOT NULL,               --申请状态(表码值 0:待提交,1:待受理,2:待审批,3:完成)
  DEL_FLAG                   CHAR(1) NOT NULL,               --删除标识(表码值 0:删除,1:正常)
  CONSTRAINT UQ_T_MONEY_LEND1 UNIQUE (LEND_SERIAL)
);
--还款信息
CREATE TABLE T_MONEY_BACK
(
  BACK_ID                    BIGINT IDENTITY PRIMARY KEY,
  BACK_SERIAL                VARCHAR(64) NOT NULL,           --还款单号
  BACK_THEME                 VARCHAR(96) NULL,               --还款主题
  LEND_ID                    BIGINT NOT NULL,                --借款信息(借款信息)
  LEND_SERIAL                VARCHAR(64) NOT NULL,           --借款单号
  LEND_THEME                 VARCHAR(96) NULL,               --借款主题
  RECEIVE_ENT_ID             BIGINT NOT NULL,                --收款单位(来源企业档案)
  RECEIVE_MODULE             VARCHAR(32) NOT NULL,           --收款方模块
  RECEIVE_ENT_NAME           VARCHAR(64) NOT NULL,           --收款单位
  RECEIVE_ENT_ACCOUNT_ID     BIGINT NULL,                    --收款帐户信息
  RECEIVE_BANK               VARCHAR(64) NULL,               --收款开户行
  RECEIVE_ACCOUNT            VARCHAR(32) NULL,               --收款账号
  LEND_PRACTI_ID             BIGINT NOT NULL,                --借款人员(默认操作用户,也可编辑导入企业人员档案)
  LEND_PRACTI_NAME           VARCHAR(64) NOT NULL,           --借款人员
  LEND_AMOUNT                NUMERIC(12, 2) NOT NULL,        --借款金额
  PRACTI_ID                  BIGINT NOT NULL,                --还款人员(默认为关联借款单中的借款人)
  PRACTI_NAME                VARCHAR(64) NOT NULL,           --还款人员
  PRACTI_TEL                 VARCHAR(16) NULL,               --还款人员联系方式
  BACK_DATE                  CHAR(10) NOT NULL,              --还款日期
  BACK_AMOUNT                NUMERIC(12, 2) NOT NULL,        --还款金额
  ARREARS_AMOUNT             NUMERIC(12, 2) NOT NULL,        --申请时欠款总额(系统自动累计原借款的总额=借款总额-还款总额)
  DESCRIPTION                VARCHAR(512) NULL,              --还款说明
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  APPLYFOR_STATE             CHAR(1) NOT NULL,               --申请状态(表码值 0:待提交,1:待受理,2:待审批,3:完成)
  DEL_FLAG                   CHAR(1) NOT NULL,               --删除标识(表码值 0:删除,1:正常)
  CONSTRAINT UQ_T_MONEY_BACK1 UNIQUE (BACK_SERIAL)
);
--款项分摊设备
CREATE TABLE T_AMOUNT_EQUIP_SHARE
(
  AMOUNT_EQUIP_SHARE_ID      BIGINT IDENTITY PRIMARY KEY,
  RELATE_ID                  BIGINT NOT NULL,                --关联业务(收款管理/付款管理)
  RELATE_SERIAL              VARCHAR(64) NOT NULL,           --关联业务编号
  RELATE_MODULE              VARCHAR(32) NOT NULL,           --关联业务模块
  AMOUNT_DATE                CHAR(10) NOT NULL,              --款项日期
  PRESENT_AMOUNT             NUMERIC(12, 2) NOT NULL,        --款项金额
  EQUIP_ID                   BIGINT NOT NULL,                --关联设备(来源设备档案)
  RECORD_SERIAL              VARCHAR(64) NOT NULL,           --设备编号
  EQUIP_CATEGORY             VARCHAR(12) NOT NULL,           --设备类别(表码 BM_REPERTORY_CATEGORY)
  EQUIP_GENERIC              VARCHAR(6) NOT NULL,            --设备名称(表码 BM_EQUIP_GENERIC)
  EQUIP_SPECIFIC             VARCHAR(6) NOT NULL,            --规格型号(表码 BM_EQUIP_SPECIFIC)
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  EXW_SERIAL                 VARCHAR(64) NOT NULL,           --出厂编号
  PROPERTY_ENT               BIGINT NOT NULL,                --产权单位(企业档案)
  PROPERTY_NAME              VARCHAR(64) NOT NULL            --产权单位名称
);
--开票管理
CREATE TABLE T_INVOICE_ISSUE
(
  INVOICE_ISSUE_ID           BIGINT IDENTITY PRIMARY KEY,
  INVOICE_SERIAL             VARCHAR(64) NULL,               --开票票据单号
  INVOICE_THEME              VARCHAR(96) NOT NULL,           --开票名称
  INVOICE_ITEM               VARCHAR(64) NOT NULL,           --开票项目
  ISSUE_DATE                 CHAR(10) NOT NULL,              --开票日期
  ISSUE_AMOUNT               NUMERIC(12, 2) NOT NULL,        --开票金额
  INVOICE_TYPE               VARCHAR(6) NOT NULL,            --票据类型(表码 BM_INVOICE_TYPE)
  HANDLE_ENT_ID              BIGINT NOT NULL,                --经办单位(来源企业档案)
  HANDLE_ENT_NAME            VARCHAR(64) NOT NULL,           --经办单位
  ISSUE_PRACTI_ID            BIGINT NOT NULL,                --开票人(默认当前用户)
  ISSUE_PRACTI_NAME          VARCHAR(64) NOT NULL,           --开票人员
  RELATE_ID                  BIGINT NULL,                    --关联业务(来源合同管理/采购管理/借用管理)
  RELATE_SERIAL              VARCHAR(64) NULL,               --关联业务编号
  RELATE_THEME               VARCHAR(96) NULL,               --关联业务主题
  RELATE_MODULE              VARCHAR(32) NULL,               --关联业务模块
  RELATE_AMOUNT              NUMERIC(12, 2) NULL,            --关联业务金额
  HAS_ISSUE_AMOUNT           NUMERIC(12, 2) NULL,            --关联业务已开票金额
  DESCRIPTION                VARCHAR(512) NULL,              --开票说明
  TAX_RATE                   NUMERIC(12, 2) NOT NULL,        --税率
  TAX_AMOUNT                 NUMERIC(12, 3) NOT NULL,        --税金
  ISSUE_STATUS               CHAR(1) NOT NULL,               --状态(表码值 0:未完成,1:完成,2:未开票 关联业务的收款计划截止当前进度情况)
  REMARK                     VARCHAR(256) NULL,              --备注
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  APPLYFOR_STATE             CHAR(1) NOT NULL,               --申请状态(表码值 0:待提交,1:待受理,2:待审批,3:完成,4:作废待审,5:作废待批,6:作废)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--收款管理
CREATE TABLE T_AMOUNT_RECEIVE
(
  AMOUNT_RECEIVE_ID          BIGINT IDENTITY PRIMARY KEY,
  AMOUNT_SERIAL              VARCHAR(64) NULL,               --收款单号
  AMOUNT_THEME               VARCHAR(96) NOT NULL,           --主题
  VOUCHER                    VARCHAR(32) NULL,               --凭证号
  RECEIVE_ENT_ID             BIGINT NOT NULL,                --收款单位(来源企业档案)
  RECEIVE_MODULE             VARCHAR(32) NOT NULL,           --收款方模块
  RECEIVE_ENT_NAME           VARCHAR(64) NOT NULL,           --收款单位
  RECEIVE_ENT_ACCOUNT_ID     BIGINT NULL,                    --收款帐户信息
  RECEIVE_BANK               VARCHAR(64) NULL,               --收款开户行
  RECEIVE_ACCOUNT            VARCHAR(32) NULL,               --收款账号
  RECEIVE_AMOUNT             NUMERIC(16, 2) NOT NULL,        --收款金额
  PAYMENT_ID                 BIGINT NULL,                    --付款方(来源企业档案/客户档案/供应商管理)
  PAYMENT_MODULE             VARCHAR(32) NULL,               --付款方模块
  PAYMENT_NAME               VARCHAR(64) NOT NULL,           --付款方
  PAYMENT_ACCOUNT_ID         BIGINT NULL,                    --付款帐户信息
  PAYMENT_BANK               VARCHAR(64) NULL,               --付款开户行
  PAYMENT_ACCOUNT            VARCHAR(32) NULL,               --付款账号
  PAYMENT_TYPE               VARCHAR(6) NOT NULL,            --支付方式(表码 BM_PAYMENT_TYPE)
  RECEIVE_DATE               CHAR(10) NULL,                  --收款日期
  PRACTI_ID                  BIGINT NOT NULL,                --经办人(默认操作人员,仍可编辑)
  PRACTI_NAME                VARCHAR(64) NOT NULL,           --经办人员
  RELATE_ID                  BIGINT NULL,                    --关联业务(来源于合同管理/采购管理)
  RELATE_SERIAL              VARCHAR(64) NULL,               --关联业务编号
  RELATE_THEME               VARCHAR(96) NULL,               --关联业务主题
  RELATE_MODULE              VARCHAR(32)  NULL,              --关联业务模块
  RELATE_AMOUNT              NUMERIC(12, 2) NULL,            --关联业务金额
  HAS_RECEIVE_AMOUNT         NUMERIC(12, 2) NULL,            --关联业务已收金额
  RECEIVABLE_DEBIT           NUMERIC(16, 2) NULL,            --当前应收款余额
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  PROJECT_SERIAL             VARCHAR(64) NULL,               --项目编号
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  ADDRESS                    VARCHAR(256) NULL,              --项目所属地(省+市+区+街道)
  REMARK                     VARCHAR(256) NULL,              --备注
  RECEIVE_STATUS             CHAR(1) NULL,                   --收款状态(表码值 0:未完成,1:完成 关联业务的总款项<非计划>截止当前进度情况)
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  APPLYFOR_STATE             CHAR(1) NOT NULL,               --申请状态(表码值 0:待提交,1:待受理,2:待审批,3:完成)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--款项分摊分期回款
CREATE TABLE T_AMOUNT_RECEIVE_SHARE
(
  RECEIVE_SHARE_ID           BIGINT IDENTITY PRIMARY KEY,
  AMOUNT_RECEIVE_ID          BIGINT NOT NULL,                --款项信息
  RECEIVEMENT_ID             BIGINT NOT NULL,                --分期回款计划
  RELATE_ID                  BIGINT NOT NULL,                --关联业务
  RELATE_SERIAL              VARCHAR(64) NOT NULL,           --关联业务编号
  RELATE_MODULE              VARCHAR(32) NOT NULL,           --关联业务模块
  PERIODS                    SMALLINT NOT NULL,              --期数
  RECEIVEMENT                NUMERIC(12, 2) NOT NULL,        --预计回款额
  RECEIVE_DATE               CHAR(10) NOT NULL,              --回款日期
  ALREADY_RECEIVEMENT        NUMERIC(12, 2) NOT NULL,        --已回金额
  ISSUE_INVOICE              CHAR(1) NOT NULL,               --先开发票(表码值 0:否,1:是)
  INVOICE_TYPE               VARCHAR(6) NULL,                --票据类型(表码 BM_INVOICE_TYPE)
  REMARK                     VARCHAR(256) NULL,              --分期回款备注
  PRESENT_RECEIVEMENT        NUMERIC(12, 2) NOT NULL         --本次分摊金额
);
--收票管理
CREATE TABLE T_INVOICE_COLLECT
(
  INVOICE_COLLECT_ID         BIGINT IDENTITY PRIMARY KEY,
  INVOICE_SERIAL             VARCHAR(64) NULL,           --收票票据单号
  INVOICE_THEME              VARCHAR(96) NOT NULL,           --收票名称
  INVOICE_ITEM               VARCHAR(64) NOT NULL,           --开票项目
  COLLECT_DATE               CHAR(10) NOT NULL,              --收票日期
  COLLECT_AMOUNT             NUMERIC(12, 2) NOT NULL,        --票据金额
  INVOICE_TYPE               VARCHAR(6) NOT NULL,            --票据类型(表码 BM_INVOICE_TYPE)
  ISSUE_ENTERPRISE           VARCHAR(64) NOT NULL,           --开票单位
  DESCRIPTION                VARCHAR(512) NULL,              --收票说明
  RELATE_ID                  BIGINT NULL,                    --关联业务(来源于合同管理/采购管理/借用管理/按揭模块/检测管理/保险管理)
  RELATE_SERIAL              VARCHAR(64) NULL,               --关联业务编号
  RELATE_THEME               VARCHAR(96) NULL,               --关联业务主题
  RELATE_MODULE              VARCHAR(32) NULL,               --关联业务模块
  RELATE_AMOUNT              NUMERIC(12, 2) NULL,            --关联业务金额
  HAS_COLLECT_AMOUNT         NUMERIC(12, 2) NULL,            --关联业务已收票金额
  COLLECT_STATUS             CHAR(1) NOT NULL,               --状态(表码值 0:未完成,1:完成  关联业务的付款计划截止当前进度情况)
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  APPLYFOR_STATE             CHAR(1) NOT NULL,               --申请状态(表码值 0:待提交,1:待受理,2:待审批,3:完成)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--付款管理
CREATE TABLE T_AMOUNT_PAYMENT
(
  AMOUNT_PAYMENT_ID          BIGINT IDENTITY PRIMARY KEY,
  AMOUNT_SERIAL              VARCHAR(64) NULL,               --付款单号
  AMOUNT_THEME               VARCHAR(96) NOT NULL,           --付款主题
  PAYMENT_ENT_ID             BIGINT NOT NULL,                --付款方(来源企业档案)
  PAYMENT_MODULE             VARCHAR(32) NOT NULL,           --付款方模块
  PAYMENT_ENT_NAME           VARCHAR(64) NOT NULL,           --付款方
  PAYMENT_ENT_ACCOUNT_ID     BIGINT NULL,                    --付款帐户信息
  PAYMENT_BANK               VARCHAR(64) NULL,           --付款开户行
  PAYMENT_ACCOUNT            VARCHAR(32) NULL,           --付款账号
  PAYMENT_AMOUNT             NUMERIC(12, 2) NOT NULL,        --付款金额
  RECEIVE_ID                 BIGINT NULL,                    --收款单位(来源企业档案/客户档案/供应商管理)
  RECEIVE_MODULE             VARCHAR(32) NOT NULL,           --收款方模块
  RECEIVE_NAME               VARCHAR(64) NOT NULL,           --收款单位
  RECEIVE_ACCOUNT_ID         BIGINT NULL,                    --收款帐户信息
  RECEIVE_BANK               VARCHAR(64) NULL,               --收款开户行
  RECEIVE_ACCOUNT            VARCHAR(32) NULL,               --收款账号
  PAYMENT_TYPE               VARCHAR(6) NOT NULL,            --付款方式(表码 BM_PAYMENT_TYPE)
  PAYMENT_DATE               CHAR(10) NULL,                  --付款日期(默认当天)
  PRACTI_ID                  BIGINT NOT NULL,                --经办人(默认为是操作用户,仍可编辑)
  PRACTI_NAME                VARCHAR(64) NOT NULL,           --经办人员
  RELATE_ID                  BIGINT NULL,                    --关联业务(来源于按揭计划/合同管理/采购管理/借用管理中的有款项支付计划/检测管理/保险管理/物流管理)
  RELATE_SERIAL              VARCHAR(64) NULL,               --关联业务编号
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  RELATE_THEME               VARCHAR(96) NULL,               --关联业务主题
  RELATE_MODULE              VARCHAR(32) NULL,               --关联业务模块
  RELATE_AMOUNT              NUMERIC(12, 2) NULL,            --关联业务金额
  HAS_PAYMENT_AMOUNT         NUMERIC(12, 2) NULL,            --关联业务已付金额
  PAYABLE_DEBIT              NUMERIC(16, 2) NULL,            --当前应付款余额
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  PROJECT_SERIAL             VARCHAR(64) NULL,               --项目编号
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  ADDRESS                    VARCHAR(256) NULL,              --项目所属地(省+市+区+街道)
  REMARK                     VARCHAR(256) NULL,              --付款备注
  FEES_TYPE                  VARCHAR(6) NULL,                --费用类别(表码 BM_REIMBURSE_TYPE)
  PAYMENT_CONTENT            VARCHAR(4000) NULL,             --支付内容
  PAYMENT_STATUS             CHAR(1) NULL,                   --应付款状态(表码值 0:未完成,1:完成 关联业务的总付款<非计划>截止当前进度情况)
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  APPLYFOR_STATE             CHAR(1) NOT NULL,               --申请状态(表码值 0:待提交,1:待受理,2:待审批,3:完成)
  DEL_FLAG                   CHAR(1) NOT NULL                --删除标识(表码值 0:删除,1:正常)
);
--款项分摊分期付款
CREATE TABLE T_AMOUNT_PAYMENT_SHARE
(
  PAYMENT_SHARE_ID           BIGINT IDENTITY PRIMARY KEY,
  AMOUNT_PAYMENT_ID          BIGINT NOT NULL,                --款项信息
  INSTALMENT_ID              BIGINT NOT NULL,                --分期付款信息
  RELATE_ID                  BIGINT NOT NULL,                --关联业务
  RELATE_SERIAL              VARCHAR(64) NOT NULL,           --关联业务编号
  RELATE_MODULE              VARCHAR(32) NOT NULL,           --关联业务模块
  PERIODS                    SMALLINT NOT NULL,              --期数
  PAYMENT                    NUMERIC(12, 2) NOT NULL,        --预计付款额
  PAY_DATE                   CHAR(10) NOT NULL,              --付款日期
  ALREADY_PAYMENT            NUMERIC(12, 2) NOT NULL,        --已付金额
  REMARK                     VARCHAR(256) NULL,              --分期付款备注
  PRESENT_PAYMENT            NUMERIC(12, 2) NOT NULL         --本次分摊金额
);
--提成比例管理
CREATE TABLE T_DEDUCT_SCALE
(
  DEDUCT_SCALE_ID            BIGINT IDENTITY PRIMARY KEY,
  SCALE_START                NUMERIC(12, 2) NULL,            --比例最低数
  SCALE_END                  NUMERIC(12, 2) NULL,            --比例最高数
  SCALE_PERCENT              NUMERIC(5, 2) NOT NULL,         --比例系数(%)
  SCALE_TYPE                 CHAR(1) NOT NULL                --提成类型(表码值 0:同一比例,1:累加比例)
);
--提成管理
CREATE TABLE T_DEDUCT
(
  DEDUCT_ID                  BIGINT IDENTITY PRIMARY KEY,
  DEDUCT_SERIAL              VARCHAR(64) NOT NULL,           --提成编号
  CONTRACT_ID                BIGINT NOT NULL,                --关联合同信息
  CONTRACT_SERIAL            VARCHAR(64) NOT NULL,           --合同编号
  CONTRACT_THEME             VARCHAR(96) NOT NULL,           --合同主题
  CONTRACT_AMOUNT            NUMERIC(12, 2) NOT NULL,        --合同总额
  DISBURSEMENT               NUMERIC(12, 2) NOT NULL,        --支出总额
  PROPORTION                 NUMERIC(5, 2) NOT NULL,         --比例系数(%)
  CARDINAL                   CHAR(1) NOT NULL,               --提成基数(表码值 0:按照合同实收款,1:按照合同毛利)
  PROPORTION_TYPE            CHAR(1) NOT NULL,               --提成比例(表码值 0:同一比例,1:累加比例)
  DEDUCT_TOTAL_AMOUNT        NUMERIC(12, 2) NOT NULL,        --提成总额
  REMARK                     VARCHAR(256) NULL,              --备注
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  APPLYFOR_PASS_DATE         SMALLDATETIME NULL,             --审批通过时间
  APPLYFOR_STATE             CHAR(1) NOT NULL,               --申请状态(表码值 0:待提交,1:待受理,2:待审批,3:完成)
  DEL_FLAG                   CHAR(1) NOT NULL,               --删除标识(表码值 0:删除,1:正常)
  CONSTRAINT UQ_T_DEDUCT1 UNIQUE (DEDUCT_SERIAL)
);
 --提成人员
CREATE TABLE T_DEDUCT_PRACTI
(
  DEDUCT_PRACTI_ID           BIGINT IDENTITY PRIMARY KEY,
  DEDUCT_ID                  BIGINT NOT NULL,                --提成ID
  PRACTI_ID                  BIGINT NOT NULL,                --提成人员(默认为关联合同中的销售人员/人员档案)
  PRACTI_NAME                VARCHAR(64) NOT NULL,           --提成人员
  PROPORTION                 NUMERIC(5, 2) NOT NULL,         --分配比例
  REWARD                     NUMERIC(12, 2) NOT NULL,        --分配奖金
  PICKUP_STATUS              CHAR(1) NOT NULL                --提取状态(表码值 0:未提取,1:提取)
);
--薪资管理
CREATE TABLE T_SALARY
(
  SALARY_ID                  BIGINT IDENTITY PRIMARY KEY,
  SALARY_SERIAL              VARCHAR(64) NOT NULL,           --薪资编号
  SALARY_THEME               VARCHAR(96) NOT NULL,           --薪资主题
  MONTH_ID                   INT NOT NULL,                   --薪资年月
  SALARY_MONTH               CHAR(10) NOT NULL,              --薪资年月(YYYY年MM月)
  SALARY_DATE                CHAR(10) NOT NULL,              --薪资年月(YYYY-MM-01)
  ENT_ID                     BIGINT NOT NULL,                --支付企业(来源企业档案)
  ENT_NAME                   VARCHAR(64) NOT NULL,           --支付企业
  ENT_ACCOUNT_ID             BIGINT NOT NULL,                --支付企业帐户信息
  BANK                       VARCHAR(64) NOT NULL,           --支付企业开户行
  ACCOUNT                    VARCHAR(32) NOT NULL,           --支付企业账号
  SALARY_AMOUNT              NUMERIC(16, 2) NOT NULL,        --薪资总额
  DEDUCT_PASS_DATE           SMALLDATETIME NOT NULL,         --提取奖金时间
  REMARK                     VARCHAR(256) NULL,              --备注
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  APPLYFOR_STATE             CHAR(1) NOT NULL,               --申请状态(表码值 0:待提交,1:待受理,2:待审批,3:完成)
  DEL_FLAG                   CHAR(1) NOT NULL,               --删除标识(表码值 0:删除,1:正常)
  CONSTRAINT UQ_T_SALARY1 UNIQUE (SALARY_SERIAL)
);
--薪资发放管理
CREATE TABLE T_SALARY_PRACTI
(
  SALARY_PRACTI_ID           BIGINT IDENTITY PRIMARY KEY,
  SALARY_ID                  BIGINT NOT NULL,        
  MONTH_ID                   INT NOT NULL,                   --所属年月
  SALARY_MONTH               CHAR(10) NOT NULL,              --所属年月(YYYY年MM月)  
  PRACTI_ID                  BIGINT NOT NULL,                --人员信息
  PRACTI_NAME                VARCHAR(64) NOT NULL,           --人员
  PRACTI_TEL                 VARCHAR(16) NULL,               --人员联系方式
  BASE_SALARY                NUMERIC(12, 2) NOT NULL,        --基本工资(增项,导入人员档案)
  STATION                    NUMERIC(12, 2) NOT NULL,        --岗位补贴(增项)
  OVERTIME_WORK              NUMERIC(12, 2) NOT NULL,        --加班工资(增项)
  MEAL_FEE                   NUMERIC(12, 2) NOT NULL,        --餐费等补贴(增项)
  ENDOWMENT                  NUMERIC(12, 2) NOT NULL,        --养老保险(减项)
  SOCIAL_INSURANCE           NUMERIC(12, 2) NOT NULL,        --社会保险(减项)
  HOUSING_FUND               NUMERIC(12, 2) NOT NULL,        --住房公积金(减项)
  TAX                        NUMERIC(12, 2) NOT NULL,        --个税(减项)
  OTHER_DEDUCT               NUMERIC(12, 2) NOT NULL,        --其他应扣(减项)
  OTHER_ITEMS                NUMERIC(12, 2) NOT NULL,        --其他项目(字典)
  REWARD                     NUMERIC(12, 2) NOT NULL,        --奖金(来源提成管理中的分配奖金)
  TOTAL_AMOUNT               NUMERIC(12, 2) NOT NULL,        --应发工资(=选中的发放项目所有“增项”之和+奖金)
  DEDUCT_AMOUNT              NUMERIC(12, 2) NOT NULL,        --应扣金额(=选中的发放项目所有“减项”之和)
  FINAL_AMOUNT               NUMERIC(12, 2) NOT NULL,        --实发工资(应发-应扣)
  REMARK                     VARCHAR(256) NULL               --备注
);
--报销信息
CREATE TABLE T_REIMBURSE
(
  REIMBURSE_ID               BIGINT IDENTITY PRIMARY KEY,
  REIMBURSE_SERIAL           VARCHAR(64) NOT NULL,           --报销单号
  REIMBURSE_THEME            VARCHAR(96) NULL,               --报销主题
  PAYMENT_ENT_ID             BIGINT NOT NULL,                --付款方(来源企业档案)
  PAYMENT_MODULE             VARCHAR(32) NOT NULL,           --付款方模块
  PAYMENT_ENT_NAME           VARCHAR(64) NOT NULL,           --付款方
  PAYMENT_ENT_ACCOUNT_ID     BIGINT NULL,                    --付款帐户信息
  PAYMENT_BANK               VARCHAR(64) NULL,               --付款开户行
  PAYMENT_ACCOUNT            VARCHAR(32) NULL,               --付款账号
  RECEIVE_BANK               VARCHAR(64) NULL,               --收款开户行
  RECEIVE_ACCOUNT            VARCHAR(32) NULL,               --收款账号
  PRACTI_ID                  BIGINT NOT NULL,                --报销人员(默认操作用户,也可编辑导入企业人员档案)
  PRACTI_NAME                VARCHAR(64) NOT NULL,           --报销人员
  PRACTI_TEL                 VARCHAR(16) NULL,               --报销人员联系方式
  REIMBURSE_MONTH            CHAR(10) NOT NULL,              --报销年月(YYYY年MM月)
  REIMBURSE_DATE             CHAR(10) NOT NULL,              --报销日期(默认当日)
  TICKET_COUNT               SMALLINT NOT NULL,              --总票据张数(为费用信息下票据张数之和)
  REIMBURSE_AMOUNT           NUMERIC(12, 2) NOT NULL,        --报销批复总额(默认为费用清单中小计金额之和)
  ASKFOR_AMOUNT              NUMERIC(12, 2) NOT NULL,        --报销申请总额(为费用清单中小计金额之和)
  DESCRIPTION                VARCHAR(1024) NULL,             --报销说明
  ARREARS_AMOUNT             NUMERIC(12, 2) NOT NULL,        --已欠款总额(来源借款模块)
  RELATE_ID                  BIGINT NULL,                    --关联业务(来源合同管理/采购单/借用单/安装/使用巡检/使用维保/检测/保险/拆卸)
  RELATE_SERIAL              VARCHAR(64) NULL,               --关联业务编号
  RELATE_THEME               VARCHAR(96) NULL,               --关联业务主题
  RELATE_MODULE              VARCHAR(32) NULL,               --关联业务模块
  EQUIP_ID                   BIGINT NULL,                    --关联设备(来源设备档案)
  RECORD_SERIAL              VARCHAR(64) NULL,               --设备编号
  EQUIP_CATEGORY             VARCHAR(12) NULL,               --设备类别(表码 BM_REPERTORY_CATEGORY)
  EQUIP_GENERIC              VARCHAR(6) NULL,                --设备名称(表码 BM_EQUIP_GENERIC)
  EQUIP_SPECIFIC             VARCHAR(6) NULL,                --规格型号(表码 BM_EQUIP_SPECIFIC)
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  CUSTOMER_ID                BIGINT NULL,                    --关联客户(来源企业档案/客户档案)
  CUSTOMER_NAME              VARCHAR(64) NULL,               --关联客户
  CUSTOMER_TEL               VARCHAR(16) NULL,               --办公电话
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  PROJECT_SERIAL             VARCHAR(64) NULL,               --项目编号
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  ADDRESS                    VARCHAR(256) NULL,              --项目所属地(省+市+区+街道)
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  APPLYFOR_STATE             CHAR(1) NOT NULL,               --申请状态(表码值 0:待提交,1:待受理,2:待审批,3:完成)
  DEL_FLAG                   CHAR(1) NOT NULL,               --删除标识(表码值 0:删除,1:正常)
  CONSTRAINT UQ_T_REIMBURSE1 UNIQUE (REIMBURSE_SERIAL)
);
--报销票据信息
CREATE TABLE T_REIMBURSE_TICKET
(
  TICKET_ID                  BIGINT IDENTITY PRIMARY KEY,
  REIMBURSE_ID               BIGINT NOT NULL,        
  REIMBURSE_TYPE             VARCHAR(6) NOT NULL,            --费用类别(表码 BM_REIMBURSE_TYPE)
  TICKET_DATE                CHAR(10) NOT NULL,              --发生日期
  TICKET_QUANTITY            SMALLINT NOT NULL,              --票据张数
  SPECIFIC_NAME              VARCHAR(64) NULL,               --规格名称
  MODEL_NAME                 VARCHAR(64) NULL,               --型号
  UNIT_PRICE                 NUMERIC(12, 2) NOT NULL,        --单价
  QUANTITY                   SMALLINT NOT NULL,              --数量
  SUMMARY                    NUMERIC(12, 2) NOT NULL,        --小计金额
  REMARK                     VARCHAR(256) NULL               --费用备注
  CAR_ID                     BIGINT NULL,                    --车辆ID
  LICENSE_PLATE              VARCHAR(16) NULL                --车牌号
);
--盘点记录
CREATE TABLE T_INVENTORY
(
  INVENTORY_ID               BIGINT IDENTITY PRIMARY KEY,
  INVENTORY_SERIAL           VARCHAR(64) NOT NULL,           --盘点编号
  INVENTORY_THEME            VARCHAR(96) NULL,               --盘点主题
  REPERTORY_CATEGORY         VARCHAR(12) NULL,               --设备/配件类别(表码 BM_REPERTORY_CATEGORY)
  START_TIME                 SMALLDATETIME NOT NULL,         --盘点期初时间
  END_TIME                   SMALLDATETIME NOT NULL,         --盘点期末时间
  USER_ID                    BIGINT NOT NULL,                --盘点人员(默认当前用户)
  USER_NAME                  VARCHAR(64) NOT NULL,           --盘点人员
  DEP_ID                     BIGINT NOT NULL,                --盘点部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --盘点时间
  DEL_FLAG                   CHAR(1) NOT NULL,               --删除标识(表码值 0:删除,1:正常)
  CONSTRAINT UQ_T_INVENTORY1 UNIQUE (INVENTORY_SERIAL)
);
CREATE TABLE T_INVENTORY_CATEGORY
(
  INV_CATEGORY_ID            BIGINT IDENTITY PRIMARY KEY,
  INVENTORY_ID               BIGINT NOT NULL,                --盘点记录ID
  REPERTORY_CATEGORY         VARCHAR(12) NULL,               --设备/配件类别(表码 BM_REPERTORY_CATEGORY)
  BOOK_QUANTITY              SMALLINT NOT NULL,              --账面数量(来源盘点期间前的有效状态设备数)
  INVENTORY_QUANTITY         SMALLINT NOT NULL,              --盘点数量(来源盘点结束时间之日的有效状态设备数)
  SCRAP_QUANTITY             SMALLINT NOT NULL,              --报废数
  BORROW_QUANTITY            SMALLINT NOT NULL,              --借出数
  PICKUP_QUANTITY            SMALLINT NOT NULL,              --领用数
  MISS_QUANTITY              SMALLINT NOT NULL               --遗失数
);
--评论
CREATE TABLE T_REVIEW
(
  REVIEW_ID                  BIGINT IDENTITY PRIMARY KEY,
  RELATE_ID                  BIGINT NULL,                    --关联业务
  RELATE_MODULE              VARCHAR(32) NULL,               --关联业务模块
  CONTENT                    VARCHAR(1024) NOT NULL,         --评论内容
  REVIEW_TIME                SMALLDATETIME NOT NULL,         --评论时间
  PARENT_ID                  BIGINT NULL,                    --回复评论ID
  USER_ID                    BIGINT NOT NULL,                --评论人员(默认当前用户)
  USER_NAME                  VARCHAR(64) NOT NULL            --评论人员
);
--点赞
CREATE TABLE T_PRAISE
(
  Praise_ID                  BIGINT IDENTITY PRIMARY KEY,
  RELATE_ID                  BIGINT NULL,                    --关联业务
  RELATE_MODULE              VARCHAR(32) NULL,               --关联业务模块
  PRAISE_TIME                SMALLDATETIME NOT NULL,         --点赞时间
  USER_ID                    BIGINT NOT NULL,                --点赞人员(默认当前用户)
  USER_NAME                  VARCHAR(64) NOT NULL            --点赞人员
);
--安装管理
CREATE TABLE T_INSTALL_MANAGE
(
  INSTALL_ID                 BIGINT IDENTITY PRIMARY KEY,
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  STARTIN_DATE               SMALLDATETIME NOT NULL,         --进场日期
  ENDIN_DATE                 SMALLDATETIME NOT NULL,         --退场日期
  WALL_ATTACHE_QTY           SMALLINT NULL,                  --本次附墙数
  BRACHIUM                   NUMERIC(12, 2) NULL,            --臂长
  INSTALL_HEIGHT             NUMERIC(12, 2) NULL,            --安装高度
  LONGITUDE                  VARCHAR(16) NULL,               --经度
  LATITUDE                   VARCHAR(16) NULL,               --纬度
  ADDRESS                    VARCHAR(128) NULL,              --地址
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  FILE_ATTACHES              VARCHAR(1024) NULL              --附件信息ID  
);
--安全巡检 InspectManage
CREATE TABLE T_INSPECT_MANAGE
(
  INSPECT_ID                 BIGINT IDENTITY PRIMARY KEY,
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  INSPECT_DATE               DATETIME NULL,                  --实际巡检时间(实际巡检时间)
  INSPECT_PEPOLES            VARCHAR(128) NULL,              --巡检人员
  INSPECT_RESULT             VARCHAR(6) NULL,                --整机巡检结果(表码 BM_INSPECT_RESULT)
  REMARK                     VARCHAR(256) NULL,              --备注
  LONGITUDE                  VARCHAR(16) NULL,               --经度
  LATITUDE                   VARCHAR(16) NULL,               --纬度
  ADDRESS                    VARCHAR(128) NULL,              --地址
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  FILE_ATTACHES              VARCHAR(1024) NULL              --附件信息ID  
);
--拆卸管理
CREATE TABLE T_DISMANTLE_MANAGE
(
  DISMANTLE_ID               BIGINT IDENTITY PRIMARY KEY,
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  STARTDIS_DATE              SMALLDATETIME NOT NULL,         --实际进场时间(格式:年月日时,例如:2013年6月25日10时)
  ENDDIS_DATE                SMALLDATETIME NOT NULL,         --实际退场时间(单位:年月日时)
  DISMANTLE_HEIGHT           VARCHAR(8) NULL,                --拆卸高度
  LONGITUDE                  VARCHAR(16) NULL,               --经度
  LATITUDE                   VARCHAR(16) NULL,               --纬度
  ADDRESS                    VARCHAR(128) NULL,              --地址
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  FILE_ATTACHES              VARCHAR(1024) NULL              --附件信息ID  
);
--班组核算
CREATE TABLE T_TEAMS_ACCOUNT
(
  TEAMS_ACCOUNT_ID           BIGINT IDENTITY PRIMARY KEY,
  TEAMS_ACCOUNT_SERIAL       VARCHAR(64) NOT NULL,           --核算单号
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  PRACTI_ID                  BIGINT NULL,                    --班组负责人ID
  PRACTI_NAME                VARCHAR(32) NULL,               --班组负责人
  TEAMS                      VARCHAR(32) NULL,               --班组名称
  ACCOUNT_START_DATE         SMALLDATETIME NULL,             --结算开始时间
  ACCOUNT_END_DATE           SMALLDATETIME NULL,             --结算结束时间
  KNOT_PRICE                 NUMERIC(12, 2) NULL,            --标准节单价
  WALL_ATTACHE_PRICE         NUMERIC(12, 2) NULL,            --附墙单价(元)
  DEDUCT_AMOUNT              NUMERIC(12, 2) NOT NULL,        --应扣总额(元)
  PAYMENT_AMOUNT             NUMERIC(12, 2) NOT NULL,        --应付金额(元)
  FINISHED_AMOUNT            NUMERIC(12, 2) NOT NULL,        --已付金额(元)
  KNOT_AMOUNT                NUMERIC(12, 2) NOT NULL,        --标准节金额(元)
  WALL_AMOUNT                NUMERIC(12, 2) NOT NULL,        --附墙金额(元)
  AUTOCRANE_AMOUNT           NUMERIC(12, 2) NOT NULL,        --汽车吊金额(元)
  LGISTICS_AMOUNT            NUMERIC(12, 2) NOT NULL,        --运输费金额(元)
  OTHER_AMOUNT               NUMERIC(12, 2) NOT NULL,        --其他金额(元)
  PRACTI_AMOUNT              NUMERIC(12, 2) NOT NULL,        --人员金额(元)
  FUND_STATUS                CHAR(1) NULL,                   --款项状态(表码值 0:待付款,1:付款中,2:已付款)
  EFFECTIVE                  CHAR(1) NOT NULL,               --生效标识(表码值 0:未生效,1:生效)
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  PROVIDED_DATE              CHAR(10) NOT NULL               --登记时间
);
--班组核算-标准节
CREATE TABLE T_TEAMS_ACCOUNT_KNOT
(
  ACCOUNT_KNOT_ID            BIGINT IDENTITY PRIMARY KEY,
  TEAMS_ACCOUNT_ID           BIGINT NULL,                    --班组核算ID
  ACCOUNT_DATE               CHAR(10) NULL,                  --日期(首次安装开始日期/顶升日期/拆卸日期)
  KNOT_TYPE                  VARCHAR(64) NULL,               --类型(首次安装/顶升/拆卸)
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  BUILDING_NUM               VARCHAR(64) NULL,               --楼号
  COMPON_GENERIC             VARCHAR(6) NOT NULL,            --零配件名称(表码 BM_COMPONENT_GENERIC)
  COMPON_SPECIFIC            VARCHAR(6) NULL,                --配件型号(表码 BM_COMPONENT_SPECIFIC)
  QUANTITY                   SMALLINT NOT NULL,              --数量
  MEASUREMENT                VARCHAR(64) NOT NULL,           --单位(节/米/台)
  ACCOUNT_PRICE              NUMERIC(12, 2) NOT NULL,        --单价
  DEDUCT_QUANTITY            SMALLINT NOT NULL,              --应扣数量
  COUNTS                     SMALLINT NOT NULL,              --原始数量
  KNOT_METRIC                NUMERIC(12, 2) NULL,            --标准节长度
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  PRACTI_ID                  BIGINT NULL,                    --班组负责人ID
  PRACTI_NAME                VARCHAR(32) NULL,               --班组负责人
  SUMMARY                    NUMERIC(12, 2) NOT NULL         --小计((数量-应扣数量)*单价)
);
--班组核算-附墙
CREATE TABLE T_TEAMS_ACCOUNT_WALL
(
  ACCOUNT_WALL_ID            BIGINT IDENTITY PRIMARY KEY,
  TEAMS_ACCOUNT_ID           BIGINT NULL,                    --班组核算ID
  ACCOUNT_DATE               CHAR(10) NULL,                  --日期(首次安装开始日期/顶升日期/拆卸日期)
  WALL_TYPE                  VARCHAR(64) NULL,               --类型(首次安装/顶升/拆卸)
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  BUILDING_NUM               VARCHAR(64) NULL,               --楼号
  COMPON_GENERIC             VARCHAR(6) NOT NULL,            --零配件名称(表码 BM_COMPONENT_GENERIC)
  COMPON_SPECIFIC            VARCHAR(6) NULL,                --配件型号(表码 BM_COMPONENT_SPECIFIC)
  QUANTITY                   SMALLINT NOT NULL,              --数量
  MEASUREMENT                VARCHAR(64) NOT NULL,           --单位(道/套)
  ACCOUNT_PRICE              NUMERIC(12, 2) NOT NULL,        --单价
  DEDUCT_QUANTITY            SMALLINT NOT NULL,              --应扣数量
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  PRACTI_ID                  BIGINT NULL,                    --班组负责人ID
  PRACTI_NAME                VARCHAR(32) NULL,               --班组负责人
  SUMMARY                    NUMERIC(12, 2) NOT NULL         --小计((数量-应扣数量)*单价)
);
--班组核算-汽车吊
CREATE TABLE T_TEAMS_ACCOUNT_AUTOCRANE
(
  ACCOUNT_AUTOCRANE_ID       BIGINT IDENTITY PRIMARY KEY,
  TEAMS_ACCOUNT_ID           BIGINT NULL,                    --班组核算ID
  ACCOUNT_DATE               CHAR(10) NULL,                  --日期
  AMOUNT_TYPE                VARCHAR(128) NULL,              --费用类别
  SPECIFIC_NAME              VARCHAR(64) NULL,               --规格型号
  QUANTITY                   SMALLINT NOT NULL,              --数量
  MEASUREMENT                VARCHAR(64) NOT NULL,           --单位(台)
  MACHINE_TEAM               VARCHAR(64) NULL,               --台班
  ACCOUNT_PRICE              NUMERIC(12, 2) NOT NULL,        --单价
  DEDUCT_QUANTITY            SMALLINT NOT NULL,              --应扣数量
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  PRACTI_ID                  BIGINT NULL,                    --班组负责人ID
  PRACTI_NAME                VARCHAR(32) NULL,               --班组负责人
  SUMMARY                    NUMERIC(12, 2) NOT NULL         --小计((数量-应扣数量)*单价)
);
--班组核算-运输费
CREATE TABLE T_TEAMS_ACCOUNT_LOGISTICS
(
  ACCOUNT_LOGISTICSE_ID      BIGINT IDENTITY PRIMARY KEY,
  TEAMS_ACCOUNT_ID           BIGINT NULL,                    --班组核算ID
  AMOUNT_TYPE                VARCHAR(128) NULL,              --费用类别
  SPECIFIC_NAME              VARCHAR(64) NULL,               --规格型号
  QUANTITY                   SMALLINT NOT NULL,              --数量
  MEASUREMENT                VARCHAR(64) NOT NULL,           --单位(次)
  ACCOUNT_PRICE              NUMERIC(12, 2) NOT NULL,        --单价
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  PRACTI_ID                  BIGINT NULL,                    --班组负责人ID
  PRACTI_NAME                VARCHAR(32) NULL,               --班组负责人
  SUMMARY                    NUMERIC(12, 2) NOT NULL         --小计
);
--班组核算-其他
CREATE TABLE T_TEAMS_ACCOUNT_OTHER
(
  ACCOUNT_OTHERE_ID          BIGINT IDENTITY PRIMARY KEY,
  TEAMS_ACCOUNT_ID           BIGINT NULL,                    --班组核算ID
  OTHER_NAME                 VARCHAR(128) NULL,              --名称
  SPECIFIC_NAME              VARCHAR(64) NULL,               --规格型号
  QUANTITY                   SMALLINT NOT NULL,              --数量
  MEASUREMENT                VARCHAR(64) NOT NULL,           --单位
  ACCOUNT_PRICE              NUMERIC(12, 2) NOT NULL,        --单价
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  PRACTI_ID                  BIGINT NULL,                    --班组负责人ID
  PRACTI_NAME                VARCHAR(32) NULL,               --班组负责人
  SUMMARY                    NUMERIC(12, 2) NOT NULL         --小计
);
--班组核算-员工
CREATE TABLE T_TEAMS_ACCOUNT_PRACTI
(
  ACCOUNT_PRACTIE_ID         BIGINT IDENTITY PRIMARY KEY,
  TEAMS_ACCOUNT_ID           BIGINT NULL,                    --班组核算ID
  PRACTI_ID                  BIGINT NULL,                    --人员(来源企业人员档案)
  PRACTI_NAME                VARCHAR(32) NULL,               --人员姓名
  REMARK                     VARCHAR(256) NULL,              --工作内容
  BASE_SALARY                NUMERIC(12, 2) NOT NULL,        --底薪
  PRESENT_AMOUNT             NUMERIC(12, 2) NOT NULL,        --分摊费用
  DEDUCT_AMOUNT              SMALLINT NOT NULL,              --应扣金额
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  SUMMARY                    NUMERIC(12, 2) NOT NULL         --合计(合计=底薪+分摊费用-应扣金额)
);
--业务申请
CREATE TABLE T_CONTRACT_APPLICATION
(
  APPLICATION_ID             BIGINT IDENTITY PRIMARY KEY,
  APPLICATION_SERIAL         VARCHAR(64) NOT NULL,           --业务申请编号(YW+年月日+3位流水号)
  PROVINCE                   VARCHAR(6) NULL,                --所属省份(代码字典下拉)
  CUSTOMER_ID                BIGINT NULL,                    --承租单位(来源客户档案)
  CUSTOMER_NAME              VARCHAR(64) NULL,               --承租单位
  CUSTOMER_ADDRESS           VARCHAR(128) NULL,              --承租单位地址
  LINKER                     VARCHAR(32) NULL,               --客户联系人
  LINKER_TEL                 VARCHAR(16) NULL,               --联系电话
  CORP_ID                    BIGINT NULL,                    --所属公司(来源企业档案)
  CORP_NAME                  VARCHAR(64) NULL,               --所属公司
  DUTYMAN                    VARCHAR(32) NULL,               --公司负责人
  EQUIP_CATEGORY             VARCHAR(12) NULL,               --设备类别(表码 BM_REPERTORY_CATEGORY)
  QUANTITY                   SMALLINT NULL,                  --数量
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  PROJECT_ADDRESS            VARCHAR(256) NULL,              --项目所属地(省+市+区+街道)
  PROJECT_time_limit         VARCHAR(64) NULL,               --项目工期
  OVERALL_HEIGHT             NUMERIC(12, 2) NULL,            --建筑物高度(m)
  PROJECT_STATUS             VARCHAR(64) NULL,               --工程现状
  START_DATE                 CHAR(10) NULL,                  --预计进场时间
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  APPLYFOR_STATE             CHAR(1) NOT NULL,               --申请状态(表码值 0:待提交,1:待受理,2:待审批,3:完成)
  PROVIDED_DATE              CHAR(10) NOT NULL               --申请日期
);
--业务申请设备
CREATE TABLE T_CONTRACT_APPLICATION_EQUIPMENT
(
  APPLICATION_EQUIP_ID       BIGINT IDENTITY PRIMARY KEY,
  APPLICATION_ID             BIGINT NULL,
  EQUIP_GENERIC_NAME         VARCHAR(64) NULL,               --设备名称
  EQUIP_VENDER               VARCHAR(128) NULL,              --生产厂家
  EQUIP_SPECIFIC_NAME        VARCHAR(64) NULL,               --设备型号
  QUANTITY                   SMALLINT NULL,                  --数量(台)
  OVERALL_HEIGHT             NUMERIC(12, 2) NULL,            --满足高度(米)
  APPEARANCE_COST            NUMERIC(12, 2) NULL,            --进退场费(元/台)
  EMBEDDED_COST              NUMERIC(12, 2) NULL,            --基础预埋件(元/套)
  SETTLE_METHOD              VARCHAR(64) NULL                --结算方式
);
--塔吊/升降机安排
CREATE TABLE T_CONTRACT_APPLICATION_PLAN
(
  PLAN_ID                    BIGINT IDENTITY PRIMARY KEY,
  APPLICATION_ID             BIGINT NULL,
  PLAN_TYPE                  CHAR(1) NOT NULL,               --类型(表码值 0:塔吊,1:升降机)
  RECEIVE_ENT_NAME           VARCHAR(64) NULL,               --承租单位
  PROJECT_NAME               VARCHAR(64) NULL,               --项目名称
  DEMAND                     VARCHAR(64) NULL,               --项目要求
  INSTALL_HEIGHT             NUMERIC(12, 2) NULL,            --安装高度
  DURATION                   NUMERIC(12, 2) NULL,            --安装时间(估)
  EQUIP_SPECIFIC_NAME        VARCHAR(64) NULL,               --设备型号
  BASE_DESCRIBE              VARCHAR(256) NULL,              --基础
  PROPERTY_NAME              VARCHAR(64) NULL,               --产权
  EQUIP_SOURCE               VARCHAR(6) NULL,                --设备来源
  EQUIP_VENDER               VARCHAR(128) NULL,              --设备品牌
  IC_SERIAL                  VARCHAR(64) NULL,               --IC编号
  REMARK                     VARCHAR(256) NULL               --备注
);
--催款函
CREATE TABLE T_OVERDUE_PAYMENT
(
  OVERDUE_PAYMENT_ID         BIGINT IDENTITY PRIMARY KEY,
  OVERDUE_PAYMENT_SERIAL     VARCHAR(64) NOT NULL,           --催款编号(CK+年月日+3位流水号)
  CUSTOMER_ID                BIGINT NULL,                    --承租单位(来源客户档案)
  CUSTOMER_NAME              VARCHAR(64) NULL,               --承租单位
  CORP_ID                    BIGINT NULL,                    --出租单位(来源企业档案)
  CORP_NAME                  VARCHAR(64) NULL,               --出租单位
  CONTENTS                   TEXT NULL                       --催款内容
);
--代租结算
CREATE TABLE T_RENT_CONTRACT
(
  RENT_ID                    BIGINT IDENTITY PRIMARY KEY,
  RENT_SERIAL                VARCHAR(64) NOT NULL,           --结算单号
  RENT_THEME                 VARCHAR(96) NOT NULL,           --结算主题
  CONTRACTOR                 VARCHAR(64) NULL,               --承包人
  PROPERTY_NAME              VARCHAR(64) NULL,               --产权人
  CONTRACT_ID                BIGINT NOT NULL,                --合同ID
  CONTRACT_SERIAL            VARCHAR(64) NOT NULL,           --合同编号
  CONTRACT_THEME             VARCHAR(96) NOT NULL,           --合同主题
  PA_ENT                     BIGINT NOT NULL,                --承租/甲方单位(企业档案/客户档案)
  PA_MODULE                  VARCHAR(32) NOT NULL,           --承租/甲方模块
  PA_ENT_NAME                VARCHAR(64) NOT NULL,           --承租/甲方单位名称
  PB_ENT                     BIGINT NOT NULL,                --出租/乙方单位(企业档案/客户档案)
  PB_MODULE                  VARCHAR(32) NOT NULL,           --出租/乙方模块
  PB_ENT_NAME                VARCHAR(64) NOT NULL,           --出租/乙方单位名称
  PROJECT_ID                 BIGINT NULL,                    --项目ID(项目档案)
  PROJECT_SERIAL             VARCHAR(64) NULL,               --项目编号
  PROJECT_NAME               VARCHAR(64) NOT NULL,           --项目名称
  ADDRESS                    VARCHAR(256) NULL,              --项目所属地(省+市+区+街道)
  START_RENT_DATE            CHAR(10) NOT NULL,              --结算起始时间
  END_RENT_DATE              CHAR(10) NOT NULL,              --结算结束时间
  RENT_AMOUNT                NUMERIC(12, 2) NOT NULL,        --代租结算总金额
  DEDUCT_AMOUNT              NUMERIC(12, 2) NOT NULL,        --应扣总金额
  PAYMENT_AMOUNT             NUMERIC(12, 2) NOT NULL,        --应付总金额
  FINISHED_AMOUNT            NUMERIC(12, 2) NOT NULL,        --完成金额
  FUND_STATUS                CHAR(1) NOT NULL,               --款项状态(表码值 0:待付款,1:付款中,2:已付款)
  EFFECTIVE                  CHAR(1) NOT NULL,               --生效标识(表码值 0:未生效,1:生效)
  REMARK                     VARCHAR(256) NULL,              --备注
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(32) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL               --填报时间
);
--代租结算设备清单
CREATE TABLE T_RENT_EQUIP_BRIEF
(
  RENT_EQUIP_BRIEF_ID        BIGINT IDENTITY PRIMARY KEY,
  RENT_ID                    BIGINT NULL,                    --结算ID
  EQUIP_ID                   BIGINT NULL,                    --租赁设备(设备档案)
  RECORD_SERIAL              VARCHAR(64) NULL,               --设备编号
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  EXW_SERIAL                 VARCHAR(64) NULL,               --出厂编号
  EQUIP_CATEGORY_NAME        VARCHAR(64) NOT NULL,           --设备类别/品名(引用表码 BM_REPERTORY_CATEGORY)
  EQUIP_SPECIFIC_NAME        VARCHAR(64) NOT NULL,           --规格型号(引用表码 BM_EQUIP_SPECIFIC)
  BUILDING_NUM               VARCHAR(64) NULL,               --楼号
  UNIT                       VARCHAR(16) NOT NULL,           --单位
  START_RENT_DATE            CHAR(10) NOT NULL,              --启用日
  END_RENT_DATE              CHAR(10) NOT NULL,              --截止日
  RENT_DAYS                  SMALLINT NOT NULL,              --计费天数
  RENT_STANDARD              NUMERIC(12, 2) NOT NULL,        --租金标准
  MEASUREMENT                VARCHAR(6) NOT NULL,            --租金单位
  QUANTITY                   SMALLINT NOT NULL,              --租赁数量
  DAYS_RENT                  NUMERIC(12, 2) NOT NULL,        --日租金
  DEDUCT_RENT                NUMERIC(12, 2) NOT NULL,        --应扣租金
  SUMMARY                    NUMERIC(12, 2) NOT NULL,        --租金累计
  REMARK                     VARCHAR(256) NULL               --备注
);
--代租结算零配件清单
CREATE TABLE T_RENT_COMPON_BRIEF
(
  RENT_COMPON_BRIEF_ID       BIGINT IDENTITY PRIMARY KEY,
  RENT_ID                    BIGINT NULL,                    --结算ID
  COMPON_ID                  BIGINT NULL,                    --租赁零配件(零配件档案)
  COMPON_CATEGORY_NAME       VARCHAR(64) NOT NULL,           --设备类别/品名(引用表码 BM_REPERTORY_CATEGORY)
  COMPON_SPECIFIC_NAME       VARCHAR(64) NULL,               --设备型号(引用表码 BM_COMPONENT_SPECIFIC)
  UNIT                       VARCHAR(16) NOT NULL,           --单位
  START_RENT_DATE            CHAR(10) NOT NULL,              --启用日
  END_RENT_DATE              CHAR(10) NOT NULL,              --截止日
  RENT_DAYS                  SMALLINT NOT NULL,              --计费天数
  RENT_STANDARD              NUMERIC(12, 2) NOT NULL,        --租金标准
  MEASUREMENT                VARCHAR(6) NOT NULL,            --租金单位
  QUANTITY                   SMALLINT NOT NULL,              --租赁数量
  DAYS_RENT                  NUMERIC(12, 2) NOT NULL,        --日租金
  DEDUCT_RENT                NUMERIC(12, 2) NOT NULL,        --应扣租金
  SUMMARY                    NUMERIC(12, 2) NOT NULL,        --租金累计
  EQUIP_ID                   BIGINT NULL,                    --租赁设备(设备档案)
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  REMARK                     VARCHAR(256) NULL               --备注
);
--代租结算其他费用清单
CREATE TABLE T_RENT_ITEM_BRIEF
(
  RENT_ITEM_BRIEF_ID         BIGINT IDENTITY PRIMARY KEY,
  RENT_ID                    BIGINT NULL,                    --结算ID
  RENT_ITEM_NAME             VARCHAR(64) NOT NULL,           --费用项目
  QUANTITY                   SMALLINT NOT NULL,              --数量
  UNITPRICE                  NUMERIC(12, 2) NOT NULL,        --费用单价
  MEASUREMENT                VARCHAR(16) NOT NULL,           --租金计量单位(表码 BM_MEASUREMENT)
  DEDUCT_RENT                NUMERIC(12, 2) NOT NULL,        --应扣租金
  ITEM_CUMULATE              NUMERIC(12, 2) NOT NULL,        --费用累计
  SUMMARY                    NUMERIC(12, 2) NOT NULL,        --租金累计
  EQUIP_ID                   BIGINT NULL,                    --租赁设备(设备档案)
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  REMARK                     VARCHAR(256) NULL               --备注
);
--代租结算扣费清单
CREATE TABLE T_RENT_DEDUCT_BRIEF
(
  RENT_DEDUCT_BRIEF_ID       BIGINT IDENTITY PRIMARY KEY,
  RENT_ID                    BIGINT NULL,                    --结算ID
  EQUIP_ID                   BIGINT NULL,                    --租赁设备(设备档案)
  EQUIP_CATEGORY_NAME        VARCHAR(64) NOT NULL,           --设备类别/品名(引用表码 BM_REPERTORY_CATEGORY)
  EQUIP_SPECIFIC_NAME        VARCHAR(64) NOT NULL,           --规格型号(引用表码 BM_EQUIP_SPECIFIC)
  RECORD_ID                  VARCHAR(24) NULL,               --备案编号
  QUANTITY                   SMALLINT NOT NULL,              --数量
  UNITPRICE                  NUMERIC(12, 2) NOT NULL,        --单价
  MEASUREMENT                VARCHAR(16) NOT NULL,           --计量单位(表码 BM_MEASUREMENT)
  SUMMARY                    NUMERIC(12, 2) NOT NULL,        --应扣累计
  REMARK                     VARCHAR(256) NULL               --扣费说明
);
--现金流表
CREATE TABLE T_CASH_STATEMENT
(
  STAT_DATE                  CHAR(10) NOT NULL,              --统计时间
  SETTLE_CONTRACT            NUMERIC(12, 2) NULL,            --合同回款(收款管理中合同结算)
  BACK_AMOUNT                NUMERIC(12, 2) NULL,            --借款返还(还款信息)
  PURCHASE_AMOUNT            NUMERIC(12, 2) NULL,            --采购退款(收款管理中采购管理)
  CLAIM_AMOUNT               NUMERIC(12, 2) NULL,            --保险理赔(收款管理中保险管理)
  PURCHASE_PAY_AMOUNT        NUMERIC(12, 2) NULL,            --采购付款(付款管理的采购管理)
  LEND_AMOUNT                NUMERIC(12, 2) NULL,            --费用借款(借款信息)
  REIMBURSE_AMOUNT           NUMERIC(12, 2) NULL,            --费用报销(报销管理)
  SALARY_AMOUNT              NUMERIC(12, 2) NULL,            --工资支出(薪资管理)
  EQUIP_MORTGAGE             NUMERIC(12, 2) NULL,            --设备按揭(付款管理的设备按揭)
  INSURE_AMOUNT              NUMERIC(12, 2) NULL,            --保险费(付款管理的保险信息)
  EQUIP_DETECT               NUMERIC(12, 2) NULL,            --检测费(付款管理的检测信息)
  LOGISTICS_TRANSPORT        NUMERIC(12, 2) NULL,            --物流运输费(付款管理的物流信息)
  TEAMS_ACCOUNT              NUMERIC(12, 2) NULL,            --班组结算费(付款管理的班组结算)
  RENT_CONTRACT              NUMERIC(12, 2) NULL,            --转租结算费(付款管理的合同结算)
  TAX_AMOUNT                 NUMERIC(12, 2) NULL             --税金
);
--施工作业单
CREATE TABLE T_CONSTRUCT_OPERATION
(
  CONSTRUCT_ID               BIGINT IDENTITY PRIMARY KEY,
  CONSTRUCT_SERIAL           VARCHAR(64) NOT NULL,           --编号(SG+年月日+2位流水号)
  CONSTRUCT_THEME            VARCHAR(96) NOT NULL,           --施工作业主题
  CONSTRUCT_DATE             CHAR(10) NULL,                  --施工作业时间
  USER_NAME                  VARCHAR(32) NOT NULL,           --填报人
  CREATE_BY                 VARCHAR(32) NOT NULL,           --填报人ID
  PROVIDED_DATE              CHAR(10) NOT NULL,              --填报日期
  PROJECT_ID                 BIGINT NULL,                    --项目ID(合同信息项目)
  BUILDING_NUM               VARCHAR(64) NULL,               --楼号
  EQUIP_ID                   BIGINT NULL,                    --备案编号(导入设备档案)
  PA_ENT_NAME                VARCHAR(64) NULL,               --使用单位(默认合同承租方-来源客户档案)
  PB_ENT_NAME                VARCHAR(64) NULL,               --安装单位(默认合同出租方-来源企业信息)
  PRACTI_NAMES               VARCHAR(512) NULL,              --作业人员(来源员工档案 多选)
  PROJECT_PRINCIPAL          VARCHAR(64) NULL,               --项目负责人
  TEAMS                      VARCHAR(32) NULL,               --班组长
  FINISHED_AMOUNT            NUMERIC(12, 2) NOT NULL,        --已付金额
  REMAINDER_AMOUNT           NUMERIC(12, 2) NOT NULL,        --未付金额
  PLAN_HEIGHT                VARCHAR(16) NULL,               --计划安装高度(不必填)
  REAL_HEIGHT                VARCHAR(16) NULL,               --实际安装高度(不必填)
  FUND_STATUS                CHAR(1) NOT NULL,               --款项状态
  SUMMARY                    NUMERIC(12, 2) NULL,            --费用合计(任务单合计之和)
  EFFECTIVE                  CHAR(1) NOT NULL,               --生效标识(表码值 0:未生效,1:生效)
  REMARK                     VARCHAR(256) NULL,              --备注
  LICENSE_PLATE              VARCHAR(16) NULL,               -- 车牌号
  APPROVE_ADDRESS            VARCHAR(256) NULL,              --审批位置
  RECEIVE_DATE               VARCHAR(10) NULL,               ---到达项目时间
  MILEAGE                    numeric(12,2) NULL,             ---里程数
  CONFIM_DATE                VARCHAR(10) NULL,               ---到达项目时间
  ACTUAL_DATE                VARCHAR(10) NULL,                ---到达项目时间
  CLOSED_DATE                VARCHAR(10) NULL,               ---到达项目时间
  ACTUAL_PRACTI_NAMES        VARCHAR(128) NULL               ---到达项目时间
);
--施工作业单任务
CREATE TABLE T_CONSTRUCT_OPERATION_TASK
(
  CONSTRUCT_TASK_ID          BIGINT IDENTITY PRIMARY KEY,
  CONSTRUCT_ID               BIGINT NULL,                    --施工作业单ID
  CONTENTS                   VARCHAR(1024) NULL,             --任务内容
  UNIT                       VARCHAR(32) NULL,               --单位
  QUANTITY                   SMALLINT NOT NULL,              --数量
  UNIT_PRICE                 NUMERIC(12, 2) NOT NULL,        --单价
  SUMMARY                    NUMERIC(12, 2) NOT NULL,        --合计(数量*单价)
  TASK_TYPE                  CHAR(1) NOT NULL,               --任务类型(表码值 0:计划/1:实际)
  REMARK                     VARCHAR(256) NULL               --备注
);
--进场通知 T_ENTER_FACTORY_NOTICE
CREATE TABLE T_ENTER_FACTORY_NOTICE
(
  FACTORY_NOTICE_ID BIGINT IDENTITY PRIMARY KEY,   --ID
  USER_NAME VARCHAR(32) NOT NULL,                  --填报人
  PROVIDED_DATE CHAR(10) NOT NULL,                 --填报日期(默认为当前日期)
  PROJECT_ID BIGINT NOT NULL,                      --关联项目
  PROJECT_TEL VARCHAR(32) NULL,                    --项目联系电话
  PRACTI_ID BIGINT NOT NULL,                       --关联业务员
  START_DATE smalldatetime NOT NULL,                    --项目要求进场时间
  INSTALL_DATE smalldatetime NULL,                      --项目要求安装时间
  CONDITIONS VARCHAR(100) NULL,                    --进车条件
  CRANE_FEE NUMERIC(12,2) NULL,                    --吊车费
  START_LINCENSE VARCHAR(32) NULL,                 --开工许可证
  REGULATORS CHAR(1) NULL,                         --监管部门
  LAW_CONTENT VARCHAR(200) NULL,                   --塔司相关条款
  COMMAND_CONTENT VARCHAR(200) NULL,               --指挥相关条款
  OTHER_CONTENT VARCHAR(200) NULL,                 --其他说明
  DEL_FLAG  CHAR(1) NOT NULL
);
--进场通知设备表
CREATE TABLE T_ENTER_FACTORY_EQUIP(
  EN_FACTORY_EQUIP_ID BIGINT IDENTITY PRIMARY KEY,   --ID
  FACTORY_NOTICE_ID BIGINT NOT NULL,                 --进场通知ID
  EQUIP_GENERIC_NAME VARCHAR(64) NULL,                    --设备名称
  EQUIP_SPECIFIC_NAME VARCHAR(64) NULL,					 --设备型号
  COUNTS VARCHAR(6) NULL,							 --数量
  INIT_HEIGHT numeric(12, 2) NULL,					 --首次安装高度
  CONTRACT_HEIGHT numeric(12, 2) NULL,				 --合同高度
  WALL_ATTACHE_QTY smallint NULL,					 --附墙数
  BRACHIUM NUMERIC(12, 2) NULL						 --安装臂长
);
--审批意见表
CREATE TABLE T_FORM_OPINION(
  OPINION_ID BIGINT IDENTITY PRIMARY KEY,          --ID
  RELATE_ID BIGINT,								 --关联ID
  RELATE_MODULE VARCHAR(32),						 --关联模块
  OPINION_TYPE VARCHAR(32),                        --意见类型
  OPINION_USERID BIGINT,                           --意见人ID
  OPINION_USERNAME VARCHAR(32),                    --意见人姓名
  OPINION_DEP VARCHAR(128),                        --意见人部门
  OPINION_TIME SMALLDATETIME,                      --填报时间
  OPINION_CONTENT VARCHAR(512),                    --意见内容
  OPINION_REMARK VARCHAR(512)                      --意见备注
);
--App巡检整改表
CREATE TABLE T_INSPECT_RECTIFY (
  INSPECT_RECTIFY_ID BIGINT IDENTITY PRIMARY KEY,	 --ID
  INSPECT_ID         BIGINT NOT NULL,				 --巡检管理ID
  RECTIFY_DATE       SMALLDATETIME NOT NULL,       --整改日期
  RECTIFY_USERID     BIGINT NULL,					 --整改反馈人ID
  RECTIFY_USERNAME   VARCHAR(64) NULL,			 --整改反馈人
  RECTIFY_RESULT     VARCHAR(64) NULL,			 --整改结果
  RECTIFY_INTRODUCE  VARCHAR(1024) NULL,			--整改说明
  FILE_ATTACHES      VARCHAR(1024) NULL,       --附件信息ID
  LONGITUDE          VARCHAR(16) NOT NULL,         --经度
  LATITUDE           VARCHAR(16) NOT NULL          --纬度
);
--App调度设备明细表
CREATE TABLE T_APP_DISPATCH_EQUIP_DETAIL(
  DEID              BIGINT IDENTITY PRIMARY KEY,		--调度配件ID
  DISID             BIGINT NOT NULL,					--调度ID
  EQUIP_ID          BIGINT NOT NULL,                  --设备ID
  EQUIP_NAME        VARCHAR(64) NOT NULL,			    --设备名称
  EQUIP_SPECIFIC    VARCHAR(6) NOT NULL,              --规格型号(表码 BM_EQUIP_SPECIFIC)
  EXW_SERIAL        VARCHAR(64) NOT NULL,             --出厂编号
  RECORD_ID         VARCHAR(24) NULL                  --备案编号
);
--物流运输单表
CREATE TABLE T_LOGISTICS_DESTRIBUTION(
  DESTRIBUTION_ID bigint identity not null, -----运输单id
  TRANSPORT_ID  bigint  null, --物流id
  COMPON_GENERIC varchar(32) null, --配件名称
  COMPON_SPECIFIC varchar(32) null,      ---规格型号人员
  QUANTITY varchar(16) null      ---数量
);
--退场通知表
CREATE TABLE T_EXIT_FACTORY_NOTICE
(
  EXIT_FACTORY_NOTICE_ID BIGINT IDENTITY PRIMARY KEY,   --退场通知ID
  USER_NAME VARCHAR(32) NOT NULL,						--填报人
  PROVIDED_DATE CHAR(10) NOT NULL,						--填报日期(默认为当前日期)
  PROJECT_ID BIGINT NOT NULL,							--关联项目
  PROJECT_TEL VARCHAR(32) NULL,							--项目联系电话
  PRACTI_ID BIGINT NOT NULL,							--关联业务员
  START_DATE smalldatetime NOT NULL,                    --项目要求进场时间
  INSTALL_DATE smalldatetime NULL,                      --项目要求安装时间
  CONDITIONS VARCHAR(100) NULL,                    --进车条件
  CRANE_FEE NUMERIC(12,2) NULL,                    --吊车费
  START_LINCENSE VARCHAR(32) NULL,                 --开工许可证
  REGULATORS CHAR(1) NULL,                         --监管部门
  OTHER_CONTENT VARCHAR(200) NULL,                 --其他说明
  DEL_FLAG  CHAR(1) NOT NULL
);
--退场通知设备表
CREATE TABLE T_EXIT_FACTORY_EQUIP(
  EXIT_FACTORY_EQUIP_ID BIGINT IDENTITY PRIMARY KEY,	--退场设备ID
  EXIT_FACTORY_NOTICE_ID BIGINT NOT NULL,				--退场通知ID
  EQUIP_GENERIC_NAME VARCHAR(64) NULL,                  --设备名称
  EQUIP_SPECIFIC_NAME VARCHAR(64) NULL,					--设备型号
  COUNTS VARCHAR(6) NULL,							 --数量
  INIT_HEIGHT numeric(12, 2) NULL,					 --首次安装高度
  CONTRACT_HEIGHT numeric(12, 2) NULL,				 --合同高度
  WALL_ATTACHE_QTY smallint NULL,					 --附墙数
  BRACHIUM NUMERIC(12, 2) NULL						 --安装臂长
);
--预埋通知
CREATE TABLE T_BASIC_PRE_EMBEDDING_NOTICE
(
  PRE_EMBEDDING_NOTICE_ID BIGINT IDENTITY PRIMARY KEY,	--预埋通知ID
  USER_NAME VARCHAR(32) NOT NULL, 						--填报人
  PROVIDED_DATE CHAR(10) NOT NULL,						--下单日期--
  PROJECT_ID BIGINT NOT NULL, 							--项目名称（来源项目档案）--项目地址（来源项目档案）
  PROJECT_TEL VARCHAR(32) NULL,							--项目联系方式
  PRACTI_ID BIGINT NOT NULL,								--业务员（来源员工档案）--
  START_DATE smalldatetime NOT NULL,   					--项目要求进场时间
  INSTALL_DATE smalldatetime NULL, 						--项目要求安装时间
  REINFORCEMENT_CONDITION	VARCHAR(32),					--钢筋情况
  CONDITIONS VARCHAR(100) NULL,							--进车条件（100字符）
  CRANE_FEE NUMERIC(12,2) NULL,							--吊车费用
  OTHER_CONTENT VARCHAR(200) NULL,						--其他说明（200字符或以上）
  DEL_FLAG  CHAR(1) NOT NULL
);
--预埋通知设备表
CREATE TABLE T_BASIC_PRE_EMBEDDING_EQUIP(
  PRE_EMBEDDING_EQUIP_ID BIGINT IDENTITY PRIMARY KEY,	--预埋设备ID
  PRE_EMBEDDING_ID BIGINT NOT NULL,						--预埋通知ID
  EQUIP_GENERIC_NAME VARCHAR(64) NULL,				    --设备名称
  EQUIP_SPECIFIC_NAME VARCHAR(64) NULL,					--设备型号
  COUNTS VARCHAR(6) NULL								--数量
);
--装车物流
CREATE TABLE T_APP_LOGISTICS (
  LOGI_ID                    BIGINT IDENTITY PRIMARY KEY,               --物流ID
  DISID                      BIGINT NULL,                               --调度ID
  DELIVERY_DATE              CHAR(10) NOT NULL,                         --发货时间
  DELIVERY_MAN               VARCHAR(64) NOT NULL,                      --发货人(默认为登陆用户的姓名,仍可修改)
  PROPERTY_NAME              VARCHAR(64) NOT NULL,                      --产权人
  SEND_ID                    BIGINT NULL,                               --调出地仓库ID
  RECEIVE_ID                 BIGINT NULL,                               --调入地仓库ID
  SEND_WAREHOUSE_NAME        VARCHAR(128) NULL,                         --调出地仓库名称
  RECEIVE_WAREHOUSE_NAME     VARCHAR(128) NULL,                         --调入地仓库名称
  SEND_WAREHOUSE_TYPE        VARCHAR(32) NULL,                          --调出地仓库类型
  RECE_WAREHOUSE_TYPE        VARCHAR(32) NULL,                          --调入地仓库类型
  RECE_WAREHOUSE_ADDRESS     VARCHAR(128) NULL,                         --收货地址
  SUMMARY                    NUMERIC(12, 2) NULL,                       --费用合计
  CAR_ID                     BIGINT NULL,                               --车辆ID
  LICENSE_PLATE              VARCHAR(16) NULL,                          --车牌号
  SIGN_MAN                   VARCHAR(64) NULL,                          --签收人
  SIGN_RESULT                VARCHAR(32) NULL,                          --签收意见
  SIGN_DATE                  CHAR(10) NULL,                             --签收时间
  SIGN_ADDRESS               VARCHAR(128),                              --签收位置
  FILE_ATTACHES              VARCHAR(1024) NULL,                        --附件ID
  FILE_ATTACHES_RECEIVED     VARCHAR(1024) NULL,                        --签收附件ID
  REMARK                     VARCHAR(1024) NULL,                        --备注
  REMARK_RECE                VARCHAR(1024) NULL,                        --签收备注
  STATUS                     CHAR(1) NULL                               --物流状态（0：待签收   1:已签收）
);
--装车物流配件
CREATE TABLE T_APP_LOGISTICS_COMP(
  LOGI_COMP_ID                BIGINT IDENTITY PRIMARY KEY,               --物流配件ID
  LOGI_ID                     BIGINT NOT NULL,                           --装车物流ID
  COMP_DEID                   BIGINT NULL,                           --调度配件ID
  LOGI_NUM                    BIGINT DEFAULT 0,                          --运输数量
  RECE_NUM                    BIGINT DEFAULT 0                           --签收数量
);
--装车物流设备
CREATE TABLE T_APP_LOGISTICS_EQUIP(
  LOGI_EQUIP_ID               BIGINT IDENTITY PRIMARY KEY,               --物流设备ID
  LOGI_ID                     BIGINT NOT NULL,                           --装车物流ID
  EQUIP_DEID                  BIGINT NULL,                           --调度设备ID
  LOGI_NUM                    BIGINT DEFAULT 0,                          --运输数量
  RECE_NUM                    BIGINT DEFAULT 0                           --签收数量
);

--安拆方案-人员信息
CREATE TABLE T_INDIS_SCHEMA_PRACTI
(
  SCHEMA_PRACTI_ID           BIGINT IDENTITY PRIMARY KEY,
  SCHEMA_ID                  BIGINT NULL,                    --安拆方案ID
  CERT_ID                    BIGINT NULL,                    --证书ID（来源从业资格证的姓名）
  PRACTI_ID                  BIGINT NULL,                    --人员ID
  PRACTI_NAME                VARCHAR(64) NOT NULL,           --人员姓名
  CERT_NUM                   VARCHAR(32) NOT NULL,           --资质证书编号
  PRACTI_KINDWORK            VARCHAR(64) NOT NULL            --从业工种(表码 BM_KIND_WORK)
);
--安拆告知(来源安拆方案)
CREATE TABLE T_INDIS_NOTICE
(
  NOTICE_ID                  BIGINT IDENTITY PRIMARY KEY,
  SCHEMA_ID                  BIGINT NULL,                    --安拆方案ID
  CONTRACT_NUMBER            VARCHAR(128) NULL,              --安装（拆卸）工程合同号（手动填写）
  PLANNED_DATE               CHAR(10) NULL,                  --计划拆卸日期
  REMARK                     VARCHAR(512) NULL,              --备注
  RELATE_MODULE              VARCHAR(32) NOT NULL            --模块类型(EQUIP_INSTALL:安装模块,EQUIP_DISMANTLE:拆卸模块)
);
--安拆方案-人员信息
CREATE TABLE T_INDIS_NOTICE_PRACTI
(
  NOTICE_PRACTI_ID           BIGINT IDENTITY PRIMARY KEY,
  NOTICE_ID                  BIGINT NULL,                    --安拆方案ID
  CERT_ID                    BIGINT NULL,                    --证书ID（来源从业资格证的姓名）
  PRACTI_ID                  BIGINT NULL,                    --人员ID
  PRACTI_NAME                VARCHAR(64) NOT NULL,           --人员姓名
  CERT_NUM                   VARCHAR(32) NOT NULL,           --资质证书编号
  PRACTI_KINDWORK            VARCHAR(64) NOT NULL            --从业工种(表码 BM_KIND_WORK)
);
--施工作业--作业人员
create table T_CONSTRUCT_PRACTI(
  CONSTRUCT_PRACTI_ID BIGINT IDENTITY PRIMARY KEY,
  CONSTRUCT_ID BIGINT NOT NULL,
  PRACTI_ID BIGINT NOT NULL,
  TYPE CHAR(1) NOT NULL
);
--防坠器表
create table T_ANTI_FALL_DETECTION(
  ANTI_FALL_ID            bigint IDENTITY primary key,
  ANTI_FALL_NUM           varchar(32) null,                  ---防坠器编号
  DETECT_NUM               varchar(32) null,                 ---检测编号
  START_DATE              SMALLDATETIME NULL,                ---检测评定日期
  END_DATE                SMALLDATETIME NULL,                 ---检测有效日期
  ANTI_FALL_FEE            bigint,                             ---检测费用
  STATUS                  CHAR(1)  NULL,                      ---检测状态
  PROJECT_NAME           varchar(32) null,                    ---工程名称
  RECORD_ID              varchar(32) null,                     ---出厂编号
  EXW_SERIAL             varchar(32) null,                      ---备案编号
  REMARK                 varchar(64) null,                      ---检测编号
  DEL_FLAG               CHAR(1) NOT NULL
)
--保养配件表
CREATE TABLE T_EQUIPMENT_MAINT_COMPON(
  MAINT_COMPON_ID BIGINT IDENTITY primary key,   --保养耗材ID
  MAINT_ID        BIGINT NOT NULL,                   --保养管理ID
  COMPON_ID       BIGINT,                            --零配件ID
  COUNTS          BIGINT,                            --数量
  UNIT_PRICE      numeric(12,2),                     --单价
  SUMMARY         numeric(12,2),                     --合计
  REMARK          VARCHAR(512)                      --备注
);

--启用管理2
CREATE TABLE T_EQUIPMENT_CONTRACT_LEASE
(
  ACTIVATE_ID                BIGINT IDENTITY PRIMARY KEY,
  ACTIVATE_SERIAL            VARCHAR(64) NOT NULL,           --启用编号
  ACTIVATE_DATE              CHAR(10) NOT NULL,         --启用时间
  EM_ENT                     BIGINT NULL,                    --使用单位(默认为关联业务单号中对应项目的施工单位)
  EM_ENT_NAME                VARCHAR(64) NULL,               --使用单位名称
  ACCEPTANCE_DATE            CHAR(10) NULL,                  --验收时间
  CONTRACT_SERIAL            VARCHAR(64) NULL,               --合同编号
  REMARK                     VARCHAR(256) NULL,              --备注
  USER_ID                    BIGINT NOT NULL,                --登记人ID
  USER_NAME                  VARCHAR(64) NOT NULL,           --登记人
  DEP_ID                     BIGINT NOT NULL,                --所属主管部门
  PROVIDED_DATE              CHAR(10) NOT NULL,              --登记时间
  APPOINTMENT_DATE           CHAR(10) NULL,                  --司机上岗日期
  EFFECTIVE                  CHAR(1)  NULL,               --生效标识(表码值 0:未生效,1:生效)
  DEL_FLAG                   CHAR(1) NOT NULL,               --删除标识(表码值 0:删除,1:正常)
  INSTALL_SERIAL             VARCHAR(64)  NULL,              --安装告知
  PROPERTY_NAME              VARCHAR(64)  NULL,				 --产权单位
  INSTALL_THEME              VARCHAR(64)  NULL,				 --安装主题
  INSTALL_HEIGHT             VARCHAR(64)  NULL,				 --安装高度
  PROJECT_SERIAL             VARCHAR(64)  NULL,				 --项目编号
  STARTIN_DATE               VARCHAR(64) NULL,				 --安装日期
  PROJECT_NAME               VARCHAR(64)  NULL,				 --项目名称
  ADDRESS                    VARCHAR(64) NULL,				 --项目所属地
   RECORD_SERIAL             VARCHAR(64) NULL,				 --启用设备
  EQUIP_SPECIFIC_NAME        VARCHAR(64) NULL,				 --规格型号
  EQUIP_CATEGORY_NAME        VARCHAR(64) NULL,				 --设备类别
  RECORD_ID                  VARCHAR(64) NULL,				 --备案编号
  EQUIP_GENERIC_NAME         VARCHAR(64) NULL,				 --设备名称
  EXW_SERIAL                 VARCHAR(64) NULL				 --出厂编号
);


--旁站明细设置
CREATE TABLE T_SIDE_STATION(
  STATION_ID					BIGINT IDENTITY PRIMARY KEY,
  STATION_SERIAL				VARCHAR(64) NOT NULL,           --编号
  CATEGORY						VARCHAR(64) NOT NULL, 			--类别
  DETAILS						VARCHAR(64) NOT NULL			--旁站内容
);

--旁站记录
CREATE TABLE T_SIDE_SYSTEM(
  SIDE_ID						BIGINT IDENTITY PRIMARY KEY,
  PROJECT_NAME					VARCHAR(64) NULL,					--项目名称
  OPERATION_DATE				CHAR(10) NULL,						--作业时间
  OPERATION_DETAIL				VARCHAR(64) NULL,					--作业内容
  EQUIP_GENERIC      		  	VARCHAR(64) NULL,				 	--设备名称
  EQUIP_CATEGORY	    	   	VARCHAR(64) NULL,				 	--设备型号
  OPERATION_PERSONNEL			VARCHAR(64) NULL,					--作业人员
  REPORTING_PERSONNEL			VARCHAR(64) NULL,					--旁站人员
  MEASURE						VARCHAR(128) NULL					--过程问题及处理措施
);

--旁站页签
CREATE TABLE T_SIDE_REPORTING(
  REPORTING_ID					BIGINT IDENTITY PRIMARY KEY,
  SIDE_ID						BIGINT NULL,
  REPORTING_DETAIL				VARCHAR(64) NULL,					--旁站内容
  EXAMINE_UPSHOT				VARCHAR(64) NULL,					--检查结果
  EXIST_QUESTION				VARCHAR(64) NULL,					--存在问题
);

--配件领用新增
ALTER TABLE T_PICKUP ADD PAID_AMOUNT NUMERIC(12, 2) NULL;
ALTER TABLE T_PICKUP ADD TOTAL_AMOUNT NUMERIC(12, 2) NULL;


--借用管理新增
ALTER TABLE T_BORROW ADD ADDRESS VARCHAR(64) NULL;


--零部件档案增加数据项
ALTER TABLE T_COMPONENT ADD DELIVER_FROM_GODOWN INT NULL;		--整机出仓数量设置
ALTER TABLE T_COMPONENT ADD YES_FLAG CHAR(1) NOT NULL;			--是否出仓配件：是
ALTER TABLE T_COMPONENT ADD NO_FLAG CHAR(1) NOT NULL;			--是否出仓配件：否

--借用零配件新增
ALTER TABLE T_BORROW_COMPONENT ADD RETURN_COUNTS SMALLINT NULL; --归还数量

--报废申请
CREATE TABLE T_SCRAP_APPLY(
  SCRAP_ID						BIGINT IDENTITY PRIMARY KEY, 
  SCRAP_SERIAL					VARCHAR(64) NULL,					--申请单号
  APPLY_DATE					VARCHAR(64) NULL,					--申请日期
  USER_ID						BIGINT NOT NULL,					--申请人ID
  USER_NAME						VARCHAR(32) NULL,					--申请人名称
  STORE_NAME					VARCHAR(16) NULL,					--仓库名称
  STORAGE_LOCATION      		VARCHAR(16) NULL,				 	--库位
  STATUS	    	   			char(1) NOT NULL  DEFAULT 0, 		--状态
  AUDITOR_ID					BIGINT  NULL,						--审核人ID
  AUDITOR_NAME					VARCHAR(64) NULL,					--审核人
  AUDITOR_DATE					VARCHAR(32) NULL,					--审核日期
  APPROV_ID						BIGINT  NULL,						--审批人ID
  APPROV_NAME					VARCHAR(32) NULL,					--审批人
  APPROV_DATE					VARCHAR(32) NULL,					--审批日期
  REMARK						VARCHAR(128) NULL,					--备注
  APPLYFOR_STATE				CHAR(1) NOT NULL DEFAULT 0, 		--审批状态
  DEL_FLAG               		CHAR(1) NOT NULL DEFAULT 1 
);

--报废合同
CREATE TABLE T_SCRAP_CONTRACT(
  CONTRACT_ID					BIGINT IDENTITY PRIMARY KEY, 
  CONTRACT_SERIAL				VARCHAR(64) NULL,					--申请单号
  CONTRACT_DATE					VARCHAR(64) NULL,					--申请日期
  USER_ID						BIGINT NOT NULL,					--制单人ID
  USER_NAME						VARCHAR(32) NULL,					--制单人名称
  STORE_NAME					VARCHAR(16) NULL,					--仓库名称
  STORAGE_LOCATION      		VARCHAR(16) NULL,				 	--库位
  STATUS	    	   			char(1) NOT NULL  DEFAULT 0, 		--状态
  APPROV_ID						BIGINT  NULL,						--审批人ID
  APPROV_NAME					VARCHAR(32) NULL,					--审批人
  APPROV_DATE					VARCHAR(64) NULL,					--审批日期
  PA_ENT_NAME					VARCHAR(32) NULL,					--甲方单位
  PB_ENT_NAME					VARCHAR(32) NULL,					--乙方单位
  ASSET_ATTRIBUTES				VARCHAR(32) NULL,					--资产属性
  REVIEW_INFO					VARCHAR(32) NULL,					--合同评审信息
  REMARK						VARCHAR(128) NULL,					--备注
  APPLYFOR_STATE				CHAR(1) NOT NULL DEFAULT 0, 		--审批状态
  DEL_FLAG               		CHAR(1) NOT NULL DEFAULT 1 
);
--报废处理
CREATE TABLE T_SCRAP_HANDLE(
  HANDLE_ID					BIGINT IDENTITY PRIMARY KEY, 
  SCRAP_SERIAL				    VARCHAR(64) NULL,					--申请单号
  CONTRACT_DATE					VARCHAR(64) NULL,					--申请日期
  USER_ID						BIGINT NOT NULL,					--制单人ID
  USER_NAME						VARCHAR(32) NULL,					--制单人名称
  STORE_NAME					VARCHAR(16) NULL,					--仓库名称
  STORAGE_LOCATION      		VARCHAR(16) NULL,				 	--库位
  STATUS	    	   			char(1) NOT NULL  DEFAULT 0, 		--状态
  APPROV_ID						BIGINT  NULL,						--审批人ID
  APPROV_NAME					VARCHAR(32) NULL,					--审批人
  APPROV_DATE					VARCHAR(64) NULL,					--审批日期
  REMARK						VARCHAR(128) NULL,					--备注
  APPLYFOR_STATE				CHAR(1) NOT NULL DEFAULT 0, 		--审批状态
  DEL_FLAG               		CHAR(1) NOT NULL DEFAULT 1 
);

--发货调度
CREATE TABLE T_MATERIALS_DISPATCH(
  MATERIALS_ID					BIGINT IDENTITY PRIMARY KEY, 
  DISPATCH_SERIAL				VARCHAR(64) NULL,					--单号
  APPLY_DATE					VARCHAR(64) NULL,					--制单日期
  USER_ID						BIGINT NOT NULL,					--制单人ID
  USER_NAME						VARCHAR(32) NULL,					--制单人名称
  STORE_NAME					VARCHAR(16) NULL,					--仓库名称
  STORAGE_LOCATION      		VARCHAR(16) NULL,				 	--库位
  STATUS	    	   			char(1) NOT NULL  DEFAULT 0, 		--状态
  CONTRACT_ID					BIGINT NOT NULL,					--合同ID
  CONTRACT_SERIAL				VARCHAR(32) NULL,					--合同编号
  PB_ENT_ID						BIGINT NOT NULL,					--承租单位ID
  PB_ENT_NAME					VARCHAR(64) NULL,					--承租单位
  PROJECT_NAME					VARCHAR(64) NULL,					--工程名称
  VEHICLE_NUM					VARCHAR(64) NULL,					--运输车辆号
  VEHICLE_PERSON				VARCHAR(32) NULL,					--运输车辆人员
  APPLYFOR_STATE				CHAR(1) NOT NULL DEFAULT 0, 		--审批状态
  DEL_FLAG               		CHAR(1) NOT NULL DEFAULT 1 
);



--现场装车
CREATE TABLE T_MATERIALS_PACKAGE(
  PACKAGE_ID					BIGINT IDENTITY PRIMARY KEY, 
  PACKAGE_SERIAL				VARCHAR(64) NULL,					--单号
  APPLY_DATE					VARCHAR(64) NULL,					--制单日期
  USER_ID						BIGINT NOT NULL,					--制单人ID
  USER_NAME						VARCHAR(32) NULL,					--制单人名称
  STORE_NAME					VARCHAR(16) NULL,					--仓库名称
  STORAGE_LOCATION      		VARCHAR(16) NULL,				 	--出库库位
  STATUS	    	   			char(1) NOT NULL  DEFAULT 0, 		--状态
  CONTRACT_ID					BIGINT NOT NULL,					--合同ID
  CONTRACT_SERIAL				VARCHAR(32) NULL,					--合同编号
  PB_ENT_ID						BIGINT NOT NULL,					--承租单位ID
  PB_ENT_NAME					VARCHAR(64) NULL,					--承租单位
  PROJECT_NAME					VARCHAR(64) NULL,					--工程名称
  PACKAGE_DATE					VARCHAR(64) NULL,					--装车日期
  ATTACH_SERIAL					VARCHAR(64) NULL,					--附属单据号
  RENT_TYPE						CHAR(1) NOT NULL DEFAULT 0,			--出租类型
  VEHICLE_NUM					VARCHAR(64) NULL,					--运输车辆号
  VEHICLE_PERSON				VARCHAR(32) NULL,					--运输车辆人员
  QR_CODE						VARCHAR(256) NULL,					--二维码
  TRANPORT_AMOUNT				VARCHAR(32) NULL,					--运费
  TRANPORT_CACULATE_TYPE		VARCHAR(32) NULL,					--计费方式
  DISPATCH_AUDITOR_ID			BIGINT NOT NULL,					--收发审核人ID
  DISPATCH_AUDITOR_NAME			VARCHAR(32) NULL,					--收发审核人
  DISPATCH_AUDITOR_DATE			VARCHAR(64) NULL,					--收发审核时间
  ORDER_AUDITOR_ID			    BIGINT NOT NULL,					--单据审核人ID
  ORDER_AUDITOR_NAME			VARCHAR(32) NULL,					--单据审核人
  ORDER_AUDITOR_DATE			VARCHAR(64) NULL,					--单据审核时间
  APPLYFOR_STATE				CHAR(1) NOT NULL DEFAULT 0, 		--审批状态
  DEL_FLAG               		CHAR(1) NOT NULL DEFAULT 1 
);

--报停管理
CREATE TABLE T_CEASE_REPORT(
  CEASE_ID					BIGINT IDENTITY PRIMARY KEY, 
  CEASE_SERIAL				VARCHAR(64) NULL,						--单号
  CEASE_DATE					VARCHAR(64) NULL,					--报停日期
  CEASE_DAYS					VARCHAR(64) NULL,					--报停天数
  CEASE_AMOUNT					VARCHAR(64) NULL,					--报停费用
  USER_ID						BIGINT NOT NULL,					--制单人ID
  USER_NAME						VARCHAR(32) NULL,					--制单人名称
  STATUS	    	   			char(1) NOT NULL  DEFAULT 0, 		--状态
  CONTRACT_ID					BIGINT NOT NULL,					--合同ID
  CONTRACT_SERIAL				VARCHAR(32) NULL,					--合同编号
  CONTRACT_TYPE					VARCHAR(32) NULL,					--合同类型
  PB_ENT_ID						BIGINT NOT NULL,					--承租单位ID
  PB_ENT_NAME					VARCHAR(64) NULL,					--承租单位
  PROJECT_NAME					VARCHAR(64) NULL,					--工程名称
  RECOVER_DATE					VARCHAR(64) NULL,					--恢复日期
  RECOVER_TITLE					VARCHAR(64) NULL,					--报停主题
  RECOVER_REMARK				VARCHAR(64) NULL,				    --报停说明
  APPLYFOR_STATE				CHAR(1) NOT NULL DEFAULT 0, 		--审批状态
  DEL_FLAG               		CHAR(1) NOT NULL DEFAULT 1 
);

--安拆价格表
CREATE TABLE T_INSTALL_DISMANTLE_PRICE
(
	PRICE_ID BIGINT IDENTITY PRIMARY KEY,
	BELONG_TO_AREA 					VARCHAR(16)	  NULL,	 	 --区域
    EQUIP_SPECIFIC             		VARCHAR(6) NOT NULL,     --规格型号(表码 BM_EQUIP_SPECIFIC)
    INSTALL_DISMANTLE_TYPE          VARCHAR(16) NOT NULL,    --安拆类型
    MEASUREMENT_UNIT             	VARCHAR(32) NOT NULL,    --计量单位
    PROJECT_PRICE             		BIGINT  NULL,            --项目单价
    TEAM_PRICE            		    BIGINT  NULL,            --班组单价
    DEL_FLAG               		CHAR(1) NOT NULL DEFAULT 1 
)

--评审信息表
CREATE TABLE T_FORM_REVIEW
(
  REVIEW_ID                  BIGINT IDENTITY PRIMARY KEY,
  RELATE_ID                  BIGINT NOT NULL,        
  RELATE_MODULE              VARCHAR(32) NOT NULL,   
  REVIEW_USERID              BIGINT NOT NULL,                --评审人ID
  REVIEW_USERNAME            VARCHAR(32) NOT NULL,           --评审人
  REVIEW_DEP                 VARCHAR(128) NOT NULL,          --评审单位
  REVIEW_TIME                SMALLDATETIME NOT NULL,         --评审时间
  REVIEW_OPINION             CHAR(1) NOT NULL,               --评审方式(表码值 0:不通过,1:通过)
  REVIEW_REMARK              VARCHAR(512) NULL               --备注(可填写审批意见)
);