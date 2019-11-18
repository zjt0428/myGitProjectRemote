package com.knight.system.model;

import java.util.HashSet;
import java.util.Set;

import lombok.Data;

import org.jbpm.api.identity.Group;
import org.springframework.security.core.GrantedAuthority;

import com.google.gson.annotations.Expose;
import com.knight.core.Constants;
import com.knight.core.model.BaseModel;

@Data
public class AppRole extends BaseModel implements GrantedAuthority, Group, Cloneable {

	private static final long serialVersionUID = 1L;

	public static String ROLE_PUBLIC = "ROLE_PUBLIC";

	public static String ROLE_ANONYMOUS = "ROLE_ANONYMOUS";

	public static String ROLE_PUBLIC_MATCHER = "ROLE_PUBLIC_MATCHER";

	public static final Long SUPER_ROLEID = -1L;

	public static final String SUPER_RIGHTS = "__ALL";

	@Expose
	private Long roleId;

	@Expose
	private String roleName;

	@Expose
	private String roleDesc;

	@Expose
	private Short status = Constants.ENABLED;

	@Expose
	private String roleType = Constants.ENABLED.toString();

	@Expose
	private Short isDefaultIn;

	@Expose
	private String rights;
	
	/**数据权限（业务）*/
	@Expose
	private String dataPermission;
	
	/**数据权限（设备）*/
	@Expose
	private String equipPermission;
	
	/**数据权限（劳务端）*/
	@Expose
	private String labourPermission;
	
	//角色所属部门ID
	@Expose
	private Long roleDepartmentId;
	
	//角色所属部门名称
	@Expose
	private String roleDepartment;

	private Set<AppFunction> functions = new HashSet<AppFunction>();

	private Set<AppUser> appUsers = new HashSet<AppUser>();

	public String getAuthority() {
		return this.roleName;
	}

	public int compareTo(Object o) {
		return 0;
	}

	public String getId() {
		return this.roleId.toString();
	}

	public String getName() {
		return this.roleName;
	}

	public String getType() {
		return "candidate";
	}
	
	public AppRole clone() {
		AppRole entity = null;
		try {
			entity = (AppRole) super.clone();
			entity.setFunctions(new HashSet<AppFunction>());
			entity.setAppUsers(new HashSet<AppUser>());
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		return entity;
	}

}