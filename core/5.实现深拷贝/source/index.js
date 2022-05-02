/**
 * 实现深拷贝
 * @param {*任意类型} obj
 * @returns
 */
function deepClone(obj, hashMap = new WeakMap()) {
  // 属性为null、undefined返回本身
  if (obj == null) return obj;
  // 属性为正则、日期类型返回对应类型
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 属性为基础类型或function返回本身
  if (typeof obj !== "object") return obj;
  // 如果hashMap中已经存在该对象，说明已经拷贝过了，返回对应值
  if (hashMap.has(obj)) return hashMap.get(obj);
  // 是数组返回空数组[],是对象返回空对象{}
  const cloneObj = new obj.constructor();
  // 使用hashMap存放已经拷贝的值
  hashMap.set(obj, cloneObj);
  // 递归拷贝对象属性
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 传入第一次拷贝的hashMap
      cloneObj[key] = deepClone(obj[key], hashMap);
    }
  }
  // 返回拷贝对象
  return cloneObj;
}
