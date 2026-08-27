#include<iostream>
#include<unordered_map>
using namespace std;

class Node{
public:
    int key;
    string val;
    Node* prev;
    Node* next;
    Node(int key, string val) {
        this->key = key;
        this->val = val;
        this->prev = this->next = NULL;
    }
    ~Node() {}
};

class DLL { // push, pop, deleteLast, clear
public:
    Node* head;
    Node* tail;

    DLL() {
        this->head = this->tail = NULL;
    }

    Node* push(int key, string val) { // add new node to head
        Node* newNode = new Node(key, val);
        if(head == NULL) {
            head = tail = newNode;
        }else {
            newNode->next = head;
            head->prev = newNode;
            head = newNode;
        }
        return head;
    }

    void pop(Node* node) { // pop / remove given node
        if(node == this->tail) {
            if(head == tail){
                head = tail = NULL;
            }else {
                tail = node->prev;
                tail->next = NULL;
            }
            delete node;
            return;
        }

        if(node == this->head) {
            if(head == tail){
                head = tail = NULL;
            }else{
                head = head->next;
                head->prev = NULL;
            }
            delete node;
            return;
        }

        node->prev->next = node->next;
        node->next->prev = node->prev;
        delete node;
        return;
    }

    void moveToFront(Node* node) {
        // if head skip
        if(node == this->head) {
            // cout << "already at head" << endl;
            return;
        }

        if(node == this->tail) {
            // cout << "moved to front from tail" << endl;
            Node* temp = tail;
            tail = tail->prev;
            tail->next = NULL;
            temp->prev = NULL;
            temp->next = head;
            head->prev = temp;
            head = temp;
            return;
        }

        //for middle node
        Node* temp = node;
        node->prev->next = node->next;
        node->next->prev = node->prev;
        temp->prev = NULL;
        temp->next = head;
        head->prev = temp;
        head = temp;

        // cout << "moved to front from mid" << endl;
        return;
    }

    void deleteLast() { // removes 1 tail node
        if(head == tail && head != NULL) { // singal node
            Node* temp = head;
            head = tail = NULL;
            delete temp;
            return;
        }

        if(tail == NULL) {
            // cout << "ALREADY EMPTY LIST" << endl;
            return;
        }

        Node* temp = this->tail;
        tail = tail->prev;
        tail->next = NULL;
        delete temp;
    }

    void clear() { // clears all list
        Node* curr = head;

        while (curr) {
            Node* next = curr->next;
            delete curr;
            curr = next;
        }

        head = tail = NULL;
    }
};

// ---------------------------------------------------------------------------------------------------

class LRU{ // addition of LL + cacheMap
    int MAX_SIZE;    
    int CURR_SIZE;
public:
    unordered_map<int, Node*> cache; // op => get(key) , put(key, val), delete(key)
    DLL cacheList;

    LRU() {
        this->MAX_SIZE = 10;
        this->CURR_SIZE = 0;
    }

    LRU(int MAX_SIZE) {
        this->MAX_SIZE = MAX_SIZE;
        this->CURR_SIZE = 0;
    }
    int cap() {
        return MAX_SIZE;
    }
    int size() {
        return CURR_SIZE;
    }
    void changeCap(int newsize) {
        MAX_SIZE = newsize;
        check_overflow();
    }
    void check_overflow() {
        while(CURR_SIZE > MAX_SIZE) {
            cache.erase(cacheList.tail->key);
            cacheList.deleteLast();
            CURR_SIZE--;
        }
    }

    bool get(int key) {
        if(cache.find(key) == cache.end()) { // not found
            cout << "KEY NOT FOUND";
            return false;
        }

        // cout << "This key belongs to " << ->val << endl;
        cout << "KEY" << key<<','<<"val" << cache[key]->val << endl;
        cacheList.moveToFront(cache[key]);
        return true;
    }

    bool put(int key, string value) {
        if(cache.find(key) != cache.end()) { // already exists
            cache[key]->val = value;                 // update value
            cacheList.moveToFront(cache[key]);       // move to front
            return true;
        }

        cacheList.push(key, value);
        cache[key] = cacheList.head;

        // cout << key << "->" << value << " Pair added" << endl;

        CURR_SIZE++;
        check_overflow();
        return true;
    }
    bool del(int key) {
        if(cache.find(key) == cache.end()) {//not found
            return false;
        }else {
            cacheList.pop(cache[key]);
            cache.erase(key);
            CURR_SIZE--;
            return true;
        }
    }

    bool clear() {
        cacheList.clear();
        cache.clear();
        CURR_SIZE = 0;
        return true;
        // cout << "List Cleared" << endl;
    }

    void print() {
        Node* temp = cacheList.head;

        while(temp) {
            cout << "Key :" << temp->key << "val :" << temp -> val << endl;
            temp = temp->next;
        }
        cout << endl;
    }
};

int main() {
    LRU first;
    first.put(1, "hello");
    first.put(2, "cpp");
    first.put(3, "with");
    first.put(4, "js");
    int choice;
    while(cin >> choice) {
        switch(choice) {
            case 1: {
                first.print();
                cout << "END\n";
                cout.flush();
                break;
            }
            case 2: {
                int key = -1;
                cin >> key;
                first.get(key);
                cout << "END\n";
                cout.flush();
                break;
            }
            case 3: {
                int key;
                string val;
                cin >> key;
                cin >> val;
                cout << first.put(key, val) << endl;
                cout << "END\n";
                cout.flush();
                break;
            }
            case 4: {
                int key = -1;
                cin >> key;
                cout << first.del(key) << endl;
                cout << "END\n";
                cout.flush();
                break;
            }
            case 5: {
                cout << first.clear() << endl;
                cout << "END\n";
                cout.flush();
                break;
            }
            case 6: {
                cout << first.cap() << endl;
                cout << "END\n";
                cout.flush();
                break;
            }
            case 7: {
                int newCap = 10;
                cin >> newCap;
                first.changeCap(newCap);
                cout << "END\n";
                cout.flush();
                break;
            }
            case 8: {
                cout << "Cap :" << first.cap() << endl;
                cout << "Size :" << first.size() << endl;
                cout << "END\n";
                cout.flush();
                break;
            }
        }
    }
    return 0;
}
//update, peek, stats, get(capacity/size), change capacity, stats, reset stats, operation history
