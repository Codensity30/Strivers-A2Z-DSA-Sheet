/*QUESTION:
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

Example 1:
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]

Example 2:
Input: n = 1
Output: ["()"]

Approach:
To generate all combinations of well-formed parentheses, we can use a recursive approach. We can start with an empty string and keep track of the number of open parentheses and close parentheses used so far.
1. Create a helper function called 'solve' that takes a vector of strings, a string representing the current combination, the count of open parentheses, the count of close parentheses, and the total number of pairs of parentheses as parameters.
2. In the 'solve' function:
   - If both the counts of open parentheses and close parentheses are equal to the total number of pairs of parentheses, add the current combination to the vector of strings.
   - If the count of open parentheses is less than or equal to the total number of pairs of parentheses, recursively call 'solve' by appending an open parenthesis to the current combination and incrementing the count of open parentheses.
   - If the count of open parentheses is greater than the count of close parentheses, recursively call 'solve' by appending a close parenthesis to the current combination and incrementing the count of close parentheses.
3. Create the main function called 'generateParenthesis' that generates all combinations of well-formed parentheses using the 'solve' function.
   - Create an empty vector of strings to store the combinations.
   - Call the 'solve' function with an empty string, count of open parentheses as 0, count of close parentheses as 0, and the total number of pairs of parentheses as 'n'.
   - Return the vector of strings containing all the combinations.

Time Complexity: O(2^N * N), where N is the given number of pairs of parentheses.
Space Complexity: O(N), where N is the given number of pairs of parentheses (for the recursion stack and storing combinations).

CODE:*/

void solve(vector<string>& ans, string s, int open, int close, int n) {
	if (open == n && close == n){
		ans.push_back(s);
        return;
    }

	if (open <= n)
		solve(ans, s + '(', open + 1, close, n);
	if (open > close)
		solve(ans, s + ')', open, close + 1, n);
}

vector<string> generateParenthesis(int n) {
	vector<string> ans;
	solve(ans, "", 0, 0, n);
	return ans;
}
