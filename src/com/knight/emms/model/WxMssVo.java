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

import com.knight.core.model.BaseModel;
import com.knight.core.table.PersistantDeclare;
import com.knight.emms.support.TemplateData;

import lombok.Data;
import lombok.ToString;

/**
 * @ClassName: Announce
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2013-7-25 下午4:27:10
 */
@Data
@ToString(callSuper = false, doNotUseGetters = true)
@PersistantDeclare
public class WxMssVo {

	protected static final long serialVersionUID = 1L;
	
	
    private String touser;//用户openid
    private String template_id;//模版id
    private String page = "index";//默认跳到小程序首页
    private String form_id;//收集到的用户formid
    private String emphasis_keyword = "keyword1.DATA";//放大那个推送字段
    private Map<String, TemplateData> data;//推送文字

}
