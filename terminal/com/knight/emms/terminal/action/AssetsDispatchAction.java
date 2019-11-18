package com.knight.emms.terminal.action;

import java.util.List;

import javax.annotation.Resource;

import com.knight.core.filter.QueryFilter;
import com.knight.core.util.GsonUtil;
import com.knight.emms.model.Dispatch;
import com.knight.emms.service.DispatchService;
import com.knight.emms.terminal.Query;
import com.knight.emms.terminal.TerminalBaseAction;
import com.knight.emms.terminal.dto.AssetsDispatchResponse;

public class AssetsDispatchAction extends TerminalBaseAction {
	
	@Resource
	private DispatchService dispatchService;
	
	public String AssetsDispatchList(){
		Query query = getTerminalMessage().getQuery();
		QueryFilter filter = new QueryFilter();
		filter.addConjunctFilter("Q_projectName_S_EQ", query.getProjectName());
		filter.addConjunctFilter("Q_providedDate_S_EQ", query.getProvidedDate());
		List<Dispatch> list = dispatchService.getAll(filter);
		AssetsDispatchResponse response = new AssetsDispatchResponse();
		for(Dispatch dispatch : list){
			response.addDispatch(dispatch);
		}
		setJsonString(GsonUtil.toJson(response,false));
		return SUCCESS;
	}

}
