--发货调度 “填报时间”字段长度扩充	Chen·G·Y 2017/08/17
ALTER TABLE T_DISPATCH ALTER COLUMN PROVIDED_DATE CHAR(19) NOT NULL; 
--现场装车“调度时间”字段长度扩充	Chen·G·Y 2017/08/17
ALTER TABLE T_LOGISTICS_TRANSPORT ALTER COLUMN DISPATCH_DATE CHAR(19) NOT NULL;
--现场装车“发货时间”字段长度扩充	Chen·G·Y 2017/08/17
ALTER TABLE T_LOGISTICS_TRANSPORT ALTER COLUMN DELIVERY_DATE CHAR(19) NOT NULL;

/**  周材出库同步	2017/12/05	Chen·G·Y */
--收货管理
INSERT INTO T_MATERIALS_OUT_STOCK(COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, OUT_DATE, OUT_TYPE, LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, RELATE_BUSINESS, SERIAL, REMARK)
SELECT COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, CONVERT(CHAR(10),CONVERT(DATE, OUT_DATE, 120),120) AS OUT_DATE, OUT_TYPE, LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, '收货管理', SERIAL, REMARK
FROM 
(SELECT G.DEPOT_ID AS DEPOT_ID, G.DEPOT_NAME AS DEPOT_NAME, G.LOCATION_ID AS LOCATION_ID, G.LOCATION_NAME AS LOCATION_NAME, G.DELIVERY_DATE AS OUT_DATE, G.RENT_TYPE AS OUT_TYPE,
	G.RECIPIENT_SERIAL AS SERIAL, G.REMARKS AS REMARK,
	R.COMMODITY AS COMMODITY , R.SPECIFICATIONS AS SPECIFICATIONS, R.RECIPIENT_QUANTITY AS QUANTITY, R.ASSIST_QUANTITY AS AUXILIARY_QUANTITY, R.MEASUREMENT_UNIT AS UNIT
FROM T_GOODS_RECIPIENT G,T_RECIPIENT_LIST R
WHERE G.RECIPIENT_ID = R.RECIPIENT_ID
AND G.STATUS = '3') A

--现场装车
INSERT INTO T_MATERIALS_OUT_STOCK(COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, OUT_DATE, OUT_TYPE, LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, RELATE_BUSINESS, SERIAL, REMARK)
SELECT COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, CONVERT(CHAR(10),CONVERT(DATE, OUT_DATE, 120),120) AS OUT_DATE, '出租发货', LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, '现场装车', SERIAL, REMARK
FROM 
(SELECT M.STORE_ID AS DEPOT_ID, M.STORE_NAME AS DEPOT_NAME, M.LOCATION_ID AS LOCATION_ID, M.STORAGE_LOCATION AS LOCATION_NAME, M.PACKAGE_DATE AS OUT_DATE, M.REMARK AS REMARK, M.PACKAGE_SERIAL AS SERIAL,
	P.COMMODITY AS COMMODITY, P.SPECIFICATIONS AS SPECIFICATIONS, P.PACKAGE_QUANTITY AS QUANTITY, P.MEASUREMENT_UNIT AS UNIT,P.CONVERTED_QUANTITY AS AUXILIARY_QUANTITY
FROM T_MATERIALS_PACKAGE M, T_PACKAGE_DETAIL P
WHERE P.PACKAGE_ID = M.PACKAGE_ID
AND M.RENT_TYPE = '0'
AND M.APPLYFOR_STATE = '3'
AND M.DEL_FLAG = '1') A

--仓库调拨
INSERT INTO T_MATERIALS_OUT_STOCK(COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, OUT_DATE, OUT_TYPE, LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, RELATE_BUSINESS, SERIAL, REMARK)
SELECT COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, CONVERT(CHAR(10),CONVERT(DATE, OUT_DATE, 120),120) AS OUT_DATE, '仓库间调拨', LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, '仓库调拨', SERIAL, REMARK
FROM 
(SELECT AD.ALLOCATION_SERIAL AS SERIAL, CONVERT(CHAR(10),CONVERT(DATE, AD.ALLOCATION_DATE, 120),120) AS OUT_DATE, AD.OUT_DEPOT_ID AS DEPOT_ID, AD.OUT_DEPOT_NAME AS DEPOT_NAME, AD.REMARK AS REMARK,
	DD.OUT_LOCATION_ID AS LOCATION_ID, DD.OUT_LOCATION_NAME AS LOCATION_NAME, DD.COMMODITY AS COMMODITY, DD.SPECIFICATIONS AS SPECIFICATIONS, DD.ALLOCATION_COUNTS AS QUANTITY, DD.AUXILIARY_QUANTITY AS AUXILIARY_QUANTITY, DD.MEASUREMENT_UNIT AS UNIT
FROM T_ALLOCATION_DEPOT AD, T_ALLOCATION_DEPOT_DETAIL DD
WHERE DD.ALLOCATION_ID = DD.ALLOCATION_ID
AND AD.APPLYFOR_STATE = '3'
AND AD.DEL_FLAG = '1') A

--制作处理
INSERT INTO T_MATERIALS_OUT_STOCK(COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, OUT_DATE, OUT_TYPE, LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, RELATE_BUSINESS, SERIAL, REMARK)
SELECT COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, CONVERT(CHAR(10),CONVERT(DATE, OUT_DATE, 120),120) AS OUT_DATE, '制作出库', LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, '制作处理', SERIAL, REMARK
FROM 
(SELECT M.HANDLE_SERIAL AS SERIAL, CONVERT(CHAR(10),CONVERT(DATE, M.FILL_DATE, 120),120) AS OUT_DATE, K.STORE_ID AS DEPOT_ID, K.STORE_NAME AS DEPOT_NAME, M.REMARKS AS REMARK,
	P.COMMODITY AS COMMODITY, P.SPECIFICATIONS AS SPECIFICATIONS, P.EXIT_LOCATION_ID AS LOCATION_ID, P.EXIT_LOCATION_NAME AS LOCATION_NAME, P.CONVERTED_QUANTITY AS AUXILIARY_QUANTITY, P.CONSUME_QUANTITY AS QUANTITY, P.MEASUREMENT_UNIT AS UNIT
FROM T_HANDLE_MAKE M, T_CONSUME_PRODUCT P, T_APPLY_MAKE K
WHERE P.HANDLE_ID = M.HANDLE_ID
AND M.APPLY_MAKE_ID = K.APPLY_MAKE_ID
AND K.DEL_FLAG = '1'
AND M.DEL_FLAG = '1'
AND K.APPLYFOR_STATE = '3') A

--周材维修
INSERT INTO T_MATERIALS_OUT_STOCK(COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, OUT_DATE, OUT_TYPE, LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, RELATE_BUSINESS, SERIAL, REMARK)
SELECT COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, CONVERT(CHAR(10),CONVERT(DATE, OUT_DATE, 120),120) AS OUT_DATE, '维修出库', LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, '周材维修', SERIAL, REMARK
FROM 
(SELECT M.STORE_ID AS DEPOT_ID, M.STORE_NAME AS DEPOT_NAME, CONVERT(CHAR(10),CONVERT(DATE, M.REPAIR_DATE, 120),120) AS OUT_DATE, M.REPAIR_SERIAL AS SERIAL, M.REMARK AS REMARK,
	B.COMMODITY AS COMMODITY,B.SPECIFICATIONS AS SPECIFICATIONS, B.QUANTITY AS QUANTITY, B.AUXILIARY_NUM AS AUXILIARY_QUANTITY, B.MEASUREMENT_UNIT AS UNIT, B.LOCATION_ID AS LOCATION_ID, B.STORAGE_LOCATION AS LOCATION_NAME
FROM T_MATERIALS_REPAIR M, T_BEFORE_MATERIALS_REPAIR B
WHERE B.MATERIALS_REPAIR_ID = M.MATERIALS_REPAIR_ID
AND M.DEL_FLAG = '1'
AND M.APPLYFOR_STATE = '3') A

--周材改型
INSERT INTO T_MATERIALS_OUT_STOCK(COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, OUT_DATE, OUT_TYPE, LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, RELATE_BUSINESS, SERIAL, REMARK)
SELECT COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, CONVERT(CHAR(10),CONVERT(DATE, OUT_DATE, 120),120) AS OUT_DATE, '改型出库', LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, '周材改型', SERIAL, REMARK
FROM 
(SELECT D.DEPOT_ID AS DEPOT_ID, D.DEPOT_NAME AS DEPOT_NAME, L.LOCATION_ID AS LOCATION_ID, L.LOCATION_NAME AS LOCATION_NAME, M.REMODEL_SERIAL AS SERIAL, CONVERT(CHAR(10),CONVERT(DATE, M.APPLY_DATE, 120),120) AS OUT_DATE, M.REMARK AS REMARK,
	S.SPECIFICATIONS AS SPECIFICATIONS, C.COMMODITY AS COMMODITY, B.QUANTITY AS QUANTITY, CONVERT(VARCHAR(64), CONVERT(DECIMAL(10,1), B.QUANTITY) * CONVERT(DECIMAL(10,1), S.SECOND_CONVERTED_QUANTITY)) AS AUXILIARY_QUANTITY, S.FIRST_UNIT_CONVERSION AS UNIT
FROM T_MATERIALS_REMODEL M, T_BEFORE_REMODEL B, T_BASE_DEPOT D, T_BASE_LOCATION L, T_MATERIALS_SPECIFICATIONS S, T_MATERIALS_COMMODITY C
WHERE B.REMODEL_ID = M.REMODEL_ID
AND D.DEPOT_ID = M.DEPOT_ID
AND B.LOCATION_ID = L.LOCATION_ID
AND L.DEPOT_ID = D.DEPOT_ID
AND S.SPECIFICATIONS_ID = B.SPECIFICATIONS_ID
AND S.COMMODITY_ID = C.COMMODITY_ID
AND M.APPLYFOR_STATE = '3'
AND M.DEL_FLAG = '1') A

--报废处理
INSERT INTO T_MATERIALS_OUT_STOCK(COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, OUT_DATE, OUT_TYPE, LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, RELATE_BUSINESS, SERIAL, REMARK)
SELECT COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, CONVERT(CHAR(10),CONVERT(DATE, OUT_DATE, 120),120) AS OUT_DATE, '报废处理', LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, '报废管理', SERIAL, REMARK
FROM 
(SELECT H.STORE_ID AS DEPOT_ID, H.STORE_NAME AS DEPOT_NAME, H.LOCATION_ID AS LOCATION_ID, H.STORAGE_LOCATION AS LOCATION_NAME, H.SCRAP_SERIAL AS SERIAL, CONVERT(CHAR(10),CONVERT(DATE, H.APPLY_DATE, 120),120) AS OUT_DATE, H.REMARK AS REMARK,
	C.COMMODITY AS COMMODITY, S.SPECIFICATIONS AS SPECIFICATIONS, D.SCRAP_NUM AS QUANTITY, S.FIRST_UNIT_CONVERSION AS UNIT, CONVERT(VARCHAR(64), CONVERT(DECIMAL(10,1), D.SCRAP_NUM) * CONVERT(DECIMAL(10,1), S.SECOND_CONVERTED_QUANTITY)) AS AUXILIARY_QUANTITY
FROM T_SCRAP_HANDLE H, T_SCRAP_DETAIL D, T_MATERIALS_SPECIFICATIONS S, T_MATERIALS_COMMODITY C
WHERE D.RELATE_ID = H.HANDLE_ID
AND S.SPECIFICATIONS_ID = D.SPECIFICATIONS_ID
AND C.COMMODITY_ID = S.COMMODITY_ID
AND H.APPLYFOR_STATE = '3'
AND H.DEL_FLAG = '1') A

/** 周材入库同步	2017/12/12	Chen·G·Y */
--回收管理
INSERT INTO T_MATERIALS_IN_STOCK(COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, IN_DATE, IN_TYPE, LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, RELATE_BUSINESS, SERIAL, REMARK)
SELECT COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, CONVERT(CHAR(10),CONVERT(DATE, IN_DATE, 120),120) AS IN_DATE, '回收入库', LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, '回收管理', SERIAL, REMARK
FROM 
(SELECT R.RECYCLE_SERIAL AS SERIAL, R.RECYCLE_DATE AS IN_DATE, R.REMARK AS REMARK, B.DEPOT_ID AS DEPOT_ID, B.DEPOT_NAME AS DEPOT_NAME,
	D.COMMODITY AS COMMODITY, D.SPECIFICATIONS AS SPECIFICATIONS, D.UNIT AS UNIT, T.QUANTITY AS QUANTITY, L.LOCATION_ID AS LOCATION_ID, L.LOCATION_NAME AS LOCATION_NAME,
	CONVERT(VARCHAR(64), CONVERT(DECIMAL(18,1), T.QUANTITY) * CONVERT(DECIMAL(18,1), D.CONVERSION_NUM)) AS AUXILIARY_QUANTITY
FROM T_RECYCLE_MANAGE R, T_RECYCLE_MANAGE_DETAIL D, T_MATERIALS_RECYCLE_COUNT_TEMP T, T_BASE_DEPOT B, T_BASE_LOCATION L
WHERE D.RECYCLE_ID = R.RECYCLE_ID
AND T.RECYCLE_ID = R.RECYCLE_ID
AND D.RECYCLE_ID = T.RECYCLE_ID
AND D.SPECIFICATIONS_ID = T.SPECIFICATIONS_ID
AND T.QUANTITY <> '0'
AND T.QUANTITY IS NOT NULL
AND R.DEPOT_ID = B.DEPOT_ID
AND T.LOCATION_ID = L.LOCATION_ID
AND R.APPLYFOR_STATE = '3'
AND R.RECYCLE_TYPE = '1'
AND R.DEL_FLAG = '1') A

--仓库调拨
INSERT INTO T_MATERIALS_IN_STOCK(COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, IN_DATE, IN_TYPE, LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, RELATE_BUSINESS, SERIAL, REMARK)
SELECT COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, CONVERT(CHAR(10),CONVERT(DATE, IN_DATE, 120),120) AS IN_DATE, '仓库间调拨', LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, '仓库调拨', SERIAL, REMARK
FROM 
(SELECT A.IN_DEPOT_ID AS DEPOT_ID, A.IN_DEPOT_NAME AS DEPOT_NAME, A.ALLOCATION_SERIAL AS SERIAL, A.ALLOCATION_DATE AS IN_DATE, A.REMARK AS REMARK,
	D.IN_LOCATION_ID AS LOCATION_ID, D.IN_LOCATION_NAME AS LOCATION_NAME, D.COMMODITY AS COMMODITY, D.SPECIFICATIONS AS SPECIFICATIONS, D.ALLOCATION_COUNTS AS QUANTITY,
	D.AUXILIARY_QUANTITY AS AUXILIARY_QUANTITY, D.MEASUREMENT_UNIT AS UNIT
FROM T_ALLOCATION_DEPOT A, T_ALLOCATION_DEPOT_DETAIL D
WHERE D.ALLOCATION_ID = A.ALLOCATION_ID
AND A.APPLYFOR_STATE = '3'
AND A.DEL_FLAG = '1') A

--退货管理
INSERT INTO T_MATERIALS_IN_STOCK(COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, IN_DATE, IN_TYPE, LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, RELATE_BUSINESS, SERIAL, REMARK)
SELECT COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, CONVERT(CHAR(10),CONVERT(DATE, IN_DATE, 120),120) AS IN_DATE, '租借退货', LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, '退货管理', SERIAL, REMARK
FROM 
(SELECT G.DEPOT_ID AS DEPOT_ID, G.DEPOT_NAME AS DEPOT_NAME, G.LOCATION_ID AS LOCATION_ID, G.LOCATION_NAME AS LOCATION_NAME, G.RETURN_SERIAL AS SERIAL, G.RETURN_DATE AS IN_DATE,
	G.REMARKS AS REMARK, R.COMMODITY AS COMMODITY, R.SPECIFICATIONS AS SPECIFICATIONS, R.RETURN_QUANTITY AS QUANTITY, R.ASSIST_QUANTITY AS AUXILIARY_QUANTITY, R.MEASUREMENT_UNIT AS UNIT
FROM T_RETURN_GOODS G, T_RETURN_LIST R
WHERE R.RETURN_ID = G.RETURN_ID
AND G.STATUS = '3') A


--周材改型
INSERT INTO T_MATERIALS_IN_STOCK(COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, IN_DATE, IN_TYPE, LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, RELATE_BUSINESS, SERIAL, REMARK)
SELECT COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, CONVERT(CHAR(10),CONVERT(DATE, IN_DATE, 120),120) AS IN_DATE, '改型入库', LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, '周材改型', SERIAL, REMARK
FROM 
(SELECT D.DEPOT_ID AS DEPOT_ID, D.DEPOT_NAME AS DEPOT_NAME, L.LOCATION_ID AS LOCATION_ID, L.LOCATION_NAME AS LOCATION_NAME, M.REMODEL_SERIAL AS SERIAL, M.APPLY_DATE AS IN_DATE,
	M.REMARK AS REMARK, C.COMMODITY AS COMMODITY, S.SPECIFICATIONS AS SPECIFICATIONS, A.QUANTITY AS QUANTITY, S.FIRST_UNIT_CONVERSION AS UNIT,
	CONVERT(VARCHAR(64), CONVERT(DECIMAL(18,1), A.QUANTITY) * CONVERT(DECIMAL(18,1), S.SECOND_CONVERTED_QUANTITY)) AS AUXILIARY_QUANTITY
FROM T_MATERIALS_REMODEL M, T_AFTER_REMODEL A, T_BASE_DEPOT D, T_BASE_LOCATION L,
	T_MATERIALS_SPECIFICATIONS S, T_MATERIALS_COMMODITY C
WHERE A.REMODEL_ID = M.REMODEL_ID
AND M.DEPOT_ID = D.DEPOT_ID
AND A.LOCATION_ID = L.LOCATION_ID
AND S.SPECIFICATIONS_ID = A.SPECIFICATIONS_ID
AND C.COMMODITY_ID = S.COMMODITY_ID
AND M.DEL_FLAG = '1'
AND M.APPLYFOR_STATE = '3') A

--制作处理
INSERT INTO T_MATERIALS_IN_STOCK(COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, IN_DATE, IN_TYPE, LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, RELATE_BUSINESS, SERIAL, REMARK)
SELECT COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, CONVERT(CHAR(10),CONVERT(DATE, IN_DATE, 120),120) AS IN_DATE, '制作入库', LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, '制作处理', SERIAL, REMARK
FROM 
(SELECT A.STORE_ID AS DEPOT_ID, A.STORE_NAME AS DEPOT_NAME, P.ENTER_LOCATION_ID AS LOCATION_ID, P.ENTER_LOCATION_NAME AS LOCATION_NAME, M.FILL_DATE AS IN_DATE,
	M.HANDLE_SERIAL AS SERIAL, M.REMARKS AS REMARK, P.COMMODITY AS COMMODITY, P.SPECIFICATIONS AS SPECIFICATIONS, P.MAKE_QUANTITY AS QUANTITY, P.MEASUREMENT_UNIT AS UNIT,
	CONVERT(VARCHAR(64), CONVERT(DECIMAL(18,1), P.MAKE_QUANTITY) * CONVERT(DECIMAL(18,1), P.AUXILIARY_QUANTITY)) AS AUXILIARY_QUANTITY
FROM T_HANDLE_MAKE M, T_MAKE_PRODUCT P, T_APPLY_MAKE A
WHERE P.HANDLE_ID = M.HANDLE_ID
AND A.APPLY_MAKE_ID = M.APPLY_MAKE_ID
AND M.STATUS = '3'
AND M.DEL_FLAG = '1') A

--周材维修
INSERT INTO T_MATERIALS_IN_STOCK(COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, IN_DATE, IN_TYPE, LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, RELATE_BUSINESS, SERIAL, REMARK)
SELECT COMMODITY, SPECIFICATIONS, UNIT, QUANTITY, AUXILIARY_QUANTITY, CONVERT(CHAR(10),CONVERT(DATE, IN_DATE, 120),120) AS IN_DATE, '维修入库', LOCATION_ID, LOCATION_NAME, DEPOT_ID, DEPOT_NAME, '周材维修', SERIAL, REMARK
FROM 
(SELECT M.STORE_ID AS DEPOT_ID, M.STORE_NAME AS DEPOT_NAME, A.LOCATION_ID AS LOCATION_ID, A.ENTER_LOCATION AS LOCATION_NAME, M.REPAIR_SERIAL AS SERIAL, M.REPAIR_DATE AS IN_DATE,
	 M.REMARK AS REMARK, A.COMMODITY AS COMMODITY, A.SPECIFICATIONS AS SPECIFICATIONS, A.QUANTITY AS QUANTITY, A.AUXILIARY_NUM AS AUXILIARY_QUANTITY, A.MEASUREMENT_UNIT AS UNIT
FROM T_MATERIALS_REPAIR M, T_AFTER_MATERIALS_REPAIR A
WHERE A.MATERIALS_REPAIR_ID = M.MATERIALS_REPAIR_ID
AND M.DEL_FLAG = '1'
AND M.APPLYFOR_STATE = '3') A