package com.knight.emms.terminal.support.utils;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.knight.emms.terminal.support.beanutils.UcAccount;
import com.knight.system.application.ApplicationContainer;
import com.knight.system.model.AppUser;

public class UcAccountUtil extends SyncBase {
	private static final Logger log = Logger.getLogger(UcAccount.class);
	
	
	public void insertToMySql(List<Map<String, Object>> ucAccountList) {
		if (Globel.mysqlDb != null) {
			// 插入数据库
			
			String sSQL = "UPDATE `emms_beta`.`UC_ACCOUNT` SET   `PASSWORD`=?, `ACCOUNT_TYPE`=?,  `EXTERNAL_NAME`=? WHERE (`ACCOUNT_NAME`=?);";

//			String sSQL = "INSERT INTO `emms_beta`.`UC_ACCOUNT` ( `ACCOUNT_NAME`, `PASSWORD`, `ACCOUNT_TYPE`,  `EXTERNAL_NAME`, `EXTERNAL_ADDRESS`)" +
//					" VALUES (?,?,?,?,?)";
			log.info(sSQL);
			PreparedStatement pStmt = Globel.mysqlDb.GetPrepareStatement(sSQL);
			
			try {
				for (int i=0;i< ucAccountList.size();i++) {		
					pStmt.setString(1, (String) ucAccountList.get(i).get("PASSWORD"));	       
				 	pStmt.setLong(2, 3);
				 	pStmt.setString(3, (String) ucAccountList.get(i).get("USERNAME")); 	 
					pStmt.setString(4,(String) ucAccountList.get(i).get("MOBILE"));  
					pStmt.executeUpdate();
					log.info("密码更新成功!");
				}
			} catch (Exception e) {
				Globel.mysqlDb = null;
				e.printStackTrace();
				log.info("密码更新失败!");
			} finally {
				try {
					pStmt.close();
				} catch (SQLException e) {
					Globel.mysqlDb = null;
					log.info("密码更新失败!");
					e.printStackTrace();
				}
			}
		}
	}
	
	public void updateToMySql(AppUser appUser) {
		if (Globel.mysqlDb != null) {
			String sSQL = "UPDATE `emms_beta`.`UC_ACCOUNT` SET   `PASSWORD`=?, `ACCOUNT_TYPE`=?,  `EXTERNAL_NAME`=?, `EXTERNAL_ADDRESS`=? WHERE (`ACCOUNT_NAME`=?);";
			log.info(sSQL);
			PreparedStatement pStmt = Globel.mysqlDb.GetPrepareStatement(sSQL);
			String serverUrl = (String) ApplicationContainer.getSystemParam("sitUrl");
			try {
				pStmt.setString(1, appUser.getPassword());	       
			 	pStmt.setLong(2, 3);
			 	pStmt.setString(3,  appUser.getUsername()); 	 
			 	pStmt.setString(4, serverUrl);  
				pStmt.setString(5, appUser.getMobile());  
				pStmt.executeUpdate();
				log.info("外部系统地址更新成功!");
			} catch (Exception e) {
				Globel.mysqlDb = null;
				e.printStackTrace();
				log.info("外部系统地址更新失败!");
			} finally {
				try {
					pStmt.close();
				} catch (SQLException e) {
					Globel.mysqlDb = null;
					log.info("外部系统地址更新失败!");
					e.printStackTrace();
				}
			}
		}
	}
	
	public boolean existsInOriginSystem(AppUser appUser) {
		if (Globel.mysqlDb != null) {
			String sql = "SELECT EXTERNAL_ADDRESS FROM `emms_beta`.`UC_ACCOUNT` WHERE (`ACCOUNT_NAME`=?)";
			PreparedStatement pStmt = Globel.mysqlDb.GetPrepareStatement(sql);
			try {
				pStmt.setString(1, appUser.getMobile());
				ResultSet rs = pStmt.executeQuery();
				while(rs.next()) {
					String externalAddress = rs.getString("EXTERNAL_ADDRESS");
					if("http://www.jjaq.com.cn:8911/emms".equals(externalAddress)) {
						return true;
					}
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			return false;
		}
		return false;
	}
}
