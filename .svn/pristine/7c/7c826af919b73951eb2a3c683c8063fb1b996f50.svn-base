/**
 *====================================================
 * 文件名称: ProjectServiceImpl.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-5			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.knight.core.dao.BaseJDBCDao;
import com.knight.core.exception.BusinessException;
import com.knight.core.filter.QueryFilter;
import com.knight.emms.constant.Constant;
import com.knight.emms.core.service.BaseBusinessModelServiceImpl;
import com.knight.emms.dao.ChangeRecordDao;
import com.knight.emms.dao.ProjectDao;
import com.knight.emms.dao.ProjectExpenseDao;
import com.knight.emms.model.Project;
import com.knight.emms.service.ProjectService;

/**
 * @ClassName: ProjectServiceImpl
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-5 下午10:54:42
 */
public class ProjectServiceImpl extends BaseBusinessModelServiceImpl<Project> implements ProjectService {

	@SuppressWarnings("unused")
	private ProjectDao projectDao;
	@Resource
	private BaseJDBCDao baseJdbcDao;

	@Resource
	private ChangeRecordDao changeRecordDao;
	@Resource
	private ProjectExpenseDao projectExpenseDao;

	public ProjectServiceImpl(ProjectDao dao) {
		super(dao);
		this.projectDao = dao;
	}

	public void deletedExpense(Long projectExpenseId) {
		projectExpenseDao.remove(projectExpenseId);
	}

	@Override
	public void changeProject(Project project) {
		projectIsRepeat(project);
		// TODO Auto-generated method stub
		Project p = projectDao.get(project.getProjectId());
		Boolean f = false;
		StringBuffer sa = new StringBuffer();
		StringBuffer sb = new StringBuffer();
		StringBuffer sc = new StringBuffer();
		StringBuffer sd = new StringBuffer();
		StringBuffer se = new StringBuffer();		
		StringBuffer sf = new StringBuffer();
		StringBuffer sg = new StringBuffer();
		StringBuffer sh = new StringBuffer();
		StringBuffer si = new StringBuffer();
		StringBuffer sj = new StringBuffer();
		StringBuffer saa = new StringBuffer();
		StringBuffer sba = new StringBuffer();
		StringBuffer sca = new StringBuffer();
		StringBuffer sda= new StringBuffer();
		StringBuffer sea = new StringBuffer();		
		StringBuffer sfa = new StringBuffer();
		StringBuffer sga = new StringBuffer();
		StringBuffer sha = new StringBuffer();
		StringBuffer sia = new StringBuffer();
		StringBuffer sja = new StringBuffer();
		String sqa = new String();
		String sqb = new String();
		String sqc = new String();
		String sqd = new String();
		String sqe = new String();
		String sqf = new String();
		String sqg = new String();
		String sqh = new String();
		String sqi = new String();
		String sqj = new String();
		sa.append("UPDATE T_PROJECT SET ");
		sb.append("UPDATE T_CONTRACT_ARRANGE SET PROJECT_ID = '"+project.getProjectId()+"',");
		sc.append("UPDATE T_CONTRACT_LEASE SET PROJECT_ID = '"+project.getProjectId()+"',");
		sd.append("UPDATE T_DISPATCH SET PROJECT_ID = '"+project.getProjectId()+"',");
		se.append("UPDATE T_LOGISTICS_TRANSPORT SET PROJECT_ID = '"+project.getProjectId()+"',");
		sf.append("UPDATE T_EQUIPMENT_DIARY SET PROJECT_ID = '"+project.getProjectId()+"',");
		sg.append("UPDATE T_SETTLE_CONTRACT SET PROJECT_ID = '"+project.getProjectId()+"',");
		sh.append("UPDATE T_AMOUNT_RECEIVE SET PROJECT_ID = '"+project.getProjectId()+"',");
		si.append("UPDATE T_AMOUNT_RECEIVE SET PROJECT_ID = '"+project.getProjectId()+"',");
		sj.append("UPDATE T_COMPON_INTOSTORE SET PROJECT_ID = '"+project.getProjectId()+"',");
		saa.append("UPDATE T_PROJECT SET ");
		sba.append("UPDATE T_CONTRACT_ARRANGE SET ");
		sca.append("UPDATE T_CONTRACT_LEASE SET ");
		sda.append("UPDATE T_DISPATCH SET ");
		sea.append("UPDATE T_LOGISTICS_TRANSPORT SET ");
		sfa.append("UPDATE T_EQUIPMENT_DIARY SET ");
		sga.append("UPDATE T_SETTLE_CONTRACT SET ");
		sha.append("UPDATE T_AMOUNT_RECEIVE SET ");
		sia.append("UPDATE T_AMOUNT_RECEIVE SET ");
		sja.append("UPDATE T_COMPON_INTOSTORE SET ");
		if(StringUtils.isNotBlank(project.getProjectName()) && !project.getProjectName().equals(p.getProjectName())) {
			sa.append("PROJECT_NAME = '"+project.getProjectName()+"',");
			sb.append("PROJECT_NAME = '"+project.getProjectName()+"',");
			sc.append("PROJECT_NAME = '"+project.getProjectName()+"',");
			sd.append("PROJECT_NAME = '"+project.getProjectName()+"',");
			se.append("PROJECT_NAME = '"+project.getProjectName()+"',");
			sf.append("PROJECT_NAME = '"+project.getProjectName()+"',");
			sg.append("PROJECT_NAME = '"+project.getProjectName()+"',");
			sh.append("PROJECT_NAME = '"+project.getProjectName()+"',");
			si.append("PROJECT_NAME = '"+project.getProjectName()+"',");
			sj.append("PROJECT_NAME = '"+project.getProjectName()+"',");
			saa.append("PROJECT_NAME = '"+p.getProjectName()+"',");
			sba.append("PROJECT_NAME = '"+p.getProjectName()+"',");
			sca.append("PROJECT_NAME = '"+p.getProjectName()+"',");
			sda.append("PROJECT_NAME = '"+p.getProjectName()+"',");
			sea.append("PROJECT_NAME = '"+p.getProjectName()+"',");
			sfa.append("PROJECT_NAME = '"+p.getProjectName()+"',");
			sga.append("PROJECT_NAME = '"+p.getProjectName()+"',");
			sha.append("PROJECT_NAME = '"+p.getProjectName()+"',");
			sia.append("PROJECT_NAME = '"+p.getProjectName()+"',");
			sja.append("PROJECT_NAME = '"+p.getProjectName()+"',");
			f = true;
		}
		if(StringUtils.isNotBlank(project.getAddress()) && !project.getAddress().equals(p.getAddress())){
			sa.append("ADDRESS = '"+project.getAddress()+"',");
			sb.append("PROJECT_ADDRESS = '"+project.getAddress()+"',");
			sc.append("ADDRESS = '"+project.getAddress()+"',");
			sd.append("RECEIVE_ADDRESS = '"+project.getAddress()+"',");
			se.append("ADDRESS = '"+project.getAddress()+"',");
			sf.append("ADDRESS = '"+project.getAddress()+"',");
			sg.append("ADDRESS = '"+project.getAddress()+"',");
			sh.append("ADDRESS = '"+project.getAddress()+"',");
			si.append("ADDRESS = '"+project.getAddress()+"',");
			sj.append("ADDRESS = '"+project.getAddress()+"',");
			saa.append("ADDRESS = '"+p.getAddress()+"',");
			sba.append("PROJECT_ADDRESS = '"+p.getAddress()+"',");
			sca.append("ADDRESS = '"+p.getAddress()+"',");
			sda.append("RECEIVE_ADDRESS = '"+p.getAddress()+"',");
			sea.append("ADDRESS = '"+p.getAddress()+"',");
			sfa.append("ADDRESS = '"+p.getAddress()+"',");
			sga.append("ADDRESS = '"+p.getAddress()+"',");
			sha.append("ADDRESS = '"+p.getAddress()+"',");
			sia.append("ADDRESS = '"+p.getAddress()+"',");
			sja.append("ADDRESS = '"+p.getAddress()+"',");
			f = true;
		}
		if(StringUtils.isNotBlank(project.getProvince()) && !project.getProvince().equals(p.getProvince())){
			sa.append("PROVINCE = '"+project.getProvince()+"',");
			sb.append("PROVINCE = '"+project.getProvince()+"',");
			saa.append("PROVINCE = '"+p.getProvince()+"',");
			sba.append("PROVINCE = '"+p.getProvince()+"',");
			f = true;
		}
		if(StringUtils.isNotBlank(project.getCity()) && !project.getCity().equals(p.getCity())){
			sa.append("CITY = '"+project.getCity()+"',");
			saa.append("CITY = '"+p.getCity()+"',");
			f = true;
		}
		if(StringUtils.isNotBlank(project.getCounty()) && !project.getCounty().equals(p.getCounty())){
			sa.append("COUNTY = '"+project.getCounty()+"',");
			saa.append("COUNTY = '"+p.getCounty()+"',");
			f = true;
		}
		if(StringUtils.isNotBlank(String.valueOf(project.getUnCustomId())) && !project.getUnCustomId().equals(p.getUnCustomId())){
			sa.append("UN_CUSTOM_ID = '"+project.getUnCustomId() + "',UN_CUSTOM_NAME = '"+project.getUnCustomName()+"',UN_CUSTOM_LINK_TEL = '"
					+project.getUnCustomLinkTel()+"',UN_CUSTOM_LINKER = '"+project.getUnCustomLinker()+"',CUSTOMER_NICK_NAME = '"
					+project.getCustomerNickName()+"',");
			sb.append("CUSTOMER_ID = '"+project.getUnCustomId() + "',CUSTOMER_NAME = '"+project.getUnCustomName()+"',");
			sc.append("PA_ENT = '"+project.getUnCustomId() + "',PA_ENT_NAME = '"+project.getUnCustomName() + "',PA_ENT_LINK_TEL = '"+project.getUnCustomLinkTel()+"',");
			sd.append("RECEIVE_ENT_ID = '"+project.getUnCustomId() + "',RECEIVE_ENT_NAME = '"+project.getUnCustomName()+"',");
			sg.append("PA_ENT = '"+project.getUnCustomId() + "',PA_ENT_NAME = '"+project.getUnCustomName()+"',");
			sh.append("PAYMENT_ID = '"+project.getUnCustomId() + "',PAYMENT_NAME = '"+project.getUnCustomName()+"',");
			si.append("PAYMENT_ID = '"+project.getUnCustomId() + "',PAYMENT_NAME = '"+project.getUnCustomName()+"',");
			saa.append("UN_CUSTOM_ID = '"+p.getUnCustomId() + "',UN_CUSTOM_NAME = '"+p.getUnCustomName()+"',UN_CUSTOM_LINK_TEL = '"
					+p.getUnCustomLinkTel()+"',UN_CUSTOM_LINKER = '"+p.getUnCustomLinker()+"',CUSTOMER_NICK_NAME = '"
					+p.getCustomerNickName()+"',");
			sba.append("CUSTOMER_ID = '"+p.getUnCustomId() + "',CUSTOMER_NAME = '"+p.getUnCustomName()+"',");
			sca.append("PA_ENT = '"+p.getUnCustomId() + "',PA_ENT_NAME = '"+project.getUnCustomName() + "',PA_ENT_LINK_TEL = '"+p.getUnCustomLinkTel()+"',");
			sda.append("RECEIVE_ENT_ID = '"+p.getUnCustomId() + "',RECEIVE_ENT_NAME = '"+p.getUnCustomName()+"',");
			sga.append("PA_ENT = '"+p.getUnCustomId() + "',PA_ENT_NAME = '"+p.getUnCustomName()+"',");
			sha.append("PAYMENT_ID = '"+p.getUnCustomId() + "',PAYMENT_NAME = '"+p.getUnCustomName()+"',");
			sia.append("PAYMENT_ID = '"+p.getUnCustomId() + "',PAYMENT_NAME = '"+p.getUnCustomName()+"',");
			f = true;
		}
		if(f){
			sqa = sa.substring(0, sa.length()-1).concat(" WHERE PROJECT_ID = "+project.getProjectId());
			sqb = sb.substring(0, sb.length()-1).concat(" WHERE PROJECT_ID = "+project.getProjectId());
			sqc = sc.substring(0, sc.length()-1).concat(" WHERE PROJECT_ID = "+project.getProjectId());
			sqd = sd.substring(0, sd.length()-1).concat(" WHERE PROJECT_ID = "+project.getProjectId());
			sqe = se.substring(0, se.length()-1).concat(" WHERE PROJECT_ID = "+project.getProjectId());
			sqf = sf.substring(0, sf.length()-1).concat(" WHERE PROJECT_ID = "+project.getProjectId());
			sqg = sg.substring(0, sg.length()-1).concat(" WHERE PROJECT_ID = "+project.getProjectId());
			sqh = sh.substring(0, sh.length()-1).concat(" WHERE PROJECT_ID = "+project.getProjectId());
			sqi = si.substring(0, si.length()-1).concat(" WHERE PROJECT_ID = "+project.getProjectId());
			sqj = sj.substring(0, sj.length()-1).concat(" WHERE PROJECT_ID = "+project.getProjectId());
			saa.append(" WHERE PROJECT_ID = "+project.getProjectId());
			sba.append(" WHERE PROJECT_ID = "+project.getProjectId());
			sca.append(" WHERE PROJECT_ID = "+project.getProjectId());
			sda.append(" WHERE PROJECT_ID = "+project.getProjectId());
			sea.append(" WHERE PROJECT_ID = "+project.getProjectId());
			sfa.append(" WHERE PROJECT_ID = "+project.getProjectId());
			sga.append(" WHERE PROJECT_ID = "+project.getProjectId());
			sha.append(" WHERE PROJECT_ID = "+project.getProjectId());
			sia.append(" WHERE PROJECT_ID = "+project.getProjectId());
			sja.append(" WHERE PROJECT_ID = "+project.getProjectId());
			changeRecordDao.recordChange(sqa, saa.toString());
			changeRecordDao.recordChange(sqb, sba.toString());
			changeRecordDao.recordChange(sqc, sca.toString());
			changeRecordDao.recordChange(sqd, sda.toString());
			changeRecordDao.recordChange(sqe, sea.toString());
			changeRecordDao.recordChange(sqf, sfa.toString());
			changeRecordDao.recordChange(sqg, sga.toString());
			changeRecordDao.recordChange(sqh, sha.toString());
			changeRecordDao.recordChange(sqi, sia.toString());
			changeRecordDao.recordChange(sqj, sja.toString());
			baseJdbcDao.jdbcTemplate().execute(sqa);
			baseJdbcDao.jdbcTemplate().execute(sqb);
			baseJdbcDao.jdbcTemplate().execute(sqc);
			baseJdbcDao.jdbcTemplate().execute(sqd);
			baseJdbcDao.jdbcTemplate().execute(sqe);
			baseJdbcDao.jdbcTemplate().execute(sqf);
			baseJdbcDao.jdbcTemplate().execute(sqg);
			baseJdbcDao.jdbcTemplate().execute(sqh);
			baseJdbcDao.jdbcTemplate().execute(sqi);
			baseJdbcDao.jdbcTemplate().execute(sqj);
		}
	}
	
	public void projectIsRepeat(Project project){
		QueryFilter query = new QueryFilter();
		query.addConjunctFilter("Q_delFlag_S_EQ", Constant.ENABLED);
		query.addConjunctFilter("Q_projectName_S_EQ", project.getProjectName());
		if(project.getProjectId()!=null){
			query.addConjunctFilter("Q_projectId_L_NEQ", project.getProjectId()+"");
		}
		List<Project> list = projectDao.getAll(query);
		if(list!=null && list.size()>0){
			throw new BusinessException("项目名称重复，请更换别的项目名称!");
		}
	}
}
