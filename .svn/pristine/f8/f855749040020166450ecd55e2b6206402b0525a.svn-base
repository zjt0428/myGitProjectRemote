package com.knight.emms.terminal.action;

import com.knight.core.util.GsonUtil;
import com.knight.emms.terminal.TerminalBaseAction;
import com.knight.system.model.CodeInfo;
import com.knight.system.service.CodeService;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * Created by YaoFly on 2016/8/24.
 */
public class DicCodeAction extends TerminalBaseAction{
    @Resource
    private CodeService codeService;

    public String getValueMap(){
        Map<String,CodeInfo> map = codeService.getCodeInfoMap(getTerminalMessage().getQuery().getCodeId());
        List<CodeInfo> list = new ArrayList<CodeInfo>();
        for (CodeInfo v : map.values()) {
            list.add(v);
        }
        successResponse(GsonUtil.toJson(list));
        return SUCCESS;
    }
}
