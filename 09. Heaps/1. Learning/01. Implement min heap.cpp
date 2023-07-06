/*
QUESTION:
Implement a min heap with all the required methods.

APPROACH:
A min heap is a binary tree-based data structure where the value of each parent node is less than or equal to the values of its children. The heapify operation is used to maintain the heap property, where a node is compared with its children and swapped if necessary.

In the given code, the minHeap class is implemented using a vector to store the elements. The heapify function is used to maintain the heap property by comparing the node with its left and right children and swapping if necessary. The bottomUpHeapify function is used to fix the heap property from a child node to its parent node.

The insert function adds an element to the heap by appending it to the vector and performing bottom-up heapification. The removeMin function removes the minimum element from the heap by replacing it with the last element, removing the last element, and then performing heapify. The minElement function returns the minimum element of the heap.

COMPLEXITY ANALYSIS:
- The heapify operation takes O(log n) time complexity, where n is the number of elements in the heap.
- The bottomUpHeapify operation also takes O(log n) time complexity.
- The insert operation takes O(log n) time complexity.
- The removeMin operation takes O(log n) time complexity.
- The minElement operation takes O(1) time complexity.

Overall, the time complexity of the minHeap class methods is O(log n), where n is the number of elements in the heap.

CODE:-
*/


class minHeap {
public:
    vector<int> pq;

    // Function to heapify the heap.
    void heapify(int node) {
        int leftChild = (2 * node) + 1;
        int rightChild = (2 * node) + 2;
        int smallest = node;

        if (leftChild < pq.size() && pq[leftChild] < pq[smallest])
            smallest = leftChild;

        if (rightChild < pq.size() && pq[rightChild] < pq[smallest])
            smallest = rightChild;

        if (smallest != node) {
            swap(pq[node], pq[smallest]);
            heapify(smallest);
        }
    }

    void bottomUpHeapify(int node) {
        int parent = (node - 1) / 2;
        if (parent >= 0 && pq[parent] > pq[node]) {
            swap(pq[parent], pq[node]);
            bottomUpHeapify(parent);
        }
    }

    // Function to insert 'val' in the heap.
    void insert(int val) {
        pq.push_back(val);
        bottomUpHeapify(pq.size() - 1);
    }

    // Function to remove the minimum element.
    void removeMin() {
        pq[0] = pq.back();
        pq.pop_back();
        heapify(0);
    }

    // Function to return the minimum element.
    int minElement() {
        return (pq.empty()) ? -1 : pq[0];
    }
};
