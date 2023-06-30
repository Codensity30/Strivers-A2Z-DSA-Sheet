/*
QUESTION:
Given an infix expression in the form of string str. Convert this infix expression to postfix expression.

Infix expression: The expression of the form a op b. When an operator is in-between every pair of operands.
Postfix expression: The expression of the form a b op. When an operator is followed for every pair of operands.
Note: The order of precedence is: ^ greater than * equals to / greater than + equals to -.

Example:
Input: str = "((A-(B/C))*((A/K)-L))"
Output: "*-A/BC-/AKL"
Explanation:
After converting the infix expression into prefix expression, the resultant expression will be *-A/BC-/AKL.

APPROACH:
- We can use a stack to convert the infix expression to postfix.
- We iterate through each character of the input string from right to left.
- If the character is an alphanumeric character, we append it to the output string.
- If the character is an closing parenthesis '(', we push it onto the stack.
- If the character is a opening parenthesis ')', we pop operators from the stack and append them to the output string until we encounter an closing parenthesis '('.
- If the character is an operator, we compare its precedence with the top of the stack and pop operators with higher or equal precedence and append them to the output string. Then we push the current operator onto the stack.
- After iterating through all characters, we pop any remaining operators from the stack and append them to the output string.

CODE:
*/

string infixToPostfix(string s) {
    string ans = "";
    unordered_map<char, int> precedence;
    precedence['^'] = 3;
    precedence['*'] = 2;
    precedence['/'] = 2;
    precedence['+'] = 1;
    precedence['-'] = 1;

    stack<char> st;

    for (int i = s.size() - 1; i >= 0; i--) {
        if (('a' <= s[i] && s[i] <= 'z') || ('A' <= s[i] && s[i] <= 'Z') || ('0' <= s[i] && s[i] <= '9')) {
            ans.push_back(s[i]);
        } else if (s[i] == ')') {
            st.push(s[i]);
        } else if (s[i] == '(') {
            while (!st.empty() && st.top() != ')') {
                ans.push_back(st.top());
                st.pop();
            }
            st.pop(); // Pop the closing parenthesis ')'
        } else {
            while (!st.empty() && st.top() != ')' && precedence[st.top()] >= precedence[s[i]]) {
                ans.push_back(st.top());
                st.pop();
            }
            st.push(s[i]);
        }
    }

    while (!st.empty()) {
        ans.push_back(st.top());
        st.pop();
    }

    reverse(ans.begin(), ans.end());
    return ans;
}

/*
COMPLEXITY ANALYSIS:
- The time complexity of the infixToPostfix function is O(N), where N is the length of the input string.
- We iterate through each character once, and the operations performed inside the loop are all constant time.
- The space complexity is O(N) as we use a stack to store operators.
*/
