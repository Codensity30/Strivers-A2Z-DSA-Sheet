/*QUESTION:
Find all valid combinations of k numbers that sum up to n such that the following conditions are true:
- Only numbers 1 through 9 are used.
- Each number is used at most once.
Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.

Example:
Input: k = 3, n = 7
Output: [[1,2,4]]
Explanation: 1 + 2 + 4 = 7. There are no other valid combinations.

Approach:
To find all valid combinations of k numbers that sum up to n, we can use a recursive backtracking approach.
1. Create a helper function called 'solve' that takes the current index, the number of elements to choose (k), the target sum (tar), the array of available numbers (nums), a temporary vector to store the current combination, and a vector of vector to store all combinations as parameters.
2. In the 'solve' function:
   - If the target sum is equal to 0 and the size of the current combination is equal to k, add the current combination to the vector of combinations.
   - If the current index is equal to the size of the array or the target sum is less than 0, return.
   - If the current number is less than or equal to the target sum:
     - Add the current number to the current combination.
     - Recursively call the 'solve' function with the updated index by incrementing it, the same number of elements to choose (k), the reduced target sum by subtracting the current number, the same array of available numbers (nums), the current combination, and the vector of combinations.
     - Remove the last added number from the current combination (backtracking).
   - Recursively call the 'solve' function with the updated index by incrementing it, the same number of elements to choose (k), the same target sum, the same array of available numbers (nums), the current combination, and the vector of combinations.
3. Create the main function called 'combinationSum3' that calculates and returns the vector of combinations.
   - Initialize an array of available numbers containing numbers from 1 to 9.
   - Initialize an empty vector to store the combinations.
   - Call the 'solve' function with the initial index as 0, the number of elements to choose (k), the target sum (n), the array of available numbers, an empty temporary vector, and the vector of combinations.
   - Return the vector of combinations.

Time Complexity: O(2^9), as there are 9 available numbers and we have to explore all possible combinations.
Space Complexity: O(k), as the maximum depth of the recursion tree is determined by the number of elements to choose (k).

CODE:*/
void solve(int i, int k, int tar, vector<int>& nums, vector<int>& temp, vector<vector<int>>& ans) {
    if (tar == 0 && temp.size() == k) {
        ans.push_back(temp);
        return;
    }

    if (i == nums.size() || tar < 0)
        return;

    if (nums[i] <= tar) {
        temp.push_back(nums[i]);
        solve(i + 1, k, tar - nums[i], nums, temp, ans);
        temp.pop_back();
    }

    solve(i + 1, k, tar, nums, temp, ans);
}

vector<vector<int>> combinationSum3(int k, int n) {
    vector<int> nums;
    for (int i = 1; i <= 9; i++) {
        nums.push_back(i);
    }

    vector<vector<int>> ans;
    vector<int> temp;
    solve(0, k, n, nums, temp, ans);
    return ans;
}
