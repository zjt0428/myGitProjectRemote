package com.knight.emms.terminal.action;

import com.knight.core.log.ActionLog;
import com.knight.core.web.action.MenuAuthority;
import com.knight.emms.model.FormAccept;
import com.knight.emms.service.FormAcceptService;
import com.knight.emms.terminal.Tequest;
import com.knight.emms.terminal.TerminalBaseAction;
import com.knight.system.application.ApplicationContainer;

import javax.annotation.Resource;

/**
 * Created by YaoFly on 2016/8/25.
 */
public class AppConfimAction extends TerminalBaseAction{
    @Resource
    private FormAcceptService formAcceptService;

    @MenuAuthority(text = "APP提交受理", iconCls = "btn-accept")
    @ActionLog(description = "保存受理信息")
    public String saveAccept() {
        Tequest tequest = getTerminalMessage();
        FormAccept formAccept = new FormAccept();
        formAccept.setAcceptId(null);
        formAccept.setAcceptUserid(ApplicationContainer.getCurrentUserId());
        formAccept.setAcceptDep(tequest.getAcceptDep());
        formAccept.setAcceptOpinion(tequest.getAcceptOpinion());
        formAccept.setAcceptRemark(tequest.getAcceptRemark());
        formAccept.setAcceptTime(tequest.getAcceptTime());
        formAccept.setAcceptUsername(tequest.getAcceptUsername());
        formAccept.setRelateId(tequest.getRelateId());
        formAccept.setRelateModule(tequest.getRelateModule());
        formAcceptService.parserAccept(formAccept);
        return SUCCESS;
    }
}
