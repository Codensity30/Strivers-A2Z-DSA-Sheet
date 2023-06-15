/*
QUESTION:-
Given a singly linked list. The task is to find the length of the linked list, where length is defined as the number of nodes in the linked list.

Example 1:

Input:
LinkedList: 1->2->3->4->5
Output: 5
Explanation: Count of nodes in the 
linked list is 5, which is its length.
Example 2:

Input:
LinkedList: 2->4->6->7->5->1->0
Output: 7
Explanation: Count of nodes in the
linked list is 7. Hence, the output
is 7.

APPROACH:-

1. Initialize a variable `cnt` to 0 to keep track of the count.
2. Start with the `curr` pointer pointing to the head of the linked list.
3. Iterate through the linked list by moving the `curr` pointer to the next node in each iteration.
4. Increment the count `cnt` by 1 for each node encountered.
5. Continue the iteration until the `curr` pointer becomes NULL, indicating the end of the linked list.
6. Return the final count `cnt` as the result.

Time complexity of this approach is O(N), where N is the number of nodes in the linked list. We need to visit each node once to count them.
Space complexity is O(1) as we are not using any extra space that grows with the input size. We only need a constant amount of space to store the count variable and the temporary pointer.

CODE:-
*/

int getCount(struct Node* head){
    int cnt = 0;
    Node* curr = head;
    while(curr){
        cnt++;
        curr = curr->next;
    }
    return cnt;
}