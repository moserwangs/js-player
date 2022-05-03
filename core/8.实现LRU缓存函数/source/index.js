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

