package com.knight.emms.service.impl;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.BindingParamFilters;
import com.knight.core.filter.QueryFilter;
import com.knight.emms.dao.ContractJoinUserDao;
import com.knight.emms.model.ContractJoinUser;
import com.knight.emms.service.ContractJoinUserService;
import com.knight.system.service.impl.BusinessLongPKServiceImpl;

public class ContractJoinUserServiceImpl extends BusinessLongPKServiceImpl<ContractJoinUser> implements ContractJoinUserService {

	@Resource
	private ContractJoinUserDao contractJoinUserDao;
	
	public ContractJoinUserServiceImpl(ContractJoinUserDao dao) {
		super(dao);
		this.contractJoinUserDao = dao;
	}

	
	public void saveCreate(String id,String userId,String relateModule) {
		ContractJoinUser cju = new ContractJoinUser();
		cju.setContractId(Long.valueOf(id));
		cju.setUserId(Long.valueOf(userId));
		cju.setRelateModule(relateModule);
		contractJoinUserDao.save(cju);
	}
	
	public String concatGrantedContractId(Long userId) {
		BindingParamFilters filter = new BindingParamFilters();
//	    filter.addConjunctFilter("Q_userId_L_EQ", userId+"");
	    filter.addFilter("userId", "EQ", userId);
	    List<ContractJoinUser> list = this.contractJoinUserDao.getAll(filter);
	    StringBuffer contractId = new StringBuffer();
	    String contractIds = "";
	    if (list.size() > 0){
			for (ContractJoinUser cju : list){
				contractId.append(cju.getContractId());
				contractId.append(",");
			}
			contractIds = contractId.substring(0, contractId.length() - 1);
			return contractIds;
	    }else{
	    	return "-1234567";
	    }
	    
  }
}