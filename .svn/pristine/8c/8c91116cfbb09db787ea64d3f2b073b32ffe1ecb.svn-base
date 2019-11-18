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

import java.util.Map;


import lombok.Data;
import lombok.ToString;

import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;

/**
 * @ClassName: Announce
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-25 下午4:27:10
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class AccessToken extends BaseModel {

	protected static final long serialVersionUID = 1L;
	
    private String expires_in; //成功有效时间  
    private String access_token;  // 普通Token  
    private String errcode; //失败ID  
    private String errmsg; //失败消息  

}
