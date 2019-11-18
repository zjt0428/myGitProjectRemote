
package com.knight.emms.model;

import java.util.Date;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.constant.Status;

/**
 * @ClassName: LostDetail
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 
 * @date 
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class LostDetail extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long lostDetailId;

	@Expose
	private Long lostId;
	
	@Expose
	private Long componId;

	@Expose
	private Long commodityId;

	@Expose
	private String commodity;
	
	@Expose
	private String componSpecific;

	@Expose
	private Long projectId;

	@Expose
	private Long projectComponId;

	@Expose
	private String counts;

	@Expose
	private String lostCounts;

	@Expose
	private String lostCost;

	@Expose
	private String damageCounts;
	
	@Expose
	private String damageCosts;

	@Expose
	private String totals;
	
	@Expose
	private String describe;
	
	@Expose
	private String calculate;
	

	@Expose
	private Component component;
		
	@Expose
	private String loseDescribe;

	/**附件id*/
	@Expose
	private Long disAllInitId;
}
