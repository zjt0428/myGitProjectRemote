package com.knight.emms.domain.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.knight.core.dao.BaseJDBCDao;
import com.knight.core.script.SqlScriptBuilder;
import com.knight.core.util.DateUtil;
import com.knight.emms.dao.EquipInspectSchemaDao;
import com.knight.emms.domain.SchedularInspectDomain;
import com.knight.emms.model.EquipInspectSchema;
import com.knight.emms.service.EquipInspectSchemaService;

/**
 * Created by YaoFly on 2016/10/26.
 */
public class SchedularInspectDomainImpl implements SchedularInspectDomain {
    @Resource
    private EquipInspectSchemaService equipInspectSchemaService;
    
    @Resource
    private EquipInspectSchemaDao equipInspectSchemaDao;
    
	@Resource
	private BaseJDBCDao baseJdbcDao;

    @Override
    public void autoCreateWaitEquipInspect() {
        Date planDate = DateUtil.setStartDay(new Date());
        String sql = "SELECT EI FROM EquipInspectSchema EI,EquipFlow EF WHERE EF.flowId = EI.flowId  AND EI.nextFormTime = ? AND EI.delFlag = '1' AND EI.active='1' AND EF.flowState<5";
        List<EquipInspectSchema> list = equipInspectSchemaDao.findByHql(sql,new Object[]{planDate});
        for(EquipInspectSchema co :list){
            equipInspectSchemaService.createWaitEquipInspect(co);
        }
    }
    
    @Override
    public void sealEquipInspect() {
		String sql = SqlScriptBuilder.get("remaind.seal_equip_inspect");
		baseJdbcDao.jdbcTemplate().execute(sql);
    }
}
