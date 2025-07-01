class HashMap {
    constructor(capacity, loadFactor = 0.8) {
        this.capacity   = capacity;
        this.loadFactor = loadFactor;
        this.buckets    = [];
        for (let i = 0; i < capacity; i++) {
            this.buckets.push([]);
        }

    }


    hash(key) {
        const string = String(key);
        let hash = 0;
        const seed = 0x9747b28c; // Random seed
        const c1 = 0xcc9e2d51;
        const c2 = 0x1b873593;
        
        // Process each character of the string
        for (let i = 0; i < string.length; i++) {
            const char = string.charCodeAt(i);
            let k = char;
            
            k = Math.imul(k, c1);
            k = (k << 15) | (k >>> 17);
            k = Math.imul(k, c2);
            
            hash ^= k;
            hash = (hash << 13) | (hash >>> 19);
            hash = Math.imul(hash, 5) + 0xe6546b64;
        }
        
        // Final mixing
        hash ^= string.length;
        hash ^= hash >>> 16;
        hash = Math.imul(hash, 0x85ebca6b);
        hash ^= hash >>> 13;
        hash = Math.imul(hash, 0xc2b2ae35);
        hash ^= hash >>> 16;
        
        return Math.abs(hash);
    }
    set(key, value) {

    }
}

const map = new HashMap(16);
console.log(map.hash("hello")); // Will output a consistent hash value
console.log(map.hash("world")); // Different input, different hash
console.log(map.buckets);