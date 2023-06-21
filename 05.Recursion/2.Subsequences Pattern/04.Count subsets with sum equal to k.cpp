/*QUESTION:
Given an array arr[] of non-negative integers and an integer sum, the task is to count all subsets of the given array with a sum equal to the given sum. The answer can be very large, so the output will be the answer modulo 10^9 + 7.

Example:
Input: N = 6, arr[] = {2, 3, 5, 6, 8, 10}, sum = 10
Output: 3
Explanation: The subsets with a sum equal to 10 are {2, 3, 5}, {2, 8}, and {10}.

Approach:
To count the subsets with a given sum, we can use a recursive approach with backtracking.
1. Create a helper function called 'solve' that takes the current index, the remaining sum, and the array as parameters.
2. In the 'solve' function:
   - If the remaining sum is 0, return 1 (found a subset with the given sum).
   - If the index becomes 0 and the remaining sum is not 0, return 0 (no subset found with the given sum).
   - Otherwise, do the following:
     - Count the subsets that include the element at the current index by recursively calling the 'solve' function with the updated index and the remaining sum minus the element value.
     - Count the subsets that exclude the element at the current index by recursively calling the 'solve' function with the updated index and the remaining sum.
     - Return the sum of the counts from the include and exclude steps.
3. Create the main function called 'perfectSum' that calculates the count of subsets with the given sum.
   - Call the 'solve' function with the last index of the array, the given sum, and the array.
   - Return the count modulo 10^9 + 7.

Time Complexity: O(N * sum), where N is the size of the array and sum is the given sum.
Space Complexity: O(N * sum), where N is the size of the array and sum is the given sum (for recursion stack).

CODE:*/
int solve(int index, int sum, int arr[]) {
	if (sum == 0) {
		return 1;
	}
	if (index == 0) {
		return (arr[0] == sum) ? 1 : 0;
	}

	int include = 0;
	if (arr[index] <= sum)
		include = solve(index - 1, sum - arr[index], arr); // include

	int exclude = solve(index - 1, sum, arr); // exclude

	return (include + exclude) % (int)(1e9 + 7);
}

int perfectSum(int arr[], int n, int sum) {
	int cnt = solve(n - 1, sum, arr);
	return cnt % (int)(1e9 + 7);
}
