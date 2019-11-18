
package com.knight.emms.service;

import java.util.List;
import com.knight.core.filter.QueryFilter;
import com.knight.core.service.ExportService;
import com.knight.emms.core.service.BusinessFlowService;
import com.knight.emms.model.LostHandle;

/**
 * @ClassName: LostHandleService
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date 
 */
public interface LostHandleService extends BusinessFlowService<LostHandle>,ExportService {

	public List<LostHandle> queryTranslateAllFull(QueryFilter filter);

	public LostHandle getTranslateFull(Long lostId);
	
	public void deletedCompon(Long lostHandleId);

	public void delete(Long lostId);

}
