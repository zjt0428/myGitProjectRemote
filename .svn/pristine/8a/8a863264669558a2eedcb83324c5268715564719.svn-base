package com.knight.system.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.knight.core.model.BaseModel;

@Data
@EqualsAndHashCode(callSuper = false)
@ToString(callSuper = false)
public class IndexDisplay extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Expose
	private Long indexId;

	@Expose
	private String portalId;

	@Expose
	private Integer colNum;

	@Expose
	private Integer rowsNum;

	private AppUser appUser;

	public IndexDisplay() {
	}

	public IndexDisplay(Long in_indexId) {
		setIndexId(in_indexId);
	}

	public Long getUserId() {
		return ((getAppUser() == null) ? null : getAppUser().getUserId());
	}

	public void setUserId(Long aValue) {
		if (aValue == null) {
			this.appUser = null;
		} else if (this.appUser == null) {
			this.appUser = new AppUser(aValue);
			this.appUser.setVersion(new Integer(0));
		} else {
			this.appUser.setUserId(aValue);
		}
	}

}