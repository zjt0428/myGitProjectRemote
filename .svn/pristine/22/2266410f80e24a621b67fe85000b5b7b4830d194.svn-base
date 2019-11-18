CREATE TABLE APP_FUNCTION
(
  FUNCTIONID                 BIGINT IDENTITY PRIMARY KEY,
  FUNKEY                     VARCHAR(64) NOT NULL,           --权限KEY
  FUNNAME                    VARCHAR(128) NOT NULL,          --权限名称
  CONSTRAINT UQ_APP_FUNCTION UNIQUE (FUNKEY)
);
CREATE TABLE FUN_URL
(
  URLID                      BIGINT IDENTITY PRIMARY KEY,
  FUNCTIONID                 BIGINT NOT NULL,        
  URLPATH                    VARCHAR(128) NOT NULL,  
  CONSTRAINT FK_FUN_URL_FU_R_AFN_APP_FUNC FOREIGN KEY (FUNCTIONID) REFERENCES APP_FUNCTION (FUNCTIONID)
);
CREATE TABLE APP_ROLE
(
  ROLEID                     BIGINT IDENTITY PRIMARY KEY,
  ROLENAME                   VARCHAR(128) NOT NULL,          --角色名称
  ROLEDESC                   VARCHAR(128) NULL,              --角色描述
  STATUS                     SMALLINT NOT NULL,              --状态 
  ROLE_TYPE                  CHAR(1) NOT NULL,               --类型 
  RIGHTS                     TEXT NULL,                      --权限信息
  ISDEFAULTIN                SMALLINT NOT NULL               --是否默认
);
CREATE TABLE ROLE_FUN
(
  ROLEID                     BIGINT NOT NULL,        
  FUNCTIONID                 BIGINT NOT NULL,        
  CONSTRAINT PK_ROLE_FUN PRIMARY KEY NONCLUSTERED (ROLEID, FUNCTIONID)
);
CREATE TABLE APP_USER
(
  USERID                     BIGINT IDENTITY PRIMARY KEY,
  USERNAME                   VARCHAR(32) NOT NULL,           --登陆名
  PASSWORD                   VARCHAR(128) NOT NULL,          --密码
  DEP_ID                     BIGINT NULL,                    --所属部门
  USER_TYPE                  CHAR(1) NOT NULL DEFAULT 0,     --用户类型(0:系统用户)
  FULLNAME                   VARCHAR(128) NOT NULL,          --用户名
  EMAIL                      VARCHAR(128) NOT NULL,          --邮件
  PHONE                      VARCHAR(32) NULL,               --电话
  MOBILE                     VARCHAR(32) NULL,               --手机
  ADDRESS                    VARCHAR(128) NULL,              --地址
  ZIP                        CHAR(6) NULL,                   --邮编
  SEX                        SMALLINT NULL,                  --1=先生 0=女士
  LONGITUDE                  VARCHAR(16) NULL,               --经度
  LATITUDE                   VARCHAR(16) NULL,               --纬度
  UPDATE_TIME                DATETIME NULL,                  --更新时间
  CREATE_TIME                DATETIME NOT NULL,              --创建时间
  KEYFLAG                    SMALLINT NOT NULL DEFAULT 0,    --IKEY标识 1=激活 0=禁用  
  STATUS                     SMALLINT NOT NULL DEFAULT 1,    --状态 1=激活 0=禁用
  DELFLAG                    SMALLINT NOT NULL DEFAULT 0     --删除标识 1=删除 0=正常
);
CREATE TABLE APP_USER_EXTEND
(
  EXTEND_ID                  BIGINT IDENTITY PRIMARY KEY,
  USERID                     BIGINT NOT NULL,        
  FOREIGN_ID                 BIGINT NOT NULL,        
  FOREIGN_NAME               VARCHAR(128) NOT NULL,  
  FOREIGN_MODULE             VARCHAR(32) NOT NULL    
);
CREATE TABLE USER_ROLE
(
  USERID                     BIGINT NOT NULL,        
  ROLEID                     BIGINT NOT NULL,        
  CONSTRAINT PK_USER_ROLE PRIMARY KEY NONCLUSTERED (USERID, ROLEID),
  CONSTRAINT FK_UR_R_AR FOREIGN KEY (ROLEID) REFERENCES APP_ROLE (ROLEID),
  CONSTRAINT FK_UR_R_AU FOREIGN KEY (USERID) REFERENCES APP_USER (USERID)
);
--用户密钥信息
CREATE TABLE APP_USER_KEY
(
  KEY_ID                     BIGINT IDENTITY PRIMARY KEY,
  USERID                     BIGINT NOT NULL,        
  KEY_STATUS                 SMALLINT NOT NULL,              --IKEY标识 1=激活 0=禁用
  KEY_SERIAL                 VARCHAR(32) NULL,               --密钥序列号
  DISTRIBUTE_TIME            DATETIME NULL,                  --发放时间
  VALID_PERIOD_TIME          CHAR(10) NULL,                  --生效时间
  EXPIRATION_TIME            CHAR(10) NULL,                  --过期时间
  UPDATE_TIME                DATETIME NULL                   --修改时间
);
CREATE TABLE APP_USER_KEY_EXTEND
(
  KEY_EXTEND_ID              BIGINT IDENTITY PRIMARY KEY,
  KEY_ID                     BIGINT NOT NULL,        
  FOREIGN_ID                 BIGINT NOT NULL,        
  FOREIGN_NAME               VARCHAR(128) NOT NULL,  
  FOREIGN_MODULE             VARCHAR(32) NOT NULL    
);
CREATE TABLE APP_TIPS
(
  TIPSID                     BIGINT IDENTITY PRIMARY KEY,
  USERID                     BIGINT NOT NULL,                --用户ID 
  TIPSNAME                   VARCHAR(128),                   --便签名
  CONTENT                    VARCHAR(2048),                  --便签内容  
  DISHEIGHT                  INT NULL,               
  DISWIDTH                   INT NULL,               
  DISLEFT                    INT NULL,               
  DISTOP                     INT NULL,               
  DISLEVEL                   INT NULL,               
  CREATETIME                 DATETIME NOT NULL       
);
CREATE TABLE COMPANY
(
  COMPANYID                  BIGINT IDENTITY PRIMARY KEY,
  COMPANYNO                  VARCHAR(128) NULL,      
  COMPANYNAME                VARCHAR(128) NOT NULL,  
  COMPANYDESC                VARCHAR(4000) NULL,     
  LEGALPERSON                VARCHAR(32) NULL,       
  SETUP                      DATETIME NULL,          
  PHONE                      VARCHAR(32) NULL,       
  FAX                        VARCHAR(32) NULL,       
  SITE                       VARCHAR(128) NULL,      
  LOGO                       VARCHAR(128) NULL       
);
CREATE TABLE DEPARTMENT
(
  DEP_ID                     BIGINT IDENTITY PRIMARY KEY,
  DEP_SERIAL                 VARCHAR(20) NOT NULL,           --部门编号
  DEP_NAME                   VARCHAR(128) NOT NULL,          --部门名称
  DEP_DESC                   VARCHAR(256) NULL,              --部门描述
  DEP_LEVEL                  INT NOT NULL,                   --层次
  DEP_TYPE                   CHAR(1) NOT NULL DEFAULT 0,     --部门类型
  PARENT_ID                  BIGINT NULL,                    --父节点ID
  PATH                       VARCHAR(168) NULL,              --路径
  DELFLAG                    SMALLINT NOT NULL DEFAULT 0     --删除标识 1=删除 0=正常
);
CREATE TABLE FILE_ATTACH
(
  FILEID                     BIGINT IDENTITY PRIMARY KEY,
  DEPEND_ID                  BIGINT NULL,                    --所属对象ID
  DEPEND_NAME                VARCHAR(32) NULL,               --所属对象
  FILENAME                   VARCHAR(128) NOT NULL,          --文件名
  FILEPATH                   VARCHAR(128) NOT NULL,          --文件路径
  CREATETIME                 DATETIME NOT NULL,              --创建时间
  EXT                        VARCHAR(32) NULL,               --扩展名
  FILETYPE                   VARCHAR(32) NOT NULL,           --附件类型 如：邮件附件
  NOTE                       VARCHAR(1024) NULL,             --说明
  CREATOR                    VARCHAR(32) NOT NULL            --上传者
);
CREATE TABLE INDEX_DISPLAY
(
  INDEXID                    BIGINT IDENTITY PRIMARY KEY,
  PORTALID                   VARCHAR(64) NOT NULL,           --PORTAL ID
  USERID                     BIGINT NOT NULL,                --用户ID
  COLNUM                     INT NOT NULL,                   --列号
  ROWSNUM                    INT NOT NULL                    --行号
);
--初始化信息表
CREATE TABLE INIT_LOAD_TABLE
(
  TABLE_ALIAS                VARCHAR(32) PRIMARY KEY,
  TABLE_NAME                 VARCHAR(32) NULL,       
  TABLE_TYPE                 SMALLINT NOT NULL DEFAULT 1,    --表类型 表码表-1 控制表-2 参数表-3
  REFRESH                    SMALLINT NOT NULL DEFAULT 1,    --刷新 0:未刷新,1:已刷新
  LAZY_INIT                  SMALLINT NOT NULL DEFAULT 1,    --延迟 1:非延迟刷新 0:延迟刷新
  BH_FIELD_NAME              VARCHAR(32) NOT NULL,           --表码编码列
  MC_FIELD_NAME              VARCHAR(32) NOT NULL,           --表码名称列
  BH_FIELD_TYPE              SMALLINT NULL DEFAULT 0,        --表码排序列
  PARENT_FIELD_NAME          VARCHAR(32) NULL,               --父级表码名称列
  ALIAS_FIELD_NAME           VARCHAR(32) NULL,               --别名名称列
  ALIAS_FIELD_LABLE          VARCHAR(32) NULL,               --别名类名列
  REMARK                     VARCHAR(256) NULL               --说明
);
CREATE TABLE SHORT_MESSAGE
(
  MESSAGEID                  BIGINT IDENTITY PRIMARY KEY,
  SENDERID                   BIGINT NULL,            
  CONTENT                    TEXT NOT NULL,  
  SENDER                     VARCHAR(64) NOT NULL,   
  MSGTYPE                    SMALLINT NOT NULL,              --1=个人信息 2=日程安排 3=计划任务
  SENDTIME                   DATETIME NOT NULL       
);
CREATE TABLE IN_MESSAGE
(
  RECEIVEID                  BIGINT IDENTITY PRIMARY KEY,
  MESSAGEID                  BIGINT NULL,            
  USERID                     BIGINT NULL,            
  READFLAG                   SMALLINT NOT NULL,              --1=HAS RED 0=UNREAD
  DELFLAG                    SMALLINT NOT NULL,      
  USERFULLNAME               VARCHAR(32) NOT NULL    
);
CREATE TABLE SYSTEM_LOG
(
  LOGID                      BIGINT IDENTITY PRIMARY KEY,
  USERNAME                   VARCHAR(32) NULL,       
  USERID                     BIGINT NULL,            
  USER_IP                    VARCHAR(32) NULL,       
  DESCRIPTION                VARCHAR(32) NOT NULL,   
  OPERAT_PATH                VARCHAR(128) NOT NULL,
  CREATE_TIME                DATETIME NOT NULL,      
  REMARK                     TEXT NULL      
);
CREATE TABLE SYS_CONFIG
(
  CONFIGID                   BIGINT IDENTITY PRIMARY KEY,
  CONFIGKEY                  VARCHAR(64) NOT NULL,           --KEY
  CONFIGNAME                 VARCHAR(64) NOT NULL,           --配置名称
  CONFIGDESC                 VARCHAR(256) NULL,              --配置描述
  FIELDSET                   VARCHAR(32) NOT NULL,           --标签名称
  TYPENAME                   VARCHAR(32) NOT NULL,           --数据类型
  DATASTORE                  VARCHAR(128) NULL,              --储存数据
  DATATYPE                   SMALLINT NOT NULL,              --数据类型(0:字符串,1:整型,2:Boolean)
  DATAVALUE                  VARCHAR(64) NULL,       
  DELFLAG                    SMALLINT NOT NULL DEFAULT 0     --删除标识 0=删除 1=正常
);
CREATE TABLE JOB (
  JOBID                      BIGINT IDENTITY PRIMARY KEY,
  JOBNAME                    VARCHAR(128) NOT NULL,  
  DEPID                      BIGINT NOT NULL,
  MEMO                       VARCHAR(512) NULL,      
  DELFLAG                    SMALLINT
);
--用户密钥变更信息
CREATE TABLE APP_USER_KEY_LOG
(
  LOG_ID                     BIGINT IDENTITY PRIMARY KEY,
  KEY_ID                     BIGINT NOT NULL,        
  USERID                     BIGINT NOT NULL,        
  FULLNAME                   VARCHAR(128) NOT NULL,          --用户名
  KEY_SERIAL                 VARCHAR(32) NULL,               --密钥序列号
  DISTRIBUTE_TIME            DATETIME NULL,                  --发放时间
  VALID_PERIOD_TIME          CHAR(10) NULL,                  --生效时间
  EXPIRATION_TIME            CHAR(10) NULL,                  --延期时间
  UPDATE_TIME                DATETIME NULL,                  --修改时间
  UPDATE_USERNAME            VARCHAR(128) NOT NULL           --用户名
);
--时间表
CREATE TABLE TIME_DIMENSION 
(
  TIME_ID          BIGINT IDENTITY PRIMARY KEY,
  THE_DATE         SMALLDATETIME NOT NULL,
  THE_DAY          NVARCHAR(15) NOT NULL,
  THE_MONTH        NVARCHAR(15) NOT NULL,
  THE_YEAR         SMALLINT NOT NULL,
  DAY_OF_WEEK      SMALLINT NOT NULL,
  DAY_OF_MONTH     SMALLINT NOT NULL,
  WEEK_OF_YEAR     SMALLINT NOT NULL,
  MONTH_OF_YEAR    SMALLINT NOT NULL
);
--月内天数
CREATE TABLE T_DAY_OF_MONTH
(
  DAY01      SMALLINT,
  DAY02      SMALLINT,
  DAY03      SMALLINT,
  DAY04      SMALLINT,
  DAY05      SMALLINT,
  DAY06      SMALLINT,
  DAY07      SMALLINT,
  DAY08      SMALLINT,
  DAY09      SMALLINT,
  DAY10      SMALLINT,
  DAY11      SMALLINT,
  DAY12      SMALLINT,
  DAY13      SMALLINT,
  DAY14      SMALLINT,
  DAY15      SMALLINT,
  DAY16      SMALLINT,
  DAY17      SMALLINT,
  DAY18      SMALLINT,
  DAY19      SMALLINT,
  DAY20      SMALLINT,
  DAY21      SMALLINT,
  DAY22      SMALLINT,
  DAY23      SMALLINT,
  DAY24      SMALLINT,
  DAY25      SMALLINT,
  DAY26      SMALLINT,
  DAY27      SMALLINT,
  DAY28      SMALLINT,
  DAY29      SMALLINT,
  DAY30      SMALLINT,
  DAY31      SMALLINT
);