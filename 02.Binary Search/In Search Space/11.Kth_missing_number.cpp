/*
Question: Given a sorted array arr of positive integers and an integer k, find the kth positive integer that is missing from the array.

Example:
Input: arr = [2,3,4,7,11], k = 5
Output: 9
Explanation: The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.

Approach:
- We can solve this problem by finding the position in the array where the count of missing positive integers becomes greater than or equal to k.
- Initialize a variable `low` to 0 to represent the start of the array.
- Initialize a variable `high` to the size of the array minus 1 to represent the end of the array.
- Initialize a variable `pos` to -1 to store the position of the missing integer.
- Perform a binary search on the array:
  - Calculate the middle index `mid` using the formula `low + (high - low) / 2`.
  - If the count of missing positive integers in the subarray from the start to `mid` is less than k, update `low` to `mid + 1`.
  - Otherwise, update `pos` to `mid` and update `high` to `mid - 1`.
- After the binary search, check if a missing integer was found:
  - If `pos` is still -1, it means that the missing integer should be after the last element in the array. Return the sum of the size of the array and k.
  - Otherwise, return `pos + k` as the kth missing positive integer.

Time Complexity: O(log n), where n is the size of the array.
Space Complexity: O(1)

*/

int findKthPositive(vector<int>& arr, int k) {
    int low = 0, high = arr.size() - 1;
    int pos = -1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if ((arr[mid] - (mid + 1)) < k)
            low = mid + 1;
        else {
            pos = mid;
            high = mid - 1;
        }
    }

    if (pos == -1)
        return arr.size() + k;

    return pos + k;
}
