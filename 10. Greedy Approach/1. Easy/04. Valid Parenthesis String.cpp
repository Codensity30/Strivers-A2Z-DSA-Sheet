/*
Question:
Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.
The following rules define a valid string:
- Any left parenthesis '(' must have a corresponding right parenthesis ')'.
- Any right parenthesis ')' must have a corresponding left parenthesis '('.
- Left parenthesis '(' must go before the corresponding right parenthesis ')'.
- '*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".

Example:
Input: s = "(*))"
Output: true

Approach:
- We maintain two counters `cmin` and `cmax` to keep track of the minimum and maximum possible number of open parentheses.
- We iterate over the characters in the string.
- For each character:
  - If it is '(', we increment both `cmin` and `cmax`.
  - If it is ')', we decrement `cmax` and update `cmin` to the maximum of `cmin - 1` and 0 (to handle cases where '*' is treated as '(').
  - If it is '*', we increment `cmax` (considering '*' as '(') and update `cmin` to the maximum of `cmin - 1` and 0 (to handle cases where '*' is treated as ')').
  - If `cmax` becomes negative at any point, it means even after treating all '*' as '(' we can't maintain balance, so we return false.
- Finally, we check if `cmin` is 0, which means we have balanced parentheses.

Complexity Analysis:
- The time complexity of this approach is O(N), where N is the length of the string s.
- We iterate over each character once.
- The space complexity is O(1) as we are using only a constant amount of extra space.

Code:
*/

// NOTE- this approach is not intuitive but the most optimal however we can use recursion to solve this problem and optimize it using dp.
// We can also solve this using recursion where in the case of '*' we will make 3 recursion calls,
//  1-> where opencnt++,
//  2-> where opencnt
//  3-> where opencnt--
//  The base case would be at end if opencnt == 0 return true else false.

bool checkValidString(string s) {
    int cmin = 0, cmax = 0;
    for (auto c : s) {
        if (c == '(') {
            cmax++;
            cmin++;
        } else if (c == ')') {
            cmax--;
            cmin = max(cmin - 1, 0);
        } else { // this is the case of '*'
            cmax++; // if we treat '*' as '('
            cmin = max(cmin - 1, 0); // if we treat '*' as ')'
        }
        if (cmax < 0) // this means even after treating all '*' as '(' we can't maintain balance
            return false;
    }
    return (cmin == 0);
}
