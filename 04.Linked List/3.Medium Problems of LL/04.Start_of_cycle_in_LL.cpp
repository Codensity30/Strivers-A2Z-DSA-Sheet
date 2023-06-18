/*
QUESTION:-
Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to (0-indexed). It is -1 if there is no cycle. Note that pos is not passed as a parameter.

Do not modify the linked list.

Example 1:
Input: head = [3,2,0,-4], pos = 1
Output: tail connects to node index 1
Explanation: There is a cycle in the linked list, where tail connects to the second node.

Example 2:
Input: head = [1,2], pos = 0
Output: tail connects to node index 0
Explanation: There is a cycle in the linked list, where tail connects to the first node.
*/

/*
APPROACH:
To find the node where the cycle begins in a linked list, we can use the Floyd's cycle-finding algorithm, also known as the "tortoise and hare" algorithm.
Initialize two pointers, slow and fast, to the head of the linked list.
Move the slow pointer one step at a time and the fast pointer two steps at a time.
If the linked list has a cycle, the fast pointer will eventually catch up to the slow pointer.
In other words, if there is a cycle, the two pointers will meet at some point.
Once the two pointers meet, move one of the pointers back to the head of the linked list.
Then, move both pointers one step at a time until they meet again.
The point at which they meet is the node where the cycle begins.
Return this node.
If the fast pointer reaches the end of the list (i.e., it becomes NULL or reaches a node with a NULL next pointer), then there is no cycle in the linked list, and we can return NULL.
*/

ListNode* startOfCycle(ListNode* slow, ListNode* fast) {
    while (slow != fast) {
        slow = slow->next;
        fast = fast->next;
    }
    return slow;
}

ListNode* detectCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            fast = head;
            return startOfCycle(slow, fast);
        }
    }
    return NULL;
}

// TIME COMPLEXITY: O(N)
// SPACE COMPLEXITY: O(1)
