/**
 *====================================================
 * 文件名称: Announce.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2013-7-25			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.model;

import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.ToString;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.google.gson.reflect.TypeToken;
import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;
import com.knight.core.util.GsonUtil;
import com.knight.emms.constant.Type;
import com.knight.system.model.Department;

/**
 * @ClassName: Announce
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-25 下午4:27:10
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class Announce extends BaseModel {

	protected static final long serialVersionUID = 1L;

	@Expose
	private Long announceId;

	@Expose
	private String announceTitle;

	@Expose
	private String announceType;

	@Expose
	private String announce;

	@Expose
	private String publish;

	private Long userId;

	@Expose
	private String userName;

	private Long depId;

	@Expose
	private String providedDate;

	private String delFlag;

	@Expose
	private Department department;

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<AnnounceCategory> announcePractiSet = new HashSet<AnnounceCategory>(0);

	private String announcePractis = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<AnnounceCategory> announceDepSet = new HashSet<AnnounceCategory>(0);

	private String announceDeps = "";

	@Expose(deserialize = false, serialize = false)
	@Since(value = 2.0)
	private Set<AnnounceCategory> announceScopeDepSet = new HashSet<AnnounceCategory>(0);

	private String announceScopeDeps = "";

	// ==================================================================================//
	public void setSubAnnounce() {
		Set<AnnounceCategory> announcePractiSet = GsonUtil.fromJson(this.announcePractis, new TypeToken<Set<AnnounceCategory>>() {});
		if (announcePractiSet != null) {
			for (AnnounceCategory p : announcePractiSet) {
				p.setAnnounceId(this.announceId);
				p.setCategory(Type.AnnounceCategory.personal);
			}
			this.setAnnouncePractiSet(announcePractiSet);
		}
		Set<AnnounceCategory> announceDepSet = GsonUtil.fromJson(this.announceDeps, new TypeToken<Set<AnnounceCategory>>() {});
		if (announceDepSet != null) {
			for (AnnounceCategory p : announceDepSet) {
				p.setAnnounceId(this.announceId);
				p.setCategory(Type.AnnounceCategory.department);
			}
			this.setAnnounceDepSet(announceDepSet);
		}
		Set<AnnounceCategory> announceScopeDepSet = GsonUtil.fromJson(this.announceScopeDeps, new TypeToken<Set<AnnounceCategory>>() {});
		if (announceScopeDepSet != null) {
			for (AnnounceCategory p : announceScopeDepSet) {
				p.setAnnounceId(this.announceId);
				p.setCategory(Type.AnnounceCategory.allDepartment);
			}
			this.setAnnounceScopeDepSet(announceScopeDepSet);
		}
	}
	
	public void setSubAnnounce(String app) {
		Set<AnnounceCategory> announcePractiSet = this.announcePractiSet;
		if (announcePractiSet != null) {
			for (AnnounceCategory p : announcePractiSet) {
				p.setAnnounceId(this.announceId);
				p.setCategory(Type.AnnounceCategory.personal);
			}
			this.setAnnouncePractiSet(announcePractiSet);
		}
		Set<AnnounceCategory> announceDepSet = this.announceDepSet;
		if (announceDepSet != null) {
			for (AnnounceCategory p : announceDepSet) {
				p.setAnnounceId(this.announceId);
				p.setCategory(Type.AnnounceCategory.department);
			}
			this.setAnnounceDepSet(announceDepSet);
		}
		Set<AnnounceCategory> announceScopeDepSet = this.announceScopeDepSet;
		if (announceScopeDepSet != null) {
			for (AnnounceCategory p : announceScopeDepSet) {
				p.setAnnounceId(this.announceId);
				p.setCategory(Type.AnnounceCategory.allDepartment);
			}
			this.setAnnounceScopeDepSet(announceScopeDepSet);
		}
	}

}
