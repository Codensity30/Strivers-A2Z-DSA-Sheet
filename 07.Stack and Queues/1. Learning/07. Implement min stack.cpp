/*
QUESTION:
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
Implement the MinStack class.
MinStack() initializes the stack object.
void push(int val) pushes the element val onto the stack.
void pop() removes the element on the top of the stack.
int top() gets the top element of the stack.
int getMin() retrieves the minimum element in the stack.
You must implement a solution with O(1) time complexity for each function.

Example:
Input:
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]
Output:
[null,null,null,null,-3,null,0,-2]
Explanation:
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2

APPROACH:
- We can use an auxiliary stack to keep track of the difference of an element from the minimum element at each step.
- When pushing an element, we push the difference of an element from the minimum element at that time.
- When popping an element, we check stack top if it's -ve it means that this element is the minimum so we update the mini as we popping the current minimum.
- To get the top element, we add the current minimum to the top element of the main stack.
- To get the minimum element, we simply return the current minimum.

CODE:
*/

class MinStack {
private:
    stack<long long> st;
    int mini;
public:
    MinStack() {
        mini = -1;
    }
    
    void push(int val) {
        if (st.empty()) {
            st.push(0);
            mini = val;
        } else {
            st.push((long long)val - mini);// to handle overflow case
            mini = min(val, mini);
        }
    }
    
    void pop() {
        if (st.top() < 0)
            mini = mini - st.top();
        st.pop();
    }
    
    int top() {
        int ans = -1;
        if (st.top() < 0)
            ans = mini;
        else
            ans = mini + st.top();
        return ans;
    }
    
    int getMin() {
        return mini;
    }
};

/*
COMPLEXITY ANALYSIS:
- All the operations (push, pop, top, getMin) have O(1) time complexity as we are performing constant-time operations on the stack.
- The space complexity is O(n) as we use an auxiliary stack to store the minimum elements.
*/
