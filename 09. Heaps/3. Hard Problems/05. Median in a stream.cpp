/*
Question:
The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

Implement the MedianFinder class:

MedianFinder() initializes the MedianFinder object.
void addNum(int num) adds the integer num from the data stream to the data structure.
double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.
*/

/*
Approach:
1. Use two priority queues: a max heap to store the smaller half of the numbers and a min heap to store the larger half of the numbers.
2. When adding a new number:
   - If the max heap is empty or the number is smaller than the top element of the max heap, push it into the max heap.
   - Otherwise, push it into the min heap.
   - Balance the heaps by transferring the top element of the larger heap to the smaller heap if the size difference between the heaps exceeds 1.
3. When finding the median:
   - If the sizes of the heaps are equal, calculate the average of the top elements of both heaps.
   - Otherwise, return the top element of the heap with a larger size.
Complexity Analysis:

The time complexity for adding a number to the MedianFinder is O(log N), where N is the total number of elements added so far. This is because we need to maintain the two heaps and balance them if necessary, which takes logarithmic time.
The time complexity for finding the median using the findMedian() function is O(1). This is because we directly access the top elements of the heaps, which takes constant time.
The space complexity is O(N), where N is the total number of elements added. This is because we need to store the elements in the two priority queues.

CODE:-

*/
    
public:
    MedianFinder() {}
    
    void addNum(int num) {
        if (maxpq.empty() || num < maxpq.top())
            maxpq.push(num);
        else
            minpq.push(num);
        
        // Balancing the heaps
        int a = maxpq.size();
        int b = minpq.size();
        if (abs(a - b) > 1) {
            if (a > b) {
                int temp = maxpq.top();
                maxpq.pop();
                minpq.push(temp);
            }
            else {
                int temp = minpq.top();
                minpq.pop();
                maxpq.push(temp);
            }
        }
    }
    
    double findMedian() {
        int a = maxpq.size();
        int b = minpq.size();
        if (a == b)
            return (static_cast<double>(maxpq.top() + minpq.top()) / 2);
        if (a > b)
            return maxpq.top();
        return minpq.top();
    }
};

