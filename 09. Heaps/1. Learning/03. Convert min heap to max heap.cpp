/*
QUESTION:
You are given an array arr of N integers representing a min Heap. The task is to convert it to a max Heap.

A max-heap is a complete binary tree in which the value in each internal node is greater than or equal to the values in the children of that node.

APPROACH:
To convert a min-heap to a max-heap, we need to rearrange the elements of the array in such a way that the max-heap property is satisfied.
1. Start from the last internal node of the heap (N/2 - 1) and perform heapify on each internal node.
2. Heapify a node by comparing it with its left and right children and swapping if necessary.
3. Continue this process for all internal nodes until the entire heap is converted to a max-heap.

The heapify function is implemented to compare a node with its left and right children and swap if necessary to satisfy the max-heap property.

The convertMinToMaxHeap function is the main function that converts the given min-heap to a max-heap. It starts from the last internal node (N/2 - 1) and performs heapify on each internal node.

TIME COMPLEXITY:
The time complexity of the convertMinToMaxHeap function is O(N), where N is the size of the array. This is because we need to perform heapify on each internal node of the heap.

SPACE COMPLEXITY:
The space complexity is O(1) as no extra space is used in the conversion process.
*/

void heapify(vector<int>& arr, int node) {
    int left = (2 * node) + 1;
    int right = (2 * node) + 2;
    int largest = node;
    int n = arr.size();

    if (left < n && arr[left] > arr[largest])
        largest = left;

    if (right < n && arr[right] > arr[largest])
        largest = right;

    if (largest != node) {
        swap(arr[node], arr[largest]);
        heapify(arr, largest);
    }
}

void convertMinToMaxHeap(vector<int>& arr, int N) {
    for (int i = (N / 2) - 1; i >= 0; i--) {
        heapify(arr, i);
    }
}
