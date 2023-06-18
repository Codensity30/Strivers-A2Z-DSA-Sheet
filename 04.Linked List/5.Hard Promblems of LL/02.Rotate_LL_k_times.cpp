/*
QUESTION:-
Given the head of a linked list, rotate the list to the right by k places.

APPROACH:
To rotate the linked list to the right by k places, we need to perform the following steps:
1. Find the length of the linked list and connect the last node to the head to form a circular linked list.
2. Calculate the actual number of rotations by taking the modulus of k with the length of the linked list.
3. Traverse to the (length - k - 1)th node, which will be the new tail of the rotated list.
4. Set the new head as the next node of the (length - k - 1)th node and disconnect it from the rest of the list.
5. Return the new head.

TIME COMPLEXITY: O(N), where N is the number of nodes in the linked list.
SPACE COMPLEXITY: O(1).

*/

int find_len(ListNode* head) {
    ListNode* curr = head;
    int cnt = 1;
    while (curr->next) {
        curr = curr->next;
        cnt++;
    }
    curr->next = head; // Connect the last node to the head to form a circular linked list
    return cnt;
}

ListNode* rotateRight(ListNode* head, int k) {
    if (head == NULL || k == 0)
        return head;
    int len = find_len(head); // Find the length of the linked list and form a circular linked list
    k = k % len; // Calculate the actual number of rotations
    ListNode* curr = head;
    // Traverse to the (length - k - 1)th node
    for (int i = 0; i < len - k - 1; i++) {
        curr = curr->next;
    }
    ListNode* newHead = curr->next; // The next node will be the new head
    curr->next = NULL; // Disconnect the new tail from the rest of the list
    return newHead;
}
