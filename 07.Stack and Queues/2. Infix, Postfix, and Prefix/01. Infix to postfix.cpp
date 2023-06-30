/*
QUESTION:
Given an infix expression in the form of string str, convert it to a postfix expression.

Infix expression: The expression of the form a op b. When an operator is in-between every pair of operands.
Postfix expression: The expression of the form a b op. When an operator is followed for every pair of operands.
Note: The order of precedence is: ^ greater than * equals to / greater than + equals to -.

Example:
Input: str = "a+b*(c^d-e)^(f+g*h)-i"
Output: abcd^e-fgh*+^*+i-
Explanation:
After converting the infix expression into postfix expression, the resultant expression will be abcd^e-fgh*+^*+i-

APPROACH:
- We can use a stack to convert the infix expression to postfix.
- We iterate through each character of the input string.
- If the character is an operand (letter or digit), we append it to the output string.
- If the character is an opening parenthesis '(', we push it onto the stack.
- If the character is a closing parenthesis ')', we pop elements from the stack and append them to the output string until we encounter an opening parenthesis. We also discard the opening parenthesis from the stack.
- If the character is an operator, we compare its precedence with the top element of the stack. If the top element has higher precedence, we pop it and append it to the output string. We repeat this process until we find an operator with lower precedence or an opening parenthesis. Then we push the current operator onto the stack.
- After iterating through all characters, we pop any remaining elements from the stack and append them to the output string.

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
    
    for (int i = 0; i < s.size(); i++) {
        if (('a' <= s[i] && s[i] <= 'z') || ('A' <= s[i] && s[i] <= 'Z') || ('0' <= s[i] && s[i] <= '9')) {
            ans.push_back(s[i]);
        } else if (s[i] == '(') {
            st.push(s[i]);
        } else if (s[i] == ')') {
            while (!st.empty() && st.top() != '(') {
                ans.push_back(st.top());
                st.pop();
            }
            st.pop();
        } else {
            while (!st.empty() && st.top() != '(' && precedence[st.top()] >= precedence[s[i]]) {
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
    
    return ans;
}

/*
COMPLEXITY ANALYSIS:
- The time complexity of the infixToPostfix function is O(N), where N is the length of the input string.
- We iterate through each character once, and the operations performed inside the loop are all constant time.
- The space complexity is O(N) as we use a stack to store operators.
*/
