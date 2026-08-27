# LRU Cache (C++)

## Overview

This project implements an **LRU (Least Recently Used) Cache** from scratch in **C++** using a combination of a **Hash Map (`unordered_map`)** and a **Doubly Linked List**.

The cache stores key-value pairs in memory and automatically removes the **Least Recently Used** item when the cache reaches its maximum capacity. The implementation guarantees **O(1)** average time complexity for both `get` and `put` operations.

This project demonstrates efficient data structure design and is a common interview problem asked by companies such as Google, Amazon, Microsoft, and Meta.

---

## Features

- O(1) `get(key)`
- O(1) `put(key, value)`
- Automatic eviction of least recently used element
- Custom Doubly Linked List implementation
- Hash Map for constant-time lookup
- Clean and modular C++ code
- Easy to extend for additional cache operations

---

## Data Structures Used

### 1. Hash Map

Stores:

```cpp
unordered_map<int, Node*> cache;
```

Purpose:

- Fast lookup by key
- Direct access to cache nodes

Time Complexity: **O(1)** average

---

### 2. Doubly Linked List

Maintains usage order.

- Most Recently Used (MRU) node stays near the front.
- Least Recently Used (LRU) node stays near the back.

Each node contains:

```cpp
key
value
prev
next
```

---

## Working

### put(key, value)

- If key already exists
  - Update value
  - Move node to the front

- If key doesn't exist
  - If cache is full
    - Remove the least recently used node
  - Insert new node at the front

---

### get(key)

- Return value if found
- Move accessed node to the front
- Return `-1` if key doesn't exist

---

## Time Complexity

| Operation | Complexity |
|----------|------------|
| get() | O(1) |
| put() | O(1) |
| delete | O(1) |

---

## Space Complexity

**O(capacity)**

---

## Project Structure

```
LRU-Cache/
│
├── Node.h
├── DoublyLinkedList.h
├── LRUCache.h
├── main.cpp
└── README.md
```

---

## Example

```
Capacity = 3

put(1,10)
put(2,20)
put(3,30)

Cache:
3 -> 2 -> 1

get(1)

Cache:
1 -> 3 -> 2

put(4,40)

2 is removed because it is the Least Recently Used.

Cache:
4 -> 1 -> 3
```

---

## Concepts Covered

- Hashing
- Doubly Linked List
- Pointers
- Memory Management
- Object-Oriented Programming
- Data Structures
- Cache Design
- Time Complexity Optimization

---

## Future Improvements

- Generic template-based cache
- Thread-safe implementation using mutexes
- LFU Cache implementation
- TTL (Time-To-Live) support
- Unit tests
- Benchmarking and performance analysis

---

## License

This project is open source and available under the MIT License.