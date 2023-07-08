/*
Question:
Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Implement KthLargest class:
- KthLargest(int k, int[] nums): Initializes the object with the integer k and the stream of integers nums.
- int add(int val): Appends the integer val to the stream and returns the element representing the kth largest element in the stream.

Example:
Input:
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output:
[null, 4, 5, 5, 8, 8]

Explanation:
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3);   // return 4
kthLargest.add(5);   // return 5
kthLargest.add(10);  // return 5
kthLargest.add(9);   // return 8
kthLargest.add(4);   // return 8

Approach:
- Use a min heap (priority queue) to store the k largest elements.
- Initialize the min heap with the first k elements from the stream (nums) in the constructor.
- For each subsequent element in the stream, add it to the min heap.
- If the size of the min heap exceeds k, remove the smallest element.
- The top element of the min heap represents the kth largest element.

Complexity Analysis:
- The time complexity of adding an element is O(log k) due to the insertion and removal operations in the min heap.
- The space complexity is O(k) to store the k largest elements in the min heap.

Code:
*/

class KthLargest {
private:
    priority_queue<int, vector<int>, greater<int>> pq;
    int k;
    
public:
    KthLargest(int k, vector<int>& nums) {
        this->k = k;
        for (int i = 0; i < nums.size(); i++) {
            pq.push(nums[i]);
            if (pq.size() > k) {
                pq.pop();
            }
        }
    }
    
    int add(int val) {
        pq.push(val);//* this is amazing to use
        if (pq.size() > k) {
            pq.pop();
        }
        return pq.top();
    }
};

