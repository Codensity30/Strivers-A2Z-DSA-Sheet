/*QUESTION:
Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

Example:
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation: 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times. 7 is a candidate, and 7 = 7. These are the only two combinations.

Approach:
To find all unique combinations that sum up to the target, we can use a recursive backtracking approach.
1. Create a helper function called 'solve' that takes the current index, the array of candidates, the target sum, a temporary vector to store the current combination, and a vector of vector to store all combinations as parameters.
2. In the 'solve' function:
   - If the target sum is equal to 0, add the current combination to the vector of combinations.
   - If the current index is equal to the size of the array, return.
   - If the current candidate value is less than or equal to the target sum:
     - Add the current candidate to the current combination.
     - Recursively call the 'solve' function with the updated index, the same array of candidates, the reduced target sum by subtracting the current candidate value, the current combination, and the vector of combinations.
     - Remove the last added candidate from the current combination (backtracking).
   - Recursively call the 'solve' function with the updated index by incrementing it, the same array of candidates, the same target sum, the current combination, and the vector of combinations.
3. Create the main function called 'combinationSum' that calculates and returns the vector of combinations.
   - Initialize an empty vector to store the combinations.
   - Sort the array of candidates in non-decreasing order to handle duplicates.
   - Call the 'solve' function with the initial index as 0, the array of candidates, the target sum, an empty temporary vector, and the vector of combinations.
   - Return the vector of combinations.

Time Complexity: O(N^target), where N is the size of the array of candidates and target is the target sum. In the worst case, we may have to explore all possible combinations, which is exponential.
Space Complexity: O(target), as the maximum depth of the recursion tree is determined by the target sum.

CODE:*/
void solve(int index, vector<int>& candidates, int target, vector<int>& temp, vector<vector<int>>& ans) {
    if (target == 0) {
        ans.push_back(temp);
        return;
    }

    if (index == candidates.size() || target < 0)
        return;

    if (candidates[index] <= target) {
        temp.push_back(candidates[index]);
        solve(index, candidates, target - candidates[index], temp, ans);
        temp.pop_back();
    }

    solve(index + 1, candidates, target, temp, ans);
}

vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
    vector<vector<int>> ans;
    sort(candidates.begin(), candidates.end());
    vector<int> temp;
    solve(0, candidates, target, temp, ans);
    return ans;
}
