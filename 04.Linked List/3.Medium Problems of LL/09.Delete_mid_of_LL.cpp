/*
QUESTION:-
You are given the head of a linked list. Delete the middle node, and return the head of the modified linked list.

Example:
Input: head = [1,3,4,7,1,2,6]
Output: [1,3,4,1,2,6]
Explanation:
The above figure represents the given linked list. The indices of the nodes are written below.
Since n = 7, node 3 with value 7 is the middle node, which is marked in red.
We return the new list after removing this node.

APPROACH:
To delete the middle node of a linked list, we can use the slow and fast pointer technique.
1. Initialize three pointers: slow, fast, and prev.
2. Move the slow pointer one step at a time and the fast pointer two steps at a time.
3. Keep track of the previous node using the prev pointer.
4. When the fast pointer reaches the end of the linked list, the slow pointer will be at the middle node.
5. Update the next pointer of the previous node to skip the middle node.
6. Return the head of the modified linked list.

TIME COMPLEXITY: O(N)
SPACE COMPLEXITY: O(1)
*/

ListNode* deleteMiddle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    ListNode* prev = NULL;
    
    // Move the slow and fast pointers
    while (fast && fast->next) {
        prev = slow;
        slow = slow->next;
        fast = fast->next->next;
    }
    
    // Update the next pointer of the previous node
    prev->next = slow->next;
    
    return head;
}
