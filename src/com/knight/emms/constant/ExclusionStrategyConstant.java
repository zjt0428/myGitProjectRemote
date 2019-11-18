/**
 *====================================================
 * 文件名称: ExclusionStrategyConstant.java
 * 修订记录：
 * No    日期				作者(操作:具体内容)
 * 1.    2014-5-2			chenxy(创建:创建文件)
 *====================================================
 * 类描述：(说明未实现或其它不应生成javadoc的内容)
 */
package com.knight.emms.constant;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.knight.core.strategy.SpecificClassExclusionStrategy;
import com.knight.emms.model.BaseLocation;
import com.knight.emms.model.Dispatch;
import com.knight.emms.model.EquipActivate;
import com.knight.emms.model.EquipDismantle;
import com.knight.emms.model.EquipEmploy;
import com.knight.emms.model.EquipFlow;
import com.knight.emms.model.EquipInstall;
import com.knight.emms.model.Equipment;

/**
 * @ClassName: ExclusionStrategyConstant
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author chenxy
 * @date 2014-5-2 下午1:34:11
 */
public class ExclusionStrategyConstant {

	public static final SpecificClassExclusionStrategy equipInstallStrategy, equipActivateStrategy, equipEmployStrategy, equipDismantleStrategy, equipFlowStrategy, equipFlowWholeStrategy, equipFlowDiaryStrategy, 
	materialsStoreStrategy, equipWarehouseStrategy;

	static {
		Class<?>[] excludedThisClasses = null;
		Class<?>[] excludedDeclaredFieldClass = null;
		// Set<String> excludedFieldNames = null;
		Map<String, Set<Class<?>>> excludedFieldClasses = new HashMap<String, Set<Class<?>>>();

		excludedThisClasses = new Class<?>[] { Equipment.class, EquipActivate.class, EquipDismantle.class };
		excludedFieldClasses.clear();
		excludedFieldClasses.put("equipInstall", new HashSet<Class<?>>());
		excludedFieldClasses.get("equipInstall").add(EquipFlow.class);
		excludedFieldClasses.put("equipFlow", new HashSet<Class<?>>());
		excludedFieldClasses.get("equipFlow").add(EquipEmploy.class);
		equipInstallStrategy = new SpecificClassExclusionStrategy(excludedThisClasses, null, null, excludedFieldClasses);

		excludedThisClasses = new Class<?>[] { Equipment.class, Dispatch.class, EquipEmploy.class, EquipDismantle.class };
		excludedFieldClasses.clear();
		excludedFieldClasses.put("equipActivate", new HashSet<Class<?>>());
		excludedFieldClasses.get("equipActivate").add(EquipFlow.class);
		excludedFieldClasses.put("equipFlow", new HashSet<Class<?>>());
		excludedFieldClasses.get("equipFlow").add(EquipInstall.class);
		equipActivateStrategy = new SpecificClassExclusionStrategy(excludedThisClasses, null, null, excludedFieldClasses);

		excludedThisClasses = new Class<?>[] { Equipment.class, Dispatch.class, EquipActivate.class, EquipDismantle.class };
		excludedFieldClasses.clear();
		excludedFieldClasses.put("equipEmploy", new HashSet<Class<?>>());
		excludedFieldClasses.get("equipEmploy").add(EquipFlow.class);
		excludedFieldClasses.put("equipFlow", new HashSet<Class<?>>());
		excludedFieldClasses.get("equipFlow").add(EquipInstall.class);
		equipEmployStrategy = new SpecificClassExclusionStrategy(excludedThisClasses, null, null, excludedFieldClasses);

		excludedThisClasses = new Class<?>[] { Equipment.class, Dispatch.class, EquipInstall.class, EquipActivate.class, EquipEmploy.class };
		excludedFieldClasses.clear();
		excludedFieldClasses.put("equipDismantle", new HashSet<Class<?>>());
		excludedFieldClasses.get("equipDismantle").add(EquipFlow.class);
		equipDismantleStrategy = new SpecificClassExclusionStrategy(excludedThisClasses, null, null, excludedFieldClasses);

		excludedThisClasses = new Class<?>[] { Dispatch.class };	// Equipment.class,
		excludedDeclaredFieldClass = new Class<?>[] { EquipFlow.class };
		equipFlowStrategy = new SpecificClassExclusionStrategy(excludedThisClasses, null, excludedDeclaredFieldClass, null);

		excludedDeclaredFieldClass = new Class<?>[] { EquipFlow.class };
		equipFlowWholeStrategy = new SpecificClassExclusionStrategy(null, null, excludedDeclaredFieldClass, null);

		excludedThisClasses = new Class<?>[] { Equipment.class, Dispatch.class };
		excludedFieldClasses.clear();
		excludedFieldClasses.put("equipFlow", new HashSet<Class<?>>());
		excludedFieldClasses.get("equipFlow").add(EquipInstall.class);
		excludedFieldClasses.get("equipFlow").add(EquipActivate.class);
		excludedFieldClasses.get("equipFlow").add(EquipEmploy.class);
		excludedFieldClasses.get("equipFlow").add(EquipDismantle.class);
		equipFlowDiaryStrategy = new SpecificClassExclusionStrategy(excludedThisClasses, null, null, excludedFieldClasses);

//		excludedThisClasses = new Class<?>[] { Equipment.class, Dispatch.class };
//		excludedFieldClasses.clear();
		excludedFieldClasses.put("equipDismantle", new HashSet<Class<?>>());
		excludedFieldClasses.put("equipActivate", new HashSet<Class<?>>());
		excludedFieldClasses.put("equipInstall", new HashSet<Class<?>>());
		excludedFieldClasses.get("equipDismantle").add(EquipFlow.class);
		excludedFieldClasses.get("equipActivate").add(EquipFlow.class);
		excludedFieldClasses.get("equipInstall").add(EquipFlow.class);
		equipWarehouseStrategy = new SpecificClassExclusionStrategy(excludedThisClasses, null, null, excludedFieldClasses);

		excludedFieldClasses.clear();
		excludedFieldClasses.put("baseDepot", new HashSet<Class<?>>());
		excludedFieldClasses.get("baseDepot").add(BaseLocation.class);
		materialsStoreStrategy = new SpecificClassExclusionStrategy(null,null,null,excludedFieldClasses);
	}

}
