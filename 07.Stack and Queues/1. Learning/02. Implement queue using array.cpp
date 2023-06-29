/*
Question:
Implement a Queue using an Array. Queries in the Queue are of the following type:
(i) 1 x   (a query of this type means pushing 'x' into the queue)
(ii) 2     (a query of this type means to pop an element from the queue and print the popped element)

Approach:
- We use a class `MyQueue` to represent the queue.
- The queue is implemented using an array `arr`, a front variable to keep track of the front element, and a rear variable to keep track of the next available position to insert an element.
- The class provides two member functions: `push(int)` to push an element into the queue and `pop()` to pop an element from the front of the queue.
- The `push(int)` function inserts the element at the rear index and increments the rear.
- The `pop()` function checks if the queue is empty (rear == front), in which case it returns -1. Otherwise, it retrieves the element at the front index, increments the front, and returns the element.

Code:
*/

class MyQueue {
private:
    int arr[100005];
    int front;
    int rear;

public:
    MyQueue() { front = 0; rear = 0; }
    void push(int);
    int pop();
};

void MyQueue::push(int x)
{
    arr[rear] = x;
    rear++;
}

int MyQueue::pop()
{
    if (rear == front)
        return -1;
    int ans = arr[front];
    front++;
    return ans;
}

/*
Complexity Analysis:
- The time complexity of both `push()` and `pop()` operations is O(1) since they involve constant-time operations like accessing/modifying array elements and incrementing/decrementing front/rear indices.
- The space complexity is O(N) where N is the maximum number of elements that can be stored in the queue (in this case, 100005) since we use an array to store the queue elements.
*/

