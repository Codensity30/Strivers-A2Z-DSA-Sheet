/*
Question:
You are given an array of integers nums and an integer threshold. We need to find the smallest divisor
such that the result of dividing each element of the array by the divisor and summing up the results
is less than or equal to the threshold.

Example:
Input: nums = [1,2,5,9], threshold = 6
Output: 5
Explanation: We can get a sum of 17 (1+2+5+9) if the divisor is 1.
If the divisor is 4, we can get a sum of 7 (1+1+2+3).
If the divisor is 5, the sum will be 5 (1+1+1+2).
The smallest divisor that gives a sum less than or equal to the threshold is 5.

Approach:
- Start with a range of possible divisors from 1 to the maximum value in the array.
- Use binary search to find the smallest divisor that satisfies the given condition.
- Check the midpoint of the range and calculate the sum of divisions using the current divisor.
- If the sum is less than or equal to the threshold, update the answer and continue searching in the lower half of the range.
- If the sum is greater than the threshold, search in the upper half of the range.
- Repeat this process until the range is narrowed down to a single value, which will be the smallest divisor.

Code:
*/

int smallestDivisor(vector<int>& nums, int threshold) {
    int ans = -1;
    int low = 1, high = INT_MIN;

    // Finding the maximum value in the array
    for (auto it : nums)
        high = max(high, it);

    // Binary search for the smallest divisor
    while (low <= high) {
        int mid = low + (high - low) / 2;
        int sum = 0;
        for (auto num : nums) {
            sum += (num + mid - 1) / mid;
        }
        if (sum <= threshold) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

// Time Complexity: O(n log(max(nums)))
// Space Complexity: O(1)
