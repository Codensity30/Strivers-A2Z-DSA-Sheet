/*
Question:
Implement a Queue using two stacks s1 and s2.

Approach:
- We use the class `Queue` to represent the queue.
- The queue is implemented using two stacks `input` and `output`.
- The `enqueue(int)` function inserts an element into `input` stack.
- The `dequeue()` function transfers elements from `input` stack to `output` stack if `output` is empty, and returns the top element from `output` stack as the dequeued element.
- To transfer elements from `input` to `output`, we pop each element from the top of `input` and push it into `output`.
- After transferring elements, we pop the top element from `output` as the dequeued element.

Code:
*/

class Queue {
private:
    std::stack<int> input;
    std::stack<int> output;

public:
    void enqueue(int x);
    int dequeue();
};

void Queue::enqueue(int x) {
    input.push(x);
}

int Queue::dequeue() {
    if (input.empty() && output.empty())
        return -1;

    if (output.empty()) {
        while (!input.empty()) {
            int temp = input.top();
            input.pop();
            output.push(temp);
        }
    }

    int dequeued = output.top();
    output.pop();

    return dequeued;
}

/*
Complexity Analysis:
- The `enqueue()` operation has a time complexity of O(1) since we only need to push an element into the `input` stack.
- The `dequeue()` operation has a time complexity of O(1) by amortized analysis.
- The space complexity is O(N), where N is the total number of elements stored in the two stacks.
*/

