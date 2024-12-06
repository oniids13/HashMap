import LinkedList from './linklist.js'

export default class HashMap {
    constructor(load = 0.75, capacity = 16) {
        this.load = load;
        this.capacity = capacity;
        this.buckets = Array(capacity)
        .fill()
        .map(() => new LinkedList());
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode % this.capacity;
    }

    set(key, value, recursive = false) {
        let expanded = false;
        let oldEntries;

        if (this.load < this.length() / this.capacity && !recursive) {
            this.capacity *= 2;
            oldEntries = this.entries();
            this.buckets = Array(this.capacity)
            .fill()
            .map(() => new LinkedList());

            expanded = true
        }

        if (expanded && oldEntries) {
            for (let entry of oldEntries) {
                this.set(entry[0], entry[1], true);
            }
        }

        const keyHash = this.hash(key);
        const bucket = this.buckets[keyHash];

        if (bucket.containsKey(key)) {
            const keyIndex = bucket.findKey(key);
            if (keyIndex !== null) {
                bucket.removeAt(keyIndex);
                bucket.insertAt({key, value}, keyIndex);
            }
        } else {
            bucket.append({key, value});
        }
    }

    get(key) {
        const keyHash = this.hash(key);
        const bucket = this.buckets[keyHash];
        let indexRef = {}
        let index;

        if (bucket.containsKey(key, indexRef)) {
            index = indexRef.index;
            return bucket.at(index).value.value;
        }

        return null;
    }

    has(key) {
        return Boolean(this.get(key));
    }

    remove(key) {
        const keyHash = this.hash(key);
        const bucket = this.buckets[keyHash];

        const index = bucket.findKey(key);

        bucket.removeAt(index);
    }

    length() {
        let length = 0;
        for (let bucket of this.buckets) {
            length += bucket.size();
        }
        return length;
    }

    clear() {
        this.buckets = Array(this.capacity)
        .fill()
        .map(() => new LinkedList())
    }

    keys() {
        let keys = [];

        for (let bucket of this.buckets) {
            let node = bucket.head;
            while(node) {
                keys.push(node.value.key);
                node = node.nextNode;
            }
        }
        return keys;
    }

    values() {
        let values = [];

        for (let bucket of this.buckets) {
            let node = bucket.head;
            while(node) {
                values.push(node.value.value);
                node = node.nextNode;
            }
        }
        return values;
    }

    entries() {
        let entries = [];

        for (let bucket of this.buckets) {
            let node = bucket.head;
            while(node) {
                entries.push(node.value.value);
                node = node.nextNode;
            }
        }
        return entries;
    }
}