# 实现深拷贝
**深拷贝**拷贝对象所有属性及其子属性的属性

## JSON序列化与反序列化实现深拷贝的问题
`1.`当对象中存在属性为undefined或function类型，丢失该属性

`2.`当对象中存在属性为正则或Error类型，该属性返回空对象

`3.`当对象中存在属性为日期类型，该属性返回字符串形式的日期

`4.`当对象中存在属性为NaN、Infinity、-Infinity，该属性返回null

`5.`只能序列化对象的可枚举的属性，原型上的属性会丢失

## 实现步骤
`1.`属性为null、undefined返回本身

`2.`属性为正则、日期类型返回对应类型

`3.`属性为基础类型或function返回本身

`4.`属性为Object或Array类型遍历拷贝

`5.`递归拷贝Object和Array类型的子项

## 实现

    /**
    * 实现深拷贝
    * @param {*任意类型} obj
    * @returns
    */
    function deepClone(obj) {
        // 属性为null、undefined返回本身
        if (obj == null) return obj;
        // 属性为正则、日期类型返回对应类型
        if (obj instanceof Date) return new Date(obj);
        if (obj instanceof RegExp) return new RegExp(obj);
        // 属性为基础类型或function返回本身
        if (typeof obj !== "object") return obj;
        // 是数组返回空数组[],是对象返回空对象{}
        const cloneObj = new obj.constructor();
        // 递归拷贝对象属性
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key]);
            }
        }
        // 返回拷贝对象
        return cloneObj;
    }

    const test = {
        bar: {
            name: "bar",
            type: 1,
        },
        func: function () {
            console.log(1);
        },
        name: undefined,
        reg: /\d+/,
        error: new Error("wrong"),
        date: new Date("2020-08-08"),
        number: NaN,
        max: Infinity,
        min: -Infinity,
    };
    let cloneTest = deepClone(test);
    console.log(test);


## 存在问题
**未解决循环引用问题**

    let obj = {
        name: 'foo'
    }

    obj._self = obj

## 使用WeakMap解决循环引用问题

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



    

       
