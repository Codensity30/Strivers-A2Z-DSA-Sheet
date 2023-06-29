/*
Question:
Implement a Stack using one queue.

Approach:
- We use the class `QueueStack` to represent the stack.
- The stack is implemented using one queue `q`.
- The `push(int)` function inserts an element into `q`.
- The `pop()` function transfers `n-1` elements from front of `q` to it's back and returns the last element from `q` as the popped element.


Code:
*/

class QueueStack {
private:
    std::queue<int> q;

public:
    void push(int x);
    int pop();
};

void QueueStack::push(int x)
{
    q.push(x);
}

int QueueStack::pop()
{
    if (q.empty())
        return -1;

    for(int i=0; i<q.size()-1; i++){
        int temp = q.front();
        q.pop();
        q.push(temp);
    }

    int popped = q.front();
    q.pop();

    return popped;
}


/*
Complexity Analysis:
- The `push()` operation has a time complexity of O(1) since we only need to enqueue an element into `q`.
- The `pop()` operation has a time complexity of O(N) in the worst case, where N is the number of elements in `q`.
- The space complexity is O(N), where N is the total number of elements stored in the queue.
*/

