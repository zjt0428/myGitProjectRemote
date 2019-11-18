package com.knight.emms.terminal.support.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.knight.emms.terminal.support.daoutils.DataColumn;
import com.knight.emms.terminal.support.daoutils.DataRow;
import com.knight.emms.terminal.support.daoutils.DataTable;


public class DBHelper {
	private static final Logger log = Logger.getLogger(DBHelper.class);

	 Connection _CONN = null;  
	 private int dbNum = 0;
	 
	public int getDbNum() {
		return dbNum;
	}

	public void setDbNum(int dbNum) {
		this.dbNum = dbNum;
	}

		//取得mysql连接  
	    private boolean GetConnMysql(String sUser, String sPwd) {  
	        if(_CONN!=null)return true;  
	        try {
	        	//mysql
	            String sDriverName = "com.mysql.jdbc.Driver";
	            
	            //mysql--A9  ----121.42.34.181
	            String sDBUrl = "jdbc:mysql://121.42.34.181:3308/emms_beta?"
	                    + "user=root&password=cc0011&useUnicode=true&characterEncoding=UTF8";
	            
	            Class.forName(sDriverName);  
	            _CONN = DriverManager.getConnection(sDBUrl, sUser, sPwd);  
	        } catch (Exception ex) {  
	            ex.printStackTrace();  
	            //System.out.println(ex.getMessage());  
	            return false;  
	        }  
	        return true;  
	    }  
     
	    //取得sqlserver连接  
	    private boolean GetConnSqlServer(String sUser, String sPwd) {  
	        if(_CONN!=null)return true;  
	        try {
	            String sDriverName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";  
	            String sDBUrl = "jdbc:sqlserver://192.168.0.180:1433;DatabaseName=MMIS_SM;user=sa;password=risit654321!@#$";
	            
	            Class.forName(sDriverName);  
	            _CONN = DriverManager.getConnection(sDBUrl, sUser, sPwd);  
	        } catch (Exception ex) {  
	            ex.printStackTrace();  
	            //System.out.println(ex.getMessage());  
	            return false;  
	        }  
	        return true;  
	    }  
	    //取得sqlserver连接  
	    private boolean GetConnSqlServer(String sUser, String sPwd,String sa) {  
	    	if(_CONN!=null)return true;  
	    	try {
	    		//sqlserver2008
	    		String sDBUrl = "";
	    		String sDriverName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";  
	    		//String sDBUrl = "jdbc:sqlserver://127.0.0.1:1368;databaseName=hairDB;user=sa;password=654321";
	    		//String sDBUrl = "jdbc:sqlserver://127.0.0.1:1368;databaseName=mmis_test;user=sa;password=654321";
//	            String sDBUrl = "jdbc:sqlserver://192.168.0.180:1433;DatabaseName=MMIS_SM;user=sa;password=risit654321!@#$";
	    		if(sa.equals(Globel.tableName)){
	    			 sDBUrl = "jdbc:sqlserver://125.77.197.17:1433;DatabaseName=A8YS;user=sa;password=risit654321!@#$";
	    		}else{
	    			 sDBUrl = "jdbc:sqlserver://125.77.197.17:1433;DatabaseName=A8YS;user=sa;password=risit654321!@#$";
	    		}
	    		
	    		Class.forName(sDriverName);  
	    		_CONN = DriverManager.getConnection(sDBUrl, sUser, sPwd);  
	    	} catch (Exception ex) {  
	    		ex.printStackTrace();  
	    		//System.out.println(ex.getMessage());  
	    		return false;  
	    	}  
	    	return true;  
	    }  
	      
	    //获得连接
	    public boolean GetConn(String sa)  
	    {  
	    	switch(dbNum){
	    	case ConstantValue.SQLSERVER_DB://sqlserver2008
	    		return GetConnSqlServer("sa","risit654321!@#$",sa);
	    	case ConstantValue.MYSQL_DB://mysql
	    		return GetConnMysql("root","cc0011");
	    	}
			return false;
	    }  
	    //获得连接
	    public boolean GetConn()  
	    {  
	    	switch(dbNum){
	    	case ConstantValue.SQLSERVER_DB://sqlserver2008
	    		return GetConnSqlServer("sa","risit654321!@#$");
	    	case ConstantValue.MYSQL_DB://mysql
	    		return GetConnMysql("root","cc0011");
	    	}
	    	return false;
	    }  
	      
	    //关闭连接  
	    public void CloseConn()  
	    {  
	        try {  
	            _CONN.close();  
	            _CONN = null;  
	        } catch (Exception ex) {  
	        	log.info(ex.getMessage());  
	            _CONN=null;   
	        }  
	    }  
	      
	    //测试连接  
	    public boolean TestConn() {  
	        if (!GetConn())  
	            return false;  
	  
	       // CloseConn();  
	        return true;  
	    }  
	    
	    //测试连接  
	    public boolean TestConn(String sa) {  
	    	if (!GetConn(sa))  
	    		return false;  
	    	
	    	// CloseConn();  
	    	return true;  
	    }  
	      
	    public ResultSet GetResultSet(String sSQL,Object[] objParams)  
	    {  
	        GetConn();  
	        ResultSet rs=null;  
	        try  
	        {  
	        	PreparedStatement ps = _CONN.prepareStatement(sSQL);
	            if(objParams!=null)  
	            {  
	                for(int i=0;i< objParams.length;i++)  
	                {  
	                    ps.setObject(i+1, objParams[i]);  
	                }  
	            }  
	            rs=ps.executeQuery();  
	        }catch(Exception ex)  
	        {  
	        	log.info(ex.getMessage());  
	            CloseConn();  
	        }  
	        finally  
	        {  
	            //CloseConn();            
	        }  
	        return rs;  
	    }  
	    
	    public ResultSet GetResultSet(String sSQL)  
	    {  
	        ResultSet rs=null;  
	        PreparedStatement ps = null; 
	        try  
	        {  
	        	switch(dbNum){
		    	case ConstantValue.SQLSERVER_DB://sqlserver2008
		    		ps = Globel.sqlServerDb._CONN.prepareStatement(sSQL);
		    		break;
		    	case ConstantValue.MYSQL_DB://mysql
		    		ps = Globel.mysqlDb._CONN.prepareStatement(sSQL);
		    		break;
		    	}
	        	
	            rs=ps.executeQuery();  
	        }catch(Exception ex)  
	        {  
	        	log.info(ex.getMessage());  
	        }  
	        return rs;  
	    } 
	   
	    public PreparedStatement GetPrepareStatement(String sSQL)  
	    {  
	        PreparedStatement ps = null;  
	        try  
	        {  
	        	switch(dbNum){
		    	case ConstantValue.SQLSERVER_DB://sqlserver2008
		    		ps = Globel.sqlServerDb._CONN.prepareStatement(sSQL);
		    		break;
		    	case ConstantValue.MYSQL_DB://mysql
		    		ps = Globel.mysqlDb._CONN.prepareStatement(sSQL);
		    		break;
		    	}
	        }catch(Exception ex)  
	        {  
	        	log.info(ex.getMessage());  
	        }  
	        return ps;  
	    }  
	    
	    public int UpdateData(String sSQL)  
	    {  
	        //GetConn();  
	        int iResult=0;  
	        Statement sTatement = null;  
	        try  
	        {  
	        	switch(dbNum){
		    	case ConstantValue.SQLSERVER_DB://sqlserver2008
		    		sTatement = Globel.sqlServerDb._CONN.createStatement(); 
		    		break;
		    	case ConstantValue.MYSQL_DB://mysql
		    		sTatement = Globel.mysqlDb._CONN.createStatement();  
		    		break;
		    	}
	            
	            iResult = sTatement.executeUpdate(sSQL);  
	        }catch(Exception ex)  
	        {  
	        	log.info(ex.getMessage());  
	            return -1;  
	        }  
	       /* finally  
	        {  
	            CloseConn();              
	        } */ 
	        return iResult;  
	    }  
	    
	    
	    //======================================================================
	    
	    public PreparedStatement GetPrepareStatement(String sSQL,Object[] objParams)  
	    {  
	        //GetConn();  
	        PreparedStatement ps = null;  
	        try  
	        {  
	            ps = _CONN.prepareStatement(sSQL);  
	            if(objParams!=null)  
	            {  
	                for(int i=0;i< objParams.length;i++)  
	                {  
	                    ps.setObject(i+1, objParams[i]);  
	                }  
	            }  
	        }catch(Exception ex)  
	        {  
	        	log.info(ex.getMessage());  
	        	
	            //CloseConn();  
	        }  
	        finally  
	        {  
	            //CloseConn();            
	        }  
	        return ps;  
	    }  
	      
	    public Object GetSingle(String sSQL,Object... objParams)  
	    {  
	        GetConn();  
	        try  
	        {  
	            PreparedStatement ps = _CONN.prepareStatement(sSQL);  
	            if(objParams!=null)  
	            {  
	                for(int i=0;i< objParams.length;i++)  
	                {  
	                    ps.setObject(i+1, objParams[i]);  
	                }  
	            }  
	            ResultSet rs=ps.executeQuery();  
	            if(rs.next())  
	                return rs.getInt(1);//索引从1开始  
	        }catch(Exception ex)  
	        {  
	        	log.info(ex.getMessage());  
	        }  
	        finally  
	        {  
	            CloseConn();              
	        }  
	        return null;  
	    }  
	      
	    public DataTable GetDataTable(String sSQL,Object... objParams)  
	    {  
	        GetConn();  
	        DataTable dt=null;  
	        try  
	        {  
	            PreparedStatement ps = _CONN.prepareStatement(sSQL);  
	            if(objParams!=null)  
	            {  
	                for(int i=0;i< objParams.length;i++)  
	                {  
	                    ps.setObject(i+1, objParams[i]);  
	                }  
	            }  
	            ResultSet rs=ps.executeQuery();  
	            ResultSetMetaData rsmd=rs.getMetaData();  
	              
	            List<DataRow> row=new ArrayList<DataRow>(); //表所有行集合  
	            List<DataColumn> col=null; //行所有列集合  
	            DataRow r=null;// 单独一行  
	            DataColumn c=null;//单独一列  
	              
	            String columnName;  
	            Object value;  
	            int iRowCount=0;  
	            while(rs.next())//开始循环读取，每次往表中插入一行记录  
	            {  
	                iRowCount++;  
	                col=new ArrayList<DataColumn>();//初始化列集合  
	                for(int i=1;i<=rsmd.getColumnCount();i++)  
	                {  
	                    columnName=rsmd.getColumnName(i);  
	                    value=rs.getObject(columnName);  
	                    c=new DataColumn(columnName,value);//初始化单元列  
	                    col.add(c); //将列信息加入到列集合  
	                }  
	                r=new DataRow(col);//初始化单元行  
	                row.add(r);//将行信息加入到行集合  
	            }  
	            dt = new DataTable(row);  
	            dt.RowCount=iRowCount;  
	            dt.ColumnCount = rsmd.getColumnCount();  
	        }catch(Exception ex)  
	        {  
	        	log.info(ex.getMessage());  
	        }  
	        finally  
	        {  
	            CloseConn();              
	        }  
	        return dt;  
	    }  
	      
	    public int UpdateData(String sSQL,Object[] objParams)  
	    {  
	        GetConn();  
	        int iResult=0;  
	          
	        try  
	        {  
	            PreparedStatement ps = _CONN.prepareStatement(sSQL);  
	            if(objParams!=null)  
	            {  
	                for(int i=0;i< objParams.length;i++)  
	                {  
	                    ps.setObject(i+1, objParams[i]);  
	                }  
	            }  
	            iResult = ps.executeUpdate(sSQL);  
	        }catch(Exception ex)  
	        {  
	        	log.info(ex.getMessage());  
	            return -1;  
	        }  
	        finally  
	        {  
	            CloseConn();              
	        }  
	        return iResult;  
	    }  
	    
	    
	      
	  
}
