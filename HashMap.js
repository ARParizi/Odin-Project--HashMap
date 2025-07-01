class HashMap {
    constructor(capacity, loadFactor = 0.8) {
        this.capacity   = capacity;
        this.loadFactor = loadFactor;
        this.buckets    = [];
        this.size       = 0;
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
        this.#resize();
        //
        const item = { key, value };
        const hash = this.hash(item.key) % this.capacity;
        this.buckets[hash].push(item);
        this.size++;
    }

    get(key) {
        const hash   = this.hash(key) % this.capacity;
        const bucket = this.buckets[hash];

        for (let i = 0; i < bucket.length; i++) {
            const item = bucket[i]; 
            if (key === item.key) {
                return item.value;
            }
        }
        return null;
    }

    has(key) {
        return !!this.get(key);
    }

    #resize() {
        this.size = this.length();
        if (this.size + 1 < Math.floor(this.capacity * this.loadFactor))
            return;

        const newCapacity = this.capacity * 2;
        const newBuckets  = [];
        for (let i = 0; i < newCapacity; i++) {
            newBuckets.push([]);
        }

        for (let i = 0; i < this.buckets.length; i++) {
            for(let j = 0; j < this.buckets[i].length; j++){
                const item = this.buckets[i][j];
                const hash = this.hash(item.key) % newCapacity;
                newBuckets[hash].push(item);
            }
        }

        this.capacity = newCapacity;
        this.buckets  = newBuckets;
    }

    length() {
        let size = 0;
        for (let i = 0; i < this.buckets.length; i++) {
            size += this.buckets[i].length;
        }

        if (this.size !== size) {
            throw new Error('Error 1 in HashMap.length()');
        }
        return size;
    }
}

const map = new HashMap(16);
console.log(map.hash("hello")); // Will output a consistent hash value
console.log(map.hash("world")); // Different input, different hash
console.log(map.buckets);
console.log(map.length());