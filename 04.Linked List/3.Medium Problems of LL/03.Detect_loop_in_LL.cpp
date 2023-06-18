/*
QUESTION:-
Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

Example 1:
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

Example 2:
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
*/

/*
APPROACH:
To determine if a linked list has a cycle, we can use the two-pointer technique.
Initialize two pointers, slow and fast, to the head of the linked list.
Move the slow pointer one step at a time and the fast pointer two steps at a time.
If the linked list has a cycle, the fast pointer will eventually catch up to the slow pointer.
In other words, if there is a cycle, the two pointers will meet at some point.
If the fast pointer reaches the end of the list (i.e., it becomes NULL or reaches a node with a NULL next pointer), then there is no cycle in the linked list.
Return true if the two pointers meet (indicating a cycle), and false otherwise.
*/

// CODE:-
bool hasCycle(ListNode *head) {
    ListNode* slow = head;
    ListNode* fast = head;

    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast)
            return true;
    }
    return false;
}

// TIME COMPLEXITY: O(N)
// SPACE COMPLEXITY: O(1)
