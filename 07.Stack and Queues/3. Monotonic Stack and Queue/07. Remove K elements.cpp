/*
QUESTION:
Given string num representing a non-negative integer num, and an integer k,
return the smallest possible integer after removing k digits from num.

Example:
Input: num = "1432219", k = 3
Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.
*/

/*
APPROACH:
The idea is to use a stack to build the smallest number by removing larger digits.
We iterate through each digit in num and compare it with the digits in the stack.
If the current digit is smaller than the top of the stack, we pop elements from the stack
until either the stack is empty or the top of the stack is smaller than or equal to the current digit.
After processing all the digits, we remove any remaining digits from the stack to satisfy the required k digits to remove.
Finally, we construct the result by popping elements from the stack and reverse it to get the correct order.
*/

string removeKdigits(string num, int k) {
    stack<char> st;
    
    for (char c : num) {
        while (!st.empty() && k > 0 && st.top() > c) {
            st.pop();
            k--;
        }
        st.push(c);
    }
    
    // Remove remaining digits from the back if k is still greater than 0
    while (!st.empty() && k > 0) {
        st.pop();
        k--;
    }
    
    // Construct the result by popping elements from the stack
    string ans;
    while (!st.empty()) {
        ans.push_back(st.top());
        st.pop();
    }
    
    // Remove leading zeros
    reverse(ans.begin(), ans.end());
    while (!ans.empty() && ans.back() == '0') {
        ans.pop_back();
    }
    
    return ans.empty() ? "0" : ans;
}

/*
Complexity Analysis:
- The code iterates through each digit in the input string, so the time complexity is O(n),
  where n is the length of the input string.
- The space complexity is O(n) as well since the stack can potentially store all the digits in the input string.
*/
