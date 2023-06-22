/*QUESTION:
Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

Example:
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

Approach:
We can use a recursive backtracking approach to generate all possible letter combinations.
1. Create a helper function called 'solve' that takes the current index, the input string of digits, a temporary string to store the current combination, the vector to store all combinations, and a mapping vector that maps each digit to its corresponding letters.
2. In the 'solve' function:
   - If the current index is equal to the size of the input string, add the current combination to the vector of combinations and return.
   - Get the corresponding digit at the current index from the input string.
   - Iterate through the letters associated with the current digit:
     - Append the current letter to the temporary string.
     - Recursively call the 'solve' function with the updated index by incrementing it, the same input string of digits, the updated temporary string, the vector of combinations, and the mapping vector.
     - Remove the last added letter from the temporary string (backtracking).
3. Create the main function called 'letterCombinations' that calculates and returns the vector of combinations.
   - Check if the input string is empty. If so, return an empty vector.
   - Initialize a mapping vector that maps each digit to its corresponding letters.
   - Initialize an empty temporary string.
   - Initialize an empty vector to store the combinations.
   - Call the 'solve' function with the initial index as 0, the input string of digits, the temporary string, the vector of combinations, and the mapping vector.
   - Return the vector of combinations.

Time Complexity: O(3^N * 4^M), where N is the number of digits that map to 3 letters and M is the number of digits that map to 4 letters.
Space Complexity: O(N + M), where N is the number of digits that map to 3 letters and M is the number of digits that map to 4 letters.

CODE:*/
void solve(int index, string digits, string& temp, vector<string>& ans, vector<string>& mp) {
    if (index == digits.size()) {
        ans.push_back(temp);
        return;
    }

    int num = digits[index] - '0';
    for (int i = 0; i < mp[num].size(); i++) {
        temp.push_back(mp[num][i]);
        solve(index + 1, digits, temp, ans, mp);
        temp.pop_back();
    }
}

vector<string> letterCombinations(string digits) {
    if (digits.empty())
        return {};

    vector<string> mp{"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    string temp = "";
    vector<string> ans;
    solve(0, digits, temp, ans, mp);
    return ans;
}
