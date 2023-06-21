/*QUESTION:
Given an integer array nums of unique elements, return all possible subsets (the power set).

Example 1:
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

Example 2:
Input: nums = [0]
Output: [[],[0]]

Approach:
To generate all possible subsets, we can use a recursive backtracking approach.
1. Create a helper function called 'solve' that takes a vector of vectors to store the subsets, a vector to store the current subset, the input array 'nums', and the current index as parameters.
2. In the 'solve' function:
   - If the current index is equal to the size of the input array 'nums', add the current subset to the vector of vectors.
   - Otherwise, do the following:
     - Include the element at the current index in the current subset by pushing it into the vector.
     - Recursively call the 'solve' function with the updated current subset and increment the current index.
     - Exclude the element at the current index from the current subset by popping it from the vector.
     - Recursively call the 'solve' function with the updated current subset and increment the current index.
3. Create the main function called 'subsets' that generates all possible subsets using the 'solve' function.
   - Create an empty vector of vectors to store the subsets.
   - Create an empty vector to store the current subset.
   - Call the 'solve' function with the empty vector of vectors, empty current subset, input array 'nums', and index 0.
   - Return the vector of vectors containing all the subsets.

Time Complexity: O(2^N), where N is the size of the input array 'nums'.
Space Complexity: O(N), where N is the size of the input array 'nums' (for the recursion stack and storing subsets).

CODE:*/
void solve(vector<vector<int>>& ans, vector<int>& temp, vector<int>& nums, int index) {
	if (index == nums.size()) {
		ans.push_back(temp);
		return;
	}

	// Include the element at the current index
	temp.push_back(nums[index]);
	solve(ans, temp, nums, index + 1);

	// Exclude the element at the current index
	temp.pop_back();
	solve(ans, temp, nums, index + 1);
}

vector<vector<int>> subsets(vector<int>& nums) {
	vector<vector<int>> ans;
	vector<int> temp;
	solve(ans, temp, nums, 0);
	return ans;
}
