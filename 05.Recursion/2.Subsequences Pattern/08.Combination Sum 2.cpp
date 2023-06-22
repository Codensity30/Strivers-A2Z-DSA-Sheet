/*QUESTION:
Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target. Each number in candidates may only be used once in the combination. Note: The solution set must not contain duplicate combinations.

Example:
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: [[1,1,6],[1,2,5],[1,7],[2,6]]
Explanation: The sum of the combinations [1,1,6], [1,2,5], [1,7], and [2,6] is equal to the target 8.

Approach:
To find all unique combinations that sum up to the target, we can use a recursive backtracking approach.
1. Create a helper function called 'solve' that takes the current index, the target sum, the array of candidates, a temporary vector to store the current combination, and a vector of vector to store all combinations as parameters.
2. Sort the array of candidates in non-decreasing order to handle duplicates.
3. In the 'solve' function:
   - If the target sum is equal to 0, add the current combination to the vector of combinations.
   - If the current index is equal to the size of the array, return.
   - If the current candidate value is less than or equal to the target sum:
     - Add the current candidate to the current combination.
     - Recursively call the 'solve' function with the updated index by incrementing it, the reduced target sum by subtracting the current candidate value, the same array of candidates, the current combination, and the vector of combinations.
     - Remove the last added candidate from the current combination (backtracking).
   - To handle duplicates, skip the candidates with the same value as the current candidate by incrementing the index until a different candidate is found.
   - Recursively call the 'solve' function with the updated index by incrementing it, the same target sum, the same array of candidates, the current combination, and the vector of combinations.
4. Create the main function called 'combinationSum2' that calculates and returns the vector of combinations.
   - Initialize an empty vector to store the combinations.
   - Call the 'solve' function with the initial index as 0, the target sum, the sorted array of candidates, an empty temporary vector, and the vector of combinations.
   - Return the vector of combinations.

Time Complexity: O(N * 2^N), where N is the size of the array of candidates. In the worst case, we may have to explore all possible combinations, which is exponential.
Space Complexity: O(target), as the maximum depth of the recursion tree is determined by the target sum.

CODE:*/
void solve(int index, int target, vector<int>& candidates, vector<int>& temp, vector<vector<int>>& ans) {
    if (target == 0) {
        ans.push_back(temp);
        return;
    }

    if (index == candidates.size() || target < 0)
        return;

    if (candidates[index] <= target) {
        temp.push_back(candidates[index]);
        solve(index + 1, target - candidates[index], candidates, temp, ans);
        temp.pop_back();
    }

    while (index + 1 < candidates.size() && candidates[index] == candidates[index + 1])
        index++;

    solve(index + 1, target, candidates, temp, ans);
}

vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
    vector<vector<int>> ans;
    vector<int> temp;
    sort(candidates.begin(), candidates.end());
    solve(0, target, candidates, temp, ans);
    return ans;
}
