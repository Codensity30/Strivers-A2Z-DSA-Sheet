/*
QUESTION:
You are given an array of cards, each with an associated number of points. You can take exactly k cards, either from the beginning or from the end of the row. Your goal is to maximize the sum of the points of the cards you have taken. Return the maximum score you can obtain.

APPROACH:
To maximize the score, we need to minimize the sum of the discarded cards. We can find the minimum sum of a subarray of size (n - k) using a sliding window approach.

1. Create a helper function, minimumSumOfSizeK, which finds the minimum sum of a subarray of size k.
   - Initialize ans to INT_MAX, currsum to 0, and start to 0.
   - Iterate over the array from left to right:
     - Add the current element to currsum.
     - If the size of the current window (i - start + 1) exceeds k, remove the element at the start of the window from currsum and move the start to the next position.
     - If the size of the current window is k, update ans with the minimum of ans and currsum.
   - Return ans.

2. In the main function, maxScore:
   - Calculate the total sum of all the cards, totalSum.
   - Calculate the size of the discarded cards, windowSize, which is (n - k).
   - Find the minimum sum of a subarray of size windowSize using the minimumSumOfSizeK function and store it in discardedSum.
   - Return the maximum score, which is (totalSum - discardedSum).

COMPLEXITY ANALYSIS:
- Time complexity: O(n), where n is the size of the cardPoints array. We iterate over the array once to calculate the total sum and find the minimum sum of a subarray.
- Space complexity: O(1), as the extra space used is constant throughout the algorithm.
*/

int minimumSumOfSizeK(vector<int>& arr, int k) {
    int ans = INT_MAX, currsum = 0, start = 0;
    
    for (int i = 0; i < arr.size(); i++) {
        currsum += arr[i];
        
        while ((i - start + 1) > k) {
            currsum -= arr[start];
            start++;
        }
        
        if ((i - start + 1) == k)
            ans = min(ans, currsum);
    }
    
    return ans;
}

int maxScore(vector<int>& cardPoints, int k) {
    int totalSum = 0;
    
    for (auto it : cardPoints) {
        totalSum += it;
    }
    
    int windowSize = cardPoints.size() - k;
    int discardedSum = minimumSumOfSizeK(cardPoints, windowSize);
    
    return totalSum - discardedSum;
}
