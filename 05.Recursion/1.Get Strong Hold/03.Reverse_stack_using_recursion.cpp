/*QUESTION:
Reverse a given stack of 'N' integers using recursion.
Note: You are not allowed to use any extra space other than the internal stack space used due to recursion.

Example:
Input: [1,2,3,4,5]
Output: [5,4,3,2,1]

Approach:
To reverse a stack using recursion without using any extra space, we can follow the following steps:
1. Create a helper function called 'insertAtBottom' that takes an element and a stack as parameters.
2. The 'insertAtBottom' function inserts the given element at the bottom of the stack using recursion.
   - If the stack is empty, push the element to the stack and return.
   - Otherwise, pop the top element from the stack and recursively call 'insertAtBottom' with the element and the modified stack.
     After the recursive call, push the popped element back to the stack.
3. Create the main function called 'reverseStack' that reverses the given stack using recursion.
   - Base case: If the stack is empty, return.
   - Otherwise, pop the top element from the stack and recursively call 'reverseStack' on the modified stack.
     After the recursive call, call the 'insertAtBottom' function with the popped element and the modified stack.
4. The 'reverseStack' function will reverse the stack in place using recursion and the 'insertAtBottom' function.

Time Complexity: O(N^2) (due to multiple recursive calls)
Space Complexity: O(N) (due to the internal stack space used for recursion)

CODE:*/
void insertAtBottom(int ele, stack<int>& stack) {
    if (stack.empty()) {
        stack.push(ele);
        return;
    }

    int temp = stack.top();
    stack.pop();
    insertAtBottom(ele, stack);
    stack.push(temp);
}

void reverseStack(stack<int>& stack) {
    if (stack.empty())
        return;

    int first = stack.top();
    stack.pop();
    reverseStack(stack);
    insertAtBottom(first, stack);
}
