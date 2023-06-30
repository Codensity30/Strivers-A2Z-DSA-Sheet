/*
QUESTION:
You are given a string S of size N that represents the prefix form of a valid mathematical expression. Convert it to its infix form.

Example:
Input: 
*-A/BC-/AKL
Output: 
((A-(B/C))*((A/K)-L))
Explanation: 
The above output is its valid infix form.

APPROACH:
- We can use a stack to convert the prefix expression to infix.
- We iterate through each character of the input string in reverse order.
- If the character is an operand (letter or digit), we push it onto the stack.
- If the character is an operator, we pop two operands from the stack, concatenate them with the operator and enclosing parentheses, and push the result back onto the stack.
- After iterating through all characters, the top of the stack will contain the final infix expression.

CODE:
*/

string preToInfix(string pre_exp) {
    stack<string> st;
    
    for (int i = pre_exp.size() - 1; i >= 0; i--) {
        char ch = pre_exp[i];
        
        if (('A' <= ch && ch <= 'Z') || ('a' <= ch && ch <= 'z') || ('0' <= ch && ch <= '9')) {
            string temp = "";
            temp += ch;
            st.push(temp);
        } else {
            string a = st.top();
            st.pop();
            string b = st.top();
            st.pop();
            
            string temp = "(" + a + ch + b + ")";
            st.push(temp);
        }
    }
    
    return st.top();
}

/*
COMPLEXITY ANALYSIS:
- The time complexity of the preToInfix function is O(N), where N is the length of the input string.
- We iterate through each character once, and the operations performed inside the loop are all constant time.
- The space complexity is O(N) as we use a stack to store operands.
*/
