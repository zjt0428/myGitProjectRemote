package com.knight.system.model;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.knight.emms.model.CorpInfo;
import lombok.Data;

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.jbpm.api.identity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.userdetails.UserDetails;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.Since;
import com.knight.core.Constants;
import com.knight.core.model.BaseModel;
import com.knight.core.table.CodeFieldDeclare;
import com.knight.core.table.PersistantDeclare;

@Data
@PersistantDeclare
public class AppUser extends BaseModel implements UserDetails, User, Cloneable {

	private static final long serialVersionUID = 1L;

	public static Long SYSTEM_USER = -1L;

	public static Long SUPER_USER = 1L;

	@Expose
	protected Long userId;

	@Expose
	protected String username;

	protected String password;

	@Expose
	protected String fullname;

	@Expose
	protected String email;

	@Expose
	protected String phone;

	@Expose
	protected String mobile;

	@Expose
	private Short sex;

	@Expose
	private String address;

	@Expose
	private String zip;

	@Expose
	private String qq;

	@Expose
	private String position;

	@Expose
	private String longitude;

	@Expose
	private String latitude;

	@Expose
	private String deviceToken;

	@Expose
	private Date updateTime;

	@Expose
	protected Date createTime;

	@Expose
	protected Short keyFlag = Constants.DISENABLED;

	@Expose
	protected Short status = Constants.ENABLED;

	@Expose
	protected Short delFlag = Constants.DISENABLED;

	@Expose
	protected Long depId;

	@Expose
	@CodeFieldDeclare(codeId = "APPUSER_TYPE", valueField = "userTypeName")
	protected String userType;

	@Expose
	protected String userTypeName;

    @Expose
	protected String userSerial;
    
    /**数据权限（业务）*/
    @Expose
    protected String dataPermission;
    
    /**数据权限（设备）*/
    @Expose
    protected String equipPermission;
    
    /**数据权限（劳务）*/
    @Expose
    protected String labourPermission;

	@Expose
	protected Department department;

	@Expose
	private CorpInfo corpInfo;
	
	private String openId;

	@Expose
	@Since(value = 2.1)
	private Set<AppRole> roles = new HashSet<AppRole>(0);

	@Since(value = 2.1)
	private Set<AppUserKey> appUserKeySet = new HashSet<AppUserKey>(0);

	@Since(value = 2.1)
	private Set<AppUserExtend> appUserExtendSet = new HashSet<AppUserExtend>(0);

	public AppUser() {
	}

	public AppUser(Long userId) {
		this.userId = userId;
	}

	public boolean isAccountNonExpired() {
		return true;
	}

	public boolean isAccountNonLocked() {
		return true;
	}

	public boolean isCredentialsNonExpired() {
		return true;
	}

	public Collection<GrantedAuthority> getAuthorities() {
		GrantedAuthority[] rights = (GrantedAuthority[]) this.roles.toArray(new GrantedAuthority[this.roles.size() + 2]);
		rights[rights.length - 2] = new GrantedAuthorityImpl(AppRole.ROLE_PUBLIC);
		rights[rights.length - 1] = new GrantedAuthorityImpl(AppRole.ROLE_PUBLIC_MATCHER);
		List<GrantedAuthority> rightsList = Arrays.<GrantedAuthority> asList(rights);
		return rightsList;
	}

	public String getBusinessEmail() {
		return this.email;
	}

	public String getFamilyName() {
		return this.fullname;
	}

	public String getGivenName() {
		return this.fullname;
	}

	public String getId() {
		return this.userId.toString();
	}

	public String getPassword() {
		return this.password;
	}

	public String getUsername() {
		return this.username;
	}

	public boolean isEnabled() {
		return this.status.intValue() == 1;
	}

	// ===============================用户信息==================================//
	/** 相同模块绑定的扩展信息限制一个 */
	private Map<String, UserExtend> appUserExtends = new HashMap<String, UserExtend>(0);

	private Set<String> rights = new HashSet<String>(0);

	private AppUserKey currentAppUserKey;

	private List<PanelItem> portalConfig;

	private String depName;

	private String depPath;

	public AppUser clone() {
		AppUser entity = null;
		try {
			entity = (AppUser) super.clone();
			Set<AppRole> roles = new HashSet<AppRole>(0);
			for (AppRole role : this.getRoles()) {
				roles.add(role.clone());
			}
			entity.roles = roles;
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		return entity;
	}

	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973).append(this.userId).toHashCode();
	}

}