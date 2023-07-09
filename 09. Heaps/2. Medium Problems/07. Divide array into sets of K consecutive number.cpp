/*
QUESTION:
Given an array of integers nums and a positive integer k, check whether it is possible to divide this array into sets of k consecutive numbers.

Return true if it is possible. Otherwise, return false.

Example:

Input: nums = [1,2,3,3,4,4,5,6], k = 4
Output: true
Explanation: Array can be divided into [1,2,3,4] and [3,4,5,6].
*/

/*
APPROACH:
1. First, we check if the array size is divisible by k. If not, it is not possible to divide the array into sets of k consecutive numbers.
2. We use a frequency map mp to count the occurrences of each element in the array.
3. We sort the array nums in ascending order.
4. For each number num in nums, we check if it is still available (mp[num] > 0).
5. If num is available, we iterate from num + 1 to num + k - 1 and check if each number is available in mp as well. If any number is not available, we return false.
6. If all numbers are available, we decrement the counts in mp accordingly.
7. If we reach the end of the loop, it means it is possible to divide the array into sets of k consecutive numbers, and we return true.
*/

/*
COMPLEXITY ANALYSIS:
- Time complexity: O(n log n), where n is the size of the input array nums. The complexity is dominated by the sorting step.
- Space complexity: O(n), to store the frequency map mp.
*/

bool isPossibleDivide(vector<int>& nums, int k) {
    if (nums.size() % k != 0) {
        return false;
    }
    unordered_map<int, int> mp;
    for (auto it : nums)
        mp[it]++;
    sort(nums.begin(), nums.end());

    for (auto num : nums) {
        if (mp[num] > 0) {
            for (int i = num + 1; i < num + k; i++) {
                if (mp[i] == 0)
                    return false;
                mp[i]--;
            }
            mp[num]--;
        }
    }
    return true;
}

