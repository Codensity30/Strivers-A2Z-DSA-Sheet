/*
QUESTION:-
Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

APPROACH:
The idea is to reverse the nodes of the linked list in groups of size k.
First, we need to check if there are at least k nodes remaining in the linked list. If not, we return the head as it is.
Next, we reverse the first k nodes of the linked list. To do this, we maintain three pointers: prev, curr, and frwd.
We iterate through the first k nodes and at each step, we reverse the links between the nodes.
After reversing the first k nodes, prev becomes the new head, and curr becomes the new tail of the reversed group.
We recursively call the function on the remaining linked list starting from frwd (which points to the (k+1)-th node).
Finally, we update the next pointer of the original head to point to the reversed group obtained from the recursive call.

TIME COMPLEXITY: O(N), where N is the number of nodes in the linked list.
SPACE COMPLEXITY: O(1).

*/

ListNode* reverseKGroup(ListNode* head, int k) {
    ListNode* ptr = head;
    for (int i = 0; i < k; i++) {
        if (!ptr)
            return head; // Return head if there are less than k nodes remaining
        ptr = ptr->next;
    }
    int count = k;
    ListNode* prev = NULL;
    ListNode* curr = head;
    ListNode* frwd = NULL;
    while (count && curr) {
        frwd = curr->next;
        curr->next = prev;
        prev = curr;
        curr = frwd;
        count--;
    }
    if (frwd)
        head->next = reverseKGroup(frwd, k); // Recursive call for the remaining linked list
    return prev; // Return the new head of the reversed group
}
