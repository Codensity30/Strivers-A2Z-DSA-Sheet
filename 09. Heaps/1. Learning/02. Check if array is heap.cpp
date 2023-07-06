/*
QUESTION:
Given an array A of size N, the task is to check if the given array represents a Binary Max Heap.

APPROACH:
1. Start from the root node and recursively check if the current node satisfies the max-heap property.
2. The max-heap property states that every node should be greater than all of its descendants.
3. Check if the current node is greater than its left and right children.
4. Recursively check the max-heap property for the left and right subtrees.
5. If the current node is greater and the left and right subtrees also satisfy the max-heap property, then the array represents a binary max heap.

The solve function is implemented to recursively check the max-heap property for each node. It checks if the current node is greater than its left and right children. If the current node is greater and the left and right subtrees also satisfy the max-heap property, then the array represents a binary max heap.

The isMaxHeap function is the main function that calls the solve function with the root node (index 0) and the size of the array. It returns true if the array represents a binary max heap, and false otherwise.

TIME COMPLEXITY:
The time complexity of the isMaxHeap function is O(N), where N is the size of the array. This is because we need to check the max-heap property for each node in the array.

SPACE COMPLEXITY:
The space complexity is O(N) due to the recursive calls in the solve function.
*/

bool solve(int a[], int node, int n) {
    if (node >= n)
        return true;

    int left = (2 * node) + 1;
    int right = (2 * node) + 2;

    return (solve(a, left, n) && solve(a, right, n) && (a[node] > a[left] && a[node] > a[right]));
}

bool isMaxHeap(int a[], int n) {
    return solve(a, 0, n);
}
