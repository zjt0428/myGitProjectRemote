package com.knight.emms.terminal.support.utils;

import org.apache.log4j.Logger;

public class SyncBase {
	/**
	 * Logger for this class
	 */
	private static final Logger log = Logger.getLogger(SyncBase.class);

	public DBHelper help;

	
	//对应设备名称表码
	public String getEquipGeneric(String string) {
		if ("1".equals(string)) {
			return "S";
		}
		if ("2".equals(string)) {
			return "T";
		}
		return "";
	}
	
	//连接数据库Sqlserver
	public void connectSqlserverDb(){
		if(Globel.sqlServerDb == null){
			Globel.sqlServerDb = new DBHelper();
			Globel.sqlServerDb.setDbNum(ConstantValue.SQLSERVER_DB);
			//数据库连接测试
			if (Globel.sqlServerDb.TestConn())
				log.info("Sqlserver数据库连接成功");
			else
				log.info("Sqlserver数据库连接失败");
		}
	}
	//连接数据库Sqlserver
	public void connectSqlserverDb(String sa){
		if(Globel.sqlServerDb == null){
			Globel.sqlServerDb = new DBHelper();
			Globel.sqlServerDb.setDbNum(ConstantValue.SQLSERVER_DB);
			//数据库连接测试
			if (Globel.sqlServerDb.TestConn(sa))
				log.info("Sqlserver数据库连接成功");
			else
				log.info("Sqlserver数据库连接失败");
		}
	}
	
	// 连接数据库Mysql
	public void connectMysqlDb() {
		if (Globel.mysqlDb == null) {
			Globel.mysqlDb = new DBHelper();
			Globel.mysqlDb.setDbNum(ConstantValue.MYSQL_DB);
			// 数据库连接测试
			if (Globel.mysqlDb.TestConn())
				log.info("Mysql数据库连接成功");
			else
				log.info("Mysql数据库连接失败");
		}
	}
	
	//关闭数据库连接
	public void closeConn() {
		if (help == null) {
			help.CloseConn();
			help = null;
		}
	}
	
	//关闭A9数据库连接
	public void closeA9Conn() {
		if (Globel.mysqlDb == null) {
			Globel.mysqlDb.CloseConn();
			Globel.mysqlDb = null;
		}
	}
	
}
