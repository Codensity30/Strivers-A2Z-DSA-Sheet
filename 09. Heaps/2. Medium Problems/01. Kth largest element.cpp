/*
QUESTION:
Given an integer array nums and an integer k, return the kth largest element in the array.

APPROACH:
To find the kth largest element in the array, we can use a min-heap of size k.
1. Initialize a min-heap (priority queue) of size k.
2. Insert the first k elements of the array into the min-heap.
3. For the remaining elements in the array, if an element is larger than the top element of the min-heap, replace the top element with the current element and heapify to maintain the min-heap property.
4. After processing all the elements, the top element of the min-heap will be the kth largest element in the array.

The findKthLargest function implements this approach. It uses a min-heap (priority queue) to find the kth largest element in the array without sorting the entire array.

TIME COMPLEXITY:
The time complexity of the findKthLargest function is O(N log k), where N is the size of the array. Inserting elements into the min-heap and heapifying take O(log k) time, and we do this for N-k elements. The overall time complexity is dominated by the heap operations.

SPACE COMPLEXITY:
The space complexity is O(k) as we need to store k elements in the min-heap.
*/

int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = 0; i < k; i++) {
        pq.push(nums[i]);
    }
    for (int i = k; i < nums.size(); i++) {
        if (nums[i] > pq.top()) {
            pq.pop();
            pq.push(nums[i]);
        }
    }
    return pq.top();
}
