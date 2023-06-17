/*
QUESTION:-
Given a linked list of N nodes where nodes can contain values 0s, 1s, and 2s only. 
The task is to segregate 0s, 1s, and 2s in the linked list such that all zeros segregate to the head side, 2s at the end of the linked list, and 1s in the middle of 0s and 2s.

Example:
Input:
N = 8
value[] = {1,2,2,1,2,0,2,2}
Output: 0 1 1 2 2 2 2 2
Explanation: All the 0s are segregated to the left end of the linked list, 2s to the right end of the list, and 1s in between.

APPROACH:
Count the number of 0s, 1s, and 2s in the linked list.
Traverse the linked list and overwrite the nodes with 0s, 1s, and 2s based on their counts.

TIME COMPLEXITY: O(N)
SPACE COMPLEXITY: O(1)

*/

Node* segregate(Node* head) {
    int zeroCnt = 0, oneCnt = 0, twoCnt = 0;
    Node* curr = head;
    
    // Count the number of 0s, 1s, and 2s in the linked list
    while (curr) {
        if (curr->data == 0) zeroCnt++;
        if (curr->data == 1) oneCnt++;
        if (curr->data == 2) twoCnt++;
        curr = curr->next;
    }
    
    curr = head;
    
    // Overwrite the nodes with 0s, 1s, and 2s based on their counts
    while (zeroCnt) {
        curr->data = 0;
        zeroCnt--;
        curr = curr->next;
    }
    while (oneCnt) {
        curr->data = 1;
        oneCnt--;
        curr = curr->next;
    }
    while (twoCnt) {
        curr->data = 2;
        twoCnt--;
        curr = curr->next;
    }
    
    return head;
}
