/*
QUESTION:
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.


Example:
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4


APPROACH:
To implement the LRU cache, we can use a combination of a hash map and a doubly linked list.
- The hash map will store the key-value pairs, where the key is the cache key and the value is a pointer to the corresponding node in the linked list.
- The doubly linked list will maintain the order of the recently used keys, where the front of the list represents the most recently used key and the back of the list represents the least recently used key.

IMPLEMENTATION:
1. Initialize the LRU cache with the given capacity.
2. Implement the get(key) function:
   - If the key exists in the cache, move the corresponding node to the front of the list (indicating it is the most recently used).
   - Return the value of the key if it exists, otherwise return -1.
3. Implement the put(key, value) function:
   - If the key already exists in the cache, update its value and move the corresponding node to the front of the list.
   - If the key does not exist:
     - If the cache is full, remove the least recently used key (from the back of the list) and remove its entry from the hash map.
     - Add the new key-value pair to the front of the list and insert its entry into the hash map.

CODE:
*/

class LRUCache {
private:
    int capacity;
    unordered_map<int, list<pair<int, int>>::iterator> addr;
    list<pair<int, int>> lru;

public:
    LRUCache(int capacity) {
        this->capacity = capacity;
    }

    int get(int key) {
        if (addr.find(key) == addr.end())
            return -1; // Key not found

        auto keyPos = addr[key];
        lru.splice(lru.begin(), lru, keyPos);
        return lru.front().second;
    }

    void put(int key, int value) {
        // If the key already exists, update its value and move it to the front
        if (addr.find(key) != addr.end()) {
            auto keyPos = addr[key];
            lru.splice(lru.begin(), lru, keyPos);
            lru.front().second = value;
            return;
        }

        // If the capacity is full, remove the least recently used key
        if (addr.size() == capacity) {
            int backKey = lru.back().first;
            lru.pop_back();
            addr.erase(backKey);
        }

        lru.push_front({key, value});
        addr[key] = lru.begin();
    }
};

/*
COMPLEXITY ANALYSIS:
- The time complexity of both the get() and put() operations is O(1) since we use a hash map to achieve constant time access and update.
- The space complexity is O(capacity) since the cache can store at most 'capacity' key-value pairs.
*/
