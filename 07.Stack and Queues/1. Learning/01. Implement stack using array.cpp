/*
Question:
Write a program to implement a Stack using Array. Your task is to use the class as shown in the comments in the code editor and complete the functions push() and pop() to implement a stack.

Approach:
- We use a class `MyStack` to represent the stack.
- The stack is implemented using an array `arr` and a top variable to keep track of the top element.
- The class provides two member functions: `push(int)` to push an element onto the stack and `pop()` to pop an element from the stack.
- The `push(int)` function increments the top and adds the element to the array at the current top index.
- The `pop()` function checks if the stack is empty (top = -1), in which case it returns -1. Otherwise, it retrieves the element at the top index, decrements the top, and returns the element.

Code:
*/

class MyStack
{
private:
    int arr[1000];
    int top;

public:
    MyStack() { top = -1; }
    int pop();
    void push(int);
};

void MyStack::push(int x)
{
    top++;
    arr[top] = x;
}

int MyStack::pop()
{
    if (top == -1) {
        return -1;
    }
    int ans = arr[top];
    top--;
    return ans;
}

/*
Complexity Analysis:
- The time complexity of both `push()` and `pop()` operations is O(1) since they involve constant-time operations like incrementing/decrementing the top and accessing/modifying the array elements.
- The space complexity is O(1) since the array has a fixed size and does not depend on the number of elements pushed into the stack.
*/

