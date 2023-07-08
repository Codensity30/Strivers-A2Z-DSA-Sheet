/*
Question:
Given two integer arrays A and B of size N each. A sum combination is made by adding one element from array A and another element from array B. Return the maximum K valid distinct sum combinations from all the possible sum combinations. Output array must be sorted in non-increasing order.

Example:
Input:
N = 2
K = 2
A[] = {3, 2}
B[] = {1, 4}
Output: {7, 6}
Explanation: 
7 -> (A: 3) + (B: 4)
6 -> (A: 2) + (B: 4)
*/

/*
Approach:
1. Sort arrays A and B in non-increasing order.
2. Initialize a min-heap (priority_queue) to store the sum combinations.
3. Iterate over each element in array A.
4. For each element in A, iterate over each element in array B.
5. Calculate the sum of the current pair (A[i] + B[j]).
6. If the heap size is less than K, push the sum into the heap.
7. If the heap size is already K and the current sum is greater than the smallest element in the heap, pop the smallest element and push the current sum into the heap.
8. After iterating over all elements, the heap will contain the K maximum valid sum combinations in non-increasing order.
9. Store the elements of the heap in a vector and return it as the result.

CODE:-
*/

vector<int> maxCombinations(int N, int K, vector<int>& A, vector<int>& B) {
    priority_queue<int, vector<int>, greater<int>> pq;
    sort(A.begin(), A.end(), greater<int>());
    sort(B.begin(), B.end(), greater<int>());

    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            pq.push(A[i] + B[j]);
            if (pq.size() > K)
                pq.pop();
        }
    }

    vector<int> result;
    while (!pq.empty()) {
        result.push_back(pq.top());
        pq.pop();
    }

    return result;
}
