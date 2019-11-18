Ext.ns("KnightUtil.math");
/**
 * <code><pre>
 * 设置要保留的小数位数,四舍五入（这里的方法是先乘以10的倍数,然后去掉小数,最后再除以10的倍数）
 * dight要格式化的数字,how要保留的小数位数
 * </code></pre>
 */
KnightUtil.math.forDight = function(dight, how) {
	return Math.round(dight * Math.pow(10, how)) / Math.pow(10, how);
};
KnightUtil.math.forHundredthDight = function(dight) {
	return KnightUtil.math.forDight(dight, 2);
};