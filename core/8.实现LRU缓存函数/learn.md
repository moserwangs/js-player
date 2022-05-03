# 实现LRU缓存函数
**LRU（Least Recently Used）Cache**当用户访问不同站点时，浏览器需要缓存在对应站点的一些信息，这样当下次访问同一个站点的时候，就可以使访问速度变快。 但是内存空间是有限的，我们需要最近常用的站点信息，删除不常用的站点信息。

## 实现思路
`1.`LRUCache是一个类，接收一个数字类型参数，定义缓存的最大条目数

`2.`初始化时需要创建一个缓存对象，此对象存储数据需要有序，可以使用Map结构

`3.`get方法获取缓存，需要将获取的条目设置为最常用缓存

`4.`put方法设置缓存，如果缓存大于等于设置的最大条目数需要删除最不常用数据

## 实现

    /**
    * 实现LRU缓存
    */
    class LRUCache {
        constructor(n) {
            // 初始化缓存的条目数
            this.size = n
            // 初始化缓存数据，使用Map实例存储是因为其能有序存储
            this.data = new Map
        }

        // 获取缓存信息
        get(domain) {
            // 如果不存在返回false
            if (!this.data.has(domain)) return false
            const info = this.data.get(domain)
            // 先删除对应缓存数据
            this.data.delete(domain)
            // 获取缓存数据，并将其设置为最常用缓存
            this.data.set(domain, info)
            return info
        }

        // 设置缓存信息
        put(domain, info) {
            // 如果当前缓存条目大于等于设置最大条目数
            if (this.data.size >= this.size) {
                const keys = this.data.keys()
                // 删除最不常用数据
                this.data.delete(keys.next().value)
            }
            // 写入数据到缓存
            this.data.set(domain, info)
        }

    }



 
