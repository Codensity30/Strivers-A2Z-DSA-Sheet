/*
QUESTION:-
Given the head of a singly linked list, reverse the list, and return the reversed list.

Example 1:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Example 2:
Input: head = [1,2]
Output: [2,1]
*/

/*
APPROACH:
To reverse a singly linked list, we can use an iterative approach.
Initialize three pointers: prev as NULL, curr as head, and frwd as NULL.
Iterate through the linked list until curr becomes NULL:
    - Store the next node of curr in frwd.
    - Set the next of curr to prev, reversing the link.
    - Move prev and curr one step forward.
    - Move curr to the next node (frwd) to continue the iteration.
Return prev, which will be the new head of the reversed list.
*/

// CODE:-
ListNode* reverseList(ListNode* head) {
    ListNode* prev = NULL;
    ListNode* curr = head;
    while (curr) {
        ListNode* frwd = curr->next;
        curr->next = prev;
        prev = curr;
        curr = frwd;
    }
    return prev;
}

// TIME COMPLEXITY: O(N)
// SPACE COMPLEXITY: O(1)
