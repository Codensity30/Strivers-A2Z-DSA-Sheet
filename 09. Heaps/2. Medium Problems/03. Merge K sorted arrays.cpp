/*
QUESTION:
Given K sorted arrays arranged in the form of a matrix of size K*K, the task is to merge them into one sorted array.

APPROACH:
To merge K sorted arrays, we can use a min-heap (priority queue) to store the smallest elements from each array.
1. Create a min-heap of size K to store the current smallest elements from each array.
2. Initialize the min-heap with the first element from each array.
3. While the min-heap is not empty, extract the smallest element from the min-heap, add it to the merged array, and replace it with the next element from the same array.
4. Repeat step 3 until all elements from all arrays are processed.

The mergeKArrays function implements this approach. It uses a min-heap (priority queue) to merge K sorted arrays into one sorted array.

TIME COMPLEXITY:
The time complexity of the mergeKArrays function is O(K^2 log K), where K is the size of each array. Inserting elements into the min-heap and extracting the minimum element take O(log K) time, and we do this for K^2 elements. The overall time complexity is dominated by the heap operations.

SPACE COMPLEXITY:
The space complexity is O(K) as we need to store K elements in the min-heap.
*/

typedef pair<int, pair<int, int>> triplet;

vector<int> mergeKArrays(vector<vector<int>>& arr, int K) {
    priority_queue<triplet, vector<triplet>, greater<triplet>> pq;
    
    for (int i = 0; i < K; i++) {
        pq.push({arr[i][0], {i, 0}});
    }
    
    vector<int> mergedArray;
    
    while (!pq.empty()) {
        triplet mini = pq.top();
        pq.pop();
        
        mergedArray.push_back(mini.first);
        
        int row = mini.second.first;
        int col = mini.second.second;
        
        if (col + 1 < K) {
            pq.push({arr[row][col + 1], {row, col + 1}});
        }
    }
    
    return mergedArray;
}
